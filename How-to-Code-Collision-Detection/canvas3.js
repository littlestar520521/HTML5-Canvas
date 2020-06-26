//碰撞运动分析，只考虑2个物体的简单情况

var canvas = document.querySelector("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;
var c = canvas.getContext("2d");

/**
 * 圆圈半径，固定为100
 */
const CIRCLE_RADIUS = 100;
/**
 * 圆圈数量，固定为2
 */
const CIRCLE_COUNT = 2;
/**
 * 圆圈水平/竖直速度大小
 */
const CIRCLE_VELOCITY = 1;

/**
 * 计算两点距离
 * @param {number} x1 点1横坐标
 * @param {number} y1 点1纵坐标
 * @param {number} x2 点2横坐标
 * @param {number} y2 点2纵坐标
 */
function getDistance(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

/**
 * 在给定区间内生成随机整数
 * @param {number} min 下边界（包含）
 * @param {number} max 上边界（包含）
 */
function generateRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 生成随机颜色
 */
function generateRandomColor() {
	var cr = Math.floor(Math.random() * 200) + 30;
	var cg = Math.floor(Math.random() * 200) + 30;
	var cb = Math.floor(Math.random() * 200) + 30;
	return `rgb(${cr},${cg},${cb})`;
}

/**
 * Circle类
 */
class Circle {
	/**
	 * 构造circle对象
	 * @param {number} x 圆心X坐标
	 * @param {number} y 圆心Y坐标
	 * @param {number} vx 水平速度，正负表示方向
	 * @param {number} vy 竖直速度。正负表示方向
	 * @param {number} color 填充颜色
	 */
	constructor(x, y, vx, vy, color) {
		this.x = x;
		this.y = y;
		this.vx = vx;
		this.vy = vy;
		this.color = color;
	}
	draw() {
		c.beginPath();
		c.arc(this.x, this.y, CIRCLE_RADIUS, 0, Math.PI * 2);
		c.fillStyle = this.color;
		c.fill();
	}
	update() {
		//与窗口边界碰撞后将速度反向
		if (this.x < CIRCLE_RADIUS || this.x + CIRCLE_RADIUS > innerWidth) {
			this.vx = -this.vx;
		}
		if (this.y < CIRCLE_RADIUS || this.y + CIRCLE_RADIUS > innerHeight) {
			this.vy = -this.vy;
		}

		this.x += this.vx;
		this.y += this.vy;

		this.draw();
	}
}

//存放circle对象的数组
var circleArray = [new Circle(0, 0, 0, 0)];

//生成10个圆圈，确保它们不互相重叠
circleArray = [];
for (var i = 0; i < CIRCLE_COUNT; i++) {
	//第一步，先随机生成圆心的X,Y坐标，以及水平、竖直方向速度
	var x = generateRandomInt(CIRCLE_RADIUS, innerWidth - CIRCLE_RADIUS);
	var y = generateRandomInt(CIRCLE_RADIUS, innerHeight - CIRCLE_RADIUS);
	var vx = Math.random() > 0.5 ? CIRCLE_VELOCITY : -CIRCLE_VELOCITY;
	var vy = Math.random() > 0.5 ? CIRCLE_VELOCITY : -CIRCLE_VELOCITY;
	//第二步，将本次（从第二次开始）生成的坐标与之前生成的所有坐标进行距离计算，如果距离小于半径之和，说明发生重叠，需要重新生成一次
	if (i !== 0) {
		for (var j = 0; j < circleArray.length; j++) {
			if (
				getDistance(x, y, circleArray[j].x, circleArray[j].y) <
				CIRCLE_RADIUS * 2
			) {
				x = generateRandomInt(
					CIRCLE_RADIUS,
					innerWidth - CIRCLE_RADIUS
				);
				y = generateRandomInt(
					CIRCLE_RADIUS,
					innerHeight - CIRCLE_RADIUS
				);
				//重新生成坐标值后需要重新比较，j值置为-1，需要从头开始再与所有已生成坐标进行比较
				j = -1;
			}
		}
	}
	//直到与所有的坐标比较完毕，符合要求的X,Y值将被用来创建circle对象
	circleArray.push(new Circle(x, y, vx, vy, generateRandomColor()));
}

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, innerWidth, innerHeight);
	//对每一个circle进行碰撞检测，发生碰撞后移动速度反向
	//当前只讨论最简单的情况：2个circle，每个circle都要与另一个circle进行距离比较，比较完成后更新重绘
	for (var i = 0; i < CIRCLE_COUNT; i++) {
		for (var j = 0; j < CIRCLE_COUNT; j++) {
			if (i !== j) {
				if (
					getDistance(
						circleArray[i].x,
						circleArray[i].y,
						circleArray[j].x,
						circleArray[j].y
					) <=
					CIRCLE_RADIUS * 2
				) {
					//发生碰撞后，交换速度
					var _thisVx = circleArray[i].vx;
					var _thisVy = circleArray[i].vy;
					circleArray[i].vx = circleArray[j].vx;
					circleArray[i].vy = circleArray[j].vy;
					circleArray[j].vx = _thisVx;
					circleArray[j].vy = _thisVy;
				}
			}
		}
		circleArray[i].update();
	}
}
animate();
