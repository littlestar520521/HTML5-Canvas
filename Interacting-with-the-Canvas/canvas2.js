//随机生成多个个颜色不同大小不同的圆圈并按随机方向随机速率运动，碰到边界时自动返回，如此往复运动。
//当鼠标靠近（指针与圆心水平竖直距离在50以内）其中任一圆圈时该圆圈变大，当鼠标远离其中任一圆圈时该圆圈缩小。
//当窗口缩放时，画布也随之缩放。

/**
 * 圆圈总数
 */
const circleCount = 30;
/**
 * 鼠标指针临界距离
 */
const mouseDistance = 50;
/**
 * 圆圈最大半径
 */
const circleMaxRadius = 80;

var canvas = document.querySelector("canvas");
canvas.width = innerWidth; //window.innerWidth简写
canvas.height = innerHeight;
var c = canvas.getContext("2d");

/**
 * 存放鼠标指针位置
 */
var mouseLocation = {
	x: 0,
	y: 0,
};
//当鼠标在画布上移动时
canvas.addEventListener("mousemove", function (e) {
	mouseLocation.x = e.clientX;
	mouseLocation.y = e.clientY;
});
//当窗口尺寸改变时
window.addEventListener("resize", function () {
	//改变画布尺寸
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	//重新生成圆圈
	init();
});

class Circle {
	/**
	 * Circle构造函数
	 * @param {number} x 圆心横坐标
	 * @param {number} y 圆心纵坐标
	 * @param {number} r 半径
	 * @param {number} speedX 横向速度，正负表示方向
	 * @param {number} speedY 纵向速度，正负表示方向
	 * @param {string} color 颜色
	 */
	constructor(x, y, r, speedX, speedY, color) {
		/**
		 * 圆心横坐标
		 */
		this.x = x;
		/**
		 * 圆心纵坐标
		 */
		this.y = y;
		/**
		 * 横向移动速度
		 */
		this.sx = speedX;
		/**
		 * 纵向移动速度
		 */
		this.sy = speedY;
		/**
		 * 圆圈半径
		 */
		this.r = r;
		/**
		 * 圆圈颜色
		 */
		this.color = color;
		/**
		 * 原始半径
		 */
		this.originRadius = r;
	}
	draw() {
		c.beginPath();
		c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
		c.strokeStyle = this.color;
		c.fillStyle = this.color;
		c.stroke();
		c.fill();
	}
	update() {
		if (
			Math.abs(mouseLocation.x - this.x) < mouseDistance &&
			Math.abs(mouseLocation.y - this.y) < mouseDistance
		) {
			//确保圆圈半径不会大于指定的最大值
			if (this.r < circleMaxRadius) {
				this.r += 1;
			}
		} else {
			//确保圆圈半径不会小于初始半径
			if (this.r > this.originRadius) {
				this.r -= 1;
			}
		}
		if (this.x + this.r > innerWidth || this.x - this.r < 0) {
			this.sx = -this.sx;
		}
		if (this.y + this.r > innerHeight || this.y - this.r < 0) {
			this.sy = -this.sy;
		}
		this.x += this.sx;
		this.y += this.sy;
		this.draw();
	}
}

/**
 * 存放Circle对象的数组
 */
var circleArray = [];

/**
 * 生成随机颜色
 */
function generateRandomColor() {
	//[50,219]
	return `rgba(${Math.floor(Math.random() * 170) + 50},
    ${Math.floor(Math.random() * 170) + 50},
    ${Math.floor(Math.random() * 170) + 50},
    ${Math.random()})`;
}

/**
 * 生成随机速度
 */
function generateRandomSpeed() {
	//[1,5]
	var speed = Math.floor(Math.random() * 5) + 1;
	return Math.random() > 0.5 ? speed : -speed;
}

/**
 * 生成圆圈
 */
function generateCircle(){
	for (var i = 0; i < circleCount; i++) {
		var radius = Math.floor(Math.random() * 51) + 10; //[10-60]
		var x = Math.random() * (innerWidth - 2 * radius) + radius; //r<x<W-r
		var y = Math.random() * (innerHeight - 2 * radius) + radius; //r<y<H-r
		var speedX = generateRandomSpeed();
		var speedY = generateRandomSpeed();
		var color = generateRandomColor();
		circleArray.push(new Circle(x, y, radius, speedX, speedY, color));
	}
}

function init() {
	circleArray = [];//清空Circle数组
	generateCircle();
}

generateCircle();

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, innerWidth, innerHeight);
	for (var i = 0; i < circleCount; i++) {
		circleArray[i].update();
	}
}
animate();
