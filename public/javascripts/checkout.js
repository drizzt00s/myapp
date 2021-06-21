/**
 * Created by FS on 2018/7/3.
 */
/*
 *地址选择部分
 *
 * */

//地址选择弹出框
function Show_Popup(is_shipping) {
    $("#popup").css({
        "background-color":"#000",
        "position":"fixed",
        "width":"100%",
        "height":"100%",
        "filter":"alpha(opacity=30);",
        "opacity":"0.3",
        "z-index":"9999",
        "top":"0",
        "left":"0"
    });
    $('#popup,#window').show();
}
function Close_Popup() {
    $('#popup,#window').hide();
    $('.Fiberstore_sel_box').removeClass('active');
    $('.addr_alert').removeClass('active');
}
//添加收货地址
function add_address(){
    $('.addr_alert').removeClass('active');
    $('.inp_addr').attr('placeholder','请选择省 / 市 / 区*').val('').show();
    $('.Fiberstore_sel_area_inp').hide();
    $('.entry_suburb').text('');
    $(".entry_city").text('');
    $('.entry_state').text('');
    $("#text_shop_address").text('新增地址');
    $("input[name^=entry_]").val('');
    $("select[name^=entry_]").val('');
    $("input[name='tag']").val(1);
    $('.Fiberstore_sel_area').addClass('fshide');
    $('.Fiberstore_sel_area1').addClass('fshide').html('');
    $('.Fiberstore_sel_area2').addClass('fshide').html('');
    Show_Popup(true);
}
//点击选择发货地址
/*$(document).on('click','.checkout_address_02',function() {
    var id = $(this).attr('address_id'),
        self = this;
    $('.checkout_address_02').find('dl').removeClass('border_color');
    $(this).find('dl').addClass('border_color');
    $('.checkout_address_02').find('dl').attr('style','');
    $('.checkout_address_02').removeClass('checked_dl');
    $(this).find('dl').attr('style','border:1px solid #d63030');
    $(this).find('dl').addClass('checked_dl');
    $.ajax({
        url: "ajax_process_other_requests.php?request_type=address_id",
        data: "&add_id="+id,
        type: "POST",
        dataType: "json",
        beforeSend: function(){

        },
        success: function(data){
            if(data.ret == 'ok'){
                $('#shipping_cost').text( data.shipping_price);
                $('#total_fee').text( data.checkout_total_price);
            }else{
                alert('网络错误！');
            }
        }
    });
});*/

//结算页的加载效果
function fslocking() {
    /*if($('bigbox').siblings(":contains('#overlayer')").length) {
     $('bigbox').siblings('#overlayer').show();
     }else {
     $('#overlayer').prependTo('html,body').show();
     }
     */
    if($('#window').is(':visible')){
        $('#window').hide();
    }
    // $('#fs_loading').show();
    commonRefresh('on');
}
function fsunlocking() {
    // $('bigbox').siblings('#overlayer').hide();
    // $('#fs_loading').hide();
    commonRefresh('off');
}

//判断是否有地址信息
function show_address(addr){
    $('#addAddressForm .Fiberstore_close_btn,#closeAddress').remove();
    if(!addr){//无地址信息 强制填入地址
        $('#saveAddress').after('<button class="Fiberstore_save_addr_close" type="button" id="backtoCart">返回购物车</button>');
        add_address();
        // return false;
    }else{
        $('#addAddressForm .address_03').append('<a href="javascript:void(Close_Popup());" class="Fiberstore_close_btn"></a>');
        $('#saveAddress').after('<button class="Fiberstore_save_addr_close" type="button" id="closeAddress" onclick="Close_Popup()">取消</button>');
        $('.address-templates').removeClass('hide');
    }
}

//隐藏地址栏提示
$('.Fiberstore_ad_addr_box li input[type="text"]').on('focus',function () {
    $(this).siblings('.addr_alert').removeClass('active');
});

$('.Fiberstore_sel_box').on('click',function () {
    $(this).siblings('.addr_alert').removeClass('active');
});

