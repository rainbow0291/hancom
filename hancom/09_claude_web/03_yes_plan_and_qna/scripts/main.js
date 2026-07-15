/* ===== 별 내리는 배경 생성 ===== */
function createStars(count) {
  const container = document.getElementById("stars");
  const frag = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.left = Math.random() * 100 + "vw";
    // 낙하 시간 4~10초, 시작 지연 랜덤
    const duration = 4 + Math.random() * 6;
    star.style.animationDuration = duration + "s";
    star.style.animationDelay = -(Math.random() * duration) + "s";
    // 별 크기 살짝 랜덤
    const size = 1 + Math.random() * 2;
    star.style.width = size + "px";
    star.style.height = size + "px";
    frag.appendChild(star);
  }
  container.appendChild(frag);
}

/* ===== 계산기 상태 ===== */
let currentValue = "0";
let previousValue = "";
let operator = null;
let shouldResetDisplay = false;

const currentEl = document.getElementById("current");
const previousEl = document.getElementById("previous");
const historyEl = document.getElementById("history");

const OP_SYMBOL = { "+": "+", "−": "−", "×": "×", "÷": "÷" };

/* ===== 계산 기록 ===== */
function addHistory(expression) {
  const item = document.createElement("div");
  item.className = "history__item";
  item.textContent = expression;
  historyEl.appendChild(item);
  // 최근 기록이 보이도록 맨 아래로 스크롤
  historyEl.scrollTop = historyEl.scrollHeight;
}

/* ===== 화면 갱신 ===== */
function updateDisplay() {
  currentEl.textContent = currentValue;
  previousEl.textContent =
    operator && previousValue !== ""
      ? `${previousValue} ${OP_SYMBOL[operator]}`
      : "";
}

/* ===== 숫자 입력 ===== */
function inputNumber(num) {
  if (currentValue === "오류") clear();
  if (shouldResetDisplay) {
    currentValue = num;
    shouldResetDisplay = false;
  } else {
    currentValue = currentValue === "0" ? num : currentValue + num;
  }
  updateDisplay();
}

/* ===== 소수점 입력 ===== */
function inputDecimal() {
  if (currentValue === "오류") clear();
  if (shouldResetDisplay) {
    currentValue = "0.";
    shouldResetDisplay = false;
  } else if (!currentValue.includes(".")) {
    currentValue += ".";
  }
  updateDisplay();
}

/* ===== 연산자 선택 ===== */
function chooseOperator(op) {
  if (currentValue === "오류") return;
  // 이미 대기 중인 연산이 있고 새 숫자가 입력됐으면 먼저 계산
  if (operator && !shouldResetDisplay) {
    calculate();
  }
  previousValue = currentValue;
  operator = op;
  shouldResetDisplay = true;
  updateDisplay();
}

/* ===== 계산 실행 ===== */
function calculate() {
  if (!operator || previousValue === "") return;

  const prev = parseFloat(previousValue);
  const curr = parseFloat(currentValue);
  let result;

  switch (operator) {
    case "+": result = prev + curr; break;
    case "−": result = prev - curr; break;
    case "×": result = prev * curr; break;
    case "÷":
      if (curr === 0) {
        currentValue = "오류";
        previousValue = "";
        operator = null;
        shouldResetDisplay = true;
        updateDisplay();
        return;
      }
      result = prev / curr;
      break;
  }

  // 부동소수점 정리 (불필요한 긴 소수 방지)
  result = Math.round((result + Number.EPSILON) * 1e10) / 1e10;

  // 계산 기록 추가
  addHistory(`${previousValue} ${OP_SYMBOL[operator]} ${currentValue} = ${result}`);

  currentValue = String(result);
  previousValue = "";
  operator = null;
  shouldResetDisplay = true;
  updateDisplay();
}

/* ===== 기타 기능 ===== */
function clear() {
  currentValue = "0";
  previousValue = "";
  operator = null;
  shouldResetDisplay = false;
  updateDisplay();
}

function deleteLast() {
  if (shouldResetDisplay || currentValue === "오류") return;
  currentValue = currentValue.length > 1 ? currentValue.slice(0, -1) : "0";
  updateDisplay();
}

function percent() {
  if (currentValue === "오류") return;
  currentValue = String(parseFloat(currentValue) / 100);
  updateDisplay();
}

function negate() {
  if (currentValue === "오류" || currentValue === "0") return;
  currentValue = currentValue.startsWith("-")
    ? currentValue.slice(1)
    : "-" + currentValue;
  updateDisplay();
}

/* ===== 버튼 클릭 (이벤트 위임) ===== */
document.querySelector(".buttons").addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  const { action, value } = btn.dataset;

  switch (action) {
    case "number":   inputNumber(value); break;
    case "decimal":  inputDecimal(); break;
    case "operator": chooseOperator(value); break;
    case "equals":   calculate(); break;
    case "clear":    clear(); break;
    case "delete":   deleteLast(); break;
    case "percent":  percent(); break;
    case "negate":   negate(); break;
  }
});

/* ===== 키보드 입력 ===== */
const KEY_OP = { "+": "+", "-": "−", "*": "×", "/": "÷" };

document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (key >= "0" && key <= "9") {
    inputNumber(key);
  } else if (key === ".") {
    inputDecimal();
  } else if (KEY_OP[key]) {
    e.preventDefault();
    chooseOperator(KEY_OP[key]);
  } else if (key === "Enter" || key === "=") {
    e.preventDefault();
    calculate();
  } else if (key === "Backspace") {
    deleteLast();
  } else if (key === "Escape") {
    clear();
  } else if (key === "%") {
    percent();
  }
});

/* ===== 초기화 ===== */
createStars(80);
updateDisplay();
