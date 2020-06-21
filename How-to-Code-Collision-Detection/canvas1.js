var canvas = document.querySelector("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;
var c = canvas.getContext("2d");

/**
 * 存放鼠标移动位置
 */
var mouse = {
	x: 0,
	y: 0,
};

canvas.addEventListener("mousemove", function (e) {
	mouse.x = e.clientX;
	mouse.y = e.clientY;
});

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
 * Ball类
 */
class Ball {
	/**
	 * 构造ball对象
	 * @param {number} x
	 * @param {number} y
	 * @param {number} radius
	 * @param {string} color
	 */
	constructor(x, y, radius, color) {
		this.x = x;
		this.y = y;
		this.r = radius;
		this.color = color;
	}
	draw() {
		c.beginPath();
		c.arc(this.x, this.y, this.r, 0, Math.PI * 2);
		c.fillStyle = this.color;
		c.fill();
	}
	update() {
		this.draw();
	}
}

var ball1 = new Ball(300, 300, 200, "#FFB5A1");
ball1.draw();

var ball2 = new Ball(500, 500, 20, "#B8FFB8");
ball2.draw();

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, innerWidth, innerHeight);
	//ball1不改变位置原样重绘，ball2跟随鼠标位置移动
	ball1.update();
	ball2.x = mouse.x;
	ball2.y = mouse.y;
	//如果圆心距离小于等于半径之和，说明发生碰撞
	if (getDistance(ball1.x, ball1.y, ball2.x, ball2.y) <= ball1.r + ball2.r) {
		//发生碰撞时更改ball2颜色
		ball2.color = "#5FD9CD";
		ball2.draw();
	} else {
		//未碰撞时恢复原来颜色
		ball2.color = "#B8FFB8";
		ball2.draw();
	}
}
animate();
