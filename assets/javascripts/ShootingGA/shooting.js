/*
* This function is game start scene.
* @sgroot: SceneGraphRoot object.
*/

function startGame(sgroot){
	sgroot.think_count += 1;
	sgroot.loop_flag = false;
	sgroot.child = new ShootingScene(sgroot);
	sgroot.child.sg = sgroot.child.initShootingScene(sgroot);
	sgroot.child.sg.auto_move = new Array();


	if(!sgroot.init_flag){
		sgroot.child.sg.auto_move = copyArray(sgroot.gene_group[sgroot.think_count-1]);
	}
	
	/*
	if(compArray(sgroot.child.sg.auto_move, sgroot.best_gene)){
		console.log('まだ等しいです大丈夫')
	}else{
		console.log('等しい遺伝子ではありません大丈夫ではありません')
	}
	*/
	
	console.log(sgroot.think_count + '回目の実行です')
	
	if(sgroot.think_count == 1 && sgroot.sub_gene.length > 0){
		if(compArray(sgroot.gene_group[0], sgroot.sub_gene)){
			sgroot.child.sg.auto_move = copyArray(sgroot.sub_gene);
			console.log('等しい遺伝子ですOK')
		}else{
			console.log('等しく無い遺伝子ですNO')
		}
		if(compArray(sgroot.child.sg.auto_move, sgroot.gene_group[0])){
			console.log('等しい遺伝子ですOK')
		}else{
			console.log('等しく無い遺伝子ですNO')
		}
	}
	
	
	window.document.onkeydown = sgroot.child.onKeyEvent;
	window.document.onkeyup = sgroot.child.upKeyEvent;

	var f = function() { loop(sgroot, sgroot.child.sg); }
	if(sgroot.think_count == 1){
		sgroot.timer = setInterval(f, $("select#game_speed").val());
	}else{
		sgroot.timer = setInterval(f, 1);
	}

}

function copyArray(arr){
	var newarr = new Array();
	for(var i = 0; i <arr.length; i++){
		newarr[i] = arr[i];
	}
	return newarr;
}


function compArray(a,b){
	var bool = true;
	if(a.length == b.length){
		for(i=0;i<a.length;i++){
			if(a[i] != b[i]){
				bool=false;
			}
		}
	}else{ 
		bool = false; 
	}
	return bool;
}

/* 
* This function is reading image from url.
* @ctx: context object.
* @url: locate image url.
*/
SceneGraph.prototype.readImage = function(ctx, url){
// create Image object.
var img = new Image();

// set rul img.src.
img.src = url;

// return Image object.
return img;
}


/*
* This function is output image from obj.
* @ctx: context object.
* @obj: Image Object.
*/

SceneGraph.prototype.outImage = function(ctx, obj){
$("canvas").drawImage({
source: obj.img,
x: obj.x, y: obj.y,
width: obj.size,
height: obj.size,
fromCenter: true
});
//ctx.drawImage(obj.img, obj.x, obj.y, obj.size, obj.size);	
}


/*
* This function is Battle main scene.
* @sgroot: SceneGraphRoot object.
*/

function ShootingScene(sgroot){
}


/*
* This function is initialize battle scene
* @sgroot: SceneGraphRoot object.
* @player: player object.
* @enemy: enemy object.
*
* return value: SceneGraph object.
*/

ShootingScene.prototype.initShootingScene = function(sgroot){
	var sg = new SceneGraph(); 
	
	// create player object.
	var player = new Object();
	player.x = sgroot.w / 2.0;
	player.y = sgroot.h * 0.9;
	player.speed = 10;
	player.sizes = 15;
	
	var enemys = new Array();
	sg.enemy_num = enemys.length;
	
	sg.enemys = enemys;
	
	var player_bullets = new Array();
	sg.player_bullets = player_bullets;
	
	var enemy_bullets = new Array();
	sg.enemy_bullets = enemy_bullets;
	
	sg.player = player;
	return sg
}

/*
* This function animation attack move.
* @sg: SceneGraph object.
* @my: moveing object.
* @x: destination point x.
* @y: destination point y.
*/
ShootingScene.prototype.attackMove = function(sg, my, x, y){

}


/*
* This function return move of character object.
* @sg: SceneGraph object.
* @my: moving object.
* @x: destination point x.
* @y: destination point y.
*/
ShootingScene.prototype.returnMove = function(sg, my, x, y){
 
}