//无收货地址时编辑框返回购物车页面
$(document).on('click','#backtoCart',function(){
    window.location.href = global_https_server+global_lang_par+'/index.php?main_page=shopping_cart';
});
/*
*
* 发票部分
*
* */
//发票选择省份
$(document).on("click",'.sel-addr-row i[data-val="pro"]',function () {
    var _this = $(this).parent('.sel-addr-row');
    var proid = $(this).attr('proid');
    var proname = $(this).html();
    var data={};
    data.region_type = 'province';
    data.region_id = proid;
    $.ajax({
        url: "ajax_get_provinces.php",
        data: data,
        type: "POST",
        dataType:'json',
        success: function(data){
            var html = '';
            for(var i=0;i<data.length;i++){
                html += '<i data-val="city" cityid="'+data[i].city_id+'">'+data[i].city_name+'</i>';
            }
            _this.html(html);
            _this.siblings('.sel-addr-v').find('.d-pro').html(proname);
            _this.siblings('.sel-addr-v').find('.d-city').show().html('请选择市');
            _this.siblings('.sel-addr-v').find('.d-district').html('');
        }
    });
});

//发票选择城市
$(document).on("click",'.sel-addr-row i[data-val="city"]',function () {
    var _this = $(this).parent('.sel-addr-row');
    var cityid = $(this).attr('cityid');
    var cityname = $(this).html();
    var data={};
    data.region_type = 'city';
    data.region_id = cityid;
    $.ajax({
        url: "ajax_get_provinces.php",
        data: data,
        type: "POST",
        dataType:'json',
        success: function(data){
            var html = '';
            for(var i=0;i<data.length;i++){
                html += '<i data-val="county" countyid="'+data[i].county_id+'">'+data[i].county_name+'</i>';
            }
            _this.html(html);
            _this.siblings('.sel-addr-v').find('.d-city').html(cityname);
            _this.siblings('.sel-addr-v').find('.d-district').show().html('请选择区');
        }
    });
});

//发票选择辖区
$(document).on('click','.sel-addr-row i[data-val="county"]',function () {
    var countyname = $(this).html();
    var cityname = $(this).parent('.sel-addr-row').siblings('.sel-addr-v').find('.d-city').html();
    var proname = $(this).parent('.sel-addr-row').siblings('.sel-addr-v').find('.d-pro').html();
    $(this).parent('.sel-addr-row').siblings('.sel-addr-v em[data-show="district"]').html(countyname);
    $(this).parents('.sel-addr-wrapper').removeClass('active');
    $(this).parents('.sel-addr-wrapper').siblings('.inv-area').val(proname+' / '+cityname+' / '+countyname);
})

$('.invoice-right input[type="text"]').focus(function () {
    $(this).siblings('.invoice-error').html('').removeClass('active');
})

/*
* 点击地址会返回string类型 会有一个运费和总价
* data = "{"ret":string,"shipping_price":string,"checkout_total_price":string}"
* */
$(document).on('click','.checkout_address_02',function() {//地址选择
    var id = $(this).attr('address_id'),
        self = this;
    $(this).addClass('active').siblings('.checkout_address_02').removeClass('active');
    $(this).find('dl').addClass('checked_dl');
    $(this).siblings('.checkout_address_02').find('dl').removeClass('checked_dl')
    $.ajax({
        url: "ajax_process_other_requests.php?request_type=address_id",
        data: "&add_id="+id,
        type: "POST",
        beforeSend: function(){},
        success: function(data){
            // console.log(data+'==='+typeof(data));
            //var orderStatus = JSON.parse(data);
            // if(data.ret === 'ok'){
            //     console.log(data.shipping_price);//打印运费
            // }
            // if(data == 1){
            //     console.log(data);
            // }else{
            //     alert('网络错误！');
            // }
        }
    });
});
$('.sel-addr-v i').click(function(){
    $(this).parents('.sel-addr-wrapper').removeClass('active');
});
//自动选择地址
function AutoSelectAddr() {
    var c = $('.checkout_address .checkout_address_02').eq(0);
    var id = $('.checkout_address .checkout_address_02').eq(0).attr('address_id');
    if(!addresses){
        $('#addrArea').hide();
        $('#backtoCart').show().siblings('#closeAddress').hide();
        $('.Fiberstore_close_btn').hide();
        add_address();
    }else{
        $('#addrArea').show();
        $('.Fiberstore_close_btn').show();
        $('#closeAddress').show().siblings('#backtoCart').hide();
        c.find('dl').addClass('checked_dl').attr('style','border:1px solid #d63030');
        c.siblings().find('dl').removeClass('checked_dl').attr('style','');
        $.ajax({
            url: "ajax_process_other_requests.php?request_type=address_id",
            data: "&add_id="+id,
            type: "POST",
            dataType: "json",
            beforeSend: function(){

            },
            success: function(data){
                if(data.ret == 'ok'){
                    $('#shipping_cost').text( data.shipping_price);
                    $('#total_fee').text( data.checkout_total_price);
                }else{
                    alert('网络错误！');
                }
            }
        });
    }
}
/*发票*/
function invoicePop(name){
    var backdrop = "<div class='zt_backdrop'></div>";
    if($('body .zt_backdrop').length===0){
        $('body').append(backdrop);
    }
    // $('body,html').animate({scrollTop:0},300);
    $(name).show();
    if($(name).find(".invoice-cont-flowAutoBox")){
        $(".invoice-cont-flowAuto").scrollTop(0);
    }
}

