let waveObj = function() {
	this.x = [];
	this.y = [];
	this.alive = [];
	this.r = [];

}
waveObj.prototype.num = 10;
waveObj.prototype.init = function() {
	for (let i = 0; i < this.num; i++) {
		this.alive[i] = false;
		this.r[i] = 0;
	}
}
waveObj.prototype.draw = function() {
	ctx1.save();
	ctx1.lineWidth = 2;
	ctx1.shadowBlur = 10;
	ctx1.shadowColor = "white";
	for (let i = 0; i < this.num; i++) {
		if (this.alive[i]) {
			this.r[i] += deltaTime * 0.04;
			if (this.r[i] > 40) {
				this.alive[i] = false;
				continue;
			}
			let alpha = 1 - this.r[i] / 40; //透明度是跟半径反向变化的
			ctx1.beginPath(); //draw
			ctx1.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI * 2);
			ctx1.closePath();
			ctx1.strokeStyle = "rgba(255,255,255," + alpha + ")";
			ctx1.stroke();

		}
	}
	ctx1.restore();
}
waveObj.prototype.born = function(x, y) {
	for (let i = 0; i < this.num; i++) {
		if (!this.alive[i]) {
			this.alive[i] = true;
			this.r[i] = 10;
			this.x[i] = x;
			this.y[i] = y;
			//born
			return;
		}
	}
}
