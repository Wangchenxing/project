define(['jquery','template','util'],function($,template,util){
	util.setMenu(location.pathname);

	$.ajax({
		url: '/api/course',
		type: 'get',
		dataType: 'json',
		success:function(data){
			var html = template('courseInfoTpl',{list:data.result});
			$("#courseInfo").html(html);
		}
	});
	
});