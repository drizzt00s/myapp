//
var format = ['JPG', 'GIF', 'PNG', 'JPEG', 'BMP'];
// var errMsg = getMessage(format);

function alone_acc_Image(file, id) {
    $('.uploadMessage').removeClass('red');
    var fileSize = file.files[0].size;
    $("#photo_img").attr("data-default",'');
    if ((fileSize / 1024) >= 300) {
        $('.uploadMessage').addClass('red');
        $(file).val('');
        return false;
    }
    if (!checkFileType(file, format)) {
        $('.uploadMessage').addClass('red');
        $(file).val('');
        return false;
    }
    var MAXWIDTH = 120;
    var MAXHEIGHT = 120;
    var div = document.getElementById('preview');
    var img = new Array(), $i = 0, $len = 0;
    $('input[name^="reviews_img"]').each(function () {
        img[$i++] = $(this).val();
    });
    $len = img.length;
    if (file.files && file.files[0]) {
        var img = document.getElementById('photo_img');
        img.onload = function () {
            var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
            img.width = rect.width;
            img.height = rect.height;
//          img.style.marginTop = rect.top+'px';
        }
        var reader = new FileReader();
        reader.onload = function (evt) {
            img.src = evt.target.result;
        }
        reader.readAsDataURL(file.files[0]);
        $(".picture_upload_img").show()
    } else {
        var sFilter = 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
        file.select();
        var src = document.selection.createRange().text;
        div.innerHTML = '<img id=imghead >';
        var img = document.getElementById('imghead');
        img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
        var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
        status = ('rect:' + rect.top + ',' + rect.left + ',' + rect.width + ',' + rect.height);
    }
}

function clacImgZoomParam(maxWidth, maxHeight, width, height) {
    var param = {top: 0, left: 0, width: width, height: height};
    if (width > maxWidth || height > maxHeight) {
        rateWidth = width / maxWidth;
        rateHeight = height / maxHeight;

        if (rateWidth > rateHeight) {
            param.width = maxWidth;
            param.height = Math.round(height / rateWidth);
        } else {
            param.width = Math.round(width / rateHeight);
            param.height = maxHeight;
        }
    }
    param.left = Math.round((maxWidth - param.width) / 2);
    param.top = Math.round((maxHeight - param.height) / 2);
    return param;
}

function Account(type) {
    this.baseUrl = "index.php?modules=ajax&handler=ajax_update_customer_account";
    this.type = type;
}

