/** 
 *  Script for the Super Tank Fighters Game
 *
 *  Author: Eric Wegscheid
 *  Url: http://ericwegscheid.info
 *  Date: May, 2011
 *
 *	Attention: Please note that this code could certainly be refactored into something much more
 *  efficient. What you see below was create for a class project. 
 */

document.onkeydown = keyHit;

var bulletCount = 4;
var t2bulletCount = 4;
var topBoundary = 24;
var rightBoundary = 424;
var bottomBoundary = 324;
var leftBoundary = 24;
var leftBoundaryTank = 222;

var player1Score = document.getElementById("player1Score");
var p1Score = 0;
var computerScore = document.getElementById("computerScore");
var compScore = 0;
var p1Winner = document.getElementById("youWin");
var p1Loser = document.getElementById("youLose");
var newGameText = document.getElementById("newGame");

var tank = document.getElementById("tank");
var tankX = parseInt(tank.style.left);

var tankY = parseInt(tank.style.top);
var bullet = document.getElementById("bullet");
var bullet2 = document.getElementById("bullet2");
var bullet3 = document.getElementById("bullet3");
var bullet4 = document.getElementById("bullet4");
var reload = document.getElementById("reload");

var round = document.getElementById("round");
var round2 = document.getElementById("round2");
var round3 = document.getElementById("round3");
var round4 = document.getElementById("round4");

var blownUpTank = false;
var boomTank = document.getElementById("boom");
var boomIndexTank = 0;
var explodingTank = false;

var tank2 = document.getElementById("tank2");
var tank2X = parseInt(tank2.style.left);
var tank2Y = parseInt(tank2.style.top);
var t2bullet = document.getElementById("t2bullet");
var t2bullet2 = document.getElementById("t2bullet2");
var t2bullet3 = document.getElementById("t2bullet3");
var t2bullet4 = document.getElementById("t2bullet4");
var t2roundsRemaining = document.getElementById("t2roundsRemaining");

var t2round = document.getElementById("t2round");
var t2round2 = document.getElementById("t2round2");
var t2round3 = document.getElementById("t2round3");
var t2round4 = document.getElementById("t2round4");

var blownUpTank2 = false;
var boomTank2 = document.getElementById("boom2");
var boomIndexTank2 = 0;
var explodingTank2 = false;

var gameOn = false;
var start = document.getElementById("start");


images = new Array();
for(var i = 0; i <= 27; i++) {
	images[i] = "explostion/boom"+(i + 1)+".png";
}
for(var i = 0; i <= 27; i++) {
  boomTank.setAttribute('src', 'explosion/boom' + i + '.png');
  boomTank2.setAttribute('src', 'explosion/boom' + i + '.png');
}



