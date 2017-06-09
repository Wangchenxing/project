define(['jquery', 'cookie'], function($) {



	$('.navs ul').prev('a').on('click', function() {
		$(this).next().slideToggle();
	});


	var pathname = location.pathname;
	if (pathname != '/login' && !$.cookie('PHPSESSID')) {
		location.href = "/login";
	}
	console.log($.cookie('loginInfo'));
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

});