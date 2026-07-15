/* ============================================================
   Tally — 기록하는 계산기
   계산 로직 + 테이프 렌더링 + 키보드 지원
   ============================================================ */

(function () {
  "use strict";

  // ---- DOM ----
  const readout = document.getElementById("readout");
  const keypad = document.getElementById("keypad");
  const tapeRoll = document.getElementById("tapeRoll");
  const tapeEmpty = document.getElementById("tapeEmpty");
  const clearTapeBtn = document.getElementById("clearTape");

  // ---- State ----
  let currentInput = "0"; // string shown in readout
  let accumulator = null; // running value
  let pendingOp = null; // "+", "−", "×", "÷"
  let justEvaluated = false; // last action was "="
  let freshOperand = true; // next digit starts a new number
  let errored = false;

  // ---- Number helpers ----
  // Trim floating-point noise (0.1 + 0.2 -> 0.3) without killing precision.
  function normalize(n) {
    if (!isFinite(n)) return n;
    return parseFloat(n.toPrecision(12));
  }

  // Format for the readout: group thousands, keep the trailing decimal point.
  function format(str) {
    if (str === "Error") return "Error";
    const negative = str.startsWith("-");
    let body = negative ? str.slice(1) : str;
    const trailingDot = body.endsWith(".");
    let [intPart, decPart] = body.split(".");
    intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    let out = decPart !== undefined ? intPart + "." + decPart : intPart;
    if (trailingDot && decPart === "") out = intPart + ".";
    return (negative ? "-" : "") + out;
  }

  function render() {
    readout.textContent = format(currentInput);
    readout.classList.toggle("is-error", errored);
  }

  // ---- Tape ----
  function clearEmptyState() {
    if (tapeEmpty && tapeEmpty.parentNode) tapeEmpty.remove();
  }

  function printLine(op, value, opts = {}) {
    clearEmptyState();
    const li = document.createElement("li");
    li.className = "tape__line";
    if (opts.total) li.classList.add("is-total");
    const num = typeof value === "number" ? value : parseFloat(value);
    if (!opts.total && isFinite(num) && num < 0) li.classList.add("is-neg");

    const opCell = document.createElement("span");
    opCell.className = "op";
    opCell.textContent = op || "";

    const valCell = document.createElement("span");
    valCell.className = "val";
    valCell.textContent = value === "Error" ? "Error" : format(String(value));

    li.append(opCell, valCell);
    tapeRoll.append(li);
    // keep the newest line in view
    tapeRoll.scrollTop = tapeRoll.scrollHeight;
  }

  function resetTapeEmptyState() {
    tapeRoll.innerHTML = "";
    const li = document.createElement("li");
    li.className = "tape__empty";
    li.textContent = "아직 계산 기록이 없어요. 숫자를 입력해 보세요.";
    tapeRoll.append(li);
  }

  // ---- Arithmetic ----
  function apply(op, a, b) {
    switch (op) {
      case "+": return a + b;
      case "−": return a - b;
      case "×": return a * b;
      case "÷": return b === 0 ? NaN : a / b;
      default: return b;
    }
  }

  function fail() {
    currentInput = "Error";
    errored = true;
    accumulator = null;
    pendingOp = null;
    justEvaluated = false;
    freshOperand = true;
    printLine("", "Error");
    render();
  }

  function resetAll() {
    currentInput = "0";
    accumulator = null;
    pendingOp = null;
    justEvaluated = false;
    freshOperand = true;
    errored = false;
    render();
  }

  // ---- Actions ----
  function inputDigit(d) {
    if (errored) resetAll();
    if (justEvaluated) {
      // start a brand-new calculation
      accumulator = null;
      pendingOp = null;
      justEvaluated = false;
      currentInput = "0";
      freshOperand = true;
    }
    if (freshOperand) {
      currentInput = d === "0" ? "0" : d;
      freshOperand = false;
    } else {
      if (currentInput === "0") currentInput = d;
      else currentInput += d;
    }
    render();
  }

  function inputDecimal() {
    if (errored) resetAll();
    if (justEvaluated) {
      accumulator = null;
      pendingOp = null;
      justEvaluated = false;
      currentInput = "0";
      freshOperand = false;
      currentInput = "0.";
      render();
      return;
    }
    if (freshOperand) {
      currentInput = "0.";
      freshOperand = false;
    } else if (!currentInput.includes(".")) {
      currentInput += ".";
    }
    render();
  }

  function backspace() {
    if (errored) { resetAll(); return; }
    if (justEvaluated || freshOperand) return;
    currentInput = currentInput.slice(0, -1);
    if (currentInput === "" || currentInput === "-") currentInput = "0";
    render();
  }

  function percent() {
    if (errored) return;
    const value = normalize(parseFloat(currentInput) / 100);
    currentInput = String(value);
    printLine("%", value);
    freshOperand = true; // committed; next digit starts fresh
    justEvaluated = false;
    render();
  }

  function chooseOperator(op) {
    if (errored) return;
    const value = parseFloat(currentInput);

    if (pendingOp !== null && !freshOperand) {
      // chain: fold the current operand into the accumulator
      const result = normalize(apply(pendingOp, accumulator, value));
      if (!isFinite(result)) return fail();
      printLine(pendingOp, value);
      accumulator = result;
      currentInput = String(result);
    } else if (pendingOp === null) {
      // first operand of a chain
      accumulator = value;
      printLine("", value);
    } else {
      // operator pressed again with no new operand: just swap the pending op
      accumulator = value;
    }

    pendingOp = op;
    freshOperand = true;
    justEvaluated = false;
    render();
  }

  function equals() {
    if (errored || pendingOp === null) return;
    const value = parseFloat(currentInput);
    // if an operand was already folded and "=" repeats, use current as b
    printLine(pendingOp, value);
    const result = normalize(apply(pendingOp, accumulator, value));
    if (!isFinite(result)) return fail();

    printLine("=", result, { total: true });
    currentInput = String(result);
    accumulator = null;
    pendingOp = null;
    justEvaluated = true;
    freshOperand = true;
    render();
  }

  // ---- Dispatch ----
  function handle(el) {
    if (el.dataset.digit !== undefined) return inputDigit(el.dataset.digit);
    if (el.dataset.op !== undefined) {
      return el.dataset.op === "%" ? percent() : chooseOperator(el.dataset.op);
    }
    switch (el.dataset.action) {
      case "decimal": return inputDecimal();
      case "clear": return resetAll();
      case "back": return backspace();
      case "equals": return equals();
    }
  }

  // ---- Mouse / touch ----
  keypad.addEventListener("click", function (e) {
    const key = e.target.closest(".key");
    if (key) handle(key);
  });

  clearTapeBtn.addEventListener("click", resetTapeEmptyState);

  // ---- Keyboard ----
  const keyMap = {
    "+": '[data-op="+"]',
    "-": '[data-op="−"]',
    "*": '[data-op="×"]',
    "/": '[data-op="÷"]',
    "%": '[data-op="%"]',
    "=": '[data-action="equals"]',
    Enter: '[data-action="equals"]',
    Backspace: '[data-action="back"]',
    Escape: '[data-action="clear"]',
    ".": '[data-action="decimal"]',
    ",": '[data-action="decimal"]',
  };

  function flash(selector) {
    const btn = keypad.querySelector(selector);
    if (!btn) return;
    btn.classList.add("is-press");
    setTimeout(() => btn.classList.remove("is-press"), 110);
  }

  document.addEventListener("keydown", function (e) {
    // let users tab/interact normally with buttons via space/enter on focus
    const key = e.key;

    if (key >= "0" && key <= "9") {
      inputDigit(key);
      flash(`[data-digit="${key}"]`);
      e.preventDefault();
      return;
    }
    if (keyMap[key]) {
      const selector = keyMap[key];
      // Enter/= should trigger equals, not re-activate a focused button twice
      if (key === "Enter") e.preventDefault();
      handle(keypad.querySelector(selector));
      flash(selector);
      if (key === "/" || key === "Backspace") e.preventDefault();
    }
  });

  // ---- Boot ----
  render();
})();
