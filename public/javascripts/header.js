// 2018.7.5/7.14 小语种/英文新版首页上线 fairy 整理
// pc和mobile共用 start
//功能函数start
//供使用者调用
function trim(s){
    return trimRight(trimLeft(s));
}
//去掉左边的空白
function trimLeft(s){
    if(s == null) {
        return "";
    }
    var whitespace = String(" \t\n\r");
    var str = String(s);
    if (whitespace.indexOf(str.charAt(0)) != -1) {
        var j=0, i = str.length;
        while (j < i && whitespace.indexOf(str.charAt(j)) != -1){
            j++;
        }
        str = str.substring(j, i);
    }
    return str;
}
//去掉右边的空白
function trimRight(s){
    if(s == null) return "";
    var whitespace = String(" \t\n\r");
    var str = String(s);
    if (whitespace.indexOf(str.charAt(str.length-1)) != -1){
        var i = str.length - 1;
        while (i >= 0 && whitespace.indexOf(str.charAt(i)) != -1){
            i--;
        }
        str = str.substring(0, i+1);
    }
    return str;
}
//功能函数 end

// 删除购物车
function getPar(par){
    //获取当前URL
    var local_url = document.location.href;
    //获取要取得的get参数位置
    var get = local_url.indexOf(par +"=");
    if(get == -1){
        return false;
    }
    //截取字符串
    var get_par = local_url.slice(par.length + get + 1);
    //判断截取后的字符串是否还有其他get参数
    var nextPar = get_par.indexOf("&");
    if(nextPar != -1){
        get_par = get_par.slice(0, nextPar);
    }
    return get_par;
}
function remove_shopping_cart(products_id,products_num,price,_this){
    var number = parseInt($('.header_cart_href em').text()) - products_num;
    if(number<0){
        number=0;
    }
    $.ajax({
        url:  "ajax_shopping_cart.php?request_type=setCart",
        data: {product_id:products_id},
        type: "POST",
        dataType:'json',
        beforeSend:function(){
            $(_this).next().show();
        },
        success: function(msg){
            if(msg){
                dataLayer.push({
                    "event": "removeFromCart",
                    "ecommerce": {
                        "currencyCode": "USD",
                        "remove": {
                            "products": [msg.products_info]
                        }
                    }
                });
                $('#ShoppingCartInfo').html(msg.html);

                $(".m_cart").find(".icon").find("i").text(number);
                if(main_page_str=="shopping_cart"){
                    location.href = shopping_jump_url;
                }
            }
        },error: function(XMLHttpRequest,msg){alert('Sorry, try again please !');}
    });
}
// 产品的最小数量为1
function check_products_min_qty_one(_this,min_qty){
    min_qty = min_qty?min_qty:1;
    var _this = $(_this);
    var _val = _this.val();
    if(!_val){_this.val(min_qty);}
}

$(function(){
    // 底部cookie提示
    if($('.footer_eu_cookie').length < 1){
        $('.m_2017footer').css('margin-bottom',0)
    }

    // 点击弹窗的关闭按钮
    $(".box_close a").click(function(){
        $("body").css({"overflow":"","overflow-y":""});
        $('body').css('position','static');
        $('body').css('box-sizing','initial')
    });

    // 设置图片的alt
    $('img').each(function(){
        var img_alt = $(this).attr('alt'), img_src = $(this).attr('src');
        if(img_src){
            img_name = img_src.lastIndexOf('/');
            new_alt = img_src.substring(img_name + 1, img_src.length);
            if(!img_alt){
                $(this).attr('alt','Fs ' + new_alt);
            }
        }
    });
});
// pc和mobile共用 end

// pc start
$(function(){
    // 顶部购物车，点击checkout按钮
    $('.transform_fs').click(function(){
        $(this).html('');
        $(this).addClass('transform transform_wid');
        var img = $('<img src="includes/templates/fiberstore/images/top_botton_loding.gif" />');
        $(this).append(img);
    });

    // 节假日提示
    $('.eu_holiday_main_close').click(function(){
        //设置Cooike
        var holiday = $(this).data('holiday');
        var cookie_key = 'holiday_c';
        if (holiday) {
            cookie_key += holiday;
        }
        var exp = new Date();
        exp.setTime(exp.getTime() + 30*24*60*60*1000);
        document.cookie= cookie_key+"=1; expires="+exp.toGMTString();
        $('.eu_holiday').slideUp();
        $('.public_mask').css('top','111px');
        $('.public_mask').height($('html').height() - 111);
    });

    $.hasAjaxRunning = function() {
        return $.active != 0;
    }

    // 搜索start
    $('#CityAjax').on('input',function(){
        var _this = this;
        var search_key = $.trim($(this).val());
        if(!search_key){

            $('.fs_search_results').css('display', 'none');
            $('.real_time_results').css('display', 'none');

            var timeout=100;
            //判断是否有其它ajax正在执行
            if($.hasAjaxRunning()==1) {
                timeout = 1000;
            } else {
                timeout = 100;
            }
            setTimeout(function (){
                if($.hasAjaxRunning()==1){
                    setTimeout(function (){
                        if($.hasAjaxRunning()==1){
                            setTimeout(function (){
                                $('.ac_results').html('').hide();
                                $('.header_main .aron_barry_clear_input').hide();
                            }, timeout);
                        }else{
                            $('.ac_results').html('').hide();
                            $('.header_main .aron_barry_clear_input').hide();
                        }
                    }, timeout);
                }else{
                    $('.ac_results').html('').hide();
                    $('.header_main .aron_barry_clear_input').hide();
                }
            }, timeout);
            return false;
        }
        $('.header_main .aron_barry_clear_input').show();
        $.ajax({
            url:"ajax_autocomplete_search_list.php?action=get_fs_search_words",
            type:"POST",
            data: {
                search_key:search_key
            },
            dataType:"json",
            beforeSend: function () {
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            },
            success:function(response){
                $('.fs_search_results').css('display', 'block');
                $('.real_time_results').css('display', 'none');
                if(response.html && $(_this).val()){

                    // $('.ac_results').html(response.html).show();
                    $('.real_time_results_ul').html(response.html).parent().show();
                    $('.fs_search_default').hide();
                }else{
                    // $('.ac_results').html('').hide();
                    $('.real_time_results_ul').html('').parent().hide();
                    $('.fs_search_default').hide();
                }
            }
        });
    });
    $('#CityAjax').focus(function(){
        if($('.ac_results li').length>=1 && $('#CityAjax').val() ){
            $('.ac_results').show();
        }
    });
    // 搜索下拉列表点击的时候增加当前次的点击次数和所有下拉列表的展示次数
    $('.ac_results').on('click',"li",function(){
        var _this = $(this);
        $.ajax({
            url: "ajax_autocomplete_search_list.php?action=add_search_words_statistics",
            data: {
                id: _this.attr('data-id'),
                search_key: _this.attr('data-search-key'),
            },
            type: "POST",
            dataType: "json",
            success: function (response) {
                location.href = _this.attr('data-link');
            }
        })
    });
    // 搜索end

    // 面包屑 - 切换展开显示
    if($(window).width() < 960 ){
        var dd_num = $('#site-breadcrumb>dd').length;
        if(dd_num !=1){
            $('#site-breadcrumb>dd').css("display","none");
            $('#site-breadcrumb>dd').eq(-2).css("display","block");
            if(qa_href_link){
                $('#site-breadcrumb>dt a').attr('href',qa_href_link);
            }else{
                $('#site-breadcrumb>dt a').attr('href','javascript:void(0)');
            }
        }
    }else{
        $('#site-breadcrumb dd').css("display","block");
    }
});

