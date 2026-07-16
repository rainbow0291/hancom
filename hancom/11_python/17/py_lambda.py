# 람다 공식 
# 함수명 = lambda 매개변수(파라미터) : 반환값 

def add(a,b):
    return a+b 
print(add(7,3))

add = lambda a, b : a + b 
print(add(7,3))

# 글자를 넣으면 큰 그림 글씨로 출력(pyfiglet)해주는 lambda 함수 


import pyfiglet  # 가상환경 안에 라이브러리 pyfiglet 설치 되어 있음

#text = "Hello"
#def decorate_text(text):
#    return pyfiglet.figlet_format(text)    ---> 일반 함수 

# 람다 함수 
decorate_text = lambda text: pyfiglet.figlet_format(text) # ---> 한줄OK
py_text = decorate_text("Lambda")
print(py_text)