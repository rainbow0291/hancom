// 두 그림 주소 (실제 프로젝트에선 "images/cat.png" 같은 파일 주소를 씀)
// 여기선 picsum.photos 더미 이미지 서비스를 사용 — 인터넷 연결 필요
// (?random= 뒤 번호만 다르게 주면 서로 다른 사진을 받아옴)
const IMG_A = "https://picsum.photos/96?random=1";
const IMG_B = "https://picsum.photos/96?random=2";
const IMG_C = "https://picsum.photos/96?random=3";
const IMG_D = "https://picsum.photos/96?random=4";

// 1. 페이지의 그림(id="pic")을 찾아 myImage 상자에 담기
const myImage = document.querySelector("#pic");
// 2. 처음 보여 줄 그림을 IMG_A로 정하기
myImage.setAttribute("src", IMG_A);

// 3. 그림을 클릭할 때마다 실행 (onclick 속성에 화살표 함수 연결)
myImage.onclick = () => {
  // 지금 걸려 있는 그림 주소를 읽어오기 (getAttribute)
  const mySrc = myImage.getAttribute("src");
  if (mySrc === IMG_A) {
    myImage.setAttribute("src", IMG_B);   // A였으면 → B로 바꾸기
  } 
  
  else if (mySrc === IMG_B) {
    myImage.setAttribute("src", IMG_C);  // B라면 C로 바꾸기
  } 

  else if (mySrc === IMG_C) {
    myImage.setAttribute("src", IMG_D);  // C라면 D로 바꾸기
  } 
  
  else {
    myImage.setAttribute("src", IMG_A);   // 아니면 → A로 되돌리기
  }
};


/* JavaScript 퀴즈 (이미지 전환 코드)

---
Q1. 다음 중 JavaScript에서 올바른 조건문 문법은?

- A) elif (조건) { }
- B) else if (조건) { }
- C) elseif (조건) { }
- D) elsif (조건) { }

---
Q2. document.querySelector("#pic")에서 #pic은 무엇을 의미하는가?

- A) class="pic" 인 요소
- B) name="pic" 인 요소
- C) id="pic" 인 요소
- D) <> 태그 요소

---
Q3. myImage.setAttribute("src", IMG_B)가 하는 일은?

- A) src 속성의 현재 값을 읽어온다
- B) src 속성을 IMG_B 값으로 설정한다
- C) IMG_B 변수를 삭제한다
- D) 이미지를 화면에서 숨긴다

---
Q4. 이 코드에서 이미지를 클릭하면 어떤 순서로 바뀌는가?

- A) A → B → A → B …
- B) A → B → C → D → A → B → C → D …
- C) C → B → A → C …
- D) A → C → B → A …

---
Q5. myImage.getAttribute("src")의 역할은?

- A) src 속성을 새로 만든다
- B) src 속성을 삭제한다
- C) src 속성의 현재 값을 반환한다
- D) 이미지 크기를 반환한다


정답 및 해설

---
Q1. 정답: B) else if (조건) { }

▎ JavaScript(및 C, Java 등 대부분의 언어)에서는 else if를 사용합니다. elif는 Python 전용 문법입니다.

---
Q2. 정답: C) id="pic" 인 요소

▎ querySelector에서 #은 id 선택자입니다. 클래스는 .pic, 태그는 pic으로 씁니다.

---
Q3. 정답: B) src 속성을 IMG_B 값으로 설정한다

▎ setAttribute(속성명, 값) — 속성을 설정합니다.
▎ 반대로 읽을 때는 getAttribute(속성명)을 사용합니다.

---
Q4. 정답: B) A → B → C → D → A → B → C → D …

▎ 클릭할 때마다 A이면 B로, B이면 C로, C이면 D로, 그 외(D)이면 A로 순환합니다.

---
Q5. 정답: C) src 속성의 현재 값을 반환한다

▎ getAttribute("src")는 현재 이미지 주소를 읽어와서 if문으로 어떤 이미지인지 비교하는 데 사용됩니다. */