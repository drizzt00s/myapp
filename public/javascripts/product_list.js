var _nowHe01z = $(".new_proList_mainListBox_serBg").height();
var _moreHez = $('.new_proList_serchListLeft').height() - $('.new_proList_serchListMain').height();
var _nowSpeadz = _nowHe01z/300
$('.proName_select_left dl.listSel dt').on('click', function() {
    if ($(this).find('.up_down_ic').hasClass('choosez')) {
        $(this).find('.up_down_ic').removeClass('choosez').html('&#xf049');
        $(this).siblings().slideDown(300);
    } else {
        $(this).find('.up_down_ic').html('&#xf057').addClass('choosez');
        $(this).siblings().slideUp(300);
    }
    if($(window).width()>960){
        if($('.new_proList_serchListLeft').height() > $('.new_proList_serchListMain').height()){
            var _nowHe = $(".new_proList_mainListBox_serBg").height();
            var _moreHe02 = $('.new_proList_serchListLeft').height() - $('.new_proList_serchListMain').height();
            $(".new_proList_mainListBox_serBg").animate({"height":_nowHe-_moreHe02},_moreHe02/_nowSpeadz);
        }else{
            var _nowHe03 = $('.new_proList_serchListMain').height() - $('.new_proList_serchListLeft').height();
            setTimeout(function(){
                $(".new_proList_mainListBox_serBg").animate({"height":_nowHe01z},_moreHez/_nowSpeadz);
            },_nowHe03/_nowSpeadz)
        }
    }
})

$('.listSel').each(function(){
    if ($(this).find('dd').hasClass('choosez')) {
        $(this).find('dd').removeClass('hide');
        $(this).find('dt').addClass('choosez').find('i.up_down_ic').removeClass('choosez').html('&#xf049');
    }
})

// loading animation
function spinloader(){
    $('.list_fsLoading').show();
    $('body,html').animate({scrollTop: 0},10);
}
$(function(){
    $('.listLi').on('click',function(){
        $(this).addClass('choosez').siblings().removeClass('choosez');
    })
    // view all 按钮
    $('body').on('click','.va_select',function(){
        $(this).siblings('.va_select_hideInput').attr({"checked": true})
        $(this).parent('.va_select_cont').siblings().find('.va_select_hideInput').attr({"checked": false})
        $(this).addClass('choosez').parent('.va_select_cont').siblings().find('.va_select').removeClass('choosez');

    })
    $('.popularity_view_sort').on('click',function(){
        if ($(this).hasClass('show')) {
            $('.popularity_view_list1').fadeOut('fast');
            $(this).removeClass('show');
        }else{
            $('.popularity_view_list1').fadeIn('fast');
            $(this).addClass('show');
        }
    })
    $('.popularity_view_num').on('click',function(){
        if ($(this).hasClass('show')) {
            $('.popularity_view_list2').fadeOut('fast');
            $(this).removeClass('show');
        }else{
            $('.popularity_view_list2').fadeIn('fast');
            $(this).addClass('show');
        }
    })
    $('.popularity_view_list1 li').on('click',function(){
        var oContent = $(this).text();
        $('.popularity_view_sort').find('.numT').text(oContent).removeClass('show');
        $('.popularity_view_list1').fadeOut('fast');
    })
    $('.popularity_view_list2 li').on('click',function(){
        var oContent = $(this).text();
        $('.popularity_view_num').find('.numT').text(oContent).removeClass('show');
        $('.popularity_view_list2').fadeOut('fast');
    })
    $('.Menu_box li').on('click',function(){
        if($(this).hasClass('table_array_btn')){
            $(this).addClass('choosez').siblings('.video_array_btn,.picture_array_btn').removeClass('choosez');
            $('.table_array_page').removeClass('choosez').siblings().addClass('choosez');
            $('.popularity_view_box').addClass('choosez')
            $('.popularity_view_list.select_three').show();
            $('.popularity_array_btn,.m_filter_selbox').removeClass('choosez');
            $('.popularity_array_btn').hide();
            $('.mation_select_right .mation_page_guide').hide();
        }else{
            if ($(window).width() >= 960) {
                if ($(this).hasClass('video_array_btn')) {
                    $('.popularity_view_box.select_one').removeClass('choosez');
                    $('.popularity_view_box.select_two').addClass('choosez');
                    $('.popularity_view_list.select_three').hide();
                }else if($(this).hasClass('picture_array_btn')){
                    $('.popularity_view_box.select_one').addClass('choosez');
                    $('.popularity_view_box.select_two').removeClass('choosez');
                    $('.popularity_view_list.select_three').hide();
                }
            }else{
                $('.popularity_view_box.select_one,.popularity_view_box.select_two').addClass('choosez');
                if ($(this).hasClass('video_array_btn') || $(this).hasClass('picture_array_btn')) {
                    $('.popularity_array_btn').show();
                }
            }
            if ($(this).hasClass('video_array_btn')){
                $(this).addClass('choosez').siblings('.picture_array_btn,.table_array_btn').removeClass('choosez');
                $('.video_array_page').removeClass('choosez').siblings().addClass('choosez');
                $('.popularity_view_list.select_three').hide();
            }else if($(this).hasClass('picture_array_btn')){
                $(this).addClass('choosez').siblings('.video_array_btn,.table_array_btn').removeClass('choosez');
                $('.picture_array_page').removeClass('choosez').siblings().addClass('choosez');
                $('.popularity_view_list.select_three').hide();
            }else if($(this).hasClass('sellist_array_btn')){
                if($(this).hasClass('choosez')){
                    $(this).removeClass('choosez')
                    $(".proName_select_left").css({'display':'block'});
                }else{
                    $(this).addClass('choosez')
                    $(".proName_select_left").css({'display':'none'});
                }
            }else if($(this).hasClass('popularity_array_btn') && !$(this).siblings('.table_array_btn').hasClass('choosez')){
                if ($(this).hasClass('choosez') && $(window).width() <= 960) {
                    $(this).removeClass('choosez');
                    $('.m_filter_selbox').removeClass('choosez');
                }else{
                    $(this).addClass('choosez');
                    $('.m_filter_selbox').addClass('choosez');
                }
            }
            $('.mation_select_right .mation_page_guide').show();
        }
    })
    $(document).bind("click", function(e) {
        var target = $(e.target);
        if(target.closest(".popularity_view_sort").length == 0){
            $('.popularity_view_list1').fadeOut('fast');
            $(".popularity_view_sort").removeClass('show');
        }
        if(target.closest(".popularity_view_num").length == 0){
            $('.popularity_view_list2').fadeOut('fast');
            $(".popularity_view_num").removeClass('show');
        }
    });
    $(document).on('click','.the_page',function(){
        var _thisIn = $(this).parent().index();
        _thisLen = $(this).parents('.FS_pation_cont').find('.FS_pation_item').length;
        if($(this).parent('.FS_pation_item').hasClass('omit')){
            return false;
        }else{
            if (!$(this).parent().hasClass('choosez')) {
                $(this).parent().addClass('choosez').siblings().removeClass('choosez');
                if (_thisIn == 0) {
                    $('.list_pro_page').css({'color':'#cccccc','cursor':'default'});
                    $('.list_next_page').css({'color':'#232323','cursor':'pointer'});
                }else if(_thisIn == _thisLen-1){
                    $('.list_next_page').css({'color':'#cccccc','cursor':'default'});
                    $('.list_pro_page').css({'color':'#232323','cursor':'pointer'});
                }else{
                    $('.list_pro_page,.list_next_page').css({'color':'#232323','cursor':'pointer'});
                }
            }
        }
    })
    $('.list_pro_page').on('click',function(){
        var _item = $(this).siblings('.FS_pation_cont').find('.FS_pation_item.choosez').index()-1;
        if ($(this).siblings('.FS_pation_cont').find('.FS_pation_item').eq(_item).hasClass('omit')) {
            $(this).siblings('.FS_pation_cont').find('.FS_pation_item').eq(_item-1).addClass('choosez').siblings().removeClass('choosez');
        }else{
            if (_item <= 0) {
                $(this).css({'color':'#cccccc','cursor':'default'});
                if (_item == 0) {
                    $(this).siblings('.FS_pation_cont').find('.FS_pation_item').eq(0).addClass('choosez').siblings().removeClass('choosez');
                }
            }else{
                $('.list_next_page').css({'color':'#232323','cursor':'pointer'});
                $(this).siblings('.FS_pation_cont').find('.FS_pation_item').eq(_item).addClass('choosez').siblings().removeClass('choosez');
            }
        }

    })
    $('.list_next_page').on('click',function(){
        var _item = $(this).siblings('.FS_pation_cont').find('.FS_pation_item.choosez').index()+1;
        _itemLen = $(this).siblings('.FS_pation_cont').find('.FS_pation_item').length-1
        if ($(this).siblings('.FS_pation_cont').find('.FS_pation_item').eq(_item).hasClass('omit')) {
            $(this).siblings('.FS_pation_cont').find('.FS_pation_item').eq(_item+1).addClass('choosez').siblings().removeClass('choosez');
            if (_item+1 == _itemLen) {
                $(this).css({'color':'#cccccc','cursor':'default'});
            }
        }else{
            if (_item <= _itemLen) {
                $('.list_pro_page').css({'color':'#232323','cursor':'pointer'});
                $(this).siblings('.FS_pation_cont').find('.FS_pation_item').eq(_item).addClass('choosez').siblings().removeClass('choosez');
                if (_item == _itemLen) {
                    $(this).siblings('.FS_pation_cont').find('.FS_pation_item').eq(_itemLen).addClass('choosez').siblings().removeClass('choosez');
                    $(this).css({'color':'#cccccc','cursor':'default'});
                }
            }
        }

    })
})

//视频播放
function my_video_play(_this,is_mobile){
    is_mobile = is_mobile?is_mobile:false;
    var _this = $(_this);
    $('#new_popup_video').show();
    $("#new_popup_video_bendi").hide();
    $('#new_popup_video_bendi').attr('src','');
    $('#new_popup_video_title').html(_this.attr('data-title'));
    $('#new_popup_video_iframe').show().attr('src',_this.attr('data-link'));
    if(is_mobile){
        $('.new_popup_video').height($(window).width() * 0.5625);
    };
    $('.new_popup').addClass('show');
}
//本地視頻播放
function my_video_play_01(_this,is_mobile){
    is_mobile = is_mobile?is_mobile:false;
    var _this = $(_this);
    $('#new_popup_video').show();
    $("#new_popup_video_iframe").hide();
    $('#new_popup_video_iframe').attr('src','');
    $('#new_popup_video_title').html(_this.attr('data-title'));
    $('#new_popup_video_bendi').show().attr('src',_this.attr('data-link'));
    if(is_mobile){
        $('.new_popup_video').height($(window).width() * 0.5625);
    };
    $('.new_popup').addClass('show');
}
// 视频关闭
$('.new_popup_tit .icon').click(function(){
    $('.new_popup').hide();
    $('#new_popup_video_iframe').attr('src','');
    $('#new_popup_video_bendi').attr('src','');
    $('.new_popup').removeClass('show');
})
//loading
$('.listSel dd a').on('click',function(){
    spinloader();
})
$('.popularity_view_list1 ol li').on('click',function(){
    if(!$(this).hasClass('choosez')){
        spinloader();
    }
})
$('.popularity_view_list2 ol li').on('click',function(){
    if(!$(this).hasClass('choosez')){
        spinloader();
    }
})
$(document).on('click','#ProductsAttributes .icon.iconfont',function(){
    $('#addproductsinfo').html('');
})
$(document).bind("click", function(e) {
    var target = $(e.target);
    if(target.closest(".new_popup_bg").length != 0) {
        $('#addproductsinfo').html('');
    }
})

