/* ===== RESTAURANT DETAILS — edit these and the page updates ===== */
const NOCTURNE = {
  phone: "",            // e.g. "(212) 555-0148" — shows in Contact and enables "Call" links
  email: "",            // e.g. "reservations@thenocturne.com"
  address: "",          // e.g. "214 Lantern Row, New York, NY"
  // Where reservation requests are sent. Paste a Formspree/Getform endpoint
  // (e.g. "https://formspree.io/f/xxxx"). Leave empty to open the guest's email
  // app instead (if email is set), or to show a demo confirmation.
  bookingEndpoint: "",
  openDays: [2, 3, 4, 5, 6, 0],   // Tue–Sun (0 = Sunday, 1 = Monday)
  firstSeating: "17:30",
  lastSeating: "23:00",
  maxParty: 8
};
/* ================================================================ */

(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Contact details */
  const digits = NOCTURNE.phone.replace(/\D/g, "");
  $$("[data-phone]").forEach(a => {
    a.textContent = NOCTURNE.phone || "Phone coming soon";
    if (digits) a.href = `tel:+${digits.length === 10 ? "1" + digits : digits}`; else a.removeAttribute("href");
  });
  $$("[data-email]").forEach(a => {
    a.textContent = NOCTURNE.email || "Email coming soon";
    if (NOCTURNE.email) a.href = `mailto:${NOCTURNE.email}`; else a.removeAttribute("href");
  });
  $$("[data-address]").forEach(d => (d.textContent = NOCTURNE.address || "Address coming soon"));

  /* Header: solid after scrolling; overlay menu */
  const head = $("[data-head]");
  const dock = $("[data-dock]");
  const hero = $(".hero");
  const reserve = $("#reserve");
  let ticking = false;
  const onScroll = () => {
    ticking = false;
    head.classList.toggle("is-solid", scrollY > 24);
    const pastHero = scrollY > hero.offsetHeight * 0.6;
    const atReserve = reserve.getBoundingClientRect().top < innerHeight * 0.9;
    dock.classList.toggle("is-on", pastHero && !atReserve);
  };
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  const menuBtn = $("[data-menu-btn]"), overlay = $("[data-overlay]");
  const setMenu = open => {
    menuBtn.setAttribute("aria-expanded", String(open));
    overlay.hidden = !open;
    document.body.classList.toggle("menu-open", open);
    if (open) overlay.querySelector("a").focus();
  };
  menuBtn.addEventListener("click", () => setMenu(menuBtn.getAttribute("aria-expanded") !== "true"));
  overlay.addEventListener("click", e => { if (e.target.closest("a")) setMenu(false); });
  addEventListener("keydown", e => { if (e.key === "Escape" && !overlay.hidden) { setMenu(false); menuBtn.focus(); } });

  /* Active section in the nav */
  const links = $$(".nav a");
  const spy = new IntersectionObserver(entries => entries.forEach(en => {
    if (!en.isIntersecting) return;
    links.forEach(l => {
      const on = l.getAttribute("href") === `#${en.target.id}`;
      l.classList.toggle("is-active", on);
      on ? l.setAttribute("aria-current", "true") : l.removeAttribute("aria-current");
    });
  }), { rootMargin: "-45% 0px -50% 0px" });
  ["story", "experience", "menu", "chef", "reserve"].forEach(id => spy.observe(document.getElementById(id)));

  /* Reveal on scroll */
  if (reduceMotion || !("IntersectionObserver" in window)) $$(".reveal").forEach(el => el.classList.add("is-in"));
  else {
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
    }), { rootMargin: "0px 0px -10% 0px" });
    $$(".reveal").forEach(el => io.observe(el));
  }
  requestAnimationFrame(() => document.body.classList.add("is-ready"));

  /* ---------- Reservations ---------- */
  const form = $("#booking");
  const date = $("#b-date"), time = $("#b-time");
  const pad = n => String(n).padStart(2, "0");
  const iso = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const toMin = t => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
  const label = m => { const h = Math.floor(m / 60), mm = m % 60; return `${((h + 11) % 12) + 1}:${pad(mm)} ${h < 12 ? "AM" : "PM"}`; };

  const today = new Date();
  const max = new Date(); max.setDate(max.getDate() + 60);
  date.min = iso(today); date.max = iso(max);
  // default to the next open day
  const next = new Date(today);
  while (!NOCTURNE.openDays.includes(next.getDay())) next.setDate(next.getDate() + 1);
  date.value = iso(next);

  const fillTimes = () => {
    const chosen = date.value ? new Date(date.value + "T00:00") : null;
    const isToday = chosen && iso(chosen) === iso(new Date());
    const nowMin = new Date().getHours() * 60 + new Date().getMinutes() + 60; // book at least an hour ahead
    const prev = time.value;
    time.innerHTML = '<option value="">Choose</option>';
    for (let m = toMin(NOCTURNE.firstSeating); m <= toMin(NOCTURNE.lastSeating); m += 30) {
      if (isToday && m < nowMin) continue;
      time.insertAdjacentHTML("beforeend", `<option value="${pad(Math.floor(m / 60))}:${pad(m % 60)}">${label(m)}</option>`);
    }
    if ([...time.options].some(o => o.value === prev)) time.value = prev;
  };
  date.addEventListener("change", () => { fillTimes(); check(date); });
  fillTimes();

  const party = $("[data-party]");
  for (let i = 1; i <= NOCTURNE.maxParty; i++) {
    party.insertAdjacentHTML("beforeend",
      `<label class="chip"><input type="radio" name="guests" value="${i}"${i === 2 ? " checked" : ""}><span>${i}</span><span class="sr-only"> ${i === 1 ? "guest" : "guests"}</span></label>`);
  }

  const rules = {
    date: v => {
      if (!v) return "Choose a date.";
      const d = new Date(v + "T00:00");
      if (v < date.min || v > date.max) return "Choose a date within the next 60 days.";
      if (!NOCTURNE.openDays.includes(d.getDay())) return "We're closed that day — please choose Tuesday to Sunday.";
      return "";
    },
    time: v => (v ? "" : time.options.length > 1 ? "Choose a time." : "No times left that day — please choose another date."),
    name: v => (v.trim().length >= 2 ? "" : "Please enter your name."),
    phone: v => (v.replace(/\D/g, "").length >= 7 ? "" : "Please enter a phone number we can reach."),
    email: v => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "Please enter a valid email address.")
  };
  const check = el => {
    const msg = rules[el.name] ? rules[el.name](el.value) : "";
    const err = document.getElementById(el.id + "-err");
    if (err) err.textContent = msg;
    el.setAttribute("aria-invalid", String(Boolean(msg)));
    return !msg;
  };
  $$("input, select", form).forEach(el => {
    if (!rules[el.name]) return;
    el.addEventListener("blur", () => el.value && check(el));
    el.addEventListener("input", () => el.getAttribute("aria-invalid") === "true" && check(el));
  });

  const live = $("[data-live]");
  const done = $("[data-done]"), fields = $(".booking-fields");
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const els = Object.keys(rules).map(n => form.elements[n]);
    const bad = els.filter(el => !check(el));
    if (bad.length) { bad[0].focus(); live.textContent = `Please fix ${bad.length} ${bad.length === 1 ? "field" : "fields"}.`; return; }

    const data = Object.fromEntries(new FormData(form));
    const when = new Date(`${data.date}T00:00`).toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
    const summary = `${data.guests} ${data.guests === "1" ? "guest" : "guests"} · ${when} at ${label(toMin(data.time))}`;
    const btn = form.querySelector('button[type="submit"]');
    let note = "";

    if (NOCTURNE.bookingEndpoint) {
      btn.disabled = true; btn.textContent = "Sending…";
      try {
        const res = await fetch(NOCTURNE.bookingEndpoint, { method: "POST", headers: { Accept: "application/json" }, body: new FormData(form) });
        if (!res.ok) throw new Error(String(res.status));
        note = "We'll confirm by email or text shortly.";
      } catch {
        btn.disabled = false; btn.textContent = "Request reservation";
        live.textContent = "We couldn't send your request. Please try again or call us.";
        $("#booking-note").textContent = "We couldn't send your request. Please try again, or call us.";
        return;
      }
    } else if (NOCTURNE.email) {
      const body = `Reservation request\n\n${summary}\nName: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\n\n${data.notes || ""}`;
      location.href = `mailto:${NOCTURNE.email}?subject=${encodeURIComponent("Reservation — " + data.name)}&body=${encodeURIComponent(body)}`;
      note = "Your email app has opened with the details — just press send.";
    } else {
      note = "This is a demo: reservations are not sent anywhere yet.";
    }

    $("[data-done-name]").textContent = data.name.trim().split(" ")[0];
    $("[data-done-summary]").textContent = summary;
    $("[data-done-note]").textContent = note;
    fields.hidden = true; done.hidden = false; done.focus();
    live.textContent = `Reservation request received for ${summary}.`;
  });
  $("[data-again]").addEventListener("click", () => {
    form.reset(); date.value = iso(next); fillTimes();
    const btn = form.querySelector('button[type="submit"]'); btn.disabled = false; btn.textContent = "Request reservation";
    $$("[aria-invalid]", form).forEach(el => el.removeAttribute("aria-invalid"));
    $$(".err", form).forEach(el => (el.textContent = ""));
    done.hidden = true; fields.hidden = false; date.focus();
  });
})();
