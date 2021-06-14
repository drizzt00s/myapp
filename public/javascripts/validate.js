/**
 * 结算页地址验证
 *
 * @parma validaeType  验证类型 1. addressForm 表单地址验证  2. other 其他正常表单 验证
 * @param data
 * @param validateRule
 * @constructor
 */
function Init(data, validateRule, validateType) {
    //需要验证的规则
    this.validateRule = validateRule;

    //需要验证的数据
    this.data = data;
    this.$jquery = $;
    this.$eu_code = EU_code;
    this.$eu_country = EU_country;
    this.$other_eu_country = other_eu_country;
    this.$other_eu_country_code = other_eu_country_code;
    //表单验证错误信息
    this.rulesMessage = this.createRuleMessage(validateRule);
    this.validateType = (typeof validateType !='undefined' && validateType) ? validateType : '';
}

/**
 * 根据当前验证规则生成对应的 错误提示 格式
 * @param validateRule
 */
Init.prototype.createRuleMessage = function (validateRule) {
    if (!validateRule || typeof validateRule == 'undefined') {
        return {};
    }
    if (typeof validateRule['rules'] == 'undefined' || Object.keys(validateRule['rules']).length === 0) {
        return {}
    }
    var newObj = {}
    for (var i in validateRule['rules']) {
        i = (i == 'AddressType') ? 'company_type' : i;
        newObj[i] = {};
    }
    return newObj;
}

/**
 * 验证 地址信息
 * @returns {boolean}
 */
Init.prototype.check = function (data, editFormType) {
    var message = this.validateRule.messages;
    var entry_country_id = parseInt(data.entry_country_id);
    var company_type = data.company_type;
    var newRule = this.validateRule;
    if(this.validateType === 'addressForm'){
        newRule = this.initValidateRule(this.validateRule.rules, message, data, editFormType);
    }
    //动态修改验证规则
    this.validateRule = newRule;

    var rules = newRule.rules;
    message = newRule.messages;
    var default_error = 'invalid field';
    for (var i in rules) {
        var field = i == 'AddressType' ? 'company_type' : i;
        var rule = rules[i] ? rules[i] : {};
        var isBool = typeof this.rulesMessage[field] !='undefined'  && this.rulesMessage[field];
        if (rule && isBool) {
            var value = data[field] ? data[field] : '';
            for (var ii in rule) {
                var ruleValue = rule[ii] ? rule[ii] : false;
                switch (ii) {
                    case "required":
                        this.rulesMessage[field][ii] = false;
                        if (!this.$jquery.trim(value) && ruleValue) {
                            var messageMap = field === 'company_type' ? 'AddressType' : field;
                            this.rulesMessage[field][ii] = message[messageMap][ii] ?
                                message[messageMap][ii] : default_error;
                        }
                        break;
                    case 'maxlength':
                    case 'minlength':
                        this.rulesMessage[field][ii] = false;
                        var valueLength = value ? value.toString().length : 0;
                        if (ii === "maxlength" && ruleValue) {
                            if (valueLength > ruleValue) {
                                this.rulesMessage[field][ii] = message[field][ii] ? message[field][ii] :
                                    default_error;
                            }
                        } else {
                            //require 为必填 并且required 为true 或者当前有值时验证 最小长度
                            if((typeof rule['required']!=='undefined' && rule['required'] === true) || valueLength){
                                if (valueLength < ruleValue && ruleValue) {
                                    this.rulesMessage[field][ii] = message[field][ii] ? message[field][ii]
                                        : default_error;
                                }
                            }
                        }
                        break;
                    case 'tax_number':
                        //税号规则验证
                        this.rulesMessage[field][ii] = false;
                        var error_messgae = this.$getVATNumberErrorTip(data.country_code, company_type);
                        if (value) {
                            if (!this.$checkEuVATNumber(entry_country_id, value) || !this.$checkOtherVatNumber(entry_country_id, value, company_type))
                                this.rulesMessage[field][ii] = error_messgae ? error_messgae
                                    : default_error;
                        }
                        break;
                    case "pobox":
                        var error_message = this.$tran('address_popup_tips');
                        this.rulesMessage[field][ii] = false;
                        if (value) {
                            if (ruleValue.indexOf(value.toLowerCase()) !== -1) {
                                this.rulesMessage[field][ii] = error_message ? error_message : default_error;
                            }
                        }
                        break;
                    case 'equal_to':
                        this.rulesMessage[field][ii] = false;
                        if(typeof data[ruleValue]!='undefined' &&  data[ruleValue]!=value){
                            this.rulesMessage[field][ii] = message[field][ii] ? message[field][ii] :
                                default_error;
                        }
                        break;
                    case 'fs_email':
                        this.rulesMessage[field][ii] = false;
                        if(!/^[0-9A-Za-z][\w\.\-\+]*\@[\w\.\-\+]+\.[\w\.\-]+[A-Za-z]$/.test(value)){
                            this.rulesMessage[field][ii] = message[field][ii] ? message[field][ii] :
                                default_error;
                        }
                        break;
                }
            }
        }
    }
    for (var i in this.rulesMessage) {
        for (var ii in this.rulesMessage[i]) {
            if (this.rulesMessage[i][ii]) {
                return false
                break;
            }
        }
    }
    return true;
}

