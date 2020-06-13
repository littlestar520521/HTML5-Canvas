/**
 * 创建存储鼠标位置的对象
 */
var mouse = {
	/**
	 * 鼠标指针X坐标
	 */
	x: 0,
	/**
	 * 鼠标指针Y坐标
	 */
	y: 0,
};
//绑定鼠标移动事件
window.addEventListener("mousemove", function (e) {
	mouse.x = e.clientX;
	mouse.y = e.clientY;
});
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
c.fillStyle = "orange";

/**
 * 圆圈半径，初始化为30
 */
var radius = 30;

class Circle {
	/**
	 * 构造圆圈对象
	 * @param {number} x 圆心X坐标
	 * @param {number} y 圆心Y坐标
	 * @param {number} sx 横向运动速度，包含速率及方向
	 * @param {number} sy 纵向运动速度，包含速率及方向
	 * @param {number} r 半径
	 */
	constructor(x, y, sx, sy, r) {
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
	}
	/**
	 * 绘制函数
	 */
	draw() {
		c.beginPath();
		c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
		c.stroke();
		c.fill();
	}
	/**
	 * 更新位置函数，包含边界检测，碰到边界自动返回
	 */
	update() {
		if (this.x + this.r > iWidth || this.x - this.r < 0) {
			this.sx = -this.sx;
		}
		if (this.y + this.r > iHeight || this.y - this.r < 0) {
			this.sy = -this.sy;
		}
		this.x += this.sx;
		this.y += this.sy;

		//跟随鼠标移动变换大小：当圆心离鼠标指针横向纵向距离均小于50时，半径会增大；反之，半径会缩小
		if (
			Math.abs(mouse.y - this.y) < 50 &&
			Math.abs(mouse.x - this.x) < 50
		) {
			//如果半径已经超过或等于40则不再继续增大
			if (this.r < 40) {
				this.r += 1;
			}
		} else {
			//如果半径已经小于或等于2则不再继续缩小
			if (this.r > 2) {
				this.r -= 1;
			}
		}
		this.draw();
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
	c.clearRect(0, 0, iWidth, iHeight);
	//每次重绘画面时都会执行已创建的每个Circle对象的update方法，对每个圆圈进行位置更新
	for (var i = 0; i < totalCircle; i++) {
		circleArray[i].update();
	}
}
animate();
