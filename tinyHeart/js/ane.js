var aneObj = function() {
    //�����ڶ������ö��α��������ߣ���ʼ�㣬���Ƶ㣬������
    //��Ҫ�ڽ����������Һ������ƣ��γɰڶ�
    this.rootx = [];   //��ʼֵ
    this.headx = [];   //������x���꣬������ͷ��
    // this.len = [];
    this.heady = [];  //������x���꣬
    this.alpha = 0;  //���ҽǶȣ����ڿ���headx�İڶ�
    this.amp = [];   //������������ưڶ�����
};
aneObj.prototype.num = 70;
aneObj.prototype.init = function() {
    for(var i = 0; i < this.num; i++) {
        //������λ�ü��߶�
        this.rootx[i] = i * 15 + Math.random() * 20;
        this.headx[i] = this.rootx[i];
        this.heady[i] = canHeight - 260 + Math.random() * 60;
        // this.len[i] = 170 + Math.random() * 40;
        this.amp[i] = Math.random() * 50 + 30;  //�ڶ�����
    }
};
aneObj.prototype.draw = function() {
    this.alpha += deltaTime * 0.002;   //this.alpha����ʱ�䲻�ϵ�����(x��)
    var l = Math.sin(this.alpha);  //y�����Һ���������ͷ���İڶ�[-1, 1];
    ctx2.save();
    ctx2.globalAlpha = 0.6;
    ctx2.strokeStyle = "#009966";
    ctx2.lineWidth = 15;
    ctx2.lineCap = "round";
    for(var i = 0; i < this.num; i++) {
        ctx2.beginPath();
        ctx2.moveTo(this.rootx[i], canHeight);  //��ʼ��
        this.headx[i] = this.rootx[i] + l * this.amp[i] * 0.5;  //��ǰ����ͷ���ľ���λ��
        ctx2.quadraticCurveTo(this.rootx[i], canHeight - 150, this.headx[i], this.heady[i]);  //���Ƶ�
        ctx2.stroke();
    }
    ctx2.restore();   //save(), restore()����ֻ��������֮��������

};