/**
 * 根据当前表单数据动态初始化验证规则
 *
 * @param messages //错误提示语
 * @param rules //错误验证规则
 * @param data //验证数据
 * @param editFormType // 编辑地址类型
 * return newRules
 */
Init.prototype.initValidateRule = function (rules, messages, data, editFormType) {
    var entry_country_id = parseInt(data.entry_country_id);
    var company_type = data.company_type;
    //公司地址类型为bussiness type,并且为非俄罗斯国家 则entry_company 必填
    if (company_type === 'BusinessType' && entry_country_id !== 176) {
        rules['entry_company']['required'] = true;
    } else {
        rules['entry_company']['required'] = false;
    }
    //国家为美国 澳大利亚 加拿大时 州为必填
    if (this.$jquery.inArray(entry_country_id, [223, 13, 38, 138]) !== -1) {
        rules['entry_state']['required'] = true;
    } else {
        rules['entry_state']['required'] = false;
    }
    //国家为新加坡 地址2 为必填    //XQ20210531005新加坡address2为非必填
    /*if (entry_country_id === 188) {
        rules['entry_suburb']['required'] = true;
    } else {
        rules['entry_suburb']['required'] = false;
    }*/
    if (entry_country_id === 96) {  //XQ20210531005香港邮编为非必填
        rules['entry_postcode']['required'] = false;
    } else {
        rules['entry_postcode']['required'] = true;
    }
    //运输地址验证pobox
    if (editFormType === 0) {
        rules['entry_street_address']['pobox'] = ['pobox', 'po box'];
        rules['entry_suburb']['pobox'] = ['pobox', 'po box'];
    }
    //税号验证规则初始化
    return this.initValidateTaxRule(rules, messages, data);
}

/**
 * 初始化税号验证规则
 * @param rules
 * @param messages
 * @param data
 * @returns {{messages: *, rules: *}}
 */
Init.prototype.initValidateTaxRule = function (rules, messages, data) {
    var entry_country_id = parseInt(data.entry_country_id);
    var eu_country = this.$eu_country;
    var other_eu_country = this.$other_eu_country;
    var company_type = data.company_type;
    rules['entry_tax_number']['required'] = false;
    //欧盟
    var is_in_germany_area = this.$jquery.inArray(entry_country_id, eu_country) !== -1;
    //非欧盟
    var is_in_other_germany_area = this.$jquery.inArray(entry_country_id, other_eu_country) !== -1;
    //巴西阿根廷
    var is_ba_required = $.inArray(entry_country_id, [30, 10]) !== -1;
    //智利
    var is_chile_required = entry_country_id === 43 && company_type === "BusinessType";
    //欧盟国家和非欧盟国家个人不出现税号框, 企业出现税号框必填
    if (company_type === "BusinessType" && (is_in_germany_area)) {
        rules['entry_tax_number']['required'] = true;
        if (this.$jquery.inArray(entry_country_id, [222, 244]) !== -1) {
            rules['entry_tax_number']['required'] = false;
        }
    }
    /**
     *  1. 巴西Brazil，阿根廷Argentina 地址类型是business和individual均需填写税号，必填项。
     *  2. 智利Chile，地址类型是business
     */
    if (is_ba_required || is_chile_required) {
        rules['entry_tax_number']['required'] = true;
    }
    rules['entry_tax_number']['tax_number'] = true;
    return {
        rules: rules,
        messages: messages,
    };
}

/**
 * 检测税号正确
 * @param country_id
 * @param number
 * @param company_type
 * @returns {boolean}
 */