// 2018.7.5/7.14 小语种/英文新版首页上线 fairy、barry 新版修改
// 搜索start
$(function(){
    $('.header_main_search_txt').focus(function() {
        $(this).addClass('focus').siblings('.header_main_search_btn').addClass('focus');
    });
    $('.header_main_search_txt').blur(function() {
        $(this).removeClass('focus').siblings('.header_main_search_btn').removeClass('focus');
        // $('.fs_search_results').hide();
    });
});
// 搜索end

// 加减输入框样式
// $(function(){
//     $('.product_03_24 input.p_07').focus(function() {
//         $(this).addClass('focus').siblings('.pro_mun').addClass('focus')
//     });
//     $('.product_03_24 input.p_07').blur(function() {
//         $(this).removeClass('focus').siblings('.pro_mun').removeClass('focus')
//     });
//     $('.cart_basket_btn .shopping_cart_01').focus(function() {
//         $(this).addClass('focus').siblings('.pro_mun').addClass('focus')
//     });
//     $('.cart_basket_btn .shopping_cart_01').blur(function() {
//         $(this).removeClass('focus').siblings('.pro_mun').removeClass('focus')
//     });
//
//
// })
// 加减输入框样式



$(document).ready(function(){
    // console.log($('html').height());
    if($('.top_prompt').length < 1 && $('.eu_holiday').length < 1){
        $('.public_mask').css('top','111px');
        $('.public_mask').height($('html').height() - 111)
    }else{
        $('.public_mask').css('top','171px');
        $('.public_mask').height($('html').height() - 171)
    }
    // if($('.covid-information').length < 1){
    //     $('.public_mask').css('top','111px');
    //     $('.public_mask').height($('html').height() - 111)
    // }else{
    //     $('.public_mask').css('top','150px');
    //     $('.public_mask').height($('html').height() - 150)
    // }
});

/*国家选择start*/
fnTopCountryOpen($('.top_country_choose_currency_name'),$('.top_country_choose_currency_choose'));
function fnTopCountryOpen(a,b){
    a.on('click',function(){
        if($(this).hasClass('show')){
            b.slideUp();
            $(this).removeClass('show');
            $(this).closest('.top_country_choose_currency').removeClass('active');
        }else{
            b.slideDown();
            $(this).addClass('show');
            $(this).closest('.top_country_choose_currency').addClass('active');
        }

    })
}
$('.top_country_choose_country').on('click',".country_name",function(){
    if($(this).hasClass('show')){
        $('.top_country_searchCountry').slideUp();
        $(this).removeClass('show');
        $(this).closest('.top_country_choose_country').removeClass('active');
    }else{
        $('.top_country_searchCountry').slideDown();
        $(this).addClass('show');
        $(this).closest('.top_country_choose_country').addClass('active');
    }

});


var oTopCountry = $('.top_country_searchCountry').html();
$('.top_country_countryList').on('click','li',function(){
    var _this = $(this);
    var _parent = $('.top_country_choose_country');
    var countryList = $('.top_country_searchCountry');
    var country_input_name = _parent.find('input[type=hidden]').attr('name');
    countryList.slideUp();
    var oCountry = _this.find('em').attr('class');
    var oId = _this.find('a').attr('tag');
    var tag_name = _this.find('a').attr('tag_name');
    _parent.find('em').attr('class', oCountry).css('left', '12px');
    _parent.html("<em id='current_code' data-class='country_code' class='"+oCountry+"'></em><p class='country_name'>"+tag_name+"</p>" + "<span class='showMore icon iconfont'>&#xf087;</span>");
    $.ajax({
        url:"ajax_choose_country.php?request_type=match_languages",
        type:"POST",
        data:{country:oCountry},
        dataType:"json",
		beforeSend: function(){
			$(".top_country_more_main_save_fa_son").show();
		},
        success:function(msg){
            var curr_str = select_str ='';
            if(msg){
                curr_str += '<span data-country ="'+msg[0].website+'" data-currency="'+msg[0].currency+'">'+msg[0].default_site+'</span> / <em>'+msg[0].symbol_var+' '+msg[0].currency+' </em> ';
                for(i=0;i<msg.length;i++){
                    select_str +='<li><span data-country ="'+msg[i].website+'" data-currency="'+msg[i].currency+'">'+msg[i].default_site+'</span> / <em>'+msg[i].symbol_var+' '+msg[i].currency+' </em></li> ';
                }

            }else{
                curr_str +='<span data-country="en" data-currency="USD">English</span> / <em>$ USD</em>';
                select_str += '<li><span data-country="en" data-currency="USD">English</span> / <em>$ USD</em></li>';
            }
            $(".top_country_choose_currency_choose_ul").html(select_str);
            $(".top_country_choose_currency_name").html(curr_str);
			$(".top_country_more_main_save_fa_son").hide();
        }

    })
});
$(document).on('keyup',".top_country_search_input", function() {
    $('.top_country_countryList li,.divider').hide();
    $('.breadcrumbs').find('.divider').show();
    var oChina = false,
        oSpain = false,
        enter = $(this).val().toUpperCase(),
        enter01 = ' ' + enter,
        enter02 = '-' + enter,
        enter03 = ',' + enter,
        enter04 = ' (' + enter;
    for (var i = 0; i < $('.top_country_countryList li').length; i++) {
        var oText = $('.top_country_countryList li').eq(i).find('a').text().toUpperCase(),
            oData = $('.top_country_countryList li').eq(i).find('a').attr('data-name').toUpperCase(),
            oTextName = oText.indexOf(enter),
            oTextName01 = oText.indexOf(enter01),
            oTextName02 = oText.indexOf(enter02),
            oTextName03 = oText.indexOf(enter03),
            oTextName04 = oText.indexOf(enter04),
            oDataName = oData.indexOf(enter),
            oDataName01 = oData.indexOf(enter01),
            oDataName02 = oData.indexOf(enter02),
            oDataName03 = oData.indexOf(enter03),
            oDataName04 = oData.indexOf(enter04);
        if (oTextName == 0 || oTextName01 > 0 || oTextName02 > 0 || oTextName03 > 0 || oTextName04 > 0 ||
            oDataName == 0 || oDataName01 > 0 || oDataName02 > 0 || oDataName03 > 0 || oDataName04 > 0) {
            if ($('.top_country_countryList li').eq(i).find('em').attr('class') == 'cn') {
                oChina = true;
            }
            if($('.top_country_countryList li').eq(i).find('em').attr('class') == 'es'){
                oSpain = true;
            }
            $('.top_country_countryList li').eq(i).show();
            $('.top_country_countryList li.unique').hide();
        }
        if(oChina && $('.top_country_countryList li').eq(i).find('em').attr('class') == "tw"){
            $('.top_country_countryList li').eq(i).show();
            $('.top_country_countryList li.unique').hide();
        }
        if(oChina && $('.top_country_countryList li').eq(i).find('em').attr('class') == "hk"){
            $('.top_country_countryList li').eq(i).show();
            $('.top_country_countryList li.unique').hide();
        }
        if(oChina && $('.top_country_countryList li').eq(i).find('em').attr('class') == "mo"){
            $('.top_country_countryList li').eq(i).show();
            $('.top_country_countryList li.unique').hide();
        }
        if(oSpain && $('.top_country_countryList li').eq(i).find('em').attr('class') == "ic"){
            $('.top_country_countryList li').eq(i).show();
            $('.top_country_countryList li.unique').hide();
        }
    }
    if($(this).val() == "") {
        $('.top_country_countryList li,.divider').show();
    }
});
$(document).bind("click", function(e) {
    var target = $(e.target);
    if(target.closest(".top_country_choose_country").length == 0 && target.closest(".top_country_searchCountry").length == 0) {
        if($('.top_country_search_input').val()==""){
            $('.top_country_search_input').attr('placeholder',oTopCountrySearch)
        }
    }
    if(target.closest(".top_country_choose_currency_name").length == 0) {
        //do something...
        $('.top_country_choose_currency_choose').slideUp();
        $('.top_country_choose_currency_name').removeClass('show');
        $('.top_country_choose_currency').closest('.top_country_choose_currency').removeClass('active');
    }
    if(target.closest(".top_country").length == 0) {
        //do something...
        $('.top_country_more').hide();
        $('.top_country').removeClass('active');
    }
    if(target.closest('.header_main_search').length == 0){
        $('.ac_results').hide();
    }
});
$(document).bind('mouseover',function(e){
    var target = $(e.target);
    if(target.closest(".top_cart").length != 0 || target.closest(".top_sign").length != 0 || target.closest(".top_help").length != 0 || target.closest(".header_main_firstul").length != 0){
        $('.top_country_more').hide();
        $('.top_country').removeClass('active');
    }
});
$('.top_country_choose_currency_choose_ul').on('click',"li",function(){
    var oThisHtml = $(this).html();
    $('.top_country_choose_currency_name').html(oThisHtml);
});
$('.top_country_more_main_save').one('click',function(){
    $('.top_country_more_main_save').attr('disabled','disabled').addClass('saveloading');
    $(this).html('<div id="loader_order_alone" class="loader_order"><svg class="circular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10"></circle></svg></div>')
});

