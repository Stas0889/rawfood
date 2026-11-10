// Local candidate. Publication requires review for the actual Instatic page/revision.
(() => {
  const prefix = 'vlp-raw2030959-6b2f91';
  const videoUrls = new Set(["https://www.youtube.com/embed/OZ8Yi-raEyk?rel=0","https://www.youtube.com/embed/OzvwguvEII4?rel=0","https://www.youtube.com/embed/ijwQ0xnhCZo?rel=0","https://www.youtube.com/embed/CSeaBdiYPY4?rel=0","https://www.youtube.com/embed/QyHNkx-OIwY?rel=0","https://www.youtube.com/embed/ijwQ0xnhCZo?rel=0","https://www.youtube.com/embed/speSiZOy414?rel=0","https://www.youtube.com/embed/6rJ-s4zgb1I?rel=0","https://www.youtube.com/embed/Iot-B-cVtPw?rel=0","https://www.youtube.com/embed/6R4tk-4_y6Q?rel=0","https://www.youtube.com/embed/WEzR5jaLGZU?rel=0","https://www.youtube.com/embed/b3NdHusa1Xk?rel=0"]);

  function boot() {
    const root = document.querySelector(`.${prefix}-root`);
    if (!root || root.hasAttribute(`data-${prefix}-ready`)) return;
    root.setAttribute(`data-${prefix}-ready`, 'true');
    let activeVideo = null;

    root.addEventListener('click', event => {
      if (!(event.target instanceof Element)) return;
      const step = event.target.closest(`[data-${prefix}-review-step]`);
      if (step) {
        const track = root.querySelector(`.${prefix}-reviews`);
        const direction = Number(step.getAttribute(`data-${prefix}-review-step`));
        if (!track || ![-1, 1].includes(direction)) return;
        track.scrollBy({
          left: direction * (track.clientWidth - 70),
          behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
        });
        return;
      }

      const video = event.target.closest(`[data-${prefix}-video]`);
      if (!video) return;
      const url = video.getAttribute(`data-${prefix}-video`);
      if (!videoUrls.has(url)) return;
      if (activeVideo?.frame.isConnected) {
        activeVideo.frame.replaceWith(activeVideo.button);
      }
      const frame = document.createElement('iframe');
      frame.className = `${prefix}-video`;
      frame.src = `${url}&autoplay=1&playsinline=1`;
      frame.title = 'Видеоотзыв о курсе Сыроедение';
      frame.allow = 'autoplay; fullscreen; picture-in-picture';
      frame.allowFullscreen = true;
      video.replaceWith(frame);
      activeVideo = { frame, button: video };
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
