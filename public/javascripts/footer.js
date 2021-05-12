// feedback window
function feedback_submit_form(){
    if($('#feedback_submit').hasClass('eva_red') ){
        if($('#feedback_form').valid()){
            var email = $.trim($("#feedback_email").val()),
            content = $.trim($("#feedback_content").val()),
			rating = $.trim($("#feedback_rating").val()),
			name = $.trim($("#feedback_name").val()),
			topic = $.trim($("#feedback_topic").val());

            if(name == 'undefined'){
                name = '';
            }
            $.ajax({
                url: "index.php?main_page=service_feedback&action=feedback_submit",
                data: {
                    email: email,
                    content: content,
					rating: rating,
					topic: topic,
                    name:name
                },
                type: "POST",
                dataType: "json",
                beforeSend: function () {
                    var img = $('<div id="loader_order_alone" class="loader_order"><svg class="circular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10"></circle></svg></div>');
                    $('#feedback_submit').attr('disabled', 'disabled').addClass('cart_a_one alone_active').html(img);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    $('#feedback_overlay,#feedback_window').hide();
                    $('#feedback_submit').removeAttr('disabled').removeClass('cart_a_one alone_active').html(submit_str);
					sweetAlert(system_buy_str, "","error");
					$("#feedback_topic").val("");
					$(".pro_new_select01_span").html(choose_one);
                },
                success: function (response) {
					if (response.status == 1) { // success
                        $('#feedback_window').hide();
                        $('#feedback_tip_window').find('.email_Delete_txt').text(response.info);
                        $('#feedback_tip_window').show();
						$('#feedback_submit').removeAttr('disabled').removeClass('cart_a_one alone_active').html(submit_str);
						$("#feedback_topic").val("");
						$(".pro_new_select01_span").html(choose_one);
                    }else if (response.status == 0){
                        $('#feedback_window').hide();
                        $('#feedback_tip_window').children('.email_delete_img').hide().next('.email_Delete_txt').html(response.info).css({'font-size':'20px','padding-top':'74px'});
                        $('#feedback_tip_window').show();
                        $('#feedback_submit').removeAttr('disabled').removeClass('cart_a_one alone_active').html(submit_str);
                        $("#feedback_topic").val("");
                        $("#error_submit_number").html('');
                        $(".pro_new_select01_span").html(choose_one);
                    }else { // failure
                        $('#feedback_overlay,#feedback_window').hide();
						sweetAlert(response.info, "","error");
						$("#feedback_topic").val("");
						$(".pro_new_select01_span").html(choose_one);
                    }

                }
            });
        }
    }
}
$(function(){
    $('#feedback_submit').addClass('eva_red');
    // mobile，show the button for switching to the mobile version
	if(c_site && $(window).width()<= 1706){
		$("#phone_site_p_div").css("display","inline-block");
	}

    //form check
    if(typeof(feedback_valide)!="undefined"){
        feedback_valide['ignore'] = [];
        feedback_valide['errorPlacement'] = validateShowError;
        var feedback_valide_result = $('#feedback_form').validate(feedback_valide);
    }
	$('#feedback_rate_block .Evaluation_centent').click(function(){
        var _this = $(this);
        $('#feedback_rating').val(_this.attr('data-id'));
        $('#feedback_rating').parent().find('.error_prompt').html('');
        _this.addClass('active').siblings().removeClass('active');
	})


    $('.eva_textarea textarea').keyup(function(){
    	$('.eva_Prompt').text($(this).val().length)
    })
    $('#click_feedback,#click_feedback_01,#click_feedback_02,#click_feedback03').click(function(){
        // init window
        $('html').addClass('overflow_html');

        var write_review = $('#click_feedback03').data('review');
        if (write_review) {
            $('.Evaluation_tit').html(wirte_a_review);
        }
        $('#feedback_form')[0].reset();
        $('#feedback_form').find('.error_prompt').html('');
        // $('#feedback_submit').html(submit_str).addClass('eva_red');
        $('#feedback_rate_block .Evaluation_centent').removeClass('active');
        $('#feedback_rating').val('');
        $('.eva_Prompt').text(0);
        $('#feedback_window').show();
        setTimeout(function(){
			fnAlertEven($('#feedback_window'));
		},50)
    })
    $(document).on('click',"#feedback_submit",function () {
        feedback_submit_form();
    })
})


function tag_img_get_instock(_this){
    _this.addClass('active');
    _this.find('.none').addClass('state');
    //数据统计 add by tim
    if (typeof _faq !== 'undefined') {
        var p_id = _this.find('.bubble_tr span').data('product-id');
        _faq.push(['trackEvent', 'product_tree_tag_click', {"products_id" : p_id}, 4]);
    }
    return false;
    var tag_instock = $(_this).find('.tag_intock_pid');
    var pid = "";
    $(_this).find('.bubble_tr span').each(function () {
        pid += $(this).attr('data-product-id') + ",";
    })
    $.ajax({
        url:"ajax_choose_country.php?request_type=get_instock_html",
        data:{'pid':pid},
        type:"post",
        dataType:"json",
        beforeSend:function(){

        },
        success:function (data) {
            if(data.code==2){
                let i = 0, len = data.retu.length
                for (i = 0 ; i < len; i++) {
                    $(_this).find('#instockShow'+data.retu[i].pid).html(data.retu[i].html)
                }
                if($(window).width()<960){
                    _this.find('.new_m_bg_wap').css('display','block');
                    _this.find('.new_m_bg1').css('display','block');
                }
                _this.addClass('active');
                _this.find('.none').addClass('state');
            }else if(data.code==1){
            }
        }
    })
}

