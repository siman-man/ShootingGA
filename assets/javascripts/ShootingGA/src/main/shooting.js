/*
* This function is game start scene.
* @sgroot: SceneGraphRoot object.
*/

var currentlyPressedKeys = Object();
var start_flag = false;
var finish_flag = false;
var restart_flag = false;


function startGame(sgroot){
	sgroot.think_count += 1;
	sgroot.loop_flag = false;
	sgroot.child = new ShootingScene(sgroot);
	sgroot.child.sg = sgroot.child.initShootingScene(sgroot);
	sgroot.child.sg.auto_move = new Array();

	if(!sgroot.init_flag){
		sgroot.child.sg.auto_move = copyArray(sgroot.gene_group[sgroot.think_count-1]);
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


ShootingScene.prototype.CreateEnemy = function(sgroot, x, y, size, type, hp, color){
	var enemy = new Object();
	enemy.x = x;
	enemy.y = y; 
	enemy.sizes = size;
	enemy.frame = 0;
	enemy.move_type = type;
	enemy.speed = 3;
	enemy.hp = hp;
	enemy.color = color || "blue";
	
	return enemy;
}


ShootingScene.prototype.shotBullet = function(sgroot, obj, speed_x, speed_y, color){
	var bullet = new Object();
	bullet.x = obj.x + obj.sizes / 2.0;
	bullet.y = obj.y;
	bullet.speed_x = speed_x;
	bullet.speed_y = speed_y;
	bullet.sizes = 3;
	bullet.color = color || "#f63";
	
	return bullet;
}


/*
* This function is display result screen.
* @sgroot: SceneGraphRoot object.
* @sg: SceneGraph object.
*/
ShootingScene.prototype.resultScreen = function(sgroot, sg){

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
  	x: sgroot.start_field_x, y: sgroot.start_field_y,
  	width: sgroot.w,
  	height: sgroot.h,
		fromCenter: false
	});
}


ShootingScene.prototype.drawPlayer = function(sgroot, player){
	// Draw a black semicircle
	$("#canvas").drawArc({
	  fillStyle: "#191970",
	  x: player.x, y: player.y,
	  radius: player.sizes,
	  start: 0, end: Math.PI * 2.0,
	  ccw: true,
	  inDegrees: false,
		fromCenter: false
	});
}


ShootingScene.prototype.drawEnemy = function(sgroot, enemys){
	for( var num in enemys ){
		$("#canvas").drawArc({
		  fillStyle: enemys[num].color,
		  x: enemys[num].x, y: enemys[num].y,
		  radius: enemys[num].sizes,
		  start: 0, end: Math.PI * 2.0,
		  ccw: true,
		  inDegrees: false,
			fromCenter: false
		});
	}
}


ShootingScene.prototype.drawBullet = function(sgroot, bullets){
	for( var num in bullets ){
		$("#canvas").drawArc({
		  fillStyle: bullets[num].color,
		  x: bullets[num].x, y: bullets[num].y,
		  radius: bullets[num].sizes,
		  start: 0, end: Math.PI * 2.0,
		  ccw: true,
		  inDegrees: false,
			fromCenter: false
		});
	}
}


function onClick (e) {
	var rect = e.target.getBoundingClientRect();
	var x = e.clientX - rect.left;
	var y = e.clientY - rect.top;

	if(125 <= x && x <= 510 && 290 <= y && y <= 340){
		start_flag = true;
		if(!restart_flag && finish_flag){
			restart_flag = true;
			finish_flag = false;
		}
	}
}

ShootingScene.prototype.moveBullet = function(sgroot, bullets){
	for( var num in bullets ){
		bullets[num].x += bullets[num].speed_x;
		bullets[num].y += bullets[num].speed_y;
		if(bullets[num].x < sgroot.start_field_x || bullets[num].x > sgroot.w){
			bullets.splice(num, 1);
		}else if(bullets[num].y < sgroot.start_field_y || bullets[num].y > sgroot.h){
			bullets.splice(num, 1);
		}
	}
}

