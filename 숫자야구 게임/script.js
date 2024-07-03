document.addEventListener("DOMContentLoaded", function() {
    let attempts = 9;
    let answer = generateRandomNumbers();
    const inputFields = document.querySelectorAll(".input-field");
    const submitButton = document.querySelector(".submit-button");
    const resultContainer = document.querySelector(".result-display");
    const resultImage = document.getElementById("game-result-img");
    

    // 게임 초기화 함수
    function initGame() {
        attempts = 9;
        answer = generateRandomNumbers();
        inputFields.forEach(input => input.value = "");
        submitButton.disabled = false;
        resultContainer.innerHTML = "";
        resultImage.src = "";
    }        
        

    // 랜덤 숫자 3개 설정
    function generateRandomNumbers() {
        const numbers = [];
        while (numbers.length < 3) {
            const randomNumber = Math.floor(Math.random() * 9 + 1);
            // floor를 통해 내림해줌
            if (!numbers.includes(randomNumber)) {
                numbers.push(randomNumber);
            }
        }
        return numbers;
    }

    // 숫자 확인 - input 3개 미만 입력 시 input 초기화
    window.check_numbers = function() {
        const inputNumbers = Array.from(inputFields).map(input => input.value);
        if (inputNumbers.includes("")) {
            alert("모든 칸에 숫자를 입력해주세요.");
            inputFields.forEach(input => input.value = "");
            return;
        }
        const userNumbers = inputNumbers.map(num => parseInt(num));

        // 결과 확인
        let strikes = 0;
        let balls = 0;

        userNumbers.forEach((num, index) => {
            if (num === answer[index]) {
                strikes++;
            } else if (answer.includes(num)) {
                balls++;
            }
        });

        const resultDiv = document.createElement("div");
        resultDiv.classList.add("check-result");

        const leftDiv = document.createElement("div");
        leftDiv.classList.add("left");
        leftDiv.innerText = userNumbers.join(" ");
        resultDiv.appendChild(leftDiv);

        const rightDiv = document.createElement("div");
        rightDiv.classList.add("right");

        if (strikes === 0 && balls === 0) {
            const outDiv = document.createElement("div");
            outDiv.classList.add("out", "num-result");
            outDiv.innerText = "O";
            rightDiv.appendChild(outDiv);
        } else {
            if (strikes > 0) {
                const strikeDiv = document.createElement("div");
                strikeDiv.classList.add("strike", "num-result");
                strikeDiv.innerText = `${strikes} S`;
                rightDiv.appendChild(strikeDiv);
            }
            if (balls > 0) {
                const ballDiv = document.createElement("div");
                ballDiv.classList.add("ball", "num-result");
                ballDiv.innerText = `${balls} B`;
                rightDiv.appendChild(ballDiv);
            }
        }

        resultDiv.appendChild(rightDiv);
        resultContainer.appendChild(resultDiv);

        // 게임 종료 시 이미지 출력
        if (strikes === 3) {
            resultImage.src = "success.png";
            submitButton.disabled = true;
        } else {
            attempts--;
            if (attempts === 0) {
                resultImage.src = "fail.png";
                submitButton.disabled = true;
            }
        }

        inputFields.forEach(input => input.value = "");
    };

    // 게임 초기화
    initGame();
});
