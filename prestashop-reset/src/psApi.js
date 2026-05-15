/**
 * PrestaShop Webservice API utility — all calls go through Vite proxy → native PS API.
 * No custom PHP backend needed.
 */

const BASE = '/ps-api';

// ── Helper: build auth query string ──
const qs = (key, extra = {}) => {
  const params = new URLSearchParams({ ws_key: key, output_format: 'JSON', ...extra });
  return '?' + params.toString();
};

// ── GET: fetch all IDs for a resource ──
export async function fetchAllIds(apiKey, resource) {
  const res = await fetch(`${BASE}/${resource}${qs(apiKey, { display: '[id]' })}`);
  if (!res.ok) throw new Error(`GET ${resource}: HTTP ${res.status}`);
  const data = await res.json();
  // PS returns { resource_name: [{ id: N }, ...] } or empty
  const key = Object.keys(data).find(k => k !== 'errors');
  if (!key || !data[key]) return [];
  return Array.isArray(data[key]) ? data[key].map(o => o.id) : [];
}

// ── DELETE: batch delete IDs for a resource ──
export async function deleteIds(apiKey, resource, ids) {
  if (!ids.length) return { deleted: 0, errors: [] };
  // PS supports DELETE /resource/?id=[1,2,3]
  const batchSize = 50;
  let deleted = 0;
  const errors = [];
  for (let i = 0; i < ids.length; i += batchSize) {
    const batch = ids.slice(i, i + batchSize);
    const idParam = `[${batch.join(',')}]`;
    try {
      const res = await fetch(
        `${BASE}/${resource}/${qs(apiKey)}&id=${idParam}`,
        { method: 'DELETE' }
      );
      if (res.ok || res.status === 204) {
        deleted += batch.length;
      } else {
        const text = await res.text();
        errors.push(`${resource} batch ${i}: HTTP ${res.status} — ${text.substring(0, 100)}`);
      }
    } catch (e) {
      errors.push(`${resource} batch ${i}: ${e.message}`);
    }
  }
  return { deleted, errors };
}

