var data;
$.ajax({
	type : 'get',
	url : 'citys.json',
	dataType : 'json',
	success : function(transfer) {
		data = transfer.provinces;
		$.each(transfer.provinces, function(index,value) {
			$('#province').append('<option value="' + value.provinceName + '">' + value.provinceName + '</option>');

		});
	}
});

$('#province').change(function(e) {
	$('#city').empty();
	var _this = this;
	
	$.each(data,function(index,value) {
		if(value.provinceName === _this.value) {
			$.each(value.citys,function(index,value) {
				$('#city').append('<option value="' + value.citysName + '">' + value.citysName + '</option>');
			});
		}
	});
});