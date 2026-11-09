document.documentElement.classList.add("js");

// ----- Světlý / tmavý režim -----
const root = document.documentElement;
const themeBtn = document.querySelector(".theme");
const getStored = () => { try { return localStorage.getItem("theme"); } catch { return null; } };
const setStored = (v) => { try { localStorage.setItem("theme", v); } catch {} };

const initial = getStored() || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
root.dataset.theme = initial;

themeBtn.addEventListener("click", () => {
  const next = root.dataset.theme === "light" ? "dark" : "light";
  root.dataset.theme = next;
  setStored(next);
});

// ----- Mobilní menu -----
const toggle = document.querySelector(".nav__toggle");
const menu = document.querySelector(".nav__menu");
toggle.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!open));
  toggle.setAttribute("aria-label", open ? "Otevřít menu" : "Zavřít menu");
  menu.classList.toggle("open", !open);
});
menu.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    toggle.setAttribute("aria-expanded", "false");
    menu.classList.remove("open");
  })
);

// ----- Okraj navigace po scrollu -----
const nav = document.querySelector(".nav");
const onScroll = () => nav.classList.toggle("scrolled", scrollY > 10);
addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ----- Animace při scrollu + počítadla -----
const countUp = (el) => {
  const target = Number(el.dataset.count);
  const duration = 1200;
  const start = performance.now();
  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !reduceMotion) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        entry.target.querySelectorAll("[data-count]").forEach(countUp);
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el, i) => {
    el.style.transitionDelay = `${(i % 3) * 80}ms`;
    io.observe(el);
  });
} else {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
  document.querySelectorAll("[data-count]").forEach((el) => (el.textContent = el.dataset.count));
}

// ----- Rok v patičce -----
document.getElementById("year").textContent = new Date().getFullYear();
