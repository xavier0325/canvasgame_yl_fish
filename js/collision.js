//判断大鱼和果实之间的距离
function momFruitsCollision() {
	if (!data.gameover) {
		for (let i = 0; i < fruit.num; i++) {
			if (fruit.alive[i]) {
				var l = calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y); //两者距离的平方common.js里
			}
			if (l < 200) {
				fruit.dead(i); //果实被吃掉
				data.fruitNum++;
				mom.momBodyCount++;
				if (mom.momBodyCount > 7) {
					mom.momBodyCount = 7;
				}
				if (fruit.fruitType[i] == "blue") {
					data.double = 2;
					data.blueFruit++;
				}
				wave.born(fruit.x[i], fruit.y[i]);
			}
		}
	}

}
//mom 和 baby 的碰撞
function momBabyCollision() {
	if (data.fruitNum > 0 && !data.gameover) {
		let l = calLength2(mom.x, mom.y, baby.x, baby.y);
		if (l < 900) {
			//baby 复原
			baby.babyBodyCount = 0;
			mom.momBodyCount = 0;
			//分数更新
			data.addScore();
			halo.born(baby.x, baby.y);
		}
	}

}
