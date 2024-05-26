const canvas = document.getElementById('meteorShower');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const numberOfMeteors = 10;
const meteors = [];

class Meteor {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.length = Math.random() * 80 + 10;
        this.speed = Math.random() * 5 + 2;
        this.opacity = Math.random() * 0.5 + 0.5;
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.length, this.y + this.length);
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    update() {
        this.x -= this.speed;
        this.y += this.speed;

        if (this.x < 0 || this.y > canvas.height) {
            this.x = Math.random() * canvas.width;
            this.y = 0;
            this.length = Math.random() * 80 + 10;
            this.speed = Math.random() * 5 + 2;
            this.opacity = Math.random() * 0.5 + 0.5;
        }
    }
}

function createMeteors() {
    for (let i = 0; i < numberOfMeteors; i++) {
        meteors.push(new Meteor());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    meteors.forEach(meteor => {
        meteor.update();
        meteor.draw();
    });
    requestAnimationFrame(animate);
}

createMeteors();
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