$('.top_country').mouseover(function(){
    $(this).addClass('active');
    $('.top_country_more').show();
});

function news_choose_country_second(code,is_mobile){
    var oCountryCode="",
        oCurrencyCode="",
        oWebsite=""
    if(is_mobile==1){
        oCountryCode =$(".index_wap_country_main_sure a").find('i').eq(1).attr('data-country');
        oCurrencyCode =$(".index_wap_currency_main_sure a").find('i').attr('data-currency');
        oWebsite =$(".index_wap_currency_main_sure a").find('i').attr('data-area');
    }else{
        oCountryCode=$("#current_code").attr("class");
        oCurrencyCode =$(".top_country_choose_currency_name span").attr('data-currency');
        oWebsite =$(".top_country_choose_currency_name span").attr('data-country');
    }
    http = document.location.protocol+"//";
    host = window.location.host;
    para ="/?country="+oCountryCode+"&currency="+oCurrencyCode;
	url_param = window.location.pathname+window.location.search;

    var cn_arr =['cn']; //定义中文站国家数组
    //var hk_arr =['tw','hk','mo'];
	var safe_str = 'www.';
    if($.inArray(oCountryCode,cn_arr) != "-1" && oWebsite.indexOf("feisu.com") != '-1'){
        //link  = http+safe_str+oWebsite; //如果是中文站国家并且跳往中文站点则不需要拼接参数
        link = http+host+'/cn/'
    }else{
		if(oWebsite == code){  //如果是同站点切换国家
			if(oWebsite == "en"){
			   url = http+host;//如果是英文站点内切换国家则不需要拼接/
			   link  = url+url_param;
			}else{
			   url = http+host;
			   link  = url+url_param;//如果是独立站点切换国家则不需要拼接oWebsite
			}
		}else{ //不同站点交互切换
		   if(code == 'en'){  //如果当前站点处于英文站点
			  url = http+host+"/";
			  link  = url+oWebsite+url_param; //英文站切独立站点则需要拼接oWebsite
		   }else{
				if(oWebsite == 'en'){
					url = http+host+"/";
					var codeLen = code.length+2;
					link  = url+url_param.substr(codeLen);	//别的独立站点切换到英文站点去掉独立站点的code
				}else{   //如果是独立站点切换其他独立站点
					url = http+host+"/";
					var codeLen = code.length+1;
					link  = url+oWebsite+url_param.substr(codeLen);
				}
		   }
		}
    }

    //判断链接是否为跳转到中文繁文站则
    if (link.indexOf('/zh/hk/') != -1 || link.indexOf('/zh/tw/') != -1 || link.indexOf('/zh/mo/') != -1){
        link = http+host+'/cn/'+oCountryCode+'/';
    }
    if(oWebsite == code){
        $.ajax({
            url:"ajax_choose_country.php?request_type=choose_newcountry",
            type:"POST",
            data:{country:oCountryCode,currency:oCurrencyCode,website:oWebsite},
            dataType:"json",
            success:function (msg) {
				//在本站点进行切换只用重载页面
                window.location.reload();
            }
        });
    }else{
		$.ajax({
            url:"ajax_choose_country.php?request_type=choose_newcountry",
            type:"POST",
            data:{country:oCountryCode,currency:oCurrencyCode,website:oWebsite},
            dataType:"json",
            success:function (msg) {
                if (typeof _faq !== 'undefined') {
                    //数据统计 add by ternence
                    _faq.push(['trackEvent', 'languages_click', {"l_id": oWebsite}, 1]);
                }
				//在不同站点进行切换只用重载页面
                 window.location.href = link;
            }
        });
	}

}
function choose_newcountry(obj){
    var oCountryCode = $(obj).find('.new_choose_country_list_name i').attr('data-country');
    var oAreaCode = $(obj).find('.new_choose_country_list_name i').attr('data-area');
    var oCurrencyCode = $(obj).find('.new_choose_country_list_name i').attr('data-currency');
    var cn_arr =['cn','hk','mo','tw']; //定义中文站国家数组
    var http,host,url,para,link;
    http = document.location.protocol+"//";
    host = window.location.host;
    para ="/?country="+oCountryCode+"&currency="+oCurrencyCode;
    if(oAreaCode == "en"){
        oAreaCode ='';
        url = http+host;
    }else{
        url = http+host+'/';
    }

    if($.inArray(oCountryCode,cn_arr) != "-1" && oAreaCode.indexOf("feisu.com") != '-1'){
        link  = http+oAreaCode; //如果是中文站国家并且跳往中文站点则不需要拼接参数
    }else{
        link  = url+oAreaCode+para;
    }
    $.ajax({
        url:"ajax_choose_country.php?request_type=choose_newcountry",
        type:"POST",
        data:{country:oCountryCode,currency:oCurrencyCode},
        dataType:"json",
        success:function (msg) {
            window.location.href = link;
        }
    })
}
/*国家选择end*/
// pc end

/*手机端国家选择*/
function wap_choose_newcountry(obj){
    var oCountryCode = $(obj).find('.index_wap_country_list_name i').attr('data-country');
    var oAreaCode = $(obj).find('.index_wap_country_list_name i').attr('data-area');
    var oCurrencyCode = $(obj).find('.index_wap_country_list_name i').attr('data-currency');
    var cn_arr =['cn','hk','mo','tw']; //定义中文站国家数组
    var http,host,url,para,link;
    http = document.location.protocol+"//";
    host = window.location.host;
    para ="/?country="+oCountryCode+"&currency="+oCurrencyCode;
    if(oAreaCode == "en"){
        oAreaCode ='';
        url = http+host;
    }else{
        url = http+host+'/';
    }

    if($.inArray(oCountryCode,cn_arr) != "-1" && oAreaCode.indexOf("feisu.com") != '-1'){
        link  = http+oAreaCode; //如果是中文站国家并且跳往中文站点则不需要拼接参数
    }else{
        link  = url+oAreaCode+para;
    }
    $.ajax({
        url:"ajax_choose_country.php?request_type=choose_newcountry",
        type:"POST",
        data:{country:oCountryCode,currency:oCurrencyCode},
        dataType:"json",
        success:function (msg) {
            window.location.href = link;
        }
    })
}