ShootingScene.prototype.CreateEnemy = function(sgroot, x, y, size, type, hp){
	var enemy = new Object();
	enemy.x = x;
	enemy.y = y; 
	enemy.sizes = size;
	enemy.frame = 0;
	enemy.move_type = type;
	enemy.speed = 3;
	enemy.hp = hp;
	
	
	return enemy;
}

ShootingScene.prototype.shotBullet = function(sgroot, obj, speed_x, speed_y){
	var bullet = new Object();
	bullet.x = obj.x + obj.sizes / 2.0;
	bullet.y = obj.y;
	bullet.speed_x = speed_x;
	bullet.speed_y = speed_y;
	bullet.sizes = 3;
	
	return bullet;
}



/*
* This function is display player lose.
* @sgroot: SceneGraphRoot object.
* @sg: SceneGraph object.
*/
ShootingScene.prototype.resultLose = function(sgroot, sg){

}


/* 
* This function is check flag and select scene.
* @sgroot: SceneGraphRoot object.
* @sg: SceneGraph object.
*/
ShootingScene.prototype.selectScene = function(sgroot, sg){

}

/*
* This function is check collision.
* @sgroot: SceneGraphRoot object.
* @sg: SceneGraph object.
*/
ShootingScene.prototype.collisionCharacter = function(sgroot, sg){
}

/* 
* This function is drawing screen.
* @sgroot: SceneGraphRoot object.
* @sg: SceneGraph object.
*/
ShootingScene.prototype.drawScreen = function(sgroot, sg){

// draw game scree.
$("#canvas").drawRect({
  strokeStyle: "#36a",
  strokeWidth: 1,
  x: sgroot.field_start_x, y: sgroot.field_start_y,
  width: sgroot.w,
  height: sgroot.h,
	fromCenter: false
});


}

ShootingScene.prototype.drawPlayer = function(sgroot, sg){
	// Draw a black semicircle
	$("#canvas").drawArc({
	  fillStyle: "red",
	  x: sg.player.x, y: sg.player.y,
	  radius: sg.player.sizes,
	  start: 0, end: Math.PI * 2.0,
	  ccw: true,
	  inDegrees: false,
		fromCenter: false
	});
}

ShootingScene.prototype.drawEnemy = function(sgroot, sg){
	for( var num in sg.enemys ){
		$("#canvas").drawArc({
		  fillStyle: "blue",
		  x: sg.enemys[num].x, y: sg.enemys[num].y,
		  radius: sg.enemys[num].sizes,
		  start: 0, end: Math.PI * 2.0,
		  ccw: true,
		  inDegrees: false,
			fromCenter: false
		});
	}
}

ShootingScene.prototype.drawBullet = function(sgroot, sg){
	for( var num in sg.player_bullets ){
		$("#canvas").drawArc({
		  fillStyle: "black",
		  x: sg.player_bullets[num].x, y: sg.player_bullets[num].y,
		  radius: sg.player_bullets[num].sizes,
		  start: 0, end: Math.PI * 2.0,
		  ccw: true,
		  inDegrees: false,
			fromCenter: false
		});
	}
	
	for( var num in sg.enemy_bullets ){
		$("#canvas").drawArc({
		  fillStyle: "black",
		  x: sg.enemy_bullets[num].x, y: sg.enemy_bullets[num].y,
		  radius: sg.enemy_bullets[num].sizes,
		  start: 0, end: Math.PI * 2.0,
		  ccw: true,
		  inDegrees: false,
			fromCenter: false
		});
	}
}

var currentlyPressedKeys = Object();
var start_flag = false;

function onClick (e) {
		var rect = e.target.getBoundingClientRect();
		var x = e.clientX - rect.left;
		var y = e.clientY - rect.top;

		console.log(x)
		console.log(y)
		if(125 <= x && x <= 510 && 290 <= y && y <= 340){
			start_flag = true;
		}
}

ShootingScene.prototype.moveBullet = function(sgroot, sg){
	for( var num in sg.player_bullets ){
		sg.player_bullets[num].x += sg.player_bullets[num].speed_x;
		sg.player_bullets[num].y += sg.player_bullets[num].speed_y;
		if(sg.player_bullets[num].x < 0 || sg.player_bullets.x > sgroot.w){
			sg.player_bullets.splice(num, 1);
			sgroot.eval -= 5;
		}else if(sg.player_bullets[num].y < 0 || sg.player_bullets[num].y > sgroot.h){
			sg.player_bullets.splice(num, 1);
			sgroot.eval -= 5;
		}
	}
	
	for( var num in sg.enemy_bullets ){
		sg.enemy_bullets[num].x += sg.enemy_bullets[num].speed_x;
		sg.enemy_bullets[num].y += sg.enemy_bullets[num].speed_y;
		if(sg.enemy_bullets[num].x < 0 || sg.enemy_bullets.x > sgroot.w){
			sg.enemy_bullets.splice(num, 1);
		}else if(sg.enemy_bullets[num].y < 0 || sg.enemy_bullets[num].y > sgroot.h){
			sg.enemy_bullets.splice(num, 1);
		}
	}
}

