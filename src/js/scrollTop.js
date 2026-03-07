const btn = document.getElementById('scrollTopBtn');

if (btn) {
  const colorZones = [
    { from: 300, to: 800, color: '#4CAF50' }, //  Hero
    { from: 800, to: 1600, color: '#2196F3' }, //  Pets
    { from: 1600, to: 2400, color: '#9C27B0' }, //  About Us
    { from: 2400, to: 3200, color: '#FF9800' }, //  FAQ
    { from: 3200, to: 4000, color: '#E91E63' }, //  Stories
    { from: 4000, to: Infinity, color: '#eb0404' }, //  Footer
  ];

  function getColorByScroll(scrollY) {
    const zone = colorZones.find(z => scrollY >= z.from && scrollY < z.to);
    return zone ? zone.color : null;
  }

  window.addEventListener('scroll', () => {
    const y = window.scrollY;

    btn.classList.toggle('is-visible', y > 300);

    const color = getColorByScroll(y);
    if (color) btn.style.backgroundColor = color;
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
