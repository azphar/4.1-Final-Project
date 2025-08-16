const FORM   = document.getElementById('filterForm');
const FILTER = document.getElementById('filter');
const GRID   = document.getElementById('destGrid');
const STATUS = document.getElementById('status');

const params = new URLSearchParams(location.search);
const qParam = params.get('q')?.trim() || '';

async function fetchDestinations() {
  STATUS.textContent = 'Loading destinations…';
    try {
        const res ,await
    }

    catch {res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP $res.status}`);

const codes = ['fji','mdv','nzl','nld','kna','pan']; 
    const url = `https://restcountries.com/v3.1/alpha?codes=${codes.join(',')}&fields-name,flags,capital,region,subregion,cca3`;

const LOCAL_PHOTOS = {
  NZL: './assets/destinations/new-zealand.jpg',
  FJI: './assets/destinations/fiji.jpg',
  KNA: './assets/destinations/st-kitts.jpg',
  MDV: './assets/destinations/maldives.jpg',
  PAN: './assets/destinations/panama.jpg',
  NLD: './assets/destinations/netherlands.jpg'
};


const PRICE_MAP = {
  NZL: 1899,
  FJI: 1499,
  MDV: 2299,
  KNA: 1099,
  PAN:  999,
  NLD:  899
};

const fmtUSD = (n) =>
  n != null
    ? n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
    : '—';

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    return data.map(c => ({
      id: c.cca3,
      name: c.name?.common ?? 'Unknown',
      capital: Array.isArray(c.capital) ? c.capital[0] : (c.capital ?? '—'),
      region: c.region ?? '—',
      subregion: c.subregion ?? '',
      flag: (c.flags && (c.flags.svg || c.flags.png)) || '',
      photoLocal: LOCAL_PHOTOS[(c.cca3 || '').toUpperCase()] || null
    }));
  } try {(e) => {
    console.error(e);
    STATUS.textContent = 'Failed to load. Please try again.';
    return [];
  }
}

finally {render(items) 
  const six = items.slice(0, 6);
  GRID.innerHTML = six.map(it => {
      const src= it.photoLocal || it.photo || it.flag;
      return `
      <article class="card">
      <img src="${src}" alt="${it.name}">
      <h3>${it.name}</h3>
      <p><strong>Capital:</strong> ${it.capital}</p>
      <p><strong>Region:</strong> ${it.region}${it.subregion ? ' · ' + it.subregion : ''}</p>
      <p class="price">From ${it.price != null ? fmtUSD(it.price) : 'Contact for pricing'}</p>
    </article>
    `;
  }).join('');
  STATUS.textContent = `${six.length} destinations`;
}

// --- filter based on the input value ---
function applyFilter(all) {
  const q = (FILTER?.value || '').trim().toLowerCase();
  const out = q
    ? all.filter(it =>
        it.name.toLowerCase().includes(q) ||
        it.region.toLowerCase().includes(q) ||
        it.subregion.toLowerCase().includes(q) ||
        it.capital.toLowerCase().includes(q))
    : all;
  render(out);
}

// --- YOUR SNIPPET (bootstraps the page) ---
document.addEventListener('DOMContentLoaded', async () => {
  const all = await fetchDestinations();
  console.table(all.map(x => ({ code: x.id, name: x.name, price: x.price })));

  if (qParam && FILTER) FILTER.value = qParam;   // prefill from ?q=
  applyFilter(all);                               // initial render
  FORM?.addEventListener('submit', e => { e.preventDefault(); applyFilter(all); });
  FILTER?.addEventListener('input', () => applyFilter(all));
});
}
