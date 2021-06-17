// add、edit address START
var ajax_modify_address_num = 0;
var ajax_submit_address_num = 0;
function add_edit_address(_this,shipping_type,address_book_id) {
    var _this = $(_this);
    var _parent = _this.parents('.manage_li');
    address_book_id = typeof address_book_id == 'undefined'?'':address_book_id;
    $('.manage_li').removeAttr('style');
    if(address_book_id){ //编辑
        if(ajax_modify_address_num == 0){
            $.ajax({
                url:'index.php?main_page=manage_addresses&action=select_address',
                data:'address_id='+address_book_id+'&shipping_type='+shipping_type,
                type:'POST',
                dataType:'json',
                beforeSend:function(){
                    ajax_modify_address_num++;
                },
                error: function () {
                    show_server_tip_window({
                        type: 'error',
                        content: system_busy_tip,
                    });
                    ajax_modify_address_num = 0;
                },
                success:function(response){
                    if(response.status=='1'){
                        ajax_modify_address_num = 0;
                        add_edit_form_submit(_this,response.data,shipping_type,address_book_id);
						if($(window).width() > 480){
							var height_li = _this.closest('.manage_li').find('.manage_bottom_wap').height() + _this.closest('.manage_li').find('.manage_top_wap').outerHeight() + 37 +'px';
							_this.closest('.manage_li').css('height',height_li)	
						}
                    }else{
                        show_server_tip_window({
                            type: 'error',
                            content: response.info,
                        });
                        ajax_modify_address_num = 0;
                    }
                }
            });
        }
    }else{
        if(_parent.find('#updateAddressForm').length>0){ // if is add, has clicked once
            return false;
        }
        add_edit_form_submit(_this,'',shipping_type,address_book_id);
    }

}
function hide_add_edit_address(_this) {
    _this.closest('.manage_li').removeAttr('style');
    $('.add_edit_block').html('');
    $('.manage_li').removeClass('manage-state').removeClass('active1');
    $('.manage_bottom').css('visibility','inherit');
}

