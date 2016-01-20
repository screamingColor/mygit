var can1;
var ctx1;

var can2;
var ctx2;

var lastTime;   //��һ֡��ʱ��
var deltaTime;   //��֡��ʱ���

var canWidth;   //�������
var canHeight;

var ane;    //����
var fruit;    //��ʵ

var mom;   //��������
var baby;

var babyTail = []; //С��β������
var babyEye = [];  //С��գ������
var babyBody = []; //С����������

var momTail = [];
var momEye = [];
var momBodyOra = [];  //�����ɫ����
var momBodyBlue = [];  //������ɫ����

var mx;
var	my;  //����ƶ���λ��

var data;   //��ֵ����

var wave;  //��ɫ����ЧȦ
var helo;

var dust;  //Ư����
var dustPic = [];

var bgPic = new Image();   //����ͼƬ

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
    //���ر���ͼƬ
    bgPic.src="./src/background.jpg";
    //�������
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
    //��ȡ��֡ʱ���
    var now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;
    //��ֹ�л�ʱdeltaTime̫���ʹ��ʳ��Ҳ̫��
    if(deltaTime > 50) {
        deltaTime = 50;
    }
    drawBackground();
    ane.draw();
    fruitMonitor();
    fruit.draw();
    ctx1.clearRect(0, 0, canWidth, canHeight);   //��ǰ��һ֡��������յ�
    mom.draw();

}

function onMouseMove(e){
    if(e.offSetX || e.layerX){
        mx = e.offSetX === undefined ? e.layerX : e.offSetX;
        my = e.offSetY === undefined ? e.layerY : e.offSetY;
        console.log(mx);
    }

}