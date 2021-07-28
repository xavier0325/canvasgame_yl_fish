//果实类
let fruitObj = function() {
	this.alive = [] //是否活着
	this.x = [];
	this.y = [];
	this.aneNO = [];
	this.l = []; //果实的尺寸
	this.spd = []; //速度值
	this.fruitType = [];
	this.orange = new Image();
	this.blue = new Image();
}
fruitObj.prototype.num = 30;
fruitObj.prototype.init = function() {
	for (let i = 0; i < this.num; i++) {
		this.alive[i] = false;
		this.x[i] = 0;
		this.y[i] = 0;
		this.aneNO[i] = 0;
		this.l[i] = 0;
		this.spd[i] = Math.random() * 0.017 + 0.003; //[0.003,0.02)
		this.fruitType[i] = "";
	}
	this.orange.src = "./img/fruit.png";
	this.blue.src = "./img/blue.png";
}
fruitObj.prototype.draw = function() {
	for (let i = 0; i < this.num; i++) {
		if (this.alive[i]) {
			if (this.fruitType[i] == "blue") {
				var pic = this.blue;
			} else {
				var pic = this.orange;
			}
			if (this.l[i] <= 14) {
				let NO = this.aneNO[i];
				this.x[i] = ane.headx[NO];
				this.y[i] = ane.heady[NO];
				this.l[i] += this.spd[i] * deltaTime; //变大
			} else {
				this.y[i] -= this.spd[i] * 7 * deltaTime; //然后起飞
			}
			ctx2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);
			if (this.y[i] < 10) {
				this.alive[i] = false;
			}
		}

	}
}
fruitObj.prototype.born = function(i) { //找果实出生点位置基于海葵
	//0~49的整数
	this.aneNO[i] = Math.floor(Math.random() * ane.num);
	this.l[i] = 0;
	this.alive[i] = true;
	let ran = Math.random();
	if (ran < 0.2) {
		this.fruitType[i] = "blue"; //orange or blue
	} else {
		this.fruitType[i] = "orange";
	}

}
fruitObj.prototype.dead = function(i) { //强制死亡
	this.alive[i] = false;
}

function fruitMonitor() { //监视器：当屏幕中存活果实小于15个就新发出果实
	let num = 0;
	for (let i = 0; i < fruit.num; i++) {
		if (fruit.alive[i]) num++;
	}
	if (num < 15) {
		sendFruit(); //发出果实
		return;
	}
}

function sendFruit() {
	for (let i = 0; i < fruit.num; i++) {
		if (!fruit.alive[i]) {
			fruit.born(i);
			return;
		}
	}
}