function get_add_edit_form_html(address,shipping_type) {
    var shipping_type = address?address['address_type']:shipping_type;
    if(address){ //编辑
        var address_id = address['address_book_id'];
        if(shipping_type == 2){ //运输地址
            var title = edit_billing_title;
            var tip = '';
        }else{
            var title = edit_shipping_title;
            var tip = '<p class="checkout_Npro_theContxt1 checkout_Npro_mt10">'+px_tip+'</p>';
        }
    }else{ //添加
        var address_id = '';
        if(shipping_type == 2){
            var tip = '';
            var title = add_billing_title;
        }else{
            var title = add_shipping_title;
            var tip = '<p class="checkout_Npro_theContxt1 checkout_Npro_mt10">'+px_tip+'</p>';
        }
    }

    var address_html = '<div class="manage_Angle"></div>'+
        '<div class="manage_bottom_wap">'+
        '<hr class="manage_hr" />'+
        '<div class="manage_Modify">'+
        '<div class="checkout_Npro_theContit1 default_myAddress"><span class="checkout_Npro_theContxt addAddress_txt">'+title+'</span></div>'+
        '<div class="checkout_Npro_pad3 checkout_Npro_hideDev showPad">'+
        '<form id="updateAddressForm" onsubmit="return false;">'+
        '<div>'+
        '<ul class="checkout_Npro_echeckList">'+

        '<li class="checkout_Npro_echeckListLi firstLi_z">'+
        '<p class="checkout_Npro_theContxt3">'+first_name_item+'*</p>'+
        '<input type="text" id="upadd_entry_firstname" name="entry_firstname"  value="'+(address_id?address['entry_firstname']:'')+'" class="checkout_Npro_Input"/>'+
        '<div class="error_prompt"></div>'+
        '</li>'+

        '<li class="checkout_Npro_echeckListLi firstLi_z">'+
        '<p class="checkout_Npro_theContxt3">'+last_name_item+'*</p>'+
        '<input type="text" class="checkout_Npro_Input" id="upadd_entry_lastname" name="entry_lastname" value="'+(address_id?address['entry_lastname']:'')+'" />'+
        '<div class="error_prompt"></div>'+
        '</li>'+

        '<li class="checkout_Npro_echeckListLi">'+
        '<p class="checkout_Npro_theContxt3">'+country_item+'*</p>'+
        country_select_str+
        '<div class="error_prompt"></div>'+
        '</li>'+

        '<li class="checkout_Npro_echeckListLi">'+
        '<p class="checkout_Npro_theContxt3">'+address_type_item+'*</p>'+
        '<select name="company_type" id="upadd_company_type" onChange="check_tax_block(1)"  class="checkout_Npro_select">' +
        '<option value="">'+address_type_select_val+'</option>'+
        '<option value="BusinessType">'+address_type_business_val+'</option>'+
        '<option value="IndividualType">'+address_type_individual_val+'</option>'+
        '</select>'+
        '<div class="error_prompt"></div>'+
        '</li>'+

        '<li class="checkout_Npro_echeckListLi helun_fairy">'+
        '<p class="checkout_Npro_theContxt3" id="company_name_title" data="'+company_item+'">'+company_item+'</p>'+
        '<input name="entry_company" id="upadd_entry_company" type="text" value="'+(address_id?address['entry_company']:'')+'" class="checkout_Npro_Input" />'+
        '<div class="error_prompt"></div>'+
        '</li>'+

        '<li class="checkout_Npro_echeckListLi" style="display:none" id="tax_number_block">'+
        '<p class="checkout_Npro_theContxt3 checkout-Npro-ContxtBox" id="tax_number_block_title">'+vat_number_item+'</p>'+
        '<input type="text" class="checkout_Npro_Input" id="upadd_entry_tax_number" name="entry_tax_number"  value="'+(address_id?address['entry_tax_number']:'')+'" />'+
        '<div class="error_prompt"></div>'+
        '</li>'+
        '</ul>'+

        '<div class="checkout_Npro_btnBox">'+
        '<div class="checkout_Npro_line"></div>'+
        '<ul class="checkout_Npro_echeckList" id="pro_canInsertEmail">'+
        '<li class="checkout_Npro_echeckListLi">'+
        '<p class="checkout_Npro_theContxt3">'+street_item+'*</p>'+
        '<input type="text" class="checkout_Npro_Input" id="upadd_entry_street_address" name="entry_street_address" placeholder="'+address_place_hodler+'" value="'+(address_id?address['entry_street_address']:'')+'"/>'+
        '<div class="error_prompt"></div>'+
        '</li>'+

        '<li class="checkout_Npro_echeckListLi">'+
        '<p class="checkout_Npro_theContxt3">'+street2_item+'</p>'+
        '<input type="text" class="checkout_Npro_Input" id="upadd_entry_suburb" name="entry_suburb" placeholder="'+address_place_hodler2+'" value="'+(address_id?address['entry_suburb']:'')+'" />'+
        '<div class="error_prompt"></div>'+
        '</li>'+

        '<li class="checkout_Npro_echeckListLi">'+
        '<p class="checkout_Npro_theContxt3" id="city_title">'+city_item+'*</p>'+
        '<input type="text" class="checkout_Npro_Input" id="upadd_entry_city" name="entry_city"  value="'+(address_id?address['entry_city']:'')+'" />'+
        '<div class="error_prompt"></div>'+
        '</li>'+
        '<li class="checkout_Npro_echeckListLi" id="upadd_entry_state_block">'+
        '<p class="checkout_Npro_theContxt3" id="state_title">'+state_item+'*</p>'+
        '<select class="checkout_Npro_select" name="entry_state" id="upadd_entry_state"></select>'+
        '<div class="error_prompt"></div>'+
        '</li>'+

        '<li class="checkout_Npro_echeckListLi">'+
        '<p class="checkout_Npro_theContxt3" id="postal_item_title">'+postal_item+'*</p>'+
        '<input type="text" class="checkout_Npro_Input" id="upadd_entry_postcode" name="entry_postcode" oninput="BelongCodeAutoMatchCity()" value="'+(address_id?address['entry_postcode']:'')+'" />'+
        '<div class="error_prompt"></div>'+
        '</li>'+

        '<li class="checkout_Npro_echeckListLi enter_tel_Box">'+
        '<p class="checkout_Npro_theContxt3">'+phone_item+'*</p>'+
        '<b class="checkout_Npro_areaCode checkout_Npro_areaCode_shipping" id="update_tel_prefix_phone">'+(address_id?address['tel_prefix']:'')+'</b>'+
        '<input type="text" class="checkout_Npro_Input enter_telephone" id="upadd_entry_telephone" name="entry_telephone" value="'+(address_id?address['entry_telephone']:'')+'" />'+
        '<div  class="error_prompt"></div>'+
        '</li>'+
        '</ul>'+
        '</div>'+ tip +
        '</div>'+

        '<div class="acc_alone_options_generation acc_flo_left">'+
        '<input type="hidden" name="address_book_id" id="upadd_address_book_id" value="'+(address_id?address_id:'')+'">'+
        '<input type="hidden" name="tag" id="upadd_tag" value="'+shipping_type+'">'+
        '<a href="javascript:;" class="new_alone_button alone_his new_alone_border_gray alone_a_min_width" onclick="hide_add_edit_address($(this));">'+cancel_btn+'</a>'+
        '<a href="javascript:;" class="new_alone_button alone_none_border alone_his alone_a_min_width m_float_right1" id="upadd_submit_button">'+save_btn+'</a>'+
        '</div>'+
        '</form>'+
        '</div>'+
        '</div>'+
        '</div>';

    return address_html;
}

