//  2018.7.5/7.14 小语种/英文新版首页上线 fairy、barry 新版修改
// pc and mobile

// pc
$(function(){
    // banner
    var oBannerSwiper = new Swiper('.banner_main .swiper-container', {
        loop: true,
        autoplay: 5000,
        effect: 'fade',
		autoplayDisableOnInteraction : false,
        onlyExternal: true,
        // 如果需要分页器
        pagination: '.banner_main .swiper-pagination',
        paginationClickable: true,
        preventClicks:false,
        // 如果需要前进后退按钮
        nextButton: '.banner_main .swiper-button-next',
        prevButton: '.banner_main .swiper-button-prev',
    })
	$('.banner_main .swiper-container').mouseover(function(){
        oBannerSwiper.stopAutoplay();
    })
    $('.banner_main .swiper-container').mouseout(function(){
        oBannerSwiper.startAutoplay();
    })

    //categories
    var oCategories = new Swiper('.categories .swiper-container', {
        slidesPerView: 10,
        slidesPerGroup: 1,
        prevButton: '.categories .swiper-button-prev',
        nextButton: '.categories .swiper-button-next',
        spaceBetween: 10,
        onlyExternal: true,
        preventClicks:false,
        breakpoints: {
            1420: {
                slidesPerView: 10,
                spaceBetween: 0,
                slidesPerGroup: 1
            },
            1220: {
                slidesPerView: 10,
                spaceBetween: 0,
                slidesPerGroup: 1
            },
            960: {
                slidesPerView: 10,
                spaceBetween: 0,
                slidesPerGroup: 1
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 0,
                slidesPerGroup: 1
            },
            480: {
                slidesPerView: 3,
                spaceBetween: 10,
                slidesPerGroup: 1
            }
        }
    })

    setInterval(function() {
        $('.index_main_bg').height($('.index_main').outerHeight())
    }, 500)
})

// mobile
$(function(){
    // banner
    var oWapBanner = new Swiper('.index_wap_banner .swiper-container', {
        pagination: '.index_wap_banner .swiper-pagination',
        paginationHide: true,
        autoplay: 5000,
        loop: true,
        paginationClickable: '.index_wap_banner .swiper-pagination',
        autoplayDisableOnInteraction: false
    })

    //有分页的轮播
    $(function(){
        var oTagSwiper = new Swiper('.swiper-tag', {
            loop: true,
            autoplay: 5000,
            slidesPerView: 3,
            spaceBetween: 30,
            pagination:'.pag-new-Paging',
			preventClicks : 'false',
			preventClicksPropagation:'false',
            breakpoints: {
                960: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                    spaceBetween: 12,
                },
                768: {
                    slidesPerView: 2,
                    slidesPerGroup: 1,
                    spaceBetween: 16,
                    slidesOffsetAfter : 0
                },
                480: {
                    slidesOffsetBefore : 0,
                    spaceBetween: 16,
                    slidesPerView: 1,
                    slidesPerGroup: 1
                }
            }
        });
        $(document).on('click','.spirit_bs',function(){
            if(oMobile !=0){
                setTimeout(function(){
                    if($('.spirit_bs').hasClass('active')){
                        oTagSwiper.stopAutoplay();
                    }
                },100);
            };
        });
		$('.box').on('click', '.spirit_bs_mobile', function(){
			oTagSwiper.stopAutoplay();
		})
		$('body').on('click', '.bubble_popup_close_a_mobile_tag', function(){
			oTagSwiper.startAutoplay();
		})

    })

    //中间产品轮播
    $(function(){
        var swiper = new Swiper('.m-Interconnection-swiper', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 16,
            breakpoints: {
                960: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    spaceBetween: 16,
                },
                768: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    spaceBetween: 16,
                },
                480: {
                    spaceBetween: 16,
                    slidesPerView: 2,
                    slidesPerGroup: 2
                }
            }
        });

    })


    //Interconnection的轮播   控制轮播在各个分辨率下的展示数量
    $(function(){
        var swiper = new Swiper('.m-swiper-video', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            slidesPerView: 3,
            spaceBetween: 16,
            breakpoints: {
                960: {
                    slidesPerView: 3,
                    slidesPerGroup: 1,
                    spaceBetween: 16,
                },
                768: {
                    slidesPerView: 2,
                    slidesPerGroup: 1,
                    spaceBetween: 16,
                },
                480: {
                    slidesOffsetBefore : 0,
                    slidesPerView: 1,
                    spaceBetween: 16
                }
            }
        });
    })

    $(window).scroll(function(){
        if($(window).width()<960){
            $('.eu_holiday').hide();
        }
    })

    //视频JS
    var oVideoSlide = new Swiper('.index_wap_video .swiper-container', {
        paginationHide: true,
        slidesPerView: 2.5,
        slidesPerGroup: 1,
        spaceBetween: 10,
        breakpoints: {
            960: {
                slidesPerView: 2.5,
                slidesPerGroup: 1,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 2.5,
                slidesPerGroup: 1,
                spaceBetween: 10,
            },
            480: {
                slidesPerView: 2.5,
                slidesPerGroup: 1,
                spaceBetween: 10,
            }
        }
    })


})
/*图片懒加载 Barry 2018.12.7*/
function loadlazy(){
    var itv = setTimeout(function(){
        var winHeight = $(window).height();
        var scrolltop = $(window).scrollTop();
        $('.lazy_img').each(function(){
            var oTop = $(this).offset().top;
            if((oTop-scrolltop) <= 1300 && (oTop-scrolltop)<winHeight){
                var src = $(this).attr("lazy-src");
                $(this).attr("src",src);
            }
        })
    },100);
}

// 页面滚动加载
$(window).scroll(function(){
    loadlazy();
})

// 页面加载完成
$(function() {
    loadlazy();
})