// 手机版 start
// 搜索,设置搜索cookie，方便记录历史记录
$('#CityAjax_phone').on('input',function(){
    var search_key = $.trim($(this).val());
    if(!search_key){
        $('.m_ac_results').html('').hide();
        $('#clear_word').hide();
        return false;
    }
    $('#clear_word').show();
    var words = "";
    $.ajax({
        url:"ajax_autocomplete_search_list.php?action=get_fs_search_words",
        type:"POST",
        data: {
            search_key:search_key
        },
        dataType:"json",
        beforeSend: function () {
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        },
        success:function(response){
            if(response.html){
                // $('.m_ac_results').html(response.html).show();

                $('.real_time_results_ul').html(response.html).parent().show();
                $('.fs_search_default').hide();
            }else{
                // $('.m_ac_results').html('').hide();
                $('.real_time_results_ul').html('').parent().show();
                $('.fs_search_default').hide();
            }
        }
    });
});

// 搜索下拉列表点击的时候增加当前次的点击次数和所有下拉列表的展示次数
$('.m_ac_results').on('click',"li",function(){
    var _this = $(this);
    if (!$(this).hasClass('choosez')) {
        $(this).addClass('choosez').siblings().removeClass('choosez');
    }
    $.ajax({
        url: "ajax_autocomplete_search_list.php?action=add_search_words_statistics",
        data: {
            id: _this.attr('data-id'),
            search_key: _this.attr('data-search-key'),
        },
        type: "POST",
        dataType: "json",
        success: function (response) {
            $.ajax({
                async:false,
                type:"post",
                url:"ajax_choose_country.php?request_type=remember_word",
                data:"keyword="+_this.attr('data-search-words'),
                datatype:"json",
                success:function(msg){
                    // alert('设置成功');
                }
            });
            location.href = _this.attr('data-link');
        }
    })
});

function see_results(is_mobile){
    if($('#CityAjax').val()!=""){
        if(is_mobile==1){
            var href_link = $('#CityAjax_phone').val();
        }else{
            var href_link = $('#CityAjax').val();
        }

        window.location.href="/keyword/"+href_link+"&searchSubmit=Search"
    }
    return false;
}

function search_word(){
    var search_key = $.trim($("#CityAjax_phone").val());
    if(!search_key){
        $('.m_ac_results').html('').hide();
        $('#clear_word').hide();
        return false;
    }
    $.ajax({
        async:false,
        type:"post",
        url:"ajax_choose_country.php?request_type=remember_word",
        data:"keyword="+search_key,
        datatype:"json",
        success:function(msg){
            // alert('设置成功');
            return true;
        }
    });
}
$('.m_search_main_search span.icon').click(function(){
    $('#search_phone').submit();
});
// 搜索默认提示
function cityAjax_blur(obj,text) {
    if($(obj).val()==""){
        $(obj).attr('placeholder',text);
    }else{
        $(obj).attr('placeholder','');
    }
}
// 搜索块，清楚搜索历史
function cityAjax_phone_event(urls){
    $.ajax({
        async:false,
        type:"post",
        url:"ajax_choose_country.php?request_type=del_word",
        datatype:"json",
        success:function(msg){
            window.location.href=urls;
        }
    });
}

$(document).on("click",".m_search_hotword,.m_search_historyword",function(){
    if (!$(this).hasClass("choosez")){
        $(this).addClass("choosez").sibling().removeClass("choosez");
    }
});

