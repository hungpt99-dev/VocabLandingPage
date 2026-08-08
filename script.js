// Initialize lucide icons
if (window.lucide && typeof window.lucide.createIcons === "function") {
  window.lucide.createIcons();
}

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelector(".nav-links");
if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    })
  );
}

// Scroll reveal — progressive enhancement, with fail-safes so content is
// never left permanently invisible if the observer misses an element.
const reveals = document.querySelectorAll(".reveal");
function revealNow(el) {
  el.classList.add("in");
}
function revealAll() {
  reveals.forEach(revealNow);
}
if ("IntersectionObserver" in window && reveals.length) {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          revealNow(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
  );
  reveals.forEach((el) => obs.observe(el));

  // Safety net 1: after load, force-reveal anything already in the viewport.
  requestAnimationFrame(() => {
    const vh = window.innerHeight || document.documentElement.clientHeight;
    reveals.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) revealNow(el);
    });
  });
  // Safety net 2: never leave content hidden — reveal all after 2.5s regardless.
  setTimeout(revealAll, 2500);
} else {
  revealAll();
}