// ── POST: create a single entity via XML ──
export async function createEntity(apiKey, resource, xml) {
  const res = await fetch(`${BASE}/${resource}${qs(apiKey)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'text/xml' },
    body: xml,
  });
  const text = await res.text();
  if (!res.ok) {
    // Try JSON error first
    try {
      const json = JSON.parse(text);
      const msg = json.errors?.map(e => e.message).join(', ') || JSON.stringify(json);
      return { success: false, error: `HTTP ${res.status}: ${msg}` };
    } catch {}
    // Fallback to XML error
    const msgMatch = text.match(/<message><!\[CDATA\[(.+?)\]\]><\/message>/s);
    const msg = msgMatch ? msgMatch[1] : text.substring(0, 150);    
    return { success: false, error: `HTTP ${res.status}: ${msg}` };
  }
  // Try JSON response first (output_format=JSON)
  try {
    const json = JSON.parse(text);
    const key = Object.keys(json)[0]; // e.g. "address", "customer", "cart", etc.
    if (key && json[key]?.id) return { success: true, id: String(json[key].id) };
  } catch {}
  // Fallback to XML regex
  const idMatch = text.match(/<id><!\[CDATA\[(\d+)\]\]><\/id>|<id>(\d+)<\/id>/);
  return { success: true, id: idMatch ? (idMatch[1] || idMatch[2]) : null };
}

// ── Validate API key by hitting the root endpoint ──
export async function validateKey(apiKey) {
  try {
    const res = await fetch(`${BASE}/${qs(apiKey)}`);
    return res.ok;
  } catch { return false; }
}

// ══════════════════════════════════════════════
// RESET: Categories of data to purge (Option A)
// ══════════════════════════════════════════════

export const RESET_CATEGORIES = {
  orders: {
    label: 'Commandes & Paiements',
    description: 'Commandes, factures, paiements, retours, avoirs',
    icon: 'receipt_long',
    // Delete children first, then parent — respects FK order
    resources: [
      'order_details', 'order_histories', 'order_invoices',
      'order_payments', 'order_carriers', 'order_cart_rules',
      'order_slip', 'orders',
    ],
  },
  carts: {
    label: 'Paniers',
    description: 'Tous les paniers clients (abandonnés ou non)',
    icon: 'shopping_cart',
    resources: ['carts'],
  },
  customers: {
    label: 'Clients & Adresses',
    description: 'Comptes clients, adresses, fils SAV, messages',
    icon: 'people',
    resources: ['customer_messages', 'customer_threads', 'addresses', 'customers'],
  },
  guests: {
    label: 'Visiteurs anonymes',
    description: 'Sessions visiteurs non-inscrits',
    icon: 'visibility_off',
    resources: ['guests'],
  },
};

// ══════════════════════════════════════════════
// IMPORT: Entity definitions + smart CSV mapping
// ══════════════════════════════════════════════

export const IMPORT_ENTITIES = {
  manufacturers: {
    label: 'Fabricants', resource: 'manufacturers', depends: [],
    fields: {
      name: { req: true, aliases: ['nom','marque','brand','fabricant'], i18n: true },
      active: { req: false, aliases: ['actif','enabled'], def: '1' },
      description: { req: false, aliases: ['desc','detail'], i18n: true },
    },
  },
  suppliers: {
    label: 'Fournisseurs', resource: 'suppliers', depends: [],
    fields: {
      name: { req: true, aliases: ['nom','fournisseur','supplier'], i18n: true },
      active: { req: false, aliases: ['actif','enabled'], def: '1' },
      description: { req: false, aliases: ['desc','detail'], i18n: true },
    },
  },
  categories: {
    label: 'Catégories', resource: 'categories', depends: [],
    fields: {
      name: { req: true, aliases: ['nom','categorie','category','titre','title','libelle'], i18n: true },
      id_parent: { req: false, aliases: ['parent','categorie_parent','parent_id'], def: '2' },
      active: { req: false, aliases: ['actif','enabled'], def: '1' },
      description: { req: false, aliases: ['desc','detail'], i18n: true },
      link_rewrite: { req: false, aliases: ['url','slug','lien','rewrite'], i18n: true },
    },
  },
  products: {
    label: 'Produits', resource: 'products', depends: ['categories','manufacturers','suppliers'],
    fields: {
      name: { req: true, aliases: ['nom','titre','title','libelle','designation','produit'], i18n: true },
      price: { req: true, aliases: ['prix','tarif','prix_ht','prix_vente','montant'] },
      reference: { req: false, aliases: ['ref','sku','code','code_article'] },
      id_category_default: { req: false, aliases: ['categorie','category','cat','id_cat'], def: '2' },
      id_manufacturer: { req: false, aliases: ['fabricant','manufacturer','marque','brand'] },
      id_supplier: { req: false, aliases: ['fournisseur','supplier'] },
      description: { req: false, aliases: ['desc','detail','description_longue'], i18n: true },
      description_short: { req: false, aliases: ['desc_courte','short_desc','resume'], i18n: true },
      quantity: { req: false, aliases: ['quantite','qty','stock','qte'] },
      weight: { req: false, aliases: ['poids'] },
      active: { req: false, aliases: ['actif','enabled','statut'], def: '1' },
      ean13: { req: false, aliases: ['ean','code_barre','barcode'] },
      link_rewrite: { req: false, aliases: ['url','slug','lien'], i18n: true },
    },
  },
  customers: {
    label: 'Clients', resource: 'customers', depends: [],
    fields: {
      firstname: { req: true, aliases: ['prenom','first_name','prénom'] },
      lastname: { req: true, aliases: ['nom','nom_famille','last_name'] },
      email: { req: true, aliases: ['mail','e-mail','courriel','adresse_mail'] },
      passwd: { req: false, aliases: ['password','mot_de_passe','mdp'], def: 'Prestashop123!' },
      id_gender: { req: false, aliases: ['genre','sexe','civilite','gender'], def: '1' },
      birthday: { req: false, aliases: ['date_naissance','anniversaire','dob'] },
      active: { req: false, aliases: ['actif','enabled'], def: '1' },
      newsletter: { req: false, aliases: ['abonne'], def: '0' },
    },
  },
  addresses: {
    label: 'Adresses', resource: 'addresses', depends: ['customers'],
    fields: {
      id_customer: { req: true, aliases: ['client','customer','id_client'] },
      alias: { req: false, aliases: ['libelle','label','type_adresse'], def: 'Mon adresse' },
      firstname: { req: true, aliases: ['prenom','first_name'] },
      lastname: { req: true, aliases: ['nom','last_name'] },
      address1: { req: true, aliases: ['adresse','adresse1','rue','street','address'] },
      address2: { req: false, aliases: ['adresse2','complement','apt'] },
      postcode: { req: true, aliases: ['code_postal','cp','zip','zipcode','postal'] },
      city: { req: true, aliases: ['ville','town'] },
      id_country: { req: false, aliases: ['pays','country','id_pays'], def: '8' },
      phone: { req: false, aliases: ['telephone','tel','fixe'] },
      phone_mobile: { req: false, aliases: ['mobile','portable','gsm'] },
      company: { req: false, aliases: ['societe','entreprise'] },
    },
  },
  combinations: {
    label: 'Déclinaisons', resource: 'combinations', depends: ['products'],
    fields: {
      id_product: { req: true, aliases: ['produit','product','id_produit'] },
      reference: { req: false, aliases: ['ref','sku','code'] },
      price: { req: false, aliases: ['impact_prix','prix','supplement'] },
      weight: { req: false, aliases: ['impact_poids','poids'] },
      quantity: { req: false, aliases: ['quantite','qty','stock'] },
    },
  },
};

// ── Normalize a CSV column name ──
function norm(col) {
  return col.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '');
}

// ── Match a single CSV column to best entity+field ──
function matchCol(csvCol, entityKey) {
  const c = norm(csvCol);
  const ent = IMPORT_ENTITIES[entityKey];
  if (!ent) return null;
  for (const [fn, fd] of Object.entries(ent.fields)) {
    if (c === fn) return { field: fn, confidence: 100 };
    for (const alias of fd.aliases) {
      if (c === alias) return { field: fn, confidence: 95 };
    }
  }
  // Fuzzy: check if column contains field name or alias
  for (const [fn, fd] of Object.entries(ent.fields)) {
    if (c.includes(fn) || fn.includes(c)) return { field: fn, confidence: 70 };
    for (const alias of fd.aliases) {
      if (c.includes(alias) || alias.includes(c)) return { field: fn, confidence: 65 };
    }
  }
  return null;
}

// ── Detect entity type from CSV headers ──
export function detectEntity(headers) {
  const scores = {};
  for (const [ek, ent] of Object.entries(IMPORT_ENTITIES)) {
    let score = 0, reqFound = 0, reqTotal = 0;
    for (const [fn, fd] of Object.entries(ent.fields)) {
      if (fd.req) reqTotal++;
      for (const h of headers) {
        const m = matchCol(h, ek);
        if (m && m.field === fn) { score += m.confidence; if (fd.req) reqFound++; break; }
      }
    }
    scores[ek] = { score, reqRatio: reqTotal > 0 ? reqFound / reqTotal : 0, label: ent.label };
  }
  // Sort by reqRatio first, then score
  const sorted = Object.entries(scores).sort(
    ([,a],[,b]) => (b.reqRatio * 1000 + b.score) - (a.reqRatio * 1000 + a.score)
  );
  return { best: sorted[0][0], scores };
}

// ── Auto-map CSV columns to entity fields ──
export function autoMapColumns(headers, entityKey) {
  const mapping = {};
  for (const h of headers) {
    const m = matchCol(h, entityKey);
    mapping[h] = m ? m.field : '_skip';
  }
  return mapping;
}

// ── Generate URL slug from text ──
function slugify(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// ── Build XML for PrestaShop POST ──
export function buildXML(entityKey, row, mapping, langId = 1) {
  const ent = IMPORT_ENTITIES[entityKey];
  const resource = ent.resource;
  const singular = resource.replace(/s$/, '');
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<prestashop xmlns:xlink="http://www.w3.org/1999/xlink">\n<${singular}>\n`;

  const mappedFields = new Set();
  let nameVal = '';

  for (const [csvCol, psField] of Object.entries(mapping)) {
    if (!psField || psField === '_skip') continue;
    mappedFields.add(psField);
    let val = (row[csvCol] || '').trim();
    if (!val && ent.fields[psField]?.def) val = ent.fields[psField].def;
    const escaped = val.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    if (psField === 'name') nameVal = val;
    if (ent.fields[psField]?.i18n) {
      xml += `<${psField}><language id="${langId}">${escaped}</language></${psField}>\n`;
    } else {
      xml += `<${psField}>${escaped}</${psField}>\n`;
    }
  }

  // Auto-generate link_rewrite if missing but name exists
  if (nameVal && !mappedFields.has('link_rewrite') && ent.fields.link_rewrite?.i18n) {
    xml += `<link_rewrite><language id="${langId}">${slugify(nameVal)}</language></link_rewrite>\n`;
  }

  // Fill defaults for unmapped fields
  for (const [fn, fd] of Object.entries(ent.fields)) {
    if (!mappedFields.has(fn) && fd.def) {
      if (fd.i18n) {
        xml += `<${fn}><language id="${langId}">${fd.def}</language></${fn}>\n`;
      } else {
        xml += `<${fn}>${fd.def}</${fn}>\n`;
      }
    }
  }

  xml += `</${singular}>\n</prestashop>`;
  return xml;
}

// ── Parse CSV (handles ; and , delimiters, quoted fields) ──
export function parseCSV(text) {
  const clean = text.replace(/^\uFEFF/, '');
  const firstLine = clean.split('\n')[0];
  const delim = (firstLine.split(';').length > firstLine.split(',').length) ? ';' : ',';
  const lines = [];
  let current = '', inQ = false;
  for (let i = 0; i < clean.length; i++) {
    const c = clean[i];
    if (c === '"') { inQ = !inQ; current += c; }
    else if (c === '\n' && !inQ) { if (current.trim()) lines.push(current); current = ''; }
    else if (c === '\r') { /* skip */ }
    else { current += c; }
  }
  if (current.trim()) lines.push(current);
  return lines.map(line => {
    const fields = []; let f = '', q = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"') q = !q;
      else if (c === delim && !q) { fields.push(f.trim()); f = ''; }
      else f += c;
    }
    fields.push(f.trim());
    return fields;
  });
}

