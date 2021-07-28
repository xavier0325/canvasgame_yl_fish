let can1, can2, ctx1, ctx2;
let allcanvas;
let setting0, setting1, setting2;
let audio;
let isFold, isPlay; //设置的是否收起，音乐的是否播放
let isbao; //是否触发了彩蛋
let canWidth, canHeight;
let lastTime, deltaTime; //两帧之间的time
let startgame;

let bgPic = new Image();

let ane;
let fruit;
let mom;
let baby;
let data;
// 鼠标有关变量
let mx;
let my;
//特效
let wave;
let halo;

//漂浮物
let dust;

document.body.onload = game;

function game() {

	allcanvas = document.getElementById("allcanvas");
	can1 = document.getElementById("canvas1"); //fishes,ui,dust,circle
	can2 = document.getElementById("canvas2"); //background,ane,fruits
	setting0 = document.getElementById("setting0");
	setting1 = document.getElementById("setting1");
	setting2 = document.getElementById("setting2");
	audio = document.getElementById("audio");

	resizeCanvas();
	init();

	lastTime = Date.now();
	deltaTime = 0; //两帧之间的时间间隔
	gameloop();
}

function init() {

	ctx1 = can1.getContext("2d");

	ctx2 = can2.getContext("2d");
	isFold = true;
	isPlay = true;
	isbao = false;
	startgame = false;

	can1.addEventListener('click', onclick, false);

	bgPic.src = "img/background.jpg"

	canWidth = can1.width;
	canHeight = can1.height;

	ane = new aneObj();
	ane.init();
	fruit = new fruitObj();
	fruit.init();
	mom = new momObj();
	mom.init();
	baby = new babyObj();
	baby.init();

	mx = canWidth * 0.5;
	my = canHeight * 0.5;

	data = new dataObj();
	ctx1.font = "40px myFont";
	ctx1.textAlign = "center";

	wave = new waveObj();
	wave.init();

	halo = new haloObj();
	halo.init();

	dust = new dustObj();
	dust.init();

}

function gameloop() {
	window.requestAnimFrame(gameloop);
	let now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;
	if (deltaTime > 40) deltaTime = 40;
	if (window.onresize) {
		resizeCanvas();
	}

	drawBackground();
	ane.draw();
	fruitMonitor();
	fruit.draw();
	ctx1.clearRect(0, 0, canWidth, canHeight);
	if (startgame) {
		mom.draw();
		baby.draw();
	}

	momFruitsCollision();
	momBabyCollision();

	data.draw();
	wave.draw();
	halo.draw();
	dust.draw();
}

function onclick(e) { //获取鼠标点击位置
	if (!data.gameover) {
		if (e.offsetX || e.layerX) {
			mx = e.offsetX == undefined ? e.layerX : e.offsetX;
			my = e.offsetY == undefined ? e.layerY : e.offsetY;
			// console.log(mx + "+" + my);
		}
	}

}
// 重新游戏
function restart() {
	window.location.reload();
}
// 调整游戏画面大小
function resizeCanvas() {

	// document.getElementsByClassName("all_bg").offsetWidth = window.innerWidth + "px";
	// document.getElementsByClassName("all_bg").offsetHeight = window.innerHeight + "px";
	allcanvas.style.width = document.documentElement.clientWidth + "px";
	allcanvas.style.height = document.documentElement.clientHeight + "px";
	can1.width = document.documentElement.clientWidth;
	can1.height = document.documentElement.clientHeight;
	can2.width = document.documentElement.clientWidth;
	can2.height = document.documentElement.clientHeight;
	canWidth = can1.width;
	canHeight = can1.height;
}

// 按下开始游戏按钮
function startGame() {
	// console.log(document.getElementById("gamename").children);
	document.getElementById("startgamecontainer").style.display = "none";
	for (let i = 0; i < 4; i++) {
		document.getElementById("gamename").children[i].classList.add("gamenameboxleave");
	}
	for (let i = 0; i < 4; i++) {
		setTimeout(function() {
			document.getElementById("gamename").children[i].classList.add("leave");
		}, 2000);

	}
	setTimeout(function() {
		document.getElementById("gamenamebox").style.display = "none";
	}, 2000);

	startgame = true;
}

// 根据设置按钮的状态收起或展开
function setting() {
	if (isFold) {
		setting0.style.background = "rgba(255,255,255,0.8)";
		setting1.style.background = "rgba(255,255,255,0.8)";
		setting2.style.background = "rgba(255,255,255,0.8)";
		setting0.parentElement.style.transform = "translateX(25px)";
		setting1.style.transform = "translateY(70px)";
		setting2.style.transform = "translateY(140px)";
		isFold = false;
	} else {
		setting0.style.background = "rgba(0,208,190,0.8)";
		setting1.style.background = "rgba(0,208,190,0.8)";
		setting2.style.background = "rgba(0,208,190,0.8)";
		setting2.style.transform = "translateY(0)";
		setting1.style.transform = "translateY(0)";
		setting0.parentElement.style.transform = "translateX(0)";
		isFold = true;
	}

}

// 设置按下时加样式
document.getElementById("setting0").onmousedown = function() {
	setting0.classList.add("li-hover");
}
document.getElementById("setting0").onmouseup = function() {
	setting0.classList.remove("li-hover");
}
document.getElementById("setting1").onmousedown = function() {
	setting1.classList.add("li-hover");
}
document.getElementById("setting1").onmouseup = function() {
	setting1.classList.remove("li-hover");
}
document.getElementById("setting2").onmousedown = function() {
	setting2.classList.add("li-hover");
}
document.getElementById("setting2").onmouseup = function() {
	setting2.classList.remove("li-hover");
}
document.addEventListener('touchstart', function() {
	audio.play();
})

// 声音开关
function soundtoggle() {
	// var iconsound = document.getElementsByClassName("icon-sound")
	if (isPlay) {
		// setting2.removeChild(setting2.childNodes[1]);
		// iconsound.style.backgroundImage = 'url(img/bgmusic-off.png)';
		setting2.children[0].setAttribute("class", "icon-sound-off");
		audio.pause();
		isPlay = false;
	} else {
		setting2.children[0].setAttribute("class", "icon-sound-on");
		audio.play();
		isPlay = true;
	}

}
// 彩蛋
document.getElementById("coloregg").ondblclick = function() {
	document.getElementById("coloregg").innerHTML = "宝";
	isbao = true;
}
document.getElementById("coloregg").onclick = function() {
	if (isbao) {
		document.getElementById("coloregg").parentNode.children[2].style.display = "block";
	} else {
		return;
	}
}