ShootingScene.prototype.movePlayer = function(sgroot, sg){
	x = sg.player.x;
	y = sg.player.y;
	
	if(currentlyPressedKeys[13]){
		sg.auto_move[sg.frame] = 0;
		sg.player_bullets.push(sgroot.child.shotBullet(sgroot, sg.player, 0, -10));
		sgroot.player_move = true;
	}
	
	if(currentlyPressedKeys[65] && x-sg.player.sizes >= sgroot.field_start_x){
		sg.auto_move[sg.frame] = 1;
		sg.player.x -= sg.player.speed;
		sgroot.player_move = true;
	}
	
	if(currentlyPressedKeys[68] && x+sg.player.sizes * 2<= sgroot.w){
		sg.auto_move[sg.frame] = 2;
		sg.player.x += sg.player.speed;
		sgroot.player_move = true;
	}
	
	if(currentlyPressedKeys[83] && y+sg.player.sizes * 2 <= sgroot.h){
		sg.auto_move[sg.frame] = 3;
		sg.player.y += sg.player.speed;
		sgroot.player_move = true;
	}
	
	if(currentlyPressedKeys[87] && y-sg.player.sizes >= sgroot.field_start_y){
		sg.auto_move[sg.frame] = 4;
		sg.player.y -= sg.player.speed;
		sgroot.player_move = true;
	}
	
	if(currentlyPressedKeys[13] && currentlyPressedKeys[65] && x-sg.player.sizes >= sgroot.field_start_x){
		sg.auto_move[sg.frame] = 5;
		sg.player_bullets.push(sgroot.child.shotBullet(sgroot, sg.player, 0, -10));
		sg.player.x -= sg.player.speed;
		sgroot.player_move = true;
	}
	
	if(currentlyPressedKeys[13] && currentlyPressedKeys[68] && x+sg.player.sizes * 2<= sgroot.w){
		sg.auto_move[sg.frame] = 6;
		sg.player_bullets.push(sgroot.child.shotBullet(sgroot, sg.player, 0, -10));
		sg.player.x += sg.player.speed;
		sgroot.player_move = true;
	}
	
	if(currentlyPressedKeys[13] && currentlyPressedKeys[83] && y+sg.player.sizes * 2 <= sgroot.h){
		sg.auto_move[sg.frame] = 7;
		sg.player_bullets.push(sgroot.child.shotBullet(sgroot, sg.player, 0, -10));
		sg.player.y += sg.player.speed;
		sgroot.player_move = true;
	}
	
	if(currentlyPressedKeys[13] && currentlyPressedKeys[87] && y-sg.player.sizes >= sgroot.field_start_y){
		sg.auto_move[sg.frame] = 8;
		sg.player_bullets.push(sgroot.child.shotBullet(sgroot, sg.player, 0, -10));
		sg.player.y -= sg.player.speed;
		sgroot.player_move = true;
	}
	
	if(currentlyPressedKeys[65] && x-sg.player.sizes >= sgroot.field_start_x && currentlyPressedKeys[83] && y+sg.player.sizes * 2 <= sgroot.h){
		sg.auto_move[sg.frame] = 9;
		sg.player.x -= sg.player.speed;
		sg.player.y += sg.player.speed;
		sgroot.player_move = true;
	}
	
	if(currentlyPressedKeys[65] && x-sg.player.sizes >= sgroot.field_start_x && currentlyPressedKeys[87] && y-sg.player.sizes >= sgroot.field_start_y){
		sg.auto_move[sg.frame] = 10;
		sg.player.x -= sg.player.speed;
		sg.player.y -= sg.player.speed;
		sgroot.player_move = true;
	}
	
	if(currentlyPressedKeys[68] && x+sg.player.sizes * 2 <= sgroot.w && currentlyPressedKeys[87] && y-sg.player.sizes >= sgroot.field_start_y){
		sg.auto_move[sg.frame] = 11;
		sg.player.x += sg.player.speed;
		sg.player.y -= sg.player.speed;
		sgroot.player_move = true;
	}
	
	if(currentlyPressedKeys[68] && x+sg.player.sizes * 2 <= sgroot.w && currentlyPressedKeys[83] && y+sg.player.sizes * 2 <= sgroot.h){
		sg.auto_move[sg.frame] = 12;
		sg.player.x += sg.player.speed;
		sg.player.y += sg.player.speed;
		sgroot.player_move = true;
	}
	
	if(currentlyPressedKeys[13] && currentlyPressedKeys[65] && x-sg.player.sizes >= sgroot.field_start_x && currentlyPressedKeys[83] && y+sg.player.sizes * 2 <= sgroot.h){
		sg.auto_move[sg.frame] = 13;
		sg.player.x -= sg.player.speed;
		sg.player.y += sg.player.speed;
		sgroot.player_move = true;
	}
	
	if(currentlyPressedKeys[13] && currentlyPressedKeys[65] && x-sg.player.sizes >= sgroot.field_start_x && currentlyPressedKeys[87] && y-sg.player.sizes >= sgroot.field_start_y){
		sg.auto_move[sg.frame] = 14;
		sg.player.x -= sg.player.speed;
		sg.player.y -= sg.player.speed;
		sgroot.player_move = true;
	}
	
	if(currentlyPressedKeys[13] && currentlyPressedKeys[68] && x+sg.player.sizes * 2 <= sgroot.w && currentlyPressedKeys[83] && y+sg.player.sizes * 2 <= sgroot.h){
		sg.auto_move[sg.frame] = 15;
		sg.player.x += sg.player.speed;
		sg.player.y += sg.player.speed;
		sgroot.player_move = true;
	}
	
	if(currentlyPressedKeys[13] && currentlyPressedKeys[68] && x+sg.player.sizes * 2 <= sgroot.w && currentlyPressedKeys[87] && y-sg.player.sizes >= sgroot.field_start_y ){
		sg.auto_move[sg.frame] = 16;
		sg.player.x += sg.player.speed;
		sg.player.y -= sg.player.speed;
		sgroot.player_move = true;
	}
}

