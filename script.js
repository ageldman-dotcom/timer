let countdownInterval = null;
let isRunning = true;

const hoursDisplay = document.getElementById('hours');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const endTimeDisplay = document.getElementById('endTime');
const statusDisplay = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
const themeBtn = document.getElementById('themeBtn');

// Theme toggle functionality
let isDarkTheme = localStorage.getItem('theme') === 'melancholy';

function initTheme() {
    if (isDarkTheme) {
        document.body.classList.add('melancholy');
        themeBtn.textContent = '☀️ Vibrant Mode';
    } else {
        document.body.classList.remove('melancholy');
        themeBtn.textContent = '🌙 Melancholy Mode';
    }
}

themeBtn.addEventListener('click', () => {
    isDarkTheme = !isDarkTheme;
    document.body.classList.toggle('melancholy');
    themeBtn.textContent = isDarkTheme ? '☀️ Vibrant Mode' : '🌙 Melancholy Mode';
    localStorage.setItem('theme', isDarkTheme ? 'melancholy' : 'vibrant');
});

// Fast end time: July 2, 2026 at 20:15 (8:15 PM) Jerusalem time (nightfall/Tzet HaKochavim)
function getEndTime() {
    const endTime = new Date();
    endTime.setHours(20, 15, 0, 0);
    return endTime;
}

// Start countdown immediately
function startCountdown() {
    updateDisplay();
    
    countdownInterval = setInterval(() => {
        updateDisplay();
    }, 1000);
}

// Update the countdown display
function updateDisplay() {
    const now = new Date();
    const endTime = getEndTime();
    const difference = endTime - now;

    if (difference <= 0) {
        clearInterval(countdownInterval);
        hoursDisplay.textContent = '00';
        minutesDisplay.textContent = '00';
        secondsDisplay.textContent = '00';
        statusDisplay.textContent = '🎉 Fast has ended! G\'mar Chatima Tova!';
        statusDisplay.style.color = isDarkTheme ? '#2c3e50' : '#764ba2';
        return;
    }

    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    hoursDisplay.textContent = String(hours).padStart(2, '0');
    minutesDisplay.textContent = String(minutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');

    statusDisplay.textContent = '⏰ Time remaining until fast ends';
}

// Display end time
function displayEndTime() {
    const endTime = getEndTime();
    const formattedTime = endTime.toLocaleTimeString('en-IL', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    endTimeDisplay.textContent = `Fast ends at: ${formattedTime} (Nightfall in Jerusalem)`;
}

// Reset button functionality
resetBtn.addEventListener('click', () => {
    clearInterval(countdownInterval);
    startCountdown();
});

// Initialize
initTheme();
displayEndTime();
startCountdown();
