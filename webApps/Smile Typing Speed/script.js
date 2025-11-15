const textBox = document.getElementById("textBox");
const inputBox = document.getElementById("inputBox");
const timerEl = document.getElementById("timer");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");

let spans = [];
let startTime = null;
let timerId = null;
const DURATION = 60;

function loadParagraph() {
  const p = PARAGRAPHS[Math.floor(Math.random() * PARAGRAPHS.length)];
  textBox.innerHTML = "";
  for (const ch of p) {
    const s = document.createElement("span");
    s.textContent = ch;
    textBox.appendChild(s);
  }
  spans = Array.from(textBox.querySelectorAll("span"));
  textBox.style.transform = "translate(0, -50%)";
  timerEl.textContent = DURATION;
  wpmEl.textContent = "0 WPM";
  accuracyEl.textContent = "100%";
  inputBox.value = "";
  inputBox.disabled = false;
  startTime = null;
  clearInterval(timerId);
  inputBox.focus();
}

function computeOffset(typedLength) {
  let offset = 0;
  for (let i = 0; i < typedLength && i < spans.length; i++) {
    offset += spans[i].getBoundingClientRect().width;
  }
  return offset;
}

function updateStats() {
  if (!startTime) return;
  const typed = inputBox.value;
  const typedLen = typed.length;
  const correctChars = spans.filter(
    (sp, i) => typed[i] === sp.textContent
  ).length;
  const accuracy = typedLen ? Math.round((correctChars / typedLen) * 100) : 100;
  accuracyEl.textContent = accuracy + "%";

  const elapsedSec = Math.max(1, Math.floor((Date.now() - startTime) / 1000));
  const minutes = elapsedSec / 60;
  const wpm = Math.round(correctChars / 5 / minutes);
  wpmEl.textContent = (isFinite(wpm) ? wpm : 0) + " WPM";
}

function startTimer() {
  startTime = Date.now();
  timerEl.textContent = DURATION;
  if (timerId) clearInterval(timerId);

  timerId = setInterval(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const left = DURATION - elapsed;
    timerEl.textContent = Math.max(left, 0);
    updateStats();
    if (left <= 0) {
      clearInterval(timerId);
      inputBox.disabled = true;
    }
  }, 250);
}

inputBox.addEventListener("input", () => {
  if (!startTime) startTimer();
  const typed = inputBox.value;
  const typedLen = typed.length;
  for (let i = 0; i < spans.length; i++) {
    const sp = spans[i];
    const ch = typed[i];
    sp.classList.remove("correct", "wrong");
    if (ch === undefined) continue;
    if (ch === sp.textContent) sp.classList.add("correct");
    else sp.classList.add("wrong");
  }
  const offset = computeOffset(typedLen);
  textBox.style.transform = `translate(${-offset}px, -50%)`;
  updateStats();
});

loadParagraph();
