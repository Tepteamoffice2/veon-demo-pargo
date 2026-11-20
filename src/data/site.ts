// All facts come from veon/client.json (ids in comments). Nothing here is invented.
export const FUTURE = "Розділ у розробці";

export const contacts = {
  phoneHref: "tel:+380666698480", // company.contacts.phones
  phoneText: "(066) 669-84-80",
  email: "sales@pargo.com.ua", // company.contacts.emails
  hoursShort: "Пн–Пт 9–18, Сб 9–16",
  hours: [
    { days: "Пн–Пт", time: "09:00–18:00" },
    { days: "Сб", time: "09:00–16:00" },
    { days: "Нд", time: "вихідний" },
  ], // C-016
  instagram: "https://www.instagram.com/pargo_auto_parts_/", // socials: confirmed
  facebook: "https://www.facebook.com/profile.php?id=61567456593187", // socials: confirmed
};

const mapUrl = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

export const addresses = [
  { role: "Головний склад", line: "Київ, вул. Велика Кільцева, 4б/1", map: mapUrl("Київ, вулиця Велика Кільцева, 4б/1") },
  { role: "Пункт видачі", line: "Київ, просп. Голосіївський, 30б", map: mapUrl("Київ, Голосіївський проспект, 30б") },
]; // company.contacts.addresses

export const mail = (subject: string, body = "") =>
  `mailto:${contacts.email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ""}`;

export const nav = [
  { href: "#avtoelektryka", label: "Генератори і стартери" },
  { href: "#katalog", label: "Каталог" },
  { href: "#pidbir", label: "Підбір за VIN" },
  { href: "#sto", label: "Для СТО" },
  { href: "#dostavka", label: "Доставка і оплата" },
  { href: "#kontakty", label: "Контакти" },
];

// company.products_services
export const units = [
  {
    id: "generator",
    title: "Генератор",
    img: { src: "/images/unit-generator", w: 296, h: 272, alt: "Автомобільний генератор у зборі: алюмінієвий корпус, шків і мідні обмотки" },
    nodes: ["Генератор у зборі", "Ротор", "Статор", "Регулятор", "Діодний міст", "Підшипник", "Щітки", "Шків"],
  },
  {
    id: "starter",
    title: "Стартер",
    img: { src: "/images/unit-starter", w: 300, h: 250, alt: "Стартер у зборі з чорним корпусом, втягуючим реле і бендиксом" },
    nodes: ["Стартер у зборі", "Бендикс", "Втягуюче реле", "Редуктор і планетарна передача", "Щітки", "Фланець", "Підшипник", "Ремкомплект бендиксу"],
  },
];

// C-019 without Генератори / Стартери
export const categories = [
  "Кермовий механізм",
  "Автокондиціонери",
  "Турбіни",
  "Автономні опалювачі",
  "Кардани",
  "Електродвигун пічки",
  "Гальмівна система",
  "Автоелектрика",
];

// company.products_services (brand catalogue) + NRF (air-con radiators)
export const brands = [
  "CARGO", "AS-PL", "Remy", "VALEO", "ISKRA", "DENSO", "Brembo", "TRW", "KNECHT",
  "Hanon", "Jrone", "KACO", "GMB", "SPAREX", "FISCHER", "MSG", "WAI", "NRF",
];

export const footerLinks = [
  "Каталог", "Доставка і оплата", "Гарантія і повернення", "Про компанію", "Блог", "Договір оферти", "Політика конфіденційності",
];
