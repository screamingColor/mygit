var can1;
var ctx1;

var can2;
var ctx2;

var lastTime;   //上一帧的时间
var deltaTime;   //两帧的时间差

var canWidth;   //画布宽度
var canHeight;

var ane;    //海葵
var fruit;    //果实

var mom;   //大鱼妈妈
var baby;

var babyTail = []; //小鱼尾巴数组
var babyEye = [];  //小鱼眨眼数组
var babyBody = []; //小鱼身体数组

var momTail = [];
var momEye = [];
var momBodyOra = [];  //大鱼橙色身体
var momBodyBlue = [];  //大鱼蓝色身体

var mx;
var	my;  //鼠标移动的位置

var data;   //分值数据

var wave;  //白色的特效圈
var helo;

var dust;  //漂浮物
var dustPic = [];

var bgPic = new Image();   //背景图片

document.body.onload = game;

function game() {
    init();
    lastTime = Date.now();
    deltaTime = 0;
    gameloop();
}

function init() {
    can1 = document.getElementById("canvas1");  //fish, dust,UI,circle
    ctx1 = can1.getContext("2d");
    can2 = document.getElementById("canvas2");  //background,fruit,haikui
    ctx2 = can2.getContext("2d");

    can1.addEventListener('mousemove',onMouseMove,false);
    //加载背景图片
    bgPic.src="./src/background.jpg";
    //画布宽高
    canWidth = can1.width;
    canHeight = can1.height;
    mx = canWidth * 0.5;
    my = canHeight * 0.5;
    ane = new aneObj();
    ane.init();
    fruit = new fruitObj();
    fruit.init();
    mom = new momObj();
    mom.init();

}

function gameloop() {

    window.requestAnimationFrame(gameloop);
    //获取两帧时间差
    var now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;
    //防止切换时deltaTime太大而使得食物也太大
    if(deltaTime > 50) {
        deltaTime = 50;
    }
    drawBackground();
    ane.draw();
    fruitMonitor();
    fruit.draw();
    ctx1.clearRect(0, 0, canWidth, canHeight);   //把前面一帧的内容清空掉
    mom.draw();

}

function onMouseMove(e){
    if(e.offSetX || e.layerX){
        mx = e.offSetX === undefined ? e.layerX : e.offSetX;
        my = e.offSetY === undefined ? e.layerY : e.offSetY;
        console.log(mx);
    }

}