//handles keyboard controls
function keyHit(evt) {
	var thisKey = evt.which;
	//alert(thisKey);
	if (!gameOn && thisKey == 78) {
		window.location = "/";
	}
	
	if (tankX <= leftBoundaryTank || (tankX + 51) >= rightBoundary || tankY <= topBoundary || (tankY + 36) >= bottomBoundary){
		if ((tankX + 51) >= rightBoundary) {
			tankX -= 5;
			tank.style.left = '' + tankX + 'px';
		} else {
			if (tankX <= leftBoundaryTank){
				tankX += 5;
				tank.style.left = '' + tankX + 'px';
			} else {
				if ((tankY + 36) >= bottomBoundary) {
					tankY -= 5;
					tank.style.top = '' + tankY + 'px';
				} else {
					if (tankY <= topBoundary) {
						tankY += 5;
						tank.style.top = '' + tankY + 'px';
					}
				}	
			}		
		}
	} else {
		switch (thisKey){
		case 37://left
			if (gameOn) {
				tankX -= 5;
				tank.style.left = '' + tankX + 'px';		
			}
		break;
		case 38://up
			if (gameOn) {
				tankY -= 5;
				tank.style.top = '' + tankY + 'px';
			}
		break;
		case 40://down
			if (gameOn) {
				tankY += 5;
				tank.style.top = '' + tankY + 'px';
			}
		break;
		case 39://right
			if (gameOn) {
				tankX += 5;
				tank.style.left = '' + tankX + 'px';
			}
		break;
		case 32://shoot spacebar
			if (gameOn) {
				if(bulletCount == 4) {
					bulletCount -= 1;
					bullet.style.left = '' + tankX + 'px';
					bullet.style.top = '' + (tankY + 8) + 'px';
					bullet.style.display = 'block';
					shoot();
					round.style.display = 'none';
				} else if (bulletCount == 3) {
					bulletCount -= 1;
					bullet2.style.left = '' + tankX + 'px';
					bullet2.style.top = '' + (tankY + 8) + 'px';
					bullet2.style.display = 'block';
					shoot2();
					round2.style.display = 'none';
				} else if (bulletCount == 2) {
					bulletCount -= 1;
					bullet3.style.left = '' + tankX + 'px';
					bullet3.style.top = '' + (tankY + 8) + 'px';
					bullet3.style.display = 'block';
					shoot3();
					round3.style.display = 'none';
				} else if (bulletCount == 1) {
					bulletCount -= 1;
					bullet4.style.left = '' + tankX + 'px';
					bullet4.style.top = '' + (tankY + 8) + 'px';
					bullet4.style.display = 'block';
					shoot4();
					round4.style.display = 'none';
					reload.style.display = 'block';
				} 
			}
		break;
		case 82://r
			if (bulletCount == 0) {
				reload.style.display = 'none';
				bulletCount = 4;
				round.style.display = 'block';
				round2.style.display = 'block';
				round3.style.display = 'block';
				round4.style.display = 'block';
			}
		break;
		case 83://s
			if (!gameOn) {
				gameOn = true;
				moveTank2Up();
				tank2Fire();
				start.style.display = 'none';
			}
		break;		
		default:
			//if (!gameOn) {
				//alert("Press 'S' to start game.");
			//}
		}
	}
}
function shoot() {
	var X = parseInt(document.getElementById("bullet").style.left);
	var Y = parseInt(document.getElementById("bullet").style.top);
	tank2Y = parseInt(document.getElementById("tank2").style.top);
	var tank2Xfront = parseInt(document.getElementById("tank2").style.left) + 51;
	tank2X = parseInt(document.getElementById("tank2").style.left);
	var tank2Ybottom = tank2Y + 36;
	
	var bullet = document.getElementById("bullet");
	X -= 10;
	bullet.style.left = '' + X + 'px';
	var t = setTimeout('shoot()', 60);
	
	if (X < tank2Xfront && Y >= tank2Y && Y < tank2Ybottom && X > tank2X) {
		bullet.style.display = 'none';
		blowUpTank2();
		clearTimeout(t);
	}
	if (X < leftBoundary){
		bullet.style.display = 'none';
		clearTimeout(t);
	}
}
function shoot2() {
	var X = parseInt(document.getElementById("bullet2").style.left);
	var Y = parseInt(document.getElementById("bullet2").style.top);
	tank2Y = parseInt(document.getElementById("tank2").style.top);
	var tank2Xfront = parseInt(document.getElementById("tank2").style.left) + 51;
	tank2X = parseInt(document.getElementById("tank2").style.left);
	var tank2Ybottom = tank2Y + 36;
	
	var bullet = document.getElementById("bullet2");
	X -= 10;
	bullet.style.left = '' + X + 'px';
	var t = setTimeout('shoot2()', 60);
	
	if (X < tank2Xfront && Y >= tank2Y && Y < tank2Ybottom && X > tank2X) {
		bullet.style.display = 'none';
		blowUpTank2()
		clearTimeout(t);
	}
	if (X < leftBoundary) {
		bullet.style.display = 'none';
		clearTimeout(t);
	}
}
function shoot3() {
	var X = parseInt(document.getElementById("bullet3").style.left);
	var Y = parseInt(document.getElementById("bullet3").style.top);
	tank2Y = parseInt(document.getElementById("tank2").style.top);
	var tank2Xfront = parseInt(document.getElementById("tank2").style.left) + 51;
	tank2X = parseInt(document.getElementById("tank2").style.left);
	var tank2Ybottom = tank2Y + 36;
	
	var bullet = document.getElementById("bullet3");
	X -= 10;
	bullet.style.left = '' + X + 'px';
	var t = setTimeout('shoot3()', 60);
	
	if (X < tank2Xfront && Y >= tank2Y && Y < tank2Ybottom && X > tank2X) {
		bullet.style.display = 'none';
		blowUpTank2()
		clearTimeout(t);
	}
	if (X < leftBoundary){
		bullet.style.display = 'none';
		clearTimeout(t);
	}
}
function shoot4() {
	var X = parseInt(document.getElementById("bullet4").style.left);
	var Y = parseInt(document.getElementById("bullet4").style.top);
	tank2Y = parseInt(document.getElementById("tank2").style.top);
	var tank2Xfront = parseInt(document.getElementById("tank2").style.left) + 51;
	tank2X = parseInt(document.getElementById("tank2").style.left);
	var tank2Ybottom = tank2Y + 36;
	
	var bullet = document.getElementById("bullet4");
	X -= 10;
	bullet.style.left = '' + X + 'px';
	var t = setTimeout('shoot4()', 60);
	
	if (X < tank2Xfront && Y >= tank2Y && Y < tank2Ybottom && X > tank2X) {
		bullet.style.display = 'none';
		blowUpTank2()
		clearTimeout(t);
	}
	if (X < leftBoundary){
		bullet.style.display = 'none';
		clearTimeout(t);
	}
}

