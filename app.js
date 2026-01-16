// app.js
// 號碼抽籤器（學生號碼）
//
// 功能：
// 1) 設定範圍 1–100
// 2) 排除號碼
// 3) 重複 / 不重複模式（切換模式時視同重置，但保留排除與範圍）
// 4) 底部號碼圈圈顯示抽中次數與顏色
// 5) 抽多人（1–20），動畫一起跑，可關閉動畫
// 6) 同一號碼第 10 次仍會顯示，之後不再抽

(function () {
  const rangeStartInput = document.getElementById("rangeStart");
  const rangeEndInput = document.getElementById("rangeEnd");
  const excludeInput = document.getElementById("excludeInput");
  const repeatModeCheckbox = document.getElementById("repeatMode");
  const drawCountInput = document.getElementById("drawCount");
  const animationToggle = document.getElementById("animationToggle");

  const applySettingsBtn = document.getElementById("applySettingsBtn");
  const drawBtn = document.getElementById("drawBtn");
  const resetBtn = document.getElementById("resetBtn");
  const messageEl = document.getElementById("message");

  const resultsArea = document.getElementById("resultsArea");
  const numbersGrid = document.getElementById("numbersGrid");

  let rangeStart = 1;
  let rangeEnd = 30;
  let excludedSet = new Set();
  let allowRepeat = true;

  // 抽中次數記錄：number -> count
  const drawCounts = new Map();

  // 避免動畫中多次觸發
  let isAnimating = false;

  // ===== 工具函式 =====

  function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
  }

  function parseSettings() {
    let start = parseInt(rangeStartInput.value, 10);
    let end = parseInt(rangeEndInput.value, 10);

    if (isNaN(start)) start = 1;
    if (isNaN(end)) end = 30;

    start = clamp(start, 1, 100);
    end = clamp(end, 1, 100);

    if (start > end) {
      const tmp = start;
      start = end;
      end = tmp;
    }

    rangeStart = start;
    rangeEnd = end;

    rangeStartInput.value = start;
    rangeEndInput.value = end;

    const excludeText = excludeInput.value || "";
    const parts = excludeText
      .split(/[,，\s]+/)
      .map((p) => p.trim())
      .filter(Boolean);

    excludedSet = new Set();
    for (const p of parts) {
      const n = parseInt(p, 10);
      if (!isNaN(n) && n >= rangeStart && n <= rangeEnd) {
        excludedSet.add(n);
      }
    }

    allowRepeat = repeatModeCheckbox.checked;
  }

  function getColumnsForRange() {
    const count = rangeEnd - rangeStart + 1;
    if (count <= 25) return 5;
    if (count <= 50) return 10;
    if (count <= 75) return 15;
    return 20;
  }

  function buildNumbersGrid() {
    numbersGrid.innerHTML = "";

    const cols = getColumnsForRange();
    numbersGrid.classList.remove("cols-5", "cols-10", "cols-15", "cols-20");
    numbersGrid.classList.add(`cols-${cols}`);

    for (let n = rangeStart; n <= rangeEnd; n++) {
      const circle = document.createElement("div");
      circle.className = "number-circle count-0";
      circle.dataset.number = String(n);
      circle.textContent = n;

      if (excludedSet.has(n)) {
        circle.classList.add("excluded");
      }

      numbersGrid.appendChild(circle);
    }

    updateGridColors();
  }

  function updateGridColors() {
    const circles = numbersGrid.querySelectorAll(".number-circle");
    circles.forEach((circle) => {
      const n = parseInt(circle.dataset.number, 10);
      const count = drawCounts.get(n) || 0;

      // 先清除舊 class
      for (let i = 0; i <= 10; i++) {
        circle.classList.remove(`count-${i}`);
      }

      const clampedCount = Math.min(count, 10);
      circle.classList.add(`count-${clampedCount}`);
    });
  }

  function getCandidateNumbers() {
    const candidates = [];
    for (let n = rangeStart; n <= rangeEnd; n++) {
      if (excludedSet.has(n)) continue;

      const count = drawCounts.get(n) || 0;

      // 超過 10 次，就不再抽他
      if (count >= 10) continue;

      if (!allowRepeat) {
        // 不重複模式：只抽尚未被抽中的
        if (count > 0) continue;
      }

      candidates.push(n);
    }
    return candidates;
  }

  function pickRandomDistinct(candidates, k) {
    const arr = candidates.slice();
    const result = [];

    const max = Math.min(k, arr.length);
    for (let i = 0; i < max; i++) {
      const idx = Math.floor(Math.random() * arr.length);
      const val = arr[idx];
      result.push(val);
      arr.splice(idx, 1);
    }
    return result;
  }

  function setMessage(text, type = "warn") {
    messageEl.textContent = text || "";
    if (!text) return;

    if (type === "warn") {
      messageEl.style.color = "#fb923c";
    } else if (type === "info") {
      messageEl.style.color = "#93c5fd";
    } else {
      messageEl.style.color = "#f97316";
    }
  }

  // ===== 結果區顯示 =====

  function computeFontSize(count) {
    if (count <= 3) return "2.4rem";
    if (count <= 6) return "2rem";
    if (count <= 10) return "1.6rem";
    return "1.3rem";
  }

  function renderResultsInstant(numbers) {
    resultsArea.innerHTML = "";
    const grid = document.createElement("div");
    grid.className = "results-grid";

    const count = numbers.length;
    const fontSize = computeFontSize(count);

    numbers.forEach((n) => {
      const slot = document.createElement("div");
      slot.className = "result-slot";
      const span = document.createElement("span");
      span.className = "result-number";
      span.textContent = n;
      span.style.fontSize = fontSize;
      slot.appendChild(span);
      grid.appendChild(slot);
    });

    resultsArea.appendChild(grid);
  }

  function renderResultsWithAnimation(finalNumbers) {
    resultsArea.innerHTML = "";
    const grid = document.createElement("div");
    grid.className = "results-grid";

    const count = finalNumbers.length;
    const fontSize = computeFontSize(count);

    const candidatesForDisplay = [];
    for (let n = rangeStart; n <= rangeEnd; n++) {
      if (!excludedSet.has(n)) candidatesForDisplay.push(n);
    }
    if (candidatesForDisplay.length === 0) {
      candidatesForDisplay.push("—");
    }

    const slots = [];
    const intervals = [];

    finalNumbers.forEach((finalNumber) => {
      const slot = document.createElement("div");
      slot.className = "result-slot animating";

      const span = document.createElement("span");
      span.className = "result-number";
      span.style.fontSize = fontSize;
      span.textContent =
        candidatesForDisplay[
          Math.floor(Math.random() * candidatesForDisplay.length)
        ];

      slot.appendChild(span);
      grid.appendChild(slot);

      slots.push({ slot, span, finalNumber });

      const intervalId = setInterval(() => {
        const r =
          candidatesForDisplay[
            Math.floor(Math.random() * candidatesForDisplay.length)
          ];
        span.textContent = r;
      }, 80 + Math.random() * 70);

      intervals.push(intervalId);
    });

    resultsArea.appendChild(grid);

    // 最後一次一起停下來
    const duration = 1300;
    setTimeout(() => {
      intervals.forEach((id) => clearInterval(id));

      slots.forEach(({ slot, span, finalNumber }) => {
        slot.classList.remove("animating");
        span.textContent = finalNumber;
        slot.classList.add("done");
      });

      // 動畫跑完後再更新統計顏色與次數
      finalNumbers.forEach((n) => {
        const prev = drawCounts.get(n) || 0;
        const next = Math.min(prev + 1, 10);
        drawCounts.set(n, next);
      });
      updateGridColors();

      isAnimating = false;
      drawBtn.classList.remove("btn-disabled");
    }, duration);
  }

  // ===== 事件處理 =====

  function applySettings() {
    parseSettings();
    buildNumbersGrid();
    setMessage("已套用最新設定。", "info");
  }

  function resetDrawState() {
    drawCounts.clear();
    updateGridColors();
    resultsArea.innerHTML =
      '<p class="results-placeholder">尚未抽籤</p>';
    setMessage("已重置抽籤紀錄（排除與範圍保留）。", "info");
  }

  applySettingsBtn.addEventListener("click", () => {
    applySettings();
  });

  // 切換重複 / 不重複模式時視同重置（但保留範圍與排除）
  repeatModeCheckbox.addEventListener("change", () => {
    parseSettings(); // 更新 allowRepeat
    resetDrawState();
  });

  drawBtn.addEventListener("click", () => {
    if (isAnimating) return;

    parseSettings();

    const candidates = getCandidateNumbers();
    let drawCount = parseInt(drawCountInput.value, 10);
    if (isNaN(drawCount) || drawCount < 1) drawCount = 1;
    drawCount = clamp(drawCount, 1, 20);
    drawCountInput.value = drawCount;

    if (candidates.length === 0) {
      setMessage(
        "目前沒有可抽的號碼（可能全部被排除或已達 10 次上限）。",
        "warn"
      );
      return;
    }

    if (drawCount > candidates.length) {
      drawCount = candidates.length;
      drawCountInput.value = drawCount;
    }

    const finalNumbers = pickRandomDistinct(candidates, drawCount);
    if (finalNumbers.length === 0) {
      setMessage("沒有可抽的號碼。", "warn");
      return;
    }

    if (!animationToggle.checked) {
      // 無動畫模式：直接更新次數與顏色
      finalNumbers.forEach((n) => {
        const prev = drawCounts.get(n) || 0;
        const next = Math.min(prev + 1, 10);
        drawCounts.set(n, next);
      });
      updateGridColors();
      renderResultsInstant(finalNumbers);
      setMessage(`本次抽中：${finalNumbers.join(", ")}`, "info");
    } else {
      isAnimating = true;
      drawBtn.classList.add("btn-disabled");
      setMessage("");
      renderResultsWithAnimation(finalNumbers);
    }
  });

  resetBtn.addEventListener("click", () => {
    if (!confirm("確定要重置抽籤紀錄？（排除與範圍不會被清除）")) return;
    resetDrawState();
  });

  // 初始化
  applySettings();
})();