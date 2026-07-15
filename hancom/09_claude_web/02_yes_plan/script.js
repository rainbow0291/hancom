(function () {
  "use strict";

  const resultEl = document.getElementById("result");
  const previewEl = document.getElementById("preview");
  const keysEl = document.querySelector(".keys");

  const OP_SYMBOLS = { add: "+", subtract: "−", multiply: "×", divide: "÷" };

  // 계산기 상태
  let current = "0";      // 현재 입력 중인 숫자(문자열)
  let previous = null;    // 이전에 확정된 값(숫자)
  let operator = null;    // 대기 중인 연산자 action
  let justEvaluated = false; // 방금 '=' 를 눌렀는지

  function render() {
    resultEl.textContent = formatForDisplay(current);
    if (previous !== null && operator) {
      previewEl.textContent = `${formatForDisplay(String(previous))} ${OP_SYMBOLS[operator]}`;
    } else {
      previewEl.innerHTML = "&nbsp;";
    }
    highlightOperator();
  }

  function highlightOperator() {
    document.querySelectorAll(".key--op").forEach((btn) => {
      const isActive = operator && btn.dataset.action === operator && !justEvaluated;
      btn.classList.toggle("is-active", Boolean(isActive));
    });
  }

  function formatForDisplay(value) {
    if (value === "Error") return value;
    if (value === "" || value === "-") return value || "0";
    // 소수점 입력 중(예: "12.")은 그대로 표시
    if (value.endsWith(".")) return addThousands(value.slice(0, -1)) + ".";
    return addThousands(value);
  }

  function addThousands(numStr) {
    const negative = numStr.startsWith("-");
    const abs = negative ? numStr.slice(1) : numStr;
    const [intPart, decPart] = abs.split(".");
    const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    let out = decPart !== undefined ? `${withCommas}.${decPart}` : withCommas;
    return negative ? "-" + out : out;
  }

  function inputNumber(n) {
    if (justEvaluated) {
      current = "0";
      justEvaluated = false;
    }
    if (n === ".") {
      if (current.includes(".")) return;
      current = current === "" ? "0." : current + ".";
      return;
    }
    if (current === "0") {
      current = n;
    } else {
      current = current + n;
    }
  }

  function chooseOperator(nextOp) {
    justEvaluated = false;
    const inputValue = parseFloat(current);

    if (operator && previous !== null) {
      // 연속 연산: 앞의 연산을 먼저 계산
      const computed = compute(previous, inputValue, operator);
      if (computed === null) return handleError();
      previous = computed;
      current = String(computed);
    } else {
      previous = inputValue;
    }

    operator = nextOp;
    current = "0"; // 다음 숫자 입력 대기
    // current 를 0으로 두되, 다음 숫자 입력 시 덮어쓰기 위해 플래그처럼 사용
    render();
    // display 에는 이전 확정값을 보여주기 위해 result 를 previous 로 표시
    resultEl.textContent = formatForDisplay(String(previous));
    waitingForOperand = true;
  }

  let waitingForOperand = false;

  function equals() {
    if (operator === null || previous === null) return;
    const inputValue = parseFloat(current);
    const computed = compute(previous, inputValue, operator);
    if (computed === null) return handleError();
    current = String(computed);
    previewEl.textContent = `${formatForDisplay(String(previous))} ${OP_SYMBOLS[operator]} ${formatForDisplay(String(inputValue))} =`;
    previous = null;
    operator = null;
    justEvaluated = true;
    waitingForOperand = false;
    resultEl.textContent = formatForDisplay(current);
    highlightOperator();
  }

  function compute(a, b, op) {
    let r;
    switch (op) {
      case "add": r = a + b; break;
      case "subtract": r = a - b; break;
      case "multiply": r = a * b; break;
      case "divide":
        if (b === 0) return null; // 0으로 나누기
        r = a / b;
        break;
      default: return b;
    }
    // 부동소수점 오차 보정
    return Math.round((r + Number.EPSILON) * 1e10) / 1e10;
  }

  function handleError() {
    current = "Error";
    previous = null;
    operator = null;
    waitingForOperand = false;
    justEvaluated = true;
    resultEl.textContent = "Error";
    previewEl.innerHTML = "&nbsp;";
    highlightOperator();
  }

  function clearAll() {
    current = "0";
    previous = null;
    operator = null;
    waitingForOperand = false;
    justEvaluated = false;
    render();
  }

  function toggleSign() {
    if (current === "0" || current === "Error") return;
    current = current.startsWith("-") ? current.slice(1) : "-" + current;
    render();
  }

  function percent() {
    if (current === "Error") return;
    const value = parseFloat(current) / 100;
    current = String(Math.round((value + Number.EPSILON) * 1e10) / 1e10);
    justEvaluated = false;
    render();
  }

  function backspace() {
    if (justEvaluated || current === "Error") {
      clearAll();
      return;
    }
    if (current.length <= 1 || (current.length === 2 && current.startsWith("-"))) {
      current = "0";
    } else {
      current = current.slice(0, -1);
    }
    render();
  }

  function handleAction(action) {
    if (current === "Error" && action !== "clear") {
      // Error 상태에서는 AC 외 입력 무시(숫자 입력은 아래 로직에서 초기화)
    }
    switch (action) {
      case "clear": clearAll(); break;
      case "sign": toggleSign(); break;
      case "percent": percent(); break;
      case "backspace": backspace(); break;
      case "equals": equals(); break;
      case "add":
      case "subtract":
      case "multiply":
      case "divide":
        chooseOperator(action);
        break;
    }
  }

  // 숫자 입력 시 연산자 대기 상태 처리
  function handleNumber(n) {
    if (current === "Error") current = "0";
    if (waitingForOperand) {
      current = "0";
      waitingForOperand = false;
    }
    inputNumber(n);
    render();
  }

  // 클릭 이벤트 (이벤트 위임)
  keysEl.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    if (btn.dataset.num !== undefined) {
      handleNumber(btn.dataset.num);
    } else if (btn.dataset.action) {
      handleAction(btn.dataset.action);
    }
  });

  // 키보드 지원
  window.addEventListener("keydown", (e) => {
    const { key } = e;
    if (key >= "0" && key <= "9") {
      handleNumber(key);
    } else if (key === ".") {
      handleNumber(".");
    } else if (key === "+") {
      handleAction("add");
    } else if (key === "-") {
      handleAction("subtract");
    } else if (key === "*") {
      handleAction("multiply");
    } else if (key === "/") {
      e.preventDefault();
      handleAction("divide");
    } else if (key === "Enter" || key === "=") {
      e.preventDefault();
      handleAction("equals");
    } else if (key === "Backspace") {
      handleAction("backspace");
    } else if (key === "Escape") {
      handleAction("clear");
    } else if (key === "%") {
      handleAction("percent");
    }
  });

  render();
})();
