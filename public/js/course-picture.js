define(['jquery','template','util'],function($,template,util){

	var csId = location.search.split("=")[1];
	$.ajax({
		url: '/api/course/picture',
		type: 'GET',
		dataType: 'json',
		data: {cs_id: csId},
		success:function(data){
			if (data.result.cs_cover == " ") {
				console.log(1);
				var html = template("coursePictureInfoTpl",{});
				$("#coursePictureInfo").html(html);
			}else{
				console.log(2);
				var html = template("coursePictureInfoTpl",data.result);
				$("#coursePictureInfo").html(html);
			}
		}
	});
	
});