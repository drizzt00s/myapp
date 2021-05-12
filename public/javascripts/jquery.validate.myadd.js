// 邮箱验证
//如果要修改邮箱验证，请同时修改下面2个
$.validator.addMethod("FSemail", function (value, element) {
    if(/^[0-9A-Za-z][\w\.\-\+]*\@[\w\.\-\+]+\.[\w\.\-]+[A-Za-z]$/.test(value) ){
        account = true;
    }else{
        account = false;
    }
    return this.optional(element) || account;
}, "Enter valid email address.(eg:someone@gmail.com)");
$.validator.addMethod("FSEmailLogin", function (value, element) { //因为现在用户中空格，所以登录的邮箱允许有空格
    if(/^[ \w\.\-\+]+\@[\w\.\-\+]+\.[\w\.\-]+$/.test(value) ){
        account = true;
    }else{
        account = false;
    }
    return this.optional(element) || account;
}, "Enter valid email address.(eg:someone@gmail.com)");
$.validator.addMethod("FSemailRegist", function (value, element) {
    if(/^[0-9A-Za-z][\w\.\-\+]*\@[\w\.\-\+]+\.[\w\.\-]+[A-Za-z]$/.test(value) ){
        account = true;
    }else{
        account = false;
    }
    return this.optional(element) || account;
}, "Enter valid email address.(eg:someone@gmail.com)");

$.validator.addMethod("FSpsw", function (value, element) {
    var psw_reg = /^(?![0-9_\.\?\@\!\#\$\%\^\&\*]+$)(?![a-zA-Z_\.\?\@\!\#\$\%\^\&\*]+$)[0-9A-Za-z_\.\?\@\!\#\$\%\^\&\*]{6,}$/;
    return this.optional(element) || (psw_reg.test(value));
}, "6 characters minimun; at least one letter and one number.");

$.validator.addMethod("FSphone", function (value, element) {
    var phone_reg = /^[0-9]{6,15}$/;
    return this.optional(element) || (phone_reg.test(value));
}, "电话号码必须是最小6位的数字，最大15位的数字");

$.validator.addMethod("FStax", function (value, element,params) {
    if(value){
        var country = parseInt($('#'+params[0]).val());
        value = value.replace(/[\s\/\\\.;,\-_\+:]/g, '').toUpperCase();
        code = getVATNumbercode(value,country);
        if($.inArray(country,EU_country)>-1){
            if(EU_code[country].indexOf(code)!=-1){
                //console.log('111');
                if(!checkVATNumber(code,value)){
                    return false;
                }
            }else{
                return false;
            }
        }
        return true;
    }
    return true;
}, "Valid TAX/VAT eg:DE123456789");

// company member register
$.validator.addMethod("FStax_new", function (value, element,params) {
    if(value){
        var country = parseInt($('#'+params[0]).val());
        value = value.replace(/[\s\\;,_\+:]/, '').toUpperCase();
		$(element).val(value);
        code = getVATNumbercode(value,country);
        if($.inArray(country,EU_country)>-1){
            
            if($.inArray(code,euCode)>-1){
                if(!checkVATNumber(code,value)){
                    $(element).data('error-msg',getVATNumberErrorTip(EU_code[country]));
                    return false;
                }else{
                    return true;
                }
            }else{
                $(element).data('error-msg',getVATNumberErrorTip(EU_code[country]));
                return false;
            }
        }else if(country == 30){ // Argentina
            if( ! /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(value) ){
                $(element).data('error-msg',FStax_error_argentina);
                return false;
            }else{
                return true;
            }
        }else if(country == 10){ // Brazil
            if( ! /^\d{2}-\d{8}-\d$/.test(value) ){
                $(element).data('error-msg',FStax_error_brazil);
                return false;
            }else{
                return true;
            }
        }else if(country == 43){ // Chile
            if( ! /^\d{2}.\d{3}.\d{3}-[Kk0-9]{1}$/.test(value) ){
                $(element).data('error-msg',FStax_error_chile);
                return false;
            }else{
                return true;
            }
        }
        return true;
    }
    return true;
} , function(params, element) {
   return $(element).data('error-msg');
});

$.validator.addMethod("fs_depend_required", function (value, element,params) {
    // 参数 依赖元素的name，依赖元素等于多少值（必填），依赖元素的id
    // 例如：当类型选择国家的时候，国家名称才必填
    var depend_input = $('#'+params[2]).val();
    if(depend_input==params[1]){
        if(!value){
            return false;
        }else{
            return true;
        }
    }
    return true;
}, "This can't be empty");

$.validator.addMethod("fs_visible_required", function (value, element,params) {
    // 当可见时候必填
    if($(element).is(':visible')){
        if(!value){
            return false;
        }else{
            return true;
        }
    }
    return true;
}, "This can't be empty");

//正整数，例如：数量
$.validator.addMethod("positiveinteger", function (value, element) {
    var positiveinteger_reg = /^\d+$/;
    if(positiveinteger_reg.test(value) && parseInt(value)>0){
          return true;
    }else{
        return false;
    }
}, "The input must be positive integer.");

$.validator.addMethod("disallow_pobox", function(value, element, param) {
    var po_dis_allow = "POBOX";
    if($.trim(value)){
        var reg_address = value.replace(/\s+/g,"").replace(/\./g,"").replace(/\_+/g,'').toUpperCase();
        if(reg_address.indexOf(po_dis_allow)!=-1){
            return false;
        }
    }
    return true;
}, "We do not ship to PO Boxes.");

//validate 一些常用方法 errorPlacement
var validateShowError = function (error, element) {
    element.parent().find('.error_prompt').html(error).show();
}

//validate 一些常用方法 errorPlacement
var validateShowError1 = function (error, element) {
    //设置QA 的背景
    setInterval(function(){
        $('.qa_container_box_bg').height($('.box').height())
    })
    element.parents('.input_block').find('.error_prompt').html(error).show();
}

$.validator.addMethod("orderNumber", function(value, element, param) {
	if($.trim(value)){
		var number = value.replace(/\s+/g,"").replace(/\./g,"").replace(/\_+/g,'').toUpperCase();
		$(element).val(number);
		var reg = /^FS\d{12}$/;
		if(reg.test(number)){
			return true;
		}else{
			return false;
		}
	}
	return true;
}, "Please enter a valid order number. eg:FS1808081234");

$.validator.addMethod("FSIsMoney", function (value, element, param) {
    var money_reg =  /^[1-9][0-9]{0,2}((,\d{3})|(\d))*(\.[0-9]{1,2})?$/;
    return this.optional(element) || (money_reg.test(value));
}, "The item must be valid money.");

$.validator.addMethod("FSIsEuropeMoney", function (value, element, param) {
    var money_reg =  /^[1-9][0-9]{0,2}((.\d{3})|(\d))*(\,[0-9]{1,2})?$/;
    return this.optional(element) || (money_reg.test(value));
}, "The item must be valid money.");

$.validator.addMethod("chcharacter", function(value) {
    var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
    if(reg.test(value) ){
        return false;
    }else{
        return true;
    }
}, "Please enter an indentifible address.");
$.validator.addMethod("FSOrdersNumber", function (value, element) {
    var money_reg =  /^FS\d{12}(-P\d)?(R\d)?$/i;
    return this.optional(element) || (money_reg.test(value));
}, "Please enter valid order number.");
$.validator.addMethod("fsVerify", function (value, element) {
    var money_reg =  /^[0-9A-Z ]+$/;
    return this.optional(element) || (money_reg.test(value));
}, "Please enter valid characters.");
