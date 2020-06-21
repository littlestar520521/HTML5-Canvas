var canvas = document.querySelector("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;
var c = canvas.getContext("2d");

c.strokeStyle = "#FFB5A1";

/**
 * 圆圈半径，固定为100
 */
const CIRCLE_RADIUS = 100;
/**
 * 圆圈数量，固定为10
 */
const CIRCLE_COUNT = 10;

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
 * Circle类
 */
class Circle {
	/**
	 * 构造circle对象
	 * @param {number} x
	 * @param {number} y
	 */
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	draw() {
		c.beginPath();
		c.arc(this.x, this.y, CIRCLE_RADIUS, 0, Math.PI * 2);
		c.stroke();
	}
	update() {
		this.draw();
	}
}

//存放circle对象的数组
var circleArray = [];

//生成10个圆圈，确保它们不互相重叠
for (var i = 0; i < CIRCLE_COUNT; i++) {
	//第一步，先随机生成圆心的X,Y坐标
	var x = Math.random() * innerWidth;
	var y = Math.random() * innerHeight;
	//第二步，将本次（从第二次开始）生成的坐标与之前生成的所有坐标进行距离计算，如果距离小于半径之和，说明发生重叠，需要重新生成一次
	if (i !== 0) {
		for (var j = 0; j < circleArray.length; j++) {
			if (
				getDistance(x, y, circleArray[j].x, circleArray[j].y) <
				CIRCLE_RADIUS * 2
			) {
				x = Math.random() * innerWidth;
				y = Math.random() * innerHeight;
				//重新生成坐标值后需要重新比较，j值置为-1，需要从头开始再与所有已生成坐标进行比较
				j = -1;
			}
		}
	}
	//直到与所有的坐标比较完毕，符合要求的X,Y值将被用来创建circle对象
	circleArray.push(new Circle(x, y));
}

for (var i = 0; i < CIRCLE_COUNT; i++) {
	circleArray[i].draw();
}
