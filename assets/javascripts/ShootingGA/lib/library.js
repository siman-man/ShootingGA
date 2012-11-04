// SceneGraphRoot is top Scene.

SceneGraphRoot = function(){	
    this.child = null; 	 	    // root has only one child.
    this.w = 0;					// width of game screen
    this.h = 0;					// height of game screen
    this.ctx = null;            // into context
    this.canvas = null;         // into canvas object
		this.generation = 1;
		this.think_count = 0;
		this.gene_group = new Array();
		this.eval_list = new Array();
		this.eval = 0;
		this.start_flag = false;
		this.init_flag = true;
		this.delete_flag = false;
		this.best_value = 0;
		this.loop_flag = true;
		this.first_flag = true;
		this.sub_gene = new Array();
		this.player_move = false;
		this.finish_flag = false;
}


// game scene
SceneGraph = function(){
    this.parents = null;
    this.child = new Array();
    this.frame = 0;
}


SceneGraph.prototype.mainLoop = function(sgroot, sg){
	$("#canvas").clearCanvas();
	while(sg.frame <= sgroot.gameTime){	
		sg.frame += 1;
		sgroot.child.enemyScenario(sgroot, sg);
		sgroot.child.moveBullet(sgroot, sg.player_bullets);
		sgroot.child.moveBullet(sgroot, sg.enemy_bullets);
		sgroot.child.movePlayer(sgroot, sg);
		if(!sgroot.player_move){
			sgroot.child.moveAuto(sgroot, sg);
		}else{
			sgroot.player_move = false;
		}
		sgroot.child.moveEnemy(sgroot, sg);
		
		sgroot.child.enemyCollision(sgroot, sg);
		sgroot.child.enemyBulletCollision(sgroot, sg);
		sgroot.child.playerBulletCollision(sgroot, sg);
		if(sgroot.think_count == 1 || sgroot.loop_flag){
			break;
		}
	}
	
	if(sgroot.think_count == 1){
		sgroot.child.drawScreen(sgroot, sg);
		sgroot.child.drawPlayer(sgroot, sg.player);
		sgroot.child.drawBullet(sgroot, sg.player_bullets);
		sgroot.child.drawBullet(sgroot, sg.enemy_bullets);
		sgroot.child.drawEnemy(sgroot, sg.enemys);
	}
	if(sgroot.loop_flag){
		restartEvolution(sgroot, sg);
	}
}

