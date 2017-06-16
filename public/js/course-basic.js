define(['jquery','template','util',"ckeditor",'validate',"form"],function($,template,util,CKEDITOR){
	util.setMenu('/course/course_add');

	var csId = location.search.split("=")[1];
	$.ajax({
		type : 'get',
		url : '/api/course/basic',
		data : {cs_id : csId},
		dataType : 'json',
		success : function(data){
			var html = template('courseBasicInfoTpl',data.result);
			$('#courseBasicInfo').html(html);
			CKEDITOR.replace('editor');

			$("#firstCategory").change(function(event) {
				var cgId = $(this).find('option:selected').val();
				$.ajax({
					url: '/api/category/child',
					type: 'get',
					dataType: 'json',
					data: {cg_id: cgId},
					success:function(data){
						var tpl = "{{each list}}<option value='{{$value.cg_id}}'>{{$value.cg_name}}</option>{{/each}}";
						var html = template.render(tpl,{list : data.result});
						$('#secondCategory').html(html);
					}
				});

			});

			$("#basicForm").validate({
				sendForm:false,
				valid : function(){
					$(this).ajaxSubmit({
						type : 'post',
						url : '/api/course/update/basic',
						data : {cs_id : csId},
						success : function(data){
							if(data.code == 200){
								location.href ='/course/course_picture?cs_id=' + data.result.cs_id;
							}
						}
					});
				}
			});

		}
	});
	
});