function add_edit_form_submit(_this,address,shipping_type,address_book_id) {
    var _parent = _this.parents('.manage_li');
    //把其他的编辑窗口清除
    hide_add_edit_address(_this);
    //当前编辑框赋值
    var html = get_add_edit_form_html(address,shipping_type);
    _parent.addClass('manage-state active1');
    _parent.find('.add_edit_block').html(html);
    _parent.find('.manage_bottom').css('visibility','hidden');

    if(address_book_id){ //edit
        $('#upadd_company_type').val(address.company_type);
        var entry_country_id = address.entry_country_id;
        //country
        $('#'+country_input_name).val(address.entry_country_id);
        $('#'+country_input_name).parents('.ce_form_choose_country').find('em[data-class=country_code]').attr('class',address.country_code);
        $('#'+country_input_name).parent('.ce_form_choose_country').find('p.country_name').html(address.entry_country_name);
    }else{ //add
        var entry_country_id = $('#'+country_input_name).val();
    }
    //telephone prefix
    $('#update_tel_prefix_phone').text(country_to_telephone[entry_country_id]); // 国家电话号码的前缀
    // 2019-8-1 澳大利亚的地址栏标题City改成Suburb;State/Province/Region直接改成State;Zip Code改成Postcode
    if (entry_country_id == 13) {
        $('#postal_item_title').text(postal_item_au_new);
        $('#state_title').text(state_item_au_new);
        $('#city_title').text(city_item_au_new);
    }
    //验证
    if(shipping_type=='2'){
        address_no_pobx_valide['errorPlacement'] = validateShowError;
        $('#updateAddressForm').validate(address_no_pobx_valide);
    }else{
        address_valide['errorPlacement'] = validateShowError;
        $('#updateAddressForm').validate(address_valide);
    }
    // state show or hide, assignment val
    if(address_book_id){
        check_state_block(address.entry_state);
        check_tax_block_book(1);
    }else{
        check_state_block();
    }
    // tax
    if(address_book_id && $("#tax_number_block").is(":visible")){
        $('#upadd_entry_tax_number').val(address.entry_tax_number);
    }

    var timer = setTimeout(function(){
       
			var thisheight = _this.offset().top - ($('.manage_top_wap').height() / 2);
			$('html , body').animate({scrollTop: thisheight},'slow');
			clearTimeout(timer);		
		
    },200)


    $(document).on('click','.ce_form_countryList li',function(ev){
        check_state_block();
        check_tax_block_book(1);
    })
    $(document).on('click','#upadd_submit_button',function () {
        // 2019-7-19 potato 地址栏错误提示修改
        var entry_country_id = $('#'+country_input_name).val();
        if (entry_country_id == 13) {
            $('#upadd_entry_city').rules("add", {
                required: true,
                messages: {
                    required: city_title_error,
                }
            });
            $('#upadd_entry_postcode').rules("add", {
                required: true,
                messages: {
                    required: post_code_title_error,
                }
            });
        } else {
            $('#upadd_entry_city').rules("add", {
                required: true,
                messages: {
                    required: city_title_original,
                }
            });
            $('#upadd_entry_postcode').rules("add", {
                required: true,
                messages: {
                    required: post_code_title_original,
                }
            });
        }
        var $this = $(this);
        if(ajax_submit_address_num == 0){
            
			
			if($(window).width() > 480){
				setTimeout(function(){
                    var height_li = $this.closest('.manage_li').find('.manage_bottom_wap').height() + $this.closest('.manage_li').find('.manage_top_wap').outerHeight() + 37 +'px';
                    console.log(height_li)
                    $this.closest('.manage_li').css('height',height_li) 
                },10)	
			}
			
			
			
            if($('#updateAddressForm').valid()){
                var dataAll = $("#updateAddressForm").serialize();
                dataAll = dataAll.replace(/'/g,"‘");
                if($('#upadd_entry_state').is(':visible')){
                    dataAll['entry_state_visible'] = true;
                }else{
                    dataAll['entry_state_visible'] = false;
                }
                if($('#upadd_entry_tax_number').is(':visible')){
                    dataAll['entry_tax_number_visible'] = true;
                }else{
                    dataAll['entry_tax_number_visible'] = false;
                }
                var submit_this = $(this);
                var upadd_address_book_id = $('#upadd_address_book_id').val();
                $.ajax({
                    url:"index.php?main_page=manage_addresses&action=update_address",
                    type:"POST",
                    data:dataAll,
                    dataType:"json",
                    beforeSend:function(){
                        ajax_submit_address_num++;
                        show_loading(submit_this,'show');
                    },
                    error: function () {
                        ajax_submit_address_num=0;
                        show_loading(submit_this,'hide');
                        show_server_tip_window({
                            type: 'error',
                            content: system_busy_tip,
                        });
                    },
                    success:function(response){
                        show_loading(submit_this,'hide');
                        if(typeof response.href != "undefined"){
                            response.href = revise_ajax_return_link(response.href);
                        }
                        if(response.status == '1'){
							$('.manage_li').removeAttr('style');
                            ajax_submit_address_num=0;
                            hide_add_edit_address(_this); //弹窗消失
                            var html = response.data.html;
                            if(upadd_address_book_id!=''){
                                $("#new17address_"+upadd_address_book_id).html(html);
                            }else{ // add
                                if(response.data.data.address_type!=2){
                                    $("#addShippingAddress").before(html);
                                }else{
                                    $("#addBillingAddress").before(html);
                                }
                            }
                        }else if(response.status == '-1'){
                            location.href = response.href;
                        }else if (response.status == '-3') { //服务器端验证错误
                            ajax_submit_address_num=0;
                            $('#upadd_entry_postcode').siblings(".error_prompt").show().html(response.info);
                        }else{
                            ajax_submit_address_num=0;
                            show_server_tip_window({
                                type: 'error',
                                content: response.info,
                            });
                        }
                    }
                });
            }
        }
    })
}
// add、edit address END

// delete the address START
var ajax_del_address_num = 0;
function click_open_del_window(address_book_id) {
    $('#del_window').show();
    $('#del_submit').attr('data-id',address_book_id);
}
function hide_del_window(address_book_id) {
    $('#del_window').hide();
    $('#del_submit').attr('data-id','');
}
var ajax_del_address_num = 0;
function del_one_address(_this) {
    var _this = $(_this);
    if(ajax_del_address_num == 0){
        var address_book_id = $('#del_submit').attr('data-id');
        var securityToken = $("input[name='securityToken']").val();
        $.ajax({
            url:"index.php?main_page=manage_addresses&action=delete_address",
            type:"POST",
            data:{
                address_id:address_book_id,
                securityToken: securityToken
            },
            dataType:"json",
            beforeSend:function(){
                show_loading(_this,'show',3);
                ajax_del_address_num++;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                show_loading(_this,'hide',3);
                show_server_tip_window({
                    type: 'error',
                    content: system_busy_tip,
                });
                ajax_del_address_num = 0;
            },
            success:function(response){
                show_loading(_this,'hide',3);
                $('#del_window').hide();
                if(typeof response.href != "undefined"){
                    response.href = revise_ajax_return_link(response.href);
                }
                if(response.status=='1'){
                    $("#new17address_"+address_book_id).remove();
                    ajax_del_address_num = 0;
                }else if( response.status == '-1' ){
                    location.href = response.href;
                }else{ // add
                    show_server_tip_window({
                        type: 'error',
                        content: response.info,
                    });
                    ajax_del_address_num = 0;
                }
            }
        });
    }
}
// delete the address END

// set default START
var ajax_set_default_num = 0;
$(function () {
    //设置默认的地址
    $(document).on('click','.set_one_address',function () {
        if(ajax_set_default_num == 0){
            var _this = $(this);
            if(!_this.parents('.manage_li').hasClass('active')){
                var address_id = _this.attr('data-id');
                $.ajax({
                    url:"index.php?main_page=manage_addresses&action=set_default",
                    data:"address_id="+address_id,
                    type:"POST",
                    dataType:"json",
                    beforeSend:function(){
                        show_loading('','show');
                        ajax_set_default_num++;
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        show_loading('','hide');
                        show_server_tip_window({
                            type: 'error',
                            content: system_busy_tip,
                        });
                        ajax_set_default_num = 0;
                    },
                    success:function(response){
                        show_loading('','hide');
                        if(typeof response.href != "undefined"){
                            response.href = revise_ajax_return_link(response.href);
                        }
                        if(response.status=="1"){
                            // old
                            _this.parents('.manage_ul').find('.manage_li.active').removeClass('active');
                            // now
                             _this.parents('.manage_li').addClass('active');
                            ajax_set_default_num = 0;
                        }else if(response.status == '-1'){
                            location.href = response.href;
                        }else{
                            show_server_tip_window({
                                type: 'error',
                                content: response.info,
                            });
                            ajax_set_default_num = 0;
                        }
                    }
                });
            }
        }
    })
})
// set default END


//Non-Europe vat tips
if($(window).width()<960){
    $(document).on('click','.m_track_orders_wenhao',function(){
        $(this).find('.new_m_bg1').show();
        $(this).find('.new_m_bg_wap').show();
        $('.checkout-Npro-ContxtBox .m-track-alert').css({'z-index':10});
    });
    $(document).on('click','.new_m_icon_Close',function(e){
        var _target = $(e.target);
        if(_target.closest('.new_pro_addCart_btn').length != 0){
            $(this).parents('.new_pro_addCart_btn').find('.m-track-alert').hide();
        }else if(_target.closest('.quote_content').length != 0){
            $('.quote_content').hide();
        }else{
            _target.closest('.m_track_orders_wenhao').find('.new_m_bg1').hide();
            _target.closest('.m_track_orders_wenhao').find('.new_m_bg_wap').hide();
        }
        e.stopPropagation();
    });
}


/*    新版账户中心address_book     start*/
// $('#ship_address_create').on('click',function () {
//     $('#ads_popup').show();
// })

$(function () {
    /*下拉*/
    $('.account_alone_select_container').click(function () {
        if ($(this).hasClass('active')) {
            $('.account_alone_select_ul').hide();
            $('.account_alone_select').find('.account_alone_select_container').removeClass('active');
            $(this).removeClass('active').closest('.account_alone_select').find('.account_alone_select_ul').hide();
            $(this).closest('.account_alone_select').removeClass('show');

        } else {
            $(this).addClass('active').closest('.account_alone_select').find('.account_alone_select_ul').show();
            $(this).closest('.account_alone_select').siblings('.account_alone_select').find('.account_alone_select_container').removeClass('active');
            $(this).closest('.account_alone_select').siblings('.account_alone_select').find('.account_alone_select_ul').hide();
            $(this).closest('.account_alone_select').addClass('show');
        }
    });

    /*点击空白收起下拉框*/
    $('body').click(function (e) {
        var target = $(e.target).closest('.account_alone_select').length;
        if (target <= 0) {
            // $('#ads_popup').hide();
            $('.account_alone_select_ul').hide();
            $('.account_alone_select_container').removeClass('active');
            $(this).closest('.account_alone_select').removeClass('show');
        }
    });

    /*地址相关开始*/
    address_valide['errorPlacement'] = validateShowError;
    $('#updateAddressForm').validate(address_valide);

    // 切换国家
    $(document).on('click', '.ce_form_countryList li', function () {
        var tag = $(this).find('a').attr('tag');
        if (tag == 176) {
            $('#upadd_company_type').find('option').eq(1).html(company_type_business_ru);
            $('#upadd_company_type').find('option').eq(2).html(company_type_individual_ru);
        } else {
            $('#upadd_company_type').find('option').eq(1).html(fs_checkout_business);
            $('#upadd_company_type').find('option').eq(2).html(fs_checkout_individual);
        }
        console.log(this);
        check_state_block();
        check_tax_block_book(1);
    });

    // 切换address type
    $(document).on("change", "#upadd_company_type", function () {
        var that = $(this), val = that.val();
        $('#upadd_company_type').val(val);
        if ($('#upadd_company_type').val()) {
            $('#upadd_entry_tax_number').val('');
            $('#upadd_company_type-error').hide();
        }

        that.parent('ul').hide();
        check_tax_block_book(1);
    });

    //开启地址弹窗
    $(document).on('click', '#add_ads_ship', function () {
        var address_type = 1;
        $('#ads_popup').show();
    });

    //开启地址弹窗
    $(document).on('click', '#add_ads_bill', function () {
        var address_type = 2;
        $('#ads_popup').show();
    });

    //关闭地址弹窗
    $(document).on('click', '.ads_popup_close', function () {
        $("#updateAddressForm").validate().resetForm();
        $('#ads_popup').hide();
        $('.entry_postcode').next('.error_prompt').hide();
    });

    //地址表单提交
    $(document).on('click', '#upadds_submit_button', function () {
        var that = $(this);
        var submit_this = that;
        var country_id = parseInt($('#tagcountry').val());
        if($.inArray(parseInt(language_id),[1,9,10,13])!= -1 && $.inArray(country_id, [96,125,206])!= -1){
            $('#upadd_entry_street_address').rules("add", {
                chcharacter:true,
                messages: {
                    chcharacter: error_message.entry_street_address.chcharacter,
                }
            });
            $("#upadd_entry_suburb").rules("add", {
                chcharacter:true,
                messages: {
                    chcharacter: error_message.entry_street_address.chcharacter,
                }
            });
        }else{
            $("#upadd_entry_street_address").rules("remove", "chcharacter");
            $("#upadd_entry_suburb").rules("remove", "chcharacter");
        }
        //美国,澳大利亚,马来西亚邮编验证
        if($.inArray(country_id, [223,13,129])!= -1){
            $("#upadd_entry_postcode").rules("add", {
                number:true,
                messages: {
                    number: error_message.entry_postcode.number_error,
                }
            });
        }

        if ($('#updateAddressForm').valid()) {
            var dataAll = $("#updateAddressForm").serialize();
            var data = dataAll.replace(/'/g, "‘");
            $.ajax({
                url: '?modules=ajax&handler=ajax_address_book&ajax_request_action=create_update_new_address',
                data: data,
                type: "POST",
                dataType: "json",
                beforeSend:function(){
                    ajax_submit_address_num++;
                    // $('.login_loading_bg').show();
                    show_loading(submit_this,'show',4);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    show_loading(that,'hide',4);
                    show_new_server_tip_window({
                        type: 'error',
                        content: system_busy_tip,
                    });
                    ajax_del_address_num = 0;
                },
                success: function (response) {
                    if (response.status == 200) { // 新增地址返回
                        var html = response.data.html;
                        var class_name = '';
                        var class_names = '';
                        if (response.data.address_type !== '2') {
                            class_name = 'shipping-dom';
                            if (adds_shipping) {
                                // adds_shipping.push(response.data);
                                // adds_shipping[adds_shipping.length] = response.data;
                                if (response.data.is_default) {
                                    if (!$.isEmptyObject(adds_shipping)) {
                                        var adds_shipping_new = {}
                                        for (var i=0; i < Object.keys(adds_shipping).length; i++) {
                                            adds_shipping_new[0] = response.data;
                                            adds_shipping_new[i+1] = adds_shipping[Object.keys(adds_shipping)[i]];
                                        }
                                        adds_shipping= adds_shipping_new;
                                    } else {
                                        adds_shipping[0] = response.data;
                                    }
                                    $('.address-book-shipping').after(html);
                                } else {
                                    class_names = 'address-book-shipping_' + adds_shipping[Object.keys(adds_shipping)[0]].address_book_id;
                                    var adds_shipping_new = {}
                                    for (var i=0; i < Object.keys(adds_shipping).length; i++) {
                                        if (i>0) {
                                            adds_shipping_new[i+1] = adds_shipping[Object.keys(adds_shipping)[i]];
                                        }else {
                                            adds_shipping_new[i] = adds_shipping[Object.keys(adds_shipping)[i]];
                                        }
                                        adds_shipping_new[1] = response.data;
                                    }
                                    adds_shipping= adds_shipping_new;
                                    $('.' + class_names).after(html);
                                }
                            } else {
                                adds_shipping = {};
                                adds_shipping[0] = response.data;
                                $('#address-book-shipping').after(html);
                                // adds_shipping[0] = response.data;
                            }
                            $('#shipping-dom').show();
                            $('.address_book_empty_shipping').hide();
                            $('#add_shipping').show();
                        } else {
                            class_name = 'billing-dom';
                            if (adds_billing) {
                                var adds_billing_new = {};
                                if (!$.isEmptyObject(adds_billing)) {
                                    for (var bi = 0; bi < Object.keys(adds_billing).length; bi++) {
                                        adds_billing_new[0] = response.data;
                                        adds_billing_new[bi + 1] = adds_billing[Object.keys(adds_billing)[bi]];
                                    }
                                    adds_billing = adds_billing_new;
                                } else {
                                    adds_billing[0] = response.data;
                                }
                                $('.address-book-billing').after(html);
                                // adds_billing[adds_billing.length] = response.data;
                                // adds_billing.push(response.data);
                            } else {
                                adds_billing = {};
                                adds_billing[0] = response.data;
                                $('#address-book-billing').after(html);
                                // adds_billing[adds_billing.length] = response.data;
                                // adds_billing[0] = response.data;
                            }
                            $('#billing-dom').show();
                            $('.address_book_empty_billing').hide();
                            $('#add_billing').show();
                        }
                        // $('#' + class_name).append(html);
                        // $('.' + class_names).after(html);
                        $('#ads_popup').hide();
                        show_loading(submit_this, 'hide', 4);
                        subscriptNs();
                    }else if (response.status == 1) { // 修改地址返回
                        var dd_class_name = '';
                        if (response.data.address_type !== 2) {
                            dd_class_name = 'address-book-shipping_' + response.data.address_id;
                            $.each(adds_shipping, function (key, val) {
                                if (val.address_book_id == response.data.address_id) {
                                    adds_shipping[key] = response.data;
                                }
                            })
                        } else {
                            dd_class_name = 'address-book-billing_' + response.data.address_id;
                            $.each(adds_billing, function (key, val) {
                                if (val.address_book_id == response.data.address_id) {
                                    adds_billing[key] = response.data;
                                }
                            })
                        }
                        $('.' + dd_class_name).children('.address-div-two').html(response.data.html);
                        $('#ads_popup').hide();
                        show_loading(submit_this,'hide',4);
                        subscriptNs();
                    } else {
                        if(response.status==407){
                            $.each(response.data, function (i, item) {
                                $("." + i).siblings('.error_prompt').show().html(item);
                            });
                            show_loading(submit_this, 'hide', 4);
                        }else if(response.status==408){
                            $('#upadd_entry_tax_number').siblings('.error_prompt').show().html(response.data);
                            show_loading(submit_this, 'hide', 4);
                        }else {
                            show_loading(submit_this, 'hide', 4);
                            $('#ads_popup').hide();
                            // show_new_server_tip_window({
                            //     type: 'error',
                            //     content: response.data,
                            // });
                            ajax_set_default_num = 0;
                        }
                    }
                }
            })
        }
    });
    /*地址相关结束*/
})

/**
 * @author potato
 * @param _this
 * @param shipping_type 地址类型 shipping、billing
 */
function add_address(_this,ship_bill_address_type) {
    var _this = $(_this);
     var ship_bill_address_type = ship_bill_address_type;
     $('#add_ship_bill').val(ship_bill_address_type);
    $("#updateAddressForm")[0].reset();
    $('#country_ids .ce_form_countryList li').each(function(c_k, c_val){
        var that = $(this),c_id = that.find('a').attr('tag');
        if(c_id == country_code_id){
            that.click();
        }
    });
    $('#address_book_title').children('span').text(shipping_billing_address_title);
    // po限制
    if (ship_bill_address_type != 2) {
        $('#upadd_entry_street_address').rules("add", {
            disallow_pobox: true,
            messages: {
                disallow_pobox: error_message.entry_street_address.disallow_pobox,
            }
        });
    }else {
        $('#upadd_entry_street_address').rules("remove", 'disallow_pobox');
    }
    // $('#telephone_container').text(country_code_tel);
    // if (de_country.length < 1) {
    //     $('#upadd_entry_state_block').hide();
    // }else {
    //     $('#upadd_entry_state_block').show();
    // }
    $('.company_type_p').text(fs_checkout_select)
    $('#upadd_company_type').val('');
    $('#ship_bill_address_id').val('');
    $('#ads_popup').show();
    //initAdressType();
}

function update_address(_this, ship_bill_address_type, ship_bill_address_id, address_books) {
    var _this = $(_this)
    var adds_ship_bill = '';
    if (ship_bill_address_type !== 2) {
        adds_ship_bill = adds_shipping;
        // po限制
        $('#upadd_entry_street_address').rules("add", {
            disallow_pobox: true,
            messages: {
                disallow_pobox: error_message.entry_street_address.disallow_pobox,
            }
        });
        $('#address_book_title').children('span').text(address_shipping_edit);
    } else {
        adds_ship_bill = adds_billing;
        // 去掉po限制
        $('#upadd_entry_street_address').rules("remove", 'disallow_pobox');
        $('#address_book_title').children('span').text(address_billing_edit);
    }
    var address_list = {};
    $.each(adds_ship_bill, function (key, val) {
        if (val) {
            if (val.address_book_id == ship_bill_address_id) {
                address_list = val;
            }
        }
    });

    // if (address_list.entry_country_id == 188) {
    //     $("#upadd_entry_ticket_number").val(address_list.ticket_number);
    // }
    // 填充表单数据
    $('#upadd_entry_firstname').val(address_list.entry_firstname);
    $('#upadd_entry_lastname').val(address_list.entry_lastname);
    $('#country_show_name').val(address_list.country_code);
    $('#upadd_company_type').val(address_list.company_type);
    //$('#upadd_company_type').val(address_list.company_type);
    $('#upadd_entry_tax_number').val(address_list.entry_tax_number);
    $('#upadd_entry_tax_number').attr('data-vat_number', address_list.entry_tax_number);
    $('#upadd_entry_tax_number').attr('data-country_id', address_list.entry_country_id);

    $('#country_ids .ce_form_countryList li').each(function(c_k, c_val){
        var that = $(this),c_id = that.find('a').attr('tag');
        if(c_id == address_list.entry_country_id){
            that.click();
        }
    });
    if (address_list.entry_tax_number){
        $('#tax_number_block').show();
    }
    if (($.inArray(address_list.entry_country_id, other_eu_country) > -1 && address_list.company_type == "IndividualType")){
        $('#tax_number_block').hide();
        $('#upadd_entry_tax_number').val('');
    }
    if (address_list.company_type){
        var that = $(this);
        //var that = $(this), val = that.attr('data-val'), text = that.text();
        if (address_list.entry_country_id == 176) {
            /*if (address_list.company_type == 'BusinessType') {
                var type = company_type_business_ru;
            } else if (address_list.company_type == 'IndividualType') {
                var type = company_type_individual_ru;
            }*/
            $('#upadd_company_type').find('option').eq(1).html(company_type_business_ru);
            $('#upadd_company_type').find('option').eq(2).html(company_type_individual_ru);
            /*$('#businessType').html(company_type_business_ru);
            $('#individualType').html(company_type_individual_ru);*/
        } else {
            /*if (address_list.company_type == 'BusinessType') {
                var type = fs_checkout_business;
            } else if (address_list.company_type == 'IndividualType') {
                var type = fs_checkout_individual;
            }*/
            $('#upadd_company_type').find('option').eq(1).html(fs_checkout_business);
            $('#upadd_company_type').find('option').eq(2).html(fs_checkout_individual);
        }
        //$('.company_type_p').text(type);
        $('#upadd_company_type').val(address_list.company_type);

        that.parent('ul').hide();
        // check_tax_block();
    }

    $('#upadd_entry_city').val(address_list.entry_city);
    $('#upadd_entry_company').val(address_list.entry_company);
    $('#upadd_entry_street_address').val(address_list.entry_street_address);
    $('#upadd_entry_suburb').val(address_list.entry_suburb);
    $('#upadd_entry_telephone').val(address_list.entry_telephone);
    $('#upadd_entry_postcode').val(address_list.entry_postcode);
    $('#tagcountry').val(address_list.entry_country_id);
    $('#add_update_tel_prefix_phone').text(address_list.tel_prefix);
    var ship_bill_address_type = ship_bill_address_type;
    $('#add_ship_bill').val(ship_bill_address_type);
    $('#ship_bill_address_id').val(ship_bill_address_id);
    $('#upadd_entry_state').val(address_list.entry_state);
    $('#ads_popup').show();
    //initAdressType();
}

var paramsObj = {};
function delete_address_window(_this, ship_bill_address_type, ship_bill_address_id) {
    $('#delete_address_windows').show();
    paramsObj = {
        'ship_bill_address_type':ship_bill_address_type,
        'ship_bill_address_id':ship_bill_address_id
    }
}

function close_delete_windows() {
    $('#delete_address_windows').hide();
    paramsObj = {};
}


/**
 * @author
 * @param _this
 * @param ship_bill_address_type
 * @param ship_bill_address_id
 * 删除地址
 */
function delete_address(_this, ship_bill_address_type, ship_bill_address_id) {
    // $('.adds_delete_one').show();
    var _this = $(_this);
    var submit_this = _this;
    var ship_bill_address_type = paramsObj.ship_bill_address_type;
    var address_book_id = paramsObj.ship_bill_address_id;
    var securityToken = $("input[name='securityToken']").val();
    $.ajax({
        url:"?modules=ajax&handler=ajax_address_book&ajax_request_action=delete_address_book",
        type:"POST",
        dataType: "json",
        data:{
            address_book_id:address_book_id,
            address_type:ship_bill_address_type,
        },
        beforeSend:function(){
            $('#delete_address_windows').hide();
            ajax_submit_address_num++;
            show_loading(submit_this,'show', 5);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            show_loading(_this,'hide',5);
            show_new_server_tip_window({
                type: 'error',
                content: system_busy_tip,
            });
            ajax_del_address_num = 0;
        },
        success:function(response){
            if (response.status == 200) {
                if (ship_bill_address_type !== 2) {
                    var class_name = 'address-book-shipping_' +address_book_id;
                    for (let key in adds_shipping) {
                        if (adds_shipping[key].address_book_id == address_book_id) {
                            delete adds_shipping[key];
                        }
                    }
                    if($.isEmptyObject(adds_shipping)){
                        $('.address_book_empty_shipping').show();
                        $('#shipping-dom').hide();
                        $('#add_shipping').hide();
                    }else{
                        $('.address_book_empty_shipping').hide();
                        $('#shipping-dom').show();
                        $('#add_shipping').show();
                    }
                }else {
                    var class_name = 'address-book-billing_' +address_book_id;
                    for (let keys in adds_billing) {
                        if (adds_billing[keys].address_book_id == address_book_id) {
                            delete adds_billing[keys];
                        }
                    }
                    if($.isEmptyObject(adds_billing)){
                        $('.address_book_empty_billing').show();
                        $('#billing-dom').hide();
                        $('#add_billing').hide();
                    }else{
                        $('.address_book_empty_billing').hide();
                        $('#billing-dom').show();
                        $('#add_billing').show();
                    }
                }
                $('.'+ class_name).remove();
                $('#delete_address_windows').hide();
                show_loading(submit_this,'hide', 5);
                subscriptNs();
            } else {
                show_loading(submit_this,'hide', 5);
                // show_new_server_tip_window({
                //     type: 'error',
                //     content: response.data,
                // });
                ajax_set_default_num = 0;
            }
        }
    });
}

function select_default_address(_this, ship_bill_address_id) {
    var _this = $(_this);
    var address_book_id = ship_bill_address_id;
    var submit_this = _this;
    $.ajax({
        url:"?modules=ajax&handler=ajax_address_book&ajax_request_action=select_default_address",
        type:"POST",
        dataType: "json",
        data:{
            address_book_id:address_book_id,
        },
        beforeSend:function(){
            ajax_submit_address_num++;
            show_loading(submit_this,'show',4);
            $("#fs_loading_bg").show();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            show_loading(_this,'hide',4);
            $("#fs_loading_bg").hide();
            show_new_server_tip_window({
                type: 'error',
                content: system_busy_tip,
            });
            ajax_del_address_num = 0;
        },
        success:function(response){
           if (response.status == 200) {
               var class_name = 'address-book-shipping_' +address_book_id;
               // show_loading(submit_this,'hide');
               $('.'+ class_name).children('address-div-one').html();
               $(".default-address-click,address-default").removeClass("address-default").html(set_default_name);
               $(_this).addClass("address-default").html(default_name);
               subscriptNs();
               // location.reload(); 选择默认地址后当前页面仅更改选择状态，不进行置顶。下次进入后再置顶
               show_loading(submit_this,'hide');
               $('.public_white_bg').hide();
           }else {
               show_loading(submit_this,'hide');
               $("#fs_loading_bg").hide();
               // show_new_server_tip_window({
               //     type: 'error',
               //     content: response.data,
               // });
               ajax_set_default_num = 0;
           }
        }
    });
}

function subscriptNs(){
    $.ajax({
        url: "index.php?modules=ajax&handler=ajax_subscript_ns&ajax_request_action=subscript",
        type: "POST",
        dataType: "json",
        success: function (data) {
            console.log(1);
        }
    })
}

$('.address_tab_ul li').click(function(){
    var index = $(this).index();
    console.log(index);
    $('.manage_addresses_create_btn li').eq(index).addClass('active').siblings('li').removeClass('active');
    $(this).addClass('active').siblings('li').removeClass('active');
    $('.address_content_ul').find('li').eq(index).addClass('active').siblings('li').removeClass('active');
})