ShootingScene.prototype.moveAuto = function(sgroot, sg){
	x = sg.player.x;
	y = sg.player.y;
	
	switch (sg.auto_move[sg.frame]){
		case 0:
		sg.player_bullets.push(sgroot.child.shotBullet(sgroot, sg.player, 0, -10));
		break;
		case 1:
		if(x-sg.player.sizes >= sgroot.field_start_x){
			sg.player.x -= sg.player.speed;
		}
		break;
		case 2:
		if(x+sg.player.sizes * 2<= sgroot.w){
			sg.player.x += sg.player.speed;
		}
		break;
		case 3:
		if(y+sg.player.sizes * 2 <= sgroot.h){
			sg.player.y += sg.player.speed;
		}
		break;
		case 4:
		if(y-sg.player.sizes >= sgroot.field_start_y){
			sg.player.y -= sg.player.speed;
		}
		break;
		case 5:
		sg.player_bullets.push(sgroot.child.shotBullet(sgroot, sg.player, 0, -10));
		if(x-sg.player.sizes >= sgroot.field_start_x){
			sg.player.x -= sg.player.speed;
		}
		break;
		case 6:
		sg.player_bullets.push(sgroot.child.shotBullet(sgroot, sg.player, 0, -10));
		if(x+sg.player.sizes * 2<= sgroot.w){
			sg.player.x += sg.player.speed;
		}
		break;
		case 7:
		sg.player_bullets.push(sgroot.child.shotBullet(sgroot, sg.player, 0, -10));
		if(y+sg.player.sizes * 2 <= sgroot.h){
			sg.player.y += sg.player.speed;
		}
		break;
		case 8:
		sg.player_bullets.push(sgroot.child.shotBullet(sgroot, sg.player, 0, -10));
		if(y-sg.player.sizes >= sgroot.field_start_y){
			sg.player.y -= sg.player.speed;
		}
		case 9:
		
		if(x-sg.player.sizes >= sgroot.field_start_x){
			sg.player.x -= sg.player.speed;
		}
		if(y+sg.player.sizes * 2 <= sgroot.h){
			sg.player.y += sg.player.speed;
		}
		break;
		case 10:
		
		if(x-sg.player.sizes >= sgroot.field_start_x){
			sg.player.x -= sg.player.speed;
		}
		if(y-sg.player.sizes >= sgroot.field_start_y){
			sg.player.y -= sg.player.speed;
		}
		break;
		case 11:
		if(x+sg.player.sizes * 2<= sgroot.w){
			sg.player.x += sg.player.speed;
		}
		if(y+sg.player.sizes * 2 <= sgroot.h){
			sg.player.y += sg.player.speed;
		}
		break;
		case 12:
		if(x+sg.player.sizes * 2<= sgroot.w){
			sg.player.x += sg.player.speed;
		}
		if(y-sg.player.sizes >= sgroot.field_start_y){
			sg.player.y -= sg.player.speed;
		}
		break;
		case 13:
		sg.player_bullets.push(sgroot.child.shotBullet(sgroot, sg.player, 0, -10));
		if(x-sg.player.sizes >= sgroot.field_start_x){
			sg.player.x -= sg.player.speed;
		}
		if(y+sg.player.sizes * 2 <= sgroot.h){
			sg.player.y += sg.player.speed;
		}
		break;
		case 14:
		sg.player_bullets.push(sgroot.child.shotBullet(sgroot, sg.player, 0, -10));
		if(x-sg.player.sizes >= sgroot.field_start_x){
			sg.player.x -= sg.player.speed;
		}
		if(y-sg.player.sizes >= sgroot.field_start_y){
			sg.player.y -= sg.player.speed;
		}
		break;
		case 15:
		sg.player_bullets.push(sgroot.child.shotBullet(sgroot, sg.player, 0, -10));
		if(x+sg.player.sizes * 2<= sgroot.w){
			sg.player.x += sg.player.speed;
		}
		if(y+sg.player.sizes * 2 <= sgroot.h){
			sg.player.y += sg.player.speed;
		}
		break;
		case 16:
		sg.player_bullets.push(sgroot.child.shotBullet(sgroot, sg.player, 0, -10));
		if(x+sg.player.sizes * 2<= sgroot.w){
			sg.player.x += sg.player.speed;
		}
		if(y-sg.player.sizes >= sgroot.field_start_y){
			sg.player.y -= sg.player.speed;
		}
		break;
		case 17:
		// no move
		break;
		default:
		// no move
		break;
	}
}