$(function(){
    // 列表页背景高度
    var _listBgHt = $('.new_proList_mainListBox_bg').height();
    // 头部js
    var oBeforePosition = 0;
    $('.header_top_list.close_side').on('click',function(){
		var vheight = $('.m_header_main').outerHeight();
		if($('.m_header_main').hasClass('active')){
			$('.m_header_main,.header_sidebar').addClass('menu_state');
		}
        if($(this).hasClass('active')){
			$('.header_top_list.close_side').removeClass('active');
			$('.m_header_proSearch_btn,.m_cart').removeClass('active');
            $(this).removeClass('active');
			$('.m_header_main').removeAttr('style');
			setTimeout(function(){
				$('.header_sidebar').css({'left':'-100%','width':'100%'});
				$('.header_sidebar_second,.header_sidebar_third_all').css({'left':'200%','display':'none'});

				$('body').css({'position':'relative','width':'100%','bottom':0,'overflow':'initial'});
				$('.m_header').css({'position':'relative'});
				if($(".new_proList_mainListBox_bg").length != 0){
					$('.new_proList_mainListBox_bg').height(_listBgHt);
				};
				oBeforePosition = $('body').css('top');
				$('body').css('top',0);
				$(window).scrollTop(parseInt(oBeforePosition)*(-1));
				$('.m_header_main').removeClass('event');
				$('.m_header_main,.header_sidebar').removeClass('menu_state');
            },250);
            setTimeout(function(){
                $('.header_sidebar_second,.header_sidebar_third_all').show();
            },300);
        }else{
            oBeforePosition = $(window).scrollTop();
			$('.m_header_proSearch_btn,.m_cart').addClass('active');
            $(this).addClass('active');
			$('.m_header_main').addClass('event');
			$('.header_sidebar').height($(window).outerHeight(true) - $('.m_header_main').outerHeight(true));
			$('.m_header_main').height(vheight);
			$('.header_sidebar').css('top',vheight+'px')
			setTimeout(function(){
				$('.header_sidebar').css({'left':'-6px','width':'calc(100% + 16px)'});
				$('body').css({'position':'fixed','top':-oBeforePosition,'width':'100%','bottom':'0','overflow':'hidden'});
				if($(".new_proList_mainListBox_bg").length != 0){
					$('.new_proList_mainListBox_bg').height(0);
				}
			},250)

        }
    });



    $('.header_sidebar_first_account').on('click',function(){
        if($(this).hasClass('is_login')){
            $('.header_sidebar_second.show_for_login').css('left',0);
            $('.header_sidebar_second.show_for_login .header_sidebar_second_list').show();
        }else{
            var language_code = $(this).attr('language_code');
            if (language_code == 'en'){
                window.location.href='/index.php?main_page=login';
            } else{
                window.location.href='/'+language_code+'/index.php?main_page=login';
            }
        }
    });
    $('.index_wap_country_main').height($(window).outerHeight(true) - $('.m_header_main').outerHeight(true));

    $('.header_sidebar_first_categories li').on('click',function(){
        var oFirstIndex = $(this).index();
		$('.header_sidebar_second,.header_sidebar_third_all').css({"display":"block",'left':'200%'});
        $('.header_sidebar_second_list_all .header_sidebar_second_list').eq(oFirstIndex).show().siblings().hide();
        $('.header_sidebar_second_help_all .header_sidebar_second_list').hide('300');
        $('.header_sidebar_second').css('left',0);
    });

    $('.header_sidebar_first_help li').on('click',function(){
        var oHelptIndex = $(this).index();
        if(oHelptIndex!=5){
            $('.header_sidebar_second_help_all .header_sidebar_second_list').eq(oHelptIndex).show().siblings().hide();
            $('.header_sidebar_second_list_all .header_sidebar_second_list').hide('300');
            $('.header_sidebar_second').css('left',0);
        }
    });

    $(document).on('click','.header_sidebar_second_categories li',function(){
        var oSecondIndex = $(this).index();
        $(this).parent().siblings('.header_sidebar_third_all').css('left',0);
        $(this).parent().siblings('.header_sidebar_third_all').find('.header_sidebar_third').eq(oSecondIndex).show().siblings().hide();
    });



    $(document).on('click','.header_sidebar_second_tofirst',function () {
        $('.header_sidebar_second,.header_sidebar_third_all').css('left','200%');
    });

    $(document).on('click','.header_sidebar_second_tosecond',function () {
        $('.header_sidebar_third_all').css('left','200%');
        $('.header_sidebar_third').hide('300');
    });

    // 搜索
    /*新增2017.9.23 搜索*/
    $(window).scroll(function(){
		if($('.m-covid-information').length == 0 || $('.m-covid-information').hasClass('m_covid_none')){
			var heighe = 0 + 34;
		}else{
			var heighe = $('.m-covid-information').outerHeight() + 34;
		}
		if($(window).scrollTop() >= heighe){
			$('.m_header_search').addClass('active');
			//$('.header_top_logo').hide();
			$('.m_header_main').addClass('active');
		}else{
			$('.m_header_search').removeClass('active');
			$('.header_top_logo').show();
			$('.m_header_main').removeClass('active');
		}
    });
    $('.m_header_proSearch_btn').on('click',function(){
        $('.m_search_main').fadeIn('fast');
        // $('#CityAjax_phone').focus();
        $('html,body').css({'overflow':'hidden','height':'100%'});
        if($('#CityAjax_phone').val() != ''){
            $('#clear_word').show();
        }
    });
    $('.m_search_main_top').find('.m_search_cancelTxt').eq(0).on('click',function(){
        $('.m_search_main').fadeOut('fast');
        $('html,body').css({'overflow':'initial','height':'auto'});
    });

    /*搜索框点击提示消失2017.9.12Barry*/
    $('#CityAjax_phone').focus(function(){
        $(this).attr('placeholder','');
        if($('.m_ac_results li').length>=1 && $('#CityAjax_phone').val() ){
            $('.m_ac_results').show();
        }
    });
    $('#CityAjax_phone').keyup(function(){
        var search_key_m = $(this).val();
        if(!search_key_m){
            $('#clear_word').hide();
            return false;
        }
        $('#clear_word').show();
    });
    // 关闭搜索
    $("#clear_word").on('click',function(){
        $("#CityAjax_phone").val('');
        $("#CityAjax_phone").focus();
        $(".m_ac_results").html("").hide();
        $(this).hide();
    });

    /*新底部JS，Barry--2017.8.21*/
    $('.m_footer_03_inner').click(function(){
        if($(this).hasClass('show')){
            $(this).removeClass('show');
            // 兼容shipping_delivery.html展开收起的改动
            if($(this).parents(".mains_select_table").length > 0){
               $(this).find('.icon').html('&#xf057;');
            }
        }else{
            $(this).addClass('show');
            // 兼容shipping_delivery.html展开收起的改动
            if($(this).parents(".mains_select_table").length > 0){
               $(this).find('.icon').html('&#xf049;');
            }
        }
        $(this).parent('.m_footer_03_one').siblings().find('.m_footer_03_two').slideUp();
        $(this).parent('.m_footer_03_one').siblings().find('.m_footer_03_inner').removeClass('show');
        $(this).siblings('.m_footer_03_two').slideToggle();
        // 兼容shipping_delivery.html展开收起的改动
        if($(this).parents(".mains_select_table").length > 0){
            $(this).parent('.m_footer_03_one').siblings().find('.m_footer_03_inner').find('.icon').html('&#xf057;');
        }
    });

    // 国家块（选择国家，打开的新块）
    $('.header_sidebar_first_country,.m_footer_country_currency,.header_country_code,.header_country_m_swtich').click(function(){
        $('.index_wap_country').css('top',0);
		$('.country_bg').show();
        $('html,body').addClass('choose_country_open');

    });
    // 关闭国家块
    var oDefaultLanguage ;
    setTimeout(function () {
        if($('.index_wap_currency_list').length > 1){
            oDefaultLanguage = $('.index_wap_currency_list.default').index();
        }
    },100);
    $('.index_wap_country_back,.country_main_country_btn_right').click(function(){
		$('.country_bg').hide();
		$('.index_wap_country_main_country').slideUp('300');
		$('.index_wap_country_main_sure').removeClass('show');
        if(!$('.index_wap_country_list.default').hasClass('active')){
            $('.index_wap_country_list.default').addClass('active').siblings().removeClass('active');
            var oFlag = $('.index_wap_country_list.default').find('i').eq(1).attr('data-country');
            var oCountryName = $('.index_wap_country_list.default').find('i').eq(1).text();
            var strImage = 'https://img-en.fs.com/includes/templates/fiberstore/images/mCountry-flag/ic_';
            $(".index_wap_country_main_sure a").find('img').attr('src',strImage+oFlag+".png");
            $(".index_wap_country_main_sure a").find('i').eq(1).attr('data-country',oFlag);
            $(".index_wap_country_main_sure a").find('i').eq(1).text(oCountryName);
            $.ajax({
                url:"ajax_choose_country.php?request_type=match_languages",
                type:"POST",
                data:{country:oFlag},
                dataType:"json",
                success:function(msg){
                    var wap_curr_str = wap_select_str ='';
                    var oActive = '';
                    if(msg){
                        if(msg.length > 1){
                            wap_curr_str +='<a href="javascript:;"><span class="index_wap_country_list_name"><em class="icon iconfont">&#xf271;</em>';
                            wap_curr_str +='<i data-area="'+msg[oDefaultLanguage].website+'" data-currency="'+msg[oDefaultLanguage].currency+'">'+msg[oDefaultLanguage].default_site+' / '+msg[oDefaultLanguage].symbol_var+' '+msg[oDefaultLanguage].currency+'</i>';
                            wap_curr_str +='</span><b class="icon iconfont">&#xf087;</b></a>';
                            for(i=0;i<msg.length;i++){
                                if(i == oDefaultLanguage){
                                    oActive = 'active';
                                }else{
                                    oActive = '';
                                }
                                wap_select_str +='<li class="index_wap_currency_list ' + oActive + '"><a href="javascript:;"><span data-country ="'+msg[i].website+'" data-currency="'+msg[i].currency+'">'+msg[i].default_site+' / '+msg[i].symbol_var+' '+msg[i].currency+'</span><icon class="icon iconfont">&#xf158;</icon></a></li> ';
                            }
                        }else{
                            wap_curr_str +='<a href="javascript:;"><span class="index_wap_country_list_name"><em class="icon iconfont">&#xf271;</em><i data-area="'+msg[0].website+'" data-currency="'+msg[0].currency+'">'+msg[0].default_site+' / '+msg[0].symbol_var+' '+msg[0].currency+'</i></span><b class="icon iconfont">&#xf087;</b></a>';
                        }
                    }else{
                        wap_curr_str +='<a href="javascript:;"><span class="index_wap_country_list_name"><em class="icon iconfont">&#xf271;</em><i data-area="en" data-country="us" data-currency="USD">English /$ USD</i></span><b class="icon iconfont">&#xf087;</b></a>';
                        wap_select_str += '<li class="index_wap_currency_list"><a href="javascript:;"><span data-area="en" data-currency="USD">English / $ USD</span></a></li>';
                    }
                    $(".index_wap_country_main_currency ul").html(wap_select_str);
                    $(".index_wap_currency_main_sure").html(wap_curr_str);
                    if(msg.length == 1){
                        $(".index_wap_currency_main_sure a b").remove();
                    }
                }
            })
        }
        $('.index_wap_country').css('top','200%');
        $('html,body').removeClass('choose_country_open');
    });
    $('.index_wap_country_main').height($(window).height() - 50);

    // var browser={
    //     versions:function(){
    //         var u = navigator.userAgent, app = navigator.appVersion;
    //         return { //移动终端浏览器版本信息
    //             trident: u.indexOf('Trident') > -1, //IE内核
    //             presto: u.indexOf('Presto') > -1, //opera内核
    //             webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
    //             gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
    //             mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
    //             ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
    //             android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
    //             iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
    //             iPad: u.indexOf('iPad') > -1, //是否iPad
    //             webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
    //             weixin: u.indexOf('MicroMessenger') > -1, //是否微信
    //             qq: u.match(/\sQQ/i) == " qq" //是否QQ
    //         };
    //     }(),
    //     language:(navigator.browserLanguage || navigator.language).toLowerCase()
    // };
    // //平板切换横竖屏
    // //判断手机横竖屏状态：/?c_site=p_site
    // function hengshuping() {
    //     var oScreen = window.screen.width;
    //     if (window.orientation == 180 || window.orientation == 0) {
    //         if(oScreen>=480 && oScreen<960){
    //             window.location.href="?c_site=p_site";
    //         }
    //         if(oScreen > 960){
    //             $('meta[name="viewport"]').attr('content','width=device-width,target-densitydpi=high-dpi,initial-scale=1.0, minimum-scale=0.0, maximum-scale=1.0, user-scalable=yes');
    //             window.location.href ="?c_site=w_site";
    //         }
    //     }
    //     if (window.orientation == 90 || window.orientation == -90) {
    //         if(browser.versions.iPad){
    //             window.location.href="?c_site=w_site";
    //         }
    //     }
    // }
    //
    // window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false);
    // if(browser.versions.iPad){
    //     if (window.orientation == 90 || window.orientation == -90){
    //         $('meta[name="viewport"]').attr('content','width=device-width,target-densitydpi=high-dpi,initial-scale=1.0, minimum-scale=0.0, maximum-scale=1.0, user-scalable=yes');
    //         if($('.top').length==0){
    //             window.location.href="?c_site=w_site";
    //         }
    //     }
    //     if (window.orientation == 180 || window.orientation == 0){
    //         var oScreen = window.screen.width;
    //         if(oScreen>960){
    //             if($('.top').length==0){
    //                 window.location.href="?c_site=w_site";
    //             }
    //             $('meta[name="viewport"]').attr('content','width=device-width,target-densitydpi=high-dpi,initial-scale=1.0, minimum-scale=0.0, maximum-scale=1.0, user-scalable=yes');
    //         }
    //     }
    // }


    var oPlaceholder = String();
    $('input,textarea').on('focus',function(){
        oPlaceholder = $(this).attr('placeholder');
        $(this).attr('placeholder',"");
    });
    $('input,textarea').on('blur',function(){
        $(this).attr('placeholder',oPlaceholder);
        oPlaceholder = "";
    });

    // 视频关闭
    $('.new_popup_tit .icon').click(function(){
        $('.new_popup').hide();
        $('#new_popup_video_iframe').attr('src','');
        $('.new_popup').removeClass('show');
    });
    $(document).bind("click", function(e) {
        var target = $(e.target);
        if(target.closest(".new_popup_bg").length != 0) {
            //do something...
            $('.new_popup').hide();
            $('.new_popup').removeClass('show');
            $('#new_pro_QV_window').removeClass('qv_animate_active').css({'height':"450px"});
            $('#new_popup_video_iframe').attr('src','');
            $('html').css({'overflow':'auto',"height":"auto"});
            $('body').css({'overflow':'auto','padding-right':'0',"height":"auto"});
        }
        if($('.new_choose_country').hasClass('show')){
            if(target.closest(".new_choose_country_main").length == 0) {
                //do something...
                $('.new_choose_country').hide();
                $('.new_choose_country').removeClass('show');
                $('html').removeClass('choose_country_open');
            }
        }
    });

    $('.box').on('click','.spirit_bs',function(){
        var This = $(this);
        /*当宽度大于960的时候执行判断*/
        if($(window).width()>960){
            /*先获取offsetleft*/
            var windowWidth = $(window).width();
            var Left = This.offset().left;
            var Width = This.find('.bubble-frame').width();

            /*先判断左边*/
            if(Width>(Left-30)){
                if(This.find('.bubble-frame').hasClass('right-middle')){
                    This.find('.bubble-frame').removeClass('right-middle').addClass('left-middle');
                }
            }
            /*判断右边*/
            if(Width>(windowWidth-Left)+30){
                if(This.find('.bubble-frame').hasClass('left-middle')){
                    This.find('.bubble-frame').removeClass('left-middle').addClass('right-middle');
                }
            }
        }

        if($(this).find('.bubble-frame').height()%2 !== 0){
            $(this).find('.bubble-frame').height($(this).find('.bubble-frame').height()+1)
        }

        $(this).siblings().removeClass('active');
        $(this).closest('.new-mtp-img-container').siblings().find('.spirit_bs').removeClass('active');
        if($(this).hasClass('active')){
            var _this = $(this);
            $(this).find('.none').removeClass('state');
            setTimeout(function(){
                _this.removeClass('active');
                if($(window).width()<960){
                    _this.find('.new_m_bg_wap').css('display','none');
                    _this.find('.new_m_bg1').css('display','none');
                }
            },300)

        }else{
            var _this = $(this);
            tag_img_get_instock(_this);
            var _this = $(this);
			if($(window).width()>960){
				setTimeout(function(){
					_this.addClass('active');
					_this.find('.none').addClass('state');
				},100)
			}else{
				setTimeout(function(){
					_this.addClass('active');
				},100);
				_this.find('.none').removeClass('state');
			}
        }
		return false;
    });
});
// 手机版end

