# 대화 요약 — CSS 학습 & Git 명령어

---

## 1. 폴더 자동 생성 설정

### 목적
`C:\Users\Har05\Desktop\hancom\03_css` 경로에 번호만 말하면 아래 구조를 자동 생성

```
N/
├── index.html
└── styles/
    └── main.css
```

### 확정 설정
| 항목 | 설정 |
|------|------|
| 생성 방식 | 번호를 말하면 Claude Code가 직접 생성 |
| 번호 형식 | 두 자리 zero-padding (`9` → `09`, `10` → `10`) |
| 입력 방식 | 단일 번호 |
| index.html | HTML5 기본 뼈대 + main.css 연결 |
| styles/main.css | 빈 구조 + 주석 헤더 |

### 생성된 폴더 목록
`10` `11` `12` `13` `14` `15` `16` `17` `18` `19`

---

## 2. CSS 개념 정리

### CSS `var()` — 변수 사용법

```css
/* 변수 선언 */
:root {
    --main-color: red;
    --gap: 12px;
}

/* 변수 사용 */
.btn { background: var(--main-color); }

/* 기본값(fallback) */
color: var(--text-color, black);

/* 변수 중첩 */
--gap-lg: calc(var(--base) * 2);
```

- `:root`에 선언하면 문서 전체에서 사용 가능
- 한 곳만 수정하면 전체에 반영되는 것이 핵심 장점

---

### Apple.com CSS 관점 분석

애플 사이트는 레이아웃의 기반으로 **Flexbox**와 **Grid**를 사용한다. 네비게이션 바처럼 요소를 가로로 나란히 정렬할 때는 Flexbox를, 제품 카드처럼 격자 형태로 배치할 때는 Grid를 활용한다.

**타이포그래피**에서는 `SF Pro Display`라는 애플 전용 폰트를 사용하며, 제목 크기는 `clamp()`를 통해 화면 크기에 따라 자동으로 조절된다. **색상**은 CSS 변수로 관리하여 한 곳에서 전체 색상을 제어하고, `@media (prefers-color-scheme: dark)`로 다크모드를 지원한다.

**애니메이션**은 스크롤에 따라 요소가 서서히 나타나는 방식으로, `opacity`와 `transform: translateY()`를 `transition`과 함께 사용해 부드러운 등장 효과를 만든다. **이미지**는 `object-fit: contain`으로 비율을 유지하면서 영역에 맞게 채운다.

**반응형**은 `@media (max-width: 768px)` 등의 미디어 쿼리로 모바일에서 1열 레이아웃으로 전환한다. **네비게이션 바**는 `position: sticky`로 스크롤해도 상단에 고정되며, `backdrop-filter: blur()`로 배경이 유리처럼 흐려지는 반투명 효과를 준다.

> 핵심 철학: **넉넉한 여백 · 단순한 색상 · 부드러운 애니메이션(ease)**

---

## 3. Git 명령어 정리

### `git push -u origin main`

```
git push  -u        origin       main
  ①        ②          ③           ④
```

| 부분 | 의미 |
|------|------|
| `git push` | 로컬 커밋을 원격 저장소에 업로드 |
| `-u` | 로컬·원격 브랜치를 연결 (첫 push 때 한 번만 사용) |
| `origin` | GitHub 저장소 URL의 별명 |
| `main` | 업로드할 브랜치 이름 |

`-u` 로 한 번 연결하면 이후부터는 `git push` 만으로 충분하다.

---

### push 거부 오류 해결

```
! [rejected] main -> main (fetch first)
```

**원인:** GitHub(원격)에 로컬에 없는 커밋이 존재하기 때문  
**가장 흔한 원인:** 레포 생성 시 README.md 자동 생성

**해결:**
```bash
git pull origin main   # GitHub 내용 먼저 받아서 합치기
git push origin main   # 그 다음 업로드
```

---

### `git pull` 이란?

GitHub의 최신 내용을 로컬로 가져와서 합치는 명령어

```bash
git pull  =  git fetch (다운로드) + git merge (합치기)
```
