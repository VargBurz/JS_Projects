var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
//var accessKeyboard=true

var TIMER = 100

var DIR = 'up'

var JUMP_LENGTH = 8

var MARIO_PLACE = [
		{
			x:1,
			y:30,			
		},
]

function drawMario() {
	
	var x = MARIO_PLACE[0].x*15
	var y = MARIO_PLACE[0].y*15
	ctx.fillStyle = 'black'
	ctx.fillRect(x, y, 28, 28)
}

function drawWall() {
	for (var i = 0; i < WALL_PLACE.length; i++) {
		var x = WALL_PLACE[i].x*15
		var y = WALL_PLACE[i].y*15
		ctx.fillStyle = 'brown'
		ctx.fillRect(x, y, 28, 28)
	}
}

function createWall() {
	for (var i = 1; i < WALL_LENGTH; i++) {
		WALL_PLACE[i] = {x: WALL_PLACE[i - 1].x + 1, y: WALL_PLACE[0].y}
	}
}

function draw() {
	ctx.clearRect(0, 0 ,1200, 600)
	drawMario()
}

function up() {
	MARIO_PLACE[0].y = MARIO_PLACE[0].y - 1
}

function down() {
	MARIO_PLACE[0].y = MARIO_PLACE[0].y + 1
}

function stay() {
	MARIO_PLACE[0].y = MARIO_PLACE[0].y
}

document.onkeydown = function checkKey(event) {
	if(accessKeyboard) {
		if(event.keyCode == 37) {
			MARIO_PLACE[0].x = MARIO_PLACE[0].x - 1
		}
		if(event.keyCode == 39) {
			MARIO_PLACE[0].x = MARIO_PLACE[0].x + 1
		}
		if(event.keyCode == 32) {
			//DIR = 'up'
			//marioJump()
			for(var i = 0; i < JUMP_LENGTH; i++) {
				setTimeout(up, TIMER * i)
			}
			for(var i = JUMP_LENGTH + 4; i < JUMP_LENGTH*2 + 4; i++) {
				setTimeout(down, TIMER * i)
			}
		}
	}
	accessKeyboard = false
}

function game() {
	accessKeyboard = true
	ctx.clearRect(0, 0 ,1200, 600)
	document.onkeydown
	drawMario()
	drawWall()
}

function marioJump() {
	drawMario()
	setInterJump()
	setTimeout(setInterDown, TIMER * 5)	
}	

createWall()
setInterval(game,  TIMER)