function moveTank2Up() {
	if (!blownUpTank2) {
		var y = parseInt(document.getElementById('tank2').style.top);
		y -= 10;
		tank2Y = y;
		if (y <= topBoundary) {
			moveTank2Down();
		} else {
			tank2.style.top = '' + y + 'px';
			var t = setTimeout('moveTank2Up()', 70);
		}
	}
}
function moveTank2Down() {
	if (!blownUpTank2) {
		var y = parseInt(document.getElementById('tank2').style.top);
		var bottomBoundaryTank2 = bottomBoundary - 36;
		y += 10;
		tank2Y = y;
		if (y >= bottomBoundaryTank2) {
			moveTank2Up();
		} else {
			tank2.style.top = '' + y + 'px';
			var t = setTimeout('moveTank2Down()', 70);
		}
	}
}
function newTank2() {
	if (gameOn) {
		tank2Y = Math.floor(Math.random()*265) + 24; //265 = battleField height plus one for random(301) - height of tank(36)
		tank2X = Math.floor(Math.random()*121) + 24; //same principle as line above (half field) 223 - 51 - 51 = 121
		tank2.style.left = '' + tank2X + 'px';
		tank2.style.top = '' + tank2Y + 'px';
		tank2.style.display = 'block';
		blownUpTank2 = false;
		setTimeout('moveTank2Up()', 1000);
		setTimeout('tank2Fire()', 1500);
	}
}
function tank2Explosion() {
	var tankCenterX = parseInt(document.getElementById("tank2").style.left) + 28;
	var tankCenterY = parseInt(document.getElementById("tank2").style.top) + 17;
	var explosionCenterX = tankCenterX - 73;
	var explosionCenterY = tankCenterY - 53;
	boomTank2.style.left = '' + explosionCenterX + 'px';
	boomTank2.style.top = '' + explosionCenterY + 'px';
	boomTank2.style.display = 'block';
	explodingTank2 = true;
	animateExplosionTank2();
	var boomT = setInterval('animateExplosionTank2()', 50);
	if (!explodingTank2) {
		clearInterval(boomT);
		boomIndexTank2 = 0;
	}
}
function animateExplosionTank2() {
	if (boomIndexTank2 <= 27) {
		boomIndexTank2 += 1;
		boomTank2.setAttribute('src', 'explosion/boom'+boomIndexTank2+'.png');
	} else {
		explodingTank2 = false;
	}
}
function tank2Fire() {
	if (!blownUpTank2) {
		if (t2bulletCount == 4) {
			t2bulletCount -= 1;
			t2bullet.style.left = '' + (tank2X + 51) + 'px';
			t2bullet.style.top = '' + (tank2Y + 8) + 'px';
			t2bullet.style.display = 'block';
			t2shoot();
			t2round.style.display = 'none';
		} else if (t2bulletCount == 3) {
			t2bulletCount -= 1;
			t2bullet2.style.left = '' + (tank2X + 51) + 'px';
			t2bullet2.style.top = '' + (tank2Y + 8) + 'px';
			t2bullet2.style.display = 'block';
			t2shoot2();
			t2round2.style.display = 'none';
		} else if (t2bulletCount == 2) {
			t2bulletCount -= 1;
			t2bullet3.style.left = '' + (tank2X + 51) + 'px';
			t2bullet3.style.top = '' + (tank2Y + 8) + 'px';
			t2bullet3.style.display = 'block';
			t2shoot3();
			t2round3.style.display = 'none';
		} else if (t2bulletCount == 1) {
			t2bulletCount -= 1;
			t2bullet4.style.left = '' + (tank2X + 51) + 'px';
			t2bullet4.style.top = '' + (tank2Y + 8) + 'px';
			t2bullet4.style.display = 'block';
			t2shoot4();
			t2round4.style.display = 'none';
			t2bulletCount = 4;
			t2round.style.display = 'block';
			t2round2.style.display = 'block';
			t2round3.style.display = 'block';
			t2round4.style.display = 'block';
		}		
		var t = setTimeout('tank2Fire()', 800);
	} else {
		clearTimeout(t);
	}
}
function t2shoot() {
	var X = parseInt(document.getElementById("t2bullet").style.left);
	var Y = parseInt(document.getElementById("t2bullet").style.top);
	tankY = parseInt(document.getElementById("tank").style.top);
	var tankXback = parseInt(document.getElementById("tank").style.left) + 51;
	tankX = parseInt(document.getElementById("tank").style.left);
	var tankYbottom = tankY + 36;
	
	var bullet = document.getElementById("t2bullet");
	X += 10;
	bullet.style.left = '' + X + 'px';
	
	var t = setTimeout('t2shoot()', 60);

	if (X > tankX && Y >= tankY && Y < tankYbottom && X < tankXback) {
		bullet.style.display = 'none';
		blowUpTank();
		clearTimeout(t);
	}
	if (X > rightBoundary){
		bullet.style.display = 'none';
		clearTimeout(t);
	}
}
function t2shoot2() {
	var X = parseInt(document.getElementById("t2bullet2").style.left);
	var Y = parseInt(document.getElementById("t2bullet2").style.top);
	tankY = parseInt(document.getElementById("tank").style.top);
	var tankXback = parseInt(document.getElementById("tank").style.left) + 51;
	tankX = parseInt(document.getElementById("tank").style.left);
	var tankYbottom = tankY + 36;
	
	var bullet = document.getElementById("t2bullet2");
	X += 10;
	bullet.style.left = '' + X + 'px';
	
	var t = setTimeout('t2shoot2()', 60);

	if (X > tankX && Y >= tankY && Y < tankYbottom && X < tankXback) {
		bullet.style.display = 'none';
		blowUpTank();
		clearTimeout(t);
	}
	if (X > rightBoundary){
		bullet.style.display = 'none';
		clearTimeout(t);
	}
}
function t2shoot3() {
	var X = parseInt(document.getElementById("t2bullet3").style.left);
	var Y = parseInt(document.getElementById("t2bullet3").style.top);
	tankY = parseInt(document.getElementById("tank").style.top);
	var tankXback = parseInt(document.getElementById("tank").style.left) + 51;
	tankX = parseInt(document.getElementById("tank").style.left);
	var tankYbottom = tankY + 36;
	
	var bullet = document.getElementById("t2bullet3");
	X += 10;
	bullet.style.left = '' + X + 'px';
	
	var t = setTimeout('t2shoot3()', 60);

	if (X > tankX && Y >= tankY && Y < tankYbottom && X < tankXback) {
		bullet.style.display = 'none';
		blowUpTank();
		clearTimeout(t);
	}
	if (X > rightBoundary){
		bullet.style.display = 'none';
		clearTimeout(t);
	}
}

