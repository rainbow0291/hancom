/* ============================================================
   Apple-style Calculator — vanilla JS state machine
   ============================================================ */
(function () {
  "use strict";

  var resultEl = document.getElementById("result");
  var expressionEl = document.getElementById("expression");
  var keysEl = document.querySelector(".calculator__keys");

  // Operator glyphs → math
  var OPS = {
    "+": function (a, b) { return a + b; },
    "−": function (a, b) { return a - b; },
    "×": function (a, b) { return a * b; },
    "÷": function (a, b) { return b === 0 ? null : a / b; }
  };

  var state = {
    current: "0",     // string being typed
    previous: null,   // stored operand (number)
    operator: null,   // pending operator glyph
    justEvaluated: false,
    error: false
  };

  /* ---- display ---- */
  function formatNumber(n) {
    if (!isFinite(n)) return "Error";
    // strip floating-point noise, cap significant digits
    var rounded = parseFloat(n.toPrecision(10));
    var str = String(rounded);
    // cap total length so the display never overflows badly
    if (str.replace("-", "").replace(".", "").length > 12) {
      str = rounded.toExponential(6);
    }
    return str;
  }

  function render() {
    resultEl.textContent = state.error ? "Error" : state.current;
    if (state.error) {
      expressionEl.textContent = "";
    } else if (state.operator !== null && state.previous !== null) {
      expressionEl.textContent = formatNumber(state.previous) + " " + state.operator;
    } else {
      expressionEl.textContent = "";
    }
  }

  /* ---- input handlers ---- */
  function inputDigit(d) {
    if (state.error) reset();
    if (state.justEvaluated) {
      state.current = d;
      state.justEvaluated = false;
      state.previous = null;
      state.operator = null;
    } else if (state.current === "0") {
      state.current = d;
    } else {
      state.current += d;
    }
  }

  function inputDecimal() {
    if (state.error) reset();
    if (state.justEvaluated) {
      state.current = "0.";
      state.justEvaluated = false;
      state.previous = null;
      state.operator = null;
      return;
    }
    if (state.current.indexOf(".") === -1) {
      state.current += ".";
    }
  }

  function chooseOperator(op) {
    if (state.error) return;
    var value = parseFloat(state.current);

    if (state.operator !== null && !state.justEvaluated) {
      // chain-evaluate the pending op
      var out = compute();
      if (out === null) return; // error already set
    } else {
      state.previous = value;
    }
    state.operator = op;
    state.justEvaluated = false;
    state.current = "0";
  }

  function compute() {
    if (state.operator === null || state.previous === null) return null;
    var a = state.previous;
    var b = parseFloat(state.current);
    var fn = OPS[state.operator];
    var out = fn(a, b);

    if (out === null || !isFinite(out)) {
      state.error = true;
      render();
      return null;
    }
    state.previous = out;
    state.current = formatNumber(out);
    return out;
  }

  function equals() {
    if (state.error) return;
    if (state.operator === null) return;
    var out = compute();
    if (out === null) return;
    state.operator = null;
    state.previous = null;
    state.justEvaluated = true;
  }

  function negate() {
    if (state.error) return;
    if (state.current === "0") return;
    state.current = state.current.charAt(0) === "-"
      ? state.current.slice(1)
      : "-" + state.current;
  }

  function percent() {
    if (state.error) return;
    var value = parseFloat(state.current) / 100;
    state.current = formatNumber(value);
  }

  function reset() {
    state.current = "0";
    state.previous = null;
    state.operator = null;
    state.justEvaluated = false;
    state.error = false;
  }

  /* ---- action dispatch ---- */
  function dispatch(action, dataset) {
    switch (action) {
      case "digit":   inputDigit(dataset.digit); break;
      case "decimal": inputDecimal(); break;
      case "operator": chooseOperator(dataset.operator); break;
      case "equals":  equals(); break;
      case "clear":   reset(); break;
      case "negate":  negate(); break;
      case "percent": percent(); break;
    }
    render();
  }

  /* ---- click wiring (delegated) ---- */
  keysEl.addEventListener("click", function (e) {
    var btn = e.target.closest(".key");
    if (!btn) return;
    dispatch(btn.dataset.action, btn.dataset);
  });

  /* ---- keyboard support ---- */
  var KEY_MAP = {
    "+": { action: "operator", operator: "+" },
    "-": { action: "operator", operator: "−" },
    "*": { action: "operator", operator: "×" },
    "/": { action: "operator", operator: "÷" },
    "Enter": { action: "equals" },
    "=": { action: "equals" },
    ".": { action: "decimal" },
    "Escape": { action: "clear" },
    "%": { action: "percent" }
  };

  document.addEventListener("keydown", function (e) {
    var mapped;
    if (e.key >= "0" && e.key <= "9") {
      mapped = { action: "digit", digit: e.key };
    } else if (e.key === "Backspace") {
      backspace();
      render();
      flash('[data-action="clear"]');
      return;
    } else {
      mapped = KEY_MAP[e.key];
    }
    if (!mapped) return;
    e.preventDefault();
    dispatch(mapped.action, mapped);

    // mirror the scale(0.95) press state on the matching button
    var selector = buildSelector(mapped);
    if (selector) flash(selector);
  });

  function backspace() {
    if (state.error) { reset(); return; }
    if (state.justEvaluated) return;
    if (state.current.length <= 1 ||
        (state.current.length === 2 && state.current.charAt(0) === "-")) {
      state.current = "0";
    } else {
      state.current = state.current.slice(0, -1);
    }
  }

  function buildSelector(mapped) {
    if (mapped.action === "digit") return '[data-digit="' + mapped.digit + '"]';
    if (mapped.action === "operator") return '[data-operator="' + mapped.operator + '"]';
    return '[data-action="' + mapped.action + '"]';
  }

  function flash(selector) {
    var btn = keysEl.querySelector(selector);
    if (!btn) return;
    btn.classList.add("is-pressed");
    setTimeout(function () { btn.classList.remove("is-pressed"); }, 100);
  }

  render();
})();
