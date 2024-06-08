var canvas;
var canvasImage;	
var rectnumber;
var rectlist;
var color;
var context;

var draggingMove;
var dragIndexDelete;
var dragStartLocation;
var mouseX;
var mouseY;
var tempX;
var tempY;
var moveindex;

window.addEventListener('load', starts);
function starts() 
{
    canvas = document.getElementById("canva");
    context = canvas.getContext('2d');
    context.lineWidth = 4;
    rectnumber=0;
    rectlist = [];
    canvas.addEventListener('dblclick', deleterec);
    canvas.addEventListener('mousedown', dragStart);
    canvas.addEventListener('mousemove', drag);
    canvas.addEventListener('mouseup', dragStop);
}	


function dragStart(event) {
    dragging = true;
    dragStartLocation = getCords(canvas, event);
	color = "rgb(" + Math.floor(Math.random()*250) + "," + Math.floor(Math.random()*250) + "," + Math.floor(Math.random()*250) +")";
    getImg();
}

function drag(event) {
    var position;
    if (dragging === true) {
        putImg();
        position = getCords(canvas, event);
        drawrect(position);
		context.fillStyle = color;
		context.fill();
    }
}
function dragStop(event) {
    dragging = false;
    putImg();
    var position = getCords(canvas, event);
    if(Math.abs(position.x-tempX)<0.5 || Math.abs(position.y-tempY)<0.5){
        return;
    }
    drawrect(position);		
	context.fillStyle = color;
	context.fill();	
	rectnumber=rectnumber+1;
	temprect = {x:tempX, y:tempY, width:(position.x-tempX), height:(position.y-tempY),color:color};
	rectlist.push(temprect);
}
	
function getCords(canvas,event) {
    var rec = canvas.getBoundingClientRect();
    var x = (event.clientX - rec.left)*(canvas.width/rec.width),
	y = (event.clientY - rec.top)*(canvas.height/rec.height);
    return {x: x, y: y};
}

function getImg() {
    canvasImage = context.getImageData(0, 0, canvas.width, canvas.height);
}

function putImg() {
    context.putImageData(canvasImage, 0, 0);
}

function drawrect(position) {
	tempX=dragStartLocation.x;
	tempY=dragStartLocation.y;
    context.beginPath();
	context.rect(tempX, tempY, (position.x-tempX), (position.y-tempY));
    context.closePath();
}

function clrscr() {
	rectnumber=0;
	rectlist = [];
	context.clearRect(0,0,canvas.width,canvas.height);
}
function tog(){

    if(document.getElementById("move").innerHTML == "Draw")
    {
        canvas.removeEventListener("mousedown", mouseDown);	
        document.getElementById("move").innerHTML="Move";
        canvas.addEventListener('mousedown', dragStart);
        canvas.addEventListener('mousemove', drag);
        canvas.addEventListener('mouseup', dragStop);				
    }
    else if(document.getElementById("move").innerHTML == "Move")
    {         
    
        canvas.removeEventListener("mousedown", dragStart);
        canvas.removeEventListener("mousemove", drag);
        canvas.removeEventListener("mouseup", dragStop);
        document.getElementById("move").innerHTML="Draw";
        canvas.addEventListener('mousedown', mouseDown);
    }
}




function drawrecs() {
    var i;
    context.clearRect(0,0,canvas.width,canvas.height);		
    for (i=0; i < rectnumber; i++) {
		context.beginPath();
        context.rect(rectlist[i].x, rectlist[i].y, rectlist[i].width, rectlist[i].height);
		context.closePath();
        context.fillStyle = rectlist[i].color;
        context.fill();
    }		
}

function deleterec(event) 
{
    var i;
    var bRect = canvas.getBoundingClientRect();
    dragIndexDelete=-1;
    mx = (event.clientX - bRect.left)*(canvas.width/bRect.width);
    my = (event.clientY - bRect.top)*(canvas.height/bRect.height);
    for (i=rectnumber-1; i>=0; i--) {
        if(mx>rectlist[i].x && my>rectlist[i].y && mx<(rectlist[i].x+rectlist[i].width) && my<(rectlist[i].y+rectlist[i].height)) {
            dragIndexDelete = i;
            break;
        }
    }
    if ( dragIndexDelete> -1 ){
        rectlist.splice(dragIndexDelete,1);
        rectnumber=rectnumber-1;
    }
    drawrecs();
}




function mouseDown(event) 
{
	var i;		
	var bRect = canvas.getBoundingClientRect();	
	mx = (event.clientX - bRect.left)*(canvas.width/bRect.width);
	my = (event.clientY - bRect.top)*(canvas.height/bRect.height);
    for (i=rectnumber-1; i>=0; i--) {
		if(mx>rectlist[i].x && my>rectlist[i].y && mx<(rectlist[i].x+rectlist[i].width) && my<(rectlist[i].y+rectlist[i].height)) {
			moveindex = i;
            draggingMove=true;
            break;
		}
	}
	if (draggingMove) {
		window.addEventListener("mousemove", mouseMove);
	}
	canvas.removeEventListener("mousedown", mouseDown);
	window.addEventListener("mouseup", mouseUp);
}
	
function mouseUp(event){
	canvas.addEventListener("mousedown", mouseDown);
	window.removeEventListener("mouseup", mouseUp);
	if (draggingMove) {
		draggingMove = false;
		window.removeEventListener("mousemove", mouseMove);
	}
}

function mouseMove(event){
    var bRect = canvas.getBoundingClientRect();
    mouseX = (event.clientX - bRect.left)*(canvas.width/bRect.width);
    mouseY = (event.clientY - bRect.top)*(canvas.height/bRect.height);
    rectlist[moveindex].x = mouseX-rectlist[moveindex].width;
    rectlist[moveindex].y = mouseY-rectlist[moveindex].height;
    drawrecs();
}