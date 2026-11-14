(() => {
  document.documentElement.classList.add('js-enabled');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  const navLinks = [...document.querySelectorAll('.main-nav a')];
  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();

  function closeMenu() {
    nav?.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Open navigation menu');
    document.body.classList.remove('menu-open');
  }

  menuButton?.addEventListener('click', () => {
    const open = !nav.classList.contains('is-open');
    nav.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    document.body.classList.toggle('menu-open', open);
  });

  navLinks.forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });
  document.addEventListener('click', event => {
    if (nav?.classList.contains('is-open') && !nav.contains(event.target) && !menuButton?.contains(event.target)) closeMenu();
  });

  // Reveal content progressively while keeping all text visible without JS.
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -35px 0px' });
    reveals.forEach(item => revealObserver.observe(item));
  } else {
    reveals.forEach(item => item.classList.add('is-visible'));
  }

  const sections = document.querySelectorAll('main section[id]');
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(a => {
          const active = a.getAttribute('href') === `#${entry.target.id}`;
          if (active) a.setAttribute('aria-current', 'location');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-28% 0px -62% 0px' });
    sections.forEach(section => sectionObserver.observe(section));
  }
})();
