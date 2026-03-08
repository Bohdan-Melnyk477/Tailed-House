(() => {
  const burgerButton = document.querySelector('.burger-buttom');
  const mobileMenu = document.querySelector('.mobile-menu');

  function scrollToTarget(targetId) {
    const cleanId = targetId.replace('#', '');
    const target = document.getElementById(cleanId);

    if (!target) return;

    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  const scrollButtons = document.querySelectorAll('[data-scroll-to]');

  scrollButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.scrollTo;

      if (mobileMenu && mobileMenu.contains(btn)) {
        closeMenu();

        setTimeout(() => {
          scrollToTarget(targetId);
        }, 100);

        return;
      }

      scrollToTarget(targetId);
    });
  });

  if (!burgerButton || !mobileMenu) return;

  const mobileLinks = mobileMenu.querySelectorAll('.mobile-menu__link');
  const closeButton = mobileMenu.querySelector('.mobile-menu__close');
  const OPEN_CLASS = 'is-open';
  const BODY_LOCK_CLASS = 'no-scroll';

  function closeMenu() {
    if (mobileMenu.contains(document.activeElement)) {
      document.activeElement.blur();
    }

    mobileMenu.classList.remove(OPEN_CLASS);
    document.body.classList.remove(BODY_LOCK_CLASS);
    burgerButton.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  }

  function toggleMenu() {
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
  }

  burgerButton.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      setTimeout(closeMenu, 50);
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