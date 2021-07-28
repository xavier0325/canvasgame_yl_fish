// 漂浮物类
let dustObj = function() {
	this.x = [];
	this.y = [];
	this.dustPic = [];
	this.amp = []; //振幅大小
	this.NO = []; //随机外观
	this.alpha; //控制摇摆角度
}
dustObj.prototype.num = 30;
dustObj.prototype.init = function() {
	for (let i = 0; i < 7; i++) {
		this.dustPic[i] = new Image();
		this.dustPic[i].src = "./img/dust" + i + ".png";
	}
	for (let i = 0; i < this.num; i++) {
		this.x[i] = Math.random() * canWidth;
		this.y[i] = Math.random() * canHeight;
		this.amp[i] = 20 + Math.random() * 25;
		this.NO[i] = Math.floor(Math.random() * 7); //[0,7)
	}
	this.alpha = 0;
}
dustObj.prototype.draw = function() {
	this.alpha += deltaTime * 0.0008;
	let l = Math.sin(this.alpha);
	for (let i = 0; i < this.num; i++) {
		let no = this.NO[i];
		ctx2.drawImage(this.dustPic[no], this.x[i] + this.amp[i] * l, this.y[i])
	}
}
