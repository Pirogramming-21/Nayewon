let timer;
let milliseconds = 0;
let isRunning = false;
let isCountdown = false;

const display = document.querySelector('.display-number');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const lapsContainer = document.querySelector('.lap-lists ul');
const clearLapsButton = document.getElementById('clear-laps-button');
const topRecordButton = document.getElementById('record-button');
const topCheckIcon = topRecordButton.querySelector('.ri-check-line');

function updateDisplay() {
    let secs = Math.floor(milliseconds / 1000);
    let ms = Math.floor((milliseconds % 1000) / 10); // 2자리 밀리초
    display.textContent = `${secs.toString().padStart(2, '0')}:${ms.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        if (isCountdown) {
            timer = setInterval(() => {
                if (milliseconds <= 0) {
                    clearInterval(timer);
                    isRunning = false;
                    alert('Time is up!');
                } else {
                    milliseconds -= 10;
                    updateDisplay();
                }
            }, 10);
        } else {
            timer = setInterval(() => {
                milliseconds += 10;
                updateDisplay();
            }, 10);
        }
    }
}

function stopTimer() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timer);
        if (!isCountdown) {
            recordLap();
        }
    }
}

function resetTimer() {
    isRunning = false;
    clearInterval(timer);
    milliseconds = 0;
    updateDisplay();
    // reset 버튼 눌렀을 때 lap-lists는 변함 없음
}

function recordLap() {
    const lapItem = document.createElement('li');
    lapItem.className = 'lap-list';
    lapItem.innerHTML = `
        <button class="record-button">
            <i class="ri-check-line"></i> <!-- 체크 버튼이 보이도록 변경 -->
            <div class="record-button-inner"></div>
        </button>
        <h2>${display.textContent}</h2>
    `;
    lapsContainer.appendChild(lapItem);

    // Add event listener for the record button
    const recordButton = lapItem.querySelector('.record-button');
    recordButton.addEventListener('click', handleRecordButtonClick);

    // Record 버튼 전체 클릭 상태 업데이트
    updateTopRecordButtonState();
}

function handleRecordButtonClick(e) {
    const recordButtonInner = e.target.closest('.record-button').querySelector('.record-button-inner');
    recordButtonInner.classList.toggle('recorded');
    const checkIcon = e.target.closest('.record-button').querySelector('.ri-check-line');
    if (recordButtonInner.classList.contains('recorded')) {
        checkIcon.style.display = 'inline';
    } else {
        checkIcon.style.display = 'none';
    }

    // Record 버튼 전체 클릭 상태 업데이트
    updateTopRecordButtonState();
}

function updateTopRecordButtonState() {
    const allButtons = lapsContainer.querySelectorAll('.record-button-inner');
    const allRecorded = Array.from(allButtons).every(button => button.classList.contains('recorded'));

    if (allRecorded) {
        topCheckIcon.style.display = 'inline';
    } else {
        topCheckIcon.style.display = 'none';
    }
}

function clearLaps() {
    const recordedItems = lapsContainer.querySelectorAll('.record-button-inner.recorded');
    recordedItems.forEach(item => {
        item.closest('.lap-list').remove();
    });

    // Record 버튼의 체크 상태를 초기화
    topCheckIcon.style.display = 'none';
}

topRecordButton.addEventListener('click', () => {
    const allButtons = lapsContainer.querySelectorAll('.record-button');
    allButtons.forEach(button => {
        const recordButtonInner = button.querySelector('.record-button-inner');
        const checkIcon = button.querySelector('.ri-check-line');

        if (topCheckIcon.style.display === 'none') {
            recordButtonInner.classList.add('recorded');
            checkIcon.style.display = 'inline';
        } else {
            recordButtonInner.classList.remove('recorded');
            checkIcon.style.display = 'none';
        }
    });

    // 전체 버튼의 상태가 변경되었으므로 topRecordButton의 상태를 업데이트
    if (topCheckIcon.style.display === 'none') {
        topCheckIcon.style.display = 'inline';
    } else {
        topCheckIcon.style.display = 'none';
    }
});

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
clearLapsButton.addEventListener('click', clearLaps);

display.addEventListener('click', () => {
    const inputTime = prompt("타이머 시간을 입력하세요 (초:밀리초 형식, 예: 01:00)");
    if (inputTime) {
        const [inputSecs, inputMs] = inputTime.split(':').map(Number);
        milliseconds = (inputSecs * 1000) + (inputMs * 10);
        isCountdown = true;
        updateDisplay();
    }
});