//fairy 2018.11.9
// 异步获取产品列表页面，一个产品的展示
function ajax_get_one_product_show(_this){
    var _this = $(_this);
    if(_this.hasClass('choosez')){
        return false;
    }
    var show_type = _this.attr('data-show-type');
    if(show_type == 'list'){
        var _parent = _this.parents('li.new_proList_mainListTli')
    }else{
        var _parent = _this.parents('li.new_proList_mainListLi')
    }
    var products_id = _this.attr('data-product-id');
    var old_current_attribute = _parent.find('.new_proList_ListSizes li.choosez a').attr('title');
    _this.addClass('choosez').siblings().removeClass('choosez');
    var current_attribute = _this.find('a').attr('title');
    var service_attributes_data = _parent.find('.new_proList_ListSizes').html();
    var service_title_data = _parent.find('h3 a').html();
    var is_common_title = _parent.find('h3 a').attr('data-is-common-title');
    //获取关联组的第一个产品ID
    var first_product =  _parent.find('li.new_proList_ListSizes_listLi:first').attr('data-product-id');
    $.ajax({
        type: 'POST',
        url: '?modules=ajax&handler=product_list&ajax_request_action=ajax_get_one_product_show',
        dataType: "json",
        data: {
            'products_id': products_id,
            'show_type': show_type,
            'is_common_title': is_common_title,
            'first_product':first_product,
        },
        beforeSend: function () {
            show_loading(_this,'show','',1);
        },
        success: function (response) {
            show_loading(_this,'hide','',1);
            var data = response.data.data;
            data = data.replace('SERVICE_ATTRIBUTES_DATA',service_attributes_data);

            if(is_common_title){
                //由于reg根据old_current_attribute生成一个正则表达式，但是old_current_attribute中有特殊字符+，最后直接影响了数据的替换
                if(response.data.is_module_products){
                    if (response.data.languages_code === 'jp') {
                        service_title_data = service_title_data.replace(", " + old_current_attribute +''+fs_title_compatible, '');
                        var reg = new RegExp( 'SERVICE_TITLE_DATA','g');
                        data = data.replace( reg ,service_title_data+'、'+current_attribute+''+fs_title_compatible);
                    } else {
                        service_title_data = service_title_data.replace(", " + old_current_attribute +' '+fs_title_compatible, '');
                        var reg = new RegExp( 'SERVICE_TITLE_DATA','g');
                        data = data.replace( reg , service_title_data + ', '+current_attribute+ ' ' + fs_title_compatible);
                    }
                }else{
                    service_title_data = service_title_data.replace(", "+old_current_attribute,'');
                    var reg = new RegExp( 'SERVICE_TITLE_DATA','g');
                    if (response.data.languages_code === 'jp') {
                        data = data.replace(reg, service_title_data + '、' + current_attribute);
                    } else {
                        data = data.replace(reg, service_title_data + ', ' + current_attribute);
                    }
                }
            }
            if(show_type == 'list'){
                _parent.html(data);
            }else{
                _parent.html(data);
            }
            var src =_parent.find('h3 a').attr('src');
            _parent.find('.new_proList_ListSizes_list li:last a').attr('src',src);
        },
        error: function () {

        }
    });
}

// 异步获取产品列表页面，一个产品的展示 m端列表
function m_ajax_get_one_product_show(_this){
    var _this = $(_this);
    if(_this.hasClass('active')){
        return false;
    }
    var show_type = _this.attr('data-show-type');
    if(show_type == 'list'){
        var _parent = _this.parents('li.new_proList_mainListTli')
    }else{
        var _parent = _this.parents('li.m-product-list-li')
    }
    var products_id = _this.attr('data-product-id');
    var old_current_attribute = _parent.find('.m-product-list-label span.active a').attr('title');
    _this.addClass('active').siblings().removeClass('active');
    var current_attribute = _this.find('a').attr('title');
    var service_attributes_data = _parent.find('.m-product-list-label').html();
    var service_title_data = _parent.find('h2 a').html();
    var is_common_title = _parent.find('h2 a').attr('data-is-common-title');
    $.ajax({
        type: 'POST',
        url: '?modules=ajax&handler=product_list&ajax_request_action=ajax_get_one_product_show',
        dataType: "json",
        data: {
            'products_id': products_id,
            'show_type': show_type,
            'is_common_title': is_common_title,
        },
        beforeSend: function () {
            show_loading(_this,'show','',1);
        },
        success: function (response) {
            show_loading(_this,'hide','',1);
            var data = response.data.data;
            data = data.replace('SERVICE_ATTRIBUTES_DATA',service_attributes_data);

            if(is_common_title){
                if(response.data.is_module_products){
                    var reg = new RegExp( ', '+old_current_attribute+' '+fs_title_compatible,'g');
                    service_title_data = service_title_data.replace(reg,'');
                    reg = new RegExp( 'SERVICE_TITLE_DATA','g');
                    data = data.replace( reg ,service_title_data+', '+current_attribute+' '+fs_title_compatible);
                }else{
                    var reg = new RegExp( ', '+old_current_attribute,'g');
                    service_title_data = service_title_data.replace(reg,'');
                    reg = new RegExp( 'SERVICE_TITLE_DATA','g');
                    data = data.replace( reg ,service_title_data+', '+current_attribute);
                }
            }
            if(show_type == 'list'){
                _parent.html(data);
            }else{
                _parent.html('<div class="m-product-list-center-container">'+data+'</div>');
            }
            var src =_parent.find('h2 a').attr('src');
            _parent.find('.m-product-list-label span:last a').attr('src',src);
        },
        error: function () {

        }
    });
}


/*
  * 异步获取产品列表页面，一个产品的展示
  * @para from_where,来自于哪里 list/qv
  * @para attribute_parent_id,该属性如果是父级属性id，则是当前属性。不是则为0
 */
function ajax_get_one_product_qv_show(_this,from_where){
    from_where = typeof (from_where) == 'undefined'?'list':from_where;
    var _this = $(_this);
    var products_id = _this.attr('data-product-id');
    if(isMobileJs=='1'){
        window.location.href = siteCodeJs+'/products/'+products_id+'.html';
        return false;
    }
    var _qvLoading = '<div class="spinWrap list_fsLoading" style="position:absolute;"><div class="bg_color"></div><div id="loader_order_alone" class="loader_order"><svg class="circular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"></circle></svg></div></div>';
    $('#new_pro_QV').css('z-index','99999').show();
    $('#new_pro_QV').addClass('qv_edition_eightAugust');
    if(from_where == 'qv'){ // qv弹窗里面的属性切换
        first_product_id = $('#qv_first_product_id').val()
    }else{
        if(_this.parents('.new_proList_mainListLi').length){
            first_product_id = _this.parents('.new_proList_mainListLi').find('.new_proList_ListSizes_list li:eq(0)').attr('data-product-id');
        }else{
            first_product_id = _this.parents('.new_proList_mainListTli').find('.new_proList_ListSizes_list li:eq(0)').attr('data-product-id');
        }
    }
    var products_id = _this.attr('data-product-id');
    $.ajax({
        type: 'POST',
        url: 'index.php?modules=ajax&handler=product_list&ajax_request_action=ajax_get_one_product_qv_show',
        dataType: "json",
        data: {
            'products_id': products_id,
            'first_product_id': first_product_id,
        },
        beforeSend: function () {
            // show_loading(_this,'show','',1);
            $('#new_pro_QV_inner').html(_qvLoading);
            if(from_where == 'list'){
                $('#new_pro_QV').css('z-index','99999').show();
            }
        },
        success: function (response) {
            // show_loading(_this,'hide','',1);
            $('#new_pro_QV_inner').html(response.data);
            var _innerHe = $('#new_pro_QV_inner').height();
            $('#new_pro_QV_window').addClass('qv_animate_active ').animate({'height': _innerHe+'px'},300);
            if(from_where == 'list'){
                $('#qv_first_product_id').val(first_product_id);
            }
            //页面滚动条隐藏
            $('html').css('overflow','hidden');
            //轮播图的尺寸
            var _listLil = $('.detail_proImg_new_listLi').length;
            var _listLiw = $('.detail_proImg_new_listLi').width();
            $('.detail_proImg_new_list').width(_listLil*_listLiw+'px');
            // qv推荐产品轮播图
            var _liLen1 = $('.addCart_bought_carousel_box ul li').length;
            var _liWid1 = $('.addCart_bought_carousel_box ul li').width()+parseInt($('.addCart_bought_carousel_box ul li').css('padding-right'));
            var _weidget1= $('.addCart_bought_carousel_box ul');
            var _cabox = $('.addCart_bought_carousel_box').width();
            $('.addCart_bought_carousel_box ul').width(_liWid1*_liLen1);
            $('.addCart_alert_pre').on('click',function(){
                if (Math.abs(parseInt(_weidget1.css('left')))>0){
                    $(this).siblings('.addCart_alert_next').css({'opacity':1,'pointer-events': 'auto'});
                    if (Math.abs(parseInt(_weidget1.css('left')))>=_liWid1*2) {
                        $(this).siblings('.addCart_bought_carousel_box').find('ul').stop().animate({left:parseInt(_weidget1.css('left'))+_liWid1*2},400);
                        if(Math.abs(parseInt(_weidget1.css('left'))) ==_liWid1*2){
                            $(this).css({'opacity':.35,'pointer-events': 'none'});
                        }
                    }else if(Math.abs(parseInt(_weidget1.css('left')))>=_liWid1){
                        $(this).css({'opacity':.35,'pointer-events': 'none'});
                        $(this).siblings('.addCart_bought_carousel_box').find('ul').stop().animate({left:parseInt(_weidget1.css('left'))+_liWid1},200);
                    }else{
                        return false;
                    }

                }else{
                    return false;
                }
            })
            $('.addCart_alert_next').on('click',function(){
                if (_weidget1.width() > (Math.abs(parseInt(_weidget1.css('left')))+_cabox)){
                    $(this).siblings('.addCart_alert_pre').css({'opacity':1,'pointer-events': 'auto'});
                    if (_weidget1.width()-(Math.abs(parseInt(_weidget1.css('left')))+_cabox)>=_liWid1*2) {
                        $(this).siblings('.addCart_bought_carousel_box').find('ul').stop().animate({left:parseInt(_weidget1.css('left'))-_liWid1*2},400);
                        if(_weidget1.width()-(Math.abs(parseInt(_weidget1.css('left')))+_cabox) >= _liWid1*2 && _weidget1.width()-(Math.abs(parseInt(_weidget1.css('left')))+_cabox) <= _liWid1*3){
                            $(this).css({'opacity':.35,'pointer-events': 'none'});
                        }
                    }else if(_weidget1.width()-(Math.abs(parseInt(_weidget1.css('left')))+_cabox)>=_liWid1){
                        $(this).siblings('.addCart_bought_carousel_box').find('ul').stop().animate({left:parseInt(_weidget1.css('left'))-_liWid1},200);
                        $(this).css({'opacity':.35,'pointer-events': 'none'});
                    }else{
                        return false;
                    }

                }else{
                    return false;
                }
            });
            // $('#new_pro_QV_window').scroll(function(){
            //     var oAllHeight = $('.qv_detail_clearBox').height();
            //     var oScrollHeight = $('.detail_proLeft').outerHeight();
            //     var oMaxTop = oAllHeight - oScrollHeight;
            //     var oTop = $('#new_pro_QV_window').scrollTop() + 'px';
            //     if(parseInt(oTop) >= oMaxTop){
            //         oTop = oMaxTop + 'px'
            //     }
            //     $('.detail_proLeft').css('top',oTop);
            // })
            //
            $(function(){
                $('#new_pro_QV_window').scroll(function(){
                    oScrollTop = $('#new_pro_QV_window').scrollTop();
                    $('.new_pro_QVclose').css('top',oScrollTop)
                })
            });
            detail_proImg_defalt()
        },
        error: function () {

        }
    });
}
// 关闭qv窗口
function hide_product_qv_show(){
    $('#new_pro_QV').hide();
    $('html').css('overflow','auto');
    $('#new_pro_QV_window').removeClass('qv_animate_active').css({'height':"450px"});
}

// qv 产品左边轮播图 start
function detail_proImg_defalt(){
    var _proIn = $('.checked_proImg_li.choosez').index();
    var _proLen  = $('.checked_proImg_li').length;
    switch (_proIn) {
        case 0:
            $('.detail_proImg_pre').css({'pointer-events':'none','opacity':.35});
            break;
        case _proLen-1:
            $('.detail_proImg_next').css({'pointer-events':'none','opacity':.35});
            break;
        case _proIn:
            $('.detail_proImg_pre,.detail_proImg_next').css({'pointer-events':'auto','opacity':1});
            break;
    }
}

