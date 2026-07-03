개발환경 ① 작업 폴더 만들기

코드는 VSCode 에서 작성 — 메모장의 똑똑한 버전, 글자에 색이 입혀져 코드가 잘 보임

내 작업 폴더 열기

① 바탕화면에 새 폴더 → 이름 01_HTML
② VSCode 메뉴 File → Open Folder → 01_HTML 선택
③ 안내 창 뜨면 "Yes, I trust the authors" 클릭 


# 웹개발 시작하기

## Live Server 설치 (1회만)
1. VS Code 확장 프로그램 아이콘 클릭
2. `Live Server` 검색 후 Install

## 첫 페이지 만들기
1. `index.html` 파일 생성
2. 아래 코드 붙여넣기
3. `Ctrl+S` 저장
4. `Go Live` 클릭

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8">
    <title>나의 첫 페이지</title>
  </head>
  <body>
    <h1>안녕하세요! 제 첫 웹페이지입니다.</h1>
  </body>
</html>
```

## 문제 해결
- **Go Live 안 보임** → Live Server 설치 확인
- **한글 깨짐** → `<meta charset="UTF-8">` 확인