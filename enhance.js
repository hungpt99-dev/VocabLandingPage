// enhance.js — progressive enhancements for the Vocab landing page.
// Every feature below fails safe: if anything throws, the page stays fully
// usable and visible (the base styles.css provides a complete, static layout).
(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  try {
    // Header condenses and a scroll-progress bar fills as the user scrolls.
    const header = document.querySelector(".site-header");
    const progress = document.querySelector(".scroll-progress");
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY || document.documentElement.scrollTop;
        if (header) header.classList.toggle("is-stuck", y > 8);
        if (progress) {
          const h = document.documentElement.scrollHeight - window.innerHeight;
          const p = h > 0 ? Math.min(1, y / h) : 0;
          progress.style.transform = "scaleX(" + p + ")";
        }
        ticking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  } catch (e) { /* no-op */ }

  try {
    // Highlight the nav link for the section currently in view.
    const links = Array.from(document.querySelectorAll(".nav-links a"));
    const map = new Map();
    links.forEach((a) => {
      const id = a.getAttribute("href");
      if (id && id.startsWith("#")) {
        const sec = document.querySelector(id);
        if (sec) map.set(sec, a);
      }
    });
    if ("IntersectionObserver" in window && map.size) {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              links.forEach((l) => l.classList.remove("is-active"));
              const a = map.get(entry.target);
              if (a) a.classList.add("is-active");
            }
          });
        },
        { rootMargin: "-45% 0px -50% 0px" }
      );
      map.forEach((_a, sec) => obs.observe(sec));
    }
  } catch (e) { /* no-op */ }

  try {
    // Cursor-following spotlight on feature cards (pointer devices only).
    if (!reduceMotion && window.matchMedia("(hover: hover)").matches) {
      const cards = document.querySelectorAll(".card");
      cards.forEach((card) => {
        card.addEventListener("pointermove", (e) => {
          const r = card.getBoundingClientRect();
          card.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
          card.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
        });
      });
    }
  } catch (e) { /* no-op */ }
})();
