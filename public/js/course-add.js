define(['jquery'],function($){
	$("#createCourse").click(function(event) {
		$.ajax({
			url: '/api/course/create',
			type: 'post',
			dataType: 'json',
			data: $("#csNameInfo").serialize(),
			success:function(data){
				if (data.code == 200) {
					location.href = "/course/basic?cs_id="+data.result.cs_id;
				}
			}
		});
		
	});
});