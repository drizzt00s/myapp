Vue.prototype.$jquery = $;
Vue.prototype.$baseUrl = baseRequestUrl+ '&region=checkout&time=' + new Date().getTime();
Vue.prototype.$securityToken = secretToken ? secretToken : '';

Vue.prototype.$siteInfo = siteInfo ? siteInfo : {};
Vue.prototype.$baseRouter = baseRouter ? baseRouter : '';
Vue.prototype.$globalLink = global_link ? global_link : "";
Vue.prototype.$process_link = process_link ? process_link : "";
Vue.prototype.$tax_exmption_link = tax_exmption_link ? tax_exmption_link : '';
Vue.prototype.$quoteLink = quoteLink;
Vue.prototype.$currentPage = typeof current_page !='undefined' ? current_page : 'checkout';
Vue.prototype.$quotesDetailsLink = typeof quotesDetailsLink !='undefined' ? quotesDetailsLink : '';
/**
 * 下拉组件
 */
Vue.component('slide-down', {
    template: '<transition v-on:before-enter="beforeEnter"' +
        '      v-on:enter="enter" v-on:after-enter="afterEnter"' +
        '      v-on:enter-cancelled="enterCancelled"' +
        '      v-on:before-leave="beforeLeave"' +
        '      v-on:leave="leave"' +
        '      v-on:after-leave="afterLeave" ' +
        '      v-on:leave-cancelled="leaveCancelled">' +
        '      <slot></slot>' +
        '  </transition>',
    methods: {
        beforeEnter: function (el) {
            el.className = el.className + " slide-down";
            el.style.height = "0";
        },
        enter: function (el) {
            el.style.height = el.scrollHeight + "px";
        },
        afterEnter: function (el) {
            el.className = el.className.replace("slide-down", "");
            el.style.height = "";
        },
        enterCancelled: function (el) {
        },
        beforeLeave: function (el) {
            el.style.height = el.scrollHeight + "px";
        },
        leave: function (el) {
            var ht = el.scrollHeight;
            el.className = el.className + " slide-down";
            el.style.height = 0;
        },
        afterLeave: function (el) {
            el.className = el.className.replace("slide-down", "");
            el.style.height = "";
        },
        leaveCancelled: function (el) {
        }
    }
})
/**
 * 注册语言包翻译
 *
 * @param name
 * @returns {string}
 */
Vue.prototype.$tran = function (name) {
    return languagePack && typeof languagePack[name] != 'undefined'
    && languagePack[name] ? languagePack[name] : "";
};
/**
 *  获取当前客户端类型
 */
Vue.prototype.$getClient = function () {
    var ua = navigator.userAgent,
        isWindowsPhone = /(?:Windows Phone)/.test(ua),
        isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
        isAndroid = /(?:Android)/.test(ua),
        isFireFox = /(?:Firefox)/.test(ua),
        isChrome = /(?:Chrome|CriOS)/.test(ua),
        isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
        isPhone = /(?:iPhone)/.test(ua) && !isTablet,
        isPc = !isPhone && !isAndroid && !isSymbian;
    if (isAndroid || isPhone) {
        wap_tap = "phone";
    } else {
        wap_tap = "pc";
    }
    return wap_tap;
};
/**
 * 判断变量是否存在
 * @param name
 * @returns {boolean}
 */
Vue.prototype.$isset = function (name) {
    switch (this.$jquery.type(name)) {
        case 'undefined':
            return false;
        case 'number':
            return name ? true : false
        case 'string':
            return this.$jquery.trim(name) ? true : false;
        case 'array':
            return name.length ? true : false;
        case 'object':
            return Object.keys(name).length ? true : false;
        case 'boolean':
            return name;

    }
    return true;
}
//注册 表单验证规则
Vue.prototype.$validateRule = validateRule ? validateRule : {};
/**
 * 格式化当前地址
 *
 * @param billingAddress 所有账单地址
 * @param shippingAddress 所有运输地址
 * @param addressType 编辑类型
 * @param currentItem 当前编辑地址信息
 * @param action 数据更新方式 delete edit create
 * @returns {addressType: *, shippingAddress: {}, billingAddress: {}}}
 */
Vue.prototype.$formatAddressResult = function (billingAddress, shippingAddress, orderInfo, currentItem, addressType, action) {
    var result = {
        addressType: addressType,
        billingAddress: billingAddress ? billingAddress : {},
        shippingAddress: shippingAddress ? shippingAddress : {},
        orderInfo: orderInfo ? orderInfo : {},
        currentItem: currentItem,
        action: action
    };
    return result;
}
/**
 * 注册错误提示
 * @param content
 */
Vue.prototype.$showMessage = function (content) {
    $(".ui_fixed_alert .new_checkout_txt01").html(content);
    if($(".error_message_show").is(":visible")){
        return false;
    }
    var index = layer.open({
        type: 1,
        title: false,
        skin: 'layui-layer-demo',
        content: $(".error_message_show"),
        closeBtn: 0,
        shadeClose: true,
        area: '680px'
    });
};
/**
 * 登录过期处理
 */
Vue.prototype.$expiredLogin = function () {
    layer.open({
        type: 1,
        title: false,
        closeBtn: 0,
        shadeClose: true,
        area: "480px",
        skin: 'yourclass',
        content: $(".login_out_fixed")
    });
}
/**
 * 站点锁定
 *
 * @param item
 * @returns {{isLock: boolean, lockTip: string}}
 */
Vue.prototype.$siteLock = function (item) {
    var result = {
        'isLock': false,
        'lockTip': ''
    };
    if (this.addressType !== 0) {
        return result;
    }
    var siteInfo = this.$siteInfo;
    var currency = siteInfo['currency'];
    var language_code = siteInfo['language_code'];
    var country_id = parseInt(item.entry_country_id);
    var company = item.company_type;
    //站点不为澳大利亚,当前地址国家为澳大利亚锁定
    if(this.$currentPage == 'quote'){
        var link_name = 'quotes_create'
    }else{
        var link_name = 'checkout'
    }
    if ((language_code != 'au' && country_id === 13) || (country_id === 13 && currency != 'AUD')) {
        result.isLock = true;
        var url = ' <a <a onclick="news_choose_country_second(\'au\', \'AUD\',\'au\')"' +
            ' href="javascript:void(0)">' + this.$tran("address_lock_australia_1") + '</a>'
        result.lockTip = this.$tran('address_lock_australia_2') + url + " " + this.$tran('address_lock_australia_3');
    }
    //美国站点锁定
    if ((language_code != 'en' && country_id === 223) || (country_id === 223 && currency != 'USD')) {
        result.isLock = true;
        var url = ' <a onclick="news_choose_country_second(\'us\', \'USD\',\'en\')"' +
            ' href="javascript:void(0)">' + this.$tran("address_lock_us_1") + '</a>'
        result.lockTip = this.$tran('address_lock_us_2') + url + " " + this.$tran('address_lock_us_3');
    }
    //俄罗斯站点锁定
    if ((country_id === 176 && currency != 'RUB' && company == 'BusinessType')) {
        result.isLock = true;
        var url = ' <a onclick="news_choose_country_second(\'ru\', \'RUB\',\'ru\')"' +
            ' href="javascript:void(0)"> ' + this.$tran("address_lock_ru_1") + '</a>'
        if (language_code == 'en') {
            url = ' <a onclick="news_choose_country_second(\'ru\', \'RUB\',\'en\')"' +
                ' href="javascript:void(0)"> ' + this.$tran("address_lock_ru_1") + '</a>'
        }
        result.lockTip = this.$tran('address_lock_ru_2') + url + " " + this.$tran('address_lock_ru_3');
    }
    //中国站点锁定
    if (country_id === 44 && cnLimitProducts.length != 0) {
        result.isLock = true;
        var url = '<a href="'+shoppingCartLink+'"> ' + this.$tran('address_lock_cn_2') + '</a>';
        result.lockTip = this.$tran('address_lock_cn_1') + url + this.$tran('address_lock_cn_3');
    }
    return result;
}
//欧洲仓 国家注入
Vue.prototype.$eu_code = EU_code;
Vue.prototype.$eu_country = EU_country;
Vue.prototype.$other_eu_country = other_eu_country;
Vue.prototype.$other_eu_country_code = other_eu_country_code;
//税号验证方法注入
Vue.use(checkoutValidate);
/**
 * type 0 运输地址 2 账单地址
 * status 1 开启 0 关闭
 * @param type
 */
Vue.prototype.$loading = function (type, status) {
    var obj = "";
    switch (type) {
        //运输地址loading
        case 0:
            obj = $(".shippingAddressLoading");
            break;
        //账单地址loading
        case 2:
            obj = $(".billingLoading");
            break;
        //新增cash loading
        case 3:
            obj = $(".cashLoading");
            break;
        //俄罗斯对公支付
        case 4:
            obj = $(".alfaBox");
            break;
        case 5:
            obj = $('.cashEditLoading');
            break;
        case 6:
            obj = $('.shareLoading');
            break;
        //全局loading
        case 7:
            obj = $('.global');
            break;
        case 8:
            //shipping  loading
            obj = $('.shippingLoading')
            break;
    }
    if (status === 1 && obj) {
        obj.show();
    } else {
        obj.hide();
    }
};
//注册报价inquiry id
Vue.prototype.$quotes_id = typeof quotes_id != 'undefined' ? parseInt(quotes_id) : 0;
Vue.prototype.$inquiry_id = typeof inquiry_id !='undefined' ? parseInt(inquiry_id) : 0 ;

