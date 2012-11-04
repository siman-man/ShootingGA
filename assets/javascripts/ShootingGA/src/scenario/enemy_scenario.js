ShootingScene.prototype.enemyScenario = function(sgroot, sg){
	if(sg.frame == 150){
		sg.enemys.push(sgroot.child.CreateEnemy(sgroot, 80, 20, 10, 1, 5, "red")); // x, y, size, type, hp
	}
	if(sg.frame == 165){
		sg.enemys.push(sgroot.child.CreateEnemy(sgroot, 80, 20, 10, 1, 5, "blue"));
	}
	if(sg.frame == 180){
		sg.enemys.push(sgroot.child.CreateEnemy(sgroot, 80, 20, 10, 1, 5, "orange"));
	}
	if(sg.frame == 195){
		sg.enemys.push(sgroot.child.CreateEnemy(sgroot, 80, 20, 10, 1, 5, "green"));
	}
	if(sg.frame == 210){
		sg.enemys.push(sgroot.child.CreateEnemy(sgroot, 80, 20, 10, 1, 5, "black"));
	}
	
	if(sg.frame == 450){
		sg.enemys.push(sgroot.child.CreateEnemy(sgroot, 560, 20, 10, 2, 5, "red"));
	}
	if(sg.frame == 465){
		sg.enemys.push(sgroot.child.CreateEnemy(sgroot, 560, 20, 10, 2, 5, "blue"));
	}
	if(sg.frame == 480){
		sg.enemys.push(sgroot.child.CreateEnemy(sgroot, 560, 20, 10, 2, 5, "orange"));
	}
	if(sg.frame == 495){
		sg.enemys.push(sgroot.child.CreateEnemy(sgroot, 560, 20, 10, 2, 5, "green"));
	}
	if(sg.frame == 510){
		sg.enemys.push(sgroot.child.CreateEnemy(sgroot, 560, 20, 10, 2, 5, "black"));
	}
	
	if(sg.frame == 750){
		sg.enemys.push(sgroot.child.CreateEnemy(sgroot, 110, 20, 10, 3, 10));
	}

	if(sg.frame == 850){
		sg.enemys.push(sgroot.child.CreateEnemy(sgroot, 320, 20, 10, 4, 10));
	}
	
	if(sg.frame == 950){
		sg.enemys.push(sgroot.child.CreateEnemy(sgroot, 530, 20, 10, 3, 10));
	}
	
	if(sg.frame == 1000){
		sg.enemys.push(sgroot.child.CreateEnemy(sgroot, 110, 20, 10, 3, 10));
	}

	if(sg.frame == 1100){
		sg.enemys.push(sgroot.child.CreateEnemy(sgroot, 320, 20, 10, 4, 10));
	}
	
	if(sg.frame == 1200){
		sg.enemys.push(sgroot.child.CreateEnemy(sgroot, 530, 20, 10, 3, 10));
	}
	
	if(sg.frame == 1500){
		sg.enemys.push(sgroot.child.CreateEnemy(sgroot, 100, 20, 10, 6, 15));
		sg.enemys.push(sgroot.child.CreateEnemy(sgroot, 500, 20, 10, 5, 15));
	}
	
	if(sg.frame == 2000){
		sg.enemys.push(sgroot.child.CreateEnemy(sgroot, 108, 20, 10, 6, 15));
		sg.enemys.push(sgroot.child.CreateEnemy(sgroot, 320, 20, 10, 7, 15));
		sg.enemys.push(sgroot.child.CreateEnemy(sgroot, 532, 20, 10, 5, 15));
	}
	
	if(sg.frame == 2500){
		sg.enemys.push(sgroot.child.CreateEnemy(sgroot, 40, 20, 10, 8, 15));
		sg.enemys.push(sgroot.child.CreateEnemy(sgroot, 180, 20, 10, 8, 15));
		sg.enemys.push(sgroot.child.CreateEnemy(sgroot, 320, 20, 10, 8, 15));
		sg.enemys.push(sgroot.child.CreateEnemy(sgroot, 460, 20, 10, 8, 15));
		sg.enemys.push(sgroot.child.CreateEnemy(sgroot, 600, 20, 10, 8, 15));
	}
	
	if(sg.frame == 3200){
		sg.enemys.push(sgroot.child.CreateEnemy(sgroot, 300, 20, 20, 9, 50));
	}
}

