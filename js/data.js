// 数据类
let dataObj = function() {
	this.fruitNum = 0;
	this.blueFruit = 0;
	this.double = 1;
	this.score = 0;
	this.gameover = false;
	this.alpha = 0;
}

dataObj.prototype.draw = function() {
	let w = can1.width;
	let h = can1.height;

	ctx1.fillStyle = "white";

	ctx1.fillText("分数：" + this.score, w * 0.5, h - 40);

	if (this.gameover) {
		this.alpha += deltaTime * 0.0005;
		if (this.alpha > 1) {
			this.alpha = 1;
		}
		ctx1.save();
		ctx1.shadowBlur = 5;
		ctx1.shadowColor = "#00d0be";
		ctx1.fillStyle = "rgba(0,208,190," + this.alpha + ")"; //
		let fontsize;
		if (canWidth < 415) {
			fontsize = "60px";
		} else {
			fontsize = "80px";
		}
		ctx1.font = "normal bold " + fontsize + " myFont";
		ctx1.fillText("游 戏 结 束", w * 0.5, h * 0.5);
		ctx1.restore();
		document.getElementById("restartBtn").style.display = "block";
	}
}
dataObj.prototype.addScore = function() {
	let blueScore = this.blueFruit * 20;
	let orangeScore = (this.fruitNum - this.blueFruit) * 10;
	this.score += blueScore + orangeScore;
	// this.score += this.fruitNum*10*this.double;
	this.fruitNum = 0;
	this.blueFruit = 0;
	this.double = 1;
}
