var fruitObj = function() {
    this.alive = [];      //bool
    this.x = [];
    this.y = [];
    this.aneNO = [];
    this.l = [];            //��ʵֱ��
    this.spd = [];          //ÿ����ʵ�Լ����ٶ�
    this.fruitType = [];    //��ʵ����
    this.orange = new Image();
    this.blue = new Image();
};
fruitObj.prototype.num = 60;
fruitObj.prototype.init = function() {

    for(var i = 0; i < this.num; i++) {
        this.alive[i] = false;  //��ʼʱ��ʵ��Ϊfalse
        this.x[i] = 0;
        this.y[i] = 0;
        this.aneNO[i] = 0;  //��һ������
        // this.l[i] = 0;
        this.spd[i] = Math.random() * 0.02 + 0.005;
        // this.born(i);
        this.fruitType[i] = "";
    }
    this.orange.src = './src/fruit.png';
    this.blue.src = './src/blue.png';
};
fruitObj.prototype.draw = function() {
    for(var i = 0; i < this.num; i++) {
        var pic;
        if( this.alive[i] ) {
            if(this.fruitType[i] == "blue") {   //�ж���ɫ���ǻ�ɫ��ʵ
                pic = this.blue;
            }else {
                pic = this.orange;
            }
            if(this.l[i] <= 15) {
                var NO = this.aneNO[i];
                //��ʱ��仯��ʵ����deltaTimeʹ����ƽ��Щ
                this.x[i] = ane.headx[NO];
                this.y[i] = ane.heady[NO];
                this.l[i] += this.spd[i] * deltaTime;
                ctx2.drawImage(pic, this.x[i]-this.l[i] / 2, this.y[i]-this.l[i] / 2, this.l[i], this.l[i]);

            }else {
                //��ʵ�������ٶȱ仯
                this.y[i] -= this.spd[i] * 8 * deltaTime;
                ctx2.drawImage(pic, this.x[i]-this.l[i] / 2, this.y[i]-this.l[i] / 2, this.l[i], this.l[i]);
            }

            //�ù�ʵ�����ں�������λ��,�ߴ�
            // ctx2.drawImage(pic, this.x[i]-this.l[i] / 2, this.y[i]-this.l[i] / 2, this.l[i], this.l[i]);
            if( this.y[i] < 10) {
                this.alive[i] = false;
            }
        }
    }
};
fruitObj.prototype.born = function(i) {
    // var aneID = Math.floor(Math.random() * ane.num);
    //��ʵx,y
    // this.x[i] = ane.headx[aneID];
    // this.y[i] = ane.heady[aneID];
    //��ʵ������ʱ��᳤����һ��������
    this.aneNO[i] = Math.floor(Math.random() * ane.num);
    this.l[i] = 0;
    this.alive[i] = true;
    var fruRand = Math.random();   //�����ʵ����
    if(fruRand < 0.3) {
        this.fruitType[i] = "blue";
    }else {
        this.fruitType[i] = "orange";
    }

};
fruitObj.prototype.dead = function(i) {     //��ʵ������
    this.alive[i] = false;
};
function fruitMonitor() {
    var num = 0;
    for(var i = 0; i < fruit.num; i++) {
        if (fruit.alive[i]) {
            //��¼���Ĺ�ʵ����
            num++;
        }
    }
    if ( num < 15) {
        sendFruit();
        return;
    }
}
function sendFruit() {
    for (var i = 0; i < fruit.num; i++) {
        if( !fruit.alive[i] ) {
            fruit.born(i);
            return;
        }
    }
}
