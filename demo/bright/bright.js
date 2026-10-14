const PHONE = ""; // restaurant phone, e.g. "(903) 555-0123" — turns on call/text ordering

(() => {
  const digits = PHONE.replace(/\D/g, "").slice(-10);
  document.querySelectorAll("[data-tel]").forEach(a => (a.href = digits ? `tel:+1${digits}` : "#visit"));

  const MENU = window.MENU || [];
  const all = MENU.flatMap(c => c.items.map(i => ({ ...i, cat: c.id })));
  const $ = s => document.querySelector(s);
  const money = n => `$${n.toFixed(2).replace(/\.00$/, "")}`;

  /* Photos for featured cards (sample photos until real ones are added) */
  const PICS = {
    "Ndolé": ["dish-ndole.jpg", "Ndol%C3%A9_camerounais.JPG"],
    "Eru & Waterfufu": ["dish-eru.jpg", "Water_fufu_and_eru_03.jpg"],
    "Jollof Rice": ["dish-jollof.jpg", "Jollof_rice_and_Dodo.jpg"],
    "Egusi Soup": ["dish-egusi.jpg", "Pounded_Yam_and_Egusi_Soup.jpg"],
    "Beef Soya (Suya)": ["dish-soya.jpg", "Nigerian_home_made_suya_and_sliced_onions.png"],
    "Poisson Braisé": ["dish-poisson.jpg", "Jollof_rice_with_fried_fish_and_fried_plantain.jpg"]
  };
  const img = (name, w) => {
    const p = PICS[name];
    return p ? `<img src="../african-caribbean/images/${p[0]}" alt="${name}" loading="lazy" data-stock="https://commons.wikimedia.org/wiki/Special:FilePath/${p[1]}?width=${w}" onerror="photo(this)">` : "";
  };

  /* Popular cards */
  $("#cards").innerHTML = Object.keys(PICS).map(n => all.find(i => i.name === n)).filter(Boolean).map(i => `
    <article class="card">
      ${i.tag ? `<span class="rate">${i.tag}</span>` : ""}
      <figure class="dish-img">${img(i.name, 500)}</figure>
      <h3>${i.name}</h3><p>${i.desc}</p>
      <div class="card-foot"><b>${money(i.price)}</b><button class="add" data-add="${i.name}" aria-label="Add ${i.name} to order">+</button></div>
    </article>`).join("");
  document.querySelectorAll("[data-scroll]").forEach(b => b.addEventListener("click", () => $("#cards").scrollBy({ left: b.dataset.scroll * 320, behavior: "smooth" })));

  /* Menu chips + list */
  const chips = $("#chips"), list = $("#list");
  const show = id => {
    chips.querySelectorAll("button").forEach(b => b.setAttribute("aria-selected", String(b.dataset.cat === id)));
    list.innerHTML = all.filter(i => i.cat === id).map(i => `
      <li><div><b>${i.name}</b><p>${i.desc}</p></div><span>${money(i.price)}</span><button class="add" data-add="${i.name}" aria-label="Add ${i.name}">+</button></li>`).join("");
  };
  chips.innerHTML = MENU.map(c => `<button role="tab" data-cat="${c.id}">${c.label}</button>`).join("");
  chips.addEventListener("click", e => { const b = e.target.closest("button"); if (b) show(b.dataset.cat); });
  if (MENU[0]) show(MENU[0].id);

  /* Cart */
  const cart = new Map();
  const panel = $("#cart"), scrim = document.querySelector(".scrim");
  const open = v => { panel.classList.toggle("on", v); panel.setAttribute("aria-hidden", String(!v)); scrim.hidden = !v; };
  const render = () => {
    const items = [...cart.entries()];
    $("#cart-items").innerHTML = items.length ? items.map(([n, q]) => {
      const i = all.find(x => x.name === n);
      return `<li><div class="ci-img">${img(n, 200) || ""}</div><div class="ci-body"><b>${n}</b><span>${money(i.price)}</span></div>
        <div class="qty"><button data-dec="${n}" aria-label="Fewer">−</button><span>${q}</span><button data-inc="${n}" aria-label="More">+</button></div></li>`;
    }).join("") : `<li class="empty-cart">Your order is empty — add something delicious.</li>`;
    const sub = items.reduce((s, [n, q]) => s + all.find(x => x.name === n).price * q, 0);
    document.querySelector("[data-subtotal]").textContent = money(sub);
    document.querySelector("[data-count]").textContent = items.reduce((s, [, q]) => s + q, 0);
    $("#cart-items").querySelectorAll(".ci-img:empty").forEach(d => d.classList.add("blank"));
  };
  document.addEventListener("click", e => {
    const t = e.target.closest("[data-add],[data-inc],[data-dec],[data-open-cart],[data-close-cart],[data-send]");
    if (!t) return;
    if (t.dataset.add) { cart.set(t.dataset.add, (cart.get(t.dataset.add) || 0) + 1); render(); t.classList.add("pop"); setTimeout(() => t.classList.remove("pop"), 300); }
    if (t.dataset.inc) { cart.set(t.dataset.inc, cart.get(t.dataset.inc) + 1); render(); }
    if (t.dataset.dec) { const q = cart.get(t.dataset.dec) - 1; q ? cart.set(t.dataset.dec, q) : cart.delete(t.dataset.dec); render(); }
    if ("openCart" in t.dataset) open(true);
    if ("closeCart" in t.dataset) open(false);
    if ("send" in t.dataset) {
      const note = document.querySelector("[data-send-note]");
      if (!cart.size) { note.textContent = "Add a dish first."; return; }
      const text = "Order for pickup:\n" + [...cart].map(([n, q]) => `${q} × ${n}`).join("\n");
      if (digits) location.href = `sms:+1${digits}?&body=${encodeURIComponent(text)}`;
      else note.textContent = "Demo: online ordering turns on once the restaurant's phone number is added.";
    }
  });
  addEventListener("keydown", e => { if (e.key === "Escape") open(false); });
  render();
})();
