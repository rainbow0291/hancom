import pytesseract    # 이미지에서 문자 인식
from PIL import Image # 이미지 처리
import os     

# 1. Tesseract 실행 파일 경로 지정
pytesseract.pytesseract.tesseract_cmd = "C:/Program Files/Tesseract-OCR/tesseract.exe"

# 2. 이미지 불러오기
image = Image.open("menu.jpg")

# <이미지에서 한글 추출>

# 영어 + 한국어 동시 인식
results = pytesseract.image_to_string(
    image,
    lang='eng+kor'
)

print(results)

"""
BABPLUg«

7 월 14 일 (월)

미 나 리 버 섯 매 콤 불고기
와 사 비 마 요 생 선 까스
한 식 두 부 조림
양 상 주 그 린 샐러드
고 구 마 줄 기 볶음
호 박 고 추 장 찌개
포 기 김치
잡곡밥
"""