define(['jquery','template'],function($,template){
	if(location.search){
		// var index =  location.search.indexOf("=");
		var tcId =  location.search.split("=")[1];
		$.ajax({
			url: '/api/teacher/edit',
			type: 'GET',
			dataType: 'json',
			data: {tc_id:tcId},
			success:function(data){
				var html = template('teacherAddTpl',data.result);
				$("#teacherAddinfo").html(html);
				 editTeacherFun();
			}
		});
		
	}else {
		console.log('1111');
	}

	function  editTeacherFun(){
		$("#addTeacherBtn").click(function(event) {
			$.ajax({
				url: '/api/teacher/update',
				type: 'post',
				dataType: 'json',
				data: {tc_id:tcId},
				success:function(data){
					if (data.code == 200) {
						location.href = '/teacher/teacher_list';
					}
				}
			});
			
		});
	}
	
});