/* Keep background media quiet while the page or the media is out of view. */
(() => {
  'use strict';
  const init = () => {
    const animations = [...document.querySelectorAll('.mq-track')].map(element => ({
      element, visible: true, original: element.style.animationPlayState
    }));
    const videos = [...document.querySelectorAll('video')].map(element => ({
      element, visible: true, suspended: false
    }));
    function updateAnimation(item) {
      item.element.style.animationPlayState = document.hidden || !item.visible ? 'paused' : item.original;
    }
    function updateVideo(item) {
      const video = item.element;
      const auto = video.autoplay || video.loop;
      if (document.hidden || !item.visible) {
        if (!video.paused) { item.suspended = auto; video.pause(); }
      } else if (item.suspended) {
        item.suspended = false;
        // Desktop scroll scrubbing keeps the video paused; resume only its autoplay fallback.
        if (auto) video.play().catch(() => {});
      }
    }
    if ('IntersectionObserver' in window) {
      const items = new Map([...animations, ...videos].map(item => [item.element, item]));
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          const item = items.get(entry.target); item.visible = entry.isIntersecting;
          item.element.tagName === 'VIDEO' ? updateVideo(item) : updateAnimation(item);
        });
      });
      items.forEach(item => observer.observe(item.element));
    }
    videos.forEach(item => item.element.addEventListener('play', () => updateVideo(item)));
    document.addEventListener('visibilitychange', () => {
      animations.forEach(updateAnimation); videos.forEach(updateVideo);
    });
    animations.forEach(updateAnimation); videos.forEach(updateVideo);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
