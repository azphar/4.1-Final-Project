// --- grab elements on Page 2 ---
const FORM   = document.getElementById('filterForm');
const FILTER = document.getElementById('filter');
const GRID   = document.getElementById('destGrid');
const STATUS = document.getElementById('status');

// read ?q= from Page 1 (optional)
const params = new URLSearchParams(location.search);
const qParam = params.get('q')?.trim() || '';

// --- fetch 6 destinations (no API key needed) ---
async function fetchDestinations() {
  STATUS.textContent = 'Loading destinations…';
  try {
    const codes = ['fji','mdv','nzl','nld','kna','pan']; // Fiji, Maldives, New Zealand, Netherlands, Saint Kitts & Nevis, Panama
    const url = `https://restcountries.com/v3.1/alpha?codes=${codes.join(',')}&fields=name,flags,capital,region,subregion,cca3`;
    const res = await fetch(url);
    const LOCAL_PHOTOS = {
        
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.map(c => ({
      id: c.cca3,
      name: c.name?.common ?? 'Unknown',
      capital: Array.isArray(c.capital) ? c.capital[0] : (c.capital ?? '—'),
      region: c.region ?? '—',
      subregion: c.subregion ?? '',
      flag: (c.flags && (c.flags.svg || c.flags.png)) || ''
    }));
  } catch (e) {
    console.error(e);
    STATUS.textContent = 'Failed to load. Please try again.';
    return [];
  }
}

// --- render 6 cards ---
function render(items) {
  const six = items.slice(0, 6);
  GRID.innerHTML = six.map(it => `
    <article class="card">
      <img src="${it.flag}" alt="${it.name} flag">
      <h3>${it.name}</h3>
      <p><strong>Capital:</strong> ${it.capital}</p>
      <p><strong>Region:</strong> ${it.region}${it.subregion ? ' · ' + it.subregion : ''}</p>
      <a class="cta" href="https://www.google.com/travel/flights?q=${encodeURIComponent(it.name)}" target="_blank" rel="noopener">Explore</a>
    </article>
  `).join('');
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
  if (qParam && FILTER) FILTER.value = qParam;   // prefill from ?q=
  applyFilter(all);                               // initial render
  FORM?.addEventListener('submit', e => { e.preventDefault(); applyFilter(all); });
  FILTER?.addEventListener('input', () => applyFilter(all));
});

