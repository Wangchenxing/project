define(['jquery', 'template', 'datepicker', 'language', 'validate'], function($, template) {

	$('.datepicker').datepicker({
		endDate: '0d'
	});
	if (location.search) {
		$('.breadcrumb .active').html('讲师编辑');
		var tcId = location.search.split("=")[1];
		$.ajax({
			url: '/api/teacher/edit',
			type: 'GET',
			dataType: 'json',
			data: {
				tc_id: tcId
			},
			success: function(data) {
				var html = template('teacherAddTpl', data.result);
				$("#teacherAddinfo").html(html);
				editTeacherFun();
			}
		});

	} else {
		addTeacherFun();
	}

	function editTeacherFun() {
		$("#addTeacherBtn").click(function(event) {
			$.ajax({
				url: '/api/teacher/update',
				type: 'post',
				dataType: 'json',
				data: $("#teacherAddinfo").serialize(),
				success: function(data) {
					if (data.code == 200) {
						location.href = '/teacher/teacher_list';
					}
				}
			});

		});
	}

	function addTeacherFun() {
		$("#teacherAddinfo").validate({
			sendForm: false,
			eachInvalidField: function() {
				console.log(1);
			},
			eachValidField: function() {
				console.log(2);
			},
			valid: function() {
				$.ajax({
					url: '/api/teacher/add',
					type: 'post',
					dataType: 'json',
					data: $("#teacherAddinfo").serialize(),
					success: function(data) {
						if (data.code == 200) {
							location.href = '/teacher/teacher_list';
						}
					}
				});
				console.log(3);
			},
			description:{
				tcName:{
					required:'姓名不能为空',
					valid:'姓名可以使用'
				},
				tcPass:{
					required:'密码不能为空',
					pattern:'密码必须是6位数字',
					valid:'姓名可以使用'
				},
				tcJoinDate:{
					required:'日期不能为空',
					valid:'日期格式正确'
				}
			}
		});
		// $("#addTeacherBtn").click(function(event) {
		// 	// $.ajax({
		// 	// 	url: '/api/teacher/add',
		// 	// 	type: 'post',
		// 	// 	dataType: 'json',
		// 	// 	data: $("#teacherAddinfo").serialize(),
		// 	// 	success:function(data){
		// 	// 		if (data.code == 200) {
		// 	// 			location.href = '/teacher/teacher_list';
		// 	// 		}
		// 	// 	}
		// 	// });

		// });
	}

});