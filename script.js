const root = document.getElementById('fuller-preview');
const menu = root.querySelector('.fp-menu');
const links = root.querySelector('.fp-links');
menu.addEventListener('click', () => {
  const open = links.classList.toggle('fp-open');
  menu.setAttribute('aria-expanded', String(open));
});
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  links.classList.remove('fp-open');
  menu.setAttribute('aria-expanded', 'false');
}));
const form = root.querySelector('form');
const button = form.querySelector('button[type="submit"]');
const status = root.querySelector('.fp-status');
let sending = false;
form.addEventListener('submit', async event => {
  event.preventDefault();
  if (sending || !form.reportValidity()) return;
  sending = true;
  button.disabled = true;
  button.textContent = 'Sending…';
  form.setAttribute('aria-busy', 'true');
  status.textContent = 'Sending your enquiry…';
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch(form.action, {
      method: 'POST', body: new FormData(form),
      headers: { Accept: 'application/json' }, signal: controller.signal
    });
    if (!response.ok) {
      let result = {};
      try { result = await response.json(); } catch (_) {}
      const message = Array.isArray(result.errors) ? result.errors.map(e => e.message).join(' ') : '';
      throw new Error(message || 'Your enquiry could not be sent. Please try again or email tristan@fuller-pm.co.uk.');
    }
    form.reset();
    status.textContent = 'Thank you — your enquiry has been sent. I’ll get back to you to discuss the work.';
  } catch (error) {
    status.textContent = error.name === 'AbortError'
      ? 'The request timed out, so delivery could not be confirmed. Please email tristan@fuller-pm.co.uk if you need to check.'
      : (error instanceof TypeError
        ? 'Unable to connect. Your details are still here. Please try again or email tristan@fuller-pm.co.uk.'
        : error.message);
  } finally {
    clearTimeout(timeout);
    sending = false;
    button.disabled = false;
    button.textContent = 'Get a quote ↗';
    form.removeAttribute('aria-busy');
  }
});