ShootingScene.prototype.moveEnemy = function(sgroot, sg){
	for(var num in sg.enemys){
		switch (sg.enemys[num].move_type){
			case 1:
			sgroot.child.enemyMoveType1(sg.enemys[num], sgroot, sg);
			break;
			case 2:
			sgroot.child.enemyMoveType2(sg.enemys[num], sgroot, sg);
			break;
			case 3:
			sgroot.child.enemyMoveType3(sg.enemys[num], sgroot, sg);
			break;
			default:
			break;
		}
		sg.enemys[num].frame += 1;
		if(sg.enemys[num].x < 0 || sg.enemys.x > sgroot.w){
			sg.enemys.splice(num, 1);
		}else if(sg.enemys[num].y < 0 || sg.enemys[num].y > sgroot.h){
			sg.enemys.splice(num, 1);
		}
	}
}

ShootingScene.prototype.enemyCollision = function(sgroot, sg){
	for( var num in sg.enemys ){
		var dist_x = sg.player.x - sg.enemys[num].x; 
		var dist_y = sg.player.y - sg.enemys[num].y; 
		var z = Math.pow(dist_x, 2) + Math.pow(dist_y, 2);
		var dist = Math.sqrt(z);

		if(dist <= sg.player.sizes + sg.enemys[num].sizes){
			//console.log('OUT');
			sgroot.eval -= 500;
			if(sgroot.think_count == 1){
				//restartEvolution(sgroot, sg);
				sgroot.loop_flag = true;
			}else{
				sgroot.loop_flag = true;
			}
			//return true;
		}
	}
}

ShootingScene.prototype.enemyBulletCollision = function(sgroot, sg){
	for( var n in sg.enemy_bullets ){
		var dist_x = sg.enemy_bullets[n].x - sg.player.x; 
		var dist_y = sg.enemy_bullets[n].y - sg.player.y; 
		var z = Math.pow(dist_x, 2) + Math.pow(dist_y, 2);
		var dist = Math.sqrt(z);

		if(dist <= sg.enemy_bullets[n].sizes + sg.player.sizes){
			//console.log('GAME OVER');
			if(sgroot.think_count == 1){
				//restartEvolution(sgroot, sg);
				sgroot.loop_flag = true;
			}else{
				sgroot.loop_flag = true;
			}
			//return true;
			break;
		}
	}
}

ShootingScene.prototype.enemyBulletGuidedShot = function(sgroot, sg, obj){
	var bullet = new Object();
	bullet.x = obj.x + obj.sizes / 2.0;
	bullet.y = obj.y;
	bullet.speed_x = (sg.player.x - obj.x) / 100;
	bullet.speed_y = (sg.player.y - obj.y) / 100;
	bullet.sizes = 5;
	
	return bullet;
	
}


