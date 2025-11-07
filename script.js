// Minimal logic: status/tips rotation. No interactions.
(function () {
  const statusEl = document.getElementById('status');
  const tipEl = document.getElementById('tip');

  const statuses = [
    "Загрузка ресурсов…",
    "Инициализация аддонов…",
    "Компиляция шейдеров…",
    "Синхронизация клиента…",
    "Подготовка спавна…"
  ];

  const tips = [
    "Первая загрузка дольше из‑за кэша.",
    "Не закрывайте игру во время загрузки.",
    "Меньше конфликтов модов — быстрее старт.",
    "Приятной игры на BlockLife RP."
  ];

  let si = 0, ti = 0;
  function cycle() {
    statusEl.textContent = statuses[si++ % statuses.length];
    tipEl.textContent = tips[ti++ % tips.length];
  }
  cycle();
  setInterval(cycle, 3500);

  document.addEventListener("contextmenu", e => e.preventDefault());
  document.addEventListener("dragstart", e => e.preventDefault());
})();
