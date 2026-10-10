(() => {
  // Static exports already provide their own carousel, filters and 3D handlers.
  // Keep the original reveal rhythm without asking Next to rehydrate edited HTML.
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const element = entry.target;
        const items = element.classList.contains('vx-lista') ? [...element.children] : [element];
        items.forEach((item, index) => {
          item.animate([
            { opacity: 0, transform: 'translateY(14px)' },
            { opacity: 1, transform: 'translateY(0)' }
          ], { duration: 650, delay: Math.min(index * 55, 420), easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' });
        });
        observer.unobserve(element);
      });
    }, { rootMargin: '0px 0px -15% 0px', threshold: 0 });
    document.querySelectorAll('.vx-revelar, .vx-lista').forEach(element => observer.observe(element));
  }
  const hiddenTitleLines = [...document.querySelectorAll('h2 span[style*="translateY(112%)"]')];
  if (reduce || !('IntersectionObserver' in window)) hiddenTitleLines.forEach(line => { line.style.transition = 'none'; line.style.transform = 'translateY(0)'; });
  else {
    const titles = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.querySelectorAll('span[style*="translateY(112%)"]').forEach(line => { line.style.transform = 'translateY(0)'; });
        titles.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    [...new Set(hiddenTitleLines.map(line => line.closest('h2')))].forEach(title => titles.observe(title));
  }
  const header = document.querySelector('header');
  if (header) {
    const paintHeader = () => {
      header.style.backgroundColor = scrollY > 20 ? 'color-mix(in srgb, var(--tinta) 95%, transparent)' : 'transparent';
      header.style.backdropFilter = scrollY > 20 ? 'blur(12px)' : 'none';
    };
    addEventListener('scroll', paintHeader, { passive: true });
    paintHeader();
  }
  const roomLabel = document.getElementById('label-comodo-3d');
  if (roomLabel) {
    roomLabel.style.backgroundColor = 'color-mix(in srgb, var(--superficie) 92%, transparent)';
    roomLabel.style.padding = '4px 6px';
    roomLabel.style.borderRadius = '2px';
    roomLabel.style.lineHeight = '1.45';
  }
  document.documentElement.style.scrollBehavior = reduce ? 'auto' : 'smooth';
})();
