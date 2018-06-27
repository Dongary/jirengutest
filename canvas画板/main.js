var yyy = document.getElementById("xxx");
var cxt = yyy.getContext('2d');
var eraserEnabled = false;
var lineWidths = 5;
autoSize(yyy);
listenUser(yyy);


eraser.onclick = function() {
    eraserEnabled = true;
    eraser.classList.add('active');
    colors.classList.add('hidens');
    penSize.classList.add('hidens');
    pen.classList.remove('active');
    clear.classList.remove('active');
    green.classList.remove('active');
    orange.classList.remove('active');
    black.classList.remove('active');
    save.classList.remove('active');
}
pen.onclick = function() {
    eraserEnabled = false;
    pen.classList.add('active');
    black.classList.add('active');
    colors.classList.remove('hidens');
    penSize.classList.remove('hidens');
    eraser.classList.remove('active');
    clear.classList.remove('active');
    save.classList.remove('active');
}
clear.onclick = function() {
    clear.classList.add('active');
    eraser.classList.remove('active');
    colors.classList.add('hidens');
    penSize.classList.add('hidens');
    pen.classList.remove('active');
    save.classList.remove('active');
    cxt.clearRect(0, 0, yyy.width, yyy.height);
}
save.onclick = function() {
    save.classList.add('active');
    eraser.classList.remove('active');
    colors.classList.add('hidens');
    penSize.classList.add('hidens');
    pen.classList.remove('active');
    clear.classList.remove('active');
    var name = prompt("请输入文件名", "");
    var url = yyy.toDataURL("image/png");
    var a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.click();
}
black.onclick = function() {
    cxt.strokeStyle = "black";
    black.classList.add('active');
    green.classList.remove('active');
    orange.classList.remove('active');
}
green.onclick = function() {
    cxt.strokeStyle = "green";
    green.classList.add('active');
    black.classList.remove('active');
    orange.classList.remove('active');
}
orange.onclick = function() {
    cxt.strokeStyle = "orange";
    orange.classList.add('active');
    green.classList.remove('active');
    black.classList.remove('active');
}
thin.onclick = function() {
    lineWidths = 5;
    thin.classList.add('active');
    thick.classList.remove('active');
}
thick.onclick = function() {
    lineWidths = 10;
    thick.classList.add('active');
    thin.classList.remove('active');
}

function autoSize(event) {
    size()
    window.onresize = function() {
        size()
    }

    function size() {
        var pageWidth = document.documentElement.clientWidth;
        var pageHeight = document.documentElement.clientHeight;
        event.width = pageWidth;
        event.height = pageHeight;
    }
}

function listenUser(canvas) {
    var using = false;
    var lastPoint = {
        x: undefined,
        y: undefined
    }
    if (document.body.ontouchstart !== undefined) {
        canvas.ontouchstart = function(event) {
            var x = event.touches[0].clientX
            var y = event.touches[0].clientY
            using = true;
            if (eraserEnabled) {
                cxt.clearRect(x - 5, y - 5, 20, 20)
            } else {
                lastPoint = {
                    "x": x,
                    "y": y
                }
            }
        }
        canvas.ontouchmove = function(event) {
            var x = event.touches[0].clientX
            var y = event.touches[0].clientY
            if (!using) { return }
            if (eraserEnabled) {
                cxt.clearRect(x - 5, y - 5, 20, 20)
            } else {
                var newPoint = {
                    "x": x,
                    "y": y
                }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint;
            }
        }
        canvas.ontouchend = function(event) {
            using = false;
        }

    } else {
        canvas.onmousedown = function(event) {
            var x = event.clientX
            var y = event.clientY
            using = true;
            if (eraserEnabled) {
                cxt.clearRect(x - 5, y - 5, 20, 20)
            } else {
                lastPoint = {
                    "x": x,
                    "y": y
                }
            }
        }
        canvas.onmousemove = function(event) {
            var x = event.clientX
            var y = event.clientY
            if (!using) { return }
            if (eraserEnabled) {
                cxt.clearRect(x - 5, y - 5, 20, 20)
            } else {
                var newPoint = {
                    "x": x,
                    "y": y
                }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint;
            }
        }
        canvas.onmouseup = function(event) {
            using = false;
        }
    }


}

function drawCirle(x, y, radius) {
    cxt.beginPath()
    cxt.fillStyle = "black"
    cxt.arc(x, y, radius, 0, Math.PI * 2);
    cxt.fill();
}

function drawLine(x1, y1, x2, y2) {
    cxt.beginPath();
    cxt.moveTo(x1, y1);
    cxt.lineWidth = lineWidths;
    cxt.lineTo(x2, y2);
    cxt.stroke();
    cxt.closePath();
}