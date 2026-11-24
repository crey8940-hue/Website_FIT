// FINDIT promotional website - interactions
document.documentElement.classList.add('js');

// scroll progress bar + sticky header style
const header = document.querySelector('header');
const bar = document.getElementById('progress');
function onScroll() {
  const h = document.documentElement;
  bar.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + '%';
  header.classList.toggle('scrolled', h.scrollTop > 20);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// mobile menu
const menu = document.getElementById('menu');
const burger = document.querySelector('.burger');
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));

// highlight the nav link of the section in view
const links = [...menu.querySelectorAll('a[href^="#"]')];
const spy = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach(s => spy.observe(s));

// reveal cards on scroll (staggered)
document.querySelectorAll('.card, .sec-head, .cta, .laptop-wrap').forEach((el, i) => {
  el.classList.add('reveal');
  el.style.setProperty('--d', (i % 3) * 0.1 + 's');
});
const reveal = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); reveal.unobserve(e.target); } });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => reveal.observe(el));

// rotating word in hero
const words = ['keys', 'wallet', 'phone', 'student ID', 'backpack'];
const rot = document.getElementById('rot');
let w = 0, c = 0, del = false;
(function type() {
  const word = words[w];
  rot.textContent = word.slice(0, c);
  if (!del && c === word.length) { del = true; return setTimeout(type, 1400); }
  if (del && c === 0) { del = false; w = (w + 1) % words.length; }
  c += del ? -1 : 1;
  setTimeout(type, del ? 45 : 90);
})();

// laptop tilts toward the mouse
const wrap = document.querySelector('.laptop-wrap');
const laptop = document.querySelector('.laptop');
if (window.matchMedia('(hover:hover)').matches) {
  wrap.addEventListener('mousemove', e => {
    const r = wrap.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    laptop.style.transform = `rotateY(${x * 14}deg) rotateX(${-y * 10}deg)`;
  });
  wrap.addEventListener('mouseleave', () => laptop.style.transform = '');
}

// inquiry form validation (no backend)
const form = document.getElementById('inquiry');
const msg = document.getElementById('msg');
form.addEventListener('submit', e => {
  e.preventDefault();
  let ok = true;
  form.querySelectorAll('.field').forEach(f => {
    const input = f.querySelector('input,select,textarea');
    const bad = !input.value.trim() || (input.type === 'email' && !/^\S+@\S+\.\S+$/.test(input.value));
    f.classList.toggle('err', bad);
    if (bad) ok = false;
  });
  msg.classList.toggle('show', ok);
  if (ok) form.reset();
});

// glass cards: light spot follows the cursor
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    card.style.setProperty('--my', (e.clientY - r.top) + 'px');
  });
});