ShootingScene.prototype.enemyBulletSpreadShot = function(sgroot, sg, obj){
	for( var num = 0; num < 18; num++){
		var sin = Math.sin(num * 20 * (Math.PI / 180));
		var cos = Math.cos(num * 20 * (Math.PI / 180));
		var bullet = new Object();
		bullet.x = obj.x + obj.sizes / 2.0;
		bullet.y = obj.y;
		bullet.speed_x = sin * 2;
		bullet.speed_y = cos * 2;
		bullet.sizes = 5;
		sg.enemy_bullets.push(bullet);
	}
}

ShootingScene.prototype.enemyBulletSpreadShot2 = function(sgroot, sg, obj){
	for( var num = 0; num < 18; num++){
		var sin = Math.sin(num * 20 * (Math.PI / 180) + Math.PI / 360 * 20);
		var cos = Math.cos(num * 20 * (Math.PI / 180) + Math.PI / 360 * 20);
		var bullet = new Object();
		bullet.x = obj.x + obj.sizes / 2.0;
		bullet.y = obj.y;
		bullet.speed_x = sin * 2;
		bullet.speed_y = cos * 2;
		bullet.sizes = 5;
		sg.enemy_bullets.push(bullet);
	}
}


ShootingScene.prototype.playerBulletCollision = function(sgroot, sg){
	for( var num in sg.enemys ){
		for( var n in sg.player_bullets ){
			var dist_x = sg.player_bullets[n].x - sg.enemys[num].x; 
			var dist_y = sg.player_bullets[n].y - sg.enemys[num].y; 
			var z = Math.pow(dist_x, 2) + Math.pow(dist_y, 2);
			var dist = Math.sqrt(z);

			if(dist <= sg.player_bullets[n].sizes + sg.enemys[num].sizes){
				sg.enemys[num].hp -= 1;
				sgroot.eval += 10;
				sg.player_bullets.splice(n, 1);
				if(sg.enemys[num].hp <= 0){
					var bonus = 300 - sg.enemys[num].frame;
					if(bonus < 0){
						bonus = 0;
					}
					sgroot.eval = 50 + bonus;
					//console.log('HIT');
					sg.enemys.splice(num, 1);
					break;
				}
			}
		}
	}
}

ShootingScene.prototype.enemyScenario = function(sgroot, sg){
	if(sg.frame == 150){
		sg.enemys.push(sgroot.child.CreateEnemy(sgroot, 100, 20, 10, 1, 5)); // x, y, size, type, hp
		sg.enemys.push(sgroot.child.CreateEnemy(sgroot, 500, 20, 10, 1, 5));
	}
	
	if(sg.frame == 300){
		sg.enemys.push(sgroot.child.CreateEnemy(sgroot, 100, 20, 10, 1, 10));
		sg.enemys.push(sgroot.child.CreateEnemy(sgroot, 500, 20, 10, 1, 10));
	}
	
	if(sg.frame == 500){
		sg.enemys.push(sgroot.child.CreateEnemy(sgroot, 100, 20, 10, 2, 15));
		sg.enemys.push(sgroot.child.CreateEnemy(sgroot, 500, 20, 10, 2, 15));
	}
	
	if(sg.frame == 800){
		sg.enemys.push(sgroot.child.CreateEnemy(sgroot, 300, 20, 20, 3, 50));
	}
}


ShootingScene.prototype.enemyMoveType1 = function(my, sgroot, sg){
	if( my.frame > 50 && my.frame < 100 && my.frame % 10 == 0){
		sg.enemy_bullets.push(sgroot.child.enemyBulletGuidedShot(sgroot, sg, my));
	}else{
		my.y += my.speed;
	}
}

ShootingScene.prototype.enemyMoveType2 = function(my, sgroot, sg){
	if( my.frame == 50){
		sgroot.child.enemyBulletSpreadShot(sgroot, sg, my);
	}else if(my.frame >= 25 && my.frame <= 75){
		
	}else{
		my.y += my.speed;
	}
}

ShootingScene.prototype.enemyMoveType3 = function(my, sgroot, sg){
	if(my.frame >= 600){
		my.y += my.speed;
	}else if(my.frame % 80 == 0 && my.frame >= 150){
		sgroot.child.enemyBulletSpreadShot(sgroot, sg, my);
	}else if(my.frame >= 150 && my.frame % 40 == 0){
		sgroot.child.enemyBulletSpreadShot2(sgroot, sg, my);
		//sg.enemy_bullets.push(sgroot.child.enemyBulletGuidedShot(sgroot, sg, my));
	}else if(my.frame <= 100){
		my.y += 1;
	}
}


