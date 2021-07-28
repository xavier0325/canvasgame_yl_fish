//海葵类
let aneObj = function() {
	this.rootx = []; //开始点，控制点，结束点(sin)===用二次贝塞尔曲线
	this.headx = [];
	this.heady = [];
	this.heady_temp = []; //头部y坐标副本
	this.amp = []; //海葵摇摆的振幅大小
	this.alpha = 0; //sin(alpha)
}
aneObj.prototype.num = 50;
aneObj.prototype.init = function() {
	if (canWidth > 812) {
		this.num = 95;
	} else if (canWidth > 666 && canWidth < 737) {
		this.num = 42;
	}
	for (let i = 0; i < this.num; i++) {
		this.rootx[i] = i * 16 + Math.random() * 20;
		this.headx[i] = this.rootx[i];
		this.heady[i] = canHeight - 250 + Math.random() * 50;
		this.heady_temp[i] = this.heady[i];
		this.amp[i] = Math.random() * 5 + 30;
	}
}
aneObj.prototype.draw = function() {
	this.alpha += deltaTime * 0.0008; //摇摆速度
	let l = Math.sin(this.alpha); //[-1,1]

	ctx2.save();
	ctx2.globalAlpha = 0.6;
	ctx2.lineWidth = 20;
	ctx2.lineCap = "round";
	ctx2.shadowBlur = 6;
	ctx2.shadowColor = "#3b154e";
	ctx2.strokeStyle = "#3b154e";
	let ajustvalue;
	if (canHeight > 370 && canHeight < 420) {
		ajustvalue = 100;
	} else {
		ajustvalue = 0;
	}
	for (let i = 0; i < this.num; i++) {
		ctx2.beginPath();
		ctx2.moveTo(this.rootx[i], canHeight); //绘制二次贝塞尔曲线
		this.headx[i] = this.rootx[i] + l * this.amp[i]; //最终的海葵头部x和y坐标
		this.heady[i] = ajustvalue + canHeight - 100 - Math.sqrt((canHeight - this.heady_temp[i] - 100) * (
			canHeight - this.heady_temp[i] - 100) - this.amp[i] * l * this.amp[i] * l);
		ctx2.quadraticCurveTo(this.rootx[i], canHeight - 100, this.headx[i], this.heady[i]);
		ctx2.stroke();
	}
	ctx2.restore();

}
