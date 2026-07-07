// -------------------------------------------------------
// 클래스 (Class) — 브랜드 객체를 찍어내는 틀
// -------------------------------------------------------
class Brand {
  constructor(rank, name, country, founded, desc, scents, img,
              tags, volume, concentration, notes) {
    this.rank          = rank;
    this.name          = name;
    this.country       = country;
    this.founded       = founded;
    this.desc          = desc;
    this.scents        = scents;
    this.img           = img;          // 향수 이미지 경로
    this.tags          = tags;          // 메인 향 특성 태그
    this.volume        = volume;        // 용량 (예: "50, 100ml")
    this.concentration = concentration; // 농도 (예: "오드 파퓸")
    this.notes         = notes;         // { mainChords, top, middle, base }
    this.favorite      = false;
  }

  // 메서드 — 즐겨찾기 토글
  toggleFavorite() {
    this.favorite = !this.favorite;
    console.log(`${this.name} 즐겨찾기: ${this.favorite}`);
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
    "images/1.chanel.png",
    ["플로럴", "파우더리", "알데하이드"],
    "30, 50, 100ml",
    "오드 파퓸",
    {
      mainChords: ["플로럴", "파우더리", "알데하이드"],
      top:    [{ name: "알데하이드", icon: "✨" }, { name: "네롤리", icon: "🌸" }, { name: "레몬", icon: "🍋" }],
      middle: [{ name: "로즈", icon: "🌹" }, { name: "자스민", icon: "🌼" }, { name: "아이리스", icon: "💜" }],
      base:   [{ name: "샌달우드", icon: "🪵" }, { name: "무스크", icon: "💫" }, { name: "시벳", icon: "🐾" }]
    }
  ),

  new Brand(2, "Dior", "🇫🇷 France", "1946년 창립",
    "크리스티앙 디올이 설립한 하우스. 우아함과 현대적 감성을 모두 갖춘 향수 라인으로 전 세계적 인기를 자랑합니다.",
    ["J'adore", "Miss Dior", "Sauvage", "Poison"],
    "images/2.dior.png",
    ["플로럴", "프레시", "우디"],
    "30, 50, 100ml",
    "오드 파퓸",
    {
      mainChords: ["플로럴", "프레시", "우디"],
      top:    [{ name: "만다린", icon: "🍊" }, { name: "피치", icon: "🍑" }, { name: "메론", icon: "🍈" }],
      middle: [{ name: "로즈", icon: "🌹" }, { name: "자스민", icon: "🌼" }, { name: "바이올렛", icon: "💜" }],
      base:   [{ name: "샌달우드", icon: "🪵" }, { name: "머스크", icon: "💫" }, { name: "블랙베리", icon: "🫐" }]
    }
  ),

  new Brand(3, "Guerlain", "🇫🇷 France", "1828년 창립",
    "프랑스에서 가장 오래된 향수 하우스 중 하나. 샬리마르를 비롯한 클래식 향수들로 향수 역사를 써 내려왔습니다.",
    ["Shalimar", "Mon Guerlain", "La Petite Robe Noire", "Mitsouko"],
    "images/3.guerlain.png",
    ["오리엔탈", "우디", "파우더리"],
    "50, 90ml",
    "오드 뚜왈렛",
    {
      mainChords: ["오리엔탈", "우디", "파우더리"],
      top:    [{ name: "베르가못", icon: "🍋" }, { name: "레몬", icon: "🍋" }, { name: "만다린", icon: "🍊" }],
      middle: [{ name: "아이리스", icon: "💜" }, { name: "자스민", icon: "🌼" }, { name: "로즈", icon: "🌹" }],
      base:   [{ name: "바닐라", icon: "🍦" }, { name: "통카빈", icon: "🌾" }, { name: "레더", icon: "🤎" }]
    }
  ),

  new Brand(4, "Hermès", "🇫🇷 France", "1837년 창립",
    "마구용품으로 시작한 명품 하우스. 절제된 우아함과 자연에서 영감받은 향수로 독보적인 위치를 차지하고 있습니다.",
    ["Twilly d'Hermès", "Terre d'Hermès", "Un Jardin sur le Nil", "Galop d'Hermès"],
    "images/4.hermes.png",
    ["우디", "시트러스", "얼씨"],
    "75, 150ml",
    "오드 뚜왈렛",
    {
      mainChords: ["우디", "시트러스", "얼씨"],
      top:    [{ name: "오렌지", icon: "🍊" }, { name: "그레이프프루트", icon: "🍊" }, { name: "페퍼", icon: "🌶️" }],
      middle: [{ name: "플린트", icon: "💎" }, { name: "제라늄", icon: "🌺" }, { name: "핑크 페퍼", icon: "🌸" }],
      base:   [{ name: "베티버", icon: "🌾" }, { name: "시더", icon: "🌲" }, { name: "벤조인", icon: "🟤" }]
    }
  ),