function invoicePop01(name,voiceType,voiceCat,invoiceForm){
    var backdrop = "<div class='zt_backdrop'></div>";
    if($('body .zt_backdrop').length===0){
        $('body').append(backdrop);
    }
    $(name).show();
    if (name == '#ivPlain' && voiceType != '' && voiceCat != '' && invoiceForm != '') {
        if(voiceCat == "#electron-invoice"){
            $("#ivList #e_invoice").addClass("p_icon").removeClass("active").siblings("#p_invoice").removeClass("p_icon").addClass("active");
            $("#electron-invoice").addClass("active").siblings("#paper-invoice").removeClass("active");
            $(".invoice-cont-flowAutoBox").removeClass("active");
            $("#invoice-receiveMode01,#invoice-receiveMode").show();

        }
        if(voiceCat == "#paper-invoice"){
            $("#ivList #p_invoice").addClass("p_icon").removeClass("active").siblings("#e_invoice").removeClass("p_icon").addClass("active");
            $("#paper-invoice").addClass("active").siblings("#electron-invoice").removeClass("active");
            $(".invoice-cont-flowAutoBox").addClass("active");
            $("#invoice-receiveMode01,#invoice-receiveMode").hide();
        }
        $("#"+voiceType).addClass("active").siblings("label").removeClass("active");
        $(voiceCat).addClass("active").siblings().removeClass("active");
        $(invoiceForm).addClass("active").siblings(".c-tab").removeClass("active");
        $(".addressFill-box[addressdata="+ voiceType +"]").addClass("active").siblings('.addressFill-box').removeClass("active");
        if($(name).find(".invoice-cont-flowAutoBox")){
            $(".invoice-cont-flowAuto").scrollTop(0);
        }
    }
}

$(document).on('click','.invoice-pop-box h3 span,.iv-cancel',function(){
    $('.zt_backdrop').remove();
    // $('#iv-pop').fadeOut();
    $(this).parents('.Fs-invoice-pop').hide();
});

