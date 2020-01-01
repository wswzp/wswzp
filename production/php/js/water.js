//这就相当于定义了一个参数为arg的匿名函数，并且将param作为参数来调用这个匿名函数 即：(function(arg){...})(param)	
(function($){  
	$.fn.extend({  //jQuery.fn是jQuery的原型对象，其extend()方法用于为jQuery的原型添加新的属性和方法。
		waterFlow:function(){
			//获取items的宽度
			//console.log(this)
			var itemsWidth = this.outerWidth();
//			console.log(itemsWidth)
			//获取每一条item的宽度   find() 方法返回被选元素的后代元素。
			imgBoxs = this.find("div");
			imgBoxWidth = imgBoxs.outerWidth();
//			console.log(imgBoxs);
//			console.log(imgBoxWidth)
			//每一行显示5个
			var rowNum = 5;
			//计算间隙space
			var space = (itemsWidth - imgBoxWidth * rowNum) / (rowNum - 1);
//			console.log(space)
			//定义一个存储item高度的数组
			var imgBoxsHeightArr = [];
			//each() 方法为每个匹配元素规定要运行的函数。 jQuery.each() 函数用于遍历指定的对象和数组。
			imgBoxs.each(function(index,ele){
//				console.log(index)				
//				console.log(ele)
//				console.log($(ele))							
				var itemLeft = index * (imgBoxWidth + space);
//				console.log(itemLeft)
				//显示第一行的5个图片,存储这5个高度
				if(index < rowNum){
					imgBoxsHeightArr[index] = $(ele).outerHeight();
					$(ele).css({
						top:0,
						left:itemLeft
					});
				}else{
					//判断数组里哪个最小
					var minHeight = imgBoxsHeightArr[0];
					var minIndex = 0;
					//获取当前元素图像 高度
					var currentHeight = $(ele).outerHeight();
//					console.log(currentHeight)
//					console.log(currentHeight)
//					console.log(imgBoxsHeightArr)
					for(var i in imgBoxsHeightArr){
//						console.log(imgBoxsHeightArr)
						if(imgBoxsHeightArr[i] < minHeight){
							minHeight = imgBoxsHeightArr[i];
							minIndex = i;
						}
					}
					//找到最小高度值后，将当前的元素图像的高度叠加在最小高度上,就是当前元素图像所在的位置
					imgBoxsHeightArr[minIndex] = currentHeight + minHeight + space;
					
					$(ele).css({
						top:minHeight + space,
						left:minIndex * (imgBoxWidth + space)
					});
				}
				
			});
			//找到最高的那个数
//				console.log(imgBoxsHeightArr)
				var maxHeight = imgBoxsHeightArr[0];
				var maxIndex = 0;
				for(var j in imgBoxsHeightArr){
//					console.log(imgBoxsHeightArr[j])
					if(imgBoxsHeightArr[j] > maxHeight){
						maxHeight = imgBoxsHeightArr[j];
						maxIndex = j;
					}
				}
//				console.log(maxHeight)
				//设置items的值
//				console.log(this)
				this.height(maxHeight);
		}
	});
})(jQuery);

////页面属性，图片，内容完全加载完，执行  on() 方法在被选元素及子元素上添加一个或多个事件处理程序。
$(window).on("load",function(){
	//在文档加载完执行加载15张图片
	var pageNum = 1;
	ajaxGetImg(pageNum);
	
	// $("#loadMore").click(function(){
	// 	//ajax获取图片
	//     pageNum ++;
	// 	ajaxGetImg(pageNum);
	// });
	//滑动加载
	$(window).scroll(function(){  //当用户滚动指定的元素时，会发生 scroll 事件。
		//获取
	//	var docscrollTop = $(document).scrollTop();
	//	var wimscrollTop = $(window).scrollTop();
	//	
	//	var documentheight = $(document).height()
	//	var windowheight= $(window).height()
	//	
	//	console.log("docscrollTop======>",docscrollTop)
	//	console.log("wimscrollTop=====>",wimscrollTop)
	//	console.log("documentheight=====>",documentheight)
	//	console.log("windowheight=====>",windowheight)
		var totalHeight = Math.ceil($(window).height() + $(window).scrollTop()); //scrollTop()返回垂直滚动条位置
		if(totalHeight >= $(document).height()){
			pageNum ++;
			ajaxGetImg(pageNum);
		}
	});
});


function ajaxGetImg(pageNum){
	//分页
	$.ajax({
		type:"post", //规定请求的类型（GET 或 POST）。
		url:"production/php/water.php", //规定发送请求的 URL。默认是当前页面。
		data:{page:pageNum},  //规定要发送到服务器的数据。
		dataType:"json",  //预期的服务器响应的数据类型。
		success:function(responseData){
			console.log(responseData);

            //增强for循环，是不使用下标的一种遍历方式，缺点是不能使用下标,可以用来循环一个json，如果想循环一个数组就用i++。
			for(var i in responseData){ 
				var path = responseData[i].path;
				var title = responseData[i].title;
				var divItem = $("<div>",{class:"item"}).appendTo("#items");
				$("<img>",{src:path}).appendTo(divItem);
				$("<p>").html(title).appendTo(divItem);	//html() 方法设置或返回被选元素的内容（innerHTML）。		
			}
			$(".item img").on("load",function(){
				//瀑布流
				$("#items").waterFlow();
			});
			if(responseData.length == 0){
				$("#loadMore").html("到底了");
			}
			
		},
		error:function(xhr,error,ex){
				alert('服务器错误!稍后重试!');
			}
	});
}