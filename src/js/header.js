(() => {
  const burgerButton = document.querySelector('.burger-buttom');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (!burgerButton || !mobileMenu) return;

  const mobileLinks = mobileMenu.querySelectorAll('.mobile-menu__link');
  const closeButton = mobileMenu.querySelector('.mobile-menu__close');
  const OPEN_CLASS = 'is-open';
  const BODY_LOCK_CLASS = 'no-scroll';

  const closeMenu = () => {
    if (mobileMenu.contains(document.activeElement)) {
      document.activeElement.blur();
    }

    mobileMenu.classList.remove(OPEN_CLASS);
    document.body.classList.remove(BODY_LOCK_CLASS);
    burgerButton.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  };

  const toggleMenu = () => {
    const willOpen = !mobileMenu.classList.contains(OPEN_CLASS);

    if (willOpen) {
      mobileMenu.classList.add(OPEN_CLASS);
      document.body.classList.add(BODY_LOCK_CLASS);
      burgerButton.setAttribute('aria-expanded', 'true');
      mobileMenu.setAttribute('aria-hidden', 'false');

      closeButton?.focus();
    } else {
      closeMenu();
    }
  };

  burgerButton.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      setTimeout(closeMenu, 50);
    });
  });

  const scrollButtons = mobileMenu.querySelectorAll('[data-scroll-to]');

scrollButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.dataset.scrollTo;
    const target = document.getElementById(targetId);

    closeMenu();

    setTimeout(() => {
      target?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  });
});

  if (closeButton) {
    closeButton.addEventListener('click', closeMenu);
  }

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });

  window.matchMedia('(min-width: 1440px)').addEventListener('change', event => {
    if (event.matches) {
      closeMenu();
    }
  });
})();



document.addEventListener('click', e => {
  const btn = e.target.closest('[data-scroll-to]');
  if (!btn) return;

  const targetId = btn.dataset.scrollTo;
  const target = document.getElementById(targetId);

  if (!target) return;

  target.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
});