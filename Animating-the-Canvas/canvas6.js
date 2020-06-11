/**
 * 窗口宽度
 */
const iWidth = window.innerWidth;
/**
 * 窗口高度
 */
const iHeight = window.innerHeight;
var canvas = document.querySelector("canvas");
canvas.width = iWidth;
canvas.height = iHeight;

var c = canvas.getContext("2d");

/**
 * 圆圈类型
 */
class Circle {
	/**
	 * 构造圆圈对象
	 * @param {number} x 圆心X坐标
	 * @param {number} y 圆心Y坐标
	 * @param {number} sx 横向运动速度，包含速率及方向
	 * @param {number} sy 纵向运动速度，包含速率及方向
	 * @param {number} r 半径
	 * @param {string} color 填充颜色
	 */
	constructor(x, y, sx, sy, r, color) {
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
		this.sx = sx;
		/**
		 * 纵向移动速度
		 */
		this.sy = sy;
		/**
		 * 圆圈半径
		 */
		this.r = r;
		/**
		 * 圆圈颜色
		 */
		this.color = color;
		/**
		 * 绘制函数
		 */
		this.draw = function () {
			c.beginPath();
			c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
			c.strokeStyle = this.color;
			c.fillStyle = this.color;
			c.stroke();
			c.fill();
		};
		/**
		 * 更新位置函数，包含边界检测，碰到边界自动返回
		 */
		this.update = function () {
			if (this.x + this.r > iWidth || this.x - this.r < 0) {
				this.sx = -this.sx;
			}
			if (this.y + this.r > iHeight || this.y - this.r < 0) {
				this.sy = -this.sy;
			}
			this.x += this.sx;
			this.y += this.sy;
			this.draw();
		};
	}
}

/**
 * 存储Circle对象的数组
 */
var circleArray = [];
/**
 * 需绘制圆圈总数
 */
const totalCircle = 10;

for (var i = 0; i < totalCircle; i++) {
	var x = Math.random() * (iWidth - radius * 2) + radius;
	var y = Math.random() * (iHeight - radius * 2) + radius;
	var sx = generateStep();
	var sy = generateStep();
	var radius = Math.floor(Math.random() * 50) + 10;
	var color = generateColor();
	circleArray.push(new Circle(x, y, sx, sy, radius, color));
}
/**
 * 生成随机颜色，去掉两端偏黑和偏白的色彩
 */
function generateColor() {
	var cr = Math.floor(Math.random() * 200) + 30;
	var cg = Math.floor(Math.random() * 200) + 30;
	var cb = Math.floor(Math.random() * 200) + 30;
	var ca = Math.random();
	return `rgba(${cr},${cg},${cb},${ca})`;
}
/**
 * 生成随机运动速度，速率在3-10之间
 */
function generateStep() {
	var stepLength = Math.floor(Math.random() * 8) + 3;
	return Math.random() > 0.5 ? stepLength : stepLength * -1; //随机方向
}

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, iWidth, iHeight);
	for (var i = 0; i < totalCircle; i++) {
		circleArray[i].update();
	}
}
animate();
