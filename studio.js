/* ===== STUDIO CONTACT — fill in to turn on the "Start a project" buttons ===== */
const CONTACT = {
  email: "",   // e.g. "hello@webkitchen.com"
  phone: ""    // optional, e.g. "(555) 555-0123"
};
/* ============================================================================ */

(() => {
  const subject = encodeURIComponent("New website project");
  const body = encodeURIComponent("Hi WebKitchen,\n\nBusiness name:\nType (restaurant, kitchen, catering…):\nCity:\nWhat I'm looking for:\n");
  const href = CONTACT.email ? `mailto:${CONTACT.email}?subject=${subject}&body=${body}` : CONTACT.phone ? `tel:${CONTACT.phone.replace(/[^\d+]/g, "")}` : null;
  document.querySelectorAll("[data-contact]").forEach(a => { if (href) a.href = href; });
  const note = document.querySelector("[data-contact-note]");
  if (note && !href) note.textContent = "Contact details coming soon.";

  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const items = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) items.forEach(i => i.classList.add("in"));
  else {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" });
    items.forEach(i => io.observe(i));
  }
  const top = document.querySelector(".top");
  const onScroll = () => top.classList.toggle("solid", scrollY > 20);
  onScroll(); addEventListener("scroll", onScroll, { passive: true });
})();