ShootingScene.prototype.enemyMoveType1 = function(my, sgroot, sg){
	if(my.frame % 50 == 0 && my.frame <= 100){
		sg.enemy_bullets.push(sgroot.child.enemyBulletGuidedShot(sgroot, sg, my));
	}else if(100 <= my.frame && my.frame <= 150 ){
		my.x += my.speed;
	}else if(my.frame > 150){
		my.y -= my.speed;
	}else{
		my.y += my.speed;
	}
}

ShootingScene.prototype.enemyMoveType2 = function(my, sgroot, sg){
	if(my.frame % 50 == 0 && my.frame <= 100){
		sg.enemy_bullets.push(sgroot.child.enemyBulletGuidedShot(sgroot, sg, my));
	}else if(100 <= my.frame && my.frame <= 150 ){
		my.x -= my.speed;
	}else if(my.frame > 150){
		my.y -= my.speed;
	}else{
		my.y += my.speed;
	}
}


ShootingScene.prototype.enemyMoveType3 = function(my, sgroot, sg){
	if( my.frame == 100 || my.frame == 120 || my.frame == 140){
		sgroot.child.odd18WayShot(sgroot, sg, my);
	}else if(my.frame > 200){
		my.y -= my.speed;
	}else if(my.frame < 40){
		my.y += my.speed;
	}else{
		
	}
}

ShootingScene.prototype.enemyMoveType4 = function(my, sgroot, sg){
	if( my.frame == 100 || my.frame == 120 || my.frame == 140){
		sgroot.child.even18WayShot(sgroot, sg, my);
	}else if(my.frame > 200){
		my.y -= my.speed;
	}else if(my.frame < 40){
		my.y += my.speed;
	}else{
		
	}
}

ShootingScene.prototype.enemyMoveType5 = function(my, sgroot, sg){
	if( my.frame > 50 && my.frame < 400 && my.frame % 10 == 0){
		sg.enemy_bullets.push(sgroot.child.enemyTargetShot(sgroot, sg, my, sgroot.start_field_x, sgroot.h));
	}else if(my.frame > 500){
		my.y -= my.speed;
	}else if(my.frame < 20){
		my.y += my.speed;
	}else{
		
	}
}

ShootingScene.prototype.enemyMoveType6 = function(my, sgroot, sg){
	if( my.frame > 50 && my.frame < 400 && my.frame % 10 == 0){
		sg.enemy_bullets.push(sgroot.child.enemyTargetShot(sgroot, sg, my, sgroot.w, sgroot.h));
	}else if(my.frame > 500){
		my.y -= my.speed;
	}else if(my.frame < 20){
		my.y += my.speed;
	}else{
		
	}
}

ShootingScene.prototype.enemyMoveType7 = function(my, sgroot, sg){
	if( my.frame > 50 && my.frame < 400 && my.frame % 10 == 0){
		sg.enemy_bullets.push(sgroot.child.enemyTargetShot(sgroot, sg, my, my.x, sgroot.h));
	}else if(my.frame > 500){
		my.y -= my.speed;
	}else if(my.frame < 20){
		my.y += my.speed;
	}else{
		
	}
}

ShootingScene.prototype.enemyMoveType8 = function(my, sgroot, sg){
	if( my.frame > 50 && my.frame < 400 && my.frame % 10 == 0){
		sg.enemy_bullets.push(sgroot.child.enemyTargetShot(sgroot, sg, my, my.x, sgroot.h));
	}else if(my.frame > 500){
		my.y -= my.speed;
	}else if(my.frame < 20){
		my.y += my.speed;
	}else{
		
	}
}

ShootingScene.prototype.enemyMoveType9 = function(my, sgroot, sg){
	if( my.frame > 100 && my.frame % 120 == 0){
		sgroot.child.even18WayShot(sgroot, sg, my);
	}else if(my.frame > 100 && my.frame % 60 == 0){
		sgroot.child.odd18WayShot(sgroot, sg, my);
	}else if(my.frame % 91 == 0 && my.frame > 100){
		sg.enemy_bullets.push(sgroot.child.enemyTargetShot(sgroot, sg, my, sg.player.x, sg.player.y, 2, "blue"));
	}else if(my.frame < 20){
		my.y += my.speed;
	}else if(my.frame > 1500){
		my.y -= my.speed / 2.0;
	}
}