function detail_proImg_pre(that){
    var _thatDev = that.siblings('.proImg_check_carousel_cont');
    var _proIn = _thatDev.find('.checked_proImg_li.choosez').index();
    var _proInJ = _proIn-1;
    var _proLen  = _thatDev.find('.checked_proImg_li').length;
    var _probtw = _thatDev.find('.checked_proImg_li').width();
    var _probtm = parseInt(_thatDev.find('.checked_proImg_li').css('margin-right'));
    var _liWid = that.parents('.detail_proImg_bottom').siblings('.detail_proImg_top').find('.detail_proImg_new_list li').width();
    var _weidget= that.parents('.detail_proImg_bottom').siblings('.detail_proImg_top').find('.detail_proImg_new_list');
    var _weidget1= _thatDev.find('.detail_proImg_new_btList');
    that.siblings('.detail_proImg_next').css({'pointer-events':'auto','opacity':1});
    $(that).siblings('.detail_proImg_next').css({'pointer-events':'auto','opacity':1});
    if (_proInJ <= _proLen) {
        if (!that.parents('.detail_proImg_bottom').siblings('.detail_proImg_top').find('.detail_proImg_new_list').is(":animated")) {
            if (_proInJ <= 0) {
                that.css({'pointer-events':'none','opacity':.35});
                that.parents('.detail_proImg_top').find('.play_proDetail_video').addClass('choosez');
            }else{
                that.parents('.detail_proImg_top').find('.play_proDetail_video').removeClass('choosez');
                that.css({'pointer-events':'auto','opacity':1})
            }
            _thatDev.find('.checked_proImg_li').eq(_proInJ).addClass('choosez').siblings().removeClass('choosez');
            that.parents('.detail_proImg_bottom').siblings('.detail_proImg_top').find('.detail_proImg_new_list').stop().animate({left:(parseInt(_weidget.css('left'))+_liWid)},400);
        }
    }
    var _weidgetL = parseInt(_weidget1.css('left'));
    if (!_weidget1.is(":animated")) {
        if ((Math.abs(_weidgetL/(_probtw+_probtm))) == _proIn) {
            _weidget1.stop().animate({left:parseInt(_weidget1.css('left'))+(_probtw+_probtm)},400);
        }

    }

}
function detail_proImg_next(that){
    var _thatDev = that.siblings('.proImg_check_carousel_cont');
    var _proIn = _thatDev.find('.checked_proImg_li.choosez').index();
    var _proLen  = _thatDev.find('.checked_proImg_li').length;
    var _probtw = _thatDev.find('.checked_proImg_li').width();
    var _probtm = parseInt(_thatDev.find('.checked_proImg_li').css('margin-right'));
    var _liWid = that.parents('.detail_proImg_bottom').siblings('.detail_proImg_top').find('.detail_proImg_new_list li').width();
    var _weidget= that.parents('.detail_proImg_bottom').siblings('.detail_proImg_top').find('.detail_proImg_new_list');
    var _weidget1= _thatDev.find('.detail_proImg_new_btList');
    that.siblings('.detail_proImg_pre').css({'pointer-events':'auto','opacity':1});
    if (!that.parents('.detail_proImg_bottom').siblings('.detail_proImg_top').find('.detail_proImg_new_list').is(":animated")) {
        var _proInJ = _proIn+1;
        if (_proInJ <= _proLen) {
            if (_proInJ +1== _proLen) {
                that.css({'pointer-events':'none','opacity':.35});
            }else{
                that.css({'pointer-events':'auto','opacity':1});
            }
            _thatDev.find('.checked_proImg_li').eq(_proInJ).addClass('choosez').siblings().removeClass('choosez');
            that.parents('.detail_proImg_bottom').siblings('.detail_proImg_top').find('.detail_proImg_new_list').stop().animate({left:(parseInt(_weidget.css('left'))-_liWid)},400);
        }
    }

    if (!_weidget1.is(":animated")) {
        var _proInJ = _proIn+1;
        if (_proInJ+1 > 5) {
            _weidget1.stop().animate({left:parseInt(_weidget1.css('left'))-(_probtw+_probtm)},400);
        }

    }


}
// qv 产品左边轮播图 end

//产品列表页面加入购物车
function list_cart_quantity_change(type,id){
    var qty = parseInt($("#img_quantity2_"+id).val());
    if(!isNaN(qty)){
        switch(type){
            case 0:
                if(qty >=2){
                    $("#img_quantity_"+id).val(qty-1);
                    $("#img_quantity2_"+id).val(qty-1);
                }else{
                    //notice('The quantity cann\'t be zero !');
                }
                $("#img_quantity2_"+id).addClass('focus').focus();
				$("#img_quantity2_"+id).siblings('.pro_mun').addClass('focus');
                break;
            case 1:
                if(qty >=99999){
                    $("#img_quantity_"+id).val(qty);
                    $("#img_quantity2_"+id).val(qty);
                }else{
                    $("#img_quantity_"+id).val(qty+1);
                    $("#img_quantity2_"+id).val(qty+1);
                }
                $("#img_quantity2_"+id).addClass('focus').focus();
				$("#img_quantity2_"+id).siblings('.pro_mun').addClass('focus');
                break;
        }
        qty = parseInt($("#img_quantity2_"+id).val());
        var attr_str = "";
        var length = "";
        var page_type=2;
        var evt="";
        proorder_process_and_ship(evt,qty,id,attr_str,length,page_type);
    }else{
        //notice('Please enter a number !');
        $("#img_quantity_"+id).val(1);
        $("#img_quantity2_"+id).val(1);
        return false;
    }
}

/**
 * 公共修产品改数量
 * @param type
 * @param _this
 * @param from_type
 * @param id
 * @param product_box
 * @param packing_number
 * @param is_clearance 是否是清仓产品
 * @param clearance_qty 清仓产品总库存
 * @returns {boolean}
 */
function common_cart_quantity_change(type,_this,from_type,id,product_box,packing_number,is_clearance,clearance_qty){
    var _this = $(_this);
    if(from_type == 'qv'){
        if(_this.parents('.newDetail_addCart_box').length){
            var _parent = _this.parents('.newDetail_addCart_box');
        }else{
            var _parent = _this.parents('.add_subtract_button');
        }
        var cart_quantity_input = _parent.find("input[name=cart_quantity]");
        var qty = parseInt(cart_quantity_input.val());
    }
    if(!isNaN(qty)) {
        switch(type){
            case 0:
                if(qty >=2){
                    var new_qty = qty-1;
                    cart_quantity_input.val(new_qty);
                }
                _this.closest('.newPro_common_num_cont').find('input').addClass('focus').focus();
				_this.closest('.newPro_common_num_cont').find('.pro_mun').addClass('focus');
                break;
            case 1:
                if(qty >=99999){
                    cart_quantity_input.val(qty);
                }else{
                    var new_qty = qty+1;
                    cart_quantity_input.val(new_qty);
                }
                _this.closest('.newPro_common_num_cont').find('input').addClass('focus').focus();
				_this.closest('.newPro_common_num_cont').find('.pro_mun').addClass('focus');
                break;
        }
        var attr_str = "";
        var length = "";
        var page_type=3;
        var qty = cart_quantity_input.val();
        proorder_process_and_ship(_this,qty,id,attr_str,length,page_type)
        if(product_box==1){
            if($('#button_2').hasClass('choosez')){
                qty =qty * packing_number;
                $('#product_ea').hide();
                var choosez =1;
            }else{
                $('#product_ea').show();
                var choosez =2;
            }
            $.ajax({
                type:"POST",
                dataType:"json",
                url:"?modules=ajax&handler=products_quote_info&ajax_request_action=packing_conditions_new&main_page=product_info",
                data:{products_id:id,qty:qty,type:choosez},
                success:function(data){
                    if(data!=false){
                        $('.detail_proPrice').html(data.price);
                        $('.fs_clh_Prodiscount_new').html(data.discount);
                        if(qty>=packing_number && data.discount!=""){
                            $('.fs_pro_Prodiscount_box').show();
                        }else{
                            $('.fs_pro_Prodiscount_box').hide();
                        }
                        $('#popup_cart_price').html(data.product_price);
                    }
                }
            })
        }
    } else {
        //alert(ENTER_NUMBER);
        cart_quantity_input.val(1);
        return false;
    }
    //清仓产品加购数量限制
    if(is_clearance){
        var buy_clearance_qty = cart_quantity_input.val();
        clearance_add_to_cart_restriction('#qv_quantity_'+id,buy_clearance_qty,1,clearance_qty);
    }
}


//详情加购数量框样式
$('body').click(function(e) {
	var target = $(e.target);
	if(target.closest('.newPro_common_num_cont').length < 1) {
		$('.newPro_common_num_cont').find('input').removeClass('focus');
		$('.newPro_common_num_cont').find('.pro_mun').removeClass('focus')
	}
});

//公共加入购物车  备注：目前列表页的加购按钮已去掉,如果按钮回复的话,必须要传已下参数,否则就会报错
function commonProdAddtoCart(_this,type,box_number,is_clearance,clearance_qty) {
    var _this = $(_this);
    box_number = typeof(box_number)=='undefined'?0:box_number;
    if(type == 'qv'){
        var _parent = _this.parents('.qv_edition_eightAugust_btm').siblings('.qv_detail_clearBox');
        var price =  _parent.find('.product_price_useful').html();
        var pro_title = _parent.find('.detail_proDecribe_tit h1').html();
        var pro_img = _parent.find('.qv_hidden_img_div img').attr('src');
    }else if(type == 'image'){
        var _parent = _this.parents('.new_proList_mainListLi');
        var price = _parent.find('.new_proList_ListBPrice').html();
        var pro_title = _parent.find('.new_proList_ListBlink').html();
        var pro_img = _parent.find('.new_proList_ListImg a img').attr('src');
    }else if(type == 'list'){
        var _parent = _this.parents('.new_proList_mainListTli');
        var price = _parent.find('.new_proList_ListBPrice').html();
        var pro_title = _parent.find('.new_proList_Array_col h3').html();
        var pro_img = _parent.find('.new_proList_ListImg a img').attr('src');
    }else if(type == 'm_image'){
        var _parent = _this.parents('.m-product-list-ul li');
        var price = _parent.find('.m-product-list-pic').html();
        var pro_title = _parent.find('.m-product-list-tit').html();
        var pro_img = _parent.find('.m-product-list-center-left .video img').attr('src');
    }else if(type == 'offline'){
        var _parent = _this.parents('.video_array_form').find(".product_list_text");
    }

    if(type == 'new_list'){
        var qtys = 1;
        var ids = _this.attr('data-product-id');
    }else{
        var qtys = _parent.find("input[name=cart_quantity]").val();
        var ids = _this.attr('data-products-id');
    }

    if(type == 'qv'){
        qtys = _this.parents('.newDetail_addCart_box').find("input[name=cart_quantity]").val();
        if($('#button_2').hasClass('choosez') && box_number>0){
            qtys=qtys*box_number;
        }
    }

    $.ajax({
        type: "POST",
        dataType: "json",
        url: "ajax_products_special.php?action=addCart",
        data: {ids: ids, qtys: qtys,is_clearance: is_clearance, clearance_qty: clearance_qty},
        beforeSend:function(){
            _this.addClass('addLoad_animation');
            _this.find('.new_addCart_loading').removeClass('choosez');
            _this.find('.new_pro_addCart_mainDev').css('opacity','0');
        },
        success: function (msg) {
            _this.removeClass('addLoad_animation').addClass("had_choosez");
            _this.find('.new_addCart_loading').addClass('choosez');
            _this.find('.new_pro_addCart_mainDev').css('opacity','1');
            if(msg.status=='success'){
                if (typeof _faq !== "undefined") {
                    //数据统计 add by tim
                    _faq.push(['trackEvent', 'add_cart_click', {"p_id": ids, "p_num": qtys, "site" : 3}, 4]);
                }
                dataLayer.push({
                    "event": "addToCart",
                    "ecommerce": {
                        "currencyCode": msg.currencyCode,
                        "add": {
                            "products": [msg.products_info]
                        }
                    }
                });

                if(type == 'qv'){
                    hide_product_qv_show();
                }
                $("#ShoppingCartInfo").html(msg.html);
                if(qtys >1){
                    $('#popup_catr_nunm').html(added_more_item_str.replace('[ADDITEM]',qtys));
                }else{
                    $('#popup_catr_nunm').html(added_one_item_str.replace('[ADDITEM]',qtys));
                }
                $('#addCart_qty_num_list').html(qtys);
                $("#video_img_list").html('<a href="products/'+ids+'.html"><img width="100" height="100" src="'+pro_img+'"></a>');
                $("#video_array_title_list").html(pro_title+"<span>#"+ids+"</span>");
                if(!box_number){
                    $('#popup_cart_price_list').html(price); // add success window price
                }else{
                    if(qtys == 1){
                        $('#popup_cart_price_list').html(price); // add success window price
                    }
                }
                $('#product_cart_popup').html(msg.addCarthtml);
                $('#product_cart_popup .new_product_popup_addCart').show();
                $(".new_popup_bg").show();
                _this.removeClass("addLoad_animation").find(".new_addCart_loading").addClass("choosez");
                var num = parseInt($("#ShoppingCartInfo").find(".header_cart_href").find("em").text());
                if (num > 0 && num < 10) {
                    num = num
                } else if (num > 10) {
                    num = "+"
                } else {
                    num = 0
                }
                $(".m_cart").html(msg.html);
                // _this.removeAttr('disabled').find(".add_to_cart_iconfont").show();
                $('body').css({"padding-right":"15px"})
                $('html').css({'overflow':"hidden"});
            }
            if(msg.status=='error'){
                $('.clearance_total_qty').html(clearance_qty);
                $('.custom_product_tips_fa').show();
            }
        }
    });
}