//视频播放
function my_video_play(_this,is_mobile){
    is_mobile = is_mobile?is_mobile:false;
    var _this = $(_this);
    $('#new_popup_video').show();
    $('#new_popup_video_title').html(_this.attr('data-title'));
    $('#new_popup_video_iframe').attr('src',_this.attr('data-link'));
    $('#new_popup_video_iframe').show();
    $('#new_popup_video_video').hide();
    if(is_mobile){
        $('.new_popup_video').height($(window).width() * 0.5625);
    }
    $('.new_popup').addClass('show');
}

//本地视频播放
function my_local_video_play(_this,is_mobile){
    is_mobile = is_mobile?is_mobile:false;
    var _this = $(_this);
    $('#new_popup_video').show();
    $('#new_popup_video_title').html(_this.attr('data-title'));
    $('#new_popup_video_video').attr('src',_this.attr('data-local'));
    $('#new_popup_video_video').attr('poster',_this.attr('data-localposter'));
    $('#new_popup_video_iframe').hide();
    $('#new_popup_video_video').show();
    if(is_mobile){
        $('.new_popup_video').height($(window).width() * 0.5625);
    }
    $('.new_popup').addClass('show');
}

/*case studies专题Tech support置顶*/
$(function(){
    if($('.pr_Public_top').length > 0){
        $(window).scroll(function(){
            if($(window).width() > 960){
                var oFixed = $('.pr_Public_top').offset().top;
                if($(window).scrollTop() > oFixed){
                    $('.pr_Public_top_fixed').addClass('active');
                }else{
                    $('.pr_Public_top_fixed').removeClass('active');
                }
            }

        })
    }
});


