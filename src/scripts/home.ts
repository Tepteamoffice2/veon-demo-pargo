// Small progressive enhancements for the home page. Everything works without this file:
// anchors scroll, the menu is a <details>, the VIN form is a plain mailto form.
const EMAIL = "sales@pargo.com.ua";

/* ---------- VIN / article field ---------- */
const form = document.querySelector<HTMLFormElement>("[data-vin]");
if (form) {
  form.noValidate = true;
  const input = form.querySelector<HTMLInputElement>("#vin-input")!;
  const hintBox = form.querySelector<HTMLElement>(".vin__hint")!;
  const hint = form.querySelector<HTMLElement>("[data-vin-hint]")!;
  const count = form.querySelector<HTMLElement>("[data-vin-count]")!;
  const error = form.querySelector<HTMLElement>("[data-vin-error]")!;
  const sent = form.querySelector<HTMLElement>("[data-vin-sent]")!;
  const copy = form.querySelector<HTMLButtonElement>("[data-vin-copy]")!;
  const defaultHint = hint.textContent ?? "";
  const clean = (v: string) => v.trim().toUpperCase();
  const compact = (v: string) => clean(v).replace(/[\s-]/g, "");
  let swapTimer = 0;

  const setHint = (text: string) => {
    if (hint.textContent === text) return;
    hintBox.classList.add("is-swapping");
    window.clearTimeout(swapTimer);
    swapTimer = window.setTimeout(() => { hint.textContent = text; hintBox.classList.remove("is-swapping"); }, 120);
  };
  const validate = (v: string): string => {
    const c = compact(v);
    if (!c) return "Вкажіть VIN-код або артикул деталі";
    if (c.length === 17 && /[IOQ]/.test(c)) return "У VIN-коді не буває літер I, O, Q — перевірте, будь ласка";
    if (c.length < 3) return "Занадто коротко для артикулу";
    return "";
  };
  const showError = (msg: string) => {
    error.textContent = msg;
    error.hidden = !msg;
    input.setAttribute("aria-invalid", msg ? "true" : "false");
  };

  input.addEventListener("input", () => {
    const c = compact(input.value);
    count.textContent = c ? `${c.length} знаків` : "";
    copy.hidden = !c;
    input.classList.toggle("has-copy", !!c);
    if (!c) setHint(defaultHint);
    else if (c.length === 17 && /^[A-Z0-9]+$/.test(c)) setHint(/[IOQ]/.test(c) ? "17 знаків — схоже на VIN-код" : "Схоже на VIN-код");
    else setHint("Схоже на артикул");
    const vinTypo = c.length === 17 && /[IOQ]/.test(c);
    if (vinTypo || !error.hidden) showError(c ? validate(input.value) : "");
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = validate(input.value);
    showError(msg);
    if (msg) { input.focus(); return; }
    const value = clean(input.value);
    const body = `VIN/артикул: ${value}\nАвто: \nЩо потрібно: `;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Підбір запчастини")}&body=${encodeURIComponent(body)}`;
    sent.hidden = false;
  });

  copy.addEventListener("click", async () => {
    const value = clean(input.value);
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      copy.textContent = "Скопійовано";
      window.setTimeout(() => { copy.textContent = "Скопіювати"; }, 1800);
    } catch { input.select(); }
  });
}

/* ---------- working hours (Kyiv time) ---------- */
const status = document.querySelector<HTMLElement>("[data-hours-status]");
if (status) {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Kyiv", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = get("weekday");
  const minutes = Number(get("hour")) * 60 + Number(get("minute"));
  const open = (["Mon", "Tue", "Wed", "Thu", "Fri"].includes(day) && minutes >= 540 && minutes < 1080)
    || (day === "Sat" && minutes >= 540 && minutes < 960);
  if (!open) {
    status.textContent = "Зараз ми не працюємо — надішліть запит, відповімо в робочий час (Пн–Пт 09:00–18:00, Сб 09:00–16:00).";
    status.classList.add("is-closed");
  }
}

/* ---------- "Надіслати VIN" buttons focus the field ---------- */
document.querySelectorAll<HTMLAnchorElement>("[data-focus-vin], a[href='#pidbir']").forEach((a) => {
  a.addEventListener("click", () => {
    window.setTimeout(() => document.querySelector<HTMLInputElement>("#vin-input")?.focus({ preventScroll: true }), 450);
  });
});

/* ---------- menu: close after choosing a section or on Escape ---------- */
const mnav = document.querySelector<HTMLDetailsElement>("[data-mnav]");
if (mnav) {
  mnav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => { mnav.open = false; }));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mnav.open) { mnav.open = false; mnav.querySelector("summary")?.focus(); }
  });
  document.addEventListener("click", (e) => { if (mnav.open && !mnav.contains(e.target as Node)) mnav.open = false; });
}

/* ---------- active menu item while scrolling ---------- */
const links = Array.from(document.querySelectorAll<HTMLAnchorElement>(".primary-nav [data-nav]"));
const targets = links.map((a) => document.querySelector<HTMLElement>(a.hash)).filter((el): el is HTMLElement => !!el);
if ("IntersectionObserver" in window && targets.length) {
  const io = new IntersectionObserver((entries) => {
    for (const en of entries) {
      if (!en.isIntersecting) continue;
      links.forEach((a) => {
        const on = a.hash === `#${en.target.id}`;
        a.classList.toggle("is-active", on);
        if (on) a.setAttribute("aria-current", "location"); else a.removeAttribute("aria-current");
      });
    }
  }, { rootMargin: "-45% 0px -50% 0px" });
  targets.forEach((t) => io.observe(t));
}

/* header offset for the menu panel once the utility row scrolls away */
const onScroll = () => document.documentElement.classList.toggle("is-scrolled", window.scrollY > 36);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });
