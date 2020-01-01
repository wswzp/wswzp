$(function () {
    // nav收缩展开
    $('.nav-item>a').on('click', function () {
        if (!$('.nav').hasClass('nav-mini')) {
            if ($(this).next().css('display') == "none") {
                //展开未展开
                $('.nav-item').children('ul').slideUp(300);
                $(this).next('ul').slideDown(300);
                $(this).parent('li').addClass('nav-show').siblings('li').removeClass('nav-show');
            } else {
                //收缩已展开
                $(this).next('ul').slideUp(300);
                $('.nav-item.nav-show').removeClass('nav-show');
            }
        }
    });
    //nav-mini切换
    $('#mini').on('click', function () {
        if (!$('.nav').hasClass('nav-mini')) {
            $('.nav-item.nav-show').removeClass('nav-show');
            $('.nav-item').children('ul').removeAttr('style');
            $('.nav').addClass('nav-mini');
        } else {
            $('.nav').removeClass('nav-mini');
        }
    });
});



$(function () {
    $(".userMenu").on("click", "li", function () {
        var sId = $(this).data("id"); //获取data-id的值
        window.location.hash = sId; //设置锚点
        loadInner(sId);
    });

    function loadInner(sId) {
        var sId = window.location.hash;
        var pathn, i;
        switch (sId) {
            case "#wzp1-1":
                pathn = "resume/index.html";
                i = 0;
                break;
            case "#wzp2-1":
                pathn = "production/css运用/炉石传说/index.html";
                i = 1;
                break;
            case "#wzp2-2":
                pathn = "production/css运用/农场品销售/index.html";
                i = 2;
                break;
            case "#wzp2-3":
                pathn = "production/css运用/transform/3D.html";
                i = 3;
                break;
            case "#wzp2-4":
                pathn = "production/css运用/Hovers/index.html";
                i = 4;
                break;
            case "#wzp2-5":
                pathn = "production/css运用/开关/index.html";
                i = 5;
                break;

            case "#wzp3-1":
                pathn = "production/AJAX/AJAX图片瀑布流.html";
                i = 6;
                break;
            case "#wzp3-2":
                pathn = "production/轮播图/c.wuzp.cn/index.html";
                i = 7;
                break;
            case "#wzp3-3":
                pathn = "production/内嵌网址/b.wuzp.cn.html";
                i = 8;
                break;
            case "#wzp3-4":
                pathn = "production/图片放大/index.html";
                i = 9;
                break;
            case "#wzp3-5":
                pathn = "production/幽灵按钮/Ghost-button.html";
                i = 10;
                break;
            case "#wzp3-6":
                pathn = "production/抽奖/抽奖.html";
                i = 11;
                break;

            case "#wzp4-1":
                pathn = "production/内嵌网址/a.wuzp.cn.html";
                i = 12;
                break;
            case "#wzp4-2":
                pathn = "production/Vue/04-shopping-cart.html";
                i = 13;
                break;
            case "#wzp4-3":
                pathn = "production/shopping-cart/index.html";
                i = 14;
                break;
            case "#wzp4-4":
                pathn = "production/内嵌网址/1.wuzp.cn.html";
                i = 15;
                break;


            default:
                pathn = "resume/index.html";
                i = 0;
                break;
        }
        $("#content").load(pathn); //加载相对应的内容
        $(".userMenu li").eq(i).addClass("current").siblings().removeClass("current"); //当前列表高亮
    }
    var sId = window.location.hash;
    loadInner(sId);
});


// $(document).ready(function(){
// 	$('.userMenu li').click(function(){
// 		$(window.parent.document.getElementById("iframetest")).hide();
// 		//alert(cc.find("iframetest"))
// 		//$('')
// 	});
// });

// $(function(){
//     $('.userMenu li').click(function(){
//         $('iframetest').toggle();//控制是否显示
//     })
// })