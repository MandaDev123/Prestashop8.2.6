import { createEntity } from './psApi';

// Helper for parsing French floats
const parseFrFloat = (str) => {
  if (!str) return 0;
  return parseFloat(str.replace(',', '.').replace(/[^\d.-]/g, ''));
};

// Normalize accented characters (é→e, è→e, ê→e, à→a, etc.)
const normalize = (str) => {
  if (!str) return '';
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

// Normalize CSV headers: lowercase + remove accents
const normalizeHeader = (h) => normalize(h).toLowerCase().trim(); // eslint-disable-line no-unused-vars

// Helper for parsing arrays of items like [("T_01";3;"ngoza")] or [(T_01;3;ngoza)]
const parseAchat = (str) => {
  const regex = /\(\s*"?([^";)]+)"?\s*;\s*(\d+)\s*;\s*"?([^")]*)"?\s*\)/g;
  const matches = str.match(regex);
  if (!matches) return [];
  return matches.map(m => {
    const parts = m.match(/\(\s*"?([^";)]+)"?\s*;\s*(\d+)\s*;\s*"?([^")]*)"?\s*\)/);
    return { ref: parts[1].trim(), qty: parseInt(parts[2], 10), attr: parts[3].trim() };
  });
};

export async function executeCustomImport(apiKey, csvFiles, zipFile, addLog, setProgress) {
  let proc = 0;
  let created = 0;
  let errors = 0;

  const totalSteps = csvFiles[0].rows.length + csvFiles[1].rows.length + csvFiles[2].rows.length + (zipFile ? 1 : 0);

  // Normalize all CSV headers once — aggressive: NFD + strip accents + strip remaining non-ASCII + lowercase
  const normalizedHeaders = csvFiles.map(f => f ? f.headers.map(h => {
    if (!h) return '';
    // First try NFD normalization (works for proper Unicode)
    let clean = h.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    // Then strip any remaining non-ASCII characters (handles Latin-1/Windows-1252 encoding issues)
    clean = clean.replace(/[^\x20-\x7F]/g, '');
    return clean.toLowerCase().trim();
  }) : []);

  // Log detected columns for debugging
  const csvLabels = ['Produits', 'Déclinaisons', 'Commandes'];
  normalizedHeaders.forEach((headers, idx) => {
    if (headers.length > 0) {
      addLog({ icon: 'working', text: `${csvLabels[idx]}: ${headers.length} colonnes [${headers.join(', ')}]` });
    }
  });

  // Helper: get value by normalized header name (with fuzzy fallback for encoding issues)
  const getVal = (csvIdx, rowIdx, headerName) => {
    let hIdx = normalizedHeaders[csvIdx].indexOf(headerName);
    // Fuzzy fallback: if exact match fails, try partial matching
    // This handles cases where 'specificité' in Latin-1 becomes 'spcificit' after stripping non-ASCII
    if (hIdx < 0) {
      hIdx = normalizedHeaders[csvIdx].findIndex(h => {
        if (!h || h.length < 3) return false;
        // Check if one contains the other
        if (h.includes(headerName) || headerName.includes(h)) return true;
        // Check if header starts with the same chars (at least 5)
        const minLen = Math.min(h.length, headerName.length, 5);
        return h.substring(0, minLen) === headerName.substring(0, minLen);
      });
    }
    if (hIdx < 0) return '';
    return (csvFiles[csvIdx].rows[rowIdx][hIdx] || '').trim();
  };

  // ── PRE-VALIDATION: Check strict column presence ──
  const REQUIRED = [
    ['nom', 'reference', 'prix_ttc', 'taxe', 'categorie', 'prix_achat', 'date_availability_produit'],
    ['reference', 'specificite', 'karazany', 'stock_initial', 'prix_vente_ttc'],
    ['nom', 'email', 'pwd', 'adresse', 'achat', 'etat']
  ];
  let hasHeaderError = false;
  for (let idx = 0; idx < 3; idx++) {
    const missing = REQUIRED[idx].filter(req => {
      // Simulate getVal lookup
      let hIdx = normalizedHeaders[idx].indexOf(req);
      if (hIdx < 0) {
        hIdx = normalizedHeaders[idx].findIndex(h => {
          if (!h || h.length < 3) return false;
          if (h.includes(req) || req.includes(h)) return true;
          const minLen = Math.min(h.length, req.length, 5);
          return h.substring(0, minLen) === req.substring(0, minLen);
        });
      }
      return hIdx < 0;
    });
    if (missing.length > 0) {
      addLog({ icon: 'error', text: `Nom de colonne non conforme ou manquante dans le fichier ${csvLabels[idx]}. Attendu : ${missing.join(', ')}` });
      hasHeaderError = true;
    }
  }
  if (hasHeaderError) {
    setProgress(100);
    return; // Abort import completely
  }

  // ────────────────────────────────────────────
  // 1. Process PRODUCTS
  // ────────────────────────────────────────────
  addLog({ icon: 'working', text: '── Import Produits ──' });
  const productsRows = csvFiles[0].rows;
  const catsCache = {}; // normalized_name -> id
  const prodsCache = {}; // ref -> { id, priceHT, taxRate }
  const taxesCache = {}; // taxRate -> id_tax_rules_group

  // ── Step 1a: Collect ALL unique category names from the CSV ──
  const uniqueCatNames = {};
  for (let i = 0; i < productsRows.length; i++) {
    const catName = getVal(0, i, 'categorie');
    if (catName) {
      const catKey = normalize(catName).toLowerCase().replace(/\s+/g, ' ').trim();
      if (catKey && !uniqueCatNames[catKey]) {
        uniqueCatNames[catKey] = catName; // keep original name for display
      }
    }
  }
  addLog({ icon: 'working', text: `${Object.keys(uniqueCatNames).length} catégorie(s) unique(s) détectée(s) dans le CSV` });

  // ── Step 1b: Pre-load existing categories from PrestaShop ──
  try {
    const existingCatsRes = await fetch(`/ps-api/categories?ws_key=${apiKey}&output_format=JSON&display=full`);
    if (existingCatsRes.ok) {
      const existingCatsData = await existingCatsRes.json();
      const existingCats = existingCatsData.categories || [];
      existingCats.forEach(c => {
        const name = c.name?.[0]?.value || c.name || '';
        if (name) {
          const key = normalize(name).toLowerCase().replace(/\s+/g, ' ').trim();
          catsCache[key] = c.id;
        }
      });
      if (Object.keys(catsCache).length > 0) {
        addLog({ icon: 'success', text: `${Object.keys(catsCache).length} catégorie(s) existante(s) chargée(s)` });
      }
    }
  } catch { /* will create below */ }

  // ── Step 1c: Create missing categories (one by one, before any product) ──
  for (const [catKey, displayName] of Object.entries(uniqueCatNames)) {
    if (catsCache[catKey]) {
      addLog({ icon: 'success', text: `Catégorie "${displayName}" déjà existante (ID #${catsCache[catKey]})` });
      continue;
    }
    const slug = catKey.replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const catXml = `<?xml version="1.0" encoding="UTF-8"?><prestashop><category><name><language id="1"><![CDATA[${displayName}]]></language></name><active>1</active><id_parent>2</id_parent><link_rewrite><language id="1"><![CDATA[${slug}]]></language></link_rewrite></category></prestashop>`;
    const cRes = await createEntity(apiKey, 'categories', catXml);
    if (cRes.success) {
      catsCache[catKey] = cRes.id;
      addLog({ icon: 'success', text: `Catégorie "${displayName}" créée -> ID #${cRes.id}` });
    } else {
      addLog({ icon: 'error', text: `Catégorie "${displayName}": ${cRes.error}` });
    }
  }

  // ── Step 2: Process products ──
  for (let i = 0; i < productsRows.length; i++) {
    const nom = getVal(0, i, 'nom');
    const ref = getVal(0, i, 'reference');
    const prixTtcStr = getVal(0, i, 'prix_ttc');
    const taxeStr = getVal(0, i, 'taxe');
    const catName = getVal(0, i, 'categorie');
    const prixAchatStr = getVal(0, i, 'prix_achat');
    const dateStr = getVal(0, i, 'date_availability_produit');

    const prixTtc = parseFrFloat(prixTtcStr);
    const prixAchat = parseFrFloat(prixAchatStr);

    if (prixTtc <= 0 || prixAchat <= 0) {
      errors++;
      addLog({ icon: 'error', text: `Produit ${ref} (Ligne ${i+2}) : Montant positif obligatoire (> 0).` });
      proc++; setProgress(Math.round((proc / totalSteps) * 100));
      continue;
    }

    let taxRate = 0;
    if (taxeStr) {
      const cleaned = taxeStr.replace(',', '.').replace('%', '').trim();
      const val = parseFloat(cleaned);
      if (!isNaN(val)) {
        taxRate = val < 1 ? val : val / 100;
      }
    }

    // Calculate HT from TTC for reference storage only
    const priceHT = taxRate > 0 ? prixTtc / (1 + taxRate) : prixTtc;

    // Create dynamic Tax if needed
    let idTaxRulesGroup = 0;
    if (taxRate > 0) {
      if (taxesCache[taxRate]) {
        idTaxRulesGroup = taxesCache[taxRate];
      } else {
        const ratePercent = (taxRate * 100).toFixed(3);
        const taxName = `TVA ${parseFloat(ratePercent)}%`;
        
        // 1. Create Tax
        const taxXml = `<?xml version="1.0" encoding="UTF-8"?><prestashop><tax><rate>${ratePercent}</rate><active>1</active><name><language id="1"><![CDATA[${taxName}]]></language></name></tax></prestashop>`;
        const taxRes = await createEntity(apiKey, 'taxes', taxXml);
        
        if (taxRes.success) {
          // 2. Create Tax Rules Group
          const trgXml = `<?xml version="1.0" encoding="UTF-8"?><prestashop><tax_rules_group><name><![CDATA[${taxName}]]></name><active>1</active></tax_rules_group></prestashop>`;
          const trgRes = await createEntity(apiKey, 'tax_rule_groups', trgXml);
          
          if (trgRes.success) {
            idTaxRulesGroup = trgRes.id;
            taxesCache[taxRate] = idTaxRulesGroup;
            
            // 3. Create Tax Rule (id_country 0 applies to all)
            const trXml = `<?xml version="1.0" encoding="UTF-8"?><prestashop><tax_rule><id_tax_rules_group>${idTaxRulesGroup}</id_tax_rules_group><id_country>8</id_country><id_tax>${taxRes.id}</id_tax><behavior>0</behavior></tax_rule></prestashop>`;
            await createEntity(apiKey, 'tax_rules', trXml);
          }
        }
      }
    }

    // Lookup category from cache
    let catId = 2; // Home
    if (catName) {
      const catKey = normalize(catName).toLowerCase().replace(/\s+/g, ' ').trim();
      if (catsCache[catKey]) catId = catsCache[catKey];
    }

    // Format date and strictly validate DD/MM/YYYY
    let availDate = '';
    if (dateStr) {
      if (!/^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(dateStr)) {
        errors++;
        addLog({ icon: 'error', text: `Produit ${ref} (Ligne ${i+2}) : Format de date différent de DD/MM/YYYY (${dateStr})` });
        proc++; setProgress(Math.round((proc / totalSteps) * 100));
        continue;
      }
      const parts = dateStr.split('/');
      availDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    }

    // Create Product — use HT as price, PrestaShop will add tax via id_tax_rules_group
    const slug = normalize(nom).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const pXml = `<?xml version="1.0" encoding="UTF-8"?><prestashop><product>
      <name><language id="1"><![CDATA[${nom}]]></language></name>
      <reference><![CDATA[${ref}]]></reference>
      <price>${priceHT.toFixed(6)}</price>
      <wholesale_price>${prixAchat.toFixed(6)}</wholesale_price>
      <id_tax_rules_group>${idTaxRulesGroup}</id_tax_rules_group>
      <id_category_default>${catId}</id_category_default>
      <active>1</active>
      <state>1</state>
      ${availDate ? `<available_date>${availDate}</available_date>` : ''}
      <link_rewrite><language id="1"><![CDATA[${slug}]]></language></link_rewrite>
      <associations><categories><category><id>${catId}</id></category></categories></associations>
    </product></prestashop>`;

    const pRes = await createEntity(apiKey, 'products', pXml);
    if (pRes.success) {
      created++;
      prodsCache[ref] = { id: pRes.id, priceTTC: prixTtc, priceHT, taxRate };
      addLog({ icon: 'success', text: `Produit "${nom}" (${ref}) -> ID #${pRes.id} | TTC: ${prixTtc.toFixed(2)}€ | HT: ${priceHT.toFixed(2)}€` });
    } else {
      errors++;
      addLog({ icon: 'error', text: `Produit ${ref}: ${pRes.error}` });
    }
    proc++; setProgress(Math.round((proc / totalSteps) * 100));
  }

  // ────────────────────────────────────────────
  // 2. Process COMBINATIONS / STOCKS
  // ────────────────────────────────────────────
  addLog({ icon: 'working', text: '── Import Déclinaisons / Stocks ──' });
  const combsRows = csvFiles[1].rows;
  const optionsCache = {}; // specName -> id
  const optValuesCache = {}; // specName_valName -> id
  const combCache = {}; // ref_attr -> combId

  for (let i = 0; i < combsRows.length; i++) {
    const ref = getVal(1, i, 'reference');
    const spec = getVal(1, i, 'specificite');
    const kara = getVal(1, i, 'karazany');
    const stock = parseInt(getVal(1, i, 'stock_initial') || '0', 10);
    const prixVenteTtcStr = getVal(1, i, 'prix_vente_ttc');

    const prodInfo = prodsCache[ref];
    if (!prodInfo) {
      if (ref) { errors++; addLog({ icon: 'error', text: `Déclinaison ${ref}: Produit introuvable` }); }
      proc++; setProgress(Math.round((proc / totalSteps) * 100));
      continue;
    }

    if (!spec && !kara) {
      // No combination — just update main product stock
      try {
        const fetchStk = await fetch(`/ps-api/stock_availables?ws_key=${apiKey}&output_format=JSON&display=full&filter[id_product]=${prodInfo.id}&filter[id_product_attribute]=0`);
        const d = await fetchStk.json();
        const sa = d.stock_availables;
        if (sa && sa.length > 0) {
          const sId = sa[0].id;
          const sXml = `<?xml version="1.0" encoding="UTF-8"?><prestashop><stock_available><id>${sId}</id><id_product>${prodInfo.id}</id_product><id_product_attribute>0</id_product_attribute><id_shop>1</id_shop><quantity>${stock}</quantity><depends_on_stock>0</depends_on_stock><out_of_stock>2</out_of_stock></stock_available></prestashop>`;
          await fetch(`/ps-api/stock_availables/${sId}?ws_key=${apiKey}`, { method: 'PUT', body: sXml });
          created++;
          addLog({ icon: 'success', text: `Stock ${ref} -> ${stock}` });
        }
      } catch (e) {
        errors++;
        addLog({ icon: 'error', text: `Stock ${ref}: ${e.message}` });
      }
      proc++; setProgress(Math.round((proc / totalSteps) * 100));
      continue;
    }

    // Sanitize spec and kara: remove any non-printable or invisible characters
    const specClean = spec.replace(/[^\x20-\x7E\u00C0-\u024F]/g, '').trim();
    const karaClean = kara.replace(/[^\x20-\x7E\u00C0-\u024F]/g, '').trim();
    
    // Debug: log what we're working with
    console.log(`[Import] Row ${i}: ref="${ref}" spec="${specClean}" (raw len:${spec.length}, clean len:${specClean.length}) kara="${karaClean}"`);

    // Ensure Option group exists (e.g. "taille", "couleur")
    if (!optionsCache[specClean]) {
      const oXml = `<?xml version="1.0" encoding="UTF-8"?><prestashop><product_option><is_color_group>0</is_color_group><group_type>select</group_type><name><language id="1">${specClean}</language><language id="2">${specClean}</language></name><public_name><language id="1">${specClean}</language><language id="2">${specClean}</language></public_name></product_option></prestashop>`;
      const oRes = await createEntity(apiKey, 'product_options', oXml);
      if (oRes.success) {
        optionsCache[specClean] = oRes.id;
        addLog({ icon: 'success', text: `Option "${specClean}" -> #${oRes.id}` });
      } else {
        errors++;
        addLog({ icon: 'error', text: `Option "${specClean}": ${oRes.error}` });
      }
    }
    const optId = optionsCache[specClean];
    if (!optId) {
      errors++;
      addLog({ icon: 'error', text: `Déclinaison ${ref}-${karaClean}: option "${specClean}" introuvable` });
      proc++; setProgress(Math.round((proc / totalSteps) * 100));
      continue;
    }

    // Ensure OptionValue exists (e.g. "ngoza", "kely")
    const ovKey = `${specClean}_${karaClean}`;
    if (!optValuesCache[ovKey]) {
      const ovXml = `<?xml version="1.0" encoding="UTF-8"?><prestashop><product_option_value><id_attribute_group>${optId}</id_attribute_group><name><language id="1">${karaClean}</language><language id="2">${karaClean}</language></name></product_option_value></prestashop>`;
      const ovRes = await createEntity(apiKey, 'product_option_values', ovXml);
      if (ovRes.success) {
        optValuesCache[ovKey] = ovRes.id;
        addLog({ icon: 'success', text: `Valeur "${karaClean}" (${specClean}) -> #${ovRes.id}` });
      } else {
        errors++;
        addLog({ icon: 'error', text: `Valeur "${karaClean}" (${specClean}): ${ovRes.error}` });
      }
    }
    const valId = optValuesCache[ovKey];

    // Calculate price impact (difference between combination TTC price and parent TTC price)
    let impactHT = 0;
    if (prixVenteTtcStr) {
      const prixVenteTtc = parseFrFloat(prixVenteTtcStr);
      if (prixVenteTtc <= 0) {
        errors++;
        addLog({ icon: 'error', text: `Déclinaison ${ref}-${karaClean} (Ligne ${i+2}) : Montant positif obligatoire (> 0).` });
        proc++; setProgress(Math.round((proc / totalSteps) * 100));
        continue;
      }
      const impactTTC = prixVenteTtc - prodInfo.priceTTC;
      impactHT = prodInfo.taxRate > 0 ? impactTTC / (1 + prodInfo.taxRate) : impactTTC;
    }

    // Create Combination
    const cXml = `<?xml version="1.0" encoding="UTF-8"?><prestashop><combination><id_product>${prodInfo.id}</id_product><price>${impactHT.toFixed(6)}</price><minimal_quantity>1</minimal_quantity><associations><product_option_values><product_option_value><id>${valId}</id></product_option_value></product_option_values></associations></combination></prestashop>`;
    const cRes = await createEntity(apiKey, 'combinations', cXml);
    
    if (cRes.success) {
      created++;
      combCache[`${ref}_${karaClean}`] = { id: cRes.id, impactTTC: prixVenteTtcStr ? parseFrFloat(prixVenteTtcStr) - prodInfo.priceTTC : 0, impactHT };
      addLog({ icon: 'success', text: `Déclinaison ${ref} - ${kara} -> #${cRes.id}` });

      // Update Stock for this combination
      try {
        const fetchStk = await fetch(`/ps-api/stock_availables?ws_key=${apiKey}&output_format=JSON&display=full&filter[id_product]=${prodInfo.id}&filter[id_product_attribute]=${cRes.id}`);
        const d = await fetchStk.json();
        if (d.stock_availables && d.stock_availables.length > 0) {
          const sId = d.stock_availables[0].id;
          const sXml = `<?xml version="1.0" encoding="UTF-8"?><prestashop><stock_available><id>${sId}</id><id_product>${prodInfo.id}</id_product><id_product_attribute>${cRes.id}</id_product_attribute><id_shop>1</id_shop><quantity>${stock}</quantity><depends_on_stock>0</depends_on_stock><out_of_stock>2</out_of_stock></stock_available></prestashop>`;
          await fetch(`/ps-api/stock_availables/${sId}?ws_key=${apiKey}`, { method: 'PUT', body: sXml });
        }
      } catch (e) {
        errors++;
        addLog({ icon: 'error', text: `Stock ${ref}-${kara}: ${e.message}` });
      }
    } else {
      errors++;
      addLog({ icon: 'error', text: `Déclinaison ${ref}-${kara}: ${cRes.error}` });
    }
    proc++; setProgress(Math.round((proc / totalSteps) * 100));
  }

  // ────────────────────────────────────────────
  // 3. Upload ZIP Images BEFORE orders (so products have images)
  // ────────────────────────────────────────────
  if (zipFile) {
    addLog({ icon: 'working', text: '── Upload images ──' });
    try {
      const JSZip = (await import('jszip')).default;
      const zip = await JSZip.loadAsync(zipFile);
      
      for (const [filename, entry] of Object.entries(zip.files)) {
        if (entry.dir || !/\.(jpg|jpeg|png|gif|webp)$/i.test(filename)) continue;
        // Extract base name without path and extension
        const baseName = filename.replace(/^.*\//, '').replace(/\.[^.]+$/, '');

        // Match by reference (case-insensitive)
        const prodInfo = Object.entries(prodsCache).find(
          ([ref]) => ref.toLowerCase() === baseName.toLowerCase()
        );

        if (!prodInfo) {
          addLog({ icon: 'error', text: `Image "${filename}" — aucun produit avec ref "${baseName}"` });
          errors++;
          continue;
        }

        const [ref, info] = prodInfo;
        const blob = await entry.async('blob');
        const fd = new FormData();
        fd.append('image', blob, filename.replace(/^.*\//, ''));
        const r = await fetch(`/ps-api/images/products/${info.id}?ws_key=${apiKey}`, {
          method: 'POST',
          body: fd
        });
        if (r.ok) {
          created++;
          addLog({ icon: 'success', text: `Image "${filename}" -> Produit ${ref} (#${info.id})` });
        } else {
          errors++;
          const errText = await r.text().catch(() => '');
          addLog({ icon: 'error', text: `Image "${filename}" — échec (${r.status}) ${errText.substring(0, 80)}` });
        }
      }
    } catch (e) {
      addLog({ icon: 'error', text: `ZIP: ${e.message}` });
      errors++;
    }
    proc++; setProgress(Math.round((proc / totalSteps) * 100));
  } else {
    
  }

  // ────────────────────────────────────────────
  // 4. Process ORDERS / CARTS
  // ────────────────────────────────────────────
  addLog({ icon: 'working', text: '── Import Commandes / Paniers ──' });
  const ordersRows = csvFiles[2].rows;
  const custCache = {}; // email -> { idCustomer, idAddress }

  for (let i = 0; i < ordersRows.length; i++) {
    const nom = getVal(2, i, 'nom');
    const email = getVal(2, i, 'email');
    const pwd = getVal(2, i, 'pwd') || 'Prestashop123!';
    const adresse = getVal(2, i, 'adresse') || '1 rue par defaut';
    const achatStr = getVal(2, i, 'achat');
    const etatRaw = getVal(2, i, 'etat');
    const dateRaw = getVal(2, i, 'date'); // Extracted for orders
    const etat = normalize(etatRaw).toLowerCase().trim(); // "paiement accepte" or ""

    if (!email) {
      proc++; setProgress(Math.round((proc / totalSteps) * 100));
      continue;
    }

    let idCustomer, idAddress;

    // Reuse customer+address if same email already created
    if (custCache[email]) {
      idCustomer = custCache[email].idCustomer;
      idAddress = custCache[email].idAddress;
    } else {
      // Create Customer
      const custXml = `<?xml version="1.0" encoding="UTF-8"?><prestashop><customer><passwd><![CDATA[${pwd}]]></passwd><lastname><![CDATA[${nom}]]></lastname><firstname><![CDATA[Client]]></firstname><email><![CDATA[${email}]]></email><active>1</active></customer></prestashop>`;
      const custRes = await createEntity(apiKey, 'customers', custXml);
      if (!custRes.success) { errors++; addLog({ icon: 'error', text: `Client ${email}: ${custRes.error}` }); proc++; continue; }
      idCustomer = custRes.id;

      // Create Address
      const addrXml = `<?xml version="1.0" encoding="UTF-8"?><prestashop><address><id_customer>${idCustomer}</id_customer><id_country>8</id_country><alias>Facturation</alias><lastname><![CDATA[${nom}]]></lastname><firstname>Client</firstname><address1><![CDATA[${adresse}]]></address1><city>Ville</city></address></prestashop>`;
      const addrRes = await createEntity(apiKey, 'addresses', addrXml);
      if (!addrRes.success) { errors++; addLog({ icon: 'error', text: `Adresse ${email}: ${addrRes.error}` }); proc++; continue; }
      idAddress = addrRes.id;

      custCache[email] = { idCustomer, idAddress };
    }

    // Parse items
    const items = parseAchat(achatStr);
    console.log(`[Import] Commande ${email}: achatStr="${achatStr}" -> parsed ${items.length} items`);

    // Agréger les items identiques (même ref + attr) en sommant les quantités
    // Ex: [("P_23";1;""),("P_23";4;"")] → P_23 qty=5 dans un seul cart_row
    const aggregatedItems = [];
    items.forEach(it => {
      const attrClean = it.attr ? it.attr.replace(/[^\x20-\x7E\u00C0-\u024F]/g, '').trim() : '';
      const key = `${it.ref}__${attrClean}`;
      const existing = aggregatedItems.find(a => a.key === key);
      if (existing) {
        existing.qty += it.qty;
        console.log(`[Import] Agrégation: ${it.ref} (attr="${attrClean}") qty +${it.qty} → total ${existing.qty}`);
      } else {
        aggregatedItems.push({ key, ref: it.ref, qty: it.qty, attr: attrClean });
      }
    });

    let cartRowsXml = '';
    let totalPaid = 0;
    let totalPaidHT = 0;

    aggregatedItems.forEach(it => {
      const prodInfo = prodsCache[it.ref];
      if (prodInfo) {
        let combId = 0;
        let itemPriceTTC = prodInfo.priceTTC;
        let itemPriceHT = prodInfo.priceHT;
        if (it.attr) {
          const combObj = combCache[`${it.ref}_${it.attr}`];
          if (combObj) {
            combId = combObj.id;
            itemPriceTTC += combObj.impactTTC;
            itemPriceHT += combObj.impactHT;
          }
        }
        totalPaid += itemPriceTTC * it.qty;
        totalPaidHT += itemPriceHT * it.qty;
        cartRowsXml += `<cart_row><id_product>${prodInfo.id}</id_product><id_product_attribute>${combId}</id_product_attribute><id_address_delivery>${idAddress}</id_address_delivery><quantity>${it.qty}</quantity></cart_row>`;
      } else {
        console.warn(`[Import] Commande ${email}: produit ${it.ref} introuvable`);
      }
    });

    if (!cartRowsXml) {
      addLog({ icon: 'error', text: `Panier ${email}: Aucun produit valide trouvé (achat: ${achatStr})` });
      errors++;
      proc++; setProgress(Math.round((proc / totalSteps) * 100));
      continue;
    }

    // Create Cart
    const cartXml = `<?xml version="1.0" encoding="UTF-8"?><prestashop><cart><id_currency>2</id_currency><id_lang>1</id_lang><id_customer>${idCustomer}</id_customer><id_address_delivery>${idAddress}</id_address_delivery><id_address_invoice>${idAddress}</id_address_invoice><associations><cart_rows>${cartRowsXml}</cart_rows></associations></cart></prestashop>`;
    const cartRes = await createEntity(apiKey, 'carts', cartXml);
    
    if (!cartRes.success) { errors++; addLog({ icon: 'error', text: `Panier ${email}: ${cartRes.error}` }); proc++; continue; }
    const idCart = cartRes.id;

    // Decide: If empty → just Cart (panier). If not empty → Order.
    if (etat.length > 0) {
      let stateId = 2; // Default: Paiement accepté
      if (etat.includes('livre')) stateId = 5;
      else if (etat.includes('annule')) stateId = 6;

      const orderXml = `<?xml version="1.0" encoding="UTF-8"?><prestashop><order>
        <id_cart>${idCart}</id_cart>
        <id_currency>2</id_currency>
        <id_lang>1</id_lang>
        <id_customer>${idCustomer}</id_customer>
        <id_address_delivery>${idAddress}</id_address_delivery>
        <id_address_invoice>${idAddress}</id_address_invoice>
        <id_carrier>0</id_carrier>
        <current_state>${stateId}</current_state>
        <payment>Paiement Accepte</payment>
        <module>ps_wirepayment</module>
        <total_paid>${totalPaid.toFixed(6)}</total_paid>
        <total_paid_real>${totalPaid.toFixed(6)}</total_paid_real>
        <total_products>${totalPaidHT.toFixed(6)}</total_products>
        <total_products_wt>${totalPaid.toFixed(6)}</total_products_wt>
        <conversion_rate>1</conversion_rate>
      </order></prestashop>`;
      const ordRes = await createEntity(apiKey, 'orders', orderXml);
      if (ordRes.success) { 
        created++;
        addLog({ icon: 'success', text: `Commande ${email} -> ID #${ordRes.id} (${totalPaid.toFixed(2)}€)` });
        
        // FORCER LE STATUT VIA ORDER_HISTORY (Nécessaire car PrestaShop ignore souvent current_state à la création)
        if (stateId !== 2) {
          const histXml = `<?xml version="1.0" encoding="UTF-8"?><prestashop><order_history><id_order>${ordRes.id}</id_order><id_order_state>${stateId}</id_order_state></order_history></prestashop>`;
          const histRes = await createEntity(apiKey, 'order_histories', histXml);
          if (histRes.success) {
            addLog({ icon: 'success', text: `Commande #${ordRes.id} passée au statut ${stateId}` });
          } else {
            addLog({ icon: 'warning', text: `Commande #${ordRes.id} : Échec du changement de statut (${histRes.error})` });
          }
        }
      } else {
        errors++;
        addLog({ icon: 'error', text: `Commande ${email}: ${ordRes.error}` });
      }
    } else {
      // Empty etat → just a cart (panier), no order created
      created++;
      addLog({ icon: 'success', text: `Panier ${email} -> ID #${idCart} (pas de commande)` });
    }

    proc++; setProgress(Math.round((proc / totalSteps) * 100));
  }

  return { totalCreated: created, totalErrors: errors };
}