ShootingScene.prototype.onKeyEvent = function(){
	currentlyPressedKeys[event.keyCode] = true;
}

ShootingScene.prototype.upKeyEvent = function(){
	currentlyPressedKeys[event.keyCode] = false;
}

ShootingScene.prototype.drawMenu = function(sgroot, sg){
	$("#canvas").clearCanvas();
	$("#canvas").drawRect({
	  strokeStyle: "#36a",
	  strokeWidth: 1,
	  x: sgroot.field_start_x, y: sgroot.field_start_y,
	  width: sgroot.w,
	  height: sgroot.h,
		fromCenter: false
	});
	
	$("canvas").drawText({
	  fillStyle: "#9cf",
	  strokeStyle: "#25a",
	  strokeWidth: 2,
	  x: sgroot.w * 0.5, y: sgroot.h * 0.5,
	  font: "28pt Verdana, sans-serif",
	  text: "画面を押してスタート"
	});
	
	if(start_flag){
		console.log('Game Start');
		sgroot.start_flag = true;
		sgroot.group_size = $("select#gene_num").val();
		sgroot.gene_group = new Array(sgroot.group_size);
		initGeneGroup(sgroot);
		sg.auto_move = copyArray(sgroot.gene_group[0]);
		sgroot.init_flag = false;
	}
}


/*
* This function is main loop.
*/
function loop(sgroot, sg){

	if(sg.frame < sgroot.gameTime && sgroot.start_flag){
		sg.mainLoop(sgroot, sg);
  }else if(sg.frame >= sgroot.gameTime && sgroot.start_flag){
		console.log('Game Clear')
		//startGame(sgroot);
		restartEvolution(sgroot, sg);
	}else if(sgroot.init_flag){
		sgroot.child.drawMenu(sgroot, sg);
	}
}

var clone = function(obj){
    var object = {};
    for(var i in obj){
        object[i] = obj[i];
    }
    return object;
}


function restartEvolution(sgroot, sg){
	//console.log('restart')
	if(sgroot.delete_flag){
		$("div#result").empty();
		sgroot.delete_flag = false;
	}
	sgroot.eval = sg.frame * 5;
	sgroot.eval_list[sgroot.think_count-1] = parseInt(sgroot.eval);
	
	if(sgroot.sub_gene.length > 0){
		if(sg.auto_move.length < 1){
			console.log('なぜかサイズが0です')
		}
		if(compArray(sg.auto_move, sgroot.sub_gene)){
			console.log('まだ等しいですOKOK' + ' ' + sgroot.eval);
		}else{
			console.log('等しい遺伝子ではありませんNONO')
		}
	}
	
		if(sgroot.eval_list[sgroot.think_count-1] == sgroot.best_value){
			//console.log('等しい評価値です');
			//console.log(sgroot.eval_list[sgroot.think_count-1] + ' = ' + sgroot.eval)
		}else{
			//console.log('等しくない評価値です');
			//console.log(sgroot.eval_list[sgroot.think_count-1] + ' = ' + sgroot.best_value)
		}
	
	
	

	$("div#result").append('<p>' + sgroot.generation + '世代  ' + sgroot.think_count + '回目： 評価値' + sgroot.eval + '\n' + '</p>');

	if(sgroot.best_value < sgroot.eval){
		console.log(sgroot.think_count - 1)
		console.log(sgroot.eval_list)
		sgroot.sub_gene = copyArray(sg.auto_move);
		sgroot.best_value = sgroot.eval;
		$("div#best_gene").empty();
		$("div#best_gene").append("<p>現在の最高評価値は" + sgroot.best_value + "です [ " + sgroot.generation + "世代 " + sgroot.think_count + "回目 ]</p>");
	}
		
	if(sgroot.think_count == sgroot.group_size){
		delete sgroot.child;
		sgroot.eval = 0;
		clearInterval(sgroot.timer);
		sgroot.first_flag = true;
		sgroot.think_count = 0;
		sgroot.generation += 1;
		sgroot.delete_flag = true;
		alterGeneration(sgroot, sg);
	}else{
		sgroot.first_flag = false;
		delete sgroot.child;
		sgroot.eval = 0;
		clearInterval(sgroot.timer);
		startGame(sgroot);
	}
}

