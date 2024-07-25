// Game Constants & Variables
let inputDir = {x:0,y:0};
 const foodSound = new Audio('food.mp3');
 const gameOverSound = new Audio('gameover.mp3');
 const moveSound = new Audio('move.mp3');
 const musicSound = new Audio('music.mp3');
let speed = 5;
let laspaintTime = 0;
let SnakeArr = [
    {x:13,y:15}
]
food = {x:5,y:9};
let score = 0;

// Game function
 function main(ctime){
 window.requestAnimationFrame(main);
    musicSound.play();
    if((ctime - laspaintTime)/1000 < 1/speed){
        return;
    }
    laspaintTime = ctime;
    gameEngine();
 }
 
 function isCollide(snake){
    // if you bump into yourself
    for(let i = 1; i <snake.length;i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // if you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
        return true;
    }
 }

 function gameEngine(){
    // Part 1: Updating the snake array & food
    if(isCollide(SnakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x:0,y:0};
        alert("Game Over. Press any key to play agin!");
        SnakeArr = [{x:13,y:15}];
        musicSound.play();
        score = 0;
    }

    // If you have eaten the food, increment the score and regenerate the food
    if(SnakeArr[0].y === food.y && SnakeArr[0].x === food.x){
        foodSound.play();
        score ++;
        if(score>hiscoreval){
          let hiscoreval = score; 
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "Hiscore" + hiscoreval; 
        }
        scoreBox.innerHTML = "Score :"+ score; 
        SnakeArr.unshift({x:SnakeArr[0].x + inputDir.x, y: SnakeArr[0].y + inputDir.y});
        let a = 3;
        let b = 16;
        food = {x: Math.round(a+(b+a)*Math.random()),y: Math.round(a+(b+a)*Math.random())};
    }
    // Moving the Snake
    for(let i = SnakeArr.length-2;i>=0;i--){
          SnakeArr[i+1] = {...SnakeArr[i]};
    }
    SnakeArr[0].x +=inputDir.x;
    SnakeArr[0].y +=inputDir.y;
    // Part 2: Display the snake and food

    //Display the snake
    board.innerHTML = "";
    SnakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index == 0){
            snakeElement.classList.add('head');
        }else{
        snakeElement.classList.add('snake');
        }

        board.appendChild(snakeElement);
    });
    //Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
 }




//Logic start here

 let hiscore = localStorage.getItem("hiscore");
 if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
 }
 else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "High Score : " + hiscore;
 }

 window.requestAnimationFrame(main);
 window.addEventListener('keydown',e =>{
    inputDir = {x:0,y:1}// Game Start
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
 });