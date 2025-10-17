let sessionLength = 25;
let breakLength = 5;
let timeRemaining = sessionLength * 60;
let isRunning = false;
let isSession = true;
let timerInterval;

const sessionDisplay = document.getElementById("session-length");
const breakDisplay = document.getElementById("break-length");
const timerLabel = document.getElementById("timer-label");
const timeLeft = document.getElementById("time-left");
const startStopBtn = document.getElementById("start-stop");
const resetBtn = document.getElementById("reset");


function updateDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timeLeft.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}


document.getElementById("session-increment").onclick = () => {
    if (!isRunning && sessionLength < 60) {
        sessionLength++;
        sessionDisplay.textContent = sessionLength;
    if (isSession) {
        timeRemaining = sessionLength * 60;
    updateDisplay();
    }
    }
};

document.getElementById("session-decrement").onclick = () => {
    if (!isRunning && sessionLength > 1) {
        sessionLength--;
        sessionDisplay.textContent = sessionLength;
    if (isSession) {
        timeRemaining = sessionLength * 60;
    updateDisplay();
    }
    }
};

document.getElementById("break-increment").onclick = () => {
    if (!isRunning && breakLength < 30) {
        breakLength++;
        breakDisplay.textContent = breakLength;
    }
};

document.getElementById("break-decrement").onclick = () => {
    if (!isRunning && breakLength > 1) {
        breakLength--;
        breakDisplay.textContent = breakLength;
    }
};


startStopBtn.onclick = () => {
    if (!isRunning) {
        isRunning = true;
        timerInterval = setInterval(() => {
    if (timeRemaining > 0) {
        timeRemaining--;
    updateDisplay();
}   else {
        isSession = !isSession;
        timerLabel.textContent = isSession ? "Session" : "Break";
        timeRemaining = (isSession ? sessionLength : breakLength) * 60;
    updateDisplay();
    alert(isSession ? "Session time!" : "Break time!");
    }
    }, 1000);
    } else {
    clearInterval(timerInterval);
        isRunning = false;
    }
};


resetBtn.onclick = () => {
    clearInterval(timerInterval);
    isRunning = false;
    isSession = true;
    sessionLength = 25;
    breakLength = 5;
    sessionDisplay.textContent = sessionLength;
    breakDisplay.textContent = breakLength;
    timeRemaining = sessionLength * 60;
    timerLabel.textContent = "Session";
    updateDisplay();
};

document.getElementById("break-decrement").addEventListener("click", () => changebreaklength(-1));
document.getElementById("break-increment").addEventListener("click", () => changebreaklength(1));
document.getElementById("session-decrement").addEventListener("click", () => changesessionlength(-1));
document.getElementById("session-increment").addEventListener("click", () => changesessionlength(1));
startStopBtn.addEventListener("click", StartStop);
resetBtn.addEventListener("click", reset);

updateDisplay();
