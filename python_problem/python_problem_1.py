num = 0

while num < 31:
    while True:  
        try:
            count = int(input("부를 숫자의 개수를 입력하세요(1, 2, 3만 입력 가능) : "))  
            if count not in [1, 2, 3]:  
                print("1, 2, 3 중 하나를 입력하세요")  
            else:
                for i in range(1, count + 1):  
                    num += 1
                    print(f"playerA : {num}")  
                break
        except ValueError:  
            print("정수를 입력하세요")

    while True:  
        try:
            count = int(input("부를 숫자의 개수를 입력하세요(1, 2, 3만 입력 가능) : "))  
            if count not in [1, 2, 3]:  
                print("1, 2, 3 중 하나를 입력하세요")  
            else:
                for i in range(1, count + 1):  
                    num += 1
                    print(f"playerB : {num}") 
                break
        except ValueError:  
            print("정수를 입력하세요")
    if num >= 31:  
            break  
    