//装箱按钮操作
function pack_switch(_this,id,box_number){
    //装箱
    var _this = $(_this);
    var cart_quantity_ele = $('#qv_quantity_'+id);
    if(_this.hasClass("choosez")){
    }else{
        cart_quantity_ele.val(1);
    }
    var qty =parseInt(cart_quantity_ele.val());
    var box_qty=qty;
    _this.addClass(' choosez').siblings("dd").removeClass("choosez");
    if($('#button_2').hasClass('choosez')){
        box_qty=qty*box_number;
        $('#product_ea').hide(); // 购物车成功弹窗里面的
        var choosez =1;
    }else{
        $('#product_ea').show();
        var choosez =2;
    }
    $.ajax({
        type:"POST",
        dataType:"json",
        url:"?modules=ajax&handler=products_quote_info&ajax_request_action=packing_conditions_new&main_page=product_info",
        data:{products_id:id,qty:box_qty,type:choosez},
        success:function(data){
            if(data!==false){
                $('.detail_proPrice').html(data.price); //price
                $('.fs_clh_Prodiscount_new').html(data.discount); //save price
                if($('#button_2').hasClass('choosez')){
                    $('#product_ea').hide();
                    $('.fs_pro_Prodiscount_box').show();
                }else{
                    $('#product_ea').show();
                    $('.fs_pro_Prodiscount_box').hide();
                }
                $('#popup_cart_price').html(data.product_price); // add success window price
            }
            cart_quantity_ele.val(qty);
        }
    })
}
//装箱按钮操作
function pack_switch_enterprise(_this,id,box_number){
    var _this = $(_this);
    if(_this.hasClass("choosez")){

    }else{
        $('#qv_quantity_'+id).val(1);
    }
    _this.addClass('choosez').siblings("dd").removeClass("choosez");
}
//装箱
function fslocking(id,min_qty,box_number,is_pack,is_clearance,clearance_qty) {
    var cart_quantity_ele = $('#qv_quantity_'+id);
    var qty = cart_quantity_ele.val();
    if(qty<min_qty){
        cart_quantity_ele.val(min_qty);
        qty = min_qty;
    }
    //清仓产品
    if(is_clearance == 1){
        if(qty>clearance_qty){
            $('.clearance_total_qty').html(clearance_qty);
            $('.custom_product_tips_fa').show();
        }
        clearance_add_to_cart_restriction('#qv_quantity_'+id,qty,2,clearance_qty);
    }

    qty = cart_quantity_ele.val(); //由于清仓产品可能填写超过最大库存,则需要重新获取一次
    var box_qty = qty;
    if(!isNaN(qty)){
        var attr_str = "";
        var length = "";
        var page_type=3;
        var evt="";
        proorder_process_and_ship(evt,qty,id,attr_str,length,page_type);
    }
    if(is_pack){
        if($('#button_2').hasClass('choosez')){
            box_qty = qty*box_number;
            $('#product_ea').hide();
            var choosez =1;
        }else{
            $('#product_ea').show();
            var choosez =2;
        }
        $.ajax({
            type:"POST",
            dataType:"json",
            url:"?modules=ajax&handler=products_quote_info&ajax_request_action=packing_conditions_new&main_page=product_info",
            data:{products_id:id,qty:box_qty,type:choosez},
            success:function(data){
                if(data!==false){
                    $('.detail_proPrice').html(data.price);
                    $('.fs_clh_Prodiscount_new').html(data.discount);
                    if(qty>=box_number){
                        $('.fs_pro_Prodiscount_box').show();
                    }else{
                        $('.fs_pro_Prodiscount_box').hide();
                    }
                    $('#popup_cart_price').html(data.product_price);
                }
                cart_quantity_ele.val(qty);
            }
        })
    }
}

$(function(){
    // qv 产品左边轮播图 start
    if ($('.detail_proImg_pre') && $('.detail_proImg_next')) {
        detail_proImg_defalt();
    }
    $('.detail_proImg_next').on('click',function(){
        if($(this).hasClass('swiper-button-next')){
            $(this).siblings('.detail_proImg_pre').css({'pointer-events':'auto','opacity':1});
        }
    })
    var _listLil = $('.detail_proImg_new_listLi').length;
    var _listLiw = $('.detail_proImg_new_listLi').width();
    $('.detail_proImg_new_list').width(_listLil*_listLiw+'px');
    var _listLiBtl = $('.checked_proImg_li').length;
    var _listLiBtw = $('.checked_proImg_li').width();
    var _listLiBtm = $('.checked_proImg_li').css('margin-right');
    $('.detail_proImg_new_btList').width((_listLiBtl*_listLiBtw+parseInt(_listLiBtm)*_listLiBtl)+'px');
    if ($('.detail_provideo')) {
        $('.detail_proImg_new_list').css({'left':-_listLiw +'px'});
    }

    $(document).on('mouseover',".checked_proImg_li",function(){
        var _thisTopdev = $(this).parents('.detail_proImg_bottom').siblings('.detail_proImg_top');
        var _proInd = $(this).index();
        var _proVal = $(this).attr('value');
        var _proIndl = $(this).parent().find('.checked_proImg_li').length;
        var _liWid = _thisTopdev.find('.detail_proImg_new_list li').width();
        var _weidget= _thisTopdev.find('.detail_proImg_new_list');
        var _imgIno = Math.abs(parseInt(_weidget.css('left')))/_liWid+1;
        $(this).addClass('choosez').siblings().removeClass('choosez');
        if(_proInd == 0){
            $(this).parents('.proImg_check_carousel_cont').siblings('.detail_proImg_pre').css({'pointer-events':'none','opacity':.35});
            _thisTopdev.find('.play_proDetail_video').removeClass('choosez');
        }else if(_proInd == _proIndl - 1){
            $(this).parents('.proImg_check_carousel_cont').siblings('.detail_proImg_next').css({'pointer-events':'none','opacity':.35});
            // _thisTopdev.find('.play_proDetail_video').removeClass('choosez');
        }else{
            $(this).parents('.proImg_check_carousel_cont').siblings('.detail_proImg_pre,.detail_proImg_next').css({'pointer-events':'auto','opacity':1});
            _thisTopdev.find('.play_proDetail_video').addClass('choosez');
        }
        // switch (_proInd) {
        //     case 0:
                
        //         break;
        //     case _proInd:
                
        //         break;
        // }
        if (!_thisTopdev.find('.detail_proImg_new_list').is(":animated")) {
            _thisTopdev.find('.detail_proImg_new_list').stop().animate({left:-_liWid*_proVal},400);
        }
        if($(this).hasClass('detail_provideo')){
            if($('.play_proDetail_video video').length == 1){
                $('.play_proDetail_video video').trigger('play');
            }
        }else{
            if($('.play_proDetail_video video').length == 1){
                $('.play_proDetail_video video').trigger('pause');
            }
        }
    })
    // qv 产品左边轮播图 end

    //qv 产品描述 展开隐藏
    $(document).on('click',".new_qvPro_information_tit",function(){
        var _this = $(this);
        if (_this.siblings().hasClass('choosez')) {
            _this.find('.icon').html('&#xf049');
            _this.siblings().slideUp('500').removeClass('choosez');
        }else{
            _this.find('.icon').html('&#xf057');
            _this.siblings().slideDown('500').addClass('choosez');
        }
    })

    // 邮编 下拉显示
    $(document).on('click',".aron_barry",function(){
        if ($(this).parents('.new_proList_shipTime_link').find('.productList_top_country_more').hasClass('showO')) {
            $(this).parents('.new_proList_shipTime_link').find('.productList_top_country_more').removeClass('showO').addClass('showI');
        }else{
            $(this).parents('.new_proList_shipTime_link').find('.productList_top_country_more').removeClass('showI').addClass('showO');
        }
    })

    //点击其他部分隐藏
    $(document).bind("click", function(e) {
        var target = $(e.target);
        // 邮编
        if(target.closest(".new_proList_show").length == 0){
            $('.new_proList_Moreshow').addClass('showO').removeClass('showI');
        }
    });

    $('.popularity_view_listz1').on('mouseleave',function(){
        if ($(this).hasClass('new_proList_autoDev')) {
            return false;
        }else{
            if ($(this).hasClass('choosez1')) {
                var _this = $(this)
                setTimeout(function(){
                    _this.removeClass('choosez1').find('.popularity_view_sortz1').removeClass('show');
                    _this.find('.popularity_view_listz1_li').fadeOut();
                },200)

            }
        }
    })
    $('.new_proList_proDrop').on('mouseleave',function(){
        if ($(this).hasClass('show')) {
            var _this = $(this)
            setTimeout(function(){
                _this.removeClass('show').find('.popularity_view_listz,.popularity_view_listz_arrow').fadeOut();
            },200)

        }
    })
    // 产品列表页面，属性值只展示一排
    if($('.new_proList_mainListLi:visible').length>0){
        limit_one_hang('con_one_2');
        $('.video_array_Icbtn').one('click',function () {
            setTimeout(function(){
                limit_one_hang('con_one_1')
            },10)
        })
    }
    if($('.new_proList_mainListTli:visible').length>0){
        limit_one_hang('con_one_1');
        $('.picture_array_Icbtn').one('click',function () {
            setTimeout(function(){
                limit_one_hang('con_one_2')
            },10)
        })
    }
    //m端列表页
    if($('.m-product-list-ul li').length>0){
        m_limit_one_hang();
    }
    //税号详细信息隐藏展示
    $(document).on('click', '.shipping_text em.icon.prodown_ic', function(){
        //防止多次触发
        var $this = $(this);
        var _nowTime = new Date().getTime();
        var _lastTime = $this.attr('lastTime');
        if(_lastTime != "undefined" && (_nowTime - _lastTime <300)){
            return false;
        }else{
            $this.attr("lastTime",_nowTime);
            if($this.hasClass('show')){
                $this.removeClass('show');
                $this.closest('.shipping_text').find('.product_3_29').slideUp();
            }else{
                $this.addClass('show');
                $this.closest('.shipping_text').find('.product_3_29').slideDown();
            }
        }
    })
})

