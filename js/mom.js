// 大鱼类
let momObj = function() {
	this.x;
	this.y;
	this.angle;
	this.momEye = [];
	this.momBodyOra = [];
	this.momBodyBlue = [];
	this.momTail = [];

	this.momTailTimer = 0;
	this.momTailCount = 0;

	this.momEyeTimer = 0;
	this.momEyeCount = 0;
	this.momEyeInterval = 1000;

	this.momBodyCount = 0;
}
momObj.prototype.init = function() {
	this.x = canWidth * 0.5;
	this.y = canHeight * 0.8;
	this.angle = 0;

	for (let i = 0; i < 8; i++) {
		this.momTail[i] = new Image();
		this.momTail[i].src = "./img/bigTail" + i + ".png";
	}

	for (let i = 0; i < 2; i++) {
		this.momEye[i] = new Image();
		this.momEye[i].src = "./img/bigEye" + i + ".png";
	}

	for (let i = 0; i < 8; i++) {
		this.momBodyOra[i] = new Image();
		this.momBodyBlue[i] = new Image();
		this.momBodyOra[i].src = "./img/bigSwim" + i + ".png";
		this.momBodyBlue[i].src = "./img/bigSwimBlue" + i + ".png";
	}
}
momObj.prototype.draw = function() {
	//让当前值趋向于目标值变化，像跟随一样lerp x,y
	this.x = lerpDistance(mx, this.x, 0.98); //在封装的common.js里
	this.y = lerpDistance(my, this.y, 0.98);
	//delta angle
	//Math.atan2(y,x)
	let deltaY = this.y - my; //我这里因为是鼠标点击所以是这样，当是mousemove时是my-this.y
	let deltaX = this.x - mx;
	let beta = Math.atan2(deltaY, deltaX); //返回值是-PI~PI

	//lerp angle
	this.angle = lerpAngle(beta, this.angle, 0.8);

	//tail
	this.momTailTimer += deltaTime;
	if (this.momTailTimer > 50) {
		this.momTailCount = (this.momTailCount + 1) % 8;
		this.momTailTimer %= 50;
	}

	//eye
	this.momEyeTimer += deltaTime;
	if (this.momEyeTimer > this.momEyeInterval) {
		this.momEyeCount = (this.momEyeCount + 1) % 2;
		this.momEyeTimer %= this.momEyeInterval;
		if (this.momEyeCount == 0) {
			this.momEyeInterval = Math.random() * 1500 + 2000;
		} else {
			this.momEyeInterval = 200;
		}
	}

	ctx1.save();
	ctx1.translate(this.x, this.y);
	ctx1.rotate(this.angle);
	let momTailCount = this.momTailCount;
	ctx1.drawImage(this.momTail[momTailCount], -this.momTail[momTailCount].width * 0.5 + 50, -this.momTail[
		momTailCount].height * 0.5);
	let momBodyCount = this.momBodyCount;
	if (data.double == 1) { //ora
		ctx1.drawImage(this.momBodyOra[momBodyCount], -this.momBodyOra[momBodyCount].width * 0.1, -this.momBodyOra[
			momBodyCount].height * 0.5);
	} else {
		ctx1.drawImage(this.momBodyBlue[momBodyCount], -this.momBodyBlue[momBodyCount].width * 0.1, -this
			.momBodyBlue[momBodyCount].height * 0.5);
	}
	let momEyeCount = this.momEyeCount;
	ctx1.drawImage(this.momEye[momEyeCount], -this.momEye[momEyeCount].width + 25, -this.momEye[momEyeCount]
		.height * 0.5);
	ctx1.restore();
}
