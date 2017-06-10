define(['jquery','nprogress', 'cookie'], function($,nprogress) {



	$('.navs ul').prev('a').on('click', function() {
		$(this).next().slideToggle();
	});


	var pathname = location.pathname;
	if (pathname != '/login' && !$.cookie('PHPSESSID')) {
		location.href = "/login";
	}
	var loginInfo = $.cookie('loginInfo') && JSON.parse($.cookie('loginInfo'));
	if (loginInfo) {
		// 渲染页面
		$('.aside .profile').find('img').attr('src', loginInfo.tc_avatar);
		$('.aside .profile').find('h4').text(loginInfo.tc_name);
	}
	// 退出功能
	$("#logout").click(function(event) {
		/* Act on the event */
		$.ajax({
			type: 'post',
			url: '/api/logout',
			dataType: 'json',
			success: function(data) {
				if (data.code == 200) {
					location.href = '/login';
				}
			}
		});

	});

	$(document).ajaxStart(function() {
		$(".overlay").show();
	});

	$(document).ajaxStop(function() {
		$(".overlay").hide();
	});

	// 进度条控制
	nprogress.start();
	nprogress.done();
	

});