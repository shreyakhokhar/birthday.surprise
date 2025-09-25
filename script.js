// Calculator functions
let calcScreen = document.getElementById('calcScreen');

function appendToScreen(value) {
    calcScreen.value += value;
}

function clearScreen() {
    calcScreen.value = '';
}

function deleteLast() {
    calcScreen.value = calcScreen.value.slice(0, -1);
}

function checkSpecialDate() {
    const screenValue = calcScreen.value;
    const errorMessage = document.getElementById('errorMessage');

    // **IMPORTANT**: The special date has been changed as requested.
    // Format: DDMMYYYY
    const specialDate = '04012025';

    // Check if the calculation result or input contains the birthday
    if (screenValue.includes(specialDate) ||
        screenValue.includes('04/01/2025') || // You can customize this format
        screenValue === specialDate) {

        // Show surprise!
        document.getElementById('calculatorPage').style.display = 'none';
        document.getElementById('memoriesPage').style.display = 'block';
        createConfetti();

    } else {
        // Try to evaluate the expression normally
        try {
            // Using a safer evaluation method is recommended for production code,
            // but for this simple project, eval is straightforward.
            const result = eval(screenValue);
            calcScreen.value = result;

            // Check if result is the special date
            if (result == parseInt(specialDate, 10)) {
                setTimeout(() => {
                    document.getElementById('calculatorPage').style.display = 'none';
                    document.getElementById('memoriesPage').style.display = 'block';
                    createConfetti();
                }, 1000);
            } else if (screenValue && result !== undefined) {
                // Show hint for wrong calculations
                errorMessage.classList.add('show');
                setTimeout(() => {
                    errorMessage.classList.remove('show');
                }, 3000);
            }
        } catch (error) {
            calcScreen.value = 'Error';
            setTimeout(() => {
                clearScreen();
            }, 1500);
        }
    }
}

// Create floating hearts
function createFloatingHearts() {
    const heartsContainer = document.getElementById('floatingHearts');
    const heartSymbols = ['💜', '✨', '💖', '💕', '🌟']; // Using standard emojis

    function addHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 4) + 's';

        heartsContainer.appendChild(heart);

        // Remove heart after animation
        setTimeout(() => {
            if (heartsContainer.contains(heart)) {
                heartsContainer.removeChild(heart);
            }
        }, 6000);
    }

    // Add hearts periodically
    setInterval(addHeart, 1000);
}

// Create confetti when date is correct
function createConfetti() {
    const confettiColors = ['#9d4edd', '#c77dff', '#e0aaff', '#f8f4ff'];

    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
            confetti.style.animation = 'fall 3s linear forwards';
            confetti.style.zIndex = '9999';
            confetti.style.borderRadius = '50%';

            document.body.appendChild(confetti);

            setTimeout(() => {
                if (document.body.contains(confetti)) {
                    document.body.removeChild(confetti);
                }
            }, 3000);
        }, i * 100);
    }
}

// Add fall animation for confetti
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
        }
    }
`;
document.head.appendChild(confettiStyle);

// Start animations and add listeners when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Mobile card flip support
    const flipCards = document.querySelectorAll('.flip-card');
    flipCards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
    });

    // Start floating hearts animation
    createFloatingHearts();
});