/* Wanted Calculator — logic, keyboard support, and the brand-bloom signature. */
(() => {
  "use strict";

  const OP_SYMBOL = { "+": "+", "-": "−", "*": "×", "/": "÷" };
  const ERROR_MSG = "계산할 수 없어요";

  const resultEl = document.getElementById("result");
  const exprEl = document.getElementById("expr");
  const padEl = document.querySelector(".pad");
  const bloomLayer = document.getElementById("bloomLayer");
  const themeToggle = document.getElementById("themeToggle");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const state = {
    current: "0",   // string shown / being typed
    previous: null, // number, the left operand
    operator: null, // one of + - * /
    overwrite: true, // next digit replaces current
    error: false,
  };

  /* ---------- formatting ---------- */
  function group(str) {
    const neg = str.startsWith("-");
    let s = neg ? str.slice(1) : str;
    let [int, dec] = s.split(".");
    int = int.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const out = dec !== undefined ? int + "." + dec : int;
    return (neg ? "-" : "") + out;
  }

  function tidy(n) {
    if (!isFinite(n)) return null;
    if (n === 0) return "0";
    const abs = Math.abs(n);
    if (abs >= 1e15 || abs < 1e-9) {
      return n.toExponential(6).replace(/\.?0+e/, "e");
    }
    // clip binary float noise, then drop trailing zeros
    return parseFloat(n.toPrecision(12)).toString();
  }

  /* ---------- render ---------- */
  function render() {
    if (state.error) {
      resultEl.textContent = ERROR_MSG;
      resultEl.classList.add("is-error");
      exprEl.textContent = "";
      return;
    }
    resultEl.classList.remove("is-error");
    resultEl.textContent = group(state.current);
    exprEl.textContent =
      state.previous !== null && state.operator
        ? `${group(tidy(state.previous))} ${OP_SYMBOL[state.operator]}`
        : "";
  }

  /* ---------- actions ---------- */
  function clearAll() {
    state.current = "0";
    state.previous = null;
    state.operator = null;
    state.overwrite = true;
    state.error = false;
  }

  function recoverIfError() {
    if (state.error) clearAll();
  }

  function inputDigit(d) {
    recoverIfError();
    if (state.overwrite) {
      state.current = d;
      state.overwrite = false;
    } else if (state.current === "0") {
      state.current = d;
    } else if (state.current.replace(/[-.]/g, "").length < 15) {
      state.current += d;
    }
  }

  function inputDot() {
    recoverIfError();
    if (state.overwrite) {
      state.current = "0.";
      state.overwrite = false;
    } else if (!state.current.includes(".")) {
      state.current += ".";
    }
  }

  function compute() {
    const a = state.previous;
    const b = parseFloat(state.current);
    let r;
    switch (state.operator) {
      case "+": r = a + b; break;
      case "-": r = a - b; break;
      case "*": r = a * b; break;
      case "/": r = a / b; break;
      default: return state.current;
    }
    const t = tidy(r);
    if (t === null) { state.error = true; return null; }
    return t;
  }

  function chooseOp(op) {
    recoverIfError();
    if (state.operator && !state.overwrite) {
      const t = compute();
      if (state.error) return;
      state.current = t;
    }
    state.previous = parseFloat(state.current);
    state.operator = op;
    state.overwrite = true;
  }

  function equals() {
    recoverIfError();
    if (!state.operator) return;
    const t = compute();
    if (state.error) return;
    state.current = t;
    state.previous = null;
    state.operator = null;
    state.overwrite = true;
  }

  function negate() {
    recoverIfError();
    if (state.current === "0") return;
    state.current = state.current.startsWith("-")
      ? state.current.slice(1)
      : "-" + state.current;
  }

  function percent() {
    recoverIfError();
    const v = parseFloat(state.current) / 100;
    const t = tidy(v);
    if (t === null) { state.error = true; return; }
    state.current = t;
    state.overwrite = true;
  }

  function backspace() {
    if (state.error) { clearAll(); return; }
    if (state.overwrite) return;
    const next = state.current.slice(0, -1);
    state.current = next === "" || next === "-" ? "0" : next;
    if (state.current === "0") state.overwrite = true;
  }

  /* ---------- operator highlight ---------- */
  function highlightOperator() {
    document.querySelectorAll(".key--op").forEach((k) => {
      k.classList.toggle(
        "is-active",
        state.operator !== null &&
          state.overwrite &&
          k.dataset.op === state.operator
      );
    });
  }

  /* ---------- the signature bloom ---------- */
  function bloom(x, y, full) {
    if (reduceMotion.matches) return;
    const el = document.createElement("div");
    el.className = full ? "bloom bloom--full" : "bloom";
    el.style.left = (full ? window.innerWidth / 2 : x) + "px";
    el.style.top = (full ? window.innerHeight / 2 : y) + "px";
    bloomLayer.appendChild(el);
    el.addEventListener("animationend", () => el.remove(), { once: true });
  }

  /* ---------- dispatch ---------- */
  function handle(target, x, y) {
    if (!target) return false;
    if (target.dataset.num !== undefined) inputDigit(target.dataset.num);
    else if (target.dataset.op !== undefined) chooseOp(target.dataset.op);
    else {
      switch (target.dataset.action) {
        case "dot": inputDot(); break;
        case "clear": clearAll(); break;
        case "negate": negate(); break;
        case "percent": percent(); break;
        case "equals": equals(); break;
        default: return false;
      }
    }
    bloom(x, y, target.dataset.action === "equals");
    render();
    highlightOperator();
    return true;
  }

  padEl.addEventListener("click", (e) => {
    const key = e.target.closest(".key");
    if (!key) return;
    const rect = key.getBoundingClientRect();
    handle(key, rect.left + rect.width / 2, rect.top + rect.height / 2);
  });

  /* ---------- keyboard ---------- */
  const KEY_MAP = {
    "+": '[data-op="+"]', "-": '[data-op="-"]',
    "*": '[data-op="*"]', "/": '[data-op="/"]',
    "=": '[data-action="equals"]', "Enter": '[data-action="equals"]',
    ".": '[data-action="dot"]', ",": '[data-action="dot"]',
    "%": '[data-action="percent"]',
    "Escape": '[data-action="clear"]', "c": '[data-action="clear"]', "C": '[data-action="clear"]',
  };

  window.addEventListener("keydown", (e) => {
    if (e.key >= "0" && e.key <= "9") {
      pressBySelector(`[data-num="${e.key}"]`);
      return;
    }
    if (e.key === "Backspace") {
      backspace();
      render();
      highlightOperator();
      return;
    }
    const sel = KEY_MAP[e.key];
    if (sel) {
      e.preventDefault();
      pressBySelector(sel);
    }
  });

  function pressBySelector(sel) {
    const key = document.querySelector(sel);
    if (!key) return;
    const rect = key.getBoundingClientRect();
    handle(key, rect.left + rect.width / 2, rect.top + rect.height / 2);
    key.animate(
      [{ transform: "scale(0.96)" }, { transform: "scale(1)" }],
      { duration: 120, easing: "ease" }
    );
  }

  /* ---------- theme toggle ---------- */
  themeToggle.addEventListener("click", () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    themeToggle.setAttribute(
      "aria-label",
      next === "dark" ? "라이트 모드 켜기" : "다크 모드 켜기"
    );
  });

  render();
})();