  new Brand(5, "Tom Ford", "🇺🇸 USA", "2005년 창립",
    "미국 출신 디자이너 톰 포드가 론칭한 럭셔리 브랜드. 관능적이고 대담한 향수 라인으로 현대 향수 시장을 이끌고 있습니다.",
    ["Black Orchid", "Lost Cherry", "Tobacco Vanille", "Oud Wood"],
    "images/5.tomford.png",
    ["플로럴", "우디", "다크"],
    "50, 100ml",
    "오드 파퓸",
    {
      mainChords: ["플로럴", "우디", "다크"],
      top:    [{ name: "블랙 트러플", icon: "🍄" }, { name: "일랑일랑", icon: "🌸" }, { name: "블랙커런트", icon: "🫐" }],
      middle: [{ name: "블랙 오키드", icon: "🖤" }, { name: "스파이스", icon: "🌶️" }, { name: "프루티", icon: "🍒" }],
      base:   [{ name: "패출리", icon: "🌿" }, { name: "베티버", icon: "🌾" }, { name: "샌달우드", icon: "🪵" }]
    }
  ),

  new Brand(6, "Creed", "🇬🇧 UK", "1760년 창립",
    "260년 역사를 자랑하는 영국 왕실 향수 하우스. 아방투스는 성공한 남성의 향으로 알려져 있습니다.",
    ["Aventus", "Green Irish Tweed", "Silver Mountain Water", "Love in White"],
    "images/6.creed.png",
    ["우디", "시프레", "프루티"],
    "50, 100, 250ml",
    "오드 파퓸",
    {
      mainChords: ["우디", "시프레", "프루티"],
      top:    [{ name: "파인애플", icon: "🍍" }, { name: "블랙커런트", icon: "🫐" }, { name: "사과", icon: "🍎" }],
      middle: [{ name: "로즈", icon: "🌹" }, { name: "자스민", icon: "🌼" }, { name: "버치", icon: "🌳" }],
      base:   [{ name: "무스크", icon: "💫" }, { name: "오크모스", icon: "🌿" }, { name: "암버", icon: "🟡" }]
    }
  ),

  new Brand(7, "Jo Malone", "🇬🇧 UK", "1983년 창립",
    "영국의 조 말론이 설립한 니치 향수 브랜드. 심플한 패키징과 레이어링 향수 문화를 대중화시킨 브랜드입니다.",
    ["Peony & Blush Suede", "Wood Sage & Sea Salt", "Lime Basil & Mandarin", "English Pear & Freesia"],
    "images/7.jo_malone.png",
    ["플로럴", "파우더리", "프루티"],
    "30, 100ml",
    "코롱",
    {
      mainChords: ["플로럴", "파우더리", "프루티"],
      top:    [{ name: "레드 애플", icon: "🍎" }, { name: "스파이스", icon: "🌶️" }],
      middle: [{ name: "피오니", icon: "🌸" }, { name: "로즈", icon: "🌹" }, { name: "자스민", icon: "🌼" }],
      base:   [{ name: "스웨이드", icon: "🤎" }, { name: "우드", icon: "🪵" }, { name: "머스크", icon: "💫" }]
    }
  ),

  new Brand(8, "Maison Margiela", "🇫🇷 France", "1988년 창립",
    "레플리카(Replica) 라인으로 유명한 하우스. 특정 장소와 기억을 향으로 재현하는 독특한 컨셉으로 인기를 끌고 있습니다.",
    ["Replica Jazz Club", "Replica Beach Walk", "Replica By the Fireplace", "Replica Flower Market"],
    "images/8.maison_margiela.png",
    ["우디", "머스크", "스파이시"],
    "30, 100ml",
    "오드 뚜왈렛",
    {
      mainChords: ["우디", "머스크", "스파이시"],
      top:    [{ name: "클레멘타인", icon: "🍊" }, { name: "핑크 페퍼", icon: "🌸" }, { name: "럼", icon: "🥃" }],
      middle: [{ name: "클라리 세이지", icon: "🌿" }, { name: "베티버", icon: "🌾" }, { name: "아이리스", icon: "💜" }],
      base:   [{ name: "바닐라", icon: "🍦" }, { name: "화이트 머스크", icon: "💫" }, { name: "체다우드", icon: "🪵" }]
    }
  ),

