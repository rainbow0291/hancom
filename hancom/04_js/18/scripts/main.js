// -------------------------------------------------------
// 클래스 (Class) — 브랜드 객체를 찍어내는 틀
// -------------------------------------------------------
class Brand {
  constructor(rank, name, country, founded, desc, scents, svg) {
    this.rank     = rank;
    this.name     = name;
    this.country  = country;
    this.founded  = founded;
    this.desc     = desc;
    this.scents   = scents;
    this.svg      = svg;
    this.favorite = false;  // 즐겨찾기 초기값
  }

  // 메서드 — 즐겨찾기 토글
  toggleFavorite() {
    this.favorite = !this.favorite;
    console.log(`${this.name} 즐겨찾기: ${this.favorite}`);  // console.log
    return this.favorite;
  }

  // 메서드 — 대표 향수 개수 반환
  getScentCount() {
    return this.scents.length;
  }
}

// -------------------------------------------------------
// 배열 (Array) — Brand 인스턴스 10개
// -------------------------------------------------------
const brands = [
  new Brand(1, "Chanel", "🇫🇷 France", "1910년 창립",
    "코코 샤넬이 설립한 패션·향수의 아이콘. No.5는 세계에서 가장 유명한 향수로, 100년이 넘도록 사랑받고 있습니다.",
    ["No.5", "Coco Mademoiselle", "Chance", "Bleu de Chanel"],
    `<svg viewBox="0 0 80 56" xmlns="http://www.w3.org/2000/svg">
      <path d="M 28 8 A 20 20 0 1 0 28 48" stroke="#1a1a1a" stroke-width="4.5" fill="none"/>
      <path d="M 52 8 A 20 20 0 1 1 52 48" stroke="#1a1a1a" stroke-width="4.5" fill="none"/>
    </svg>`
  ),
  new Brand(2, "Dior", "🇫🇷 France", "1946년 창립",
    "크리스티앙 디올이 설립한 하우스. 우아함과 현대적 감성을 모두 갖춘 향수 라인으로 전 세계적 인기를 자랑합니다.",
    ["J'adore", "Miss Dior", "Sauvage", "Poison"],
    `<svg viewBox="0 0 110 56" xmlns="http://www.w3.org/2000/svg">
      <text x="55" y="40" text-anchor="middle" font-size="34" font-family="Georgia,serif" fill="#1a1a1a" letter-spacing="6">DIOR</text>
      <line x1="10" y1="48" x2="100" y2="48" stroke="#1a1a1a" stroke-width="1"/>
    </svg>`
  ),
  new Brand(3, "Guerlain", "🇫🇷 France", "1828년 창립",
    "프랑스에서 가장 오래된 향수 하우스 중 하나. 샬리마르를 비롯한 클래식 향수들로 향수 역사를 써 내려왔습니다.",
    ["Shalimar", "Mon Guerlain", "La Petite Robe Noire", "Mitsouko"],
    `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="34" stroke="#1a1a1a" stroke-width="1.5" fill="none"/>
      <circle cx="40" cy="40" r="28" stroke="#1a1a1a" stroke-width="0.5" fill="none"/>
      <text x="40" y="54" text-anchor="middle" font-size="38" font-family="Georgia,serif" fill="#1a1a1a" font-style="italic">G</text>
    </svg>`
  ),
  new Brand(4, "Hermès", "🇫🇷 France", "1837년 창립",
    "마구용품으로 시작한 명품 하우스. 절제된 우아함과 자연에서 영감받은 향수로 독보적인 위치를 차지하고 있습니다.",
    ["Twilly d'Hermès", "Terre d'Hermès", "Un Jardin sur le Nil", "Galop d'Hermès"],
    `<svg viewBox="0 0 80 70" xmlns="http://www.w3.org/2000/svg">
      <text x="40" y="50" text-anchor="middle" font-size="46" font-family="Georgia,serif" fill="#1a1a1a" font-weight="300">H</text>
      <line x1="8" y1="60" x2="72" y2="60" stroke="#c95c00" stroke-width="2.5"/>
    </svg>`
  ),
  new Brand(5, "Tom Ford", "🇺🇸 USA", "2005년 창립",
    "미국 출신 디자이너 톰 포드가 론칭한 럭셔리 브랜드. 관능적이고 대담한 향수 라인으로 현대 향수 시장을 이끌고 있습니다.",
    ["Black Orchid", "Lost Cherry", "Tobacco Vanille", "Oud Wood"],
    `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="6" width="68" height="68" stroke="#1a1a1a" stroke-width="2" fill="none"/>
      <text x="40" y="53" text-anchor="middle" font-size="36" font-family="Georgia,serif" fill="#1a1a1a" letter-spacing="3">TF</text>
    </svg>`
  ),
  new Brand(6, "Creed", "🇬🇧 UK", "1760년 창립",
    "260년 역사를 자랑하는 영국 왕실 향수 하우스. 아방투스는 성공한 남성의 향으로 알려져 있습니다.",
    ["Aventus", "Green Irish Tweed", "Silver Mountain Water", "Love in White"],
    `<svg viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg">
      <polyline points="18,46 18,26 33,36 50,18 67,36 82,26 82,46" stroke="#1a1a1a" stroke-width="2" fill="none" stroke-linejoin="round"/>
      <line x1="18" y1="46" x2="82" y2="46" stroke="#1a1a1a" stroke-width="2"/>
      <text x="50" y="68" text-anchor="middle" font-size="15" font-family="Georgia,serif" fill="#1a1a1a" letter-spacing="5">CREED</text>
    </svg>`
  ),
  new Brand(7, "Jo Malone", "🇬🇧 UK", "1983년 창립",
    "영국의 조 말론이 설립한 니치 향수 브랜드. 심플한 패키징과 레이어링 향수 문화를 대중화시킨 브랜드입니다.",
    ["Peony & Blush Suede", "Wood Sage & Sea Salt", "Lime Basil & Mandarin", "English Pear & Freesia"],
    `<svg viewBox="0 0 140 70" xmlns="http://www.w3.org/2000/svg">
      <text x="70" y="32" text-anchor="middle" font-size="20" font-family="Georgia,serif" fill="#1a1a1a" letter-spacing="4">JO MALONE</text>
      <line x1="10" y1="40" x2="130" y2="40" stroke="#1a1a1a" stroke-width="1"/>
      <text x="70" y="58" text-anchor="middle" font-size="11" font-family="Georgia,serif" fill="#888" letter-spacing="8">LONDON</text>
    </svg>`
  ),
  new Brand(8, "Maison Margiela", "🇫🇷 France", "1988년 창립",
    "레플리카(Replica) 라인으로 유명한 하우스. 특정 장소와 기억을 향으로 재현하는 독특한 컨셉으로 인기를 끌고 있습니다.",
    ["Replica Jazz Club", "Replica Beach Walk", "Replica By the Fireplace", "Replica Flower Market"],
    `<svg viewBox="0 0 100 70" xmlns="http://www.w3.org/2000/svg">
      <circle cx="22" cy="22" r="5" fill="#1a1a1a"/>
      <circle cx="40" cy="22" r="5" fill="#1a1a1a"/>
      <circle cx="58" cy="22" r="5" fill="#1a1a1a"/>
      <circle cx="76" cy="22" r="5" fill="#1a1a1a"/>
      <text x="50" y="56" text-anchor="middle" font-size="13" font-family="Georgia,serif" fill="#1a1a1a" letter-spacing="2">MARGIELA</text>
    </svg>`
  ),
  new Brand(9, "Byredo", "🇸🇪 Sweden", "2006년 창립",
    "스웨덴 출신 벤 고함이 설립한 니치 향수 브랜드. 미니멀한 디자인과 독창적인 향으로 빠르게 성장했습니다.",
    ["Gypsy Water", "Bal d'Afrique", "Mojave Ghost", "Bibliothèque"],
    `<svg viewBox="0 0 80 70" xmlns="http://www.w3.org/2000/svg">
      <text x="40" y="52" text-anchor="middle" font-size="50" font-family="Georgia,serif" fill="#1a1a1a" font-weight="300">B</text>
      <line x1="10" y1="60" x2="70" y2="60" stroke="#1a1a1a" stroke-width="1.5"/>
    </svg>`
  ),
  new Brand(10, "Diptyque", "🇫🇷 France", "1961년 창립",
    "파리 생제르맹 거리에서 시작된 향수·캔들 브랜드. 문학적이고 예술적인 향 스토리텔링으로 독보적인 팬층을 보유하고 있습니다.",
    ["Philosykos", "Eau Duelle", "Do Son", "Tam Dao"],
    `<svg viewBox="0 0 130 80" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="65" cy="40" rx="58" ry="34" stroke="#1a1a1a" stroke-width="1.5" fill="none"/>
      <text x="65" y="46" text-anchor="middle" font-size="20" font-family="Georgia,serif" fill="#1a1a1a" letter-spacing="2" font-style="italic">diptyque</text>
    </svg>`
  )
];

