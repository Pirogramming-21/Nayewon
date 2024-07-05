import random

def brGame(player):
    global num  # 전역 변수 num을 사용하기 위해 global 선언
    if player == "computer":
        count = random.randint(1, 3)
    else:
        while True:  
            try:
                count = int(input("부를 숫자의 개수를 입력하세요(1, 2, 3만 입력 가능) : "))  
                if count not in [1, 2, 3]:  
                    print("1, 2, 3 중 하나를 입력하세요")  
                else:
                    break
            except ValueError:  
                print("정수를 입력하세요")

    for i in range(1, count + 1):  
        num += 1
        print(f"{player} : {num}") 
        if num >= 31:  
            if player == "player":
                print("computer win!")
            else:
                print("player win!")
            return True
    return False

num = 0

while num < 31:
    if brGame("computer"):
        break
    if brGame("player"):
        break

# 창 바로 꺼지지 않게 코드 하나 추가했습니다. 
input("")