/*左上角政策弹窗*/
$('.Policy_window_a01').click(function(){
	$('#free_shipping_window').show();
	setTimeout(function(){
		fnAlertEven($('.Policy_window_02'));
	},100)
});



/*奇数弹框时，自动设定弹框的margin-top值*/
function fnAlertEven(b){
    if($(window).width()>960){
        if(b.height() % 2 !=0){
            var oProductListTop =(b.height()+1)/2;
            b.css({'margin-top':-oProductListTop,'transform':'none'});
        }
    }
}

/*下拉改版*/
$(function(){
    var aCategories = [];
    for(var i=0;i<$('.header_list_more_ul li').length;i++){
        var oShowHeight = $('.header_list_more_ul li').eq(i).find('.header_list_more_ul_main').height();
        aCategories.push(oShowHeight);
    }
    var aSubject = 300;
    var aSolution = 220;
    var aResources = 300;
    var aAbout = 220;
    if($(window).width() <= 1220){
        aSubject = 287;
    }
    var AllCate;
    var oTimerNum = 0;
    $('.header_list_more_ul li').mouseover(function(){
        var $this = $(this);
        AllCate = setInterval(function(){
            oTimerNum++;
            if(oTimerNum>=14){
                $this.addClass('show').siblings().removeClass('show');
                $this.find('.header_list_more_ul_main').addClass('show');
                $this.siblings().find('.header_list_more_ul_main').removeClass('show');
                var oIndex = $this.index();
                var oHoverHeight = aCategories[oIndex];
                $('.header_main_list_more_all').height(oHoverHeight);
                $this.parent('ul').height(oHoverHeight);
                clearInterval(AllCate);
                oTimerNum = 0;
            }
        },1)
    });
    $('.header_list_more_ul li').mouseout(function(){
        clearInterval(AllCate);
    });
    $('.header_main_list_first').mouseover(function(){
        var oIndex = $('.header_main_list_more_allcategories_main').find('li.show').index();
        var oStartHeight = aCategories[oIndex];
        $('.header_main_list_more_all').height(oStartHeight);
        var oShowIndex = $(this).index();
        $('.header_main_list_more').eq(oShowIndex).stop().addClass('show').siblings().removeClass('show');
    });
    $('.header_main_firstul li').mouseover(function(){
        if($(this).hasClass('support_li')){
            $(this).find('.down_arrow').removeClass('rotate');
            $(this).siblings().find('.down_arrow').removeClass('rotate');
            $('.public_mask').fadeOut('150');
            $('.header_main_list_more_all').height(0);
            $('.home_drop_down_carrier').css('display','none');
        }else{
            $(this).find('.down_arrow').addClass('rotate');
            $(this).siblings().find('.down_arrow').removeClass('rotate');
            $('.public_mask').fadeIn('150');
            $('.home_drop_down_carrier').css('display','block');
            var width = ($(this).width() - 40) / 2;
            var left = ($(this).offset().left - $('.header_main_firstul').offset().left + width) + 'px';
            // $('.home_drop_down_carrier').width(width);
            $('.home_drop_down_carrier').css('left',left);
        }
    });
    fnHeadSelect($('.header_main_list_second'),$('.header_main_list_more'),$('.header_main_list_more_all'),aSubject);
    fnHeadSelect($('.header_main_list_third'),$('.header_main_list_more'),$('.header_main_list_more_all'),aSolution);
    fnHeadSelect($('.header_main_list_fourth'),$('.header_main_list_more'),$('.header_main_list_more_all'),aResources);
    fnHeadSelect($('.header_main_list_fifth'),$('.header_main_list_more'),$('.header_main_list_more_all'),aAbout);

    fnHeadTab($('.header_main_list_more_subject_main_left p'),$('.header_main_list_more_subject_main_right_con'));
    fnHeadTab($('.header_main_list_more_solution_main_left p'),$('.header_main_list_more_solution_main_right_con'));
    fnHeadTab($('.header_main_list_more_resources_main_left p'),$('.header_main_list_more_resources_main_right_con'));

    function fnHeadTab(a,b){
        var oTabSet;
        a.mouseover(function(){
            var oTabNum = 0;
            var $this = $(this);
            oTabSet = setInterval(function(){
                oTabNum++;
                //console.log(oTabNum);
                if(oTabNum>=14){
                    //console.log(oTabNum);
                    $this.addClass('hover').siblings().removeClass('hover');
                    var oIndex = $this.index();
                    b.eq(oIndex).show().siblings().hide();
                    clearInterval(oTabSet);
                    oTabNum = 0;
                }
            },1)

        });
        a.mouseout(function(){
            clearInterval(oTabSet);
        })
    }
    function fnHeadSelect(a,b,c,d){
        a.mouseover(function(){
            var oShowIndex = $(this).index();
            b.eq(oShowIndex).stop().addClass('show').siblings().removeClass('show');
            c.height(d);
        });
    }
    $(document).mouseover(function(e) {
        var target = $(e.target);
        if(target.closest(".header_main_firstul").length == 0 && target.closest(".header_main_list_more_all").length == 0 ) {
            $('.header_main_list_more_all').height(0);
            $('.public_mask').stop(true).hide();
            $('.header_main_firstul li').find('.down_arrow').removeClass('rotate');
            $('.home_drop_down_carrier').css('display','none');
            
        }
    });
});

/*头部搜索添加清除按钮*/
$(function(){
    $('.header_main .aron_barry_clear_input').click(function(){
        $('.header_main .header_main_search_txt').val("");
        $('.header_main .header_main_search_txt').focus();
        $(this).hide();
        $('.ac_results').html('').hide();
    })
});

$(function() {
    $('.pc-alone-height').mouseover(function () {
        $('.header_main_list_more_all').height($('.Resources .header_main_list_more_solution_main').height());
    });
    $(document).mouseover(function (e) {
        var target = $(e.target);
        if (target.closest(".header_main_firstul").length == 0 && target.closest(".header_main_list_more_all").length == 0) {
            $('.header_main_firstul').removeClass('header_sign_more_arrow_show');
        }
    });
});

/*公共头部国家选择Need Help下拉*/
$(function(){
	var top_help_width = ($('.top_help').width()/2)-9;
	var top_country_width = ($('.top_country').width()/2)-9 + $('.top_right_line').outerWidth(true) + $('.top_help').width();
	$('.top_help .header_sign_more_arrow').css('right',top_help_width+'px');
	$('.top_right .top_country .top_country_more .header_sign_more_arrow').css({"left":"inherit","margin-left":"0","right":top_country_width+'px'})
});

//头部搜索框改版 Barry 2019.09.06
$(function(){
    $('.header_main_search_txt').on('keydown',function(e){
        var oKeyCode = e.which;//40 Down   38 Up
        var oIndex= $('.select_input_search.choose').index();
        if(oKeyCode == 40){
            var oResults = $('.select_input_search').length;
            oIndex++;
            if(oIndex >= oResults){
                oIndex = 0;
            }

            var oChooseContent = $('.select_input_search').eq(oIndex).text();
            $('#CityAjax').val(oChooseContent);
            $('.header_main .aron_barry_clear_input').css('display','inline');
        }else if(oKeyCode == 38){
            var oResults = $('.select_input_search').length;
            oIndex--;
            if(oIndex < 0){
                oIndex = oResults - 1;
            }

            var oChooseContent = $('.select_input_search').eq(oIndex).text();
            $('#CityAjax').val(oChooseContent);
            $('.header_main .aron_barry_clear_input').css('display','inline');
        }
    });
});