Init.prototype.$checkOtherVatNumber = function (country_id, number, company_type) {
    var br_validate = /^\d{3}\.\d{3}\.\d{3}\/\d{2}$/;
    var ar_validate = /^\d{2}-\d{8}-\d$/;
    if (company_type == "BusinessType") {
        br_validate = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
    }
    switch (country_id) {
        case 30:
            if (!br_validate.test(number)) {
                return false;
            } else {
                return true;
            }
            break;
        case 43:
            if (!/^\d{2}.\d{3}.\d{3}-[Kk0-9]{1}$/.test(number)) {
                return false;
            } else {
                return true;
            }
            break;
        case 10:
            if (!ar_validate.test(number)) {
                return false;
            } else {
                return true;
            }
            break;
        default:
            return true;
            break;
    }
}

/**
 * 错误提示语
 * @param country_code
 * @param FStax_error
 * @returns {string}
 */
Init.prototype.$getVATNumberErrorTip = function (country_code, company_type) {
    var tip = 'Please enter a valid VAT NUMBER. eg: $VAT', vat = '';
    var FStax_error = typeof languagePack =='object' ? languagePack['address_tax_input_error'] : '';
    if (typeof FStax_error != 'undefined' && FStax_error) {
        var tip = FStax_error;
    }
    switch (country_code) {
        case 'LU':
        case 'DK':
        case 'FT':
        case 'FI':
        case 'SI':
        case 'HU':
            vat = country_code + '12346578';
            break;
        case 'BE':
        case 'PL':
            vat = country_code + '1234657890';
            break;
        case 'SK':
            vat = country_code + '1111111111';
            break;
        case 'FR':
            vat = country_code + '00123456789';
            break;
        case 'IT':
        case 'LV':
        case 'HR':
            vat = country_code + '12346578901';
            break;
        case 'SE':
            vat = country_code + '123465789012';
            break;
        case 'NL':
            vat = country_code + '123465789B12';
            break;
        case 'IE':
            vat = country_code + '1234657';
            break;
        case 'AT':
            vat = country_code + 'U12346578';
            break;
        case 'ES':
            vat = country_code + 'B12346578';
            break;
        case 'BR':
            if (company_type === 'IndividualType') {
                vat = '000.000.000/00';
            } else {
                vat = '00.000.000/0000-00';
            }
            break;
        case 'GR':
            vat = 'EL123465789';
            break;
        case 'AR':
            vat = '00-00000000-0';
            break;
        default:
            vat = country_code + '123465789';
            break;
    }
    return tip.replace('$VAT', vat);
}

/**
 * 检测税号正确
 * @param country_id
 * @param number
 * @param company_type
 * @returns {boolean}
 */
