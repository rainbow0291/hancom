# 대화 요약 - 2026년 7월 6일

## 1. HTML 파일 배포 방법
- **GitHub Pages**, **Netlify**, **Vercel** 등 무료 정적 호스팅 소개
- 현재 프로젝트(`hancom/03_css/`)는 GitHub Pages 연동이 가장 간단

---

## 2. Netlify 사용 방법
- **방법 1**: 드래그 앤 드롭 → `app.netlify.com`에서 폴더 업로드
- **방법 2**: GitHub 연동 → push 시 자동 배포
- **방법 3**: Netlify CLI (`npx netlify-cli`)
- 도메인 변경: `Site settings → Domain management → Edit site name`

---

## 3. Netlify 도메인 변경 후 에러 원인
| 에러 | 원인 |
|------|------|
| `ERR_NAME_NOT_RESOLVED` | DNS 전파 중 or 설정 누락 |
| `NET::ERR_CERT_INVALID` | SSL 인증서 미발급 |
| `404 Not Found` | 배포 파일 경로 문제 |
| 사이트 안 뜸 | 캐시 or DNS 전파 지연 (최대 48시간) |

---

## 4. node server.js 에러
- **원인**: `hancom/03_css/03/` 폴더에 `server.js` 파일이 없음
- **해결**:
  - HTML만 열 경우 → `index.html` 더블클릭 or VS Code Live Server
  - 로컬 서버 실행 → `npx serve .`
  - 직접 만들 경우 → `http` 모듈로 `server.js` 작성 후 `node server.js`

---

## 5. 프론트엔드 유용한 사이트
### 공식 문서
- MDN Web Docs, Can I Use, DevDocs

### CSS
- CSS Tricks, Flexbox Froggy, Grid Garden, Coolors, Google Fonts

### 디자인/UI
- Figma, Dribbble, Unsplash, Font Awesome, Heroicons

### JS/학습
- JavaScript.info, The Odin Project, Frontend Mentor, CodePen

### 도구
- Squoosh, Regex101, CSS Gradient, Animista

---

## 6. 프론트엔드 디자인 특화 사이트
- **영감**: Awwwards, Dribbble, Behance, Land-book, Screenlane
- **색상**: Coolors, Adobe Color, Realtime Colors, ColorHunt
- **타이포**: Google Fonts, Fontpair, Type Scale
- **CSS 생성기**: Animista, CSS Gradient, Neumorphism, Glassmorphism, Haikei
- **아이콘/이미지**: Heroicons, Lucide, Unsplash, Storyset, unDraw
- **UI 컴포넌트**: Tailwind UI, shadcn/ui, Uiverse

---

## 7. Pinterest 같은 영감 사이트
| 사이트 | 특징 |
|--------|------|
| Dribbble | UI/UX 작업물, Pinterest와 가장 유사 |
| Behance | Adobe 운영, 프로젝트 단위 공유 |
| Awwwards | 수상작 위주 최고 수준 웹 디자인 |
| Mobbin | 실제 앱/웹 UI 스크린샷 모음 |
| Are.na | 크리에이터 큐레이션 영감 보드 |
| Savee | 디자이너 전용 Pinterest, 광고 없음 |
| Godly | 인터랙티브/실험적 웹사이트 모음 |

---

## 8. JavaScript 오류 수정
### 문제
```js
const multiply = ...  // 중복 선언
const multiply = ...  // SyntaxError

const out = ...  // 중복 선언
const out = ...  // SyntaxError
```

### 해결
- `multiply` → `multiply`, `multiply2` 로 이름 분리
- `out` → `out1`, `out2` 로 이름 분리
- **규칙**: `const`/`let`은 같은 스코프 내 동일 이름 재선언 불가

---

## 9. 터미널 명령어
- `cd ../` : 상위 폴더로 이동
