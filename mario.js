var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
//var accessKeyboard=true

var TIMER = 100

var DIR = 'stay'

var JUMP_LENGTH = 8

var EARTH_LVL = 30

var WALL_PLACE = [
		{
			x:20,
			y:25,			
		},
]

var WALL_LENGTH = 6

var MARIO_PLACE = [
		{
			x:1,
			y:30,			
		},
]

var LAND = [
	{
		x: 1,
		y: 31,
	},
]

var WALL_PLACE = [
		{
			x:20,
			y:25,			
		},
]

var WALL_LENGTH = 6

function drawMario() {
	
	var x = MARIO_PLACE[0].x*15
	var y = MARIO_PLACE[0].y*15
	ctx.fillStyle = 'black'
	ctx.fillRect(x, y, 14, 14)
}

function drawWall() {
	for (var i = 0; i < WALL_PLACE.length; i++) {
		var x = WALL_PLACE[i].x*15
		var y = WALL_PLACE[i].y*15
		ctx.fillStyle = 'brown'
		ctx.fillRect(x, y, 14, 14)
	}
}

function drawLand() {
	for (var i = 0; i < LAND.length; i++){
		var x = LAND[i].x*15
		var y = LAND[i].y*15
		ctx.fillStyle = 'green'
		ctx.fillRect(x, y, 14, 14)
	}
}

function createWall() {
	for (var i = 1; i < WALL_LENGTH; i++) {
		WALL_PLACE[i] = {x: WALL_PLACE[i - 1].x + 1, y: WALL_PLACE[0].y}
	}
}

function createLand() {
	for (var i = 1; i < 100; i++){
		LAND[i] = {x: i, y: 31}
	}
}

function draw() {
	ctx.clearRect(0, 0 ,1200, 600)
	drawMario()
}

var fun = function() {
		DIR = 'stay'
	}

function up() {
	var o = {}
	o.x = MARIO_PLACE[0].x
	o.y = MARIO_PLACE[0].y - 1
	if (isExist(WALL_PLACE, o) == false) {
		MARIO_PLACE[0].y = MARIO_PLACE[0].y - 1
	}
}

function down() {
	if ((DIR == 'stay') && (MARIO_PLACE[0].y < EARTH_LVL)) {
		MARIO_PLACE[0].y = MARIO_PLACE[0].y + 1
	}
	if (DIR == 'up') {
		var o = {}
		o.x = MARIO_PLACE[0].x
		o.y = MARIO_PLACE[0].y + 1
		if ((isExist(WALL_PLACE, o) == false) && (o.y < EARTH_LVL + 1)) {
			MARIO_PLACE[0].y = MARIO_PLACE[0].y + 1
		}
	}
}

function stay() {
	MARIO_PLACE[0].y = MARIO_PLACE[0].y
}

document.onkeydown = function checkKey(event) {
	if(accessKeyboard) {
		if(event.keyCode == 37) {
			var o = {}
			o.x = MARIO_PLACE[0].x - 1
			o.y = MARIO_PLACE[0].y
			if (isExist(WALL_PLACE, o) == false) {
				MARIO_PLACE[0].x = MARIO_PLACE[0].x - 1
			}
		}
		if(event.keyCode == 39) {
			var o = {}
			o.x = MARIO_PLACE[0].x + 1
			o.y = MARIO_PLACE[0].y
			if (isExist(WALL_PLACE, o) == false) {
				MARIO_PLACE[0].x = MARIO_PLACE[0].x + 1
			}
		}
		if(event.keyCode == 32) {
			//DIR = 'up' TODO: no double jump
			//marioJump()
			DIR = 'up'
			console.log(DIR)
			for(var i = 0; i < JUMP_LENGTH; i++) {
				setTimeout(up, TIMER * i)
			}
			for(var i = JUMP_LENGTH + 4; i < JUMP_LENGTH*2 +4; i++) {
				setTimeout(down, TIMER * i)
			}
			var t = JUMP_LENGTH*2 + 5
			setTimeout(fun, TIMER * t)
			
		}
	}
	accessKeyboard = false
}

function game() {
	accessKeyboard = true
	ctx.clearRect(0, 0 ,1200, 600)
	checkCondition() 
	document.onkeydown
	drawMario()
	drawWall()
	drawLand()
}

createWall()
createLand()
setInterval(game,  TIMER)



function isExist(l, x){
	for (var i = 0; i < l.length; i++){
		if ((x.x == l[i].x) && (x.y == l[i].y)){
			return true
		}
	}
	return false
}

function checkCondition() {
	if (DIR == 'stay'){
		gravitation()
	}
}

function gravitation() {
	
	while ((MARIO_PLACE[0].y < EARTH_LVL) && checkLand()){
		down()
	}
	
}

function checkLand() {
	for (var i = 0; i < WALL_PLACE.length; i++) {
		if ((MARIO_PLACE[0].x == WALL_PLACE[i].x) && (MARIO_PLACE[0].y == WALL_PLACE[i].y - 1)) {
			return true
		}
	}
	return false
}