function limit_one_hang(id) {
    $('#'+id+' .new_proList_ListSizes_list_text').each(function () {
        var _this = $(this);
        var oCountWidth = 0;
        var oConLiLength = _this.find('li').length;
        if(id == 'con_one_1'){
            var oColWidth = _this.width()-43;
        }else{
            var oColWidth = _this.width()-43;
        }
        for(var j=0;j<oConLiLength;j++){
            oCountWidth = _this.find('li').eq(j).outerWidth(true) + oCountWidth;

            if(oCountWidth >= oColWidth){
                break;
            }
        }
        for(var h = 0;h<j;h++){
            _this.find('li').eq(h).show();
        }
        var leftLength = oConLiLength-j;
        if(leftLength> 0){
            var oMoreNum = '+' +  leftLength;
            var min_hidden_li = _this.find('li').eq(j);
            var min_hidden_li_a = min_hidden_li.find('a');
            var is_modules_product = min_hidden_li_a.attr('data-is-modules');
            min_hidden_li_a.html(oMoreNum);
            if(is_modules_product==1){//模块产品，跳转到隐藏产品id
                var a_href =min_hidden_li_a.attr('data-href');
                min_hidden_li_a.attr('href',a_href);
                min_hidden_li.removeAttr('onclick').addClass('new_proList_ListSizes_listLi_more');
            }else{
                min_hidden_li.attr('onclick','ajax_get_one_product_qv_show(this)').addClass('new_proList_ListSizes_listLi_more');
            }
            min_hidden_li.show();
        }
    })
}
//m端属性控制
function m_limit_one_hang() {
    var new_proList_ListSizes_list_textWidth;
    var span_index;
    var _this_width = $('.new_proList_ListSizes_list_text').width();
    var open = true;
    $('.new_proList_ListSizes_list_text').each(function(){
        new_proList_ListSizes_list_textWidth = 0;
        var _this = $(this);
        _this.find('span').each(function(){
            new_proList_ListSizes_list_textWidth += $(this).outerWidth(true);
            if(new_proList_ListSizes_list_textWidth < _this_width){
                $(this).show();
                span_index = $(this).index();
            }else{
                if(new_proList_ListSizes_list_textWidth + _this.find('span').eq(span_index+1).outerWidth(true) > _this_width){
                    var leftLength = _this.find('span').length - span_index;
                    if(leftLength > 0){
                        var oMoreNum = '+' + leftLength;
                        var min_hidden_span = _this.find('span').eq(span_index);
                        var min_hidden_span_a = min_hidden_span.find('a');
                        var a_href =min_hidden_span_a.attr('data-href');
                        min_hidden_span_a.html(oMoreNum);
                        min_hidden_span_a.attr('href',a_href);
                        min_hidden_span.removeAttr('onclick').addClass('new_proList_ListSizes_listLi_more');
                    }
                }else{
                    //_this.find('span').eq(span_index+1).addClass('new_proList_ListSizes_listLi_more').show()
                    //_this.find('span').eq(span_index+1).addClass('new_proList_ListSizes_listLi_more').show().html('+'+_this.find('span').length - span_index);;
                }
                return true;
            }
        })
    })
}


// 改变背景高度的js
function _newH(){
    $('.new_proList_mainListBox_bg').height($('.new_proList_mainListBox').height());
}
_newH();

// view all 按钮 向上已有代码可删除
$('body').on('click','.va_select',function(){
    $(this).siblings('.va_select_hideInput').attr({"checked": true})
    $(this).parent('.va_select_cont').siblings().find('.va_select_hideInput').attr({"checked": false})
    $(this).addClass('choosez').parent('.va_select_cont').siblings().find('.va_select').removeClass('choosez');

})

$(function(){
    // 面包屑下拉
    $('.new_proList_proDrop').on('click',function(){
        if ($(this).hasClass('show')) {
            $('.popularity_view_listz').fadeOut('fast');
            $(this).removeClass('show');
            $(this).find('.popularity_view_listz_arrow').fadeOut('fast');
        }else{
            $('.popularity_view_listz').fadeIn('fast');
            $(this).addClass('show');
            $(this).find('.popularity_view_listz_arrow').fadeIn('fast');
        }
    })
    // 排序和默认属性选择下拉
    $(document).on('click','.popularity_view_sortz1',function(){

    })
    // m端国家下拉弹窗关闭按钮
    $(document).on('click','.new_proList_closeCon',function(){
        $(this).parents('.productList_top_country_more').removeClass('showI').addClass('showO');
    })
    // 侧边栏的滑动
    $('.pro_newSee_allBtn').on('click',function(e){
        var target = $(e.target);
        if(target.closest(".popularity_view_sortz1").length == 0){
            $('.popularity_view_listz1_li').fadeOut('fast');
            $(".popularity_view_sortz1").removeClass('show');
            $('.popularity_view_listz1').removeClass('choosez1');
        }
        if ($('#proList_seeAllalert.new_proList_seeAllalert').hasClass('choosez')) {
            $('body').css({'overflow':'hidden','padding-right':'17px'});
            $('#proList_seeAllalert.new_proList_seeAllalert').removeClass('choosez');
            $('#proList_seeAllalert .new_proList_seeSliLeft').animate({'right':'0'},500);
        }
        // if ($('.new_proList_seeSli_catxt[data]').length > 0) {
        //     $('.new_proList_seeSli_catxt[data]').parents('.new_proList_seeSli_catLi').css('border-color','#6f6f6f')
        // }
        e.stopPropagation();
    })
    // m端侧边属性弹窗显示
    $('.popularity_array_Icbtn').on('click',function(e){
        e.stopPropagation();
        if ($('#proList_seeAllalert.new_proList_seeAllalert').hasClass('choosez')) {
            $('html').css({'height':'100%','overflow':'hidden'})
            $('body').css({'overflow':'hidden','padding-right':'17px','height':'100%'});
            $('#proList_seeAllalert.new_proList_seeAllalert').removeClass('choosez');
            $('#proList_seeAllalert .new_proList_seeSliLeft').animate({'right':'0'},500);
        }

    })
    // m端排序弹窗显示
    $('.sellist_array_Icbtn').on('click',function(e){
        e.stopPropagation();
        if ($('#popularityLi_alert.new_proList_seeAllalert').hasClass('choosez')) {
            $('body').css({'overflow':'hidden','padding-right':'17px'});
            $('#popularityLi_alert.new_proList_seeAllalert').removeClass('choosez');
            $('#popularityLi_alert .new_proList_seeSliLeft').animate({'right':'0'},500);
        }

    })
    // 关闭侧滑弹窗的按钮
    $('.new_proList_seeSliTit .icon').on('click',function(){
        $('html').css({'overflow':'auto','height':'auto'});
        $('body').css({'overflow':'auto','padding-right':'0'});
        $('.new_proList_seeSliLeft').animate({'right':'-380px'},300,function(){
            $('.new_proList_seeAllalert').addClass('choosez');
        })
        if ($('.popularity_array_Icbtn,.sellist_array_Icbtn').hasClass('choosez')) {
            $('.popularity_array_Icbtn,.sellist_array_Icbtn').removeClass('choosez');
        }
    })

    // 侧边属性下拉
    $(document).on('click','.new_proList_seeSli_catMain',function(){
        if ($(this).hasClass('choosez')) {
            // if ($(this).find('.new_proList_seeSli_catxt[data]').length < 1) {
            //     $(this).find('.icon').html('&#xf057').parents('.new_proList_seeSli_catLi').css('border-color','#fff');
            // }else{
            //     $(this).find('.icon').html('&#xf057').parents('.new_proList_seeSli_catLi').css('border-color','#6f6f6f');
            // }
            $(this).find('.icon').html('&#xf057');
            $(this).removeClass('choosez').siblings('.new_proList_seeSli_catMain1').slideUp();
        }else{
            $(this).find('.icon').html('&#xf049;').parents('.new_proList_seeSli_catLi').css('border-color','#6f6f6f');
            $(this).addClass('choosez').siblings('.new_proList_seeSli_catMain1').slideDown();
        }
    })
    // 侧边栏的滑动结束
    // 页面左右切换
    $('.new_proList_tabLaR').on('click',function(){
        if ($(this).hasClass('choosez')) {
            $(this).removeClass('choosez');
            var choosezLinks ='<?php echo $page_jump_links;?>';
            var newLinks = choosezLinks.replace("get_qty=2", "get_qty=1");
            spinloader();
            window.location.href = newLinks;
        }else{
            $(this).addClass('choosez');
            var choosezLinks ='<?php echo $page_jump_links;?>';
            var newLinks = choosezLinks.replace("get_qty=1", "get_qty=2");
            spinloader();
            window.location.href = newLinks;
        }
    })
    // 头部页面切换
    $('.new_proMenu_box1 li').on('click',function(){
        if ($(this).hasClass('table_array_Icbtn')) {
            _faq.push(['trackEvent', 'products_menu_type_click', {"btn_type":3},'3']);
            $(this).addClass('choosez').siblings('.video_array_Icbtn,.picture_array_Icbtn').removeClass('choosez');
            $('.new_proList_LTBOX,.new_proList_bigTabBox').addClass('choosez');
            $('.new_proList_tableBox,.new_proList_tableBoxPT').removeClass('choosez');
            $('.new_proMenu_box .popularity_view_listz1').addClass('choosez');
            if ($(window).width() <=960) {
                $('.sellist_array_Icbtn,.popularity_array_Icbtn').hide();
            }

        }
        else{
            if ($(window).width() >960) {
                if ($(this).hasClass('picture_array_Icbtn')) {
                    //数据统计 add by ternence
                    _faq.push(['trackEvent', 'products_menu_type_click', {"btn_type":1},'3']);
                    $(this).addClass('choosez').siblings('.video_array_Icbtn,.table_array_Icbtn').removeClass('choosez');
                    $('.new_proList_mainListL').removeClass('choosez').siblings('.new_proList_mainListT').addClass('choosez');
                    $('#page_one_2').removeClass('choosez');
                    $('#page_one_1').addClass('choosez');
                    $('.popularity_view_listz1.select_two').removeClass('choosez');
                    $('.popularity_view_listz1.select_one').addClass('choosez');
                    $('.new_proList_LTBOX,.new_proList_bigTabBox').removeClass('choosez');
                    $('.new_proList_tableBox').addClass('choosez');
                }else if ($(this).hasClass('video_array_Icbtn')) {
                    //数据统计 add by ternence
                    _faq.push(['trackEvent', 'products_menu_type_click', {"btn_type":2},'3']);
                    $(this).addClass('choosez').siblings('.picture_array_Icbtn,.table_array_Icbtn').removeClass('choosez');
                    $('.new_proList_mainListT').removeClass('choosez').siblings('.new_proList_mainListL').addClass('choosez');
                    $('#page_one_2').addClass('choosez');
                    $('#page_one_1').removeClass('choosez');
                    $('.popularity_view_listz1.select_two').addClass('choosez');
                    $('.popularity_view_listz1.select_one').removeClass('choosez');
                    $('.new_proList_LTBOX,.new_proList_bigTabBox').removeClass('choosez');
                    $('.new_proList_tableBox').addClass('choosez');
                }
            }else{
                if ($(this).hasClass('picture_array_Icbtn')) {
                    //数据统计 add by ternence
                    _faq.push(['trackEvent', 'products_menu_type_click', {"btn_type":3},'3']);
                    $(this).addClass('choosez').siblings('.video_array_Icbtn,.table_array_Icbtn').removeClass('choosez');
                    $('.new_proList_mainListL').removeClass('choosez').siblings('.new_proList_mainListT').addClass('choosez');
                    $('#page_one_2').removeClass('choosez');
                    $('#page_one_1').addClass('choosez');
                    $('.popularity_view_listz1.select_two').removeClass('choosez');
                    $('.popularity_view_listz1.select_one').addClass('choosez');
                    $('.new_proList_LTBOX,.new_proList_bigTabBox').removeClass('choosez');
                    $('.new_proList_tableBox').addClass('choosez');
                    $('.sellist_array_Icbtn,.popularity_array_Icbtn').show();
                }else if ($(this).hasClass('video_array_Icbtn')) {
                    //数据统计 add by ternence
                    _faq.push(['trackEvent', 'products_menu_type_click', {"btn_type":2},'3']);
                    $(this).addClass('choosez').siblings('.picture_array_Icbtn,.table_array_Icbtn').removeClass('choosez');
                    $('.new_proList_mainListT').removeClass('choosez').siblings('.new_proList_mainListL').addClass('choosez');
                    $('#page_one_2').addClass('choosez');
                    $('#page_one_1').removeClass('choosez');
                    $('.popularity_view_listz1.select_two').addClass('choosez');
                    $('.popularity_view_listz1.select_one').removeClass('choosez');
                    $('.new_proList_LTBOX,.new_proList_bigTabBox').removeClass('choosez');
                    $('.new_proList_tableBox').addClass('choosez');
                    $('.sellist_array_Icbtn,.popularity_array_Icbtn').show();
                }
                if ($(this).hasClass('sellist_array_Icbtn')) {
                    $(this).addClass('choosez').siblings('.popularity_array_Icbtn').removeClass('choosez');
                }else if ($(this).hasClass('popularity_array_Icbtn')) {
                    $(this).addClass('choosez').siblings('.sellist_array_Icbtn').removeClass('choosez');
                }

            }
        }


        _newH();

    })
    // 点击页面空白处隐藏下拉和侧滑弹窗
    $(document).bind("click", function(e) {
        var target = $(e.target);
        if(target.closest(".new_proList_proDrop").length == 0){
            $('.popularity_view_listz').fadeOut('fast');
            $(".new_proList_proDrop").removeClass('show');
            $(".new_proList_proDrop").find('.popularity_view_listz_arrow').fadeOut('fast');
        }
        if(target.closest(".popularity_view_sortz1").length == 0){
            $('.popularity_view_listz1_li').fadeOut('fast');
            $(".popularity_view_sortz1").removeClass('show');
            $('.popularity_view_listz1').removeClass('choosez1');
        }
        if(target.closest(".new_proList_seeSliLeft").length == 0){
            // $('body').css({'overflow':'auto','padding-right':'0'});
            $('.new_proList_seeSliLeft').animate({'right':'-380px'},300,function(){
                $('.new_proList_seeAllalert').addClass('choosez');
            })
            if ($('.popularity_array_Icbtn,.sellist_array_Icbtn').hasClass('choosez')) {
                $('.popularity_array_Icbtn,.sellist_array_Icbtn').removeClass('choosez');
            }
        }
    });
    // m端排序弹窗选中js
    $('.new_proList_popularityLi').on('click',function(){
        $(this).addClass('choosez').siblings().removeClass('choosez');
    })

    // 关闭侧滑弹窗的按钮
    $('#submit_done').on('click',function(){
        $('body').css({'overflow':'auto','padding-right':'0'});
        $('.new_proList_seeSliLeft').animate({'right':'-380px'},300,function(){
            $('.new_proList_seeAllalert').addClass('choosez');
        })
        if ($('.popularity_array_Icbtn,.sellist_array_Icbtn').hasClass('choosez')) {
            $('.popularity_array_Icbtn,.sellist_array_Icbtn').removeClass('choosez');
        }
    })
    //手机端价格勾选
    $('#price_submit').on('click',function () {
        var sort_order_page =  page_jump_links ;

        var sort_order = $('.new_proList_popularityLi.choosez .new_proList_popularityLiM').attr('data');
        var tab = 'one';
        var pattern= /sort-order_(priced|price|sellers|rate|new|productname|productnamed|popularity)/;
        var jump_page = sort_order_page.replace(pattern, 'sort-order_'+sort_order)
        pattern= /sort_order=(priced|price|sellers|rate|new|productname|productnamed|popularity)/;
        jump_page = jump_page.replace(pattern, 'sort_order='+sort_order)
        pattern= /settab=(one|two|three)/;
        jump_page = jump_page.replace(pattern, 'settab='+tab)
        pattern= /settab_(one|two|three)/;
        jump_to_page = jump_page.replace(pattern, 'settab_'+tab)
        spinloader();
        /*start add by liang.zhu start*/
        reg = /&amp;/g;
        jump_to_page = jump_to_page.replace(reg, '&', jump_to_page);
        /* end add by liang.zhu end*/
        window.location = jump_to_page  ;
    })
});
//m端筛选
//异步刷新对应分类
function set_narrow(tt,cpath_id,event,page_type) {
    event.stopPropagation();
    if(page_type == 1){
        if (!$(tt).hasClass('choosez')) {
            $(tt).addClass('choosez').siblings().removeClass('choosez');
        }
    }else{
        if (!$(tt).hasClass('active')) {
            $(tt).addClass('active').siblings().removeClass('active');
        }
    }
    var type = 1;
    if(page_type == 1){
        $.ajax({
            type: 'POST',
            url: 'index.php?main_page=clearance_list&action=ajax_clearance_product_list_left_show',
            dataType: "json",
            data: {clearance_id:cpath_id,type:type},
            beforeSend: function () {
                $('#new_common_loading').show();
            },
            success: function (response) {
                $('#new_common_loading').hide();
                $('.new_proList_seeSli_cat').html(response.data[1]);
                $('.qv_Newsave_btn').addClass('choosez');
                $('#li_'+cpath_id).parents('.new_proList_seeSli_catMain1').siblings('.new_proList_seeSli_catMain').attr('class');
                $('#li_'+cpath_id).parents('.new_proList_seeSli_catLi').css("border-color", "rgb(111, 111, 111)");
                $('#li_'+cpath_id).parents('.new_proList_seeSli_catMain1').show();
                $('#li_'+cpath_id).parents('.new_proList_seeSli_catMain1').siblings('.new_proList_seeSli_catMain').find('.icon').html('&#xf049;');
            },
            error: function () {

            }
        });
    }else{
        $.ajax({
            type: 'POST',
            url: '?modules=ajax&handler=product_list&ajax_request_action=ajax_get_product_list_left_show',
            dataType: "json",
            data: {cPath:cpath_id,type:type},
            beforeSend: function () {
                $('#new_common_loading').show();
            },
            success: function (response) {
                $('#new_common_loading').hide();
                $('.m-list-Screening-center').html(response.data[1]);
                $('#li_'+cpath_id).find(".icon").html("&#xf021;").parents('.m-list-dl').addClass('active');
                $('#li_'+cpath_id).parents('.m-list-dl').find('dd').show();
            },
            error: function () {

            }
        });
    }
}


