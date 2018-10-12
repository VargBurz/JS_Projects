var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
//var accessKeyboard=true

var TIMER = 100

var SCORE = 0

var LIFE = 3

var DIR = 'stay'

var DIR_X = 'right'

var UP_LEVEL = 0

var FB_LEVEL = 0

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

var TURTLE_PLACE = [
		{
			x:40,
			y:30,			
		},
]

var FIRE_BALL = [
		{
			x:30,
			y:30,
		},
]


var WALL_LENGTH = 6

function drawMario() {
	
	var x = MARIO_PLACE[0].x*15
	var y = MARIO_PLACE[0].y*15
	ctx.fillStyle = 'blue'
	ctx.fillRect(x, y, 14, 14)
	//ctx.fillStyle = 'red'
	//ctx.fillRect(x, y-15, 14, 14)
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

function drawFireBall() {
		var x = FIRE_BALL[0].x*15
		var y = FIRE_BALL[0].y*15
		ctx.fillStyle = 'red'
		ctx.fillRect(x + 5, y + 5, 5, 5)
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
	
	var vertical_wall = [{x: 38, y: 30, l: 2}]
	
	for (var i = 1; i < 10; i++) {
		vertical_wall[i] = {x: vertical_wall[0].x, y: vertical_wall[i - 1].y - 1, l: 2}
	}
	
	WALL_PLACE = WALL_PLACE.concat(vertical_wall)	
	
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
	
	for (var i = 0; i < WALL_PLACE.length; i++) {
		var r = Math.round(Math.random())
		if (r == 1) {
			COINS.push({x:WALL_PLACE[i].x, y:WALL_PLACE[i].y})
		}
	}
}

function up() {
		
	var o = {}
	o.x = MARIO_PLACE[0].x
	o.y = MARIO_PLACE[0].y - 1
	if (isExist(WALL_PLACE, o) == false) {
		UP_LEVEL += 1
		MARIO_PLACE[0].y = MARIO_PLACE[0].y - 1
	}
	else {
		MARIO_PLACE[0].y = MARIO_PLACE[0].y - 1
		hitWall(o)
		UP_LEVEL  = JUMP_LENGTH
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

function checkFB() {
	if (FB_LEVEL > 0) {
		if (DIR_X == 'right') {
			var o = {}
			o.x = FIRE_BALL[0].x + 1
			o.y = FIRE_BALL[0].y
			if(isExist(WALL_PLACE, o) == false) {
				FIRE_BALL[0] = {x:FIRE_BALL[0].x + 1, y:FIRE_BALL[0].y}
				drawFireBall()
				FB_LEVEL = FB_LEVEL - 1 
			}
			else {
				FIRE_BALL[0] = {x:FIRE_BALL[0].x + 1, y:FIRE_BALL[0].y}
				hitWall(o)
				FB_LEVEL = 0
			}
		}
		else if(DIR_X == 'left') {
			FIRE_BALL[0] = {x:FIRE_BALL[0].x - 1, y:FIRE_BALL[0].y}
			drawFireBall()
			FB_LEVEL = FB_LEVEL - 1
		}
	}
}

function throwFireBall() {
	if(DIR_X == 'right') {
		FB_LEVEL = 8
		FIRE_BALL[0] = {x:MARIO_PLACE[0].x + 1, y: MARIO_PLACE[0].y}
		drawFireBall()
	}
	else {
		FB_LEVEL = 8
		FIRE_BALL[0] = {x:MARIO_PLACE[0].x - 1, y: MARIO_PLACE[0].y}
		drawFireBall()
	}
}

document.onkeydown = function checkKey(event) {
	if(accessKeyboard) {
		if(event.keyCode == 37) {
			DIR_X = 'left'
			var o = {}
			o.x = MARIO_PLACE[0].x - 1
			o.y = MARIO_PLACE[0].y
			if (isExist(WALL_PLACE, o) == false) {
				MARIO_PLACE[0].x = MARIO_PLACE[0].x - 1
			}
		}
		if(event.keyCode == 39) {
			DIR_X = 'right'
			var o = {}
			o.x = MARIO_PLACE[0].x + 1
			o.y = MARIO_PLACE[0].y
			if (isExist(WALL_PLACE, o) == false) {
				MARIO_PLACE[0].x = MARIO_PLACE[0].x + 1
			}
		}
		if(event.keyCode == 32) {
			if (DIR != 'fly' && DIR != 'fall') {
				DIR = 'fly'
				UP_LEVEL = 1
				//MARIO_PLACE[0].y = MARIO_PLACE[0].y - 1
				//for(var i = 0; i < JUMP_LENGTH; i++) {
				//	setTimeout(up, TIMER * i)
				//}
			}
		}
		if(event.keyCode == 101) {
			if (FB_LEVEL == 0){
				throwFireBall()
			}
		}
		
	}
	accessKeyboard = false
}

function checkJump() {
	if ((UP_LEVEL < JUMP_LENGTH ) && (DIR == 'fly')) {
		up()
	}
	if ((UP_LEVEL == JUMP_LENGTH ) && (DIR == 'fly')) {
		DIR = 'fall'
		down()
	}
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
	checkJump()
	catchCoin()
	drawCoins()
	checkFB()
	turt_1.moveTurtle()
	drawWall()
	drawLand()
	turt_1.drawTurtle()
	drawMario()
	drawScore()
}

function gravitation() {
	var o = {}
	o.x = MARIO_PLACE[0].x
	o.y = MARIO_PLACE[0].y + 1
	if ((isExist(LAND, o) == false) && (isExist(WALL_PLACE, o) == false) && DIR != 'fly'){
		DIR = 'fall'
		down()
	}
	if ((isExist(LAND, o) == false || isExist(WALL_PLACE, o) == false) && DIR != 'fly'){
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

class Turtle {
	
	constructor(number) {
		this.number = number
		this.turt_dir = 'right'
		//this.place
	}
	
	createTurtle(){
		//for (var i = 0; i < this.number; i++) {
		TURTLE_PLACE[0] = {x:45, y:30}
		this.place = 45
		//}
	}
	
	moveTurtle() {
		
		if (this.turt_dir == 'right') {
			this.moveRight()
		}
		else if (this.turt_dir == 'left') {
			this.moveLeft()
		}
		
	}
	
	moveRight() {
		this.turt_dir = 'right'
		if (TURTLE_PLACE[0].x < this.place + 4) {
			TURTLE_PLACE[0].x = TURTLE_PLACE[0].x + 0.5
		}
		else {
			this.moveLeft()
		}
	}
	
	moveLeft() {
		this.turt_dir = 'left'
		if (TURTLE_PLACE[0].x > this.place - 4) {
			TURTLE_PLACE[0].x = TURTLE_PLACE[0].x - 0.5
		}
		else {
			this.moveRight()
		}
	}
	
	drawTurtle() {
		var x = TURTLE_PLACE[0].x*15
		var y = TURTLE_PLACE[0].y*15
		ctx.fillStyle = 'black'
		ctx.fillRect(x, y, 14, 14)
	}
	
	Kill() {
		
	}
	
	death() {
		
	}
	
}

class Mario {
	
	constructor(x, y) {
		this.x = x
		this.y = y
	}
	
	createMario() {
		MARIO_PLACE[0] = {x: this.x, y: this.y}
	}
	
	drawMario() {
		var x = MARIO_PLACE[0].x*15
		var y = MARIO_PLACE[0].y*15
		ctx.fillStyle = 'blue'
		ctx.fillRect(x, y, 14, 14)
	}
	
}

class Fireball {
	
	constructor(x, y) {
		this.x = x
		this.y = y
		this.FB_LEVEL = 8
	}
	
	throwFireBall() {
		if ((DIR_X == 'right') && (FIRE_BALL[0].x < this.x + 6)) {
			FIRE_BALL[0] = {x: this.x + 1, y: this.y}
			this.FB_LEVEL = this.FB_LEVEL - 1
		}
		else if ((DIR_X == 'left') && (FIRE_BALL[0].x > this.x - 6)) {
			FIRE_BALL[0] = {x: this.x - 1, y: this.y}
			this.FB_LEVEL = this.FB_LEVEL - 1
		}
	}
	
	drawFireBall() {
		var x = FIRE_BALL[0].x*15
		var y = FIRE_BALL[0].y*15
		ctx.fillStyle = 'red'
		ctx.fillRect(x + 5, y + 5, 5, 5)
	}
	
}
	
createLand()
createWall()
console.log(WALL_PLACE)
createCoins()
var turt_1 = new Turtle(1)
turt_1.createTurtle()
setInterval(game,  TIMER)
