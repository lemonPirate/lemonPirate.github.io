let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');

class Circle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        // this.r = Math.random() * 8 + 10;
        this.r = 5;
        this._mx = Math.random() * 2 - 1;
        this._my = Math.random() * 2 - 1;
    }

    drawCircle(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, true);
        ctx.closePath();
        ctx.fillStyle = 'rgba(120,144,168,0.3)';
        ctx.fill();
    }

    drawLine(ctx, _circle) {
        var dx = this.x - _circle.x;
        var dy = this.y - _circle.y;
        var dl = Math.sqrt(dx * dx + dy * dy);
        if (dl < 150) {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(_circle.x, _circle.y);
            ctx.closePath();
            ctx.strokeStyle = 'rgba(120,144,168,0.1)';
            ctx.stroke();
        }
    }

    move(w, h) {
        this._mx = (this.x > 0 && this.x < w) ? this._mx : -this._mx;
        this._my = (this.x > 0 && this.x < h) ? this._my : -this._my;
        this.x += this._mx;
        this.y += this._my;
    }
}

let circles = [];
let w = canvas.width = canvas.offsetWidth;
let h = canvas.height = canvas.offsetHeight;
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;


let draw = function () {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < circles.length; i++) {
        circles[i].move(w, h);
        circles[i].drawCircle(ctx);
        for (let j = i + 1; j < circles.length; j++) {
            circles[i].drawLine(ctx, circles[j]);
        }
    }
    requestAnimationFrame(draw);
}

let init = function (number) {
    console.log(getViewportWidthHeight().width);
    console.log(number);
    ctx.clearRect(0, 0, w, h);
    circles=[];
    for (let i = 0; i < number; i++) {
        circles.push(new Circle(Math.random() * canvas.width, Math.random() * canvas.height));
    }
    draw();
}


let getViewportWidthHeight = function () {
    var pageWidth = window.innerWidth,
        pageHeight = window.innerHeight;
    if (typeof pageWidth != "number") {
        if (document.compatMode == "CSS1Compat") {
            pageWidth = document.documentElement.clientWidth;
            pageHeight = document.documentElement.clientHeight;
        } else {
            pageWidth = document.body.clientWidth;
            pageHeight = document.body.clientHeight;
        }
    }
    return {width:pageWidth,height:pageHeight};
}

let calcParNum = function(){
    let data = getViewportWidthHeight();
    let width = data.width;
    let num = Math.ceil(width / 20);
    return num;
}
window.addEventListener('load', init(calcParNum()));