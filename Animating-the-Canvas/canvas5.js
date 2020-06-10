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
c.strokeStyle = "orange";

/**
 * 圆圈半径，默认30
 */
const radius = 30;

/**
 * 圆圈对象
 * @param {number} x 圆心X坐标
 * @param {number} y 圆心Y坐标
 * @param {number} sx 横向运动速度，包含速率及方向
 * @param {number} sy 纵向运动速度，包含速率及方向
 * @param {number} r 半径
 */
function Circle(x, y, sx, sy, r) {
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
	 * 绘制函数
	 */
	this.draw = function () {
		c.beginPath();
		c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
		c.stroke();
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

/**
 * 存储Circle对象的数组
 */
var circleArray = [];
/**
 * 需绘制圆圈总数
 */
const totalCircle = 10;
//使用for循环创建Circle对象并存入数组
for (var i = 0; i < totalCircle; i++) {
	var x = Math.random() * (iWidth - radius * 2) + radius;
	var y = Math.random() * (iHeight - radius * 2) + radius;
	var sx = (Math.random() - 0.5) * 8;
	var sy = (Math.random() - 0.5) * 8;
	circleArray.push(new Circle(x, y, sx, sy, radius));
}

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, iWidth, iWidth);
	//每次重绘画面时都会执行已创建的每个Circle对象的update方法，对每个圆圈进行位置更新
	for (var i = 0; i < totalCircle; i++) {
		circleArray[i].update();
	}
}
animate();