Init.prototype.$checkVATNumber = function (country_id, number) {
    switch (country_id) {
        case 124:
            var reg = /^LU\d{8}$/;
            if (reg.test(number)) {
                return true;
            } else {
                return false;
            }
            break;
        case 57:
            var reg = /^DK\d{8}$/;
            if (reg.test(number)) {
                return true;
            } else {
                return false;
            }
            break;
        case 132:
            var reg = /^MT\d{8}$/;
            if (reg.test(number)) {
                return true;
            } else {
                return false;
            }
            break;
        case 72:
            var reg = /^FI\d{8}$/;
            if (reg.test(number)) {
                return true;
            } else {
                return false;
            }
            break;
        case 190:
            var reg = /^SI\d{8}$/;
            if (reg.test(number)) {
                return true;
            } else {
                return false;
            }
            break;
        case 97:
            var reg = /^HU\d{8}$/;
            if (reg.test(number)) {
                return true;
            } else {
                return false;
            }
            break;
        case 81:
            var reg = /^DE\d{9}$/;
            if (reg.test(number)) {
                return true;
            } else {
                return false;
            }
            break;
        case 84:
            var reg = /^EL\d{9}$/;
            if (reg.test(number)) {
                return true;
            } else {
                return false;
            }
            break;
        case 67:
            var reg = /^EE\d{9}$/;
            if (reg.test(number)) {
                return true;
            } else {
                return false;
            }
            break;
        case 55:
            var reg = /^CY\w{9}$/;
            if (reg.test(number)) {
                return true;
            } else {
                return false;
            }
            break;
        case 171:
            var reg = /^PT\d{9}$/;
            if (reg.test(number)) {
                return true;
            } else {
                return false;
            }
            break;
        case 203:
            var reg = /^SE\d{12}$/;
            if (reg.test(number)) {
                return true;
            } else {
                return false;
            }
            break;
        case 105:
            var reg = /^IT\d{11}$/;
            if (reg.test(number)) {
                return true;
            } else {
                return false;
            }
            break;
        case 56:
            var reg = /^CZ\d{8,10}$/;
            if (reg.test(number)) {
                return true;
            } else {
                return false;
            }
            break;
        case 21:
            var reg = /^BE\d{10}$/;
            if (reg.test(number)) {
                return true;
            } else {
                return false;
            }
            break;
        case 170:
            var reg = /^PL\d{10}$/;
            if (reg.test(number)) {
                return true;
            } else {
                return false;
            }
            break;
        case 123:
            var reg = /^LT\d{9}$/;
            var reg1 = /^LT\d{12}$/;
            if (reg.test(number) || reg1.test(number)) {
                return true;
            } else {
                return false;
            }
            break;
        case 117:
            var reg = /^LV\d{11}$/;
            if (reg.test(number)) {
                return true;
            } else {
                return false;
            }
            break;
        case 14:
            var reg = /^ATU\w{8}$/;
            if (reg.test(number)) {
                return true;
            } else {
                return false;
            }
            break;
        case 53:
            var reg = /^HR\d{11}$/;
            if (reg.test(number)) {
                return true;
            } else {
                return false;
            }
            break;
        case 175:
            var reg = /^RO\d{2,10}$/;
            if (reg.test(number)) {
                return true;
            } else {
                return false;
            }
            break;
        case 33:
            var reg = /^BG\d{9,10}$/;
            if (reg.test(number)) {
                return true;
            } else {
                return false;
            }
            break;
        case 73:
            var reg = /^FR\w{2}\d{9}$/;
            if (reg.test(number)) {
                return true;
            } else {
                return false;
            }
            break;
        case 195:
            var reg = /^ES\D\d{7}\D$/;
            var reg1 = /^ES\D\d{8}$/;
            var reg2 = /^ES\d{8}\D$/;
            if (reg.test(number) || reg1.test(number) || reg2.test(number)) {
                return true;
            } else {
                return false;
            }
            break;
        case 150:
            var reg = /^NL\d{9}B\d{2}$/;
            if (reg.test(number)) {
                return true;
            } else {
                return false;
            }
            break;
        case 103:
            var reg = /^IE[0-9A-Z]{8,9}$/;
            if (reg.test(number)) {
                return true;
            } else {
                return false;
            }
            break;
        case 189:
            var reg = /^SK(\d{10})$/g;
            if (reg.test(number)) {
                var num = parseInt(number.substr(2));
                if (num % 11) {
                    return false;
                } else {
                    return true;
                }

            } else {
                return false;
            }
            break;
        // case 244:
        // case 222:
        //     var reg = /^GB\d{9}$/g;
        //     if (reg.test(number)) {
        //         return true;
        //     } else {
        //         return false;
        //     }
        //     break;
        default:
            return true;
            break;
    }
}
Init.prototype.$checkEuVATNumber = function (country_id, number) {
    var eu_country = [124,57,132,72,190,97,81,84,67,55,171,203,105,56,21,170,123,117,14,53,175,33,73,195,150,103,189,141];
    if($.inArray(country_id,eu_country)>-1){
        var taxCode = number.substr(0,2);
        switch (taxCode) {
            case 'LU':
                var reg = /^LU\d{8}$/;
                if (reg.test(number)) {
                    return true;
                } else {
                    return false;
                }
                break;
            case 'DK':
                var reg = /^DK\d{8}$/;
                if (reg.test(number)) {
                    return true;
                } else {
                    return false;
                }
                break;
            case 'MT':
                var reg = /^MT\d{8}$/;
                if (reg.test(number)) {
                    return true;
                } else {
                    return false;
                }
                break;
            case 'FI':
                var reg = /^FI\d{8}$/;
                if (reg.test(number)) {
                    return true;
                } else {
                    return false;
                }
                break;
            case 'SI':
                var reg = /^SI\d{8}$/;
                if (reg.test(number)) {
                    return true;
                } else {
                    return false;
                }
                break;
            case 'HU':
                var reg = /^HU\d{8}$/;
                if (reg.test(number)) {
                    return true;
                } else {
                    return false;
                }
                break;
            case 'DE':
                var reg = /^DE\d{9}$/;
                if (reg.test(number)) {
                    return true;
                } else {
                    return false;
                }
                break;
            case 'EL':
                var reg = /^EL\d{9}$/;
                if (reg.test(number)) {
                    return true;
                } else {
                    return false;
                }
                break;
            case 'EE':
                var reg = /^EE\d{9}$/;
                if (reg.test(number)) {
                    return true;
                } else {
                    return false;
                }
                break;
            case 'CY':
                var reg = /^CY\w{9}$/;
                if (reg.test(number)) {
                    return true;
                } else {
                    return false;
                }
                break;
            case 'PT':
                var reg = /^PT\d{9}$/;
                if (reg.test(number)) {
                    return true;
                } else {
                    return false;
                }
                break;
            case 'SE':
                var reg = /^SE\d{12}$/;
                if (reg.test(number)) {
                    return true;
                } else {
                    return false;
                }
                break;
            case 'IT':
                var reg = /^IT\d{11}$/;
                if (reg.test(number)) {
                    return true;
                } else {
                    return false;
                }
                break;
            case 'CZ':
                var reg = /^CZ\d{8,10}$/;
                if (reg.test(number)) {
                    return true;
                } else {
                    return false;
                }
                break;
            case 'BE':
                var reg = /^BE\d{10}$/;
                if (reg.test(number)) {
                    return true;
                } else {
                    return false;
                }
                break;
            case 'PL':
                var reg = /^PL\d{10}$/;
                if (reg.test(number)) {
                    return true;
                } else {
                    return false;
                }
                break;
            case 'LT':
                var reg = /^LT\d{9}$/;
                var reg1 = /^LT\d{12}$/;
                if (reg.test(number) || reg1.test(number)) {
                    return true;
                } else {
                    return false;
                }
                break;
            case 'LV':
                var reg = /^LV\d{11}$/;
                if (reg.test(number)) {
                    return true;
                } else {
                    return false;
                }
                break;
            case 'AT':
                var reg = /^ATU\w{8}$/;
                if (reg.test(number)) {
                    return true;
                } else {
                    return false;
                }
                break;
            case 'HR':
                var reg = /^HR\d{11}$/;
                if (reg.test(number)) {
                    return true;
                } else {
                    return false;
                }
                break;
            case 'RO':
                var reg = /^RO\d{2,10}$/;
                if (reg.test(number)) {
                    return true;
                } else {
                    return false;
                }
                break;
            case 'BG':
                var reg = /^BG\d{9,10}$/;
                if (reg.test(number)) {
                    return true;
                } else {
                    return false;
                }
                break;
            case 'FR':
                var reg = /^FR\w{2}\d{9}$/;
                if (reg.test(number)) {
                    return true;
                } else {
                    return false;
                }
                break;
            case 'ES':
                var reg = /^ES\D\d{7}\D$/;
                var reg1 = /^ES\D\d{8}$/;
                var reg2 = /^ES\d{8}\D$/;
                if (reg.test(number) || reg1.test(number) || reg2.test(number)) {
                    return true;
                } else {
                    return false;
                }
                break;
            case 'NL':
                var reg = /^NL\d{9}B\d{2}$/;
                if (reg.test(number)) {
                    return true;
                } else {
                    return false;
                }
                break;
            case 'IE':
                var reg = /^IE[0-9A-Z]{8,9}$/;
                if (reg.test(number)) {
                    return true;
                } else {
                    return false;
                }
                break;
            case 'SK':
                var reg = /^SK(\d{10})$/g;
                if (reg.test(number)) {
                    var num = parseInt(number.substr(2));
                    if (num % 11) {
                        return false;
                    } else {
                        return true;
                    }

                } else {
                    return false;
                }
                break;
            default:
                return true;
                break;
        }
    }else{
        return true;
    }
}
/**
 * 获取错误信息
 *
 * @param name
 * @returns {boolean|*}
 */
Init.prototype.getError = function (name) {
    var errors = this.rulesMessage[name] ? this.rulesMessage[name] : {};
    if (errors) {
        for (var i in errors) {
            if (errors[i]) {
                return errors[i];
            }
        }
    }
    return false;
}

/**
 * 获取地址验证状态
 * @returns {boolean}
 */
Init.prototype.isValid = function () {
    var rulesMessage = this.rulesMessage;
    for (var i in rulesMessage) {
        for (var ii in rulesMessage[i]) {
            if (rulesMessage[i][ii]) {
                return false;
            }
        }
    }
    return true;
}

/**
 * 对外注册组件
 * @type {{install: checkoutValidate.install}}
 */
var checkoutValidate = {
    install: function (Vue) {
        Init.prototype.$tran = Vue.prototype.$tran ? Vue.prototype.$tran : function (name) {
            return name;
        };
        Vue.prototype.$Validate = Init;
    }
}

