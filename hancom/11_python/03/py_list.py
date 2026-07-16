colors = ["red", "green", "blue"]
# 순서있음, 수정가능, 중복허용

# print(colors[0])   # red
# print(colors[-1])  # blue 
# print(colors[0:2])  # ['red', 'green'] 

colors[-1] = "black"
# print(colors[-1]) # black 

colors.append("pink")
#print(colors)
# ['red', 'green', 'black', 'pink'] 

colors.insert(0, "White") # index로 삽입 
#print(colors)

colors.remove("red") # 값으로 제거 
#print(colors)

numbers = [8, 5, 3, 2, 7]
numbers.sort() 
print(numbers)
# [ 2,3,5,7,8 ] # 오름차순 정렬 
numbers.sort(reverse=True)
print(numbers)  # 내림차순 정렬 

print(2 in numbers) # True
print(9 in numbers) # False 


