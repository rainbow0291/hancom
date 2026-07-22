from transformers import pipeline
from deep_translator import GoogleTranslator

# 1. 요약 파이프라인 생성
# (왜) T5는 "task prefix + 입력 → 출력" 형태로 학습된 다목적 모델 → pipeline이 "summarize: " 접두사 자동 부착
summarizer = pipeline(
    "summarization",
    model="t5-small")  # 약 240MB 경량 버전

# 2. 요약할 원문 (영어 단락)
text = """
My Heart Is Afraid that it will have to suffer," the boy told the alchemist one night as they looked up at the moonless sky."Tell your heart that the fear of suffering is worse than the suffering itself. And that no heart has ever suffered when it goes in search of its dreams."
Every few decades a book is published that changes the lives of its readers forever. The Alchemist is such a book. With over a million and a half copies sold around the world, The Alchemist has already established itself as a modern classic, universally admired. Paulo Coelho's charming fable, now available in English for the first time, will enchant and inspire an even wider audience of readers for generations to come.

The Alchemist is the magical story of Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure as extravagant as any ever found. From his home in Spain he journeys to the markets of Tangiers and across the Egyptian desert to a fateful encounter with the alchemist.

The story of the treasures Santiago finds along the way teaches us, as only a few stories have done, about the essential wisdom of listening to our hearts, learning to read the omens strewn along life's path, and, above all, following our dreams.
"""

# 3. 요약 실행 (길이 옵션 지정)
# (왜) 기본값은 모델마다 다름 → 명시 지정해야 결과 길이 예측 가능
summary = summarizer(
    text,
    min_length=20,   # 최소 토큰 수 → 너무 짧은 요약 방지
    max_length=60,   # 최대 토큰 수 → 길이 폭주 방지
    do_sample=False  # 결정적(greedy) 생성 → 매번 동일 결과
)  # 반환: [{'summary_text': str}] 리스트

# 4. 결과 텍스트 추출 → 출력
sum_text = summary[0]['summary_text']  # 첫 결과의 'summary_text' 키 → 요약 문자열
print(f"요약된 문장 : {sum_text}")

"""
요약된 문장 : every few decades a book is published that changes the lives of its readers forever . 
Paulo Coelho's charming fable, now available in English for the first time, 
will enchant and inspire an even wider audience of readers for generations to come .
"""

# 5. 요약된 문장을 한국어로 번역하여 출력 
# 번역 함수 만들어 주세요.

def translate(sum_text):
    """
    주어진 영어 문장을 한국어로 번역하는 함수 
    """
    translated_sen = GoogleTranslator(source='en', target='ko').translate(sum_text)
    return translated_sen

kr_sum_text = translate(sum_text)
print(kr_sum_text)

"""
수십 년에 한 번씩 독자의 삶을 영원히 바꾸는 책이 출판됩니다. 
파울로 코엘료의 매력적인 우화는 이제 처음으로 영어로 출간되어 다음 세대를 거쳐
훨씬 더 많은 독자들에게 매혹과 영감을 줄 것입니다.
"""