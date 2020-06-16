var canvas = document.querySelector("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;
var c = canvas.getContext("2d");

/**
 * 颜色预设方案，具体配色请点击链接http://www.peise.net/2011/0714/1737.html
 */
const BALL_COLORS = ["#5FD9CD", "#EAF786", "#FFB5A1", "#B8FFB8", "#B8F4FF"];

/**
 * Ball类
 */
class Ball {
	/**
	 * 创建ball对象
	 * @param {number} x 圆心X坐标
	 * @param {number} y 圆心Y坐标
	 * @param {number} velocityY 纵向运动速度
	 * @param {number} radius 半径
	 * @param {string} color 颜色
	 */
	constructor(x, y, velocityY, radius, color) {
		/**
		 * 圆心X坐标
		 */
		this.x = x;
		/**
		 * 圆心Y坐标
		 */
		this.y = y;
		/**
		 * 纵向运动速度，正负表示方向
		 */
		this.vy = velocityY;
		/**
		 * 半径
		 */
		this.radius = radius;
		/**
		 * 颜色
		 */
		this.color = color;
	}
	draw() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		c.fillStyle = this.color;
		c.fill();
		c.stroke();
	}
	update() {
		//超出下边界时将速度反向
		if (this.y + this.radius > canvas.height) {
			this.vy = -this.vy;
		}
		//正常移动时将速度缓慢增加，反向运动时则为缓慢减少
		else {
			this.vy += 1;
		}
		this.y += this.vy;
		this.draw();
	}
}

var ball = new Ball(innerWidth / 2, innerHeight / 2, 1, 30, BALL_COLORS[0]);

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, innerWidth, innerHeight);
	ball.update();
}

animate();
