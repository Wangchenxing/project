// define(['jquery'], function($) {

// 	// 教师列表
	// $.ajax({
	// 	url: '/api/teacher',
	// 	type: 'get',
	// 	dataType: 'json',
	// 	success: function(data) {
	// 		// console.log(data.result);
	// 		for (var i = 0; i < data.result.length; i++) {
	// 			var result = data.result[i];
	// 			var tc_gender = result.tc_gender = 0 ? "女" : "男";
	// 			var str = "<tr><td>" + result.tc_id + "</td><td>" + (i + 1) + "</td><td>" + result.tc_name + "</td><td>" + result.tc_roster + "</td><td>" + ages(result.tc_birthday) + "</td><td>" + tc_gender + "</td><td>" + result.tc_cellphone + "</td><td><a href='javascript:' data-toggle='modal' class='btn btn-info btn-xs'>查 看</a><a href='/teacher/teacher_add' class='btn btn-info btn-xs'>编 辑</a><a href='javascript:;' class='btn btn-warning btn-xs'>注 销</a></td></tr>";
	// 			$("#tList tbody").append(str);
	// 			$("#tList thead tr").find('th:eq(0)').hide();
	// 			$("#tList tbody tr").find('td:eq(0)').hide();
	// 		}
	// 	}
	// });
// });

define(['jquery'], function($) {
	// 实现功能

	// 年龄计算
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

	
	$.ajax({
		url: '/api/teacher',
		type: 'get',
		dataType: 'json',
		success: function(data) {
			// console.log(data.result);
			for (var i = 0; i < data.result.length; i++) {
				var result = data.result[i];
				var tc_gender = result.tc_gender = 0 ? "女" : "男";
				var str = "<tr><td>" + result.tc_id + "</td><td>" + (i + 1) + "</td><td>" + result.tc_name + "</td><td>" + result.tc_roster + "</td><td>" + ages(result.tc_birthday) + "</td><td>" + tc_gender + "</td><td>" + result.tc_cellphone + "</td><td><a href='javascript:' data-toggle='modal' class='btn btn-info btn-xs'>查 看</a><a href='/teacher/teacher_add' class='btn btn-info btn-xs'>编 辑</a><a href='javascript:;' class='btn btn-warning btn-xs'>注 销</a></td></tr>";
				$("#tList tbody").append(str);
				$("#tList thead tr").find('th:eq(0)').hide();
				$("#tList tbody tr").find('td:eq(0)').hide();
			}
		}
	});
});