/**
 * 窗口宽度
 */
const innerWidth = window.innerWidth;
/**
 * 窗口高度
 */
const innerHeight = window.innerHeight;
var canvas = document.querySelector("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;

var c = canvas.getContext("2d");
/**
 * 圆圈半径，默认30
 */
const r = 30;
/**
 * 圆心横坐标，初始化为100
 */
var x = 100;
/**
 * 每一帧画面横向移动距离：正数表示向右，负数表示向左
 */
var stepX = 3;
/**
 * 绘制可水平来回移动的圆圈
 */
function horizontalAnimationRoundTrip() {
	requestAnimationFrame(horizontalAnimationRoundTrip);
	c.clearRect(0, 0, innerWidth, innerHeight);
	c.beginPath();
	c.arc(x, 200, r, 0, Math.PI * 2, false);
	c.strokeStyle = "purple";
	c.stroke();
	//向右确保圆圈不超过窗口右边框，向左确保圆圈不超过窗口左边框，一旦有超过则逆向运动
	if (x + r > innerWidth || x - r < 0) {
		stepX = -stepX;
	}
	x += stepX;
}
horizontalAnimationRoundTrip();
