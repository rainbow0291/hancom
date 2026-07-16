name = "King"
age = 99 

# 기존 방식 (불편함)
print("저는", name, "입니다. 나이는", age, "살입니다.")

# f-string 방식 (권장)
print(f"저는 {name}입니다. 나이는 {age}살입니다.")

a = 5
b = 3
print(f"{a}+{b} = {a+b}") 
print(f"소수점 2자리: {3.14159:.2f}") # 3.14

print(f"소수점 2자리까지: {3.14159:.2f}")
print(f"소수점 3자리까지: {3.14159:.3f}") # 반올림

print("저는 {}입니다. 나이는 {}살입니다.".format(name,age)) # .format방식
