let lastPaintTime = 0;
let snake = document.querySelector(".snake");
let snakeArr = [
    {x:4,y:4},
    {x:5,y:4},
    {x:6,y:4},
    {x:6,y:5}
];


let food = {x:2 + Math.round(Math.random()*16),y:2 + Math.round(Math.random()*16)};

foodCreate();


let moveDir = {x:0,y:1};
let flag = false,flag1 = false;
let difficulty;
let score = 0;
let score_val = document.querySelector(".score-val");
let rotate = "rotate(0deg)";
snakeDraw();
document.querySelector("body").addEventListener("keypress", event =>{
    if(event.key === " ")
    {
        if(!Boolean(flag1)){
            window.requestAnimationFrame(game);
            flag1 = true;
        }
    }
    else if(event.key === "Enter")
    {
        flag = true;
        flag1 = false;
    }
});

function game(ctime){
    if(Boolean(flag))
    {
        flag = false;
        return;
    }
    score_val.innerHTML=score;
    difficulty = document.querySelector(".slider").value;
    setTimeout(() => {
        window.requestAnimationFrame(game);
        flag1 = true;
    }, difficulty*10);
    gameEngine();
}

function gameEngine(){
    collide();
    // Plotting Snake
    snake.innerHTML = "";
    snakeDraw();
    //ploting food
    foodCreate();
    if(food.x === Math.abs(snakeArr[0].x) && food.y === Math.abs(snakeArr[0].y))
    {   
        score += 8;
        let x = (snakeArr[0].x + moveDir.x),y = (snakeArr[0].y+moveDir.y);
        snakeArr.push({x:x,y:y});
        food.x = 2 + Math.round(Math.random()*16);
        food.y = 2 + Math.round(Math.random()*16);
        document.querySelector(".slider").value = Number(document.querySelector(".slider").value)-0.5;
    }
    let x = (snakeArr[0].x + moveDir.x),y = (snakeArr[0].y+moveDir.y);
    snakeArr.unshift({x:x,y:y});
    snakeArr.pop();
    // Logic 
    
}
function foodCreate(){
    let foodDiv = document.createElement("div");
        foodDiv.style.gridRowStart = food.y;
        foodDiv.style.gridColumnStart = food.x;
        foodDiv.classList.add("food");
        snake.appendChild(foodDiv);
}
document.body.addEventListener("keypress",(event)=>{
    switch (event.key) {
        case "w":
            rotate = "rotate(180deg)";
            moveDir.x = 0;
            moveDir.y = -1;
            break;
        case "a":
            rotate = "rotate(90deg)";
            moveDir.x = -1;
            moveDir.y = 0;
            break;
        case "s":
            rotate = "rotate(0deg)";
            moveDir.x = 0;
            moveDir.y = 1;
            break;
        case "d":
            rotate = "rotate(270deg)";
            moveDir.x = 1;
            moveDir.y = 0;
            break;
                        
        default:
            break;
    }
}); 
function collide(){
    var count = 0;
    for(var i = 1; i < snakeArr.length; ++i){
        if(snakeArr[i].x == snakeArr[0].x && snakeArr[i].y == snakeArr[0].y){
            count++;
        }
    }           
    if(count > 0 || snakeArr[0].x == 19 ||  snakeArr[0].x == 0 || snakeArr[0].y == 19 || snakeArr[0].y == 0 )
    {
        end();
    }
}

function end(){
    snake.classList.add("snake-border");
    flag = true;
    flag1 = false;
    setTimeout(() => {
        snake.classList.remove("snake-border");
        score = 0;
        snakeArr = [
        {x:4,y:4},
        {x:5,y:4},
        {x:6,y:4},
        {x:6,y:5}
    ];
    moveDir = {x:0,y:1};
    alert("Game over! Press Space to play again!!");
    window.requestAnimationFrame(game);
    snakeDraw();
    rotate = "rotate(0deg)";
    document.querySelector(".head").style.transform = rotate;
    foodCreate();
    document.querySelector(".slider").value = 20;
    }, 100);
    
}

function snakeDraw(){
    for(let i = snakeArr.length-1;i>=0;i--){
        let snakeElement = document.createElement("div"), e = snakeArr[i];
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(i == 0)
        {
            snakeElement.classList.add("head");
            snakeElement.style.transform = rotate;
        }
        else{
            snakeElement.classList.add("snakeBody");
        }
        snake.appendChild(snakeElement);
    }}