Account.prototype = {
    updateInfo: function (obj) {
        var data = {};
        var baseUrl = this.baseUrl;
        var type = this.type;
        var This = this;
        baseUrl = baseUrl + "&ajax_request_action=" + type;
        var processData = true;
        var contentType = "application/x-www-form-urlencoded";
        var bool = false;
        var current_this = obj;
        var new_info = '';
        switch (type) {
            case 1:
                //跟新用户头像
                var formData = new FormData();
                var file =  $("#pic_img").val();
                var defaultImg = $("#photo_img").attr('data-default');
                if(defaultImg){
                    return ;
                }
                bool = true;
                if(!file){
                    $(".uploadMessage").addClass('red');
                    bool = false;
                }
                formData.append('customers_photo', $("#pic_img").get(0).files[0]);
                data = formData;
                processData = false;
                contentType = false;
                break;
            case 2:
                //更新用户名
                var firstName = $('input[name=firstName]').val();
                var lastName = $('input[name=lastName]').val();
                data = {
                    firstName: firstName,
                    lastName: lastName,
                };
                 bool = $("#nameValidate").valid();
                new_info = firstName + '.' + lastName;
                break;
            case 3:
                //更新邮箱
                var password = $('input[name=customers_password]').val();
                var email = $('input[name=customers_email_address]').val();
                var email_r = $('input[name=customers_reEmail]').val();
                data = {
                    'customers_password': password,
                    'customers_email_address': email,
                    'customers_reEmail': email_r
                };
                bool = $("#emailValidate").valid();
                new_info =  email;
                break;
            case 4:
                //更新订阅信息
                bool = true;
                var newsletter = 0,comment_mail_subscribe = 2;

                if($('.customers_newsletter').hasClass('active')){
                    newsletter = 1;
                }
                if($('.comment_mail_subscribe').hasClass('active')){
                    comment_mail_subscribe = 1;
                }
                data = {
                    'newsletter': newsletter,
                    'comment_mail_subscribe' : comment_mail_subscribe,
                };
                break;
            case 5:
                var password = $('input[name=password]').val();
                var new_password = $('input[name=new_password]').val();
                var new_password_c = $('input[name=new_password_c]').val();
                data = {
                    'password': password,
                    'new_password': new_password,
                    'new_password_c': new_password_c
                };
                bool = $("#passwordValidate").valid();
                new_info = '********';
                break;
            default :
                return;

        }
        if(!bool){
            return false;
        }
        $.ajax({
            url: baseUrl,
            data: data,
            type: "POST",
            processData: processData,
            contentType: contentType,
            dataType: "json",
            beforeSend: function () {
                This.loading(obj);
            },
            success: function (data) {
                var status = data.status;
                var datas = data.data;
                var message = data.message;
                if (status == 406) {
                    $.each(datas, function (i, item) {
                        $("." + i).closest('.acc_options_none').find('.error_prompt').hide();

                        $("." + i).siblings('.error_prompt').show().html(item);
                    })
                    if (type == 1) {
                        $(".uploadMessage").addClass('red');
                    }
                }
                if ($.inArray(parseInt(status), [403, 500]) != -1) {
                    This.messageTip(obj, 'error', data.message);
                }
                if(status == 403 && type ==4){
                    window.location.href = datas.redirect_url;
                }
                if (status == 200) {
                    if (type == 1) {
                        $(".uploadMessage").removeClass('red');
                        var src = $("#photo_img").attr('src');
                        $(".account_update_photo").attr('src',src);
                        $(".update_photo").hide();
                        current_this = ".update_photo_new";
                    }
                    if ($.inArray(parseInt(type), [1, 4]) == -1) {
                        if(type ==2){
                            $('.acc_set_tit').html('<em> '+ fs_hello.replace('FS_NAME',new_info) + ' </em>');
                            $('.hidden_first_name').val(firstName);
                            $('.hidden_last_name').val(lastName);
                            $('.top_hello').html(fs_hello.replace('FS_NAME',firstName));
                            $('.top_customer_name').html(firstName + fs_jp_name + '<em class="iconfont top-new-downIc">&#xf087;</em>');
                        }
                        $(obj).closest('.account_options').find('.acc_options_tit').html(new_info);
                    }
                    if(type ==4){
                        $('.hidden_customers_newsletter').val(newsletter);
                        $('.hidden_comment_mail_subscribe').val(comment_mail_subscribe);
                    }

                    This.messageTip(current_this, 'success', message);
                    //通知ns
                    subscriptNs();
                    if ($.inArray(parseInt(type), [3, 5]) != -1) {
                        setTimeout(function () {
                            window.location.href = datas.redirect_url;
                        }, 3000);
                    }
                }
                This.unLoading(obj);
            },
            error:function () {
                This.messageTip(obj, 'error', error);
                This.unLoading(obj);
            }
        })
    },
    loading: function (obj) {
        var $loading = '<div id="loader_order_alone" class="loader_order">' +
            '<svg class="circular" viewBox="25 25 50 50">' +
            '<circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10"></circle>' +
            '</svg></div>';
        $(obj).append($loading).addClass('active');
    },
    unLoading: function (obj) {
        $(obj).removeClass("active").find('#loader_order_alone').remove();
    },
    messageTip: function (obj, status, message) {
        var $class = "";
        var icon = "";
        if (status == 'success') {
            $class = 'update_true';
            icon = '&#xf186;';
        } else {
            $class = 'update_false';
            icon = '&#xf229;';
        }
        if (message) {
            $('.acc_prompt_top').find('span').html(message);
        }
        if(status =='success'){
            $(obj).closest('.account_options').find('.acc_options_none').slideUp();
            $(obj).closest('.account_options').find('.acc_options_tit').show();
            $(obj).closest('.account_options').find('.acc_options_right').removeClass('active');
        }
        $('.acc_prompt_top').addClass($class).fadeIn().find(".icon").html(icon);
        setTimeout(function () {
            $('.acc_prompt_top').fadeOut(100)
        }, 3000);
    }
}



//更新客户数据
function update(type, obj,event) {
    event = event || window.event;
    event.preventDefault();
    var account = new Account(type);
    account.updateInfo(obj);
    return false;
}
//密码显示隐藏
function _shoPassword(th) {
    if (!th.hasClass('choosez')) {
        th.addClass('choosez').text(hide_str).siblings("input").attr("type","show");
    }else{
        th.removeClass('choosez').text(show_str).siblings("input").attr("type","password");
    }
}





$(function () {
    $(".subScriptRadio .account_set_howCheck").on("click", function () {
       if($(this).hasClass('active')){
           $(this).removeClass("active").find('.iconfont').html("&#xf022;");
       }else{
           $(this).addClass("active").find('.iconfont').html("&#xf431;");
       }
    });
})
// $().ready(function(){
//     // $("#nameValidate").validate(nameValidate);
//     // $("#emailValidate").validate(emailValidate);
//     // $("#passwordValidate").validate(passwordValidate);
// })