//异步刷新对应筛选
function set_narrow_show(tt,narrow_id,page_type) {
    if(page_type == 1){
        if (!$(tt).hasClass('choosez')) {
            $(tt).addClass('choosez').siblings().removeClass('choosez');
        }
    }else{
        if (!$(tt).hasClass('active')) {
            $(tt).addClass('active').siblings().removeClass('active');
        }
    }
    var clearance_arr = new Array();
    var categorie_arr = new Array();
    var get_narrow = new Array();
    var type = 2;
    if(page_type == 1){
        $('.categories_by_show').find('.new_proList_seeSli_catLil.choosez').each(function () {
            clearance_arr.push($(this).find('div').attr("data"));
        })
        $('.narrow_by_show_all').find('.new_proList_seeSli_catLil.choosez').each(function () {
            get_narrow.push($(this).find('div').attr("data"));
        })
    }else{
        $('.categories_by_show').find('.m_product_list_dd.active').each(function () {
            categorie_arr.push($(this).find('div').attr("data"));
        })
        $('.right_hide_narrow').find('.m_product_list_dd.active').each(function () {
            get_narrow.push($(this).find('div').attr("data"));
        })
    }
    if(page_type == 1){
        $.ajax({
            type: 'POST',
            url: 'index.php?main_page=clearance_list&action=ajax_clearance_product_list_left_show',
            dataType: "json",
            data: {clearance_arr:clearance_arr,get_narrow:get_narrow,type:type},
            beforeSend: function () {
                $('#new_common_loading').show();
            },
            success: function (response) {
                $('#new_common_loading').hide();
                $('.right_hide_narrow').remove();
                $('.new_proList_seeSli_cat').append(response.data[1]);
                $('#li_'+narrow_id).parents('.new_proList_seeSli_catMain1').siblings('new_proList_seeSli_catMain').addClass('choosez');
                $('#li_'+narrow_id).parents('.new_proList_seeSli_catLi').css("border-color", "rgb(111, 111, 111)");
                $('#li_'+narrow_id).parents('.new_proList_seeSli_catMain1').show();
                $('#li_'+narrow_id).parents('.new_proList_seeSli_catMain1').siblings('new_proList_seeSli_catMain').find('.icon').html('&#xf049;');
            },
            error: function () {

            }
        });
    }else{
        $.ajax({
            type: 'POST',
            url: '?modules=ajax&handler=product_list&ajax_request_action=ajax_get_product_list_left_show',
            dataType: "json",
            data: {categorie_arr:categorie_arr,get_narrow:get_narrow,type:type},
            beforeSend: function () {
                $('#new_common_loading').show();
            },
            success: function (response) {
                $('#new_common_loading').hide();
                $('.right_hide_narrow').remove();
                $('.m-list-Screening-center').append(response.data[1]);
                $('#li_'+narrow_id).parents('.m-list-dl').addClass('active');
                $('#li_'+narrow_id).parents('.m-list-dl').find('dd').show();
            },
            error: function () {

            }
        });
    }
}
// done属性提交
$("#submit_Done").click(function () {
    var _catxt = $('.new_proList_seeSli_catLil.choosez');
    var _count = _catxt.length;
    _catxt.each(function(i){
        var _that = $(this);
        if(i == (_count-1)){
            var _catxtUrl = _that.find('div').data('link');
            $('#new_common_loading').show();
            window.location.reload();
            location.href = _catxtUrl;
        }
    })
})
//m端列表提交筛选
$("#m_submit_Done").click(function () {
    var _catxt = $('.m_product_list_dd.active');
    console.log(_catxt);
    var _count = _catxt.length;
    _catxt.each(function(i){
        var _that = $(this);
        console.log(_that.find('div'));
        if(i == (_count-1)){
            var _catxtUrl = _that.find('div').data('link');
            $('#new_common_loading').show();
            window.location.reload();
            location.href = _catxtUrl;
        }
    })
})

