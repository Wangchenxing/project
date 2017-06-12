define(['jquery', 'template', 'ckeditor', 'datepicker', 'language', 'upload', 'region','validate', 'form'], function($, template, CKEDITOR) {
	// 查询个人信息
	$.ajax({
		type: 'get',
		url: '/api/teacher/profile',
		dataType: 'json',
		success: function(data) {
			var tcId = data.result,tc_id;
			var html = template('settingsTpl', data.result);
			$('#settingsInfo').html(html);

			$("#upfile").uploadify({
				buttonText: "",
				width: 120,
				height: 120,
				fileObjName: "tc_avatar",
				swf: '/public/assets/upload/uploadify.swf',
				uploader: '/api/uploader/avatar',
				onUploadSuccess: function(file, data, response) {
					console.log(data);
				}

			});

			$("#hometown").region({
				url: "/public/assets/region/region.json"
			});

			CKEDITOR.replace('editor', {
				toolbarGroups: [{
					name: 'clipboard',
					groups: ['clipboard', 'undo']
				}, {
					name: 'editing',
					groups: ['find', 'selection', 'spellchecker', 'editing']
				}]
			});

			$("#settingsForm").validate({
				sendForm: false,
				valid: function() {
					for (var instance in CKEDITOR.instances) {
						CKEDITOR.instances[instance].updateElement();
					}
					var p = $('#p option:selected').text();
					var c = $('#c option:selected').text();
					var d = $('#d option:selected').text();
					var hometown = p + '|' + c + '|' + d;
					$(this).ajaxSubmit({
						type: 'post',
						data: {
							tc_id:tcId,
							tc_hometown: hometown
						},
						url: '/api/teacher/modify',
						success: function(data) {
							// 重新加载页面
							location.reload();
							// location.href = '/index/settings'
						}
					});
				}
			});
		}
	});
});