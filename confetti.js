// confetti.js
function startConfetti() {
    const confettiCanvas = document.getElementById('confetti-canvas');
    const confetti = confettiCanvas.getContext('2d');
    const particles = [];
    const particleCount = 150;

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * confettiCanvas.width,
            y: Math.random() * confettiCanvas.height,
            r: Math.random() * 4 + 1,
            d: Math.random() * particleCount,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            tilt: Math.random() * 10 - 10
        });
    }

    function draw() {
        confetti.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

        particles.forEach(particle => {
            confetti.beginPath();
            confetti.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2, false);
            confetti.fillStyle = particle.color;
            confetti.fill();

            particle.y += Math.cos(particle.d) + 1 + particle.r / 2;
            particle.x += Math.sin(particle.d) * 2;
            particle.d += 0.02;

            if (particle.y > confettiCanvas.height) {
                particle.y = 0;
                particle.x = Math.random() * confettiCanvas.width;
            }
        });

        requestAnimationFrame(draw);
    }

    draw();
}

window.addEventListener('resize', () => {
    const confettiCanvas = document.getElementById('confetti-canvas');
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
});

// Inicializa o tamanho do canvas
window.dispatchEvent(new Event('resize'));
