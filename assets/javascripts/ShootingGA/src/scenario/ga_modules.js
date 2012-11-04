function restartEvolution(sgroot, sg){
	if(sgroot.delete_flag){
		$("div#result").empty();
		sgroot.delete_flag = false;
	}
	
	sgroot.eval += sg.frame * 5;
	sgroot.eval_list[sgroot.think_count-1] = sgroot.eval;

	$("div#result").append('<p>' + sgroot.generation + '世代  ' + sgroot.think_count + '回目： 評価値' + sgroot.eval + '\n' + '</p>');
	if(sgroot.best_value < sgroot.eval){
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
	geneSelect(sgroot, sg);
	geneMutation(sgroot, sg);
	sgroot.gene_group[0] = copyArray(sgroot.sub_gene);
	startGame(sgroot);
}

function geneSingleCross(sgroot, sg, parent1, parent2, point){
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

function rankingList(sgroot, sg, ranking_list){
	var index = 0;
	var rank = 0;
	var rank_select = new Array();
	for(var obj in ranking_list){
		var str = '$(\"input#rank' + (parseInt(obj)+1) +'\").val();';
		var count = eval(str);
		for(var num = 0; num < count; num++){
			rank_select[index] = ranking_list[obj].key;
			index++;
		}
		rank++;
		if(rank == 5){
			break;
		}
	}
	return rank_select;
}

function geneSelect(sgroot, sg){
	var leave_gene_list = new Array();
	var ranking_list = new Array();
	var number = 0;
	var index = 0;
	var sum_value = 0;
	var best_gene = 0;
	var best_value = 0;
	var next_gene = new Array();
	
	for(var value = 0; value < sgroot.eval_list.length; value++){
		if(best_value < sgroot.eval_list[value]){
			best_value = sgroot.eval_list[value];
			best_gene = value;
		}
		if(sgroot.eval_list[value] <= 0){
			sgroot.eval_list[value] = 0;
		}
		ranking_list.push( { key:value, value:sgroot.eval_list[value] } );

		sum_value += sgroot.eval_list[value];
	}
	
	
	if($("select#select_type").val() == 2){
		ranking_list.sort( function( a, b ) { return b.value - a.value; } );
		leave_gene_list = rankingList(sgroot, sg, ranking_list);
	}else if($("select#select_type").val() == 1){
		var index = 0;
		for(var value = 0; value < sgroot.eval_list.length; value++){
			for(var num = 0; num < sgroot.eval_list[value]; num++){
				leave_gene_list[index] = number;
				index++;
			}
			number++;
		}
	}

	console.log(leave_gene_list);
	console.log(leave_gene_list.length);
	var parent1 = 0;
	var parent2 = 0;
	
	for(var count = 0; count < sgroot.group_size / 2; count++){
		while(true){
			var val1 = Math.floor(Math.random() * leave_gene_list.length);
			var val2 = Math.floor(Math.random() * leave_gene_list.length);
			parent1 = leave_gene_list[val1];
			parent2 = leave_gene_list[val2];
			if(parent1 != parent2){
				break;
			}
		}
		
		var rand = Math.floor(Math.random() * sgroot.gameTime);
		var point1 = Math.floor(Math.random() * sgroot.gameTime / 2);
		var point2 = Math.floor(Math.random() * sgroot.gameTime / 2 + sgroot.gameTime / 2);
		
		if($("select#cross_type").val() == 1){
			next_gene[count*2] = geneSingleCross(sgroot, sg, parent1, parent2, rand);
			next_gene[count*2+1] = geneSingleCross(sgroot, sg, parent2, parent1, rand);
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