ShootingScene.prototype.movePlayer = function(sgroot, sg){
	var x = sg.player.x;
	var y = sg.player.y;
	var base_x = (sgroot.w - sgroot.start_field_x)/2;

	sgroot.eval -= Math.floor(Math.abs(base_x - x) / 100);
	
	if(currentlyPressedKeys[13]){
		if(sgroot.think_count == 1) {
			sgroot.player_move = true;
			sg.auto_move[sg.frame] = 0;
		}
		sg.player_bullets.push(sgroot.child.shotBullet(sgroot, sg.player, 0, -10, "orange"));
	}
	
	if(currentlyPressedKeys[65] && x-sg.player.sizes >= sgroot.start_field_x){
		if(sgroot.think_count == 1) {
			sgroot.player_move = true;
			sg.auto_move[sg.frame] = 1;
		}
		sg.player.x -= sg.player.speed;
	}
	
	if(currentlyPressedKeys[68] && x+sg.player.sizes * 2<= sgroot.w){
		if(sgroot.think_count == 1) {
			sgroot.player_move = true;
			sg.auto_move[sg.frame] = 2;
		}
		sg.player.x += sg.player.speed;
	}
	
	if(currentlyPressedKeys[83] && y+sg.player.sizes * 2 <= sgroot.h){
		if(sgroot.think_count == 1) {
			sgroot.player_move = true;
			sg.auto_move[sg.frame] = 3;
		}
		sg.player.y += sg.player.speed;
	}
	
	if(currentlyPressedKeys[87] && y-sg.player.sizes >= sgroot.start_field_y){
		if(sgroot.think_count == 1) {
			sgroot.player_move = true;
			sg.auto_move[sg.frame] = 4;
		}
		sg.player.y -= sg.player.speed;
	}
	
	if(currentlyPressedKeys[13] && currentlyPressedKeys[65] && x-sg.player.sizes >= sgroot.start_field_x){
		if(sgroot.think_count == 1) {
			sgroot.player_move = true;
			sg.auto_move[sg.frame] = 5;
		}
		sg.player_bullets.push(sgroot.child.shotBullet(sgroot, sg.player, 0, -10));
		sg.player.x -= sg.player.speed;
	}
	
	if(currentlyPressedKeys[13] && currentlyPressedKeys[68] && x+sg.player.sizes * 2<= sgroot.w){
		if(sgroot.think_count == 1) {
			sgroot.player_move = true;
			sg.auto_move[sg.frame] = 6;
		}		
		sg.player_bullets.push(sgroot.child.shotBullet(sgroot, sg.player, 0, -10));
		sg.player.x += sg.player.speed;
	}
	
	if(currentlyPressedKeys[13] && currentlyPressedKeys[83] && y+sg.player.sizes * 2 <= sgroot.h){
		if(sgroot.think_count == 1) {
			sgroot.player_move = true;
			sg.auto_move[sg.frame] = 7;
		}
		sg.player_bullets.push(sgroot.child.shotBullet(sgroot, sg.player, 0, -10));
		sg.player.y += sg.player.speed;
	}
	
	if(currentlyPressedKeys[13] && currentlyPressedKeys[87] && y-sg.player.sizes >= sgroot.start_field_y){
		if(sgroot.think_count == 1) {
			sgroot.player_move = true;
			sg.auto_move[sg.frame] = 8;
		}
		sg.player_bullets.push(sgroot.child.shotBullet(sgroot, sg.player, 0, -10));
		sg.player.y -= sg.player.speed;
	}
	
	if(currentlyPressedKeys[65] && x-sg.player.sizes >= sgroot.start_field_x && currentlyPressedKeys[83] && y+sg.player.sizes * 2 <= sgroot.h){
		if(sgroot.think_count == 1) {
			sgroot.player_move = true;
			sg.auto_move[sg.frame] = 9;
		}
		sg.player.x -= sg.player.speed;
		sg.player.y += sg.player.speed;
	}
	
	if(currentlyPressedKeys[65] && x-sg.player.sizes >= sgroot.start_field_x && currentlyPressedKeys[87] && y-sg.player.sizes >= sgroot.start_field_y){
		if(sgroot.think_count == 1) {
			sgroot.player_move = true;
			sg.auto_move[sg.frame] = 10;
		}
		sg.player.x -= sg.player.speed;
		sg.player.y -= sg.player.speed;
	}
	
	if(currentlyPressedKeys[68] && x+sg.player.sizes * 2 <= sgroot.w && currentlyPressedKeys[87] && y-sg.player.sizes >= sgroot.start_field_y){
		if(sgroot.think_count == 1) {
			sgroot.player_move = true;
			sg.auto_move[sg.frame] = 11;
		}
		sg.player.x += sg.player.speed;
		sg.player.y -= sg.player.speed;
	}
	
	if(currentlyPressedKeys[68] && x+sg.player.sizes * 2 <= sgroot.w && currentlyPressedKeys[83] && y+sg.player.sizes * 2 <= sgroot.h){
		if(sgroot.think_count == 1) {
			sgroot.player_move = true;
			sg.auto_move[sg.frame] = 12;
		}
		sg.player.x += sg.player.speed;
		sg.player.y += sg.player.speed;
	}
	
	if(currentlyPressedKeys[13] && currentlyPressedKeys[65] && x-sg.player.sizes >= sgroot.start_field_x && currentlyPressedKeys[83] && y+sg.player.sizes * 2 <= sgroot.h){
		if(sgroot.think_count == 1){
			sg.auto_move[sg.frame] = 13;
			sgroot.player_move = true;
		} 
		sg.player.x -= sg.player.speed;
		sg.player.y += sg.player.speed;		
	}
	
	if(currentlyPressedKeys[13] && currentlyPressedKeys[65] && x-sg.player.sizes >= sgroot.start_field_x && currentlyPressedKeys[87] && y-sg.player.sizes >= sgroot.start_field_y){
		if(sgroot.think_count == 1){
			sg.auto_move[sg.frame] = 14;
			sgroot.player_move = true;
		} 
		sg.player.x -= sg.player.speed;
		sg.player.y -= sg.player.speed;
	}
	
	if(currentlyPressedKeys[13] && currentlyPressedKeys[68] && x+sg.player.sizes * 2 <= sgroot.w && currentlyPressedKeys[83] && y+sg.player.sizes * 2 <= sgroot.h){
		if(sgroot.think_count == 1) {
			sg.auto_move[sg.frame] = 15;
			sgroot.player_move = true;
		}
		sg.player.x += sg.player.speed;
		sg.player.y += sg.player.speed;
	}
	
	if(currentlyPressedKeys[13] && currentlyPressedKeys[68] && x+sg.player.sizes * 2 <= sgroot.w && currentlyPressedKeys[87] && y-sg.player.sizes >= sgroot.start_field_y ){
		if(sgroot.think_count == 1){
			sg.auto_move[sg.frame] = 16;
			sgroot.player_move = true;
		} 
		sg.player.x += sg.player.speed;
		sg.player.y -= sg.player.speed;
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
		if(x-sg.player.sizes >= sgroot.start_field_x){
			sg.player.x -= sg.player.speed;
		}
		break;
		case 2:
		if(x+sg.player.sizes * 2 <= sgroot.w){
			sg.player.x += sg.player.speed;
		}
		break;
		case 3:
		if(y+sg.player.sizes * 2 <= sgroot.h){
			sg.player.y += sg.player.speed;
		}
		break;
		case 4:
		if(y-sg.player.sizes >= sgroot.start_field_y){
			sg.player.y -= sg.player.speed;
		}
		break;
		case 5:
		sg.player_bullets.push(sgroot.child.shotBullet(sgroot, sg.player, 0, -10));
		if(x-sg.player.sizes >= sgroot.start_field_x){
			sg.player.x -= sg.player.speed;
		}
		break;
		case 6:
		sg.player_bullets.push(sgroot.child.shotBullet(sgroot, sg.player, 0, -10));
		if(x+sg.player.sizes * 2 <= sgroot.w){
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
		if(y-sg.player.sizes >= sgroot.start_field_y){
			sg.player.y -= sg.player.speed;
		}
		case 9:
		
		if(x-sg.player.sizes >= sgroot.start_field_x){
			sg.player.x -= sg.player.speed;
		}
		if(y+sg.player.sizes * 2 <= sgroot.h){
			sg.player.y += sg.player.speed;
		}
		break;
		case 10:
		if(x-sg.player.sizes >= sgroot.start_field_x){
			sg.player.x -= sg.player.speed;
		}
		if(y-sg.player.sizes >= sgroot.start_field_y){
			sg.player.y -= sg.player.speed;
		}
		break;
		case 11:
		if(x+sg.player.sizes * 2 <= sgroot.w){
			sg.player.x += sg.player.speed;
		}
		if(y+sg.player.sizes * 2 <= sgroot.h){
			sg.player.y += sg.player.speed;
		}
		break;
		case 12:
		if(x+sg.player.sizes * 2 <= sgroot.w){
			sg.player.x += sg.player.speed;
		}
		if(y-sg.player.sizes >= sgroot.start_field_y){
			sg.player.y -= sg.player.speed;
		}
		break;
		case 13:
		sg.player_bullets.push(sgroot.child.shotBullet(sgroot, sg.player, 0, -10));
		if(x-sg.player.sizes >= sgroot.start_field_x){
			sg.player.x -= sg.player.speed;
		}
		if(y+sg.player.sizes * 2 <= sgroot.h){
			sg.player.y += sg.player.speed;
		}
		break;
		case 14:
		sg.player_bullets.push(sgroot.child.shotBullet(sgroot, sg.player, 0, -10));
		if(x-sg.player.sizes >= sgroot.start_field_x){
			sg.player.x -= sg.player.speed;
		}
		if(y-sg.player.sizes >= sgroot.start_field_y){
			sg.player.y -= sg.player.speed;
		}
		break;
		case 15:
		sg.player_bullets.push(sgroot.child.shotBullet(sgroot, sg.player, 0, -10));
		if(x+sg.player.sizes * 2 <= sgroot.w){
			sg.player.x += sg.player.speed;
		}
		if(y+sg.player.sizes * 2 <= sgroot.h){
			sg.player.y += sg.player.speed;
		}
		break;
		case 16:
		sg.player_bullets.push(sgroot.child.shotBullet(sgroot, sg.player, 0, -10));
		if(x+sg.player.sizes * 2 <= sgroot.w){
			sg.player.x += sg.player.speed;
		}
		if(y-sg.player.sizes >= sgroot.start_field_y){
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
			case 4:
			sgroot.child.enemyMoveType4(sg.enemys[num], sgroot, sg);
			break;
			case 5:
			sgroot.child.enemyMoveType5(sg.enemys[num], sgroot, sg);
			break;
			case 6:
			sgroot.child.enemyMoveType6(sg.enemys[num], sgroot, sg);
			break;
			case 7:
			sgroot.child.enemyMoveType7(sg.enemys[num], sgroot, sg);
			break;
			case 8:
			sgroot.child.enemyMoveType8(sg.enemys[num], sgroot, sg);
			break;
			case 9:
			sgroot.child.enemyMoveType9(sg.enemys[num], sgroot, sg);
			break;
			default:
			break;
		}
		sg.enemys[num].frame += 1;
		if(sg.enemys[num].x < sgroot.start_field_x || sg.enemys[num].x  > sgroot.w){
			sg.enemys.splice(num, 1);
		}else if(sg.enemys[num].y < sgroot.start_field_y || sg.enemys[num].y > sgroot.h){
			sg.enemys.splice(num, 1);
		}
	}
}

function calculateDistance(obj1, obj2){
	var dist_x = obj1.x - obj2.x;
	var dist_y = obj1.y - obj2.y;
	var z = Math.pow(dist_x, 2) + Math.pow(dist_y, 2);
	var dist = Math.sqrt(z);
	
	return dist;
}


ShootingScene.prototype.enemyCollision = function(sgroot, sg){
	for( var num in sg.enemys ){
		var dist = calculateDistance(sg.player, sg.enemys[num])

		if(dist <= sg.player.sizes + sg.enemys[num].sizes){
			sgroot.eval -= 500;
			sgroot.loop_flag = true;	
			break;
		}
	}
}


ShootingScene.prototype.enemyBulletCollision = function(sgroot, sg){
	for( var n in sg.enemy_bullets ){
		var dist = calculateDistance(sg.enemy_bullets[n], sg.player);

		if(dist <= sg.enemy_bullets[n].sizes + sg.player.sizes){
			sgroot.loop_flag = true;
			break;
		}
	}
}


ShootingScene.prototype.enemyTargetShot = function(sgroot, sg, obj, x, y, speed, color){
	var bullet = new Object();
	var target = new Object();
	target.x = x;
	target.y = y;
	var dist_x = target.x - obj.x;
	var dist_y = target.y - obj.y;
	var dist = calculateDistance(target, obj);
	var speed = speed || 4;
	bullet.x = obj.x + obj.sizes / 2.0;
	bullet.y = obj.y;
	
	bullet.speed_x = speed * Math.cos((dist_x/dist) * Math.PI / 2 - Math.PI / 2);
	bullet.speed_y = speed * Math.sin((dist_y/dist) * Math.PI / 2);
	bullet.sizes = 5;
	bullet.color = color || "da0b00";
	
	return bullet;
}

ShootingScene.prototype.enemyBulletGuidedShot = function(sgroot, sg, obj, color){
	var bullet = new Object();
	var dist_x = sg.player.x - obj.x;
	var dist_y = sg.player.y - obj.y;
	var dist = calculateDistance(sg.player, obj);
	var speed = 4;
	bullet.x = obj.x + obj.sizes / 2.0;
	bullet.y = obj.y;
	
	bullet.speed_x = speed * Math.cos((dist_x/dist) * Math.PI / 2 - Math.PI / 2);
	bullet.speed_y = speed * Math.sin((dist_y/dist) * Math.PI / 2);
	bullet.sizes = 5;
	bullet.color = color || "da0b00";
	
	return bullet;
}


ShootingScene.prototype.odd18WayShot = function(sgroot, sg, obj, color){
	for( var num = 0; num < 18; num++){
		var sin = Math.sin(num * 20 * (Math.PI / 180));
		var cos = Math.cos(num * 20 * (Math.PI / 180));
		var bullet = new Object();
		bullet.x = obj.x + obj.sizes / 2.0;
		bullet.y = obj.y;
		bullet.speed_x = sin * 2;
		bullet.speed_y = cos * 2;
		bullet.sizes = 5;
		bullet.color = color || "da0b00";
		sg.enemy_bullets.push(bullet);
	}
}


ShootingScene.prototype.even18WayShot = function(sgroot, sg, obj, color){
	for( var num = 0; num < 18; num++){
		var sin = Math.sin(num * 20 * (Math.PI / 180) + Math.PI / 360 * 20);
		var cos = Math.cos(num * 20 * (Math.PI / 180) + Math.PI / 360 * 20);
		var bullet = new Object();
		bullet.x = obj.x + obj.sizes / 2.0;
		bullet.y = obj.y;
		bullet.speed_x = sin * 2;
		bullet.speed_y = cos * 2;
		bullet.sizes = 5;
		bullet.color = color || "eed700";
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
					sg.enemys.splice(num, 1);
					break;
				}
			}
		}
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
	  x: sgroot.start_field_x, y: sgroot.start_field_y,
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

