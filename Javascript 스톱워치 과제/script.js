let timer;
let milliseconds = 0;
let isRunning = false;

const display = document.querySelector('.display-number');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const lapsContainer = document.querySelector('.lap-lists ul');
const clearLapsButton = document.getElementById('clear-laps-button');

function updateDisplay() {
    let secs = Math.floor(milliseconds / 1000);
    let ms = Math.floor((milliseconds % 1000) / 10); // 2자리 밀리초로 변경
    display.textContent = `${secs.toString().padStart(2, '0')}:${ms.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            milliseconds += 10;
            updateDisplay();
        }, 10);
    }
}

function stopTimer() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timer);
        recordLap();
    }
}

function resetTimer() {
    isRunning = false;
    clearInterval(timer);
    milliseconds = 0;
    updateDisplay();
    // lap-lists는 초기화하지 않음
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
    lapItem.querySelector('.record-button').addEventListener('click', (e) => {
        const recordButtonInner = e.target.closest('.record-button').querySelector('.record-button-inner');
        recordButtonInner.classList.toggle('recorded');
        const checkIcon = e.target.closest('.record-button').querySelector('.ri-check-line');
        if (recordButtonInner.classList.contains('recorded')) {
            checkIcon.style.display = 'inline';
        } else {
            checkIcon.style.display = 'none';
        }
    });
}

function clearLaps() {
    const recordedItems = lapsContainer.querySelectorAll('.record-button-inner.recorded');
    recordedItems.forEach(item => {
        item.closest('.lap-list').remove();
    });
}

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
clearLapsButton.addEventListener('click', clearLaps);
