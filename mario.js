var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
//var accessKeyboard=true

var TIMER = 100

var SCORE = 0

var LIFE = 3

var DIR = 'stay'

var JUMP_LENGTH = 8

var WALL_PLACE = [
		{
			x:20,
			y:25,
			l:2,
		},
]

var WALL_LENGTH = 6

var LAND = [
	{
		x:0,
		y:31,
	},
]

var COINS = [
	{
		x:2,
		y:30,
	},
]

var MARIO_PLACE = [
		{
			x:1,
			y:30,			
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
	ctx.fillStyle = 'blue'
	ctx.fillRect(x, y, 14, 14)
	ctx.fillStyle = 'red'
	ctx.fillRect(x, y-15, 14, 14)
}

function drawLand() {
	for (var i = 0; i < LAND.length; i++){
		var x = LAND[i].x*15
		var y = LAND[i].y*15
		ctx.fillStyle = 'green'
		ctx.fillRect(x, y, 14, 14)
	}
}

function drawWall() {
	for (var i = 0; i < WALL_PLACE.length; i++) {
		var x = WALL_PLACE[i].x*15
		var y = WALL_PLACE[i].y*15
		ctx.fillStyle = 'brown'
		ctx.fillRect(x, y, 14, 14)
	}
}

function drawCoins() {
	for (var i = 0; i < COINS.length; i++) {
		var x = COINS[i].x*15
		var y = COINS[i].y*15
		ctx.fillStyle = 'yellow'
		ctx.fillRect(x, y, 14, 14)
		ctx.fillStyle = 'white'
		ctx.fillRect(x+3, y+3, 8, 8)
	}
}

function createLand() {
	for (var i = 1; i < 100; i++){
		LAND[i] = {x: i, y: 31}
	}
}

function createWall() {
	for (var i = 1; i < WALL_LENGTH; i++) {
		WALL_PLACE[i] = {x: WALL_PLACE[i - 1].x + 1, y: WALL_PLACE[0].y, l: 2}
	}
	
	WALL_PLACE[WALL_LENGTH] = {x: WALL_PLACE[WALL_LENGTH - 1].x + 4, y: WALL_PLACE[WALL_LENGTH - 1].y - 3, l:2}
	
	for (var i = WALL_LENGTH + 1; i < WALL_LENGTH * 2; i++) {
		WALL_PLACE[i] = {x: WALL_PLACE[i - 1].x + 1, y: WALL_PLACE[WALL_LENGTH].y, l: 2}
	}
	
}

function createCoins() {
	for (var i = 5; i < LAND.length; i++) {
		var r = Math.round(Math.random())
		if (r == 1) {
			COINS.push({x:i, y:LAND[i].y - 1})
		}
	}
	
	for (var i = 0; i < WALL_PLACE.length; i++) {
		var r = Math.round(Math.random())
		if (r == 1) {
			COINS.push({x:WALL_PLACE[i].x, y:WALL_PLACE[i].y - 1})
		}
	}
}

function up() {
	var o = {}
	o.x = MARIO_PLACE[0].x
	o.y = MARIO_PLACE[0].y - 2
	if (isExist(WALL_PLACE, o) == false) {
		MARIO_PLACE[0].y = MARIO_PLACE[0].y - 2
	}
	else {
		MARIO_PLACE[0].y = MARIO_PLACE[0].y
		hitWall(o)
	}
}

function down() {
	var o = {}
	o.x = MARIO_PLACE[0].x
	o.y = MARIO_PLACE[0].y + 1
	if (isExist(WALL_PLACE, o) == false) {
		MARIO_PLACE[0].y = MARIO_PLACE[0].y + 1
	}
	if (MARIO_PLACE[0].y > LAND[0].y + 2) {
		death()
	}
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
			if (DIR != 'fly') {
				DIR = 'fly'
				for(var i = 0; i < JUMP_LENGTH; i++) {
					setTimeout(up, TIMER * i)
				}
			}
		}
	}
	accessKeyboard = false
}

function isExist(l, x){
	for (var i = 0; i < l.length; i++){
		if ((x.x == l[i].x) && (x.y == l[i].y)){
			return true
		}
	}
	return false
}

function game() {
	accessKeyboard = true
	ctx.clearRect(0, 0 ,1200, 600)
	gravitation()	
	document.onkeydown
	catchCoin()
	drawWall()
	drawLand()
	drawCoins()
	drawMario()
	drawScore()
}

function gravitation() {
	var o = {}
	o.x = MARIO_PLACE[0].x
	o.y = MARIO_PLACE[0].y + 1
	if ((isExist(LAND, o) == false) && (isExist(WALL_PLACE, o) == false)){
		DIR = 'fly'
		down()
	}
	else {
		DIR = 'stay'
	}
}

function catchCoin() {
	var o = {}
	o.x = MARIO_PLACE[0].x
	o.y = MARIO_PLACE[0].y
	if (isExist(COINS, o)) {
		COINS.splice(fingIndex(o, COINS),1)
		SCORE += 1
	}
}

function fingIndex(el, list) {
	for (var i =0; i<list.length; i++){
		if ((list[i].x == el.x) && (list[i].y == el.y)){
			return i
		}
	}
	return 'nothing'
}

function drawScore(){
	var board = document.getElementById('score')
	board.innerHTML = 'SCORE:  ' + SCORE +'  |   ' + 'LIFE:  ' + LIFE
}

function death() {
	if (LIFE > 0) {
		alert(' - life')
		MARIO_PLACE[0] = {x:1,y:30}
		LIFE -=1
	}
	else {
		alert('END GAME\nYOUR SCORE: ' + SCORE)
	}
}

function hitWall(o) {
	var i = fingIndex(o, WALL_PLACE)
	if(WALL_PLACE[i].l > 0){
		WALL_PLACE[i].l -= 1
	}
	else {
		WALL_PLACE.splice(i, 1)
	}
}
	
createLand()
createWall()
createCoins()
setInterval(game,  TIMER)