$('.remark').focus(function () {//留言长度限制
    $('.Fiberstore_list_lm p').show();
    $(this).bind('input propertychange', function(){
        var a = $('.remark').val();
        if(a.length<1){
            $('.Fiberstore_list_lm p').html('0/200');
            $('.Fiberstore_list_lm p').css('color','#6c7073');
        }else if(a.length===200){
            $('.Fiberstore_list_lm p').html('200/200');
            $('.Fiberstore_list_lm p').css('color','#d63030');
        }else if(a.length<200){
            $('.Fiberstore_list_lm p').html(a.length+'/200');
            $('.Fiberstore_list_lm p').css('color','#6c7073');
        }
    });
});
//新增地址点击调用过此函数
function initProvince(){
    var inner_html = "";
    var select_address = $("#select_province");
    for(var i = 0;i < area_array.length; i++) {
        var area = area_array[i];
        if(area!=undefined){
            inner_html += "<option id=\""+i+"\" value=\""+area+"\">"+area+"</option>";
        }
    }
    select_address.html(inner_html);
    select_address.find("option[value='请选择']").attr("selected",true);
    select_address.change(function(){
        $("#sel_wrap_town").hide();
        var o,id;
        var id='0';
        var opt = $(this).find('option');
        opt.each(function(i) {
            if (opt[i].selected == true) {
                o = opt[i].innerHTML;
                id = $(opt[i]).attr("id");
            }
        })
        $("#label_province").html(o);
        loadCity(id);
    });
}
$(function(){
    $('#entry_telephone').blur(function(){
        var phone = $(this).val();
        //var pattern = /^((1[3456789]\d{9})|(5[1234569]\d{4,7})|(6\d{6,8})|(9[012345678]\d{5,7})|(0?9\d{8,9}))$/;
        if (!global_phone_verify.test(phone) && phone.length>0) {
            $('#addr_tel').addClass('active').html('请输入正确格式的电话');
            return false;
        }
    });
    $('.Fiberstore_sel_box').on('click','.inp_addr',function () {
        $('.Fiberstore_sel_area').removeClass('fshide');
        $('.Fiberstore_sel_box').addClass('active');
        $(this).hide();
        $('.Fiberstore_sel_area_inp').show()
        $('.fs_cs_p').show().html('请选择省份');
        $('.fs_cs_c').html('');
        $('.fs_cs_a').html('');
    });
    $(document).on('click','.fs_allpro',function(){
        var proid = $(this).attr('proid');
        var proname = $(this).html();
        var data={};
        data.region_type = 'province';
        data.region_id = proid;
        $.ajax({
            url: "ajax_get_provinces.php",
            data: data,
            type: "POST",
            dataType:'json',
            success: function(data){
                var html = '';
                for(var i=0;i<data.length;i++){
                    html += '<i class="fs_allcity" cityid="'+data[i].city_id+'">'+data[i].city_name+'</i>';
                }
                $('.Fiberstore_sel_area1').html(html);
                $('.Fiberstore_sel_area').addClass('fshide');
                $('.Fiberstore_sel_area1').removeClass('fshide');
                $('.fs_cs_p').html(proname);
                $('.fs_cs_c').show();
                $('.fs_cs_c').html('请选择市');
                $('.fs_cs_a').html('');
            }
        })
    });
    $(document).on('click','.fs_allcity',function(){
        var cityid = $(this).attr('cityid');
        var cityname = $(this).html();
        var data={};
        data.region_type = 'city';
        data.region_id = cityid;
        $.ajax({
            url: "ajax_get_provinces.php",
            data: data,
            type: "POST",
            dataType:'json',
            success: function(data){
                var html = '';
                for(var i=0;i<data.length;i++){
                    html += '<i class="fs_allcounty" countyid="'+data[i].county_id+'">'+data[i].county_name+'</i>';
                }
                $('.Fiberstore_sel_area2').html(html);
                $('.Fiberstore_sel_area1').addClass('fshide');
                $('.Fiberstore_sel_area2').removeClass('fshide');
                $('.fs_cs_c').html(cityname);
                $('.fs_cs_a').show();
                $('.fs_cs_a').html('请选择区');
            }
        })
    });
    $('.Fiberstore_sel_box').on('click','.fs_allcounty',function () {
        var countyname = $(this).html();
        var cityname = $('.fs_cs_c').html();
        var proname = $('.fs_cs_p').html();
        $('.fs_cs_a').html(countyname);
        $('.Fiberstore_sel_area2').addClass('fshide');
        $('.inp_addr').show().val(proname+' / '+cityname+' / '+countyname);
        $('.Fiberstore_sel_area_inp').hide();
        $('.Fiberstore_sel_box').removeClass('active');
    });
});
function reset_all(){
    $('.fs_cs_p').html('');
    $('.fs_cs_c').html('');
    $('.fs_cs_a').html('');
    $('.inp_addr').show();
    $('.Fiberstore_sel_area1').addClass('fshide');
    $('.Fiberstore_sel_area2').addClass('fshide');
    $('.Fiberstore_sel_area').addClass('fshide');
    $('.Fiberstore_sel_area_inp').hide();
    $('.Fiberstore_sel_box').removeClass('active');
};
// $('#ivList li').on('click',function () {//是否选择开发票
//     var d = $(this).index(),
//         i = $('.invoice-content .tb-box'),
//         v = $(this).attr('id');
//     var t_type = $('#invoice-type');
//     $(this).addClass('p_icon').siblings('li').removeClass('p_icon');
//     $(i[d]).addClass('active').siblings().removeClass('active');
//     if($(this).attr('id')==='p_invoice'){
//         t_type.val('proInvoice');
//         invoicePop('#iv-pop');
//     }else if($(this).attr('id')==='g_invoice'){
//         ($('#personInvoiceForm').hasClass('active'))?(t_type.val('perInvoice')):(t_type.val('comInvoice'));
//         invoicePop('#ivPlain');
//     }
// });
$(document).on("click","#in_g_check label",function(){
    var a = $(this).index(),
        b = $('.box-tab .c-tab');
    var t = $(this).attr('type-iv');
    $('#invoice-type').val(t);
    $(this).addClass('active').siblings().removeClass('active');
    $(b[a]).addClass('active').siblings().removeClass('active');
    $(".invoice-ListBtn-box[btndata="+t+"]").addClass('active').siblings().removeClass('active');
    $(".addressFill-box[addressdata="+t+"]").addClass('active').siblings(".addressFill-box").removeClass('active');
    // if(a == 1 && !$(".invoice-popList li[id='e_invoice']").hasClass("active")){
    //     $("#invoice-material").hide();
    // }else{
    //     $("#invoice-material").show();
    // }
});
//旧内容
function apps(){
    $('#fs_overlays,#basic-modal-content').show();
}
$("#coupon_code_form").submit(function(){
    var code = $.trim($('#check_coupon').val());
    if (! code){
        $('#check_coupon').focus().css({border:'1px solid #f1ca7f'}).blur(function() {$(this).removeAttr('style');});
        return false;
    }
});
function rm(){
    $(".checkout_p_method_a").hide();
    $(".checkout_p_method_b").show();
    $("#abc").hide();
}

