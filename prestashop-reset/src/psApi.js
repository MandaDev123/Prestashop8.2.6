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
    // Extract error message from XML
    const msgMatch = text.match(/<message><!\[CDATA\[(.+?)\]\]><\/message>/s);
    const msg = msgMatch ? msgMatch[1] : text.substring(0, 150);
    return { success: false, error: `HTTP ${res.status}: ${msg}` };
  }
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
