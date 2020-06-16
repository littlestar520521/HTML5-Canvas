var canvas = document.querySelector("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;
var c = canvas.getContext("2d");

/**
 * 颜色预设方案，具体配色请点击链接http://www.peise.net/2011/0714/1737.html
 */
const BALL_COLORS = ["#5FD9CD", "#EAF786", "#FFB5A1", "#B8FFB8", "#B8F4FF"];
/**
 * 重力带来的加速度
 */
const GRAVITY_ACCELERATION = 1;
/**
 * 摩擦系数
 */
const FRICTION_FACTOR = 0.95;
/**
 * ball总数
 */
const BALL_COUNT = 30;

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
		//超出下边界时将速度反向，并且受到地面摩擦影响，反弹的速度会减小，加上vy可避免球卡在窗口下边界之下
		if (this.y + this.radius + this.vy > canvas.height) {
			this.vy = -this.vy * FRICTION_FACTOR;
		}
		//正常移动时将速度缓慢增加，反向运动时则为缓慢减少
		else {
			this.vy += GRAVITY_ACCELERATION;
		}
		this.y += this.vy;
		this.draw();
	}
}

/**
 * 存放ball对象的数组
 */
var ballArray = [];

/**
 * 在给定区间内生成随机整数
 * @param {number} min 下边界（包含）
 * @param {number} max 上边界（包含）
 */
function generateRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 初始化动画，使用随机生成的圆心坐标、速度大小、半径大小、颜色创建ball对象
 */
function init() {
	ballArray = [];
	for (var i = 0; i < BALL_COUNT; i++) {
		var radius = generateRandomInt(5, 50);
		var x = generateRandomInt(radius, innerWidth - radius);
		var y = generateRandomInt(radius, innerHeight - radius);
		var vy = generateRandomInt(1, 5);
		var color = BALL_COLORS[generateRandomInt(0, 4)];
		ballArray.push(new Ball(x, y, vy, radius, color));
	}
}

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, innerWidth, innerHeight);
	for (var i = 0; i < BALL_COUNT; i++) {
		ballArray[i].update();
	}
}

init();
animate();
