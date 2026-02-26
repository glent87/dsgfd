// =========================================
// BlockLife RP — Real GMod Loading JS
// =========================================

// Храним глобально
window.totalFiles = 0;
window.downloadedFiles = 0;

// Элементы DOM
const statusEl = document.getElementById('status-text');
const progressEl = document.getElementById('progress-bar');
const hintEl = document.querySelector('.hint-text');

// --- Настройка начального текста ---
statusEl.textContent = "Подключение к серверу...";
hintEl.textContent = "Пожалуйста, ожидайте инициализации системы";

// --- Реальный прогресс ---
// Вызывается GMod при начале загрузки файлов
function SetFilesTotal(total) {
    window.totalFiles = total;
    window.downloadedFiles = 0;
    updateProgress();
}

// Вызывается при изменении оставшихся файлов
function SetFilesNeeded(needed) {
    window.downloadedFiles = window.totalFiles - needed;
    updateProgress();
}

// Показываем текущий загружаемый файл
function DownloadingFile(fileName) {
    const fileShort = fileName.split('/').pop();
    statusEl.textContent = "Загрузка: " + fileShort;
}

// Обновление текстового статуса от GMod
function SetStatusChanged(status) {
    statusEl.textContent = status;
}

// --- Обновление прогресс-бара ---
function updateProgress() {
    if (!window.totalFiles) return;
    const percent = Math.floor((window.downloadedFiles / window.totalFiles) * 100);
    progressEl.style.width = percent + "%";
}

// --- Реальные хуки GMod ---
window.SetFilesTotal = SetFilesTotal;
window.SetFilesNeeded = SetFilesNeeded;
window.DownloadingFile = DownloadingFile;
window.SetStatusChanged = SetStatusChanged;

// --- Защитные меры ---
document.addEventListener("contextmenu", e => e.preventDefault());
document.addEventListener("dragstart", e => e.preventDefault());

// --- Для плавной анимации прогресса на случай задержки ---
let fakeProgress = 0;
function animateProgress() {
    if (fakeProgress < 95) {
        const realPercent = window.totalFiles ? (window.downloadedFiles / window.totalFiles) * 100 : 0;
        fakeProgress += (realPercent - fakeProgress) * 0.05; // Плавное приближение
        progressEl.style.width = fakeProgress + "%";
    }
    requestAnimationFrame(animateProgress);
}
animateProgress();
