$(document).ready(function(){
	init_rank_value();
	$("div#ranking").hide();
	
	$("input#rank1").change(function(){
		var val = $("input#rank1").val();
		$("span#rank1_num").text(val);
	});
	
	$("input#rank2").change(function(){
		var val = $("input#rank2").val();
		$("span#rank2_num").text(val);
	});
	
	$("input#rank3").change(function(){
		var val = $("input#rank3").val();
		$("span#rank3_num").text(val);
	});
	
	$("input#rank4").change(function(){
		var val = $("input#rank4").val();
		$("span#rank4_num").text(val);
	});
	
	$("input#rank5").change(function(){
		var val = $("input#rank5").val();
		$("span#rank5_num").text(val);
	});
	
	$("select#select_type").change(function(){
		var val = $("select#select_type").val();
		if(val == 2){
			$("div#ranking").show();
		}else{
			$("div#ranking").hide();
		}
	});
});


function init_rank_value(){
	var val = $("input#rank1").val();
	$("span#rank1_num").text(val);

	var val = $("input#rank2").val();
	$("span#rank2_num").text(val);

	var val = $("input#rank3").val();
	$("span#rank3_num").text(val);

	var val = $("input#rank4").val();
	$("span#rank4_num").text(val);

	var val = $("input#rank5").val();
	$("span#rank5_num").text(val);
}