// 디버깅 — 콘솔에서 brands 배열 확인
console.log("브랜드 목록:", brands);
console.log("총 브랜드 수:", brands.length);

// -------------------------------------------------------
// DOM 요소 찾기 (querySelector)
// -------------------------------------------------------
const grid    = document.getElementById("grid");
const modalBg = document.getElementById("modal-bg");
const search  = document.getElementById("search");
const counter = document.getElementById("counter");

// -------------------------------------------------------
// 카운터 업데이트 함수 — textContent
// -------------------------------------------------------
const updateCounter = () => {
  const total     = brands.length;
  const favoriteCount = brands.filter(b => b.favorite).length;  // 조건문
  counter.textContent = `전체 ${total}개 · 즐겨찾기 ${favoriteCount}개`;
};

// -------------------------------------------------------
// 카드 렌더 함수 — createElement·appendChild
// -------------------------------------------------------
const render = (list) => {
  grid.innerHTML = "";  // 기존 카드 초기화

  // 조건문 — 검색 결과 없을 때
  if (list.length === 0) {
    const msg = document.createElement("p");
    msg.className = "no-result";
    msg.textContent = "검색 결과가 없습니다.";
    grid.appendChild(msg);
    return;
  }

  // forEach — 배열 순회하며 카드 생성
  list.forEach((brand) => {
    const card = document.createElement("div");
    card.className = "card";

    // 즐겨찾기 상태에 따라 클래스 추가 (조건문)
    if (brand.favorite) card.classList.add("favorited");

    card.innerHTML = `
      <button class="fav-btn" data-name="${brand.name}">
        ${brand.favorite ? "♥" : "♡"}
      </button>
      <div class="card-logo">${brand.svg}</div>
      <span class="card-rank">No.${brand.rank}</span>
      <h2 class="card-name">${brand.name}</h2>
      <p class="card-country">${brand.country} · ${brand.founded}</p>
      <p class="card-hint">클릭해서 자세히 보기 →</p>
    `;

    // 카드 클릭 → 모달
    card.addEventListener("click", () => openModal(brand));

    // 즐겨찾기 버튼 클릭 — 이벤트 버블링 막기
    card.querySelector(".fav-btn").addEventListener("click", (e) => {
      e.stopPropagation();  // 카드 클릭 이벤트 차단
      brand.toggleFavorite();
      render(getCurrentList());   // 화면 다시 그리기
      updateCounter();
    });

    grid.appendChild(card);  // appendChild
  });

  updateCounter();
};

