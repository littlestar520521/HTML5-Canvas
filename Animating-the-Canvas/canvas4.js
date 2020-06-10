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
 * 圆圈半径，默认30
 */
const r = 30;

//随机生成圆心X坐标，X坐标值应确保绘制的圆圈始终在窗口内
//X值应大于圆圈半径，小于窗口宽度与圆圈半径的差
//当随机值趋向于0时，X值趋向于半径r；当随机值趋向于1时，X值趋向于窗口宽度与半径r之差
var x = Math.random() * (iWidth - r * 2) + r;
//随机生成圆心Y坐标，Y坐标值满足条件同上
var y = Math.random() * (iHeight - r * 2) + r;

//随机生成横向移动距离及方向，由于使用正负来决定方向，所以减去0.5可确保得到的值在-0.5与0.5之间均等分布
//可以乘上一个系数使该值变大
var stepX = (Math.random() - 0.5) * 8;
//随机生成纵向移动距离及方向
var stepY = (Math.random() - 0.5) * 8;

/**
 * 在随机位置生成圆圈并按照随机速度水平竖直运动，碰到边界自动返回
 */
function animationRandomly() {
	requestAnimationFrame(animationRandomly);
	c.clearRect(0, 0, iWidth, iHeight);
	c.beginPath();
	c.arc(x, y, r, 0, Math.PI * 2, false);
	c.strokeStyle = "purple";
	c.stroke();
	//向右确保圆圈不超过窗口右边框，向左确保圆圈不超过窗口左边框，一旦有超过则逆向运动
	if (x + r > iWidth || x - r < 0) {
		stepX = -stepX;
	}
	//竖直边界碰撞判断同上
	if (y + r > iHeight || y - r < 0) {
		stepY = -stepY;
	}
	x += stepX;
	y += stepY;
}
animationRandomly();
