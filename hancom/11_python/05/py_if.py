#is_raining = True 
is_raining = False 

if is_raining:
    print("우산을 챙겨요!")  # True이므로 이 줄 실행
else:
    print("우산 없어도 돼요") # False 일 때 이 줄 실행 


temperature = 28  # 오늘 기온 (°C)

if temperature >= 30:
    print("덥다! 반팔 입기")
elif temperature >= 20:
    print("딱 좋아! 가볍게 입기")  # 이 줄 출력 (28 >= 20)
elif temperature >= 10:
    print("쌀쌀해, 겉옷 챙기기")
else:
    print("추워! 두꺼운 코트 입기")