function checkfapiao(){
    if($("#checkpo").attr('checked')==false){
        $("#customer_po").removeClass('checkout_invoice_bghover');
        $("#hide_po").slideUp();
    }else{
        $("#customer_po").addClass('checkout_invoice_bghover');
        $("#hide_po").slideDown();
    }
}
$("#checkpo").click(function(){
    checkfapiao();
});
$("#customer_po").toggle(function(){
        $("#checkpo").attr('checked',true);
        $("#customer_po").addClass('checkout_invoice_bghover');
        $("#hide_po").slideDown();
    },
    function(){
        $("#checkpo").attr('checked',false);
        $("#customer_po").removeClass('checkout_invoice_bghover');
        $("#hide_po").slideUp();
    });
if($("#checkout_invoice_input").val()){
    $("#checkpo").click();
    checkfapiao();
}
function pay(id){
    $("#"+id).siblings("li").removeClass();
    $('.customers_po').val('');
    $('.taxpayer_in').val('');
    //alert(id);
    $("#"+id).addClass('p_icon');
    if(id=="myself"){
        $("#abc").hide();
        $(".checkout_p_method_a").hide();
        //  $("#checkout_invoice_input").hide();
        $("#checkout_p_method_b").hide();
        $(".checkout_p_method_b").hide();
        //   $("#save_invoice_b").hide();
        $("#checkout_invoice_input").val("");
        $('#ent_num').hide();
        $.ajax({
            type:"POST",
            url:"ajax_process_other_requests.php?request_type=myself",
            data:"&pay=myself",
            dataType:"html",
            success: function(data){
            }
        });

    }

    if(id=="company"){
        $("#checkout_invoice_input").val($("#invoice_hidden").val());
        $("#checkout_p_method_b").show();
        var invoice_val=$("#checkout_invoice_input").val();
        $('#ent_num').show();
        console.log(invoice_val);
        if(invoice_val=='' || invoice_val==undefined || invoice_val==null){
            $("#abc").show();
        }else{
            $(".checkout_p_method_a").show();
        }
    }
}
// $("#entry_country_id").change(function(){
//     c_id = $(this).val();
//     if(c_id > 0){
//         $('#tel_prefix').text(country_to_telephone[c_id]);
//     }
// });

