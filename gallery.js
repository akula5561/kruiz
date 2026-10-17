// Просмотр фото альбома во весь экран: клик по фото, стрелки, Esc
(() => {
  const links = [...document.querySelectorAll(".gallery a")];
  if (!links.length) return;
  const box = document.createElement("dialog");
  box.className = "lightbox";
  box.innerHTML = '<img alt=""><button class="lb-close" aria-label="Закрыть">×</button><button class="lb-prev" aria-label="Предыдущее фото">‹</button><button class="lb-next" aria-label="Следующее фото">›</button>';
  document.body.append(box);
  const img = box.querySelector("img");
  let cur = 0;
  const show = (i) => {
    cur = (i + links.length) % links.length;
    img.src = links[cur].href;
    img.alt = links[cur].querySelector("img").alt;
  };
  links.forEach((a, i) => a.addEventListener("click", (e) => { e.preventDefault(); show(i); box.showModal(); }));
  box.querySelector(".lb-close").onclick = () => box.close();
  box.querySelector(".lb-prev").onclick = () => show(cur - 1);
  box.querySelector(".lb-next").onclick = () => show(cur + 1);
  box.addEventListener("click", (e) => { if (e.target === box) box.close(); });
  box.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") show(cur - 1);
    if (e.key === "ArrowRight") show(cur + 1);
  });
})();
