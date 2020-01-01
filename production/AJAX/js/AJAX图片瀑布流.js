var pagenum = 1;

function getdate() {
	$.get("http://api.tianapi.com/meinv/?key=b34aea5e67ca24711b956f574f60ad5b", {
			'page': pagenum,
		},
		function(shuju, textStatus, xhr) {
			console.log(shuju);
			var x = shuju;
			//$.each(json,function(index,item)里面的index代表当前循环到第几个索引，item表示遍历后的当前对象，

			$.each(x.newslist, function(index, item) {
				var newImg = '<img src="' + item.picUrl +
					'" class="img-thumbnail" data-toggle="modal" data-target="#exampleModal">';
				if(index % 4 === 0) {
					$('.col001').append(newImg);
				} else if(index % 4 === 1) {
					$('.col002').append(newImg);
				} else if(index % 4 === 2) {
					$('.col003').append(newImg);
				} else if(index % 4 === 3) {
					$('.col004').append(newImg);
				}
			})
		},
	);
	pagenum++;
}
getdate();

var button;

$('#exampleModal').on('show.bs.modal', function(event) {
	button = $(event.relatedTarget) // Button that triggered the modal
	var recipient = button.attr('src') // Extract info from data-* attributes
	console.log(recipient)

	var modal = $(this);
	modal.find('img').attr('src', recipient);
	$(".modal-backdrop").remove();
})
//下一张
function next() {
	if(button.next().length) {
		button = button.next();
	} else {
		button = button.parent().next().children().first();
	}
	var recipient = button.attr('src')

	$('.modal').find('img').attr('src', recipient);
}

//  上一张
function prev() {
	if(button.prev().length) {
		button = button.prev();
	} else {
		button = button.parent().prev().children().first();
	}
	var recipient = button.attr('src')

	$('.modal').find('img').attr('src', recipient);
}

// 滚动监听
var scrollDone = true;
document.body.onscroll = function(ev) {
	if(window.pageYOffset > ($('.more').offset().top - window.innerHeight + $('.more').height())) {
		if(scrollDone === true) {
			scrollDone = false;
			getdate();
			setTimeout(function() {
				scrollDone = true;
			}, 1000);
		}
	}
}