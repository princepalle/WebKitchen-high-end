/* ===== BUSINESS INFO — fill in and the page updates ===== */
const BUSINESS = {
  phone: "",                 // e.g. "(903) 555-0123"
  street: "",                // e.g. "123 Main St"
  city: "Palestine, TX 75801"
};
/* ======================================================== */

(() => {
  const digits = BUSINESS.phone.replace(/\D/g, "");
  const tel = digits ? `tel:+1${digits.slice(-10)}` : "#visit";
  const full = [BUSINESS.street, BUSINESS.city].filter(Boolean).join(", ");
  document.querySelectorAll("[data-tel]").forEach(a => (a.href = tel));
  document.querySelectorAll("[data-tel-text]").forEach(a => (a.textContent = BUSINESS.phone || "Coming soon"));
  document.querySelectorAll("[data-addr]").forEach(d => (d.innerHTML = BUSINESS.street ? `${BUSINESS.street}<br>${BUSINESS.city}` : `${BUSINESS.city}<br><small>Street address coming soon</small>`));
  const q = encodeURIComponent(BUSINESS.street ? full : `African Caribbean Cuisine, ${BUSINESS.city}`);
  document.querySelectorAll("[data-map]").forEach(a => (a.href = `https://www.google.com/maps/search/?api=1&query=${q}`));
  document.querySelectorAll("[data-embed]").forEach(f => (f.src = `https://www.google.com/maps?q=${encodeURIComponent(full)}&output=embed`));

  /* Header + drawer */
  const bar = document.querySelector(".bar");
  const onScroll = () => bar.classList.toggle("solid", scrollY > 40);
  onScroll(); addEventListener("scroll", onScroll, { passive: true });
  const burger = document.querySelector(".burger"), drawer = document.getElementById("drawer");
  burger.addEventListener("click", () => { const o = burger.getAttribute("aria-expanded") === "true"; burger.setAttribute("aria-expanded", String(!o)); drawer.hidden = o; bar.classList.toggle("open", !o); });
  drawer.addEventListener("click", e => { if (e.target.closest("a")) { drawer.hidden = true; burger.setAttribute("aria-expanded", "false"); bar.classList.remove("open"); } });

  /* Menu: category list + all sections, with scroll-spy */
  const cats = document.getElementById("cats"), body = document.getElementById("menu-body");
  const price = n => `$${Number(n).toFixed(0)}`;
  (window.MENU || []).forEach(c => {
    cats.insertAdjacentHTML("beforeend", `<a href="#m-${c.id}" data-cat="${c.id}">${c.label}</a>`);
    body.insertAdjacentHTML("beforeend", `
      <section class="mcat" id="m-${c.id}">
        <h3>${c.label}</h3>${c.note ? `<p class="mnote">${c.note}</p>` : ""}
        <ul>${c.items.map(i => `<li><div class="mrow"><span class="mname">${i.name}</span><span class="mline"></span><span class="mprice">${price(i.price)}</span></div><p>${i.desc}${i.tag ? ` <em>${i.tag}</em>` : ""}</p></li>`).join("")}</ul>
      </section>`);
  });
  const links = [...cats.querySelectorAll("a")];
  const spy = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) links.forEach(l => l.classList.toggle("on", l.dataset.cat === e.target.id.slice(2)));
  }), { rootMargin: "-40% 0px -55% 0px" });
  body.querySelectorAll(".mcat").forEach(s => spy.observe(s));

  /* Reveal on scroll */
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const items = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) items.forEach(i => i.classList.add("in"));
  else {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" });
    items.forEach(i => io.observe(i));
  }
})();
