names = ["뽀삐", "초코", "쿠키"]
scores = [95,88,72]

# for name, score in zip(names, scores):
    # print(f"{name}: {score}점")

pairs = list(zip(names, scores))
print(pairs)     
# [('뽀삐', 95), ('초코', 88), ('쿠키', 72)]



keys = ["이름", "나이", "직업"]
values = ["홍길동", 30, "개발자"]

person = dict(zip(keys, values))
print(person)
# {'이름': '홍길동', '나이': 30, '직업': '개발자'}

# 여러 리스트를 같은 자리끼리 묶고 싶을 땐 항상 zip(), 길이가 다르면 짧은 쪽 기준으로 끝남