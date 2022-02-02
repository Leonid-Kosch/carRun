let gameBox = document.querySelector('#game');
const WIDTH = gameBox.clientWidth; //clietnWidth = свойство котрое узнает ширину элемента
const HEIGHT = gameBox.clientHeight; //clientHeight = свойство которое узнает высоту элемента
let playField = SVG().addTo(gameBox).size(WIDTH, HEIGHT); 
let playBackground = playField.rect(WIDTH, HEIGHT).fill('green');
let playBackgroundTwo = playField.rect(WIDTH * 0.8, HEIGHT).fill('gray').move(WIDTH * 0.1, 0);
let borderLeft = playField.line(WIDTH * 0.12, 0, WIDTH * 0.12, HEIGHT).stroke({width: 10, color: 'white'});
let borderRight = playField.line(WIDTH * 0.88, 0, WIDTH *0.88, HEIGHT).stroke({width:10, color: 'white'});
let borderCenter = playField.line(WIDTH / 2, 0, WIDTH / 2, HEIGHT).stroke({width: 10, color: 'white', dasharray:[30, 30]});
let carOne = playField.image('img/car.png').size(WIDTH * 0.09, WIDTH  * 0.19).move(WIDTH / 2 - WIDTH * 0.045, HEIGHT * 0.7);
let carOneWidth = WIDTH * 0.09;
let carOneHeight = WIDTH * 0.19;
let stepCar = 0;
let carTwo = playField.image('img/car2.png').size(WIDTH * 0.08, WIDTH * 0.18).move(WIDTH / 2 - WIDTH * 0.04, 0);
let carTwoWidth = WIDTH * 0.08;
let carTwoHeight = WIDTH * 0.18;
let stepCarTwo = 1;
let startButton = document.querySelector('#startButton');
let pause = document.querySelector('#pauseButton');
let score = 0;
let scoreSpan = document.querySelector('#score');
function moveCar(){
    if(pause.innerHTML === 'Пауза'){
        if(carOne.x() < borderLeft.x()){
            carOne.x(borderLeft.x());
        }
        if(carOne.x() + carOneWidth > borderRight.x()){
            carOne.x(borderRight.x() - carOneWidth);
        }
        carOne.dx(stepCar);
    }
};
function moveCarTwo(){
    if(pause.innerHTML === 'Пауза'){
        if(carTwo.y() > HEIGHT * 1.1){
            carTwo.y(carTwoHeight * -2);
            carTwo.x(getRandomInt());
            stepCarTwo = stepCarTwo + 0.1;
            score++;
            scoreSpan.innerHTML = score;
        }
        carTwo.dy(stepCarTwo); 
        if(carTwo.y() + carTwoHeight * 0.9 > carOne.y() && carTwo.y() < carOne.y() + carOneHeight * 0.9){
            if(carTwo.x() + carTwoWidth * 0.9 > carOne.x() && carTwo.x() < carOne.x() + carOneWidth * 0.9){
                clearInterval(moveRoadA);
                clearInterval(moveCarA);
                clearInterval(moveCarTwoA);
                startButton.disabled = false;
            }
        }        
    }
};
startButton.onclick = function(){
    moveRoadA = setInterval(moveRoad, 100);
    moveCarA = setInterval(moveCar, 1);  
    moveCarTwoA = setInterval(moveCarTwo, 1);
    carTwo.y(carTwoHeight * -2);
    carTwo.x(getRandomInt());
    startButton.disabled = true;
    score = 0;
    scoreSpan.innerHTML = score;
    stepCarTwo = 1;
};
pause.onclick = function(){
    if(pause.innerHTML === 'Пауза'){
        pause.innerHTML = 'Продолжить';
    } else{
        pause.innerHTML = 'Пауза';
    }
};  
document.addEventListener('keydown', function(){
    let keyCode = event.keyCode;
    console.log(keyCode);
    if(keyCode === 65){
        stepCar = -2;
    }
    if(keyCode === 68){
        stepCar = 2;
    }
});
document.addEventListener('keyup', function(){
    let keyCode = event.keyCode;
    if(keyCode === 65 || keyCode === 68){
        stepCar = 0;
    }
});
function moveRoad(){
    if(pause.innerHTML === 'Пауза'){
        if(borderCenter.y() === 0){
            borderCenter.dy(30);
        } else{
            borderCenter.dy(-30)
        }
    };
}
function getRandomInt(){
    return Math.floor(Math.random() * ((borderRight.x() - carTwoWidth) - borderLeft.x() + 1) + borderLeft.x());
};