  new Brand(9, "Byredo", "🇸🇪 Sweden", "2006년 창립",
    "스웨덴 출신 벤 고함이 설립한 니치 향수 브랜드. 미니멀한 디자인과 독창적인 향으로 빠르게 성장했습니다.",
    ["Gypsy Water", "Bal d'Afrique", "Mojave Ghost", "Bibliothèque"],
    "images/9.byredo.png",
    ["우디", "프레시", "머스크"],
    "50, 100ml",
    "오드 파퓸",
    {
      mainChords: ["우디", "프레시", "머스크"],
      top:    [{ name: "베르가못", icon: "🍋" }, { name: "레몬", icon: "🍋" }, { name: "페퍼", icon: "🌶️" }],
      middle: [{ name: "쥬니퍼 베리", icon: "🫐" }, { name: "인센스", icon: "💨" }, { name: "파인", icon: "🌲" }],
      base:   [{ name: "바닐라", icon: "🍦" }, { name: "샌달우드", icon: "🪵" }, { name: "암버그리스", icon: "🟡" }]
    }
  ),

  new Brand(10, "Diptyque", "🇫🇷 France", "1961년 창립",
    "파리 생제르맹 거리에서 시작된 향수·캔들 브랜드. 문학적이고 예술적인 향 스토리텔링으로 독보적인 팬층을 보유하고 있습니다.",
    ["Philosykos", "Eau Duelle", "Do Son", "Tam Dao"],
    "images/10.diptyque.png",
    ["그린", "우디", "프레시"],
    "75, 200ml",
    "오드 뚜왈렛",
    {
      mainChords: ["그린", "우디", "프레시"],
      top:    [{ name: "피그 리프", icon: "🍃" }, { name: "피그", icon: "🍈" }, { name: "씨더우드", icon: "🌲" }],
      middle: [{ name: "피그 밀크", icon: "🥛" }, { name: "화이트 씨더", icon: "🌲" }],
      base:   [{ name: "피그 우드", icon: "🪵" }, { name: "우드", icon: "🪵" }, { name: "머스크", icon: "💫" }]
    }
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
  const total         = brands.length;
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
      <div class="card-img-wrap">
        <img src="${brand.img}" alt="${brand.name}" class="card-img">
      </div>
      <div class="card-body">
        <span class="card-rank">No.${brand.rank}</span>
        <h2 class="card-name">${brand.name}</h2>
        <p class="card-brand">${brand.scents[0]}</p>
        <div class="card-tags">
          ${brand.tags.map(t => `<span class="tag">${t}</span>`).join("")}
        </div>
        <p class="card-volume">${brand.concentration} · ${brand.volume}</p>
      </div>
    `;

    // 카드 클릭 → 모달
    card.addEventListener("click", () => openModal(brand));

    // 즐겨찾기 버튼 클릭 — 이벤트 버블링 막기
    card.querySelector(".fav-btn").addEventListener("click", (e) => {
      e.stopPropagation();  // 카드 클릭 이벤트 차단
      brand.toggleFavorite();
      render(getCurrentList());
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
  console.log("검색 결과:", result.length, "개");
  render(result);
});

// -------------------------------------------------------
// 모달 열기
// -------------------------------------------------------
const openModal = (brand) => {
  console.log("모달 열기:", brand.name, "| 대표 향수:", brand.getScentCount(), "개");

  // 이미지 · 브랜드 · 이름 · 설명
  document.getElementById("modal-logo").innerHTML    = `<img src="${brand.img}" alt="${brand.name}" class="modal-img">`;
  document.getElementById("modal-country").textContent = `${brand.country} · ${brand.founded}`;
  document.getElementById("modal-name").textContent  = brand.name;
  document.getElementById("modal-desc").textContent  = brand.desc;

  // 태그 (농도 + 용량 + 향 특성)
  const tagsEl  = document.getElementById("modal-tags");
  const allTags = [brand.concentration, brand.volume, ...brand.tags];
  tagsEl.innerHTML = allTags.map(t => `<span class="tag">${t}</span>`).join("");

  // 메인 어코드
  const chordsEl = document.getElementById("modal-chords");
  chordsEl.innerHTML = brand.notes.mainChords
    .map(c => `<span class="chord-tag">${c}</span>`).join("");

  // 노트 렌더 헬퍼 함수
  const renderNotes = (elId, notes) => {
    document.getElementById(elId).innerHTML = notes
      .map(n => `
        <div class="note-item">
          <div class="note-icon">${n.icon}</div>
          <p class="note-name">${n.name}</p>
        </div>
      `).join("");
  };

  renderNotes("modal-top-notes",    brand.notes.top);
  renderNotes("modal-middle-notes", brand.notes.middle);
  renderNotes("modal-base-notes",   brand.notes.base);

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