var vue = new Vue({
    el: "#app",
    mixins: typeof mixin != "undefined" && typeof mixin=='object' ? [mixin] : [],
    data: {
        //表单动画效果animate时间
        animateDuration: {
            'animation-duration': '0.01s'
        },
        //运输地址列表
        shippingAddress: shippingAddress,
        //账单地址列表
        billingAddress: billingAddress,
        //是否展示地址列表弹窗 class绑定
        addressListPopup: {
            'public-popup': true,
            'showPopup': false
        },
        //账单地址编辑弹窗
        billingAddressPopup: {
            'public-popup': true,
            'showPopup': false
        },
        //当前默认运输地址id
        currentShippingId: currentShippingId,
        //当前默认账单地址
        currentBillingId: currentBillingId,
        //当前选中运输地址id
        currentShippingChoiceId: currentShippingId,
        //当前选中账单地址id
        currentBillingChoiceId: currentBillingId,
        //  空地址提示弹窗
        emptyAddressTip : false,
        //  分单数量
        orderNum : 0,
        //当前编辑地址信息,form表单渲染使用
        currentEditAddressInfo: {},
        //是否选中使用运输地址作为账单地址
        isChoiceShippingAddressAsBilling: isUseShipping,
        //是否使用运输地址作为账单地址,修改新增 确认账单地址后 才会更改此值状态
        isUseShippingAddressAsBilling: isUseShipping,
        //语言包
        languagePack: {},
        //是否展示运输地址编辑form
        isShowShippingEditForm: false,
        //是否展示账单地址form
        isShowBillingEditForm: false,
        //当前编辑地址表单类型 0 编辑运输地址  2 编辑账单地址
        addressType: 0,
        //当前地址编辑动作 1. 新增地址 2.更新地址
        editAction: 0,
        //po 地址:
        purchaseAddress: [],
        originPaymentLimit: [],
        //支付方式限制
        paymentLimit: paymentLimit,
        //当前选中的支付方式
        currentChoicePayment: defaultPayment ? defaultPayment : 'hsbc',
        //资源图片路径
        imgLink: imgLink,
        //po 订单信息
        poInfo: poInfo,
        //订单信息
        orderInfo: orderInfo,
        //electronic check 表单信息
        echeckInfo: {
            'account_name': '',
            'account_number': '',
            'account_type': 1,
            'account_number_confirm': '',
            'account_route': ''
        },
        //echck验证规则
        echeckInfoValidateRule: echeckValidateRule ? echeckValidateRule : {},
        alfaInfo: alfaInfo,
        defaultAlfaInfoId: defaultAlfaInfoId,
        //alfa 弹窗展示
        isShowCashEdit: false,
        //当前alfa 数据
        currentCashInfo: {},
        //当前alfa 操作类型 1.编辑 2.新增
        cashAction: 2,
        //cashValidateRule cash 验证规则
        cashValidateRule: cashRule,
        //alfa 弹窗上传展示
        isShowCashUpload: false,
        //alfa 弹窗表单展示
        isShowCashForm: false,
        //alfa 新增弹窗
        isShowCashAddPopup: false,
        //是否展示composeite
        isShowComposite: true,
        //是否展示运输方式列表
        isShowShipping: {
            local: false,
            delay: false
        },
        //是否隐藏子单的价格信息
        showChildOrder: false,
        //alfa 当前选中上传类型
        currentChoiceCashType: 2, //1 form 2 upload
        //订单价格信息
        priceInfo: priceInfo,
        //separateInfo 分仓信息
        separateInfo: {},
        //是否展示share shipping news弹窗 class绑定
        shareShippingPopup: {
            'public-popup': true,
            'showPopup': false
        },
        //分享数据
        shareList: [
            {
                name: "",
                email: "",
                name_error: "",
                email_error: ""
            }
        ],
        //默认运输方式
        defaultShippingInfo: {
            local: {},
            delay: {}
        },
        //comments 字段
        comments: {
            local: "",
            delay: ""
        },
        //自提以及custom 数据
        selectrelate: {
            local: {
                own: {
                    form: {
                        select: "",
                        express_account: ""
                    },
                    error: {
                        select: "",
                        express_account: ""
                    }
                },
                pick: {
                    form: {
                        phone: "",
                        email: "",
                        contact: ""
                    },
                    error: {
                        phone: "",
                        email: "",
                        contact: "",
                        time: ""
                    }
                }

            },
            delay: {
                own: {
                    form: {
                        select: "",
                        express_account: ""
                    },
                    error: {
                        select: "",
                        express_account: ""
                    }
                },
                pick: {
                    form: {
                        phone: "",
                        email: "",
                        contact: ""
                    },
                    error: {
                        phone: "",
                        email: "",
                        contact: "",
                        time: ""
                    }
                }

            },
        },
        customData: {
            local: {},
            delay: {}
        },
        //无运输地址默认数据
        originProductData: originProductData,
        //isCanpay 是否能够支付
        isCanPay: true,
        //ticketInfo
        ticketInfo: '',
        //poNumber
        poNumber: '',
        //cartCount:
        cartCount: cartCount,
        //电话号码
        phone: phone,
        //是否展示顶部导航
        isShowTopNav: false,
        //购物车链接
        shoppingCartLink: shoppingCartLink,
        //是否有效po数据
        isValidPo: true,
        isValidTicket: true,
        //是否站点锁定错误
        isSiteLockError: false,
        //是否展示税收说明
        isShowTaxPopup: false,
        //是否展示欧洲税收弹窗
        isShowTaxEuPopup: false,
        //是否展示奥大利亚
        isShowTaxAuPopup: false,
        //quote subtotal:
        quote_subtotal : typeof quote_subtotal!='undefined' ? quote_subtotal : 0,
        //quote 金额发生变更时出现此弹窗s
        isShowQuoteError: false,
        //是否显示提示指南
        isShowGuid: typeof isShowGuid !='undefined' ? isShowGuid : false,
        //用户id
        customer_id: typeof customer_id != 'undefined' ? customer_id : 0,
        //账单地址验证是否通过
        isValidAddress: true,
        //是否被中国大陆限制
        isChinaLimit: false,
        //被限制产品
        cnLimitProducts: typeof cnLimitProducts =='object' ? cnLimitProducts : [],
        //控制显示的认证图标
        icon_show: typeof icon_show !='undefined' ? icon_show : 'ssl',
        is_sg: typeof is_sg !='undefined' ? is_sg : false
    },
    created: function () {
        if (this.$isset(currentOrderInfo)) {
            this.separateWarehouse(
                currentOrderInfo.product_info,
                currentOrderInfo.shipping_data,
                this.orderInfo.warehouse,
                this.phone
            );
        }
        this.originPaymentLimit = this.$jquery.extend(true, {}, this.paymentLimit);
    },
    mounted: function() {
        var _this = this
        this.$nextTick(function () {
            document.querySelector('body').addEventListener('click', this.clickHide);
            $("#commonTime").datetimepicker({
                closeOnDateSelect: true,
                onChangeDateTime: function (ct, el) {
                    var type = el.data("type");
                    if (ct) {
                        _this.selectrelate[type].pick.error.time = ""
                    } else {
                        _this.selectrelate[type].pick.error.time = _this.$tran('delivery_time_required');
                    }
                }
            });
        })
        var currentAddressInfo = this.currentAddressInfo(0);
        var currentBillingAddressInfo = this.currentAddressInfo(2);

        if (this.$isset(currentAddressInfo)) {
            var address_id = currentAddressInfo.address_book_id;
            var country_id = parseInt(currentAddressInfo.entry_country_id);
            //美国站点自动确认地址,并且自动识别站点是否被锁定
            if (country_id === 223) {
                this.confirmShippingAddress(address_id, 0, 7);
            } else if(country_id === 44 &&  this.$isset(this.cnLimitProducts)){
                this.$showMessage(_this.$tran('cn_limit_ads_tips'));
                this.isChinaLimit = true;
            } else {
                //检测当前地址是否被站点锁定
                var addressInfo = this.currentAddressInfo(0);
                if (this.$isset(addressInfo)) {
                    var checkSite = this.$siteLock(addressInfo);
                    if (checkSite['isLock']) {
                        this.$showMessage(checkSite['lockTip']);
                        this.isSiteLockError = true;
                        return;
                    }
                }
                this.asyncQuoteShipping();
            }
        }
        if(this.$isset(currentBillingAddressInfo)){
            var currentBillingCompanyType = currentBillingAddressInfo['company_type'] ?
                currentBillingAddressInfo['company_type'] :"";
            if(this.$jquery.inArray(currentBillingCompanyType,['IndividualType', 'BusinessType'])==-1){
                this.$showMessage(_this.$tran('ads_type_validate'));
                this.isValidAddress = false;
            }
        }
    },
    beforeDestroy:function() {
        document.querySelector('body').removeEventListener('click', this.clickHide);
        $('#commonTime').datetimepicker('destroy');
    },
    computed: {
        //中国仓产品限制提示
        showChinaLimitTip: function () {
            return function (product_id) {
                var currentAddressInfo = this.currentAddressInfo(0);
                if ((typeof product_id != "string" && typeof product_id != "number") || !this.$isset(currentAddressInfo)) {
                    return false;
                }
                var country_id = parseInt(currentAddressInfo.entry_country_id);
                return country_id === 44 && this.cnLimitProducts.indexOf(product_id) !== -1
            }
        },
        //新加坡gsp 税收表达
        showGspDes: function () {
            return function (index) {
                try {
                    var addressInfo = this.currentAddressInfo(0);
                    var country_id = 0;
                    if(this.$isset(addressInfo)){
                        country_id = addressInfo.entry_country_id;
                    }
                    var separateInfo = this.separateInfo.info;
                    if (country_id == 188 && index == 'delay' && typeof separateInfo != 'undefined'
                        && Object.keys(separateInfo).length > 1) {
                        return this.$tran('Gst_Excluded');
                    }
                    return '';
                } catch (e) {
                    return '';
                }
            }
        },
        issetQuote: function(){
           return this.$isset(this.$quotes_id) || this.$isset(this.$inquiry_id)
        },
        //税收信息表达
        taxDescription: function () {
            var warehouse = this.orderInfo.warehouse;
            var address = this.currentAddressInfo(0);
            var result = {
                'title': '',
                'content': '',
                'show': '',
                'type': 0
            };
            if (this.$isset(address)) {
                var country_id = parseInt(address.entry_country_id);
                var company_type = address.company_type;
                //var country_name = address.entry_country_name ? address.entry_country_name : ''
                switch (warehouse) {
                    //美国仓
                    case 40:
                        if (country_id != 223) {
                            if(this.$jquery.inArray(country_id, [38,138]) == -1){
                                return result;
                            }
                            var trans_content = this.$tran('tax_us_warehouse_content');
                            //trans_content = trans_content.replace('$COUNTRY', country_name);
                            result = {
                                'show': this.$tran('tax_us_warehouse_show'),
                                'title': this.$tran('tax_us_warehouse_title'),
                                'content': trans_content,
                                'type': 1
                            }
                        }else{
                            result = {
                                'show': this.$tran('applyForException'),
                                'title': this.$tran(''),
                                'content': this.$tran(''),
                                'type': 4
                            }
                        }
                        break;
                    //  德国仓
                    case 20:
                        if (this.isShowVat(this.priceInfo.vat)){
                            result = {
                                'show': this.$tran('tax_warehouse_de_include_local_show'),
                                'type': 2,
                                'title': this.$tran('tax_warehouse_de_include_title'),
                                'content': this.$tran('tax_warehouse_de_inc_description'),
                            }
                        } else {
                            result = {
                                'show': this.$tran('tax_warehouse_de_excluding_local_show'),
                                'type': 2,
                                'title': this.$tran('tax_warehouse_de_excluding_title'),
                                'content': this.$tran('tax_warehouse_de_exc_description'),
                            }
                        }
                        break;
                    //澳大利亚
                    case 37:
                        if (country_id == 153) {
                            result = {
                                'show': this.$tran('tax_nz_warehouse_show'),
                                'title': this.$tran('tax_nz_warehouse_title'),
                                'content': this.$tran('tax_nz_warehouse_content'),
                                'type': 1
                            }
                        } else {
                            result = {
                                'show': this.$tran('tax_au_warehouse_show'),
                                'title': this.$tran('tax_au_warehouse_title'),
                                'content': '',
                                'type': 3
                            }
                        }
                        break;
                    //新加坡
                    case  71:
                        if (country_id == 188) {
                            if (this.orderNum == 1 && this.isShowVat(this.priceInfo.vat)) {
                                result = {
                                    'show': this.$tran('tax_sg_warehouse_show'),
                                    'title': this.$tran('tax_sg_warehouse_title'),
                                    'content': this.$tran('tax_sg_warehouse_content'),
                                    'type': 1
                                }
                            } else {
                                result = {
                                    'show': this.$tran('tax_sg_split_show'),
                                    'title': this.$tran('tax_sg_split_title'),
                                    'content': this.$tran('tax_sg_split_content'),
                                    'type': 1
                                }
                            }
                        } else {
                            result = {
                                'show': this.$tran('tax_sg_other_show'),
                                'title': this.$tran('tax_sg_other_title'),
                                'content': this.$tran('tax_sg_other_content'),
                                'type': 1
                            }
                        }
                        break;
                    //俄罗斯
                    case 67:
                        if (company_type == 'IndividualType') {
                            result = {
                                'show': this.$tran('tax_ru_warehouse_private_show'),
                                'title': this.$tran('tax_ru_warehouse_private_title'),
                                'content': this.$tran('tax_ru_warehouse_private_content'),
                                'type': 1
                            }
                        } else {
                            result = {
                                'show': this.$tran('tax_ru_warehouse_public_show'),
                                'title': this.$tran('tax_ru_warehouse_public_title'),
                                'content': this.$tran('tax_ru_warehouse_public_content'),
                                'type': 1
                            }
                        }
                        break;
                    //中国
                    case 2:
                        result = {
                            'show': this.$tran('tax_cn_warehouse_show'),
                            'title': this.$tran('tax_cn_warehouse_title'),
                            'content': this.$tran('tax_cn_warehouse_content'),
                            'type': 1
                        }
                        break;
                }
            }
            return result;
        },
        //自提信息表达
        pickUpWarehouseDescription: function () {
            var warehouse = this.orderInfo.warehouse;
            str = '';
            switch (warehouse) {
                case 37:
                    str = this.$tran('pick_up_au');
                    break;
                case 20:
                    str = this.$tran('pick_up_de');
                    break;
                case 71:
                    str = this.$tran('pick_up_sg');
                    break;
                case 40:
                    str = this.$tran('pick_up_us');
                    break;
            }
            return str;
        },
        //购物车数量表达
        cartItems: function () {
            return this.cartCount > 1 ? this.$tran('cartItems') : this.$tran('cartItem')
        },
        //是否展示税收信息
        isShowVat: function () {
            return function (vat) {
                var currentInfo = this.currentAddressInfo(0);
                var isFoceHide = false;
                if(typeof vat == 'undefined'){
                    vat = priceInfo.vat
                }
                if(this.$isset(currentInfo)){
                    var entry_country_id = parseInt(currentInfo.entry_country_id);
                    if(entry_country_id !== 223 && vat == 0){
                        isFoceHide = true;
                    }

                }
                if (!this.priceInfo.is_vax || this.isShowAfterTax || isFoceHide) {
                    return false;
                }
                return true;
            }
        },
        //是否为澳大利亚税后价格
        isShowAfterTax: function () {
            var data = this.currentAddressInfo(0);
            if (this.$isset(data)) {
                var entry_country_id = parseInt(data.entry_country_id);
                if (entry_country_id == 13) {
                    return true;
                }
                return false;
            }
        },
        //是否隐藏子单数据
        isShowOrder: function () {
            return function (index) {
                if (index === 'local' && !this.showChildOrder) {
                    return false;
                }
                return true;
            }
        },
        //判断当前订单是否可以提交
        isValidOrder: function () {
            //如果地址为空
            if (!this.currentBillingId || !this.currentShippingId) {
                return false;
            }
            //选择支付方式为空
            if (!this.currentChoicePayment) {
                return false;
            }
            //po 以及ticketinfo 检测
            if (!this.isValidPo || !this.isValidTicket) {
                return false
            }
            //站点错误检测,如果当前站点被锁定
            if (this.isSiteLockError) {
                return false;
            }
            //是否能够支付,用与loading 加载时,限制客户直接操作
            if (!this.isCanPay) {
                return false;
            }

            //地址是否有效
            if(!this.isValidAddress){
                return false;
            }
            //是否存在被中国大陆限制的产品
            if(this.isChinaLimit){
                return false;
            }
            return true;
        },
        //获取第一条4运费数据
        getFirstShippingData: function () {
            return function (shipping_data, tag) {
                if (this.$isset(shipping_data)) {
                    if (this.$isset(this.defaultShippingInfo[tag])) {
                        return this.defaultShippingInfo[tag];
                    }
                    var shipping = this.getShippingData(shipping_data, tag)['data'];
                    return this.$isset(shipping[0]) ? shipping[0] : {}
                }
                return {};
            }
        },
        //根据订单标记获取子单信息
        getShippingData: function () {
            return function (shipping_data, tag) {
                if (!this.showChildOrder) {
                    return {
                        'tag': 'local',
                        'data': shipping_data['local'] ? shipping_data['local'] : {}
                    }
                }
                return {'tag': tag, 'data': shipping_data[tag] ? shipping_data[tag] : {}}
            }
        },
        gspDescription: function () {
            var currentInfo = this.currentAddressInfo(0);
            var text = this.$tran('other_gsp_des');
            if (this.$isset(currentInfo)) {
                var entry_country_id = parseInt(currentInfo['entry_country_id']);
                if (entry_country_id === 223) {
                    text = this.$tran('us_gsp_des');
                }
            }
            return text;
        },
        //purchase 订单信息
        purchaseInfo: function () {
            return {
                'customer_pay_day': this.poInfo.customer_pay_day ? this.poInfo.customer_pay_day : 0,
                'is_frozen': this.poInfo.is_frozen ? this.poInfo.is_frozen : false
            };
        },
        //银行转账信息
        bankInfo: function () {
            //订单仓库
            var warehouse = this.orderInfo.warehouse ? parseInt(this.orderInfo.warehouse) : 40;
            var current = this.currentAddressInfo(0);
            var entry_country_id = 0;
            var currency = this.$siteInfo['currency'];
            if (this.$isset(current) && current.entry_country_id) {
                entry_country_id = parseInt(current.entry_country_id);
            }
            var bankInfo = {
                'payment_title': '',
                'details': []
            };
            switch (warehouse) {
                //澳洲仓
                case 37:
                    bankInfo = this.$tran('payment_au_policy_hsbc');
                    break;
                //新加坡
                case 71:
                    bankInfo = this.$tran('payment_sg_policy_hsbc');
                    if(currency == 'USD'){
                        bankInfo = this.$tran('payment_sg_usd_policy_hsbc');
                    }
                    break;
                //美国覆盖国家
                case 3:
                case 40:
                case 2:
                    if (this.$jquery.inArray(entry_country_id, [223, 172, 38, 138]) !== -1) {
                        if (this.$jquery.inArray(entry_country_id, [223, 172]) !== -1) {
                            bankInfo = this.$tran('payment_us_ach_policy_hsbc');
                        } else {
                            bankInfo = this.$tran('payment_us_no_ach_policy_hsbc')
                        }

                    } else {
                        bankInfo = this.$tran('payment_us_hsbc_policy_hsbc');
                    }
                    break;
                //欧洲仓覆盖国家
                case 20:
                    switch (currency) {
                        case "GBP":
                            bankInfo = this.$tran('payment_gb_policy_hsbc');
                            break;
                        case "CHF":
                            bankInfo = this.$tran('payment_chf_policy_hsbc');
                            break;
                        case "SEK":
                            bankInfo = this.$tran('payment_sek_policy_hsbc');
                            break;
                        case "USD":
                            bankInfo = this.$tran('payment_usd_policy_hsbc');
                            break;
                        default:
                            bankInfo = this.$tran('payment_de_policy_hsbc');
                            break;
                    }
                    break;
            }
            return bankInfo;
        },
        //银行转账名称获取
        bankName: function () {
            var entry_country_id = 0;
            var result = {
                'name': this.$tran('bank_name_us'),
                'icon': this.imgLink + 'includes/templates/fiberstore/images/payment_method/checkout_Wire.svg'
            };
            var current = this.currentAddressInfo(0);
            if (this.$isset(current) && current.entry_country_id) {
                entry_country_id = parseInt(current.entry_country_id);
            }
            if (this.$jquery.inArray(entry_country_id, [13, 153]) !== -1) {
                //澳大利亚新西兰
                result = {
                    'name': this.$tran('bank_name_au'),
                    'icon': this.imgLink + 'includes/templates/fiberstore/images/payment_method/Direct_deposit.svg'
                };
            } else if (this.$jquery.inArray(entry_country_id, [81, 14, 122, 124, 204]) !== -1) {
                //德国
                result = {
                    'name': this.$tran('bank_name_us'),
                    'icon': this.imgLink + 'includes/templates/fiberstore/images/payment_method/checkout_Vorkasse_de.svg'
                };
            } else if (this.$jquery.inArray(entry_country_id, [223, 172, 38, 138]) !== -1) {
                //美国加拿大 墨西哥
                var name = this.$jquery.inArray(entry_country_id, [38, 138]) !== -1 ? this.$tran('bank_name_ach_ca') :
                    this.$tran('bank_name_ach')
                result = {
                    'name': name,
                    'icon': this.imgLink + 'includes/templates/fiberstore/images/payment_method/check-wire-transfer.svg'
                };
            }
            return result;
        },
        creditImages: function () {
            var imgs = '';
            for (var i = 1; i <= 9; i++) {
                if (this.$siteInfo['countries_iso_code_2'] != 'nz' && this.$siteInfo['language_code'] == 'au') {
                    if (this.$jquery.inArray(i, [5, 7, 8, 9]) != -1) {
                        continue;
                    }
                }
                var link = this.imgLink + 'includes/templates/fiberstore/images/payment_method/Credit-0' + i + '.svg';
                imgs += "<img src='" + link + "'>";
            }
            return imgs;
        },
        shippingButtonType: function () {
            if (this.$isset(this.shippingAddress)) {
                return this.$tran('address_change');
            } else {
                return this.$tran('address_add');
            }
        },
        //当前支付方式展示状态
        paymentStatus: function () {
            return function (method) {
                return method === this.currentChoicePayment
            }
        },
        /**
         * add change address 文字表达
         *
         * @returns {*}
         */
        billingButtonType: function () {
            if (this.$isset(this.billingAddress)) {
                return this.$tran('address_change');
            } else if (this.currentShippingId && this.$isset(this.shippingAddress)) {
                return this.$tran('address_change');
            } else {
                return this.$tran('address_add');
            }
        },
        /**
         * 地址格式格式化输出
         * @returns {function(*): *}
         */
        addressFormat: function () {
            return function (addressItem) {
                if (this.$isset(addressItem)) {
                    var entry_street_address = addressItem.entry_street_address ? addressItem.entry_street_address : '';
                    var entry_suburb = addressItem.entry_suburb ? ", " + addressItem.entry_suburb : '';
                    var entry_city = addressItem.entry_city ? ", " + addressItem.entry_city : '';
                    var entry_state = addressItem.entry_state ? ", " + addressItem.entry_state : "";
                    var entry_postcode = addressItem.entry_postcode ? ", " + addressItem.entry_postcode : '';
                    var entry_country_name = addressItem.entry_country_name ? ", " + addressItem.entry_country_name : '';
                    return entry_street_address + entry_suburb + entry_city +
                        entry_state + entry_postcode + entry_country_name;

                }
                return '';
            }
        },
        /**
         * 格式化用户姓名拼接
         */
        addressNameFormat: function () {
            return function (addressItem) {
                if (this.$isset(addressItem)) {
                    var entry_firstname = addressItem.entry_firstname ? addressItem.entry_firstname : '';
                    var entry_lastname = addressItem.entry_lastname ? addressItem.entry_lastname : '';
                    var companyName = addressItem.entry_company ? addressItem.entry_company : "";
                    companyName = companyName.length > 30 ? companyName.substring(0, 30) + "..." : companyName;
                    companyName = companyName ? " | " + companyName : '';
                    return entry_firstname + " " + entry_lastname + companyName;
                }
                return '';
            }
        },
        /**
         * 获取当前默认地址信息
         *
         * @param type 0 运输地址 2 账单地址
         * @returns {function(*): Array}
         */
        currentAddressInfo: function () {
            return function (type, address_book_id) {
                var addressList = type === 0 ? this.shippingAddress : this.billingAddress;
                var currentId = type === 0 ? this.currentShippingId : this.currentBillingId;
                if (this.$jquery.type(address_book_id) != 'undefined' && address_book_id) {
                    currentId = address_book_id;
                }
                var current = [];
                for (var i = 0; i < addressList.length; i++) {
                    if (parseInt(addressList[i]['address_book_id']) === parseInt(currentId)) {
                        current = addressList[i];
                        break;
                    }
                }
                //如果当前地址为账单地址,但是没有查询到账单地址信息,去运输地址里面查询(客户会使用运输地址作为账单地址)
                if (type === 2 && current.length === 0) {
                    for (var i = 0; i < this.shippingAddress.length; i++) {
                        if (parseInt(this.shippingAddress[i]['address_book_id']) === parseInt(currentId)) {
                            current = this.shippingAddress[i];
                            break;
                        }
                    }
                }
                return current;
            }
        },
        shareListNum: function () {
            var num = 0;
            this.shareList.forEach(function (item) {
                if (item.name && item.email && (/^[ \w\.\-\+]+\@[\w\.\-\+]+\.[\w\.\-]+$/.test(item.email))) {
                    num += 1
                }
            });
            return num
        },
        shipping_popup_title: function () {
            var str = "";
            if (this.addressType === 0) {
                if (this.editAction === 0) {
                    str = this.$tran('choose_shipping_address')
                } else if (this.editAction === 1) {
                    str = this.$tran('add_shipping_address')
                } else if (this.editAction === 2) {
                    str = this.$tran('edit_shipping_address')
                }
            } else if (this.addressType === 2) {
                if (this.editAction === 0) {
                    str = this.$tran('choose_billing_address')
                } else if (this.editAction === 1) {
                    str = this.$tran('add_billing_address')
                } else if (this.editAction === 2) {
                    str = this.$tran('edit_billing_address')
                }
            }
            return str
        }
    },
    methods: {
        closeQuoteError: function(){
          window.location.reload();
        },
        //新版quote 流程同步quote运输方式
        asyncQuoteShipping : function(){
            if(!this.$isset(this.$quotes_id)){
                return;
            }
            //初始化默认运费
            if(typeof defaultShippingInfo !='undefined'){
                this.defaultShippingInfo = defaultShippingInfo;
            }
            if(typeof customData !='undefined' && typeof customData == 'object'){
                this.customData = customData;
            }
            if(typeof shipping_method_param_json !='undefined'){
                try{
                    var trans = shipping_method_param_json;
                    if(typeof trans == 'object' && this.$isset(trans)){
                        this.selectrelate = trans;
                    }
                }catch (e) {
                    console.log(e);
                }
            }
            try{
                var selfData = this.selectrelate;
                if(typeof selfData!='undefined' && typeof selfData == 'object'){
                    if(typeof selfData['local']!='undefined' &&
                        typeof selfData['local']['pick']!='undefined' && selfData['local']['pick']['form']['time']){
                        this.$jquery('.pick_timelocal').val(selfData['local']['pick']['form']['time']);
                    }
                }
                if(typeof selfData!='undefined' && typeof selfData == 'object'){
                    if(typeof selfData['delay']!='undefined' &&
                        typeof selfData['delay']['pick']!='undefined' && selfData['delay']['pick']['form']['time']){
                        this.$jquery('.pick_timedelay').val(selfData['delay']['pick']['form']['time']);
                    }
                }
            }catch (e) {
                console.log(e);
            }
        },
        //展示税收弹窗
        showTaxPopup: function () {
            var info = this.taxDescription;
            if (info.type == 1) {
                this.isShowTaxPopup = true;
                document.body.style.overflow='hidden';
            } else if (info.type == 2) {
                this.isShowTaxEuPopup = true;
                document.body.style.overflow='hidden';
            } else if (info.type == 3) {
                this.isShowTaxAuPopup = true;
                document.body.style.overflow='hidden';
            }else if(info.type ==4){
                window.open(this.$tax_exmption_link);
            }
        },
        //关闭税收弹窗
        closeTaxPopup: function () {
            var info = this.taxDescription;
            if (info.type == 1) {
                this.isShowTaxPopup = false;
            } else if (info.type == 2) {
                this.isShowTaxEuPopup = false;
            } else if (info.type == 3) {
                this.isShowTaxAuPopup = false;
            }
            document.body.style.overflow='';
        },
        showOrCloseTopNav: function () {
            this.isShowTopNav = !this.isShowTopNav;
        },
        //展示运费list
        showShipping: function (type) {
            this.isShowShipping[type] = !this.isShowShipping[type];
        },
        //转换运输方式tag
        transShippingType: function (type) {
            if (!this.showChildOrder && type == 'delay') {
                type = 'local';
            }
            return type;
        },
        //  隐藏提示
        hideTip : function (){
            this.emptyAddressTip = false;
        },
        //生成订单
        createOrder: function () {
            var isValidOrder = this.isValidOrder;
            if (!isValidOrder) {
                this.emptyAddressTip = true;
                return false;
            }
            //检测运输方式 数据
            var flag = this.checkDelivery();
            if (flag.flag) {
                return false;
            }
            var deliveryInfo = {
                'delivery_data': flag.data
            }
            var currentChoicePayment = this.currentChoicePayment;
            //echeck信息
            var echeckInfo = {};
            //poNumber
            var poNumber = this.poNumber;

            //ticketInfo
            var tikectInfo = this.ticketInfo;
            //俄罗斯对公支付信息
            var defaultAlfaInfoId = 0;
            //share 邮件信息
            var shareInfo = {
                shareInfo: this.shareList
            };

            //echeck 信息
            if (currentChoicePayment == 'echeck') {
                echeckInfo = this.echeckInfo;
                var isValid = this.$refs.echeckBox.validate(echeckInfo);
                if (!isValid) {
                    return false;
                }
            }
            //俄罗斯对公支付
            if (currentChoicePayment == 'alfa') {
                defaultAlfaInfoId = this.defaultAlfaInfoId;
                if (!this.$isset(defaultAlfaInfoId)) {
                    this.$showMessage(this.$tran('payment_alfa_empty_error'));
                    return false;
                }
            }
            //comments 数据
            var comments = {
                'comments': this.comments
            };
            var echeckData = {
                'echeckInfo': echeckInfo
            };
            var action = '';
            switch (currentChoicePayment) {
                case 'paypal':
                case 'globalcollect':
                case 'payeezy':
                case 'bpay':
                case 'eNETS':
                case "iDEAL":
                case 'SOFORT':
                case 'YANDEX':
                case 'WEBMONEY':
                    action = 'create_order';
                    break;
                default:
                    action = 'save_customer_po';
            }
            var url = this.$baseUrl + '&ajax_request_action=' + action;
            var _this = this;
            var data = this.$jquery.extend(true, {}, echeckData, comments, shareInfo, deliveryInfo);
            var quote_str = '';
            if(this.$isset(this.$quotes_id)){
                data['quotes_id'] = this.$quotes_id;
                quote_str = "&quotes_id=" + this.$quotes_id;
                data['quote_subtotal'] = this.quote_subtotal;
            }else if(this.$isset(this.$inquiry_id)){
                data['inquiry_id'] = this.$inquiry_id;
                quote_str = "&inquiry_id=" + this.$inquiry_id;
            }
            data['tikectInfo'] = tikectInfo;
            data['poNumber'] = poNumber;
            data['securityToken'] = this.$securityToken;
            data['cart_counts'] = parseInt(this.cartCount);
            data['payment_method'] = currentChoicePayment;
            data['defaultAlfaInfoId'] = defaultAlfaInfoId;
            data['client_type'] = this.$getClient();

            var local_product_current = [];
            var delay_product_current = [];
            if(this.$isset(this.separateInfo.info.local)){
                this.separateInfo.info.local.product.forEach(function (item, key) {
                    local_product_current[key] = {id:item.id, qty:item.qty};
                });
            }
            if(this.$isset(this.separateInfo.info.delay)){
                this.separateInfo.info.delay.product.forEach(function (item, key) {
                    delay_product_current[key] = {id:item.id, qty:item.qty};
                });
            }
            data['products_pages'] = {'local':local_product_current, 'delay':delay_product_current};

            this.$jquery.ajax({
                url: url,
                data: data,
                type: 'post',
                dataType: "json",
                beforeSend: function () {
                    _this.$loading(7, 1);
                },
                success: function (data) {
                    var message = data.message;
                    var status = parseInt(data.status);
                    var result = data.data;
                    switch (status) {
                        case 402:
                            _this.$expiredLogin();
                            _this.$loading(7, 0);
                            break;
                        case 401:
                        case 403:
                        case 406:
                            _this.$showMessage(message);
                            window.location.reload();
                            break;
                        case 409:
                            _this.isShowQuoteError = true;
                            _this.$loading(7, 0);
                            break;
                        case 200:
                            switch (currentChoicePayment) {
                                case 'paypal':
                                    var paramArray = result.params.split('::');
                                    var newParamArray = new Array(100);
                                    for (var i = 0, j = 0, n = paramArray.length; i < n; i++) {
                                        if (-1 != paramArray[i].indexOf('--')) {
                                            var tempArray = paramArray[i].split('--');
                                            newParamArray[j++] = tempArray[0];
                                            newParamArray[j++] = tempArray[1];
                                        }
                                    }
                                    var submit_string = '';
                                    for (var i = 0, n = newParamArray.length; i < n; i += 2) {
                                        if (newParamArray[i]) {
                                            submit_string += '<input type="hidden" name="' + newParamArray[i] + '" value="' + newParamArray[i + 1] + '" />';
                                        }
                                    }
                                    //send order mail
                                    _this.$jquery.ajax({
                                        async: false,
                                        type: "POST",
                                        url: _this.$baseUrl + "&ajax_request_action=send_email",
                                        data: "&orders_id=" + result.o_id + "&securityToken=" + _this.$securityToken + "",
                                        dataType: "text"
                                    });
                                    //go to paypal
                                    _this.$jquery('<form id="paypal_submit_form" method="POST" style="display:none">' + submit_string + '</form>')
                                        .attr({action: result.url}).appendTo('body').submit();
                                    break;
                                case "globalcollect":
                                case "payeezy":
                                    _this.$jquery.ajax({
                                        async: false,
                                        type: "POST",
                                        url: _this.$baseUrl + "&ajax_request_action=send_email&type=gc",
                                        data: "&orders_id=" + result.orders_id + "&securityToken=" + _this.$securityToken + "",
                                        dataType: "text"
                                    });
                                    var redirect = _this.$globalLink + "&req_qreoid=" + result.orders_id +
                                        "&payType=" + currentChoicePayment + quote_str;
                                    window.location.href = redirect;
                                    break;
                                case 'bpay':
                                case 'eNETS':
                                case "iDEAL":
                                case 'SOFORT':
                                case 'YANDEX':
                                case 'WEBMONEY':
                                    //send order mail
                                    _this.$jquery.ajax({
                                        async: false,
                                        type: "POST",
                                        url: _this.$baseUrl + "&ajax_request_action=send_email&type="
                                            + currentChoicePayment,
                                        data: "&orders_id=" + result.o_id + "&securityToken=" + _this.$securityToken + "",
                                        dataType: "text"
                                    });

                                    window.location.href = result.params + quote_str;
                                    break;
                                default:
                                    window.location.href = process_link + quote_str;
                            }
                            break;
                        default:
                            _this.$showMessage(message);
                            _this.$loading(7, 0);
                            break;

                    }
                },
                error: function (e) {
                    //window.reload();
                    _this.$showMessage(_this.$tran('system_busy'));
                     window.location.reload();
                    _this.$loading(7, 0);
                }
            })

        },
        handleDeliverySelect: function (type, item) {
            var trans_type = this.transShippingType(type);
            //"selfreferencezones"  pickup
            //"customzones"
            this.defaultShippingInfo[type] = item;
            if (item.methods == 'customzones') {
                this.customData[type] = item.custom ? item.custom : [];
                this.selectrelate[type].own.form.select = item.custom[0] || "";
            }
            var action = 'change_shipping';
            var url = this.$baseUrl + '&ajax_request_action=' + action;
            var _this = this;
            var data = {};
            if(this.$isset(this.$quotes_id)){
                data['quotes_id'] = this.$quotes_id;
            }else if(this.$isset(this.$inquiry_id)){
                data['inquiry_id'] = this.$inquiry_id;
            }
            data['shipping_type'] = trans_type;
            data['shipping_method'] = item.methods;
            data['securityToken'] = this.$securityToken;
            this.$jquery.ajax({
                url: url,
                data: data,
                type: 'post',
                dataType: "json",
                beforeSend: function () {
                    _this.isCanPay = false;
                    _this.$loading(7, 1);
                },
                success: function (data) {
                    var status = parseInt(data.status);
                    var message = data.message;
                    var result = data.data;
                    switch (status) {
                        case 406:
                        case 403:
                        case 401:
                            _this.$showMessage(message);
                            break;
                        case 402:
                            _this.$expiredLogin();
                            break;
                        case 200:
                            var price = result.info.price_data;
                            _this.updatePrice(price);
                            _this.separateInfo.info[trans_type].title = result.productInfo[trans_type];
                            _this.isCanPay = true;
                            break;
                        default:
                            _this.$showMessage(message);
                    }
                    _this.$loading(7, 0);
                    _this.showShipping(type);
                },
                error: function (e) {
                    _this.$loading(7, 0);
                    _this.$showMessage(_this.$tran('system_busy'));
                }
            })
        },
        clickHide: function () {
            this.isShowShipping = {
                local: false,
                delay: false
            };
        },
        //composite 产品展示隐藏
        slideComposite: function () {
            this.isShowComposite = !this.isShowComposite;
        },
        //监听自组件alfa 选择变化
        choiceAlfaItem: function (item) {
            this.defaultAlfaInfoId = item.id;
        },
        //choicePayment,选择支付方式
        choicePayment: function (paymentMethod) {
            this.currentChoicePayment = paymentMethod
        },
        //展示alfa 编辑表达
        showCashForm: function (item, type) {
            this.currentCashInfo = item;
            this.cashAction = type;
            this.isShowCashEdit = true;
            if (item.type == 1) {
                this.isShowCashForm = true;
            } else {
                this.isShowCashUpload = true;
            }
        },
        //关闭alfa 编辑表单
        closeCashForm: function () {
            this.isShowCashEdit = false;
            this.isShowCashForm = false;
            this.isShowCashUpload = false;
        },
        //展示alfa 新增
        showCashAddPopup: function () {
            this.isShowCashAddPopup = true;
            document.body.style.overflow='hidden';
        },
        //关闭alaf 新增弹窗
        closeCashAddPopup: function () {
            this.isShowCashAddPopup = false;
            document.body.style.overflow='';
        },
        //选择需要 上传 alfa 类型
        changeAlfaChoice: function (type) {
            this.currentChoiceCashType = type;
        },
        //新增cash
        addCashInfo: function () {
            this.saveCashInfo('add');
        },
        //编辑cash
        editCashInfo: function () {
            var type = this.currentCashInfo.type;
            var data = {};
            var contentType = "application/x-www-form-urlencoded; charset=UTF-8";
            var processData = true;
            if (type == 1) {
                data = this.$refs.editCashForm.selfData;
                var check = this.$refs.editCashForm.validate(data);
                if (!check) {
                    return;
                }
                data['primaryKeyId'] = data['id'];
                data['securityToken'] = this.$securityToken;
                data['cashType'] = type;
            } else {
                data = this.$refs.editCashUpload.selfData;
                var formData = new FormData();
                if (this.$refs.editCashUpload.isError) {
                    return;
                }
                if (this.$refs.editCashUpload.fileVal && this.$refs.editCashUpload.fileVal['name']) {
                    contentType = false;
                    processData = false;
                    formData.append("paymentUploadFile", this.$refs.editCashUpload.fileVal);
                } else {
                    this.closeCashForm();
                    return;
                }
                formData.append('primaryKeyId', data['id'])
                formData.append('cashType', 2);
                formData.append('securityToken', this.$securityToken);
                formData.append('card_path', data.card_path);
                data = formData
            }
            var action = 'saveCash';
            var url = this.$baseUrl + '&ajax_request_action=' + action;
            var _this = this;
            this.$jquery.ajax({
                url: url,
                data: data,
                type: 'post',
                dataType: "json",
                contentType: contentType,
                processData: processData,
                beforeSend: function () {
                    _this.$loading(5, 1);
                },
                success: function (data) {
                    var message = data.message;
                    var status = parseInt(data.status);
                    var result = data.data;
                    switch (status) {
                        case 402:
                            _this.$expiredLogin();
                            break;
                        case 401:
                        case 403:
                        case 406:
                            _this.$showMessage(message);
                            break;
                        case 200:
                            _this.alfaInfo = data.data;
                            //更新default id
                            _this.defaultAlfaInfoId = typeof data.data[0] != 'undefined' &&
                            parseInt(data.data[0]['id']) ? parseInt(data.data[0]['id']) : 0
                            _this.closeCashForm();
                            break;

                    }
                    _this.$loading(5, 0);
                },
                error: function (e) {
                    _this.$showMessage(_this.$tran('system_busy'));
                    _this.$loading(5, 0);
                }
            })
        },
        /**
         * 根系俄罗斯对公数据
         * @param primaryKeyId 主键id 存在时更新数据
         */
        saveCashInfo: function (action, primaryKeyId) {
            var cashType = this.currentChoiceCashType;
            var data = {};
            var contentType = "application/x-www-form-urlencoded; charset=UTF-8";
            var processData = true;
            if (cashType == 1) {
                data = action == 'add' ? this.$refs.addCashForm.selfData : this.$refs.editCashForm.selfData;
                if (typeof primaryKeyId != 'undefined' && primaryKeyId) {
                    data['primaryKeyId'] = primaryKeyId;
                }
                data['cashType'] = cashType; //alfa类型
                data['securityToken'] = this.$securityToken;
            } else {
                var formData = new FormData();
                var fileVale = action == 'add' ? this.$refs.addCashUpload.fileVal : this.$refs.editCashUpload.fileVal
                contentType = false;
                processData = false;
                if (!this.$refs.addCashUpload.fileVal['name'] || this.$refs.addCashUpload.isError) {
                    this.$refs.addCashUpload.isError = 1;
                    return;
                }
                formData.append("paymentUploadFile", this.$refs.addCashUpload.fileVal);
                formData.append('cashType', cashType);
                formData.append('securityToken', this.$securityToken);
                if (typeof primaryKeyId != 'undefined' && primaryKeyId) {
                    formData.append('primaryKeyId', primaryKeyId);
                    if (this.$refs.addCashUpload.selfData.card_path) {
                        formData.append('card_path', this.$refs.selfData.card_path);
                    }
                }
                data = formData;
            }
            if (cashType == 1) {
                var isValid = this.$refs.addCashForm.validate(data);
                if (!isValid) {
                    return;
                }
            }
            var action = 'saveCash';
            var url = this.$baseUrl + '&ajax_request_action=' + action;
            var _this = this;
            this.$jquery.ajax({
                url: url,
                data: data,
                type: 'post',
                dataType: "json",
                contentType: contentType,
                processData: processData,
                beforeSend: function () {
                    _this.$loading(3, 1);
                },
                success: function (data) {
                    var message = data.message;
                    var status = parseInt(data.status);
                    var result = data.data;
                    switch (status) {
                        case 402:
                            _this.$expiredLogin();
                            break;
                        case 401:
                        case 403:
                        case 406:
                            _this.$showMessage(message);
                            break;
                        case 200:
                            _this.alfaInfo = data.data;
                            //更新default id
                            _this.defaultAlfaInfoId = typeof data.data[0] != 'undefined' &&
                            parseInt(data.data[0]['id']) ? parseInt(data.data[0]['id']) : 0
                            _this.closeCashAddPopup();
                            break;

                    }
                    _this.$loading(3, 0);
                },
                error: function (e) {
                    _this.$showMessage(_this.$tran('system_busy'));
                    _this.$loading(3, 0);
                }
            })

        },
        //删除俄罗斯对公数据
        deleteCashInfo: function (item) {
            if (item && item.id) {
                var action = 'delete_ru_payment_address';
                var url = this.$baseUrl + '&ajax_request_action=' + action;
                var _this = this;
                this.$jquery.ajax({
                    url: url,
                    data: {
                        alfa_id: item.id,
                        securityToken: this.$securityToken
                    },
                    type: 'post',
                    dataType: "json",
                    beforeSend: function () {
                        _this.$loading(4, 1);
                    },
                    success: function (data) {
                        var message = data.message;
                        var status = parseInt(data.status);
                        var result = data.data;
                        switch (status) {
                            case 402:
                                _this.$expiredLogin();
                                break;
                            case 401:
                            case 403:
                            case 406:
                            case 460:
                                _this.$showMessage(message);
                                break;
                            case 200:
                                _this.alfaInfo = data.data;
                                //更新default id
                                _this.defaultAlfaInfoId = typeof data.data[0] != 'undefined' &&
                                parseInt(data.data[0]['id']) ? parseInt(data.data[0]['id']) : 0
                                _this.closeCashAddPopup();
                                break;
                            default:
                                _this.$showMessage(message);

                        }
                        _this.$loading(4, 0);
                    },
                    error: function (e) {
                        _this.$showMessage(_this.$tran('system_busy'));
                        _this.$loading(4, 0);
                    }
                })
            }
        },
        //监听子组件选择地址时获取到当前选择的值
        changeCurrentId: function (addressItem, addressType) {
            if (addressType == 0) {
                this.currentShippingChoiceId = addressItem.address_book_id;
            } else {
                this.currentBillingChoiceId = addressItem.address_book_id;
            }
        },
        /**
         * 更新订单总价
         *
         * orderInfo.info.price_data;
         * @param res_price_data
         */
        updatePrice: function (res_price_data) {
            var priceData = {
                'after_sub_total_text': res_price_data.after_sub_total_text,
                'after_shipping_text': res_price_data.after_shipping_text,
                'shipping_text': res_price_data.shipping_text,
                'total_text': res_price_data.total_text,
                'vat_text': res_price_data.vat_text,
                'subtotal_text': res_price_data.subtotal_text,
                'insurance_text': res_price_data.insurance_text,
                'shipping': res_price_data.shipping,
                'total': res_price_data.total,
                'subtotal': res_price_data.subtotal,
                'vat': res_price_data.vat,
                'insurance': res_price_data.insurance,
                'is_vax': res_price_data.is_vax,
                'vat_title': res_price_data.vat_title,
                'total_before_tax_text' : res_price_data.total_before_tax_text
            }
            this.priceInfo = priceData;
        },
        //更新支付方式展示
        updatePayment: function (is_show_alfa, is_show_echeck, is_show_credit_card, payment_method_credit_cart) {
            this.paymentLimit['credit']['value'] = payment_method_credit_cart;
            if (is_show_alfa) {
                for (var i in this.paymentLimit) {
                    if (this.paymentLimit[i]['value'] != 'alfa') {
                        this.paymentLimit[i]['status'] = false;
                    }
                }
                this.paymentLimit['alfa']['status'] = true;
            } else {
                this.paymentLimit['alfa']['status'] = false;
                if (!is_show_credit_card) {
                    this.paymentLimit['credit']['status'] = false;
                } else {
                    this.paymentLimit['credit']['status'] = true;
                }
                if (is_show_echeck) {
                    this.paymentLimit['echeck']['status'] = true;
                } else {
                    this.paymentLimit['echeck']['status'] = false;
                }
                if (this.$siteInfo.currency == 'MYR') {
                    this.paymentLimit['paypal']['status'] = false;
                } else {
                    this.paymentLimit['paypal']['status'] = true;
                }
                this.paymentLimit['hsbc']['status'] = true;
            }
            var currentPayment = this.currentChoicePayment;
            var isValidCurrent = false;
            for (var i in this.paymentLimit) {
                if (this.paymentLimit[i]['value'] == currentPayment && this.paymentLimit[i]['status']) {
                    isValidCurrent = true;
                    return;
                }
            }
            if (!isValidCurrent) {
                for (var i in this.paymentLimit) {
                    if (this.paymentLimit[i]['status']) {
                        this.currentChoicePayment = this.paymentLimit[i]['value'];
                        return;
                    }
                }
            }
        },
        //更新订单仓库等信息
        updateWarehouse: function (warehouse) {
            if (this.$isset(warehouse)) {
                this.orderInfo.warehouse = warehouse;
            }
        },
        /**
         * 产品分仓
         * @productInfo 产品信息
         * @shippingInfo 运费信息
         * @warehouse 仓库信息
         * @phone 电话号码
         */
        separateWarehouse: function (product_info, shipping_data, warehouse, phone) {
            var products = product_info.products;
            var order_num_info = product_info.order_num_info;
            var currentTag = order_num_info.data.split('-');
            var obj = {
                'local': {},
                'delay': {}
            };
            //是否隐藏子单信息
            if (order_num_info.num != Object.keys(shipping_data).length) {
                this.showChildOrder = false;
            } else {
                this.showChildOrder = true;
            }
            this.orderNum = order_num_info.num;
            //更新电话号码
            this.phone = phone;
            //更新订单仓库
            this.updateWarehouse(warehouse);
            this.$jquery.each(currentTag, function (index, item) {
                if (typeof obj[item] != 'undefined') {
                    obj[item]['product'] = products[item];
                    obj[item]['title'] = product_info[item];
                    obj[item]['shipping'] = typeof shipping_data[item] != 'undefined' &&
                    shipping_data[item] ? shipping_data[item] : {}
                }
            });
            for (var i in obj) {
                if (!this.$isset(obj[i])) {
                    delete obj[i];
                }
            }
            var result = {
                info: obj,
                shipping_data: shipping_data,
            }
            //重置运输方式信息
            this.resetDefaultShipping();
            this.separateInfo = result;
        },

        //监听子组件地址变化时,修改当前地址
        changeAddress: function (addressInfo) {
            var addressType = addressInfo['addressType'];
            var orderInfo = addressInfo['orderInfo'];
            var action = addressInfo['action'];
            switch (action) {
                case 'delete':
                    this.shippingAddress = addressInfo['shippingAddress'];
                    this.billingAddress = addressInfo['billingAddress'];
                    this.currentId = addressType == 0 ? this.currentShippingId : this.currentBillingId;

                    if(this.currentId == addressInfo.currentItem.address_book_id){
                        if(addressType == 0){
                            this.currentShippingId = 0;
                            if(this.isUseShippingAddressAsBilling){
                                this.currentBillingId = 0;
                                this.isUseShippingAddressAsBilling = 0;
                            }
                        }else{
                            this.currentBillingId = 0;
                        }
                    }
                    //如果地址被删光feditType
                    if ((addressType == 0 && !this.$isset(this.shippingAddress)) || (addressType == 2 && !this.$isset(this.billingAddress))) {
                        this.showEditForm({}, 1, addressType);
                    }
                    //如果账单地址
                    break;
                case 'update':
                case 'add':
                    if (addressType == 0) {
                        var res_price_data = orderInfo.info.price_data;
                        //更新产品价格
                        this.updatePrice(res_price_data);
                        //分仓
                        this.separateWarehouse(orderInfo.info.product_info,
                            orderInfo.info.shipping_data,
                            orderInfo.info.warehouse,
                            orderInfo.info.message.phone
                        );
                        //取消站点锁定
                        this.isSiteLockError = false;
                        //更新运费信息
                        this.handleShippingAddress(addressInfo);
                        //更新支付方式
                        this.updatePayment(
                            orderInfo.info.is_show_alfa,
                            orderInfo.info.is_show_echeck,
                            orderInfo.info.is_show_credit_card,
                            orderInfo.info.payment_method_credit_cart
                        );
                    } else {
                        this.handleBillingAddress(addressInfo);
                    }
                    break;
            }
        },
        confirmAddress: function (addressType, envent) {
            var addressBookId = addressType == 0 ? this.currentShippingChoiceId : this.currentBillingChoiceId;


            if (!addressBookId && !this.isChoiceShippingAddressAsBilling) {
                this.$showMessage(this.$tran('address_choice_notice'));
                return;
            }
            if (addressType == 0) {
                this.confirmShippingAddress(addressBookId, addressType);
            } else {
                this.confirmBillingAddress(addressBookId, addressType);
            }
        },
        //重置分仓信息
        resetDefaultShipping: function () {
            this.defaultShippingInfo = {
                local: {},
                delay: {}
            }
            //comments 字段
            this.comments = {
                local: "",
                delay: ""
            };
            //自提以及custom 数据
            this.selectrelate = {
                local: {
                    own: {
                        form: {
                            select: "",
                            express_account: ""
                        },
                        error: {
                            select: "",
                            express_account: ""
                        }
                    },
                    pick: {
                        form: {
                            phone: "",
                            email: "",
                            contact: ""
                        },
                        error: {
                            phone: "",
                            email: "",
                            contact: "",
                            time: ""
                        }
                    }

                },
                delay: {
                    own: {
                        form: {
                            select: "",
                            express_account: ""
                        },
                        error: {
                            select: "",
                            express_account: ""
                        }
                    },
                    pick: {
                        form: {
                            phone: "",
                            email: "",
                            contact: ""
                        },
                        error: {
                            phone: "",
                            email: "",
                            contact: "",
                            time: ""
                        }
                    }

                },
            };
            this.customData = {
                local: {},
                delay: {}
            };
        },
        /**
         * 确认运输地址
         * @param address_book_id
         * @param addressType
         */
        confirmShippingAddress: function (address_book_id, addressType, loadingType) {
            var addressInfo = this.currentAddressInfo(addressType, address_book_id);
            var checkSite = this.$siteLock(addressInfo);
            if (checkSite['isLock']) {
                this.$showMessage(checkSite['lockTip']);
                this.isSiteLockError = true;
                return;
            }
            this.isSiteLockError = false;
            if (typeof loadingType == 'undefined') {
                loadingType = addressType;
            }
            var action = 'confirm_shipping_address';
            var url = this.$baseUrl + '&ajax_request_action=' + action;

            var _this = this;
            this.$jquery.ajax({
                url: url,
                data: {
                    address_book_id: address_book_id,
                    securityToken: _this.$securityToken,
                    quotes_id: _this.$quotes_id ? _this.$quotes_id : '',
                    inquiry_id: _this.$inquiry_id ? _this.$inquiry_id: '',
                    isUseShippingAddressAsBilling: _this.isChoiceShippingAddressAsBilling,
                    initType:loadingType
                },
                type: 'post',
                dataType: "json",
                beforeSend: function () {
                     console.log(loadingType);
                    _this.$loading(loadingType, 1);
                    _this.isCanPay = false;
                },
                success: function (data) {
                    var message = data.message;
                    var status = parseInt(data.status);
                    var result = data.data;
                    //字段错误
                    switch (status) {
                        //消费税价格计算错误
                        case 408:
                            _this.$showMessage(message);
                            _this.isCanPay = false;
                            break;
                        //登录过期
                        case 402:
                            _this.$expiredLogin();
                            _this.isCanPay = false;
                            break
                        //报价等其他常规错误
                        case 406:
                            _this.$showMessage(message);
                            _this.isCanPay = false;
                            break;
                        //消费税地址验证错误
                        case 405:
                            _this.$showMessage(result.message);
                            _this.isCanPay = false;
                            break;
                        //当前确认运输地址有问题
                        case 422:
                            _this.$showMessage(_this.$tran('address_invalid_notice'));
                            _this.isCanPay = false;
                            break;
                        case 200:
                            //重置当前默认id
                            _this.currentShippingChoiceId = _this.currentShippingId = result.address_book_id;
                            //如果当前 使用运输地址作为账单地址,则同步账单地址
                            if (_this.isUseShippingAddressAsBilling) {
                                _this.currentBillingId = result.address_book_id;
                            }
                            //更新价格
                            _this.updatePrice(result.info.price_data);
                            //更新支付方式
                            _this.updatePayment(
                                result.info.is_show_alfa,
                                result.info.is_show_echeck,
                                result.info.is_show_credit_card,
                                result.info.payment_method_credit_cart
                            );
                            //分仓
                            _this.separateWarehouse(
                                result.info.product_info,
                                result.info.shipping_data,
                                result.info.warehouse,
                                result.info.message.phone
                            );
                            if(_this.currentAddressInfo(0).entry_country_id != 44){
                                _this.isChinaLimit = false;
                            }
                            //关闭弹窗
                            _this.closeAddressListPopup();
                            _this.isCanPay = true;
                            if(loadingType == 7){
                                _this.asyncQuoteShipping();
                            }
                            break;
                        default:
                            _this.$showMessage(message);
                            _this.isCanPay = false;
                    }
                    _this.$loading(loadingType, 0);
                },
                error: function (e) {
                    _this.isCanPay = false;
                    _this.$showMessage(_this.$tran('system_busy'));
                    _this.$loading(loadingType, 0);
                }
            })
        },
        confirmBillingAddress: function (address_book_id, addressType) {
            var action = 'confirm_billing_address';
            var url = this.$baseUrl + '&ajax_request_action=' + action;
            var _this = this;
            this.$jquery.ajax({
                url: url,
                data: {
                    billing_address_id: address_book_id,
                    securityToken: _this.$securityToken,
                    quotes_id: _this.$quotes_id ? _this.$quotes_id : '',
                    inquiry_id:_this.$inquiry_id ? _this.$inquiry_id : '',
                    isUseShippingAddressAsBilling: _this.isChoiceShippingAddressAsBilling
                },
                type: 'post',
                dataType: "json",
                beforeSend: function () {
                    _this.$loading(addressType, 1);
                },
                success: function (data) {
                    var message = data.message;
                    var status = parseInt(data.status);
                    var result = data.data;
                    //字段错误
                    switch (status) {
                        //消费税价格计算错误
                        case 408:
                            _this.$showMessage(message + " " + _this.$tran('address_avatax_error'));
                            break;
                        //登录过期
                        case 402:
                            _this.$expiredLogin();
                            break
                        //报价等其他常规错误
                        case 406:
                            _this.$showMessage(message);
                            break;
                        //运输地址验证错误
                        case 407:
                            _this.$showMessage(_this.$tran('address_avatax_error'));
                            break;
                        //消费税地址验证错误
                        case 405:
                            _this.$showMessage(result.message + " " + _this.$tran('address_avatax_error'));
                            break;
                        //当前确认运输地址有问题
                        case 422:
                            _this.$showMessage(message);
                            break;
                        case 200:
                            //重置当前默认id
                            _this.currentBillingChoiceId = _this.currentBillingId = result.address_book_id;
                            if (_this.isChoiceShippingAddressAsBilling) {
                                _this.isUseShippingAddressAsBilling = _this.isChoiceShippingAddressAsBilling = 1;
                            } else {
                                _this.isUseShippingAddressAsBilling = _this.isChoiceShippingAddressAsBilling = 0;
                            }
                            //更新价格
                            if (typeof result.price_data != 'undefined' && _this.$isset(result.price_data)) {
                                _this.updatePrice(result.price_data);
                            }
                            //分仓
                            if (typeof result.product_info != 'undefined' && _this.$isset(result.product_info)) {
                                _this.separateWarehouse(result.product_info, result.shipping_data, result.warehouse, result.phone);
                            }
                            //重置地址验证错误
                            _this.isValidAddress = true;
                            //如果当前 使用运输地址作为账单地址,则更新
                            //关闭弹窗
                            _this.closeBillingAddressPopup();
                            break;
                    }
                    _this.$loading(addressType, 0);
                },
                error: function (e) {
                    _this.$showMessage(_this.$tran('system_busy'));
                    _this.$loading(addressType, 0);
                }
            })
        },
        /**
         * 账单地址发生变化时处理
         * @param addressInfo
         */
        handleBillingAddress: function (addressInfo) {
            this.shippingAddress = addressInfo['shippingAddress'];
            this.billingAddress = addressInfo['billingAddress'];
            //更新账单地址
            this.currentId = this.currentBillingId = addressInfo['currentItem']['address_book_id'];
            //修改是否使用运输地址作为账单地址 选中状态
            this.isChoiceShippingAddressAsBilling = this.isUseShippingAddressAsBilling = 0;
            this.confirmBillingAddress(addressInfo['currentItem']['address_book_id'], 2);
            this.isValidAddress = true;
        },
        /**
         * 运输地址发生变化时处理
         * @param addressInfo
         */
        handleShippingAddress: function (addressInfo) {
            this.shippingAddress = addressInfo['shippingAddress'];
            this.billingAddress = addressInfo['billingAddress'];
            this.currentId = this.currentShippingId = addressInfo['currentItem']['address_book_id'];
            //如果当前客户没有账单地址
            if (!this.billingAddress.length) {
                this.isChoiceShippingAddressAsBilling = this.isUseShippingAddressAsBilling = 1;
            }
            //如果当前 使用运输地址作为账单地址,则同步运输地址
            if (this.isUseShippingAddressAsBilling) {
                this.currentBillingId = this.currentShippingId
            }
            if(this.currentAddressInfo(0).entry_country_id != 44){
                this.isChinaLimit = false;
            }
            this.closeEditForm();
            this.closeAddressListPopup();
        },
        /**
         * 监听自组件展示地址编辑框,接收address-list 自组件传递 参数
         *
         * @param item
         * @param action 1 add地址 2 update地址
         * @param addressType 0 运输 2 账单
         */
        showEditForm: function (item, action, addressType) {
            this.currentEditAddressInfo = item;
            this.editAction = action;
            addressType == 0 ? this.isShowShippingEditForm = true : this.isShowBillingEditForm = true;
        },
        /**
         * 转换当前选中地址 id
         *
         * @param type 地址类型 0 运输地址 2 账单地址
         */
        transCurrentId: function (type) {
            if (type == 0) {
                this.currentShippingChoiceId = this.currentShippingId;
            } else {
                //如果使用了默认运输地址作为账单地址，则置空当前选中的 账单地址id
                if (this.isUseShippingAddressAsBilling) {
                    this.currentBillingChoiceId = 0;
                } else {
                    this.currentBillingChoiceId = this.currentBillingId;
                }
            }
        },
        /**
         * 展示运输地址弹窗
         * 同时修改当前弹窗类型
         */
        showShippingPoup: function () {
            this.isShowShippingEditForm = false;
            this.addressType = 0;
            this.transCurrentId(0);
            this.addressListPopup.showPopup = true;
            if (!this.$isset(this.shippingAddress)) {
                this.showEditForm({}, 1, 0);
            }
            document.body.style.overflow='hidden';
        },
        /**
         * 展示账单地址编辑弹窗
         * 同时修改当前弹窗类型
         */
        showBillingPoup: function () {
            this.isShowBillingEditForm = false;
            this.addressType = 2;
            this.transCurrentId(2);
            this.billingAddressPopup.showPopup = true;
            if (!this.$isset(this.billingAddress) && !this.currentShippingId) {
                this.showEditForm({}, 1, 2);
                this.isUseShippingAddressAsBilling = this.isChoiceShippingAddressAsBilling = 0;
            }else{
                this.isChoiceShippingAddressAsBilling = this.isUseShippingAddressAsBilling;
            }
            document.body.style.overflow='hidden';
        },
        /**
         * 关闭地址编辑表单展示状态
         */
        closeEditForm: function () {
            this.editAction = 0;
            parseInt(this.addressType) === 0 ? this.isShowShippingEditForm = false : this.isShowBillingEditForm = false;
            var isClose = parseInt(this.addressType) === 0 ? this.$isset(this.shippingAddress) : this.$isset(this.billingAddress);
            //如果当前地址列表为空，则直接关闭
            if (!isClose) {
                parseInt(this.addressType) === 0 ? this.addressListPopup.showPopup = false :
                    this.billingAddressPopup.showPopup = false;
            }
            document.body.style.overflow='';
        },
        /**
         * 关闭地址列表弹窗
         */
        closeAddressListPopup: function () {
            this.addressListPopup.showPopup = false;
            document.body.style.overflow='';
        },
        /**
         * 关闭账单地址编辑弹窗
         */
        closeBillingAddressPopup: function () {
            this.billingAddressPopup.showPopup = false;
            //关闭账单地址弹窗前，还原Billing address same as shipping address 默认选中状态
            this.isChoiceShippingAddressAsBilling = this.isUseShippingAddressAsBilling;
            document.body.style.overflow='';
        },
        /**
         * 取消运输地址作为默认账单地址
         */
        unUseShippingAddress: function () {
            var currentBillingId = this.currentBillingId;
            this.isChoiceShippingAddressAsBilling = this.isChoiceShippingAddressAsBilling ? 0 : 1;
            if (!this.billingAddress.length && !this.isChoiceShippingAddressAsBilling) {
                this.showEditForm({}, 1, 2)
            }
        },
        /**
         * 显示shipping news弹框
         */
        showSharePopup: function () {
            this.shareShippingPopup.showPopup = true;
            document.body.style.overflow='hidden';
        },
        /**
         * 隐藏shipping news弹框
         */
        closeSharePopup: function () {
            this.shareShippingPopup.showPopup = false;
            var arr = [];
            for (var i = 0; i < this.shareList.length; i++) {
                if (this.shareList[i].name.replace(/^\s+|\s+$/g, "") && this.shareList[i].email.replace(/^\s+|\s+$/g, "") && /^[ \w\.\-\+]+\@[\w\.\-\+]+\.[\w\.\-]+$/.test(this.shareList[i].email)) {
                    arr.push({
                        name: this.shareList[i].name,
                        email: this.shareList[i].email,
                        name_error: "",
                        email_error: ""
                    })
                }
            }
            if (!arr.length) {
                arr.push({
                    name: "",
                    email: "",
                    name_error: "",
                    email_error: ""
                })
            }
            this.shareList = arr
            document.body.style.overflow='';
        },
        /**
         * 新增或删除shareList
         */
        handleShareList: function (i) {
            if (i > 0) {
                this.shareList.splice(i, 1)
            } else {
                this.shareList.push({
                    name: "",
                    email: "",
                    name_error: "",
                    email_error: ""
                })
            }
        },
        /**
         * 监听input事件
         */
        shareInput: function (o,a) {
            if (!o[a].replace(/^\s+|\s+$/g, "")) {
                o[a+'_error'] = this.$tran("share_popup_"+a+"_required");
            } else {
                if(a === 'email'){
                    if (!/^[ \w\.\-\+]+\@[\w\.\-\+]+\.[\w\.\-]+$/.test(o.email)) {
                        o.email_error = this.$tran("share_popup_email_valid");
                    } else {
                        o.email_error = ""
                    }
                }else{
                    o[a+'_error'] = ""
                }
            }
        },
        /**
         * share shipping 弹框保存
         */
        submitShare: function () {
            var share_popup_flag = false;
            for (var i = 0; i < this.shareList.length; i++) {
                if (!this.shareList[i].name.replace(/^\s+|\s+$/g, "")) {
                    this.shareList[i].name_error = this.$tran("share_popup_name_required");
                    share_popup_flag = true
                }else{
                    this.shareList[i].name_error = "";
                }
                if (!this.shareList[i].email.replace(/^\s+|\s+$/g, "")) {
                    this.shareList[i].email_error = this.$tran("share_popup_email_required");
                    share_popup_flag = true
                } else {
                    if (!/^[ \w\.\-\+]+\@[\w\.\-\+]+\.[\w\.\-]+$/.test(this.shareList[i].email)) {
                        this.shareList[i].email_error = this.$tran("share_popup_email_valid");
                        share_popup_flag = true
                    } else {
                        this.shareList[i].email_error = ""
                    }
                }
            }
            if (share_popup_flag) {
                return
            }
            this.shareShippingPopup.showPopup = false;
            document.body.style.overflow = '';
        },
        //delivery input事件
        deliveryInput: function (type, p, c) {

            if (!this.selectrelate[type][p].form[c].replace(/^\s+|\s+$/g, "")) {
                if (c === "express_account" && this.$currentPage !=='quote') {
                    this.selectrelate[type][p].error[c] = this.$tran('delivery_express_account_required');
                } else if (c === 'phone') {
                    this.selectrelate[type][p].error[c] = this.$tran('delivery_name_required');

                } else if (c === 'email') {
                    this.selectrelate[type][p].error[c] = this.$tran('delivery_email_required');

                } else if (c === 'contact') {
                    this.selectrelate[type][p].error[c] = this.$tran('delivery_contact_required');

                }
            } else {
                if (c === 'email') {
                    if (!/^[ \w\.\-\+]+\@[\w\.\-\+]+\.[\w\.\-]+$/.test(this.selectrelate[type][p].form[c])) {
                        this.selectrelate[type][p].error[c] = this.$tran('delivery_email_valid');
                    } else {
                        this.selectrelate[type][p].error[c] = ""
                    }
                } else {
                    this.selectrelate[type][p].error[c] = ""

                }
            }
        },
        checkDelivery: function () {
            var flag = false, obj = {};
            obj.data = {};
            if (this.separateInfo && this.separateInfo.info) {
                for (var attr in this.separateInfo.info) {
                    if (this.defaultShippingInfo[attr].methods === 'customzones') {
                        if (!this.selectrelate[attr].own.form.express_account.replace(/^\s+|\s+$/g, "")  &&  this.$currentPage!=='quote') {
                            this.selectrelate[attr].own.error.express_account = this.$tran('delivery_express_account_required');
                            flag = true
                        } else {
                            this.selectrelate[attr].own.error.express_account = "";
                        }
                    } else if (this.defaultShippingInfo[attr].methods === 'selfreferencezones') {
                        if (!this.selectrelate[attr].pick.form.phone.replace(/^\s+|\s+$/g, "")) {
                            this.selectrelate[attr].pick.error.phone = this.$tran('delivery_name_required');
                            flag = true
                        } else {
                            this.selectrelate[attr].pick.error.phone = "";
                        }

                        if (!this.selectrelate[attr].pick.form.email.replace(/^\s+|\s+$/g, "")) {
                            this.selectrelate[attr].pick.error.email = this.$tran('delivery_email_required');
                            flag = true
                        } else {
                            if (!/^[ \w\.\-\+]+\@[\w\.\-\+]+\.[\w\.\-]+$/.test(this.selectrelate[attr].pick.form.email)) {
                                this.selectrelate[attr].pick.error.email = this.$tran('delivery_email_valid');
                                flag = true
                            } else {
                                this.selectrelate[attr].pick.error.email = "";
                            }
                        }
                        if (!this.selectrelate[attr].pick.form.contact.replace(/^\s+|\s+$/g, "")) {
                            this.selectrelate[attr].pick.error.contact = this.$tran('delivery_contact_required');
                            flag = true
                        } else {
                            this.selectrelate[attr].pick.error.contact = "";
                        }
                        if (!this.$jquery('.pick_time' + attr).val()) {
                            this.selectrelate[attr].pick.error.time = this.$tran('delivery_time_required');
                            flag = true
                        } else {
                            this.selectrelate[attr].pick.error.time = "";
                        }
                    }
                    if (!flag) {
                        obj.data[attr] = {};
                        if (this.defaultShippingInfo[attr].methods === 'customzones') {
                            obj.data[attr].own = JSON.parse(JSON.stringify(this.selectrelate[attr].own.form))
                        } else if (this.defaultShippingInfo[attr].methods === 'selfreferencezones') {
                            obj.data[attr].pick = JSON.parse(JSON.stringify(this.selectrelate[attr].pick.form));
                            obj.data[attr].pick.time = $('.pick_time' + attr).val();
                        }
                    }
                }
            }
            obj.flag = flag;
            if (!this.showChildOrder) {
                if (obj.data.local && obj.data.delay) {
                    obj.data.local = JSON.parse(JSON.stringify(obj.data.delay));
                    delete obj.data.delay
                }
            }
            return obj;
        },

        guide_close:function () {
            //直接关闭提示气泡
            this.isShowGuid=false;

            var that=this
            var action = 'already_open_page';
            var url = this.$baseUrl + '&ajax_request_action=' + action;

            this.$jquery.ajax({
                url: url,
                data: {
                    customer_id: that.customer_id,
                    securityToken: that.$securityToken,
                },
                type: 'post',
                dataType: "json",
                success: function (data) {
                    //console.log(data)
                },
            })
        }
    },
    watch: {
        poNumber: function (newVal) {
            if (newVal.length > 50) {
                this.isValidPo = false;
            } else {
                this.isValidPo = true;
            }
        },
        tikectInfo: function (newVal) {
            if (newVal.length > 500) {
                this.isValidTicket = false;
            } else {
                this.isValidTicket = true;
            }
        }
    },
    components: components
});
