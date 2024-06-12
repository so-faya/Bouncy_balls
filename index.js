const container = document.getElementById('container'); 
const numberOfBalls = 150; 
const balls = []; 

// Function to generate a random number between min and max
function random(min, max) {
    return Math.random() * (max - min) + min;
}

// Function to create a ball element
function createBall() {
    const ball = document.createElement('div'); 
    ball.classList.add('ball'); 
    ball.style.left = `${random(0, window.innerWidth)}px`; 
    ball.style.top = `${random(0, window.innerHeight)}px`;
    ball.velocityX = random(-2, 2); 
    ball.velocityY = random(-2, 2); 

    // Add an event listener to increase the ball size on mouse enter
    ball.addEventListener('mouseenter', () => {
        ball.style.transform = 'scale(3)';
    });

    // Add an event listener to reset the ball size on mouse leave
    ball.addEventListener('mouseleave', () => {
        ball.style.transform = 'scale(1)';
    });

    // Randomly assign one of the three specified colors
    const colors = ['#481E14', '#9B3922', '#F2613F'];
    ball.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    container.appendChild(ball); // Add the ball to the container
    balls.push(ball); // Add the ball to the balls array
}

// Function to move the balls
function moveBalls() {
    balls.forEach(ball => {
        let x = parseFloat(ball.style.left); 
        let y = parseFloat(ball.style.top); 

        // Reverse direction if the ball hits the horizontal boundaries
        if (x + ball.offsetWidth >= window.innerWidth || x <= 0) {
            ball.velocityX *= -1;
        }
        // Reverse direction if the ball hits the vertical boundaries
        if (y + ball.offsetHeight >= window.innerHeight || y <= 0) {
            ball.velocityY *= -1;
        }

        // Update the position based on velocity
        ball.style.left = `${x + ball.velocityX}px`;
        ball.style.top = `${y + ball.velocityY}px`;
    });

    requestAnimationFrame(moveBalls); // Request the next animation frame
}

// Create the specified number of balls
for (let i = 0; i < numberOfBalls; i++) {
    createBall();
}

// Start the animation
moveBalls();