//首页m端样式问题 Carr 2019.12.25
// $(function(){
	// var node = $(document).scrollTop();
	// if(node > 0){
		// $('.m_header_main').addClass('event');
	// }
	// $(document).scroll(function() {
		// $('.m_header_main').addClass('event');
	// })
// });

/*专题底部和返回顶部js开始*/
$(function(){
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
	if ($('.soluSide-child-box-bg').length >0 ) {
		$(window).scroll(function(){
			$('.soluSide-child-box-bg').height($('.soluSide-child-box').outerHeight());
		})
	}
});
function _proGotop(){
    var scrollTop = $(window).scrollTop();
    $("html,body").animate({scrollTop: 0},300);
}
/*专题底部和返回顶部js结束*/

$(function(){
	$('.m_header').height($('.m_header_main').outerHeight()+'px');
    $(document).on('click','.covid_close',function(){
        //设置Cooike
        var exp = new Date();
        exp.setTime(exp.getTime() + 30*24*60*60*1000);
        document.cookie='covid_c'+"=1; expires="+exp.toGMTString();

		$(this).closest('.m-covid-information').addClass('m_covid_none');
		$('.m_header,.m_header_main').removeAttr('style');

        $('.covid_general').slideUp('normal',function(){
            $('.m_header,.header_sidebar').removeClass('covid_show_s');
            $('.public_mask').css('top','111px');
            $('.public_mask').height($('html').height() - 111);
            $('.index_wap_country_main,.header_sidebar').height($(window).outerHeight(true) - $('.m_header').outerHeight(true));
			$('.header_sidebar').css('top',$('.m_header_main').height()+'px');
        });

    })
});

/*新版搜索*/
function change_hot_search(obj)
{
    var page = $(obj).parents('.fs_hot_search').find('dd').find('a').attr('data-page');

    if (page) {
        page = parseInt(page) + 1;
    } else {
        page = 1;
    }

    $.ajax({
        url:"ajax_autocomplete_search_list.php?action=get_hot_search",
        type:"get",
        data:{
            page : page
        },
        dataType:"json",
        beforeSend:function(){
            $(obj).find('i').addClass('active');
        },
        success:function(result){
            if (result.code === 1) {
                $('.fs_hot_search').find('dd').html(result.data.html);
                $('.fs_recent_search').find('dd').html(result.data.html_recent);
                $('.fs_search_default').css('display', 'block');
            } else {

            }
            $(obj).find('i').removeClass('active');
        }
    });

}

function remove_recent_search(obj, keyword)
{
    $.ajax({
        url:"ajax_autocomplete_search_list.php?action=remove_recent_search",
        type:"POST",
        data:{
            keyword : keyword
        },
        dataType:"json",
        success:function(result){
            if (result.code === 1) {
                if (result.data.html_recent) {
                    $('.fs_recent_search').css('display', 'block').find('dd').html(result.data.html_recent);
                } else {
                    $('.fs_recent_search').css('display', 'none');
                }

            } else {

            }
        }
    });

    var event = event || window.event;

    event.preventDefault();
    return false;
}

//pc点击
$('#CityAjax').on('click', function(){
    var value = $(this).val();
    $('.real_time_results_ul').parent().hide();
    if (value && $('.real_time_results_ul').find('li').length >0 ) {
        $('.real_time_results').css('display', 'block');
    } else if ($('.fs_hot_search').find('dd').find('a').length > 0) {
        $('.fs_search_results').show();
        $('.fs_hot_search').css('display', 'block').parents('.fs_search_default').css('display', 'block');
    } else {
        $.ajax({
            url: "ajax_autocomplete_search_list.php?action=get_hot_search",
            type: "get",
            data: {
                page: 1
            },
            dataType: "json",
            success: function (result) {
                if (result.code === 1) {
                    $('.fs_hot_search').find('dd').html(result.data.html);
                    //最近搜索
                    if (result.data.html_recent) {
                        $('.fs_recent_search').find('dd').html(result.data.html_recent).end().css('display', 'block');
                    }
                    $('.fs_search_default').css('display', 'block');
                    $('.fs_search_results').show();
                } else {

                }
            }
        });
    }
});

//手机点击
$('#CityAjax_phone').on('focus', function(){
    var value = $(this).val();

    $('.real_time_results_ul').parent().hide();

    if (value && $('.real_time_results_ul').find('li').length >0 ) {
        $('.real_time_results').css('display', 'block');
    } else if ($('.fs_hot_search').find('dd').find('a').length > 0) {
        $('.fs_search_results').show();
        $('.fs_hot_search').css('display', 'block').parents('.fs_search_default').css('display', 'block');
    } else {

        $.ajax({
            url: "ajax_autocomplete_search_list.php?action=get_hot_search",
            type: "get",
            data: {
                page: 1
            },
            dataType: "json",
            success: function (result) {
                if (result.code === 1) {
                    $('.fs_search_default_m .fs_hot_search').find('dd').html(result.data.html);

                    $('.fs_search_default_m .fs_recent_search').find('dd').html(result.data.html_recent);

                    $('.fs_search_default_m .fs_search_default').css('display', 'block');
                    $('.fs_recent_search').css('display', 'block');
                } else {

                }
            }
        });
    }
});

$('.m_header_proSearch_btn').on('click', function(){
    $('.real_time_results_ul').parent().hide();
    var value = $('#CityAjax_phone').val();
    if (value && $('.real_time_results_ul').find('li').length >0 ) {
        $('.real_time_results').css('display', 'block');
    } else if ($('.fs_hot_search').find('dd').find('a').length > 0) {
        $('.fs_search_results').show();
        $('.fs_hot_search').css('display', 'block').parents('.fs_search_default').css('display', 'block');
    } else {
        $.ajax({
            url: "ajax_autocomplete_search_list.php?action=get_hot_search",
            type: "get",
            data: {
                page: 1
            },
            dataType: "json",
            success: function (result) {
                if (result.code === 1) {
                    $('.fs_search_default_m .fs_hot_search').find('dd').html(result.data.html);

                    $('.fs_search_default_m .fs_recent_search').find('dd').html(result.data.html_recent);

                    $('.fs_search_default_m .fs_search_default').css('display', 'block');
                } else {

                }
            }
        });
    }
});

// $('.fs_search_results').on('mouseleave', function(){
//     $(this).css('display', 'none');
// });
// $('.fs_search_results').on('mouseenter', function(){
//     $(this).css('display', 'block');
// });
// $('.header_main_search_txt').on('mouseenter', function(){
//     $('.fs_search_results').css('display', 'block');
// });
// $('.header_main_search_txt').blur(function(){
//     $('.fs_search_results').css('display', 'none');
// });
$('body').click(function(e) {
	var target = $(e.target);
	if(target.closest('.header_main_search').length < 1) {
        $('.fs_search_results').css('display', 'none');
	}
});

// $('#CityAjax').on('click', function(){
//     $('.fs_search_results').css('display', 'block');
// });

//搜索词统计
function add_search_words_statistics(obj)
{
    var _this = $(obj);
    var id = _this.attr('data-id');
    var search_key = _this.attr('data-search-key');
    var link = _this.attr('data-link');



    if (id && search_key && link) {
        $.ajax({
            url: "ajax_autocomplete_search_list.php?action=add_search_words_statistics",
            data: {
                id: id,
                search_key: search_key
            },
            type: "POST",
            dataType: "json",
            success: function (response) {
                // location.href = link;
            }
        })
    } else {
        // location.href = link;
    }
}

/*新版搜索*/