function alterGeneration(sgroot, sg){
	//console.log(sgroot.eval_list)
	geneSelect(sgroot, sg);
	geneMutation(sgroot, sg);
	sgroot.gene_group[0] = copyArray(sgroot.sub_gene);
	startGame(sgroot);
}

function geneCross(sgroot, sg, parent1, parent2, point){
	var main_parent = copyArray(sgroot.gene_group[parent1]);
	var sub_parent = copyArray(sgroot.gene_group[parent2]);
	var new_child = new Array();
	
	for(var index = 0; index < sgroot.gameTime; index++){
		if(index < point){
			new_child[index] = main_parent[index];
		}else{
			new_child[index] = sub_parent[index];
		}
	}

	return new_child;
}

function geneDoubleCross(sgroot, sg, parent1, parent2, point1, point2){
	var main_parent = copyArray(sgroot.gene_group[parent1]);
	var sub_parent = copyArray(sgroot.gene_group[parent2]);
	var new_child = new Array();
	
	for(var index = 0; index < sgroot.gameTime; index++){
		if(index < point1 && point2 < index){
			new_child[index] = main_parent[index];
		}else{
			new_child[index] = sub_parent[index];
		}
	}

	return new_child;
}

function rankingSelect(sgroot, sg){

}

function rankingList(ranking_list, value){
	var new_ranking = new Array();
	for(var num in ranking_list){
		if(value > sgroot.eval_list[ranking_list[num]]){
			for(var i = num; i < 9; i++){
				new_ranking[num+1] = ranking_list[num];
			}
			new_ranking[num] = num;
			break;
		}
	}
	return new_ranking;
}

function geneSelect(sgroot, sg){
	var ranking = 0;
	var ranking_list = new Array(9);
	var rank_value = [ 40, 20, 15, 10, 5, 4, 3, 2, 1]
	var number = 0;
	var index = 0;
	var sum_value = 0;
	var best_gene = 0;
	var best_value = 0;
	var next_gene = new Array(sgroot.group_size);
	
	for(var value = 0; value < sgroot.eval_list.length; value++){
		//raking_list = rankingList(ranking_list, sgroot.eval_list[value]);
	}
	//console.log(ranking_list);
	
	for(var value = 0; value < sgroot.eval_list.length; value++){
		if(best_value < sgroot.eval_list[value]){
			best_value = sgroot.eval_list[value];
			best_gene = value;
		}
		if(sgroot.eval_list[value] <= 0){
			sgroot.eval_list[value] = 0;
		}
		sum_value += sgroot.eval_list[value];
	}
	var roulette = new Array(sum_value);
	
	for(var value = 0; value < sgroot.eval_list.length; value++){
		for(var num = 0; num < sgroot.eval_list[value]; num++){
			roulette[num+index] = number;
		}
		index += sgroot.eval_list[number];
		number++;
	}
	
	var parent1 = 0;
	var parent2 = 0;
	
	for(var count = 0; count < sgroot.group_size / 2; count++){
		while(true){
			var val1 = Math.floor(Math.random() * sum_value);
			var val2 = Math.floor(Math.random() * sum_value);
			parent1 = roulette[val1];
			parent2 = roulette[val2];
			if(parent1 != parent2){
				break;
			}
		}
		
		var rand = Math.floor(Math.random() * sgroot.gameTime);
		var point1 = Math.floor(Math.random() * sgroot.gameTime / 2);
		var point2 = Math.floor(Math.random() * sgroot.gameTime / 2 + sgroot.gameTime / 2);
		
		if($("select#cross_type").val() == 1){
			next_gene[count*2] = geneCross(sgroot, sg, parent1, parent2, rand);
			next_gene[count*2+1] = geneCross(sgroot, sg, parent2, parent1, rand);
		}else if($("select#cross_type").val() == 2){
			next_gene[count*2] = geneDoubleCross(sgroot, sg, parent1, parent2, point1, point2);
			next_gene[count*2+1] = geneDoubleCross(sgroot, sg, parent2, parent1, point1, point2);
		}
	}

	sgroot.gene_group = copyArray(next_gene);	
}

function geneMutation(sgroot, sg){
	var mute_rate = $("select#mute_rate").val();
	for(var num in sgroot.gene_group){
		var rand = Math.floor(Math.random() * 100 + 1);
		if(mute_rate >= rand){
			for(var i = 0; i < sgroot.gameTime * ($("select#change_rate").val()/100); i++){
				var index = Math.floor(Math.random() * sgroot.gameTime);
				sgroot.gene_group[num][index] = Math.floor(Math.random() * 18);
			}
		}
	}
}