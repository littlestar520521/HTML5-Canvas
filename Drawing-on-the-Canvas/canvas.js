var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

//绘制矩形区域：左上角顶点X坐标、左上角顶点Y坐标、宽度、高度
c.fillStyle = "yellow"; //填充颜色
c.fillRect(10, 10, 200, 100);
c.fillStyle = "red";
c.fillRect(300, 10, 200, 100);

//绘制线段：指定起点和终点坐标
c.beginPath();
c.moveTo(200, 200); //起点坐标
c.lineTo(500, 200); //转折点坐标
c.lineTo(500, 500); //终点坐标
c.strokeStyle = "blue"; //线条颜色
c.stroke();

//绘制圆弧：指定圆心X坐标、圆心Y坐标、半径、起始角度、终点角度、是否按逆时针方向绘制
c.beginPath();
c.arc(300, 300, 50, 0, Math.PI, true); //起始角度0位于水平方向右端
c.strokeStyle = "green";
c.stroke();

//使用for循环绘制多个圆圈：半径等长水平位置不同
for (var i = 1; i < 5; i++) {
	c.beginPath();
	c.arc(300 * i, 500, 50, 0, Math.PI * 2, false);
	c.strokeStyle = "orange";
	c.stroke();
}

//使用for循环绘制多个圆圈：半径不等的同心圆
for (var i = 1; i < 5; i++) {
	c.beginPath();
	c.arc(700, 200, 50 * i, 0, Math.PI * 2, false);
	c.strokeStyle = "pink";
	c.stroke();
}

//使用for循环绘制多个圆圈：半径等长位置随机生成
for (var i = 1; i < 5; i++) {
	var x = Math.random() * window.innerWidth;
	var y = Math.random() * window.innerHeight;
	c.beginPath();
	c.arc(x, y, 50, 0, Math.PI * 2, false);
	c.strokeStyle = "purple";
	c.stroke();
}