// ── Sort import files by dependency order ──
export function sortByDeps(files) {
  const order = ['manufacturers','suppliers','categories','products','customers','addresses'];
  return [...files].sort((a, b) => {
    const ia = order.indexOf(a.entity); const ib = order.indexOf(b.entity);
    return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
  });
}

// ══════════════════════════════════════════════
// FRONTOFFICE + ORDER MANAGEMENT API
// ══════════════════════════════════════════════

// ── Fetch all products with details ──
export async function fetchProducts(apiKey) {
  const res = await fetch(`${BASE}/products${qs(apiKey, { display: 'full', 'filter[active]': '1' })}`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.products || [];
}

// ── Fetch single product ──
export async function fetchProduct(apiKey, id) {
  const res = await fetch(`${BASE}/products/${id}${qs(apiKey)}`);
  if (!res.ok) return null;
  const data = await res.json();
  return data.product || null;
}

// ── Fetch categories ──
export async function fetchCategoriesList(apiKey) {
  const res = await fetch(`${BASE}/categories${qs(apiKey, { display: 'full', 'filter[active]': '1' })}`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.categories || [];
}

// ── Get product image URL ──
export function productImageUrl(apiKey, productId, imageId) {
  return `${BASE}/images/products/${productId}/${imageId}${qs(apiKey)}`;
}

// ── Fetch all orders with details ──
export async function fetchOrders(apiKey) {
  const res = await fetch(`${BASE}/orders${qs(apiKey, { display: 'full', sort: '[id_DESC]' })}`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.orders || [];
}

// ── Fetch all carts ──
export async function fetchCarts(apiKey) {
  const res = await fetch(`${BASE}/carts${qs(apiKey, { display: 'full', sort: '[id_DESC]' })}`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.carts || [];
}

// ── Fetch orders by customer ID ──
export async function fetchOrdersByCustomer(apiKey, customerId) {
  const res = await fetch(`${BASE}/orders${qs(apiKey, { display: 'full', 'filter[id_customer]': customerId, sort: '[id_DESC]' })}`);
  if (!res.ok) return [];
  const data = await res.json();
  const orders = data.orders;
  if (!orders) return [];
  return Array.isArray(orders) ? orders : [orders];
}

// ── Find customer by email ──
export async function findCustomerByEmail(apiKey, email) {
  const res = await fetch(`${BASE}/customers${qs(apiKey, { display: 'full', 'filter[email]': email })}`);
  if (!res.ok) return null;
  const data = await res.json();
  const custs = data.customers;
  if (!custs || (Array.isArray(custs) && custs.length === 0)) return null;
  return Array.isArray(custs) ? custs[0] : custs;
}

// ── Fetch all customers ──
export async function fetchCustomers(apiKey) {
  const res = await fetch(`${BASE}/customers${qs(apiKey, { display: 'full', 'filter[active]': '1' })}`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.customers || [];
}

// ── Fetch specific prices (discounts) ──
export async function fetchSpecificPrices(apiKey) {
  const res = await fetch(`${BASE}/specific_prices${qs(apiKey, { display: 'full' })}`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.specific_prices || [];
}

// ── Fetch active countries ──
export async function fetchCountries(apiKey) {
  const res = await fetch(`${BASE}/countries${qs(apiKey, { display: 'full', 'filter[active]': 1 })}`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.countries || [];
}

// ── Fetch stock available ──
export async function fetchStockAvailables(apiKey, productId) {
  const res = await fetch(`${BASE}/stock_availables${qs(apiKey, { display: 'full', 'filter[id_product]': productId })}`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.stock_availables || [];
}

// ── Update stock available ──
export async function updateStockAvailable(apiKey, stockObj) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<prestashop><stock_available>
  <id>${stockObj.id}</id>
  <id_product>${stockObj.id_product}</id_product>
  <id_product_attribute>${stockObj.id_product_attribute}</id_product_attribute>
  <id_shop>${stockObj.id_shop}</id_shop>
  <quantity>${stockObj.quantity}</quantity>
  <depends_on_stock>${stockObj.depends_on_stock}</depends_on_stock>
  <out_of_stock>${stockObj.out_of_stock}</out_of_stock>
</stock_available></prestashop>`;
  const res = await fetch(`${BASE}/stock_availables/${stockObj.id}${qs(apiKey)}`, {
    method: 'PUT',
    body: xml
  });
  return res.ok;
}

// ── Fetch combinations for a product ──
export async function fetchProductCombinations(apiKey, productId) {
  const res = await fetch(`${BASE}/combinations${qs(apiKey, { display: 'full', 'filter[id_product]': productId })}`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.combinations || [];
}

// ── Fetch product option values ──
export async function fetchProductOptionValues(apiKey) {
  const res = await fetch(`${BASE}/product_option_values${qs(apiKey, { display: 'full' })}`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.product_option_values || [];
}

// ── Fetch product options ──
export async function fetchProductOptions(apiKey) {
  const res = await fetch(`${BASE}/product_options${qs(apiKey, { display: 'full' })}`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.product_options || [];
}

// ── Fetch order states ──
export async function fetchOrderStates(apiKey) {
  const res = await fetch(`${BASE}/order_states${qs(apiKey, { display: 'full' })}`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.order_states || [];
}

// ── Update order status via order_histories ──
export async function updateOrderStatus(apiKey, orderId, stateId) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<prestashop xmlns:xlink="http://www.w3.org/1999/xlink">
<order_history><id_order>${orderId}</id_order><id_order_state>${stateId}</id_order_state></order_history>
</prestashop>`;
  const res = await fetch(`${BASE}/order_histories${qs(apiKey)}`, {
    method: 'POST', headers: { 'Content-Type': 'text/xml' }, body: xml,
  });
  return res.ok;
}

// ── Upload product image ──
export async function uploadProductImage(apiKey, productId, imageBlob, fileName) {
  const form = new FormData();
  form.append('image', imageBlob, fileName);
  const res = await fetch(`${BASE}/images/products/${productId}${qs(apiKey)}`, {
    method: 'POST', body: form,
  });
  return res.ok;
}

// ── Fetch stock for a product ──
export async function fetchStock(apiKey, productId) {
  const res = await fetch(`${BASE}/stock_availables${qs(apiKey, { display: 'full', 'filter[id_product]': productId, 'filter[id_product_attribute]': '0' })}`);
  if (!res.ok) return null;
  const data = await res.json();
  const sa = data.stock_availables;
  if (!sa) return null;
  return Array.isArray(sa) ? sa[0] : sa;
}

// ── Create full order workflow: customer → address → cart → order ──
export async function createFullOrder(apiKey, customerInfo, cartItems, langId = 1) {
  // 1. Find or create customer
  let customer = await findCustomerByEmail(apiKey, customerInfo.email);
  let customerId;
  if (customer) {
    customerId = customer.id;
  } else {
    const custXml = `<?xml version="1.0" encoding="UTF-8"?>
<prestashop><customer>
<firstname>${esc(customerInfo.firstname)}</firstname>
<lastname>${esc(customerInfo.lastname)}</lastname>
<email>${esc(customerInfo.email)}</email>
<passwd>${esc(customerInfo.passwd || 'NewApp2026!')}</passwd>
<active>1</active>
</customer></prestashop>`;
    const r = await createEntity(apiKey, 'customers', custXml);
    if (!r.success) return { success: false, error: 'Création client: ' + r.error };
    customerId = r.id;
  }

  // 2. Create address
  const addrXml = `<?xml version="1.0" encoding="UTF-8"?>
<prestashop><address>
<id_customer>${customerId}</id_customer>
<alias>Livraison</alias>
<firstname>${esc(customerInfo.firstname)}</firstname>
<lastname>${esc(customerInfo.lastname)}</lastname>
<address1>${esc(customerInfo.address)}</address1>
<city>${esc(customerInfo.city)}</city>
<postcode>${esc(customerInfo.postcode)}</postcode>
<id_country>${customerInfo.id_country || 8}</id_country>
<phone>${esc(customerInfo.phone || '')}</phone>
</address></prestashop>`;
  const addrR = await createEntity(apiKey, 'addresses', addrXml);
  if (!addrR.success) return { success: false, error: 'Création adresse: ' + addrR.error };
  const addressId = addrR.id;

  // 3. Create cart with products
  let cartRows = '';
  for (const item of cartItems) {
    cartRows += `<cart_row><id_product>${item.id}</id_product><id_product_attribute>${item.combinationId || 0}</id_product_attribute><id_address_delivery>${addressId}</id_address_delivery><quantity>${item.qty}</quantity></cart_row>`;
  }
  const cartXml = `<?xml version="1.0" encoding="UTF-8"?>
<prestashop><cart>
<id_customer>${customerId}</id_customer>
<id_address_delivery>${addressId}</id_address_delivery>
<id_address_invoice>${addressId}</id_address_invoice>
<id_currency>2</id_currency>
<id_lang>${langId}</id_lang>
<associations><cart_rows>${cartRows}</cart_rows></associations>
</cart></prestashop>`;
  const cartR = await createEntity(apiKey, 'carts', cartXml);
  if (!cartR.success) return { success: false, error: 'Création panier: ' + cartR.error };

  // 4. Create order
  let totalPaid = 0;
  for (const item of cartItems) totalPaid += item.price * item.qty;
  const orderXml = `<?xml version="1.0" encoding="UTF-8"?>
<prestashop><order>
<id_address_delivery>${addressId}</id_address_delivery>
<id_address_invoice>${addressId}</id_address_invoice>
<id_cart>${cartR.id}</id_cart>
<id_currency>2</id_currency>
<id_lang>${langId}</id_lang>
<id_customer>${customerId}</id_customer>
<id_carrier>0</id_carrier>
<payment>Paiement à la livraison</payment>
<module>ps_cashondelivery</module>
<total_paid>${totalPaid.toFixed(6)}</total_paid>
<total_paid_real>${totalPaid.toFixed(6)}</total_paid_real>
<total_products>${totalPaid.toFixed(6)}</total_products>
<total_products_wt>${totalPaid.toFixed(6)}</total_products_wt>
<conversion_rate>1.000000</conversion_rate>
<current_state>12</current_state>
</order></prestashop>`;
  const orderR = await createEntity(apiKey, 'orders', orderXml);
  if (!orderR.success) return { success: false, error: 'Création commande: ' + orderR.error };

  return { success: true, orderId: orderR.id, customerId };
}

function esc(s) { return (s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