function cls(obj) {
    $("#pic_img").val("");
    $(".picture_upload_img").hide();
    $("#photo_img").attr('src','');
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


$(function(){
    let src = window.location.href;
    let id = (src.split('&'))[1];
    $('.account_set_boxList').each(function(){
        let _id = $(this).attr('id');
        if(id == _id){
            let top = $(this).offset().top + 'px';
            console.log(top)
            $('body,html').animate({scrollTop:top},500);
        }
    });
})

if($('.acc_options_right').length>0){
    $('.acc_options_right').each(function(){
        $(this).click(function(){
            //防止多次触发
            var $this = $(this);
            var _nowTime = new Date().getTime();
            var _lastTime = $this.attr('lastTime');
            var type = $this.attr('data-type');
            if(_lastTime != "undefined" && (_nowTime - _lastTime <300)){
                return false;
            }else{
                $this.attr("lastTime",_nowTime);
                if($(this).hasClass('active')){
                    $(this).removeClass('active');
                    $(this).closest('.account_options').find('.acc_options_none').slideUp();
                    $(this).closest('.account_options').find('.acc_options_tit').show();
                }else{
                    if($.inArray(parseInt(type),[3,5]) !=-1){ //点击cancel之后  当前填写的内容清空
                        $(this).closest('.account_options').find('.acc_options_none').find('input').val('');
                    }
                    if($.inArray(parseInt(type),[2,4]) !=-1){ //点击cancel之后  恢复到之前填写的内容
                        if(type ==2){
                            var first_name = $('.hidden_first_name').val();
                            var last_name = $('.hidden_last_name').val();
                            $('.customers_firstname').val(first_name);
                            $('.customers_lastname ').val(last_name);
                        }else{
                            var newsletter =  $('.hidden_customers_newsletter').val();
                            var comment_mail_subscribe =  $('.hidden_comment_mail_subscribe').val();
                            if(newsletter ==1){
                                $('.customers_newsletter').addClass('active').find('.iconfont').css('display','block');
                            }else{
                                $('.customers_newsletter').removeClass('active').find('.iconfont').css('display','none');
                            }
                            if(comment_mail_subscribe ==1){
                                $('.comment_mail_subscribe').addClass('active').find('.iconfont').css('display','block');
                            }else{
                                $('.comment_mail_subscribe').removeClass('active').find('.iconfont').css('display','none');
                            }
                        }
                    }
                    $(this).closest('.account_options').find('.acc_options_none').find('.error_prompt').html('');
                    $(this).addClass('active');
                    $(this).closest('.account_options').find('.acc_options_none').slideDown();
                    $(this).closest('.account_options').siblings().find('.acc_options_none').slideUp();
                    $(this).closest('.account_options').siblings().find('.acc_options_tit').show();
                    $(this).closest('.account_options').find('.acc_options_tit').hide();
                }
                $(this).closest('.account_options').siblings().find('.acc_options_right').removeClass('active');
            }
        })
    })
}
$('.public_a_secondary').bind('click',function () {
    var _this = $(this);
   _this.closest('.account_options').find('.acc_options_none').slideUp();
    _this.closest('.account_options').find('.acc_options_tit').show();
    _this.closest('.account_options').find('.acc_options_right').removeClass('active');
})
$('.new-customer-tips-btn a').click(function(event){
    $(this).parents('.new-customer-tips').remove();
    event.stopPropagation();

    var type=$(this).data('type')

    $.post("ajax_guide_tips.php", {
        type: type
    }, function (data, state) {
    });
})
$('.subscriptions_dl dt').click(function(){

    if($(this).hasClass('active')){
        $(this).removeClass("active").find('.iconfont').css('display','none');
    }else{
        $(this).addClass("active").find('.iconfont').css('display','block');
    }
})

//	首页侧边栏
if($(window).width() > 960){
    if($('.fs_account_public_content_left').length > 0){
        if($('.fs_account_public_content_left').height()<$('.right_section_top').height()) {
            var scroh = $(document).scrollTop();
            var otoP = $('.fs_account_public_content_left').offset().top;
            if (scroh >= otoP) {
                $('.fs_account_public_menu_dl_container').addClass('active');
            } else {
                $('.fs_account_public_menu_dl_container').removeClass('active');
            }

            $(document).scroll(function () {
                var scroH = $(document).scrollTop();
                var otop = $('.fs_account_public_content_left').offset().top;
                if (scroH >= otop) {
                    $('.fs_account_public_menu_dl_container').addClass('active');
                } else {
                    $('.fs_account_public_menu_dl_container').removeClass('active');
                }
            })
        }
    }

}
$('.fs_account_head_search').click(function(){
    $('.fs_account_public_content_left').show();
})
$('.fs_account_public_menu_tit .icon').click(function(){
    $('.fs_account_public_content_left').hide();
})
function whenError(a){
    a.onerror = null;
    $(a).hide();
}


