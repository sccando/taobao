window.onload = function() {
    //固定导航
    var searchTop = $('.search-bottom').offset().top;
    // 页面支持器
    var handerTop = $('.hander').offset().top;
    // 我常逛的
    var regularlyTop = $('.regularly').offset().top;
    //时尚爆料王
    console.log($('.fashion').offset().top)
    var fashionTop = $('.fashion').offset().top;
    var lifeTop = $('.life').offset().top;
    var haveFunTop = $('.have-fun').offset().top;
    var benefitTop = $('.benefit').offset().top;
    var guessTop = $('.tb-guess').offset().top;
    console.log($('.hander a').get(6))
    window.onscroll = function() {
        // 判断页面卷曲的高度来决定页面内搜索框的定位方式
            if ($(document).scrollTop() >= searchTop) {
                $('.topbar').addClass('wrap-fixed');
            } else {
                $('.topbar').removeClass('wrap-fixed');
            }
            // 判断页面卷曲的高度来决定页面内hander导航的定位方式
            if ($(document).scrollTop() >= handerTop) {
                $('.hander').css({ position: 'fixed', top: '49px' })
            } else {
                $('.hander').css({ position: 'absolute', top: '490px' })
            }
            //  页面hander导航中回到顶部的显示与隐藏
            if ($(document).scrollTop() >= regularlyTop) {
                $('.hander a').eq(6).css('display', 'block');
            } else {
                $('.hander a').eq(6).css('display', 'none');
            }
            // 判断页面卷曲的高度控制页面导航hander中a标签的高亮
            if ($(document).scrollTop() + 49 < fashionTop) {
                $('.hander a').eq(0).addClass('on').siblings().removeClass('on');
            } else if ($(document).scrollTop() + 49 >= fashionTop && $(document).scrollTop() + 49 < lifeTop) {
                $('.hander a').eq(1).addClass('on').siblings().removeClass('on');
            } else if ($(document).scrollTop() + 49 >= lifeTop && $(document).scrollTop() + 49 < haveFunTop) {
                $('.hander a').eq(2).addClass('on').siblings().removeClass('on');
            } else if ($(document).scrollTop() + 49 >= haveFunTop && $(document).scrollTop() + 49 < benefitTop) {
                $('.hander a').eq(3).addClass('on').siblings().removeClass('on');
            } else if ($(document).scrollTop() + 49 >= benefitTop && $(document).scrollTop() + 49 < guessTop) {
                $('.hander a').eq(4).addClass('on').siblings().removeClass('on');
            } else if ($(document).scrollTop() + 49 >= guessTop) {
                $('.hander a').eq(5).addClass('on').siblings().removeClass('on');
            }

        }
        // 页面内的导航 锚点连接
    $('.hander').children().click(function() {
        $('.hander').children('.on').removeClass('on');
        $(this).addClass('on');
        if ($(this).attr('data-tool')) {
            var dataTool = $(this).attr('data-tool');
            console.log($('.' + dataTool).offset().top)
            $('body').animate({ scrollTop: $('.' + dataTool).offset().top - 49 }, 500);
        }
    })
    $('.hander').children().eq(6).click(function() {
        $('body').animate({ scrollTop: 0 }, 500);
    })

    // 轮播图
    $(".core-slider").mouseenter(function() {
        $(".arrow").show(300);
        clearInterval(timer);
    });
    $(".core-slider").mouseleave(function() {
        timer = setInterval(slider, 2000);
    });
    var $li = $(".slider-list>li:eq(0)").clone();
    $(".slider-list").append($li);

    var imgWidth = $(".core-slider").width();
    var sliderLis = $(".slider-list").find("li");
    var thumbLis = $(".slider-navs").find("li");
    console.log(thumbLis)
    var index = 0;
    var square = 0;

    function slider() {
        if (index == sliderLis.length - 1) {
            $(".slider-list").animate({ left: 0 }, 0);
            index = 0;
        }
        index++;
        if (square < thumbLis.length - 1) {
            square++;
        } else {
            square = 0;
        }
        $(".slider-list").stop().animate({ left: -index * imgWidth }, 300);
        $(".slider-navs").find("li").eq(square).addClass('selected').siblings().removeClass('selected');
    }

    $(".arrow-next").click(function() {
        slider();
    });
    $(".arrow-prev").click(function() {
        if (index == 0) {
            $(".slider-list").css("left", -(sliderLis.length - 1) * imgWidth);
            index = sliderLis.length - 1;
        }
        index--;
        if (square > 0) {
            square--;
        } else {
            square = thumbLis.length - 1;
        }
        $(".slider-list").stop().animate({ left: -index * imgWidth }, 300);
        $(".slider-navs").find("li").eq(square).addClass('selected').siblings().removeClass('selected');
    });
    $(".slider-navs").find("li").click(function() {
        $(this).addClass('selected').siblings().removeClass('selected');
        $(".slider-list").stop().animate({ left: -($(this).index()) * imgWidth }, 300);
        square = index = $(this).index();
    });
    var timer = setInterval(slider, 2000);
}