// 五个类型属性选择
function selectCa(tt){
    if (!$(tt).find('.new_proList_mainLabel').hasClass('choosez')) {
        var _samePa = $(tt).parents('dl').attr('sameparent');
        var _thisVal = $(tt).find('.new_proList_mainLabel').text();
        var _thisData = $(tt).find('.new_proList_mainLabel').attr('data');
        var _thiSame = $(tt).find('.new_proList_mainLabel').attr('samedata');
        var _siData = $(tt).siblings().find('.new_proList_mainLabel').attr('data');
        $(tt).find('.new_proList_mainLabel').addClass('choosez');
        $(tt).siblings().find('.new_proList_mainLabel').removeClass('choosez');
    }else{
        return false;
    }
    var _reciveBox = $('.new_proList_reciveBox');
    var _chaVal = '<span class="new_proList_seeSli_catxt" data='+'"'+_thisData+'"'+' samedata='+'"'+_thiSame+'"'+'>'+_thisVal+'</span>';
    var _chaDev = $('.new_proList_seeSli_catMain[sameparent='+'"'+_samePa+'"'+']').find('.new_proList_seeSli_catxt[samedata='+'"'+_thiSame+'"'+']');
    var _thisF = false;
    function _cha(){
        $('.new_proList_seeSli_catMain[sameparent='+'"'+_samePa+'"'+']').append(_chaVal);
        $('.new_proList_seeSli_catLil div[data='+'"'+_thisData+'"'+']').parent().addClass('choosez').siblings().removeClass('choosez');
    }
    function _cha1(){
        $('.new_proList_seeSli_catMain[sameparent='+'"'+_samePa+'"'+']').find('.new_proList_seeSli_catxt[samedata='+'"'+_thiSame+'"'+']').replaceWith(_chaVal);
        $('.new_proList_seeSli_catLil div[data='+'"'+_thisData+'"'+']').parent().addClass('choosez').siblings().removeClass('choosez');
    }

    var _reciveCont = '<div class="new_proList_reciveCont"  data='+'"'+_thisData+'"'+' samedata='+'"'+_thiSame+'"'+'>'
        +		'<p class="new_proList_reciveTxt">'+_thisVal+'</p>'
        +		'<span class="iconfont icon">&#xf092;</span>'
        + '</div>';
    if ($('.new_proList_reciveClebtn').length > 0) {
        $('.new_proList_reciveCont').each(function(){
            if ($(this).attr('samedata') == _thiSame && $(this).attr('data') !== _thisData) {
                $('.new_proList_reciveCont[data='+'"'+_siData+'"'+']').replaceWith(_reciveCont);
                _thisF = true;

            }
            if ($(this).attr('data') == _thisData) {
                _thisF = true;
            }
        });
        if (_chaDev.length !== 0) {
            _cha1();
        }else{
            _cha();
        }
        if (!_thisF) {
            _reciveBox.append(_reciveCont);

        }
    }else{
        var _reciveCont = '<div class="new_proList_reciveCont"  data='+'"'+_thisData+'"'+' samedata='+'"'+_thiSame+'"'+'>'
            +		'<p class="new_proList_reciveTxt">'+_thisVal+'</p>'
            +		'<span class="iconfont icon">&#xf092;</span>'
            + '</div>'
            + '<span class="new_proList_reciveClebtn"><a href="javascript:;" class="new_proList_shipTime_link">Clear All</a></span>';
        _reciveBox.append(_reciveCont);
        if (_chaDev.length !== 0) {
            _cha1();
        }else{
            _cha()
        }


    }

    _newH();
}
// 被选择的属性删除
$(document).on('click','.new_proList_reciveCont',function(){
    var _parentL = $('.new_proList_reciveCont').length;
    var _paData = $(this).attr('data');
    $('.new_proList_mainLabel').each(function(){
        var _thi1 = $(this)
        if (_thi1.attr('data') == _paData) {
            $('.new_proList_mainLabel[data='+'"'+_paData+'"'+']').removeClass('choosez');
        }
    })
    $('.new_proList_seeSli_catLil div').each(function(){
        var _thi2 = $(this);
        if (_thi2.attr('data') == _paData) {
            $('.new_proList_seeSli_catLil div[data='+'"'+_paData+'"'+']').parent().removeClass('choosez');
        }
    })
    $('.new_proList_seeSli_catMain .new_proList_seeSli_catxt').each(function(){
        var _thi3 = $(this);
        if (_thi3.attr('data') == _paData) {
            _thi3.parents('.new_proList_seeSli_catLi').css('border-color','#fff');
            $('.new_proList_seeSli_catMain .new_proList_seeSli_catxt[data='+'"'+_paData+'"'+']').remove();
        }
    })
    if(_parentL>1){
        $(this).remove();
    }else{
        $(this).remove();
        $('.new_proList_reciveClebtn').remove();
    }
    _newH();

})
// clear All的js
function _clearDev(){
    $('.new_proList_mainLabel.choosez').each(function(){
        var _thi1 = $(this)
        _thi1.removeClass('choosez');
    })
    $('.new_proList_seeSli_catLil.choosez div').each(function(){
        var _thi2 = $(this);
        _thi2.parents('.new_proList_seeSli_catLil').removeClass('choosez');
    })
    $('.new_proList_seeSli_catMain .new_proList_seeSli_catxt[data]').each(function(){
        var _thi3 = $(this);
        _thi3.parents('.new_proList_seeSli_catLi').css('border-color','#fff');
        _thi3.remove();
    })
    $('.new_proList_reciveClebtn,.new_proList_reciveCont').remove();
    _newH();
}
$(document).on('click','.new_proList_reciveClebtn',function(){
    $('.new_proList_reciveCont').remove();
    $(this).remove();
    _clearDev()
})
// clear All的js结束
// 翻页按钮js
$(document).on('click','.the_page',function(){
    var _thisIn = $(this).parent().index();
    _thisLen = $(this).parents('.FS_Newpation_cont').find('.FS_Newpation_item').length;
    if($(this).parent('.FS_Newpation_item').hasClass('omit')){
        return false;
    }else{
        $(this).parent().addClass('choosez').siblings().removeClass('choosez');
        if (_thisIn == 0) {
            $('.list_Newpro_page').css({'cursor':'default','border-color':'#bbbbbb'}).addClass('choosez');
            $('.list_Newnext_page').css({'border-color':'#6f6f6f','cursor':'pointer'}).removeClass('choosez');
        }else if(_thisIn == _thisLen-1){
            $('.list_Newnext_page').css({'cursor':'default','border-color':'#bbbbbb'}).addClass('choosez');
            $('.list_Newpro_page').css({'border-color':'#6f6f6f','cursor':'pointer'}).removeClass('choosez');
        }else{
            $('.list_Newpro_page,.list_Newnext_page').css({'border-color':'#6f6f6f','cursor':'pointer'}).removeClass('choosez');
        }
    }
})
// 下一页
$('.list_Newpro_page').on('click',function(){
    var _item = $(this).siblings('.FS_Newpation_cont').find('.FS_Newpation_item.choosez').index()-1;
    _itemLen = $(this).siblings('.FS_Newpation_cont').find('.FS_Newpation_item').length-1
    if ($(this).siblings('.FS_Newpation_cont').find('.FS_Newpation_item').eq(_item).hasClass('omit')) {
        $(this).siblings('.FS_Newpation_cont').find('.FS_Newpation_item').eq(_item-1).addClass('choosez').siblings().removeClass('choosez');
    }else{
        if (_item <= 0) {
            $(this).css({'cursor':'default','border-color':'#bbbbbb'}).addClass('choosez');
            if (_item == 0) {
                $(this).siblings('.FS_Newpation_cont').find('.FS_Newpation_item').eq(0).addClass('choosez').siblings().removeClass('choosez');
            }
        }else{
            $('.list_Newnext_page').css({'cursor':'pointer','border-color':'#6f6f6f'}).removeClass('choosez');
            $(this).siblings('.FS_Newpation_cont').find('.FS_Newpation_item').eq(_item).addClass('choosez').siblings().removeClass('choosez');
        }
    }
    if (_item <= _itemLen) {
        $('.list_Newnext_page').css({'cursor':'pointer','border-color':'#6f6f6f'}).removeClass('choosez');
    }

})
// 前一页
$('.list_Newnext_page').on('click',function(){
    var _item = $(this).siblings('.FS_Newpation_cont').find('.FS_Newpation_item.choosez').index()+1;
    _itemLen = $(this).siblings('.FS_Newpation_cont').find('.FS_Newpation_item').length-1
    if ($(this).siblings('.FS_Newpation_cont').find('.FS_Newpation_item').eq(_item).hasClass('omit')) {
        $(this).siblings('.FS_Newpation_cont').find('.FS_Newpation_item').eq(_item+1).addClass('choosez').siblings().removeClass('choosez');
        if (_item+1 == _itemLen) {
            $(this).css({'cursor':'default','border-color':'#bbbbbb'}).addClass('choosez');
        }
    }else{
        if (_item <= _itemLen) {
            $('.list_Newpro_page').css({'cursor':'pointer','border-color':'#6f6f6f'}).removeClass('choosez');
            $(this).siblings('.FS_Newpation_cont').find('.FS_Newpation_item').eq(_item).addClass('choosez').siblings().removeClass('choosez');
            if (_item == _itemLen) {
                $(this).siblings('.FS_Newpation_cont').find('.FS_Newpation_item').eq(_itemLen).addClass('choosez').siblings().removeClass('choosez');
                $(this).css({'color':'#cccccc','cursor':'default'});
            }
        }
    }

})
// 翻页按钮js结束
// 当点击页面中的其他地方，下拉列表隐藏
$(document).bind("click", function(e) {
    var target = $(e.target);
    if(target.closest(".ce_form_choose_country").length == 0) {
        //do something...
        $('.ce_form_searchCountry').hide();
        $('.ce_form_choose_country p').removeClass('show');
        if($('.ce_form_search_input').val()==""){
            $('.ce_form_search_input').attr('placeholder',country_search_str)
        }
    };
    if(target.closest('.ce_form_sel').length == 0){
        $('.ce_form_sel_list').hide();
        $('.ce_form_sel_result').removeClass('show');
    }
});
//loading
$('.popularity_view_listz1_liMain').on('click',function(){
    if(!$(this).find('.new_proList_mainLabel').hasClass('choosez')){
        spinloader();
    }else {
        return false;
    }
})
$('.new_proList_seeSli_catMain1 ul li').on('click',function(){
    spinloader();
})
$('.popularity_view_listz ol li').on('click',function(){
    if(!$(this).hasClass('choosez')){
        spinloader();
    }
})
$('.categories_by_show').find('.new_proList_seeSli_catLil').each(function () {
    if(!$(this).hasClass('choosez')){
        $('.qv_Newsave_btn').addClass('choosez');
    }
})
$('.narrow_by_show_all').find('.new_proList_seeSli_catLil.choosez').each(function () {
    if(!$(this).hasClass('choosez')){
        $('.qv_Newsave_btn').addClass('choosez');
    }
})
// 点击回到顶部按钮
if ($('.new_proList_goTop').length >0 ) {
    $(window).on('scroll',function(){
        if ($('.new_proList_goTop').length > 0 ) {
            if ($(window).scrollTop() > 500) {
                $('.new_proList_goTop').fadeIn(300);
            }else{
                $('.new_proList_goTop').fadeOut(300);
            }
        }
    })
}

function _proGotop(){
    var scrollTop = $(window).scrollTop();
    $("html,body").animate({scrollTop: 0},300);
}

// 属性不可以点击分类
$(document).on('mouseover','.new_proList_mainProse .popularity_view_listz1',function(){
	var _this = $(this);
	var _thisChdev = _this.find('.popularity_view_listz1_liMain.cant_pointer').eq(0);
	_this.find('.popularity_view_listz1_liMain').each(function(){
		var _thisCh = $(this);
		if(!_thisCh.hasClass('cant_pointer') && _this.find('.popularity_view_listz1_liMain.cant_pointer').length > 0){
		   var chDev = _thisCh;
		   _thisChdev.before(chDev);
		}
	})
})

//加减输入框样式
$(function(){
	$(document).on('focus','input.product_list_qty',function() {
		$(this).addClass('focus').siblings('.pro_mun').addClass('focus')
	});
	$(document).on('blur','input.product_list_qty',function() {
		$(this).removeClass('focus').siblings('.pro_mun').removeClass('focus')
	});
    // $(document).on('click','.shipping_text em.icon',function(){
    //     $('.shipping_text .product_3_29').slideToggle();
    // })
	// $('input[name="cart_quantity"]').focus(function() {
	// 	$(this).addClass('focus').siblings('.pro_mun').addClass('focus')
	// });
	// $('input[name="cart_quantity"]').blur(function() {
	// 	$(this).removeClass('focus').siblings('.pro_mun').removeClass('focus')
	// });
})

function change_product_num(type,pid,obj,is_clearance,clearance_qty) {
    var input = $(obj).closest(".pro_mun").siblings(".product_list_qty");
    var input_val = $(obj).closest(".pro_mun").siblings(".product_list_qty").val();
    input_val = parseInt(input_val);
    if(type==1){
        if(input_val>=99999){
            return false;
        }
        input_val+=1;
    }else{
        if(input_val<=1){
            return false;
        }
        input_val-=1;
    }
    if(is_clearance ==1){
        clearance_add_to_cart_restriction('#img_quantity3_'+pid,input_val,1,clearance_qty);//可能存在改变数量
        if(input_val>=parseInt(clearance_qty)){
            input_val = clearance_qty;
        }
    }
    change_qp(input_val,pid,obj,input);
}

function add_check_min_qty(evt,pid,is_clearance,clearance_qty) {
    if(!pid){
        return false;
    }
    var evt_val = $.trim($(evt).val());
    var qty = parseInt($(evt).val());

    if(evt_val==='0'){
        $(evt).val('1');
    }
    num = parseInt($.trim($(evt).val()));
    if(is_clearance == 1){
        clearance_add_to_cart_restriction(evt,num,2,clearance_qty);
        num = parseInt($.trim($(evt).val()));//清仓产品不能超过最大库存
    }
    change_qp(num,pid,evt,evt);

}
function  change_qp(num,pid,obj,input) {
    var urls = "index.php?main_page=shopping_cart&action=ajax_update_product";
    var original_html = $(obj).closest(".addCrat_item_listTa").find(".popup_cart_price");
    var total_num = 0;
    $.ajax({
        url: urls,
        data: "cart_quantity[]=" + num + "&products_id[]=" + pid,
        type: "POST",
        async: true,
        dataType: "json",
        beforeSend:function(){
            var html = '<div class="spinWrap public_bg_wap background"><div class="bg_color"></div><div id="loader_order_alone" class="loader_order" style="width: 32px;height: 32px;margin-left: -40px;margin-top: 0px;"><svg class="circular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10"></circle></svg></div></div>';
            var loadDom = $(obj).closest(".addCrat_item_listTa");
            loadDom.addClass('commonload');
            loadDom.append(html);
            loadDom.find("#loader_order_alone").show();
        },
        success: function (data) {
            if (data.type == "success") {
                $(input).val(num);
                $(obj).closest(".addCrat_item_listTa").find(".spinWrap.public_bg_wap.background").remove();
                $(original_html).html((symbol_left + OSREC.CurrencyFormatter.format(data.products_proce, parameters) + symbol_right).trim());
                $(".cart_total").text(OSREC.CurrencyFormatter.format(data.subtotal, parameters));
                $(".item_qty").text(data.qty);
                var single_num = parseInt($(this).find(".product_list_qty").val());
                total_num += single_num;
                $(".addCrat_item_list").find(" .addCrat_item_listTa").each(function (i, e) {
                    if (parseInt(total_num) > 99) {
                        $(".items_num").text("99+");
                    } else {
                        $(".items_num").text(total_num);
                    }
                })
                $("#ShoppingCartInfo").html(data.html);

                //重置子产品数量
                var _parent = $(obj).closest(".addCrat_item_listTa");
                _parent.find('.composite_son_product').each(function () {
                    var _this = $(this);
                    var current_num = parseInt(_parent.find('input[name="cart_quantity"]').val());
                    var new_number = parseInt(_this.find('em').html())*current_num;
                    _this.find('span').html(new_number);
                })
               //重置子产品价格
                var composite_product = data.composite_product_price;
                if(composite_product != ''){
                    $.each(composite_product,function(son_pid,son_price){
                        $('.composite_product_'+son_pid).find('span').eq(1).html(son_price.products_price_str);
                    })
                }
                //重置其他产品
                var other_quote_products_price = data.other_quote_products_price
                if(other_quote_products_price){
                    $.each(other_quote_products_price,function (key,item) {
                        var _parent = $("div[data-cartid='"+item.id+"']")
                        _parent.find('.popup_cart_price').html((symbol_left+OSREC.CurrencyFormatter.format(item.products_proce, parameters)+symbol_right).trim())
                        var composite_product = item.composite_product_price;
                        if(composite_product != ''){
                            $.each(composite_product,function(son_pid,son_price){
                                $('.composite_product_'+son_pid).find('span').eq(1).html(son_price.products_price_str);
                            })
                        }
                    })
                }

            }
        }
    });
}


