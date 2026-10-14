/* ===== BUSINESS INFO — fill these in and the whole page updates ===== */
const BUSINESS = {
  phone: "",            // e.g. "(903) 555-0123" — leave empty until confirmed
  street: "",           // e.g. "123 Main St"
  city: "Palestine, TX 75801",
  cateringEmail: ""     // where catering requests go, e.g. "orders@example.com"
};
/* ==================================================================== */

(() => {
  const digits = BUSINESS.phone.replace(/\D/g, "");
  const tel = digits ? `tel:+1${digits.slice(-10)}` : "#visit";
  const fullAddress = [BUSINESS.street, BUSINESS.city].filter(Boolean).join(", ");

  document.querySelectorAll("[data-phone-link]").forEach(a => (a.href = tel));
  document.querySelectorAll("[data-phone-text]").forEach(el => (el.textContent = BUSINESS.phone || "Phone number coming soon"));
  document.querySelectorAll("[data-address]").forEach(el => {
    el.innerHTML = BUSINESS.street ? `${BUSINESS.street}<br>${BUSINESS.city}` : `${BUSINESS.city}<br><small>Street address coming soon</small>`;
  });
  const q = encodeURIComponent(BUSINESS.street ? fullAddress : `African Caribbean Cuisine, ${BUSINESS.city}`);
  document.querySelectorAll("[data-map-link]").forEach(a => (a.href = `https://www.google.com/maps/search/?api=1&query=${q}`));
  document.querySelectorAll("[data-map-embed]").forEach(f => (f.src = `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`));
  document.getElementById("year").textContent = new Date().getFullYear();

  /* Placeholder labels on empty photo slots */
  document.querySelectorAll(".slot").forEach(s => s.setAttribute("data-label", "Photo coming soon"));

  /* Mobile nav */
  const toggle = document.querySelector(".menu-toggle");
  const mnav = document.getElementById("mobile-nav");
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    mnav.hidden = open;
  });
  mnav.addEventListener("click", e => { if (e.target.tagName === "A") { mnav.hidden = true; toggle.setAttribute("aria-expanded", "false"); } });

  /* Menu tabs */
  const tabs = document.getElementById("menu-tabs");
  const panels = document.getElementById("menu-panels");
  const money = n => `$${Number(n).toFixed(2).replace(/\.00$/, "")}`;
  (window.MENU || []).forEach((cat, i) => {
    const b = document.createElement("button");
    b.className = "tab"; b.role = "tab"; b.id = `tab-${cat.id}`;
    b.setAttribute("aria-controls", `panel-${cat.id}`);
    b.setAttribute("aria-selected", i === 0 ? "true" : "false");
    b.tabIndex = i === 0 ? 0 : -1;
    b.textContent = cat.label;
    tabs.appendChild(b);

    const p = document.createElement("div");
    p.className = "panel"; p.id = `panel-${cat.id}`; p.role = "tabpanel";
    p.setAttribute("aria-labelledby", b.id);
    if (i !== 0) p.hidden = true;
    p.innerHTML = (cat.note ? `<p class="panel-note">${cat.note}</p>` : "") +
      `<ul class="dishes">${cat.items.map(it => `
        <li class="dish">
          <div class="dish-top"><h3>${it.name}</h3><span class="dots" aria-hidden="true"></span><span class="price">${money(it.price)}</span></div>
          <p>${it.desc}</p>${it.tag ? `<span class="tag">${it.tag}</span>` : ""}
        </li>`).join("")}</ul>`;
    panels.appendChild(p);
  });
  const allTabs = [...tabs.querySelectorAll(".tab")];
  const select = t => {
    allTabs.forEach(x => { const on = x === t; x.setAttribute("aria-selected", String(on)); x.tabIndex = on ? 0 : -1; document.getElementById(x.getAttribute("aria-controls")).hidden = !on; });
    t.focus({ preventScroll: true });
    t.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  };
  tabs.addEventListener("click", e => { const t = e.target.closest(".tab"); if (t) select(t); });
  tabs.addEventListener("keydown", e => {
    const i = allTabs.indexOf(document.activeElement);
    if (e.key === "ArrowRight") select(allTabs[(i + 1) % allTabs.length]);
    if (e.key === "ArrowLeft") select(allTabs[(i - 1 + allTabs.length) % allTabs.length]);
  });

  /* Catering form: opens the visitor's email or texting app with details filled in */
  const form = document.getElementById("catering-form");
  form.addEventListener("submit", e => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const d = Object.fromEntries(new FormData(form));
    const body = `Catering request\nName: ${d.name}\nPhone: ${d.phone}\nDate: ${d.date || "-"}\nGuests: ${d.guests || "-"}\n\n${d.details || ""}`;
    const note = form.querySelector(".form-note");
    if (BUSINESS.cateringEmail) {
      location.href = `mailto:${BUSINESS.cateringEmail}?subject=${encodeURIComponent("Catering request — " + d.name)}&body=${encodeURIComponent(body)}`;
      note.textContent = "Opening your email app… If nothing happens, please call us.";
    } else if (digits) {
      location.href = `sms:+1${digits.slice(-10)}?&body=${encodeURIComponent(body)}`;
      note.textContent = "Opening your messages app… If nothing happens, please call us.";
    } else {
      note.textContent = "Online catering requests are coming soon — please stop by or call the kitchen.";
    }
  });

  /* Sticky nav shadow */
  const nav = document.querySelector(".nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 10);
  onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
})();