function t2shoot4() {
	var X = parseInt(document.getElementById("t2bullet4").style.left);
	var Y = parseInt(document.getElementById("t2bullet4").style.top);
	tankY = parseInt(document.getElementById("tank").style.top);
	var tankXback = parseInt(document.getElementById("tank").style.left) + 51;
	tankX = parseInt(document.getElementById("tank").style.left);
	var tankYbottom = tankY + 36;
	
	var bullet = document.getElementById("t2bullet4");
	X += 10;
	bullet.style.left = '' + X + 'px';
	
	var t = setTimeout('t2shoot4()', 60);

	if (X > tankX && Y >= tankY && Y < tankYbottom && X < tankXback) {
		bullet.style.display = 'none';
		blowUpTank();
		clearTimeout(t);
	}
	if (X > rightBoundary){
		bullet.style.display = 'none';
		clearTimeout(t);
	}
}

function tankExplosion() {
	var tankCenterX = parseInt(document.getElementById("tank").style.left) + 22;
	var tankCenterY = parseInt(document.getElementById("tank").style.top) + 17;
	var explosionCenterX = tankCenterX - 73;
	var explosionCenterY = tankCenterY - 53;
	boomTank.style.left = '' + explosionCenterX + 'px';
	boomTank.style.top = '' + explosionCenterY + 'px';
	boomTank.style.display = 'block';
	explodingTank = true;
	animateExplosionTank();
	var boomT = setInterval('animateExplosionTank()', 50);
	if (!explodingTank) {
		clearInterval(boomT);
		boomIndexTank = 0;
	}
}
function animateExplosionTank() {
	if (boomIndexTank <= 27) {
		boomIndexTank += 1;
		boomTank.setAttribute('src', 'explosion/boom'+boomIndexTank+'.png');
	} else {
		explodingTank = false;
	}
}
function blowUpTank() {
	tank.style.display = 'none';
	tankExplosion();
	blownUpTank = true;
	tank.style.left = '0px';
	tank.style.top = '-100px';
	setTimeout('newTank()', 1000);
	compScore += 1;
	computerScore.innerHTML = '' + compScore + '';
	if (compScore >= 5) {
		p1Lose();
	}
}
function blowUpTank2() {
	tank2.style.display = 'none';
	tank2Explosion();
	blownUpTank2 = true;
	tank2.style.left = '-100px';
	tank2.style.top = '-100px';
	setTimeout('newTank2()', 1000);
	p1Score += 1;
	player1Score.innerHTML = '' + p1Score + '';
	if (p1Score >= 5) {
		p1Win();
	}
}
function newTank() {
	if (gameOn) {
		tankY = Math.floor(Math.random()*265) + 24; //265 = battleField height plus one for random(301) - height of tank(36)
		tankX = Math.floor(Math.random()*121) + 223; //same principle as line above (half field) 223 - 51 - 51 = 121
		tank.style.left = '' + tankX + 'px';
		tank.style.top = '' + tankY + 'px';
		tank.style.display = 'block';
		blownUpTank = false;
	}
}

function p1Win() {
	p1Winner.style.display = 'block';
	gameOn = false;	
	newGameText.style.display = 'block';
	reload.style.display = 'none';
	bullet.style.top = '-100px';
	bullet2.style.top = '-100px';
	bullet3.style.top = '-100px';
	bullet4.style.top = '-100px';
	t2bullet.style.top = '-100px';
	t2bullet2.style.top = '-100px';
	t2bullet3.style.top = '-100px';
	t2bullet4.style.top = '-100px';
}

function p1Lose() {
	p1Loser.style.display = 'block';
	gameOn = false;	
	newGameText.style.display = 'block';
	reload.style.display = 'none';
	bullet.style.top = '-100px';
	bullet2.style.top = '-100px';
	bullet3.style.top = '-100px';
	bullet4.style.top = '-100px';
	t2bullet.style.top = '-100px';
	t2bullet2.style.top = '-100px';
	t2bullet3.style.top = '-100px';
	t2bullet4.style.top = '-100px';
}