// -------------------------------------------------------
// 검색 필터 — 현재 입력값으로 배열 필터링
// -------------------------------------------------------
const getCurrentList = () => {
  const keyword = search.value.toLowerCase();  // 변수
  // 조건문 — 빈 검색어면 전체 반환
  if (!keyword) return brands;
  return brands.filter(b => b.name.toLowerCase().includes(keyword));  // filter
};

// input 이벤트 — 실시간 검색
search.addEventListener("input", () => {
  // debugger;  // ← 이 줄 주석 해제하면 F12에서 한 줄씩 실행 가능
  const result = getCurrentList();
  console.log("검색 결과:", result.length, "개");  // console.log
  render(result);
});

// -------------------------------------------------------
// 모달 열기
// -------------------------------------------------------
const openModal = (brand) => {
  console.log("모달 열기:", brand.name, "| 대표 향수:", brand.getScentCount(), "개");

  document.getElementById("modal-logo").innerHTML    = brand.svg;
  document.getElementById("modal-country").textContent = brand.country;
  document.getElementById("modal-name").textContent  = brand.name;
  document.getElementById("modal-founded").textContent = brand.founded;
  document.getElementById("modal-desc").textContent  = brand.desc;

  const scentList = document.getElementById("modal-scents");
  scentList.innerHTML = "";
  brand.scents.forEach((scent) => {
    const li = document.createElement("li");
    li.textContent = scent;
    scentList.appendChild(li);
  });

  modalBg.classList.add("active");
};

// -------------------------------------------------------
// 모달 닫기
// -------------------------------------------------------
document.getElementById("modal-close").addEventListener("click", () => {
  modalBg.classList.remove("active");
});

modalBg.addEventListener("click", (e) => {
  if (e.target === modalBg) modalBg.classList.remove("active");
});

// -------------------------------------------------------
// 최초 렌더링
// -------------------------------------------------------
render(brands);
