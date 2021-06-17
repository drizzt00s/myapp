if($(window).width()<960){
    $(document).on('click','.bubble-icon',function(){
        $(this).closest('.bubble-popover-wap').find('.m-bubble-bg').show();
        $(this).closest('.bubble-popover-wap').find('.m-bubble-container').show();
    });
    $('.m-bubble-Close').click(function(){
        $(this).closest('.bubble-popover-wap').find('.m-bubble-bg').hide();
        $(this).closest('.bubble-popover-wap').find('.m-bubble-container').hide();
    });
    $('body').click(function(e) {
        var target = $(e.target);
        if(target.closest('.bubble-frame').length < 1){
            target.closest('.bubble-popover-wap').find('.m-bubble-bg').hide();
            target.closest('.bubble-popover-wap').find('.m-bubble-container').hide();
        }
    });
    $(document).on('click','.m-bubble-Close',function(){
        $(this).closest('.bubble-popover-wap').find('.m-bubble-bg').hide();
        $(this).closest('.bubble-popover-wap').find('.m-bubble-container').hide();
    })
}
$(function () {
    var height = $('.Order_Detail_middle_dl').find('span').height();
    if(height > 41){
        $('.Order_Detail_middle_dl').find('.more-content-childFilter').show();
        $('.Order_Detail_middle_dl').find('.leave_a_message_more').show();
    }else{
        $('.Order_Detail_middle_dl').find('.more-content-childFilter').hide();
        $('.Order_Detail_middle_dl').find('.leave_a_message_more').hide();
    }



    // $('.leave_a_message_more a,.leave_a_message_more .icon').click(function(){
    //     var vthis = $(this).closest('.leave_a_message_more');
    //     if(vthis.hasClass('active')){
    //         vthis.removeClass('active').find('a').html(read_more);
    //         $(this).closest('.Order_Detail_middle_dl').find('.more-content-box').animate({'max-height':"41px"});
    //         if(parseInt(height) >= 41){
    //             $(this).closest('.Order_Detail_middle_dl').find('.more-content-childFilter').show();
    //         }
    //     }else{
    //         vthis.addClass('active').find('a').html(read_less);
    //         $(this).closest('.Order_Detail_middle_dl').find('.more-content-box').animate({'max-height':height});
    //         $(this).closest('.Order_Detail_middle_dl').find('.more-content-childFilter').hide();
    //     }
    // })
})

$(function(){

//	首页侧边栏
    if($(window).width() > 960){
        if($('.fs_account_public_content_left').length > 0){
            var scroh = $(document).scrollTop();
            var otoP = $('.fs_account_public_content_left').offset().top;
            if(scroh >= otoP){
                $('.fs_account_public_menu_dl_container').addClass('active');
            }else{
                $('.fs_account_public_menu_dl_container').removeClass('active');
            }

            $(document).scroll(function() {
                var scroH = $(document).scrollTop();
                var otop = $('.fs_account_public_content_left').offset().top;
                if(scroH >= otop){
                    $('.fs_account_public_menu_dl_container').addClass('active');
                }else{
                    $('.fs_account_public_menu_dl_container').removeClass('active');
                }
            })
        }

    }


    if($('.fs_account_public_menu_dl_container').length > 0 && $(Window).width() > 960){
        var table_top = 0;
        var table_top = $('.fs_positioning').offset().top + $('.fs_positioning').outerHeight() - $('.fs_account_public_menu_dl_container').outerHeight();
        var ScroH = $(document).scrollTop();
        var top = table_top - $('.fs_account_public_content_left').offset().top;
        if(ScroH >= table_top){
                $('.fs_account_public_menu_dl_container').addClass('choose').css('top',top + 'px');
            }else{
                $('.fs_account_public_menu_dl_container').removeClass('choose').removeAttr('style');
            }
        $(document).scroll(function() {
            var table_top1 = $('.fs_positioning').offset().top + $('.fs_positioning').outerHeight() - $('.fs_account_public_menu_dl_container').outerHeight();
            var top1 = table_top1 - $('.fs_account_public_content_left').offset().top;
            console.log(table_top1)
            var scroh = $(document).scrollTop();
            if(scroh >= table_top1){
                $('.fs_account_public_menu_dl_container').addClass('choose').css('top',top1 + 'px');
            }else{
                $('.fs_account_public_menu_dl_container').removeClass('choose').removeAttr('style');
            }
        })
    }



    if($('.fs_account_tab_ul').length >0 ){
        var ul_width = 0;
        $('.fs_account_tab_ul li').each(function(){
            ul_width += ($(this).outerWidth()+40);
        })
        if(ul_width> $(window).width()){
            $('.fs_account_tab_ul').width(ul_width);
        }
    }
    $('.fs_account_head_search').click(function(){
        $('.fs_account_public_content_left').show();
    })
    $('.fs_account_public_menu_tit .icon').click(function(){
        $('.fs_account_public_content_left').hide();
    })






    $('.function-left-click').on('click',function(){
        $('.m-product-list-Screening,.m-product-list-Screening-bg').show();
        $('.m-product-list-Screening').addClass('active');
        $('html').css({'overflow':'hidden','height':'100%'})
    });
    $('.m-window-close,.m-list-Screening-bottom-close').on('click',function(){
        $('.m-product-list-Screening').removeClass('active');
        setTimeout(function(){
            $('.m-product-list-Screening,.m-product-list-Screening-bg').hide();
        },300);
        $('html').removeAttr("style");
    });

})
function show_window(obj){
    $('.removed_window_container').hide();
    $(obj).find('.removed_window_container').show();
}