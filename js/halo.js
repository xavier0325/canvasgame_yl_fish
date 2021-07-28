// 喂食生命光环特效
let haloObj = function() {
	this.x = [];
	this.y = [];
	this.alive = [];
	this.r = [];
}
haloObj.prototype.num = 5;
haloObj.prototype.init = function() {
	for (let i = 0; i < this.num; i++) {
		this.x[i] = 0;
		this.y[i] = 0;
		this.alive[i] = false;
		this.r[i] = 0;
	}
}
haloObj.prototype.draw = function() {
	ctx1.save();
	ctx1.lineWidth = 2;
	ctx1.shadowBlur = 10;
	ctx1.shadowColor = "rgba(203,91,0,1)";
	for (let i = 0; i < this.num; i++) {
		if (this.alive[i]) {
			this.r[i] += deltaTime * 0.05; //draw 扩散速度
			if (this.r[i] > 50) { //扩散最大半径
				this.alive[i] = false;
				continue;
			}
			let alpha = 1 - this.r[i] / 50;

			ctx1.beginPath();
			ctx1.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI * 2);
			ctx1.closePath();
			ctx1.strokeStyle = "rgba(203,91,0," + alpha + ")";
			ctx1.stroke();
		}
	}
	ctx1.restore();
}
haloObj.prototype.born = function(x, y) { //这个池有闲置的就可以指定出生
	for (let i = 0; i < this.num; i++) {
		if (!this.alive[i]) {
			this.x[i] = x;
			this.y[i] = y;
			this.r[i] = 10;
			this.alive[i] = true;
		}
	}
}
