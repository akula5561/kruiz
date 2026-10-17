// Яндекс.Метрика, цели на кнопки связи и плашка про cookie
(() => {
  const COUNTER_ID = 113659866;
  const TAG_URL = "https://mc.yandex.ru/metrika/tag.js?id=" + COUNTER_ID;

  // --- Счётчик (официальный код Метрики, вынесен из страницы из-за CSP) ---
  (function (m, e, t, r, i, k, a) {
    m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
    m[i].l = 1 * new Date();
    for (let j = 0; j < document.scripts.length; j++) {
      if (document.scripts[j].src === r) return;
    }
    k = e.createElement(t); a = e.getElementsByTagName(t)[0];
    k.async = 1; k.src = r; a.parentNode.insertBefore(k, a);
  })(window, document, "script", TAG_URL, "ym");

  ym(COUNTER_ID, "init", {
    ssr: true, webvisor: true, clickmap: true, ecommerce: "dataLayer",
    referrer: document.referrer, url: location.href,
    accurateTrackBounce: true, trackLinks: true,
  });

  // --- Цели: нажатия на телефон, WhatsApp, Telegram ---
  const goalFor = (href) => {
    if (href.startsWith("tel:")) return "phone";
    if (href.includes("wa.me/")) return "whatsapp";
    if (href.includes("t.me/")) return "telegram";
    return null;
  };
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a[href]");
    const goal = link && goalFor(link.getAttribute("href"));
    if (goal) ym(COUNTER_ID, "reachGoal", goal);
  });

  // --- Плашка про cookie ---
  const KEY = "cookie-ok";
  const accepted = () => { try { return localStorage.getItem(KEY) === "1"; } catch { return false; } };
  if (accepted()) return;
  const root = document.currentScript?.dataset.root || document.querySelector("script[data-root]")?.dataset.root || "";
  const bar = document.createElement("div");
  bar.className = "cookie-bar";
  bar.setAttribute("role", "region");
  bar.setAttribute("aria-label", "Уведомление о cookie");
  bar.innerHTML = `<p>Мы используем cookie и Яндекс.Метрику, чтобы сайт работал лучше. Продолжая пользоваться сайтом, вы соглашаетесь с <a href="${root}privacy.html">политикой конфиденциальности</a>.</p><button class="btn btn-primary" type="button">Понятно</button>`;
  bar.querySelector("button").addEventListener("click", () => {
    try { localStorage.setItem(KEY, "1"); } catch { /* приватный режим — просто скрываем */ }
    bar.remove();
  });
  document.body.append(bar);
})();
