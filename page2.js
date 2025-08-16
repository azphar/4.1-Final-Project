const params = new URLSearchParams(location.search);
const qParam = params.get('q')?.trim() || '';

document.addEventListener('DOMContentLoaded', async () => {
  const all = await fetchDestinations();   // your existing fetch
  if (qParam && FILTER) FILTER.value = qParam;
  applyFilter(all);                        // your existing filter/render
  FORM.addEventListener('submit', e => { e.preventDefault(); applyFilter(all); });
  FILTER.addEventListener('input', () => applyFilter(all));
});
