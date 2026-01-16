* {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html {
  font-size: clamp(14px, 3vw, 16px);
}

body {
  margin: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    "PingFang TC", "Microsoft JhengHei", sans-serif;
  background: #020617;
  color: #e2e8f0;
  line-height: 1.5;
}

.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header */

.app-header {
  padding: 14px 16px;
  border-bottom: 1px solid #1f2937;
  background: radial-gradient(circle at top left, #0f172a, #020617);
}

.app-title {
  margin: 0 0 4px;
  font-size: clamp(1.4rem, 3.5vw, 1.9rem);
  font-weight: 700;
  color: #f9fafb;
}

.app-subtitle {
  margin: 0;
  font-size: clamp(0.8rem, 2.4vw, 0.95rem);
  color: #94a3b8;
}

/* Main layout */

.app-main {
  flex: 1;
  width: min(1100px, 100% - 24px);
  margin: 14px auto 18px;
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
  grid-template-rows: auto auto;
  gap: 14px;
}

.panel {
  background: #020617ec;
  border-radius: 18px;
  border: 1px solid #1f2937;
  padding: clamp(12px, 3vw, 18px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(18px);
}

.panel-title {
  margin: 0 0 10px;
  font-size: clamp(1rem, 3vw, 1.2rem);
  font-weight: 600;
  color: #e5e7eb;
}

.panel-controls {
  grid-column: 1 / 3;
}

.panel-results {
  grid-column: 1 / 2;
}

.panel-overview {
  grid-column: 2 / 3;
}

@media (max-width: 900px) {
  .app-main {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: auto auto auto;
  }

  .panel-controls,
  .panel-results,
  .panel-overview {
    grid-column: 1 / 2;
  }
}

/* Controls */

.controls-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1.1fr) minmax(0, 0.9fr);
  gap: 12px;
}

@media (max-width: 900px) {
  .controls-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}

.field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.field label {
  font-size: 0.85rem;
  color: #cbd5e1;
}

.range-row {
  display: flex;
  gap: 6px;
  align-items: center;
}

.range-row input {
  width: 80px;
}

.range-sep {
  font-size: 0.9rem;
  color: #94a3b8;
}

input[type="number"],
input[type="text"] {
  padding: 7px 9px;
  border-radius: 10px;
  border: 1px solid #334155;
  background: #020617;
  color: #f9fafb;
  font-size: 0.9rem;
}

input::placeholder {
  color: #64748b;
}

input:focus {
  outline: none;
  border-color: #22c55e;
  box-shadow: 0 0 0 1px rgba(34, 197, 94, 0.4);
}

.hint {
  font-size: 0.75rem;
  color: #64748b;
}

.mode-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  margin-top: 4px;
}

.checkbox-label {
  display: inline-flex;
  gap: 6px;
  align-items: center;
  font-size: 0.85rem;
  color: #e5e7eb;
}

.checkbox-label input {
  width: 15px;
  height: 15px;
}

.field-actions {
  display: flex;
  flex-direction: column;
  gap: 6px;
  justify-content: flex-end;
}

/* Buttons */

.btn-primary,
.btn-secondary,
.btn-ghost {
  border-radius: 999px;
  padding: 8px 14px;
  font-size: 0.9rem;
  cursor: pointer;
  border: 1px solid transparent;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
}

