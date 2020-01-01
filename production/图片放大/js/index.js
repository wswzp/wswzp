$(function() {
	/*
	 smallimg   // 小图
	 bigimg  //点击放大的图片
	 mask   //黑色遮罩
	 */
	var obj = new Zoom('mask', 'bigimg', 'smallimg');
	obj.init();
})

function Zoom(mask, bigimg, smallimg) {
	this.bigimg = bigimg;
	this.smallimg = smallimg;
	this.mask = mask
}
Zoom.prototype = {
	init: function() {
		var that = this;
		this.smallimgClick();
		this.maskClick();
		this.mouseWheel()
	},
	smallimgClick: function() {
		var that = this;
		$("." + that.smallimg).click(function() {
			$("." + that.bigimg).css({
				height: $("." + that.smallimg).height() * 1.5,
				width: $("." + that.smallimg).width() * 1.5
			});
			$("." + that.mask).fadeIn();
			//attr() 方法设置或返回被选元素的属性和值。
			//attr()         设置属性和值         返回属性的值
			$("." + that.bigimg).attr("src", $(this).attr("src")).fadeIn()
		})
	},
	maskClick: function() {
		var that = this;
		$(".mask img").click(function() {
			$("." + that.bigimg).fadeOut();
			$("." + that.mask).fadeOut();
		})
	},
	mouseWheel: function() {
		function mousewheel(obj, upfun, downfun) {
			if(document.attachEvent) {
				obj.attachEvent("onmousewheel", scrollFn)
			} else {
				if(document.addEventListener) {
					obj.addEventListener("mousewheel", scrollFn, false);
					obj.addEventListener("DOMMouseScroll", scrollFn, false)
				}
			}

			function scrollFn(e) {
				var ev = e || window.event;
				var dir = ev.wheelDelta || ev.detail;
				if(ev.preventDefault) {
					ev.preventDefault()
				} else {
					ev.returnValue = false
				}
				if(dir == -3 || dir == 120) {
					upfun()
				} else {
					downfun()
				}
			}
		}
		var that = this;
		mousewheel($("." + that.bigimg)[0], function() {
			if($("." + that.bigimg).innerHeight() > $("body").height() - 100) {
				alert("不能再放大");
				return;
			}
			var zoomHeight = $("." + that.bigimg).innerHeight() * 1.03;
			var zoomWidth = $("." + that.bigimg).innerWidth() * 1.03;
			$("." + that.bigimg).css({
				height: zoomHeight + "px",
				width: zoomWidth + "px"
			})
		}, function() {
			if($("." + that.bigimg).innerWidth() < 100) {
				alert("不能再缩小了哦！");
				return
			}
			if($("." + that.bigimg).innerHeight() < 100) {
				alert("不能再缩小了哦！");
				return
			}
			var zoomHeight = $("." + that.bigimg).innerHeight() / 1.03;
			var zoomWidth = $("." + that.bigimg).innerWidth() / 1.03;
			$("." + that.bigimg).css({
				height: zoomHeight + "px",
				width: zoomWidth + "px"
			})
		})
	}
};