(function () {
  const currentEl = document.getElementById("current");
  const historyEl = document.getElementById("history");
  const keys = document.querySelector(".keys");

  const state = {
    current: "0",     // 화면에 보이는 값(문자열)
    previous: null,   // 이전 피연산자(숫자)
    operator: null,   // 대기 중인 연산자
    justEvaluated: false, // 직전에 = 를 눌렀는지
  };

  const OPS = {
    "+": (a, b) => a + b,
    "−": (a, b) => a - b,
    "×": (a, b) => a * b,
    "÷": (a, b) => (b === 0 ? null : a / b),
  };

  function render() {
    currentEl.textContent = state.current;
    if (state.operator && state.previous !== null) {
      historyEl.textContent = `${format(state.previous)} ${state.operator}`;
    } else {
      historyEl.textContent = "";
    }
  }

  // 부동소수점 오차를 줄이고 보기 좋게 표시
  function format(num) {
    if (num === null || num === undefined) return "";
    const rounded = Math.round((num + Number.EPSILON) * 1e10) / 1e10;
    return String(rounded);
  }

  function inputNumber(value) {
    if (state.justEvaluated) {
      state.current = value;
      state.justEvaluated = false;
      return;
    }
    if (state.current === "0") {
      state.current = value;
    } else {
      state.current += value;
    }
  }

  function inputDecimal() {
    if (state.justEvaluated) {
      state.current = "0.";
      state.justEvaluated = false;
      return;
    }
    if (!state.current.includes(".")) {
      state.current += ".";
    }
  }

  function chooseOperator(op) {
    if (state.operator && state.previous !== null && !state.justEvaluated) {
      // 연속 계산: 이미 대기 중인 연산이 있으면 먼저 계산
      compute();
    } else {
      state.previous = parseFloat(state.current);
    }
    state.operator = op;
    state.justEvaluated = false;
    // 다음 숫자 입력은 새로 시작
    state.current = "0";
  }

  function compute() {
    if (state.operator === null || state.previous === null) return;
    const a = state.previous;
    const b = parseFloat(state.current);
    const fn = OPS[state.operator];
    const result = fn(a, b);

    if (result === null) {
      state.current = "0으로 나눌 수 없어요";
      state.previous = null;
      state.operator = null;
      state.justEvaluated = true;
      return;
    }
    state.current = format(result);
    state.previous = result;
  }

  function equals() {
    if (state.operator === null || state.previous === null) return;
    const expr = `${format(state.previous)} ${state.operator} ${state.current} =`;
    compute();
    historyEl.textContent = expr;
    state.previous = null;
    state.operator = null;
    state.justEvaluated = true;
  }

  function clearAll() {
    state.current = "0";
    state.previous = null;
    state.operator = null;
    state.justEvaluated = false;
  }

  function toggleSign() {
    if (state.current === "0" || state.current.includes("나눌")) return;
    state.current = state.current.startsWith("-")
      ? state.current.slice(1)
      : "-" + state.current;
  }

  function percent() {
    const value = parseFloat(state.current);
    if (Number.isNaN(value)) return;
    state.current = format(value / 100);
  }

  function handleAction(action, dataset) {
    switch (action) {
      case "number":
        inputNumber(dataset.value);
        break;
      case "decimal":
        inputDecimal();
        break;
      case "operator":
        chooseOperator(dataset.op);
        break;
      case "equals":
        equals();
        break;
      case "clear":
        clearAll();
        break;
      case "sign":
        toggleSign();
        break;
      case "percent":
        percent();
        break;
    }
    render();
  }

  keys.addEventListener("click", (e) => {
    const btn = e.target.closest(".key");
    if (!btn) return;
    handleAction(btn.dataset.action, btn.dataset);
  });

  // 키보드 지원
  window.addEventListener("keydown", (e) => {
    const k = e.key;
    if (/[0-9]/.test(k)) return handleAction("number", { value: k });
    if (k === ".") return handleAction("decimal", {});
    if (k === "+") return handleAction("operator", { op: "+" });
    if (k === "-") return handleAction("operator", { op: "−" });
    if (k === "*") return handleAction("operator", { op: "×" });
    if (k === "/") { e.preventDefault(); return handleAction("operator", { op: "÷" }); }
    if (k === "Enter" || k === "=") { e.preventDefault(); return handleAction("equals", {}); }
    if (k === "Escape") return handleAction("clear", {});
    if (k === "%") return handleAction("percent", {});
    if (k === "Backspace") {
      state.current = state.current.length > 1 ? state.current.slice(0, -1) : "0";
      render();
    }
  });

  render();
})();
