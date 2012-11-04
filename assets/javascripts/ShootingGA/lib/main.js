// When browser read, this function called.
onload = function(){
	main();
}

// This function game main.
function main(){
	// SceneGraphRoot object create.
	var sgroot = new SceneGraphRoot();
	sgroot.gameTime = 5300;
	start(sgroot);
}

// This function game start.
function start(sgroot){
	// get canvas object
	var canvas = $('#canvas').get(0);
	if(!canvas || !canvas.getContext){
		return false;
	}
	
	canvas.addEventListener('click', onClick, false);
	
	sgroot.start_field_x = 10;
	sgroot.start_field_y = 10;
	sgroot.w = canvas.width * 0.9;      // set screen size x.
	sgroot.h = canvas.height * 0.9;     // set screen size y.

	var ctx = canvas.getContext('2d');  // get context.

	sgroot.ctx = ctx;                   // set context object.
	sgroot.canvas = canvas;             // set canvas object.
	
	

	// game staring.
	startGame(sgroot);
}

function initGeneGroup(sgroot){
	for(var n = 0; n < sgroot.group_size; n++){
		sgroot.gene_group[n] = new Array();
		for(var num = 0; num < sgroot.gameTime; num++){
			sgroot.gene_group[n][num] = Math.floor( Math.random() * 18); // 0 - 9 pattern
		}
	}
}
