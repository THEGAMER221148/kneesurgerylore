const canvas = document.getElementById("display");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class block {
    constructor(x, y, col, vx, vy, rad) {
        this.x = x;
        this.y = y;
        this.col = col;
        this.vx = vx;
        this.vy = vy;
        this.radius = rad;
    }
    step(){
        this.x += this.vx;
        if(this.x + this.radius > canvas.width || this.x - this.radius < 0){
            world.push(new block(this.x, this.y, `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`, -this.vx, -this.vy, 40))
            this.vx = -this.vx;
            this.x += this.vx;
            console.log(world.length);
        }
        world.forEach((item) => {
            if(item != this && item.x - item.radius < this.x + this.radius && item.x + item.radius > this.x - this.radius && item.y - item.radius < this.y + this.radius && item.y + item.radius > this.y - this.radius){
                world.push(new block(this.x, this.y, `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`, -this.vx, -this.vy, 40))
                this.vx = -this.vx;
                this.x += this.vx;
                console.log(world.length);
            }
        });
        this.y += this.vy;
        if(this.y + this.radius > canvas.height || this.y - this.radius < 0){
            world.push(new block(this.x, this.y, `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`, -this.vx, -this.vy, 40))
            this.vy = -this.vy;
            this.y += this.vy;
            console.log(world.length);
        }
        world.forEach((item) => {
            if(item != this && item.x - item.radius < this.x + this.radius && item.x + item.radius > this.x - this.radius && item.y - item.radius < this.y + this.radius && item.y + item.radius > this.y - this.radius){
                world.push(new block(this.x, this.y, `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`, -this.vx, -this.vy, 40))
                this.vx = -this.vx;
                this.x += this.vx;
                console.log(world.length);
            }
        });
        ctx.fillStyle = this.col;
        ctx.fillRect(this.x-this.radius, this.y-this.radius, this.radius*2, this.radius*2);
    }
}

const world = [new block(canvas.width/2, canvas.height/2, `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`, 5, 5, 40)];

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight; 
});

// window.addEventListener("keypress", () => {
//     world.push(new block(canvas.width/2, canvas.height/2, `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`, (Math.random()-0.5)*20, (Math.random()-0.5)*20, 50))
// })

function loop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    world.forEach((item) => {
        item.step();
    });
    ctx.fillStyle = 'black';
    ctx.font = "20px arial";
    ctx.fillText(`Blocks: ${world.length}`, 20, 20);
    if(world.length < 50000){
        requestAnimationFrame(loop);
    }else{
        window.close();
    }
}

loop();