// 勾选我要开发票
$("#checkInvoice-check").on("click",function() {
    var pre_type = $('#pre-type').val();
    if($(".saveInvoice-inforMian").hasClass("active")){
        $(".saveInvoice-inforMian.active").removeClass("active").addClass("active01");
        $(this).html("&#xf134;");
        $(this).parents(".fiberstore_checkout_checkInvoice_main").removeClass("choosez");
        $('#invoice-type').val('noInvoice');
    }else if($(".saveInvoice-inforMian").hasClass("active01")){
        $(".saveInvoice-inforMian.active01").removeClass("active01").addClass("active");
        $(this).html("&#xf133;");
        $(this).parents(".fiberstore_checkout_checkInvoice_main").addClass("choosez");
        $('#invoice-type').val(pre_type);
    }else{
        invoicePop('#ivPlain');
    }

})
// 选择发票类型
$(document).on("click","#ivList li",function(){
    var ivliId = $(this).attr("id");
    if(!$(this).hasClass("p_icon")){
        if(ivliId == "z_invoice" ){
            if($("#ivList li.p_icon.active").attr("id") == "e_invoice"){
                $("#valadde_invoice a").text($("#ivList #p_invoice a").text());
            }else{
                $("#valadde_invoice a").text($("#ivList #e_invoice a").text());
            }
            $("#ivPlain").hide();
            $("#iv-pop").show();
        }else{
            $(this).addClass("p_icon").siblings().removeClass("p_icon");
        }
    }
});
$(document).on("click","#valadd-ivList li",function(){
    var valaddId = $(this).attr("id");
    if(!$(this).hasClass("p_icon")){
        console.log(valaddId)
        if(valaddId == "valadde_invoice" ){
            $("#ivPlain").show();
            $("#iv-pop").hide();
        }else{
            $("#ivPlain").hide();
            $("#iv-pop").show();
        }

    }
});

// 电子发票跟纸质发票之间的切换
$(document).on("click","#electron-invoice a",function(){
    $(this).parents("#electron-invoice").removeClass("active").siblings("#paper-invoice").addClass("active");
    $("#p_invoice").removeClass("active").addClass("p_icon").siblings("#e_invoice").addClass("active").removeClass("p_icon");
    $("#invoice-receiveMode,#invoice-receiveMode01").hide();
    $("#paper-instruction").removeClass("active").siblings("ul").addClass("active");
    $(".invoice-cont-flowAutoBox").addClass("active");
});
$(document).on("click","#paper-invoice a",function(){
    $(this).parents("#paper-invoice").removeClass("active").siblings("#electron-invoice").addClass("active");
    $("#e_invoice").removeClass("active").addClass("p_icon").siblings("#p_invoice").addClass("active").removeClass("p_icon");
    $("#invoice-receiveMode,#invoice-receiveMode01").show();
    $("#electronic-instruction").removeClass("active").siblings("ul").addClass("active");
    $(".invoice-cont-flowAutoBox").removeClass("active");
    // if($("#in_g_check").find("input:checked").attr("id") == "company"){
    //    $(".invoice-material-checkList").hide();
    // }
});

//
function inputErroScroll(th,scrollDem){
    var arr = [];
    var vtop;
    $(th).parents(".invoice-cont").find('.invoice-error.active').each(function(){
        if($(this).length > 0 && !$(this).is(':hidden')){
            arr.push($(this));
        }
    });
    if(arr.length > 0){
        vtop = arr[0].parents('.invoice-list').offset().top-$(scrollDem).offset().top;
        if(vtop == 0){
            return false;
        }else if(vtop < 0){
            $(scrollDem).animate({scrollTop: $(scrollDem).scrollTop() + vtop + "px"}, 300);
        }else{
            $(scrollDem).animate({scrollTop: vtop + "px"}, 300);
        }

    }
}