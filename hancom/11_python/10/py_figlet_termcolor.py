# 1. pyfiglet, termcolor 불러오기
# 2. pyfiglet 적용 
# 3. termcolor 적용
# 4. pyfiglet + termcolor 적용된 텍스트 출력 

import pyfiglet  
from termcolor import colored 

sentence = "Welcome"

py_sentence = pyfiglet.figlet_format(sentence)

# colored(출력할 문자열, 글자색, 배경색)

color_sentence = colored(
    py_sentence, 
    "red"
    #"on_green"
)

print(color_sentence)