function delete_this_cart(products_id,products_num,price,_this){
    var obj =$(_this);
    var number = parseInt($('.header_cart_href em').text()) - products_num;
    if(number<0){
        number=0;
    }
    $.ajax({
        url:  "ajax_shopping_cart.php?request_type=deleteCart",
        data: {product_id:products_id},
        type: "POST",
        dataType:'json',
        beforeSend:function(){
            var html = '<div class="spinWrap public_bg_wap background"><div class="bg_color"></div><div id="loader_order_alone" class="loader_order" style="width: 32px;height: 32px;margin-left: -40px;margin-top: 0px;"><svg class="circular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10"></circle></svg></div></div>';
            var loadDom = $(obj).closest(".addCrat_item_listTa");
            loadDom.addClass('commonload');
            loadDom.append(html);
            loadDom.find("#loader_order_alone").show();
        },
        success: function(msg){
            if(msg){
                $(obj).closest(".addCrat_item_listTa").find(".spinWrap.public_bg_wap.background").remove();
                dataLayer.push({
                    "event": "removeFromCart",
                    "ecommerce": {
                        "currencyCode": "USD",
                        "remove": {
                            "products": [msg.products_info]
                        }
                    }
                });
                if(msg.num == 0){
                    $(".new_popup_addCart_bottom").remove();
                    $('.addCrat_item_listMain01').html(msg.empty);
                    /* 开始 add by liang.zhu 2019.09.06 开始*/
                    $('.addCrat_item_number').next().trigger('click');
                    /*结束 add by liang.zhu 2019.09.06 结束*/
                    $('#ShoppingCartInfo').html(msg.html);
                    $('.addCrat_item_number span.icon').addClass('empty_cartIcon_gray');
                }else {
                    $('#ShoppingCartInfo').html(msg.html);
                    $('.item_qty').html(msg.qty);
                    $('.cart_total').html(msg.total);
                    //$('#product_cart_popup').html(msg.addCarthtml);
                    obj.parents(".addCrat_item_listTa").remove();
                    $(".m_cart").find(".icon").find("i").text(msg.num);
                }

                //重置其他产品
                var other_quote_products_price = msg.other_quote_products_price
                if(other_quote_products_price){
                    $.each(other_quote_products_price,function (key,item) {
                        var _parent = $("div[data-cartid='"+item.id+"']")
                        _parent.find('.popup_cart_price').html((symbol_left+OSREC.CurrencyFormatter.format(item.products_proce, parameters)+symbol_right).trim())
                        var composite_product = item.composite_product_price;
                        if(composite_product != ''){
                            $.each(composite_product,function(son_pid,son_price){
                                $('.composite_product_'+son_pid).find('span').eq(1).html(son_price.products_price_str);
                            })
                        }
                    })
                }

            }
        },error: function(XMLHttpRequest,msg){alert('Sorry, try again please !');}
    });

}

//筛选项排序重组
$(function () {
    var narrow_arr = new Array();
    var narrow_index = new Array();
    var clear_str = $('.new_proList_reciveBox').find('.new_proList_reciveClebtn').html();
    //排序
    $(".new_proList_reciveCont a").each(function(i,e){
        var current_id = $(this).attr("data-narrow");
        if(current_id){
            narrow_arr.push(parseInt(current_id));
        }
    })
    $("dl.new_proList_autoDev").each(function (i,e) {
        var current_id = $(this).find(".choosez").attr("data-narrow");
        if(current_id && narrow_arr){
            current_id = parseInt(current_id);
            if($.inArray(current_id,narrow_arr)!=-1){
                narrow_index.push( {
                    narrow_id : current_id,
                    index_id :  $(this).closest(".popularity_view_listz1").index()
                });
            }
        }
    })
    if(narrow_index.length){
        var html = "";
        for(var i=0;i<narrow_index.length;i++){
            html+= "<div class='new_proList_reciveCont'>"+$(".new_proList_reciveBox a[data-narrow='"+narrow_index[i]['narrow_id']+"']").closest(".new_proList_reciveCont").html()+"</div>";
        }
        if(clear_str){
            html+="<span class='new_proList_reciveClebtn'>"+clear_str+'</span>';
        }
        $(".new_proList_reciveBox").html(html);
    }
    $('.new_proList_reciveCont a').on('click',function(){
        spinloader();
    })
    $('.new_proList_reciveClebtn a').on('click',function(){
        spinloader();
    })
    //筛选项打开添加过渡效果
    $('.popularity_view_listz1.new_proList_autoDev,.popularity_view_listz1').hover(function(){
        $(this).find('dd').stop().fadeIn('200');
        if($(this).parent().hasClass("new_proList_autoDev")){
            return false;
        }else {
            if ($(this).find('.popularity_view_sortz1').hasClass('show')) {
                $(this).siblings('.popularity_view_listz1_li').stop().fadeOut('fast');
                $(this).find('.popularity_view_sortz1').removeClass('show');
                $(this).parents('.popularity_view_listz1').removeClass('choosez1');
            }else{
                $(this).siblings('.popularity_view_listz1_li').stop().fadeIn('fast');
                $(this).find('.popularity_view_sortz1').addClass('show');
                if ($(this).siblings().find('.popularity_view_sortz1').hasClass('show')) {
                    $(this).siblings().find('.popularity_view_sortz1.show').removeClass('show').siblings('.popularity_view_listz1_li').stop().fadeOut('fast');
                }
                $(this).addClass('choosez1').siblings().removeClass('choosez1');
            }
        };
    },function(){
        $(this).find('dd').stop().fadeOut('200');
        $(this).find('.popularity_view_sortz1').removeClass('show');
    })
})
//m端列表页单独js
//视图切换事件
$(function () {
	var width = $('.m-product-list-center-left').width() + 'px';
    $('.function-right .icon').on('click',function(){
        $(this).addClass('active').siblings().removeClass('active');
        if($(this).hasClass('m-Transverse')){
            $('.m-product-list-ul').addClass('active');
            $('.m-product-list-table-container').hide();
            $('.m-product-list-ul').show();
            $('.function-left-click').show();
            $('.m-product-list-center-left').removeAttr("style");
        }
        if($(this).hasClass('m-Longitudinal')){
			$('.m-product-list-center-left').width(width);
            $('.m-product-list-ul').removeClass('active');
            $('.m-product-list-table-container').hide();
            $('.m-product-list-ul').show();
            $('.function-left-click').show();
        }
        if($(this).hasClass('m-list-table')){
            $('.m-product-list-table-container').show();
            $('.m-product-list-ul').hide();
            $('.function-left-click').hide();
        }
    })
    //筛选
    $(document).on('click','.m-list-dl',function(){
        if("undefined" != typeof list_type){
            if($(this).hasClass('active')){
            }else{
                $(this).addClass('active').siblings().removeClass('active');
                $(this).find('dd').slideDown();
                $(this).siblings().find('dd').slideUp();
            }
            if($(this).find(".m-list-dd-div").length <= 0 && $(this).closest('.m-list-Screening-center').attr('id') != "products_slide"){
                $('.right_hide_narrow').removeClass("active01");
                $(this).addClass("active01");
                $(this).siblings().find('dd').removeClass('active').find('.icon').html("&#xf022");
            }else{
                $('.right_hide_narrow').removeClass("active01");
            }

            var labeltype = $('#document_slide').find('.right_hide_narrow.active').attr('labeltype');
            if(labeltype==undefined){
                labeltype = $('.m_product_list_dd.m_product_list_dd_02.active').closest('.m-list-dl').attr('labeltype');
            }
            $(".serch_result_proMain[demid="+labeltype+"]").show().siblings('.serch_result_proMain').hide();

            if(labeltype=="solution" || labeltype=="download"){
                shutDown();
            }

        }else{
            if($(this).hasClass('active')){
                $(this).removeClass('active');
                $(this).find('dd').slideUp();
                $(this).siblings().find('dd').slideUp();
            }else{
                $(this).addClass('active').siblings().removeClass('active');
                $(this).find('dd').slideDown();
                $(this).siblings().find('dd').slideUp();
            }
        }

    })
    $(document).on('click','.m-list-dl dd',function(){
        $(this).addClass('active').siblings().removeClass('active');
        event.stopPropagation();
    })
    $('.function-left-click').on('click',function(){
        $('.m-product-list-Screening,.m-product-list-Screening-bg').show();
        $('.m-product-list-Screening').addClass('active');
		$('html').css({'overflow':'hidden','height':'100%'})
    })
    $('.m-window-close,.m-list-Screening-bottom-close').on('click',function(){
        $('.m-product-list-Screening').removeClass('active');
        setTimeout(function(){
            $('.m-product-list-Screening,.m-product-list-Screening-bg').hide();
        },300)
		$('html').removeAttr("style");
    })
})

function shutDown(){
    $('.m-product-list-Screening').removeClass('active');
    setTimeout(function(){
        $('.m-product-list-Screening,.m-product-list-Screening-bg').hide();
    },300)
    $('html').removeAttr("style");
    return;
}

function applyLable_limit() {
    var _thisWt = $('.new_proList_applyBox').width();
    console.log(_thisWt)
    $('.new_proList_applyBox').each(function () {
        var _thisLe = $(this).find('.new_proList_applyLable').length;
        var _thisWidth = $(this).find('.new_proList_applyLable').eq(0).outerWidth(); 
        var _thisSiWidth = 0;
        var _thisArray = [];
        $(this).find('.new_proList_applyLable').each(function () {
            var _this = $(this);
            _thisSiWidth += _this.outerWidth();
            _thisArray.push(_this.outerWidth());
        })
        if($(window).width() > 960){
            if (_thisSiWidth + 5*_thisLe > _thisWt) {
                var _ta = Math.round(_thisWt/_thisLe)-5;
                $(this).find('.new_proList_applyLable').eq(0).css({'width':_ta});
                $(this).find('.new_proList_applyLable').eq(0).siblings().css({'width':_ta});
                for (var i = _thisArray.length - 1; i >= 0; i--) {
                    if (_thisArray[i] < _ta) {
                        $(this).find('.new_proList_applyLable').eq(i).css({'width': "auto"});
                    }
                }
            }else{
                return;
            }
        }else{
            if(_thisLe > 1){
                if(_thisLe < 3){
                    for (var i = 0; i <= _thisArray.length - 1; i++) {
                        if(_thisArray[i] > _thisWt){
                            $(this).find('.new_proList_applyLable').eq(i).hide();
                        }else{
                            if(_thisArray[i]+_thisArray[i+1]+10 < _thisWt){
                               return;
                            }else{
                                $(this).find('.new_proList_applyLable').eq(i+1).hide();
                            }
                        }
                    }
                }else{
                    for (var i = 0; i <= _thisArray.length - 1; i++) {
                        if (_thisArray[i] > _thisWt) {
                            $(this).find('.new_proList_applyLable').eq(i).hide();
                        }else{
                            var _taIndex = $(this).find('.new_proList_applyLable').eq(i).index();
                            var _taNum = 0;
                            if(_thisArray[i]+_thisArray[i+1]+10 < _thisWt){
                                $(this).find('.new_proList_applyLable').eq(i).show();
                                $(this).find('.new_proList_applyLable').eq(i+1).show();
                                _taNum = i;
                            }
                            if(_taIndex != _taNum){
                                $(this).find('.new_proList_applyLable').eq(_taIndex).hide();
                            }
                        }
                    }
                }
            }else{
                if (_thisWidth > _thisWt){
                    $(this).find('.new_proList_applyLable').eq(0).hide();
                }
            }
        }  
    })
}


// if($('.new_proList_applyLable:visible').length > 0){
//     applyLable_limit();
// }



