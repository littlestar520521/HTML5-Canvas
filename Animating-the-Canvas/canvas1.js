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
 * 绘制可无限水平移动的圆圈
 */
function horizontalAnimationInfinitely() {
	//window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行。
	//回调函数执行次数通常是每秒60次，但在大多数遵循W3C建议的浏览器中，回调函数执行次数通常与浏览器屏幕刷新次数相匹配。为了提高性能和电池寿命，因此在大多数浏览器里，当requestAnimationFrame() 运行在后台标签页或者隐藏的<iframe> 里时，requestAnimationFrame() 会被暂停调用以提升性能和电池寿命。
	requestAnimationFrame(horizontalAnimationInfinitely);
	//清除画布区域：左上角起点X坐标、左上角起点Y坐标、宽度、高度
	//绘制下一帧之前清除画布，否则会一直显示移动轨迹
	c.clearRect(0, 0, innerWidth, innerHeight);
	c.beginPath();
	c.arc(x, 100, r, 0, Math.PI * 2, false);
	c.strokeStyle = "pink";
	c.stroke();
	//每一帧画面向右移动1个像素
	x += 1;
}
horizontalAnimationInfinitely();