//手机选择国家
$(document).on('click',".index_wap_country_list",function(){
	// $(this).addClass('active').siblings().removeClass('active');
    // var oCountryCode = $(this).find('i').attr('data-country');
	// var oCountryText = $(this).find('i').text();
	// $(".index_wap_country_main_sure a").find('em').removeClass();
	// $(".index_wap_country_main_sure a").find('em').addClass('flag '+oCountryCode);
	// $(".index_wap_country_main_sure a").find('i').text(oCountryText);
	// $(".index_wap_country_main_sure a").find('i').attr('data-country',oCountryCode);
	// $('.index_wap_country_main_country').slideUp('300');
	// $('.index_wap_country_main_currency').slideUp('300');
	// $('.index_wap_currency_main_sure').removeClass('show');
    // $('.index_wap_country_main_sure').removeClass('show');

    $(this).addClass('active').siblings().removeClass('active');
    var image = 'https://img-en.fs.com/includes/templates/fiberstore/images/mCountry-flag/ic_';
    var oCountryCode = $(this).find('i').eq(1).attr('data-country');
    var oCountryText = $(this).find('i').eq(1).text();
    $(".index_wap_country_main_sure a").find('img').attr('src',image+oCountryCode+".png")
	$(".index_wap_country_main_sure a").find('i').eq(1).text(oCountryText);
    $(".index_wap_country_main_sure a").find('i').eq(1).attr('data-country',oCountryCode);
    $('.index_wap_country_main_country').slideUp('300');
	$('.index_wap_country_main_currency').slideUp('300');
	$('.index_wap_currency_main_sure').removeClass('show');
    $('.index_wap_country_main_sure').removeClass('show');

	$.ajax({
			url:"ajax_choose_country.php?request_type=match_languages",
			type:"POST",
			data:{country:oCountryCode},
			dataType:"json",
			success:function(msg){
                var wap_curr_str = wap_select_str ='';
				if(msg){
					wap_curr_str +='<a href="javascript:;"><span class="index_wap_country_list_name"><em class="icon iconfont">&#xf271;</em>';
					wap_curr_str +='<i data-area="'+msg[0].website+'" data-currency="'+msg[0].currency+'">'+msg[0].default_site+' / '+msg[0].symbol_var+' '+msg[0].currency+'</i>';
					wap_curr_str +='</span><b class="icon iconfont">&#xf087;</b></a>';

					for(i=0;i<msg.length;i++){
						wap_select_str +='<li class="index_wap_currency_list"><a href="javascript:;"><span data-country ="'+msg[i].website+'" data-currency="'+msg[i].currency+'">'+msg[i].default_site+' / '+msg[i].symbol_var+' '+msg[i].currency+'</span><icon class="icon iconfont">&#xf158;</icon></a></li> ';
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
});

$(document).on('click',".index_wap_currency_list",function(){
	var wap_oCurrencyCode =$(this).find('span').attr('data-currency');
    $(this).addClass('active').siblings().removeClass('active');
	var wap_oWebsite =$(this).find('span').attr('data-country');
	var wap_text =$(this).find('span').text();
	$(".index_wap_currency_main_sure a").find('i').attr('data-area',wap_oWebsite);
	$(".index_wap_currency_main_sure a").find('i').attr('data-currency',wap_oCurrencyCode);
	$(".index_wap_currency_main_sure a").find('i').text(wap_text);
	$('.index_wap_country_main_currency').slideUp('300');
	$('.index_wap_currency_main_sure').removeClass('show');

})

// M端国家货币切换方法
 function save_wap_country_select(){
	var wap_oCountryCode =$(".index_wap_country_main_sure a").find('i').eq(1).attr('data-country');
	var wap_oCurrencyCode =$(".index_wap_currency_main_sure a").find('i').attr('data-currency');
	var wap_oWebsite =$(".index_wap_currency_main_sure a").find('i').attr('data-area');
	var http,host,url,para,link;
	 http = document.location.protocol+"//";
	 host = window.location.host;
	 para ="/?country="+wap_oCountryCode+"&currency="+wap_oCurrencyCode;
	var safe_str = 'www.';
	 if(wap_oWebsite.indexOf("feisu.com") != '-1'){
		  link  = http+safe_str+wap_oWebsite; //如果是中文站国家并且跳往中文站点则不需要拼接参数
	 }else if(wap_oWebsite.indexOf("feisu.com/hk") != '-1' || wap_oWebsite.indexOf("feisu.com/tw") != '-1'){
		 link  = http+safe_str+wap_oWebsite+para; //如果是中文繁体站国家并且跳往中文繁体站点则需要拼接参数
	 }else{
		  if(wap_oWebsite == wap_code){
			 link  = '';
		  }else{
			 if(wap_oWebsite == "en"){
			    url = http+host;
			    link  = url+para;
			 }else{
				url = http+host+'/';
				link  = url+wap_oWebsite+para;
			 }
		  }
	 }
	 console.log(wap_oCurrencyCode,wap_oWebsite);
	 console.log(link);
	 //在本站切换国家则执行ajax请求
	 if(wap_oWebsite == wap_code){
		 $.ajax({
			url:"ajax_choose_country.php?request_type=choose_newcountry",
			type:"POST",
			data:{currency:wap_oCurrencyCode,country:wap_oCountryCode},
			dataType:"json",
			success:function (msg) {
				  window.location.reload();
			}
		});
	 }else{
		 window.location.href = link;
	 }
}

$(document).on('keyup',".index_wap_country_search_main_ipt", function() {
    $('.index_wap_country_list').hide();
    var oChina = false;
    for(var i=0;i<$('.index_wap_country_list').length;i++){
        if($('.index_wap_country_list').eq(i).find('i').text().toUpperCase().indexOf($(this).val().toUpperCase()) == 0){
            if($('.index_wap_country_list').eq(i).find('i').attr('data-country') == 'cn'){
                oChina = true;
            }
            $('.index_wap_country_list').eq(i).show();
        }
        if(oChina && $('.index_wap_country_list').eq(i).find('i').attr('data-country') == "tw"){
            $('.index_wap_country_list').eq(i).show();
        };
        if(oChina && $('.index_wap_country_list').eq(i).find('i').attr('data-country') == "hk"){
            $('.index_wap_country_list').eq(i).show();
        };
        if(oChina && $('.index_wap_country_list').eq(i).find('i').attr('data-country') == "mo"){
            $('.index_wap_country_list').eq(i).show();
        };
    }
    if($(this).val() == "") {
        $('.index_wap_country_list').show();
    }
});
$(document).on('click','.m_footer_country_currency_other',function(){
	$('.index_wap_currency').show();
});

$('.index_wap_country_main_sure').click(function(){
	if($(this).hasClass('show')){
		$(this).removeClass('show');
		$('.index_wap_country_main_country').slideUp('300');
	}else{
		$(this).addClass('show');
		$('.index_wap_country_main_country').slideDown('300');
	}
})
$('.index_wap_currency_main_sure').click(function(){
	if($(this).hasClass('show')){
		$(this).removeClass('show');
		$('.index_wap_country_main_currency').slideUp('300');
	}else{
		$(this).addClass('show');
		if($('.index_wap_currency_list').length ==1){
			return false;
		}else{
			$('.index_wap_country_main_currency').slideDown('300');
		}

	}
})
$('.country_main_country_btn_left').click(function(){
	$('.index_wap_country_main_country').slideUp('300');
	$('.index_wap_country_main_sure').removeClass('show');
})

// common way start
// show or hide loading
// type: show/hide
// way
function show_loading(_this,type,way,is_new){
    way = way?way:1;
    is_new = is_new?is_new:0;
    if(type == 'show'){
        if(way == 1){ //
            if(is_new){
                $('#new_common_loading').show();
            }else{
                $('#fs_loading_bg,#fs_loading').show();
            }
            if(_this){
                _this.attr('disabled', 'disabled');
            }
        }else if(way == 2){ // 2
            _this.closest('.new_details_tr').append('<div class="shopping_cart_pro_con_bg"></div><div id="loader_order_alone" class="loader_order"><svg class="circular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10"></circle></svg></div>');
        }else if(way == 3){ //3
            var html = '<div class="spinWrap public_bg_wap background"><div class="bg_color"></div><div id="loader_order_alone" class="loader_order"><svg class="circular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"></circle></svg></div></div>';
            var load = _this.closest(".alone_wap").find(".public_bg_wap");
            var length = load.length;
            if (!length) {
                _this.closest(".alone_wap").append(html);
            }
            var type = _this.prop("tagName");
            if (type == "INPUT" || type == "BUTTON") {
                _this.addClass("loading_button").attr("disabled", true);
            }
            load.show();
        }else if(way == 4) {
            $('.public_white_bg,#fs_loading').show();
        }else if(way == 5) {
            $('.login_loading_bg,#fs_loading').show();
        }
    }else{
        if(way == 1){
            if(is_new){
                $('#new_common_loading').hide();
            }else{
                $('#fs_loading_bg,#fs_loading').hide();
            }
            if(_this){
                _this.removeAttr('disabled');
            }
        }else if(way == 2){  // 2
            _this.closest('.new_details_tr').find('.shopping_cart_pro_con_bg').remove();
            _this.closest('.new_details_tr').find('.loader_order').remove();
        }else if(way == 3){  // 3
            _this.closest('.alone_wap').find('.public_bg_wap').remove();
            _this.removeClass("loading_button").attr("disabled", false);
        }else if(way == 4) {
            $('.public_white_bg,#fs_loading').hide();
        }else if(way == 5) {
            $('.login_loading_bg,#fs_loading').hide();
        }
    }
}

function show_new_server_tip_window(config_outer){
    var config = {
        type:'success',  //type: success/error
        content:'',
        tip:'',
        is_auto_hide:false,
        is_jump:false,
        jump_url:'', //default reload
    };
    config=$.extend(config,config_outer);
    var _this = $("#new_result_alert");
    if(config.type == 'success'){
        var icon = '<i class="iconfont icon">&#xf158;</i>';
    }else{
        var icon = '<i class="iconfont icon icon_gary" id="error_icon">&#xf228;</i>';
    }
    _this.find(".Successful_submission_tit").html(icon + config.content);
    if(config.tip){
        _this.find(".Successful_submission_txt").html(config.tip).show();
    }
    _this.show();
    if(config.is_auto_hide){
        setTimeout(function(){
            _this.hide();
        },3000);
    }
    _this.find('.alert_alaose').click(function () { //hand hide the result window
        _this.hide();
    })
    if(config.is_jump){
        setTimeout(function () {
            if(config.jump_url){
                location.href = revise_ajax_return_link(config.jump_url);
            }else{
                location.reload();
            }
        },3000);
    }
}

/*
* show or hide success or error result
* templates in tpl_account_left_slide_bar_new.php
*/
function show_server_tip_window(config_outer){
   var config = {
       type:'success',  //type: success/error
       content:'',
       is_auto_hide:false,
       is_jump:false,
       jump_url:'', //default reload
       is_window:true, //default window
       close_fun:'', //close，do other action
   };
   config=$.extend(config,config_outer);

    if(config.is_window){
        if(config.type == 'success'){
            $('#result_window_success_icon').show();
            $('#result_window_error_icon').hide();
        }else{
            $('#result_window_error_icon').show();
            $('#result_window_success_icon').hide();
        }
        $('#result_window_content').html(config.content);
        $('#result_window').show();
        if(config.is_auto_hide){
            setTimeout(function(){
                $('#result_window').hide();
                if(config.close_fun){
                    config.close_fun();
                }
            },3000);
        }
        $('#result_window_close').click(function () { //hand hide the result window
            $('#result_window').hide();
            if(config.close_fun){
                config.close_fun();
            }
        })
    }else{
        $('#service_'+config.type+'_tip_content').html(config.content);
        $('#service_'+config.type+'_tip').show();
        setTimeout(function () {
            $('#service_'+config.type+'_tip').hide();
            $('#service_'+config.type+'_tip_content').html('');
        },3000);
    }
    if(config.is_jump){
        setTimeout(function () {
            if(config.jump_url){
                location.href = revise_ajax_return_link(config.jump_url);
            }else{
                location.reload();
            }
        },3000);
    }
}

/**
 * type  1、详情页 2、列表页，搜索页  3、QV弹窗  4、购物车
 * @param obj
 * @param qty
 * @param attr_str
 * @param length
 * @param type
 */
function proorder_process_and_ship(evt,num,pid,attr_str,length,type,transTime) {
    var current_shipping_length = $("#default_shipping_methods").length;
    var shipping_methods="";
    if(current_shipping_length){
        shipping_methods = $("#default_shipping_methods").val();
    }
    //定制产品带属性的价格
    var product_price = "";
    var weight= "";
    if($("input[name='product_price']").length >0 && type==1){
        product_price = $("input[name='product_price']").val();
        weight = $("input[name='customized_attribute_weight_num']").val();
    }

    var material_arr = [];
    if(typeof materialData != "undefined"){
        material_arr = materialData;
    }else if(typeof materialAllArr != "undefined" && typeof materialAllArr[pid] != "undefined"){
        material_arr = materialAllArr[pid];
    }

    if(typeof transTime == "undefined"){
        transTime = 0;
    }

    if (typeof transTimeArr != 'undefined') {
        if(transTime == 0 && typeof transTimeArr[pid] != "undefined"){
            transTime = transTimeArr[pid];
        }
    }
    $.ajax({
        type:'post',
        url:'ajax_process_custom_instock.php?request_type=get_products_days_date',
        dataType:'json',
        data:{'pid':pid,'qty':num,"attr_str":attr_str,"length":length,"type":type,"shipping_methods":shipping_methods,"weight":weight,"product_price":product_price,"material_arr":material_arr,'transTime':transTime},
        success:function (msg) {
            if(msg.status == "success"){
                if(type ==1){
                    if(msg.shipping_info){
                        $(".shipping_text").eq(0).html(msg.shipping_info);
                    }
                    if(msg.process_time){
                        $("#product_add_to_cart").prev(".location_text_pro").find(".process_time_dylan").html(msg.process_time);
                    }
                    if(msg.process_time){
                        $('#attr_all_days').val(msg.process_time);
                    }
                }else if(type ==2){
                    if(msg.ship_on){
                        $("#img_quantity2_"+pid).parents(".picture_array_from").prev('.new_proList_ListBtxt1').find(".pid_ship_date").html(msg.ship_on);
                    }
                    if(msg.process_time){
                        $("#img_quantity2_"+pid).parents(".picture_array_from").prev('.new_proList_ListBtxt1').find(".process_time_dylan").html(msg.process_time);
                    }
                }else if(type ==3){
                    if(msg.ship_on){
                        $("#new_pro_QV_inner").find(".pid_ship_date").html(msg.ship_on);
                    }
                    if(msg.process_time){
                        $("#new_pro_QV_inner").find(".process_time_dylan").html(msg.process_time);
                    }
                }else if(type==4){
                    var dom = $(evt).parents(".shopcart-products-panel").prev(".shopcart-products-info");
                    if(msg.ship_on){
                        dom.find(".pid_ship_date").html(msg.ship_on);
                        $(evt).parents(".new-shopcart-tableBox").find(".pid_ship_date").html(msg.ship_on);
                    }
                    if(msg.process_time){
                        dom.find(".process_time_dylan").html(msg.process_time);
                    }
                }
            }else{
                console.log(msg.status);
            }
        }
    })
}

/*
* ajax 返回的链接，要进行处理。把&amp;改成&
 */
function revise_ajax_return_link(str){
    var reg = new RegExp( '&amp;' , "g" )
    return str.replace( reg , '&' );
}
// common way end

function _redirect(code, country_code, web_site, currency,pid) {
    var oCountryCode = country_code;
    var oCurrencyCode = currency;
    var oWebsite = web_site;
    var http, host, url, para, link, url_param;
    var index_url = "";
    http = document.location.protocol + "//";
    host = window.location.host;
    para = "/?country=" + oCountryCode + "&currency=" + oCurrencyCode;
    url_param = window.location.pathname + window.location.search;
    var cn_arr = ['cn']; //定义中文站国家数组
    var hk_arr = ['tw', 'hk', 'mo'];
    var safe_str = 'www.';
    if(oWebsite == "en"){
        index_url = http+host;
    }else{
        index_url = http+host+"/"+oWebsite
    }
    if ($.inArray(oCountryCode, cn_arr) != "-1" && oWebsite.indexOf("feisu.com") != '-1') {
        link = http + safe_str + oWebsite; //如果是中文站国家并且跳往中文站点则不需要拼接参数
    } else if ($.inArray(oCountryCode, hk_arr) != "-1" && oWebsite.indexOf("feisu.com") != '-1') {
        link = http + safe_str + oWebsite + para; //如果是中文繁体站国家并且跳往中文繁体站点则需要拼接参数
    } else {
        if (oWebsite == 'de/en' || oWebsite == 'de') { //德语站和德语英文站照常调转
            url = http + host + "/";
            link = url + oWebsite + para;
        } else {
            if (oWebsite == code) {  //如果是同站点切换国家
                if (oWebsite == "en") {
                    url = http + host;//如果是英文站点内切换国家则不需要拼接/
                    link = url + url_param;
                } else {
                    url = http + host;
                    link = url + url_param;//如果是独立站点切换国家则不需要拼接oWebsite
                }
            } else { //不同站点交互切换
                if (code == 'en') {  //如果当前站点处于英文站点
                    url = http + host + "/";
                    link = url + oWebsite + url_param; //英文站切独立站点则需要拼接oWebsite
                } else {
                    if (oWebsite == 'en') {
                        url = http + host + "/";
                        link = url + url_param.substr(4);	//别的独立站点切换到英文站点去掉独立站点的code
                    } else {   //如果是独立站点切换其他独立站点
                        url = http + host + "/";
                        link = url + oWebsite + url_param.substr(3);
                    }
                }


            }


        }
    }
    //在融合站点切换国家则执行ajax请求
    if (oWebsite == 'de/en' || oWebsite == 'de') {
        $.ajax({
            url:'ajax_process_custom_instock.php?request_type=get_products_status',
            type: "POST",
            data: {country: oCountryCode,pid:pid},
            dataType: "json",
            success: function (msg) {
                //在本站点进行切换只用重载页面
                if(msg.product_status){
                    window.location.href = http+host+"/"+oWebsite+para;
                }else{
                    window.location.href = link;
                }
            }
        });
    } else if (oWebsite == code) {
        $.ajax({
            url: "ajax_choose_country.php?request_type=choose_newcountry",
            type: "POST",
            data: {country: oCountryCode, currency: oCurrencyCode, website: oWebsite,pid:pid},
            dataType: "json",
            success: function (msg) {
                //在本站点进行切换只用重载页面
                if(msg.product_status){
                    window.location.reload();
                }else{
                    window.location.href = index_url;
                }
            }
        });
    } else {
        $.ajax({
            url: "ajax_choose_country.php?request_type=choose_newcountry",
            type: "POST",
            data: {country: oCountryCode, currency: oCurrencyCode, website: oWebsite,pid:pid},
            dataType: "json",
            success: function (msg) {
                //在不同站点进行切换只用重载页面
                if(msg.product_status){
                    window.location.href = link;
                }else{
                    window.location.href = index_url;
                }
            }
        });
    }

}



//产品列表和产品详情公用
/**
 * 跳转国家
 * @param code
 * @param obj
 * @param type 1.产品详情 2.产品列表
 */
function redirect_website(code,obj,pid,type){
    var country_code = $("#redirect_country_code").val();
    var country_id = $("#shipping_country").val();
    var web_site = "en";
    var currency = "USD"
    var post_code = $("#confirm_postCode").val();
    var state = $("#confirm_state").val();
    var pid = $("#products_id").val();
    var weight = "";
    var product_price = $("#products_price").val();
    var purchase_qty = $("#cart_quantity").val();
    var current_shipping = $(".shipping_list").find(".shipping_child.choosez");
    var current_shipping_length = $(".shipping_list").find(".shipping_child.choosez").length;
    var shipping_methods="";
    var is_pack =  product_box ? product_box : 0;
    var button_2 = $("#button_2");
    var length = button_2.length;
    var address_book_id = $('#address_list').find('.choosez').attr("data-address_book_id");
    var pack_number = packing_number ? packing_number : 1;
    if(current_shipping_length){
        shipping_methods = current_shipping.attr("data-methods");
    }
    type = type ? type : "";
    if(type == 2 && $(".postBox").is(":visible")){
        if(!post_code){
            $(obj).closest(".post_code_common").find(".post_error").show();
            return;
        }else{
            $(obj).closest(".post_code_common").find(".post_error").hide();
        }
    }
    if(is_pack ==1 && length && button_2.hasClass("choosez")){
        purchase_qty = pack_number * purchase_qty;
    }
    var attr_str = "";
    var length = "";
    if(type==1){
        var match_standard_product = $('input[name="match_standard_product"]').val();
        var match_status = $('input[name="match_status"]').val();
        weight = $("input[name='customized_attribute_weight_num']").val();
        if(!(match_standard_product && match_status==1) && $('input[name="match_standard_product"]').length>0 && $('input[name="match_status"]').length>0){
            if($("#attr_str").length>0){
                attr_str = $.trim($("#attr_str").val());
            }
            if($("#length_attribute_length").length>0){
                length = $.trim($("#length_attribute_length").val());
            }
        }
        //定制产品带属性的价格
        var product_price = "";
        if($("input[name='product_price']").length >0){
            product_price = $("input[name='product_price']").val();
        }
    }
    $.ajax({
        //url:"ajax_choose_country.php?request_type=match_languages",
        url:"ajax_choose_country.php?request_type=get_redirect_url",
        type:"POST",
        data:{country:country_code,post_code:post_code,type:type,pid:pid,products_price:product_price,purchase_qty:purchase_qty,shipping_methods:shipping_methods,weight:weight,attr_str:attr_str,length:length,product_price:product_price,state:state,address_book_id:address_book_id},
        dataType:"json",
        beforeSend: function(){
            $(obj).prop("disabled",true);
            $(obj).addClass("loading_barry").find("span").hide().end().find(".loading_box").show();
        },
        success:function(data){
            $(obj).prop("disabled",false);
            $('html').removeClass('overflow_html');
            if(data.status =="error"){
                if(type == 1){
                    layer.msg(data.data);
                    $(obj).removeClass("loading_barry").find("span").show().end().find(".loading_box").hide();
                    return;
                }else if(type==2){
                    if(data.status == "error"){
                        $(obj).closest(".post_code_common").find(".post_error").show().html(data.data);
                        return;
                    }else{
                        $(obj).closest(".post_code_common").find(".post_error").hide();
                    }
                }
                $(obj).removeClass("loading_barry").find("span").show().end().find(".loading_box").hide();
            }
            if(data.is_current){
                $(obj).removeClass("loading_barry").find("span").show().end().find(".loading_box").hide();
                $("#dl_country_post").replaceWith(data.ip_info);
                $(".shipping_text").eq(0).html(data.shipping_info);
                $("#pro_postcode_system_alert").hide();
                $(".login_loading_bg").hide();
                $('html,body').css({'overflow':'auto','height':'auto'});
                if(data.settingDay && $("#ship_day").length>0){
                    $("#ship_day").val(data.settingDay);
                }
                if(data.add_to_cart_shipping && $("#city_and_post").length>0){
                    $("#city_and_post").val(data.add_to_cart_shipping);
                }
            }else{
                window.location.href =  data.data;
            }
        }

    })
}

/**
 * 显示跳站提示语
 * @param website
 */
$(function () {
    $("#new_pro_QV,.post_code_common").delegate(".ce_form_searchCountry li","click",function(ev){
        var tag = parseInt($(this).find("a").attr("tag"));
        var website = $(this).find("a").data("website");
        var country_code = $(this).find(".aclass").find("em").attr("class");
        $("#redirect_country_code").val(country_code);
        $("#confirm_postCode").val("");
        if($.inArray(tag,[223,81,13,222])!=-1){
            $(".post_code_common .postBox").show();
        }else{
            $(".post_code_common .postBox").hide();
        }
    });

    $('#new_pro_QV').delegate('.pro_item_more','click',function(ev){
        console.log('a')
        var _this = $(this);
        var _parent = _this.parents('.detail_transceiver_type');
        var a_ele = _this.find('a');
        var html_str = a_ele.attr('data-more');
        if(_this.hasClass('show')){
            for(var i=0;i<$('.pro_item_special').length;i++){
                if(i>=10){
                    $('.pro_item_special').eq(i).hide();
                }
            }
            _this.removeClass('show');
            a_ele.html(html_str+' +');
            _parent.find('.pro_item_special_current').show(); //如果的那前选中的在隐藏中间
        }else{
            $('.pro_item_special').show()
            _this.addClass('show');
            if (html_str === 'Plus'){
                a_ele.html('Moins-');//主要针对法语,法语显示的是Plus
            } else {
                a_ele.html(html_str+' -');
            }
            _parent.find('.pro_item_special_current').hide();
        }
    })
})


//产品列表和产品详情公用结束


// 加减输入框样式
$(function(){
    $('.product_03_24 input.p_07').focus(function() {
        $(this).addClass('focus').siblings('.pro_mun').addClass('focus')
    });
    $('.product_03_24 input.p_07').blur(function() {
        $(this).removeClass('focus').siblings('.pro_mun').removeClass('focus')
    });
    $('.cart_basket_btn .shopping_cart_01').focus(function() {
        $(this).addClass('focus').siblings('.pro_mun').addClass('focus')
    });
    $('.cart_basket_btn .shopping_cart_01').blur(function() {
        $(this).removeClass('focus').siblings('.pro_mun').removeClass('focus')
    });


})
// 加减输入框样式结束

// composite son products show or hide start
function _theSlide(that){
    var _thisPa = that.siblings();
    if(_thisPa.hasClass('choosez')){
        that.addClass('choosez');
        _thisPa.slideUp(300).removeClass('choosez');
    }else{
        _thisPa.slideDown(300).addClass('choosez');
        that.removeClass('choosez');
    }
}
// end

//订阅js
$(function(){
    var posting_subscribe = false;
    $('#subscription_footer_input').bind('keypress',function(event){
        if(event.keyCode == 13){
            if(!posting_subscribe){
                posting_subscribe = true;
            }else{
                return false;
            }
            var subscription_email = $("#subscription_footer_input").val();
            $.ajax({
                url:"ajax_process_other_requests.php?request_type=subscription",
                type:"POST",
                data:{email:subscription_email},
                dataType:"json",
                beforeSend: function(){

                },
                success:function(data){
                    $('.loader_order').hide();
                    $('#subscription_footer_submit').removeClass('footer_arrow_right_loading');
                    $('#subscription_footer_submit').html('&#xf089;');
                    if(data.status == 'success'){
                        $('.email_subscription_error_prompt').removeClass('error_prompt');
                        $('.email_subscription_error_prompt').html(data.msg).show();

                        setTimeout(function(){
                            $('.email_subscription_error_prompt').hide();
                            $('.email_subscription_error_prompt').addClass('error_prompt');
                            $('#subscription_footer_input').val('');
                        }, 3000);
                    }

                    if(data.status == 'fail'){
                        $('.email_subscription_error_prompt').html(data.msg).show();
                    }
                    posting_subscribe = false;
                },
                error:function () {
                    posting_subscribe = false;
                }
            })
        }
    });

    $(document).on('click','#subscription_footer_submit',function(){
        var subscription_email = $("#subscription_footer_input").val();
        // ajax提交前判断邮箱是否填写正确
        var sign = $('#subscription_footer_submit').text()
        var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        if (subscription_email == '') {
            $('.email_subscription_error_prompt').html(email_present).show();
            return false;
        }
        if(!reg.test(subscription_email)){
            $('.email_subscription_error_prompt').html(email_text).show();
            return false;
        }
        if(!posting_subscribe){
            posting_subscribe = true;
        }else{
            return false;
        }
        $.ajax({
            url:"ajax_process_other_requests.php?request_type=subscription",
            type:"POST",
            data:{email:subscription_email},
            dataType:"json",
            cache:false,
            beforeSend: function(){
                $('.footer_arrow_right').addClass('footer_arrow_right_hover');
                $('#subscription_footer_submit').addClass('footer_arrow_right_loading');
                $('#subscription_footer_submit').html('<div id="loader_order_alone" class="loader_order"><svg class="circular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10"><></svg></div>');
                //$('#subscription_footer_submit').append('<div id="loader_order_alone" class="loader_order"><svg class="circular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10"><></svg></div>');
            },
            success:function(data){
                $('.loader_order').hide();
                $('#subscription_footer_submit').removeClass('footer_arrow_right_loading');
                $('#subscription_footer_submit').html(sign);
                if(data.status == 'success'){
                    $('.email_subscription_error_prompt').removeClass('error_prompt');
                    $('.email_subscription_error_prompt').html(data.msg).show();

                    setTimeout(function(){
                        $('.email_subscription_error_prompt').hide();
                        $('.email_subscription_error_prompt').addClass('error_prompt');
                        $('#subscription_footer_input').val('');
                    }, 3000);
                    $('.footer_arrow_right').removeClass('footer_arrow_right_hover');
                    $('.footer_arrow_right').addClass('footer_arrow_right');
                }

                if(data.status == 'fail'){
                    $('.email_subscription_error_prompt').html(data.msg).show();
                }
                posting_subscribe = false;
            },
            error:function () {
                $('#subscription_footer_submit').removeClass('footer_arrow_right_loading');
                $('#subscription_footer_submit').html(sign);
                posting_subscribe = false;
            }
        })
    });

    $('#subscription_footer_input').bind('keyup',function(){
        var subscription_email = $("#subscription_footer_input").val();
        var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        if(!reg.test(subscription_email)){
            //$('.footer_arrow_right').removeClass('subscribe_success');
        }else{
            //$('.footer_arrow_right').addClass('subscribe_success');
            $('.email_subscription_error_prompt').hide();
        }
    }).bind('focus',function(){
        $('#subscription_footer_input').addClass('footer_subscribe_inp_focus');
    }).bind('blur',function(){
        $('#subscription_footer_input').removeClass('footer_subscribe_inp_focus');
    });
})


/**
 * add by rebirth  2019.07.19
 *
 * 解决登录的用户session被回收的问题
 *
 * 取消 session 保持机制  2020.03.26   rebirth
 */
// $(function(){
    // if (getClient() == "pc"){
    //     let _is_login = localStorage.getItem("fs_is_login");
    //     let cookie_is_login = '',arr, reg = new RegExp("(^| )" + "fs_is_login" + "=([^;]*)(;|$)");
    //     if (arr = document.cookie.match(reg)){
    //         cookie_is_login =  unescape(arr[2]);
    //     }
    //     if (_is_login && cookie_is_login){
    //         setInterval(function () {
    //             let _can_send_time = parseInt(localStorage.getItem("fs_session_select_send_time")),
    //                 _now_time = parseInt((Date.parse(new Date()))/1000);
    //             // console.log(333,_can_send_time,((_now_time >= _can_send_time) && ((_now_time - 60) < _can_send_time)));
    //             //获悉线上的session正常失效时间为半个小时
    //             if (((_now_time >= _can_send_time) && ((_now_time - 1740) < _can_send_time)) || !_can_send_time){
    //                 $.ajax({
    //                     url: "index.php?modules=ajax&handler=check_session_timeout&ajax_request_action=check_session_timeout",
    //                     type: "post",
    //                     dataType: "json",
    //                     success: function (res) {
    //                         if (res.code == 1 && res.data.is_timeout == 1){
    //                             setTimeout(function () {
    //                                 location.href = res.data.login_url;
    //                             },3000)
    //                         }else{
    //                             localStorage.setItem("fs_session_select_send_time",_now_time + 55);
    //                         }
    //                     }
    //                 });
    //             }
    //         },60 * 1000);
    //     }
    // }

    // function getClient() {
    //     var ua = navigator.userAgent,
    //         isWindowsPhone = /(?:Windows Phone)/.test(ua),
    //         isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
    //         isAndroid = /(?:Android)/.test(ua),
    //         isFireFox = /(?:Firefox)/.test(ua),
    //         isChrome = /(?:Chrome|CriOS)/.test(ua),
    //         isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
    //         isPhone = /(?:iPhone)/.test(ua) && !isTablet,
    //         isPc = !isPhone && !isAndroid && !isSymbian;
    //     if (isAndroid || isPhone) {
    //         wap_tap = "phone";
    //     } else {
    //         wap_tap = "pc";
    //     }
    //     return wap_tap;
    // }
// });

$(function(){
	$(document).on('focus','.product_03_24 .p_07',function(){
		$(this).addClass('focus').siblings().addClass('focus')
	})
	$(document).on('blur','.product_03_24 .p_07',function(){
		$(this).removeClass('focus').siblings().removeClass('focus')
	})
})

$(function(){

    //	侧边栏展开js
    $('.account-left-head-dl dt').click(function() {
        if($('.account-left-head-dl').hasClass('active')) {
            $('.account-left-head-dl').removeClass('active');
            $('.account-left-head-dl dd').slideUp();
        } else {
            $('.account-left-head-dl').addClass('active');
            $('.account-left-head-dl dd').slideDown();
        }
    })

    /*右边内容收起展开js*/
    $('.account-Recent-orders-p').click(function() {
        if($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).closest('.account-recent-dl').find('dd').slideUp();
        } else {
            $(this).addClass('active');
            $(this).closest('.account-recent-dl').find('dd').slideDown();
        }
    })

    //	M导航展开js
    $('.m-account-quote-dt').click(function(){
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            $(this).closest('.m-account-products-dl-container').find('.m-account-products-dl-dd').slideUp();
        }else{
            $(this).addClass('active');
            $(this).closest('.m-account-products-dl-container').find('.m-account-products-dl-dd').slideDown();
        }
    })
    $('.m-nav-tit').click(function(){
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            $(this).closest('.m-account-Navigation-dl').find('.m-account-Navigation-dl-dd').slideUp();
        }else{
            $(this).addClass('active');
            $(this).closest('.m-account-Navigation-dl').find('.m-account-Navigation-dl-dd').slideDown();
        }
    })
    $('.m-account-Navigation-need-dl dt').click(function(){
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            $(this).closest('.m-account-Navigation-need-dl').find('dd').slideUp();
        }else{
            $(this).addClass('active');
            $(this).closest('.m-account-Navigation-need-dl').find('dd').slideDown();
        }
    })
})

// $(function(){
var __dcid = __dcid || [];__dcid.push(["DigiCertClickID_vyT8OdM_", "15", "m", "black", "vyT8OdM_"]);(function(){var cid=document.createElement("script");cid.async=true;cid.src="//seal.digicert.com/seals/cascade/seal.min.js";var s = document.getElementsByTagName("script");var ls = s[(s.length - 1)];ls.parentNode.insertBefore(cid, ls.nextSibling);}());
// })


/**清仓产品加购限制
 * Dylan 2019.8.23 Add
 * @param qty  客户填写数量
 * @param type	1.客户点击加减按钮 2.客户填写数量
 */
function clearance_add_to_cart_restriction(id,qty,type,cle_qty) {

    var replace_products_id = $(id).attr('data-replace-products-id');
    var replace_products_tip = $(id).attr('data-replace-products-tip');
    if (!replace_products_tip) {
        replace_products_tip = 0;
    } else {
        //to make true replace_products_tip
        if (parseInt(cle_qty) <= 0) {
            if (replace_products_id) {
                replace_products_tip = 2;
            } else {
                replace_products_tip = 4;
            }
        } else {
            if (replace_products_id) {
                replace_products_tip = 1;
            } else {
                replace_products_tip = 3;
            }
        }
    }
    var products_id = $(id).prev().attr("value");



    if(qty>=parseInt(cle_qty)){
        $(id).next('.pro_mun').find('.cart_qty_add').addClass('choosez');
        if(cle_qty>0){
            if(qty>parseInt(cle_qty)){
                $(id).val(cle_qty);
            }
            // if($('#newDetail-purchasing-limit').find('.clearance_total_qty').length==1){
            //     $('#newDetail-purchasing-limit').find('.clearance_total_qty').html(cle_qty);
            // }


            //liang.zhu 2020.08.04
            if (replace_products_tip) {
                //简单的展示提示语，后台怎么填写，前台就怎么展示
                var text = $('#newDetail-purchasing-limit').find('.clearance_tip_'+products_id+'_'+replace_products_tip).html();
                text = text.replace('$QTY', cle_qty);
                text = text.replace(/\$PRODUCTS_ID/g, replace_products_id);
                $('#newDetail-purchasing-limit').find('.clearance_tip_'+products_id+'_'+replace_products_tip).html(text);
                $('#newDetail-purchasing-limit').find('.clearance_tip_'+products_id+'_'+replace_products_tip).css('display', 'block').siblings().css('display', 'none');
            } else {
                $('#newDetail-purchasing-limit').find('.clearance_tip_'+products_id+'_'+replace_products_tip).css('display', 'block').siblings().css('display', 'none');

                if($('#newDetail-purchasing-limit').find('.clearance_total_qty').length==1){
                    $('#newDetail-purchasing-limit').find('.clearance_total_qty').html(cle_qty);
                }
            }

        }else{
            $(id).val(1);
        }
        if(type==2){
            if(qty>parseInt(cle_qty)){
                var id_name = $(id).attr('id');
                if($('#product_cart_popup .new_product_popup_addCart').css('display')!='none'){
                    $(id).parents('.addCrat_item_listTa').find('.public_Prompt').show(); //加购弹窗超购提示语
                }
                if($('#newDetail-purchasing-limit').length==1 && ($.inArray(id_name,['move_cart_quantity','cart_quantity'])!=-1 || id_name.indexOf('quantity_')!=-1)){
                    $("#newDetail-purchasing-limit").show();//详情页超购提示语
                }
                if(id_name.indexOf('qv_quantity_')!=-1){
                    $(".custom_product_tips_fa").show();//qv弹窗超购提示语
                }
            }
        }
    }else{
        $(id).next('.pro_mun').find('.cart_qty_add').removeClass('choosez');
        if(type==2){
            $("#newDetail-purchasing-limit").hide();//详情页超购提示语隐藏
            $(".custom_product_tips_fa").hide();//qv弹窗超购提示语隐藏
        }
        $(id).parents('.addCrat_item_listTa').find('.public_Prompt').hide(); //加购弹窗超购提示语
    }
}


$(function(){
    $('.box').on('click', '.spirit_bs_mobile', function(){
        var tag_html = $(this).find('.mobile_tag_html').html();
        tag_html = '<div class="bubble_popup_conatainer bubble_popup_only"><div class="bubble_popup_bg"></div>' + tag_html + '</div>';
        $('body>.box>.content').append(tag_html);
        $('.new_m_bg_wap.mobile_tag_html,.new_m_bg1').hide();
    });
    $('body').on('click', '.bubble_popup_close_a_mobile_tag', function(){
        $(this).parents('.bubble_popup_conatainer').remove();
		$('.spirit_bs').removeClass('active');
    })
    $('body').on('click', '.bubble_popup_conatainer', function(){
        $(this).find('.bubble_popup_close_a_mobile_tag').trigger('click');
    });
    $(document).on('click','body',function(e) {
        if($(window).width()<960){
            var target = $(e.target);
            if(!target.is('.spirit_bs') && !target.is('.spirit_bs .show') && !target.is('.spirit_bg') && !target.is('.spirit_bs .none') && !target.is('.bubble_popup_content') && !target.is('.bubble_popup_dl_container') && !target.is('.bubble_popup_close_a') && !target.is('.bubble_popup_dl') && !target.is('.bubble_popup_txt') && !target.is('.bubble_popup_price')) {
                $('.spirit_bs').removeClass('active');
                $('.bubble_popup_only').remove();
            }
        }
    });

});

/*点击空白处关闭弹窗*/
$('.public_pop_up_switch .public_pop_up_layer_background').click(function() {
	   $(this).closest('.public_pop_up_switch').hide();
});

//全站留言框
if($('.public_textarea').length > 0){
	$('.public_textarea').each(function(){
		var maxlength = $(this).attr('maxlength');
		$(this).closest('.public_textarea_container').find('.public_count em').html(maxlength);
	})	
	
	$(".public_textarea").on("input propertychange",function(){
		var this_maxlength = $(this).attr('maxlength');
		var length = $(this).val().length;
		if(length >= this_maxlength){
			$(this).closest('.public_textarea_container').find('.public_count i').html(length).addClass('choose');
			return;
		}else{
			$(this).closest('.public_textarea_container').find('.public_count i').html(length).removeClass('choose');
		}
	})
}

//头部下拉版块JS
var timer;
$('.home_solution_left_ul li').hover(function() {
    var index = $(this).index();
    var _this = $(this);
    timer = setTimeout(function(){
        _this.addClass('active').siblings('li').removeClass('active');
        _this.closest('.home_solution_container').find('.home_solution_right_ul li').eq(index).addClass('active').siblings('li').removeClass('active');
        var solution_height = _this.closest('.home_solution_container').find('.home_solution_right').outerHeight();
        if(solution_height < 375) {
            solution_height = 375;
            $('.header_main_list_more_all').height(solution_height);
        } else {
            $('.header_main_list_more_all').height(solution_height);
        }   
    },50)
},function(){
    clearTimeout(timer);
});
$('.home_solution_close').click(function(){
    $('.header_main_list_more_all').height(0);
    //$('.header_main_list_more').removeClass('show');
    $('.home_drop_down_carrier').css('display','none');
})

for(var i=0;i<=4;i++){
    home_index_nav_hover('.header_main_index_' + i,'.header_main_list_more.nav' + i);
}
function home_index_nav_hover(a,b){
    $(a).hover(function() {
        $(b).addClass('show').siblings('.header_main_list_more').removeClass('show');
        $('.header_main_list_more_all').height($(b).find('.home_solution_container').outerHeight());
    })
}
$(function () {
    if($('.home_solution_container').find($('.home_company_telephone_number')).length >0){
        $('.home_solution_container').find($('.home_company_telephone_number')).text(common_phone);
    }
})
//头部下拉版块JS结束

//cookie
if($('.m_2017footer').length>0 && $('.cookie_a_container').length>0){
    var height = $('.cookie_a_container').outerHeight();
    $('.m_2017footer').css('margin-bottom',height + 'px')
}

/*头部产品列表最大高度*/
// if($('.home_solution_right_ul').legnth>0){
//     var home_maxheight = $(window).height() - $('.home_solution_right_ul').offset().top - 100 +'px';
//     if($('#agree_cookie_div').length > 0){
//         home_maxheight - $('#agree_cookie_div').height()
//     }
//     $('.home_solution_right_ul').css('max-height',home_maxheight);    
// }