.btn-primary {
  background: linear-gradient(135deg, #22c55e, #4ade80);
  color: #052e16;
  font-weight: 600;
  box-shadow: 0 10px 24px rgba(34, 197, 94, 0.4);
}

.btn-primary:hover {
  background: linear-gradient(135deg, #16a34a, #22c55e);
}

.btn-secondary {
  background: #020617;
  color: #e5e7eb;
  border-color: #334155;
}

.btn-secondary:hover {
  border-color: #22c55e;
}

.btn-ghost {
  background: transparent;
  color: #9ca3af;
  border-color: #4b5563;
}

.btn-ghost:hover {
  color: #e5e7eb;
  border-color: #9ca3af;
}

.btn-disabled {
  opacity: 0.65;
  cursor: default;
}

/* Message */

.message {
  margin-top: 6px;
  min-height: 1.1em;
  font-size: 0.8rem;
  color: #fb923c;
}

/* Results area */

.results-area {
  min-height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
}

.results-placeholder {
  margin: 0;
  font-size: 0.9rem;
  color: #64748b;
}

.results-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.result-slot {
  min-width: 60px;
  min-height: 60px;
  padding: 8px 10px;
  border-radius: 14px;
  background: radial-gradient(circle at top, #0b1120, #020617);
  border: 1px solid #1f2937;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Cascadia Code", "Consolas", monospace;
  color: #f9fafb;
}

.result-number {
  display: inline-block;
  transition: transform 0.15s ease-out;
}

/* 動畫：麻仔台風格 */

.result-slot.animating {
  animation: slotPulse 0.6s infinite alternate;
}

@keyframes slotPulse {
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(-4px);
  }
}

.result-slot.done .result-number {
  animation: popIn 0.35s ease-out;
}

@keyframes popIn {
  0% {
    transform: scale(0.3);
  }
  80% {
    transform: scale(1.15);
  }
  100% {
    transform: scale(1);
  }
}

/* Overview grid */

.panel-header-row {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
  margin-bottom: 4px;
}

.legend-title {
  font-size: 0.75rem;
  color: #9ca3af;
}

.legend-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  font-size: 0.75rem;
  margin-bottom: 8px;
}

.legend-item {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  color: #cbd5e1;
}

.color-dot {
  width: 12px;
  height: 12px;
  border-radius: 999px;
  border: 1px solid #0f172a;
}

.color-dot.c1 {
  background: #ef4444; /* 紅 */
}
.color-dot.c2 {
  background: #fb923c; /* 橙 */
}
.color-dot.c3 {
  background: #facc15; /* 黃 */
}
.color-dot.c4 {
  background: #22c55e; /* 綠 */
}
.color-dot.c5 {
  background: #3b82f6; /* 藍 */
}
.color-dot.c6 {
  background: #4f46e5; /* 靛 */
}
.color-dot.c7 {
  background: #a855f7; /* 紫 */
}
.color-dot.c8 {
  background: #ffffff; /* 白 */
}
.color-dot.c9 {
  background: #4b5563; /* 灰 */
}
.color-dot.c10 {
  background: #000000; /* 黑 */
}

/* Numbers grid */

.numbers-grid {
  margin-top: 4px;
  display: grid;
  gap: 6px;
}

/* 依範圍自動切換每排幾個 */

.numbers-grid.cols-5 {
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.numbers-grid.cols-10 {
  grid-template-columns: repeat(10, minmax(0, 1fr));
}

.numbers-grid.cols-15 {
  grid-template-columns: repeat(15, minmax(0, 1fr));
}

.numbers-grid.cols-20 {
  grid-template-columns: repeat(20, minmax(0, 1fr));
}

.number-circle {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 999px;
  border: 1px solid #4b5563;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Cascadia Code", "Consolas", monospace;
  color: #e5e7eb;
  font-size: clamp(0.5rem, 1.2vw, 0.9rem);
}

/* 顏色依抽中次數 */

.number-circle.count-0 {
  background: transparent;
}

.number-circle.count-1 {
  background: #ef4444;
}

.number-circle.count-2 {
  background: #fb923c;
}

.number-circle.count-3 {
  background: #facc15;
  color: #0f172a;
}

.number-circle.count-4 {
  background: #22c55e;
}

.number-circle.count-5 {
  background: #3b82f6;
}

.number-circle.count-6 {
  background: #4f46e5;
}

.number-circle.count-7 {
  background: #a855f7;
}

.number-circle.count-8 {
  background: #ffffff;
  color: #020617;
}

.number-circle.count-9 {
  background: #4b5563;
}

.number-circle.count-10 {
  background: #000000;
}

/* 被排除的號碼（例如生病請假） */

.number-circle.excluded {
  opacity: 0.25;
  border-style: dashed;
}

/* Footer */

.app-footer {
  padding: 8px 16px 14px;
  text-align: center;
  font-size: 0.75rem;
  color: #64748b;
  border-top: 1px solid #020617;
}