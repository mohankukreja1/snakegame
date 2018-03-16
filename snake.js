const cvs=document.getElementById('snake');
const ctx=cvs.getContext('2d');

//create the unit

const box=32;

const ground=new Image();
ground.src="img/ground.png";

//console.log('hello')

const food=new Image();
food.src="img/food.png";

const dead=new Audio();
const up=new Audio();
const down=new Audio();
const left=new Audio();
const right=new Audio();
const eat=new Audio();


dead.src="audio/dead.mp3";
up.src="audio/up.mp3";
down.src="audio/down.mp3";
left.src="audio/left.mp3";
right.src="audio/right.mp3";
eat.src="audio/eat.mp3";
let snake=[];

snake[0]={
    x:9*box,
    y:10*box
}

let foodPlace={
    x:Math.floor(Math.random()*17+1) * box,
    y:Math.floor(Math.random()*15+3) * box
}

let score=0;
var d;


document.addEventListener("keydown",direction);

function direction(event) {
    let key=event.keyCode
    if(key == 37 && d!="RIGHT"){
        d= "LEFT";
        left.play();
    }
    else if(key == 38 && d!="DOWN"){
        d= "UP";
        up.play();
    }
    else if(key == 39 && d!="LEFT"){
        d= "RIGHT";
        right.play()
    }
    else if(key == 40 && d!= "UP"){
        d= "DOWN";
        down.play();
    }

}

function draw() {
    ctx.drawImage(ground,0,0);
    for(let i=0;i<snake.length;i++){
         ctx.fillStyle= (i == 0)?"green":"white";
         ctx.fillRect(snake[i].x,snake[i].y,box,box);

         ctx.strokeStyle="red";
         ctx.strokeRect(snake[i].x,snake[i].y,box,box);

    }

    ctx.drawImage(food,foodPlace.x,foodPlace.y);

    console.log(eat)

    let snakeX=snake[0].x;
    let snakeY=snake[0].y;

    let newhead={
        x: snakeX,
        y: snakeY
    }

    function collision(head,array) {
        for(let i=0;i<array.length;i++){
            if(head.x == array[i].x && head.x == array[i].y){
                return true;
            }
        }
         return false;
    }
if(snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newhead,snake)){
    clearInterval(game)
    dead.play();
}

    if(snakeX == foodPlace.x && snakeY == foodPlace.y){
        score++;
        eat.play();
        foodPlace={
            x:Math.floor(Math.random()*17+1) * box,
            y:Math.floor(Math.random()*15+3) * box
        }


    }
    else{
        snake.pop();
    }

     //console.log(snake);

    if(d == "LEFT") snakeX -= box;
    if(d == "RIGHT") snakeX += box;
    if(d == "UP") snakeY -= box;
    if(d == "DOWN") snakeY += box;



    snake.unshift(newhead);


    ctx.fillStyle="white";
    ctx.font="45px changa one";
    ctx.fillText(score,2*box,1.6*box);
}

let game=setInterval(draw,100);