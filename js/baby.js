// 小鱼类
let babyObj = function() {
	this.x;
	this.y;
	this.angle;
	this.babyEye = [];
	this.babyBody = [];
	this.babyTail = [];

	this.babyTailTimer = 0;
	this.babyTailCount = 0;

	this.babyEyeTimer = 0;
	this.babyEyeCount = 0;
	this.babyEyeInterval = 1000; //表示当前图片持续多少时间

	this.babyBodyTimer = 0;
	this.babyBodyCount = 0;
}
babyObj.prototype.init = function() {
	this.x = canWidth * 0.5 - 50;
	this.y = canHeight * 0.5 + 50;
	this.angle = 0;

	for (var i = 0; i < 8; i++) { //把尾巴序列帧放进数组里
		this.babyTail[i] = new Image();
		this.babyTail[i].src = "./img/babyTail" + i + ".png";
	}
	for (var i = 0; i < 2; i++) { //把眼睛序列帧放进数组里
		this.babyEye[i] = new Image();
		this.babyEye[i].src = "./img/babyEye" + i + ".png";
	}
	for (var i = 0; i < 20; i++) { //把身体序列帧放进数组里
		this.babyBody[i] = new Image();
		this.babyBody[i].src = "./img/babyFade" + i + ".png";
	}
}
babyObj.prototype.draw = function() {
	//lerp x,y
	this.x = lerpDistance(mom.x, this.x, 0.99); //追随大鱼
	this.y = lerpDistance(mom.y, this.y, 0.99);
	//delta angle
	//Math.atan2(y,x)
	let deltaY = this.y - mom.y;
	let deltaX = this.x - mom.x;
	let beta = Math.atan2(deltaY, deltaX); //返回值是-PI~PI

	//lerp angle
	this.angle = lerpAngle(beta, this.angle, 0.6);
	//baby tail count
	this.babyTailTimer += deltaTime;
	if (this.babyTailTimer > 50) {
		this.babyTailCount = (this.babyTailCount + 1) % 8; //保证在0~7之间
		this.babyTailTimer %= 50; //复原计时器
	}

	//baby eye
	this.babyEyeTimer += deltaTime;
	if (this.babyEyeTimer > this.babyEyeInterval) {
		this.babyEyeCount = (this.babyEyeCount + 1) % 2;
		this.babyEyeTimer %= this.babyEyeInterval;

		if (this.babyEyeCount == 0) {
			this.babyEyeInterval = Math.random() * 1500 + 2000;
		} else {
			this.babyEyeInterval = 200;
		}
	}

	//baby body
	this.babyBodyTimer += deltaTime;
	if (this.babyBodyTimer > 300) {
		this.babyBodyCount = this.babyBodyCount + 1;
		this.babyBodyTimer %= 300;
		if (this.babyBodyCount > 19) {
			this.babyBodyCount = 19;
			//game over
			data.gameover = true;
		}
	}

	//ctx1
	ctx1.save();
	ctx1.translate(this.x, this.y);
	ctx1.rotate(this.angle);

	let babyTailCount = this.babyTailCount;
	ctx1.drawImage(this.babyTail[babyTailCount], -this.babyTail[babyTailCount].width * 0.5 + 23, -this.babyTail[
		babyTailCount].height * 0.5);
	let babyBodyCount = this.babyBodyCount;
	ctx1.drawImage(this.babyBody[babyBodyCount], -this.babyBody[babyBodyCount].width * 0.5, -this.babyBody[
		babyBodyCount].height * 0.5);
	let babyEyeCount = this.babyEyeCount;
	ctx1.drawImage(this.babyEye[babyEyeCount], -this.babyEye[babyEyeCount].width * 0.5, -this.babyEye[babyEyeCount]
		.height * 0.5);

	ctx1.restore();
}
