define(['jquery', 'template', 'util','bootstrap'], function($, template,util) {
	// 年龄计算
	util.setMenu(location.pathname);
	// 计算年龄方法实现
	function ages(str) {
		var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
		if (r == null) return false;
		var d = new Date(r[1], r[3] - 1, r[4]);
		if (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]) {
			var Y = new Date().getFullYear();
			return ((Y - r[1]));
		}
		return ("输入的日期格式错误！");
	}

	// 数据列表请求
	$.ajax({
		url: '/api/teacher',
		type: 'get',
		dataType: 'json',
		success: function(data) {
			for (var i = 0; i < data.result.length; i++) {
				data.result[i].tc_birthday = ages(data.result[i].tc_birthday);
			}
			var html = template('teacherInfoTpl', {
				list: data.result
			});
			$("#teacherInfo").html(html);
			previewTeacher();
			enableOrDisableTeacher();
			addTeacher();
		}
	});

	function previewTeacher() {
		$("#teacherInfo").find('.preview').click(function(event) {
			var tcId = $(this).closest('td').attr('data-id');
			$.ajax({
				url: '/api/teacher/view',
				type: 'GET',
				dataType: 'json',
				data: {
					tc_id: tcId
				},
				success: function(data) {
					data.result.tc_hometown = data.result.tc_hometown.replace(/\|/g, " ");
					var html = template('teacherModalInfoTpl', data.result);
					$('#teacherModalInfo').html(html);
					$('#teacherModal').modal();
				}
			});

		});
	}

	function enableOrDisableTeacher() {
		$("#teacherInfo").find('.changeTeacher').click(function(event) {
			var _this = this;
			var td = $(this).closest('td');

			var tcId = $(this).closest('td').attr('data-id');
			var tcStatus = td.attr('data-status');
			$.ajax({
				url: '/api/teacher/handle',
				type: 'post',
				dataType: 'json',
				data: {
					tc_id: tcId,
					tc_status: tcStatus
				},
				success: function(data) {
					if (data.code == 200) {
						td.attr('data-status', data.result.tc_status);
					}
					if (data.result.tc_status == "0") {
						$(_this).text("注 销");
					} else {
						$(_this).text("启 用");
					}
				}
			});
		});
	}

	function addTeacher(){
		$("#teacherInfo").find('.editTeacher').click(function(event) {
			var tcId = $(this).closest('td').attr('data-id');
			location.href = "/teacher/teacher_add?tc_id="+tcId;
		});
	}


});