ShootingScene.prototype.drawResult = function(sgroot, sg){
	$("#canvas").clearCanvas();
	$("#canvas").drawRect({
	  strokeStyle: "#36a",
	  strokeWidth: 1,
	  x: sgroot.start_field_x, y: sgroot.start_field_y,
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
	  text: "ゲームクリアーです"
	});
	
	$("canvas").drawText({
	  fillStyle: "#9cf",
	  strokeStyle: "#25a",
	  strokeWidth: 2,
	  x: sgroot.w * 0.5, y: sgroot.h * 0.6,
	  font: "28pt Verdana, sans-serif",
	  text: "最終評価値" + sgroot.best_value
	});
	
	if(restart_flag){
		sgroot.sub_gene = copyArray(sg.auto_move);
		sgroot.think_count = 0;
		sgroot.finish_flag = false;
		finish_flag = false;
		restart_flag = false;
		sgroot.first_flag = false;
		delete sgroot.child;
		sgroot.eval = 0;
		initGeneGroup(sgroot);
		sgroot.gene_group[0] = copyArray(sgroot.sub_gene);
		clearInterval(sgroot.timer);
		startGame(sgroot);
	}
}

/*
* This function is main loop.
*/
function loop(sgroot, sg){
	if(sg.frame < sgroot.gameTime && sgroot.start_flag && !sgroot.finish_flag){
		sg.mainLoop(sgroot, sg);
  }else if(sgroot.finish_flag){
		sgroot.child.drawResult(sgroot, sg);
	}else if(sgroot.init_flag){
		sgroot.child.drawMenu(sgroot, sg);
	}else if(sg.frame >= sgroot.gameTime){
		finish_flag = true;
		sgroot.finish_flag = true;
		sgroot.eval += sg.frame * 5;
		sgroot.best_value = sgroot.eval;
		$("div#best_gene").empty();
		$("div#best_gene").append("<p>最終評価値は" + sgroot.best_value + "となりました [ " + sgroot.generation + "世代 " + sgroot.think_count + "回目 ]</p>");
		sgroot.group_gene[0] = copyArray(sg.auto_move);
		restartEvolution(sgroot, sg);
	}
}


