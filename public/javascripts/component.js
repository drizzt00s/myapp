var components = {
    'addressList': {
        props: [
            'currentAddressList', //当前地址信息
            'addressNameFormat', //地址客户名称格式化
            'addressFormat',    //地址信息格式化
            'currentDefaultId', //当前客户默认地址id
            'currentId',         //当前地址选中id
            'addressType' //当前地址类型 0 运输 2 账单
        ],
        computed: {
            selfCurrentList: function () {
                return this.currentAddressList;
            }
        },
        data: function () {
            return {
                //是否展示删除提示语
                isShowDeleteTip: 0
            }
        },
        methods: {
            /**
             * 通知父组件,地址选中发生了变化
             * @param item
             */
            choiceAddress: function (item) {
                if (this.$siteLock(item)['isLock']) {
                    return;
                }
                this.$emit('change-current-id', item, this.addressType);
            },
            /**
             * 通知父组件展示 地址编辑弹窗
             * @param action 2 编辑 1.新增
             * @param item
             */
            showEditAddressPopup: function (item, action) {
                this.$emit('show-edit-form', item, action, this.addressType);
                document.body.style.overflow='hidden';
            },
            /**
             * 删除地址
             * @param item
             */
            removeAddress: function (item) {
                var url = this.$baseUrl + '&ajax_request_action=delete_address';
                var _this = this;
                var addressType = this.addressType && parseInt(_this.addressType) ?
                    parseInt(_this.addressType) : 0;
                this.$jquery.ajax({
                    url: url,
                    data: {
                        address_book_id: item.address_book_id,
                        securityToken: this.$securityToken
                    },
                    type: 'post',
                    dataType: "json",
                    beforeSend: function () {
                        _this.$loading(addressType, 1);
                    },
                    success: function (data) {
                        var status = parseInt(data.status);
                        var message = data.message;
                        if (status !== 200) {
                            _this.$showMessage(message);
                            _this.$loading(addressType, 0);
                            return;
                        }
                        //更新地址
                        var billingAddress = data.data['billing_address'] ? data.data['billing_address'] : {};
                        var shippingAddress = data.data['shipping_address'] ? data.data['shipping_address'] : {};
                        var result = _this.$formatAddressResult(
                            billingAddress,
                            shippingAddress,
                            {},
                            item,
                            addressType,
                            'delete'
                        );
                        _this.$emit('change-address', result);
                        _this.$loading(addressType, 0);
                    },
                    error: function (e) {
                        _this.$showMessage(_this.$tran('system_busy'));
                        _this.$loading(addressType, 0);
                    }
                })
            },
            /**
             * 展示删除地址提示
             */
            showDeleteTip: function (item) {
                if (item) {
                    this.isShowDeleteTip = item.address_book_id;
                }
            },
            /**
             * 关闭删除地址提示
             */
            closeDeleteTip: function () {
                this.isShowDeleteTip = 0;
            }
        },
        template: '<ul class="popup-choose-address">' +
            '<li  @click.stop="choiceAddress(item)" :key="item.address_book_id"' +
            'class="popup-choose-address-con" :class="{prohibit: $siteLock(item)[\'isLock\']}" v-for="item in selfCurrentList">' +
            '<div class="popup-choose-address-con-left">' +
            '      <span class="icon iconfont">{{currentId==item.address_book_id ? "&#xf021;" : "&#xf022;"}}</span>' +
            '      <div class="popup-choose-address-con-left-information">' +
            '            <div class="popup-choose-address-con-left-name">' +
            '               <span class="name">{{addressNameFormat(item)}}</span>' +
            '          </div>' +
            '          <div class="popup-choose-address-con-left-address">' +
            '             <p class="address">{{addressFormat(item)}}</p>' +
            '             <p class="phone">{{item.entry_telephone ? item.entry_telephone: ""}}{{item.entry_tax_number ? ", "+item.entry_tax_number: ""}}</p>' +
            '         </div>' +
            '     </div>' +
            ' </div>' +
            ' <div class="popup-choose-address-con-right">' +
            '    <a href="javascript:;" @click.stop="showEditAddressPopup(item,2)">{{$tran("payment_alfa_edit")}}</a>' +
            '    <a href="javascript:;" @click.stop="showDeleteTip(item)" >' +
            '    {{$tran("payment_alfa_remove")}}</a>' +
            '    <div class="popup-choose-address-con-right-tips" v-if="isShowDeleteTip == item.address_book_id">' +
            '       <div class="tips-arrow"></div>' +
            '          <p class="popup-choose-address-con-right-tips-font">' +
            '               {{$tran("confirm_delete_address")}}' +
            '         </p>' +
            '         <div class="popup-choose-address-con-right-tips-btn">' +
            '              <a href="javascript:;" class="delete-address-cancel" @click.stop="closeDeleteTip">{{$tran("Cancel")}}</a>' +
            '              <a href="javascript:;" class="delete-address-delete" @click.stop="removeAddress(item)">{{$tran("Delete")}}</a>' +
            '         </div>' +
            '       </div>' +
            '  </div>' +
            '   <div class="popup-choose-address-con-prohibit-tip" v-if="$siteLock(item)[\'isLock\']">' +
            '      <span class="icon iconfont"></span>\n' +
            '       <span v-html="$siteLock(item)[\'lockTip\']">{{$siteLock(item)["lockTip"]}}</span>\n' +
            '   </div>' +
            ' </li>' +
            '</ul>'
    },
    //表单编辑
    'addressForm': {
        props: [
            'formData', //表单数据
            'actionType', //表单编辑方式1新增 2 update
            'addressType', //0运输地址 2 账单地址
            'isUseShippingAddressAsBilling', //是否使用运输地址作为账单地址
            'addressList' //当前地址数据
        ],
        data: function () {
            return {
                //是否为初始化渲染数据
                isInit: 0,
                //验证对象
                validateObject: {},
                //验证规则
                validateRule: {},
                //州数据
                stateData: {},
                //form 表单数据
                selfData: {
                    'address_book_id': 0,
                    'address_type': 0,
                    'company_type': '',
                    'country_code': this.$siteInfo['countries_iso_code_2'] ? this.$siteInfo['countries_iso_code_2'] : 'US',
                    'default_address': 0,
                    'entry_city': '',
                    'entry_company': '',
                    'entry_country_id': this.$siteInfo['countries_id'] ? this.$siteInfo['countries_id'] : 223,
                    'entry_country_name': '',
                    'entry_firstname': '',
                    'entry_lastname': '',
                    'entry_postcode': '',
                    'entry_state': '',
                    'entry_street_address': '',
                    'entry_suburb': '',
                    'entry_tax_number': '',
                    'entry_telephone': '',
                    'tel_prefix': this.$siteInfo['tel_prefix'] ? this.$siteInfo['tel_prefix'] : "+1"
                },
                //是否展示company name input
                isShowCompanyName: true,
                //是否展示vax number input
                isShowVaxName: true,
                //表单验证错误信息
                rulesMessage: {
                    'company_type': {},
                    'entry_firstname': {},
                    'entry_lastname': {},
                    'entry_street_address': {},
                    'entry_suburb': {},
                    'entry_telephone': {},
                    'entry_postcode': {},
                    'entry_country_id': {},
                    'entry_city': {},
                    'entry_Scompany': {},
                    'entry_state': {},
                    'entry_tax_number': {},
                },
                //税收entry_vax_number 提示语
                vaxTip: this.$tran('address_non_eu_tax_input_tips'),

                nowInputName: []
            }
        },
        created: function ()    {
            this.isInit = 1;
            this.validateObject = new this.$Validate(this.selfData, JSON.parse(this.$validateRule), 'addressForm');
            this.validateRule = this.validateObject.validateRule;
            this.rulesMessage = this.validateObject.rulesMessage
            //新增地址时,默认使用初始化数据
            if (this.actionType === 1) {
                //初始化税号填写框
                this.isShowVaxNameAction(this.selfData);
            } else {
                this.selfData = this.$jquery.extend(true, {}, this.formData);
            }
            //初始化州信息
            this.stateData = this.getStateByCountryId(this.selfData.entry_country_id);
        },
        components: {
            //国家组件
            'countrySelect': {
                props: ['currentCountryId', 'addressType'],
                data: function () {
                    return {
                        defaultCountryId: 223,
                        //国家列表数据
                        countryListData: countryListData,
                        originCountryListData: originCountryListData,
                        //countrySelect
                        countrySelect:{},
                        //默认国家参数,查询不到国家数据时使用该参数
                        defaultCountry: {
                            'countries_name': "United states",
                            'countries_id': 223,
                            'countries_iso_code_2': 'US'
                        },
                        //国家搜索值
                        searchText: '',
                        //是否展示 国家下拉选框
                        isShowCountrySelect: false
                    }
                },
                mounted: function() {
                    this.$nextTick(function () {
                        document.querySelector('body').addEventListener('click', this.clickHide);
                    });
                },
                beforeDestroy: function() {
                   document.querySelector('body').removeEventListener('click', this.clickHide);
                },
                created: function(){
                    if(this.addressType === 0){
                        this.countrySelect = this.$jquery.extend(true, {}, countryListData);
                    }else{
                        this.countrySelect = this.$jquery.extend(true, {}, originCountryListData);
                    }

                },
                methods: {
                    /**
                     * 国家搜索
                     */
                    searchCountry: function () {
                        var searchText = this.searchText ? this.searchText.toLowerCase() : '';
                        var _this = this;
                        var hkData = this.countryListData.filter(function (item) {
                            return _this.$jquery.inArray(item.countries_id, [206,96,125]) > -1;
                        });
                        if (searchText) {
                            var originData = this.addressType === 0 ? this.countryListData : this.originCountryListData;
                            var data = originData.filter(function (item) {
                                var country_name = item.countries_name ? item.countries_name.toLowerCase() : '';
                                return country_name.indexOf(searchText) > -1;
                            });
                            if (data.length) {
                                for (var i in data) {
                                    //中国地区自动关联港澳台
                                    if (typeof data[i]=='object' && data[i]['countries_id'] === 44) {
                                      data = data.filter(function (item) {
                                          return _this.$jquery.inArray(item.countries_id, [206,96,125]) === -1;
                                      });
                                      if(this.$isset(hkData)){
                                          data = data.concat(hkData);
                                      }
                                      break;
                                    }
                                }
                                this.countrySelect = data;
                            }
                        } else {
                            this.countrySelect = countryListData;
                        }
                    },
                    /**
                     * 修改国家
                     * @param item
                     */
                    choiceCountry: function (item) {
                        this.$emit('change-country-id', item);
                        this.isShowCountrySelect = false;
                    },
                    /**
                     * 国家选框展示隐藏
                     */
                    slideCountrySelect: function () {
                        this.isShowCountrySelect = !this.isShowCountrySelect;
                    },
                    clickHide:function(e) {
                        if (!this.$refs.countrySelect.contains(e.target)) {
                            this.isShowCountrySelect = false
                        }
                    }
                },
                computed: {
                    /**
                     * 国家图标
                     * @returns {function(*=)}
                     */
                    countryFlag: function () {
                        return function (item) {
                            var obj = {};
                            if (item && item.countries_iso_code_2) {
                                var cflag = item.countries_iso_code_2.toLowerCase();
                                obj[cflag] = true;
                                obj["flag"] = true
                            }
                            return obj;
                        }
                    },
                    /**
                     * 当前国家数据
                     * @returns {defaultCountry|{countries_name, countries_id, countries_iso_code_2}|*}
                     */
                    currentCountryInfo: function () {
                        var currentCountryId = parseInt(this.currentCountryId);
                        var countryList = this.addressType === 0 ?  this.countryListData : this.originCountryListData;
                        for (var i = 0; i < Object.keys(countryList).length; i++) {
                            if (parseInt(countryList[i].countries_id) && parseInt(countryList[i].countries_id) === currentCountryId) {
                                return countryList[i];
                            }
                        }
                        return this.defaultCountry;
                    }
                },
                template:
                    "<div class='btn-group curCountry billingCountry' ref='countrySelect'>" +
                    "<input type='hidden' name='entry_country_id' class='entry_country_id' :value='currentCountryId'>" +
                    " <div @click.stop='slideCountrySelect' class='big_input country_01'>" +
                    " <span class='yourCurrency tag_currency'>" +
                    "    <em :class='countryFlag(currentCountryInfo)'></em>{{currentCountryInfo.countries_name}}" +
                    "    <span class='caret'>" + "</span>" +
                    " </span>" +
                    "</div>" +
                    "<div v-if='isShowCountrySelect' class='country_sarch_new'>" +
                    "<div class='country_sarch_new_ipt'>" +
                    "<input :placeholder='$tran(\"search\")' type='text' v-model='searchText' @input='searchCountry'>" +
                    "</div>" +
                    "   <ul class='dropdown-menu form-horizontal pull-right box44'>" +
                    "   <li @click.stop='choiceCountry(item)' :key='item.countries_id' v-for='item in countrySelect'>" +
                    "       <a href='javascript:void(0);' :tag='item.countries_id'>" +
                    "       <em :class='countryFlag(item)'></em>{{item.countries_name}}</a>" +
                    "   </li>" +
                    "   </ul>" +
                    "</div>" +
                    "</div>"
            }
        },
        watch: {
            //如果是新增地址selfData不会发生更新
            'selfData': {
                handler: function (newVal, oldVal) {
                    this.validate(newVal);
                },
                deep: true
            },
            'selfData.entry_postcode':function(newVal, oldVal){
                //如果客户主动切换邮编,并且当前国家为美国时,自动匹配国家信息
                var new_entry_country_id = this.selfData.entry_country_id;
                if (this.$isset(oldVal) && new_entry_country_id == 223 && newVal != oldVal) {
                    this.matchCountryInfo(new_entry_country_id, newVal);
                }
            },
            init: {
                handler: function (newVal, oldVal) {
                    var data = this.selfData;
                    var new_entry_country_id = parseInt(newVal.entry_country_id);
                    var old_entry_country_id = parseInt(oldVal.entry_country_id);
                    var new_entry_postcode = newVal.entry_postcode;
                    var old_entry_postcode = oldVal.entry_postcode;
                    var new_isIniit = newVal.isInit;
                    var old_isInit = oldVal.isInit;
                    var new_company_type = newVal.company_type;
                    var old_company_type = oldVal.commentType;

                    //国家为俄罗斯 并公司类型为个人,隐藏公司选框
                    if (new_entry_country_id == 176 && new_company_type == 'IndividualType') {
                        this.isShowCompanyName = false;
                        this.selfData.entry_company = '';
                    } else {
                        this.isShowCompanyName = true;
                    }
                    //国家和公司类型发生变化时 检测税号框是否展示
                    if (new_entry_country_id != old_entry_country_id || new_company_type != old_company_type) {
                        this.isShowVaxNameAction(this.selfData);
                        if (this.isShowVaxName) {
                            //客户主动切换时,给予默认值
                            if ($.inArray(new_entry_country_id, this.$eu_country) !== -1 && old_isInit == 1) {
                                if (this.selfData.country_code == 'GR') {
                                    this.selfData.entry_tax_number = 'EL';
                                } else {
                                    this.selfData.entry_tax_number = this.selfData.country_code ?
                                        this.selfData.country_code.toUpperCase() : '';
                                }
                            }else{
                                if(old_isInit == 1){
                                    this.selfData.entry_tax_number = '';
                                }
                            }
                        } else {
                            this.selfData.entry_tax_number = '';
                        }
                    }
                    //如果客户主动切换国家
                    if (old_isInit == 1 && new_entry_country_id != old_entry_country_id) {
                        //国家为美国则 自动匹配 国家信息
                        if (new_entry_country_id == 223) {
                            this.matchCountryInfo(new_entry_country_id, new_entry_postcode);
                        }
                        //自动切换州信息
                        this.selfData.entry_state = '';
                        this.stateData = this.getStateByCountryId(new_entry_country_id);
                    }
                }
            }
        },
        computed: {
            getCompanyTypeName: function(){
                return function (country_id, company_type) {
                    var company_text = '';
                    var eu_all_country = this.$eu_country.concat(this.$other_eu_country);
                    if (company_type == 1) {
                        switch (true) {
                            case (country_id == 176):
                                company_text = this.$tran('address_ru_type_business');
                                break;
                            case (this.$jquery.inArray(country_id, eu_all_country) !== -1):
                                company_text = this.$tran('address_eu_type_business');
                                break;
                            case (this.$jquery.inArray(country_id, [13, 153]) !== -1):
                                company_text = this.$tran('address_au_type_business');
                                break;
                            default:
                                company_text = this.$tran('address_type_business');
                                break;
                        }
                    } else {
                        switch (true) {
                            case (country_id == 176):
                                company_text = this.$tran('address_ru_type_individual');
                                break;
                            case (this.$jquery.inArray(country_id, eu_all_country) !== -1):
                                company_text = this.$tran('address_eu_type_individual');
                                break;
                            case (this.$jquery.inArray(country_id, [13, 153]) !== -1):
                                company_text = this.$tran('address_au_type_individual');
                                break;
                            default:
                                company_text = this.$tran('address_type_individual');
                                break;
                        }
                    }
                    return company_text;
                }
            },
            init: function () {
                return {
                    entry_country_id: this.selfData.entry_country_id,
                    isInit: this.isInit,
                    company_type: this.selfData.company_type
                }
            },
            /**
             * 获取表单验证错误信息
             * @returns {Function}
             */
            getError: function () {
                return function (name) {
                    //只验证输入过内容的input和点击提交时验证
                    if (this.nowInputName.indexOf(name) > -1 || this.nowInputName.indexOf('all') > -1) {
                        var errors = this.rulesMessage[name] ? this.rulesMessage[name] : {};
                        if (errors) {
                            for (var i in errors) {
                                if (errors[i]) {
                                    return errors[i];
                                }
                            }
                        }
                    }
                }
            },
            /**
             * 根据当前变化规则判断 input 必填标示 是否展示
             * @returns {function(*): (string)}
             */
            requiredTag: function () {
                return function (name) {
                    name = (name === 'company_type') ? "AddressType" : name;
                    var str = this.validateRule && this.validateRule.rules && this.validateRule.rules[name]
                    && this.validateRule.rules[name]['required']
                        ? '' : this.$tran('company_optional');
                    return str;
                }
            },
            /**
             * input label 字段表述
             * @returns {function(*): string}
             */
            filedLabelName: function () {
                return function (name) {
                    var data = this.selfData;
                    var filed_name = {
                        'entry_firstname': this.$tran('address_first_name'),
                        'entry_lastname': this.$tran('address_last_name'),
                        'entry_country_id': this.$tran('address_country'),
                        'company_type': this.$tran('address_type'),
                        'entry_company': this.$tran('address_company_name'),
                        'entry_street_address': this.$tran('address_street_1'),
                        'entry_suburb': this.$tran('address_street_2'),
                        'entry_city': this.$tran('address_city'),
                        'entry_state': this.$tran('address_state'),
                        'entry_postcode': this.$tran('address_post_code'),
                        'entry_telephone': this.$tran('address_phone_number'),
                        'entry_tax_number': this.$tran('address_tax_input_title')
                    }
                    if (data) {
                        var entry_country_id = parseInt(data.entry_country_id);
                        var company_type = data.company_type;
                        var eu_country = this.$eu_country;
                        //欧盟
                        var is_in_germany_area = this.$jquery.inArray(entry_country_id, eu_country) !== -1;
                        //非欧盟
                        var is_in_other_germany_area = this.$jquery.inArray(entry_country_id, other_eu_country) !== -1;
                        //欧洲国家
                        if (is_in_germany_area || is_in_other_germany_area) {
                            filed_name['entry_street_address'] = this.$tran('address_eu_street_1');
                            filed_name['entry_suburb'] = this.$tran('address_eu_street_2');
                            filed_name['entry_postcode'] = this.$tran('address_eu_post_code')
                            if (is_in_germany_area) {
                                filed_name["entry_tax_number"] = this.$tran("address_eu_tax_input_title");
                            }
                        } else if (entry_country_id === 13) {
                            //澳大利亚
                            filed_name['entry_city'] = this.$tran('address_au_city');
                            filed_name['entry_state'] = this.$tran('address_au_state');
                            filed_name['entry_postcode'] = this.$tran('address_au_post_code');
                        } else if (entry_country_id == 176) {
                            //俄罗斯
                            filed_name["company_type"] = this.$tran("address_ru_type");
                        }
                        //巴西
                        if(entry_country_id == 30){
                            if(company_type == 'IndividualType'){
                                filed_name["entry_tax_number"] = this.$tran("address_br_tax_input_title_2");
                            }else{
                                filed_name["entry_tax_number"] = this.$tran("address_br_tax_input_title_1");
                            }
                        }
                        //阿更挺
                        if(entry_country_id == 10){
                            if(company_type == 'IndividualType'){
                                filed_name["entry_tax_number"] = this.$tran("address_ar_tax_input_title_2");
                            }else{
                                filed_name["entry_tax_number"] = this.$tran("address_ar_tax_input_title_1");
                            }
                        }
                        //智利
                        if(entry_country_id == 43){
                            filed_name["entry_tax_number"] = this.$tran("address_cl_tax_input_title");
                        }
                        //新加坡
                        if(entry_country_id == 188){
                            filed_name["entry_tax_number"] = this.$tran("address_sg_tax_input_title");
                        }
                        if(entry_country_id == 62){
                            filed_name["entry_tax_number"] = this.$tran("address_ec_tax_input_title");
                        }
                        //智利
                        if(entry_country_id == 99){
                            if(company_type == 'IndividualType'){
                                filed_name["entry_tax_number"] = this.$tran("address_in_tax_input_title_1");
                            }else{
                                filed_name["entry_tax_number"] = this.$tran("address_in_tax_input_title_2");
                            }
                        }
                        //加拿大
                        if(entry_country_id == 13){
                            filed_name["entry_tax_number"] = this.$tran("address_au_tax_input_title");
                        }
                    }
                    return filed_name[name] ? filed_name[name] : '';
                }
            },
            /**
             * 封装data数据
             */
            postData: function () {
                var data = $.extend(true, {}, this.selfData);
                data['securityToken'] = this.$securityToken;
                //将公司类型转换为AddressType
                data['AddressType'] = data.company_type;
                data['editType'] = this.addressType;
                data['isUseShipping'] = this.isUseShippingAddressAsBilling;
                //注册报价id
                if(this.$isset(this.$quotes_id)){
                    data['quotes_id'] = this.$quotes_id;
                }else if(this.$isset(this.$inquiry_id)){
                    data['inquiry_id'] = this.$inquiry_id;
                }
                //如果当前地址不展示税号,删除该字段提交
                if (!this.isShowVaxName) {
                    delete data['entry_tax_number'];
                }
                //如果当前地址不展示公司,删除该字段提交
                if (!this.isShowCompanyName) {
                    delete data['entry_company'];
                }
                //如果当前地址不展示州,删除该字段提交
                if (!this.stateData.length) {
                    delete data['entry_state'];
                }
                return data;
            }
        },
        methods: {
            //根据country id 自动查询国家数据
            matchCountryInfo: function (country_id, zip_code) {
                if (!country_id || !zip_code) {
                    return;
                }
                var _this = this;
                var url = this.$baseUrl + '&ajax_request_action=post_match_state';
                this.$jquery.ajax({
                    url: url,
                    data: {
                        country_id: country_id,
                        zip_code: zip_code,
                        securityToken: this.$securityToken
                    },
                    type: 'post',
                    dataType: "json",
                    success: function (data) {
                        if (data.data.city) {
                            _this.selfData.entry_city = data.data.city;
                        }
                        if (data.data.state) {
                            _this.selfData.entry_state = data.data.state
                        }
                    }
                })
            },
            validate: function (data) {
                //检测表单信息
                this.validateObject.check(data, this.addressType);
                //监听当前表单验证规则
                this.validateRule = this.validateObject.validateRule;
                //监听当前表单错误信息
                this.rulesMessage = this.validateObject.rulesMessage;
                //返回验证状态
                return this.validateObject.isValid();
            },
            /**
             * 清除空格
             *
             * @param str
             * @returns {*}
             */
            trim: function (str) {
                return this.$jquery.trim(str);
            },
            //根据国家id 获取对应州数据
            getStateByCountryId: function (country_id) {
                var stateData = {};
                country_id = parseInt(country_id);
                switch (country_id) {
                    case 223:
                        stateData = us_state;
                        break;
                    case 38:
                        stateData = ca_state;
                        break;
                    case 138:
                        stateData = mx_state;
                        break;
                    case 13:
                        stateData = au_state;
                        break;
                }
                return stateData;
            },
            //表单回退
            back: function () {
                this.$emit('close-edit-form');
                document.body.style.overflow='hidden';
            },
            /**
             * 设置国家 id
             * @param item
             */
            changeCountryId: function (item) {
                this.selfData.entry_country_id = 223;
                this.selfData.country_code = 'US';
                if (item) {
                    this.selfData.entry_country_id = item.countries_id;
                    this.selfData.country_code = item.countries_iso_code_2;
                    this.selfData.tel_prefix = item.tel_prefix
                }
            },
            /**
             * 提交数据
             */
            submit: function (e) {

                var data = this.selfData;

                //验证全部的input框
                this.nowInputName = ['all'];

                var valid = this.validate(data);
                var action = parseInt(this.actionType);
                var addressType = parseInt(this.addressType);
                if (!valid) {
                    return;
                }
                // var checkSite = this.$siteLock(data);
                // //运输地址 编辑的时候 检测当前地址是否被锁定
                // if (checkSite['isLock'] && addressType == 0) {
                //     this.$showMessage(checkSite['lockTip']);
                //     return;
                // }
                switch (action) {
                    //新增地址
                    case 1:
                        //账单地址和运输地址公用
                        // alert(addressType);
                        console.log( JSON.stringify(data));

                        //addressType, data
                        //addressType 0 add shipping address
                        //addressType 2 add billing address









                        // this.addAddress(addressType, data);
                        break;
                    //编辑地址
                    case 2:
                        switch (addressType) {
                            case 0:
                                //编辑运输地址
                                this.editShippingAddress(addressType, data);
                                break;
                            case 2:
                                //账单地址
                                this.editBillingAddress(addressType, data);
                                break;
                        }
                        break;
                }

            },
            handleReponseError: function (errors) {
                if (errors['AddressType']) {
                    errors['company_type'] = errors['AddressType'];
                    delete errors['AddressType'];
                }
                for (var i in errors) {
                    if (this.rulesMessage[i]) {
                        for (var ii in errors[i]) {
                            this.rulesMessage[i][ii] = errors[i][ii];
                            this.rulesMessage = this.$jquery.extend(true, {}, this.rulesMessage)
                        }
                    }
                }
            },
            /**
             * 新增运输或账单地址地址
             */
            addAddress: function (addressType, data) {
                var currentItem = data;
                var action = 'add_customer_address';
                var url = this.$baseUrl + '&ajax_request_action=' + action;
                var data = this.postData;
                var _this = this;
                //如果没有账单地址默认使用 运输地址作为账单地址
                if(!this.$isset(this.$parent.billingAddress) && addressType == 0){
                    data["isUseShipping"] = 1;
                }
                this.$jquery.ajax({
                    url: url,
                    data: data,
                    type: 'post',
                    dataType: "json",
                    beforeSend: function () {
                        //重置内部错误
                        _this.rulesMessage = _this.$jquery.extend(true, {}, _this.validateObject.rulesMessage);
                        _this.$loading(addressType, 1);
                    },
                    success: function (data) {
                        var message = data.message;
                        var status = data.status;
                        var result = data.data;
                        //字段错误
                        _this.responseStatusHandle(status, result, message, function (result) {
                            var billingAddress = result.billing_address;
                            var shippingAddress = result.shipping_address;
                            currentItem['address_book_id'] = result.address_book_id;
                            var result = _this.$formatAddressResult(
                                billingAddress,
                                shippingAddress,
                                result,
                                currentItem,
                                addressType,
                                'add'
                            );
                            _this.$emit('change-address', result);
                        });
                        if (status != 200 || addressType != 2) {
                            _this.$loading(addressType, 0);
                        }
                    },
                    error: function (e) {
                        _this.$showMessage(_this.$tran('system_busy'));
                        _this.$loading(addressType, 0);
                    }
                })
            },
            /**
             * 编辑运输地址
             *
             * @param addressType
             * @param data
             */
            editShippingAddress: function (addressType, data) {
                var currentItem = data;
                var action = 'edit_shipping_address';
                var url = this.$baseUrl + '&ajax_request_action=' + action;
                var data = this.postData;
                var _this = this;
                this.$jquery.ajax({
                    url: url,
                    data: _this.postData,
                    type: 'post',
                    dataType: "json",
                    beforeSend: function () {
                        //重置内部错误
                        _this.rulesMessage = _this.$jquery.extend(true, {}, _this.validateObject.rulesMessage);
                        _this.$loading(addressType, 1);
                    },
                    success: function (data) {
                        var message = data.message;
                        var status = data.status;
                        var result = data.data;
                        //响应状态处理
                        _this.responseStatusHandle(status, result, message, function (result) {
                            var billingAddress = result.billing_address;
                            var shippingAddress = result.shipping_address;
                            var result = _this.$formatAddressResult(
                                billingAddress,
                                shippingAddress,
                                result,
                                currentItem,
                                addressType,
                                'update'
                            );
                            _this.$emit('change-address', result);
                        });
                        _this.$loading(addressType, 0);
                    },
                    error: function (e) {
                        _this.$showMessage(_this.$tran('system_busy'));
                        _this.$loading(addressType, 0);
                    }
                })
            },
            /**
             * 编辑账单地址
             *
             * @param addressType
             * @param data
             */
            editBillingAddress: function (addressType, data) {
                var currentItem = data;
                var action = 'edit_billing_address';
                var url = this.$baseUrl + '&ajax_request_action=' + action;
                var data = this.postData;
                var _this = this;
                this.$jquery.ajax({
                    url: url,
                    data: _this.postData,
                    type: 'post',
                    dataType: "json",
                    beforeSend: function () {
                        //重置内部错误
                        _this.rulesMessage = _this.$jquery.extend(true, {}, _this.validateObject.rulesMessage);
                        _this.$loading(addressType, 1);
                    },
                    success: function (data) {
                        var message = data.message;
                        var status = data.status;
                        var result = data.data;
                        //响应状态处理
                        _this.responseStatusHandle(status, result, message, function (result) {
                            var billingAddress = result.billing_address;
                            var shippingAddress = result.shipping_address;
                            var result = _this.$formatAddressResult(
                                billingAddress,
                                shippingAddress,
                                {},
                                currentItem,
                                addressType,
                                'update'
                            );
                            _this.$emit('change-address', result);
                        })
                        if (status != 200) {
                            _this.$loading(addressType, 0);
                        }
                    },
                    error: function (e) {
                        _this.$showMessage(_this.$tran('system_busy'));
                        _this.$loading(addressType, 0);
                    }
                })
            },

            /**
             *状态码处理
             *
             * @param result data.data
             * @param message 错误信息
             * @param response
             * @param successCallBack
             */
            responseStatusHandle: function (status, result, message, successCallBack) {
                status = parseInt(status);
                switch (status) {
                    //产生内部错误
                    case 422:
                        this.handleReponseError(result);
                        break;
                    //消费税地址验证错误
                    case 405:
                        this.$showMessage(result.message);
                        break;

                    case 406:
                        this.$showMessage(message);
                        break;
                    //消费税计算错误
                    case 408:
                        var tip = typeof result.error!='undefined' &&
                            typeof result.error.message!='undefined' && result.error.message ? result.error.message : message
                        this.$showMessage(tip);
                        break;
                    //登录过期
                    case 402:
                        this.$expiredLogin();
                        break;
                    case 200:
                        return successCallBack(result);
                }
            },

            /**
             * 是否展示 税号框
             */
            isShowVaxNameAction: function (data) {
                if (!data) {
                    return;
                }
                var entry_country_id = parseInt(data.entry_country_id);
                var eu_country = this.$eu_country;
                var other_eu_country = this.$other_eu_country;
                var company_type = data.company_type;
                this.isShowVaxName = true;
                //欧盟
                var is_in_germany_area = this.$jquery.inArray(entry_country_id, eu_country) !== -1;
                //欧盟国家 非欧盟国家 个人不出现税号框，企业出现税号框
                var is_in_other_germany_area = this.$jquery.inArray(entry_country_id, other_eu_country) !== -1;
                this.vaxTip = this.$tran('address_non_eu_tax_input_tips');
                console.log(entry_country_id);
                /**
                 * 1.澳大利亚的企业税号名称企业税号名称是ABN，选填，
                 * 2.巴西Brazil，阿根廷Argentina，地址类型是business和individual均需填写税号，必填项。
                 * 3.新加坡个人类型和企业类型均有税号
                 * 4.智利Chile，地址类型是business
                 * 5.印度个人类型和企业类型均有税号
                 * 6.其他没有单独列出的国家,个人和企业都有税号框
                 * 7.新西兰的个人和企业都不要税号框。
                 */
                switch (entry_country_id) {
                    //新加坡
                    case 188:
                    //印度
                    case 99:
                    //巴西
                    case 30:
                    //阿根廷
                    case 10:
                        this.isShowVaxName = true;
                        this.vaxTip = this.$tran('address_non_eu_tax_input_tips');
                        //新加坡不展示气泡
                        if(entry_country_id == 188){
                            this.vaxTip = '';
                        }
                        break;
                    //智利 墨西哥 厄瓜多尔 澳大利亚
                    case 43:
                    case 138:
                    case 62:
                    case 13:
                        if (company_type === "BusinessType") {
                            this.isShowVaxName = true;
                            if (entry_country_id == 138 || entry_country_id === 62) {
                                this.vaxTip = this.$tran('address_non_eu_tax_input_tips');
                            }
                            //澳大利亚不展示气泡
                            if(entry_country_id == 13){
                                this.vaxTip = '';
                            }
                        } else {
                            this.isShowVaxName = false;
                        }
                        break;
                    //美国 加拿大 新西兰
                    case 223:
                    case 38:
                    case 153:
                    case 176:
                        this.isShowVaxName = false;
                        break;
                    default :
                        //欧盟和非欧盟 个人不出现税号框，企业出现税号框
                        if (is_in_germany_area || is_in_other_germany_area) {
                            if (company_type !== "BusinessType") {
                                this.isShowVaxName = false;
                            } else {
                                if (is_in_germany_area) {
                                    this.vaxTip = this.$tran('address_eu_tax_input_tips');
                                } else {
                                    this.vaxTip = this.$tran('address_non_eu_tax_input_tips');
                                }
                            }
                        } else {
                            this.isShowVaxName = true;
                        }
                }


            },

            //判断是否对当前输入过内容的input进行判断
            changeNowInput: function (name) {
                if (this.nowInputName.indexOf(name) == -1) {
                    this.nowInputName.push(name);
                }
            }
        },
        template: " <div>" +
            "       <form name='editForm' class='editForm'> " +
            "            <h2 class='popup-main-tit'>{{$tran('basic_information')}}</h2>\n" +
            "            <div class='popup-main-ipt'>" +
            "                <div class='popup-main-ipt-con'>" +
            "                    <h3 class='popup-main-ipt-con-tit'>{{filedLabelName('entry_firstname')}}" +
            "                       {{requiredTag('entry_firstname')}}</h3>\n" +
            "                    <input type='text' name='entry_firstname' v-model='selfData.entry_firstname' @focus='changeNowInput(\"entry_firstname\")'>" +
            "                    <label v-if='getError(\"entry_firstname\")' :class='{show_block:getError(\"entry_firstname\")}' class='error_prompt'>" +
            "                         {{getError('entry_firstname')}}  " +
            "                   </label>" +
            "                </div>" +
            "                <div class='popup-main-ipt-con'>\n" +
            "                    <h3 class='popup-main-ipt-con-tit'>{{filedLabelName('entry_lastname')}}" +
            "                           {{requiredTag('entry_lastname')}}</h3>\n" +
            "                    <input type='text' name='entry_lastname' v-model='selfData.entry_lastname' @focus='changeNowInput(\"entry_lastname\")'>" +
            "                    <label v-if='getError(\"entry_lastname\")' " +
            "                           :class='{show_block:getError(\"entry_lastname\")}' class='error_prompt'>" +
            "                           {{getError('entry_lastname')}}" +
            "                   </label>" +
            "                </div>" +
            "            </div>\n" +
            "            <div class='popup-main-ipt'>" +
            "                <div class='popup-main-ipt-con'>" +
            "                    <h3 class='popup-main-ipt-con-tit'>{{filedLabelName('entry_country_id')}}" +
            "                          {{requiredTag('entry_country_id')}}</h3>" +
            "                    <country-select @change-country-id='changeCountryId'" +
            "                    :current-country-id='selfData.entry_country_id' :address-type='addressType'></country-select>" +
            "                    <label v-if='getError(\"entry_country_id\")'" +
            "                           :class='{show_block:getError(\"entry_country_id\")}'" +
            "                           class='error_prompt'>" +
            "                       {{getError('entry_country_id')}}" +
            "                   </label>" +
            "                </div>" +
            "                <div class='popup-main-ipt-con'>" +
            "                    <h3 class='popup-main-ipt-con-tit'>{{filedLabelName('company_type')}}" +
            "                       {{requiredTag('company_type')}}</h3>" +
            "                    <select v-model='selfData.company_type' name='company_type' @focus='changeNowInput(\"company_type\")'>" +
            "                        <option value=''>{{$tran('address_type_default')}}</option>" +
            "                        <option value='BusinessType'>" +
            "                           {{getCompanyTypeName(selfData.entry_country_id, 1)}}" +
            "                        </option>" +
            "                        <option value='IndividualType'>" +
            "                          {{getCompanyTypeName(selfData.entry_country_id, 2)}}" +
            "                        </option>" +
            "                    </select>\n" +
            "                    <label :class='{show_block:getError(\"company_type\")}' " +
            "                       class='error_prompt' v-if='getError(\"company_type\")'>" +
            "                     {{getError('company_type')}} " +
            "                    </label>" +
            "                </div>\n" +
            "            </div>" +
            "            <div class='popup-main-ipt'>\n" +
            "                <div v-if='isShowCompanyName' class='popup-main-ipt-con'>" +
            "                    <h3 class='popup-main-ipt-con-tit'>{{filedLabelName('entry_company')}}" +
            "                           {{requiredTag('entry_company')}}</h3>" +
            "                    <input type='text'  name='entry_company' v-model='selfData.entry_company' @focus='changeNowInput(\"entry_company\")'>" +
            "                    <label v-if='getError(\"entry_company\")' " +
            "                           :class='{show_block:getError(\"entry_company\")}'" +
            "                            class='error_prompt'>" +
            "                         {{getError('entry_company')}}" +
            "                   </label>" +
            "                </div>" +
            "               <div class='popup-main-ipt-con'>\n" +
            "                   <div v-if='isShowVaxName'>" +
            "                       <h3 class='popup-main-ipt-con-tit'>" +
            "                             {{filedLabelName('entry_tax_number')}} " +
            "                             {{requiredTag('entry_tax_number')}}" +
            "                            <div v-if='vaxTip' class='track_orders_wenhao aron_Muggles'>" +
            "                              <div class='question_bg tax_bubbles'></div>" +
            "                                <div class='question_text_01 leftjt'>" +
            "                                    <div class='arrow'></div>" +
            "                                    <div class='popover-content content_guest_f'>{{vaxTip}}</div> " +
            "                              </div> " +
            "                            </div>" +
            "                       </h3>" +
            "                        <input type='text' name='entry_tax_number' v-model='selfData.entry_tax_number' @focus='changeNowInput(\"entry_tax_number\")'>" +
            "                        <label v-if='getError(\"entry_tax_number\")' " +
            "                           :class='{show_block:getError(\"entry_tax_number\")}'" +
            "                            class='error_prompt'>" +
            "                         {{getError('entry_tax_number')}}" +
            "                        </label>" +
            "                   </div>" +
            "               </div>" +
            "          </div>" +
            "            <h2 class='popup-main-tit second'>{{$tran('address_information')}}</h2>" +
            "            <div class='popup-main-ipt'>" +
            "                <div class='popup-main-ipt-con'>" +
            "                    <h3 class='popup-main-ipt-con-tit'>{{filedLabelName('entry_street_address')}}" +
            "                       {{requiredTag('entry_street_address')}}</h3>\n" +
            "                    <input name='entry_street_address' v-model='selfData.entry_street_address' type='text'" +
            "                    :placeholder='$tran(\"street_address_c\")' @focus='changeNowInput(\"entry_street_address\")'>" +
            "                    <label v-if='getError(\"entry_street_address\")'" +
            "                           :class='{show_block:getError(\"entry_street_address\")}'" +
            "                           class='error_prompt'>" +
            "                           {{getError('entry_street_address')}} " +
            "                    </label>" +
            "                </div>\n" +
            "                <div class='popup-main-ipt-con'>" +
            "                    <h3 class='popup-main-ipt-con-tit'>{{filedLabelName('entry_suburb')}}" +
            "                           {{requiredTag('entry_suburb')}}</h3>\n" +
            "                    <input name='entry_suburb' type='text' v-model='selfData.entry_suburb' :placeholder='$tran(\"street_apt\")' @focus='changeNowInput(\"entry_suburb\")'>" +
            "                    <label v-if='getError(\"entry_suburb\")' " +
            "                           :class='{show_block:getError(\"entry_suburb\")}'" +
            "                           class='error_prompt'>" +
            "                           {{getError('entry_suburb')}}" +
            "                     </label>" +
            "                </div>" +
            "            </div>" +
            "            <div class='popup-main-ipt'>" +
            "                <div class='popup-main-ipt-con'>" +
            "                    <h3 class='popup-main-ipt-con-tit'>{{filedLabelName('entry_city')}}" +
            "                       {{requiredTag('entry_city')}}</h3>" +
            "                    <input name='entry_city' v-model='selfData.entry_city' type='text' placeholder='' @focus='changeNowInput(\"entry_city\")'>" +
            "                    <label v-if='getError(\"entry_city\")'" +
            "                        :class='{show_block:getError(\"entry_city\")}' class='error_prompt'>" +
            "                           {{getError('entry_city')}}" +
            "                    </label>" +
            "                </div>" +
            "                <div class='popup-main-ipt-con' v-if='stateData.length'>" +
            "                    <h3 class='popup-main-ipt-con-tit'>{{filedLabelName('entry_state')}}" +
            "                       {{requiredTag('entry_state')}}</h3>" +
            "                    <select v-model='selfData.entry_state' name='entry_state' @focus='changeNowInput(\"entry_state\")'>" +
            "                        <option value=''>{{$tran('state_select')}}</option>" +
            "                        <option v-for='stateOption in stateData' :value='selfData.entry_country_id ==223 ? stateOption.name : stateOption.code'>{{stateOption.name}}</option>" +
            "                    </select>" +
            "                    <label v-if='getError(\"entry_state\")'" +
            "                        :class='{show_block:getError(\"entry_state\")}' class='error_prompt'>" +
            "                            {{getError('entry_state')}}" +
            "                   </label>" +
            "                </div>" +
            "            </div>" +
            "            <div class='popup-main-ipt'>" +
            "                <div class='popup-main-ipt-con'>" +
            "                    <h3 class=\"popup-main-ipt-con-tit\">{{filedLabelName('entry_postcode')}}" +
            "                           {{requiredTag('entry_postcode')}}</h3>" +
            "                    <input type='text' name='entry_postcode' v-model='selfData.entry_postcode' @focus='changeNowInput(\"entry_postcode\")'>" +
            "                    <label v-if='getError(\"entry_postcode\")'" +
            "                           :class='{show_block:getError(\"entry_postcode\")}' class='error_prompt'>" +
            "                         {{getError('entry_postcode')}} " +
            "                    </label>" +
            "                </div>" +
            "                <div class='popup-main-ipt-con phone'>" +
            "                    <h3 class='popup-main-ipt-con-tit'>{{filedLabelName('entry_telephone')}}" +
            "                           {{requiredTag('entry_telephone')}}</h3>" +
            "                    <div class='phone-box'>{{selfData.tel_prefix}}</div>" +
            "                    <input v-model='selfData.entry_telephone' name='entry_telephone' type='text' @focus='changeNowInput(\"entry_telephone\")'>" +
            "                    <label v-if='getError(\"entry_telephone\")'" +
            "                        :class='{show_block:getError(\"entry_telephone\")}' class='error_prompt'>" +
            "                       {{getError('entry_telephone')}}" +
            "                    </label>" +
            "                </div>\n" +
            "            </div>\n" +
            "            <div class='popup-address-tips'>" +
            "                <p v-if='addressType==0' class='popup-address-tips-txt'>{{$tran('address_popup_tips')}}</p>" +
            "                <p class='popup-address-tips-txt' v-if='selfData.entry_country_id==188'>{{$tran('covid_meesage')}}</p>\n" +
            "            </div>" +
            "            <div class='popup-main-btn'>" +
            "                <a href='javascript:;' class='popup-main-btn-back' @click='back'>" +
            "                       {{$isset(addressList) ? $tran('address_back') : $tran('Cancel')}}" +
            "                </a>" +
            "                <a href='javascript:;' class='popup-main-btn-save' @click='submit'>{{$tran('address_save')}}</a>" +
            "            </div>" +
            "           </form>" +
            "        </div>"
    },
    //loading
    'loading': {
        props: ['className'],
        template: "<div :class='className' class='popup-loading'>" +
            "           <div class='loader_order loader_order_alone'>" +
            "                <svg class='circular' viewBox='25 25 50 50'>" +
            "                     <circle class='path' cx='50' cy='50' r='20' fill='none' stroke-width='3'" +
            "                           stroke-miterlimit='10'>" +
            "                      </circle>" +
            "                </svg>" +
            "          </div>" +
            "     </div>"
    },
    //eleccheck 组件
    'echeck': {
        props: ['echeckInfo', 'echeckInfoValidateRule', 'isNeedEcheckInfo'],
        data: function () {
            return {
                //表单验证规则
                validateObject: {},
                rulesMessage: {},
                isInit: 0
            }
        },
        watch: {
            "echeckInfo": {
                handler: function (newVal, oldVal) {
                    this.validate(newVal);
                },
                deep: true
            }
        },
        methods: {
            validate: function (data) {
                this.validateObject.check(data);
                this.rulesMessage = this.validateObject.rulesMessage;
                return this.validateObject.isValid();
            }
        },
        computed: {
            /**
             * 获取表单验证错误信息
             * @returns {Function}
             */
            getError: function () {
                return function (name) {
                    var errors = this.rulesMessage[name] ? this.rulesMessage[name] : {};
                    if (errors) {
                        for (var i in errors) {
                            if (errors[i]) {
                                return errors[i];
                            }
                        }
                    }
                }
            },
        },
        created: function () {
            this.validateObject = new this.$Validate(this.echeckInfo, this.echeckInfoValidateRule);
        },
        template: "<div>" +
            "        <p>*{{$tran('payment_electronic_content')}}</p>\n" +
            "        <div v-if='isNeedEcheckInfo'>"+
            "                <div class=\"checkout-body-left-payment-con-describe-form\">\n" +
            "                       <div class=\"checkout-body-left-payment-con-describe-ipt\">\n" +
            "                            <h3>{{$tran('payment_erc_name')}}*</h3>\n" +
            "                            <input v-model=\"echeckInfo.account_name\" name=\"account_name\" type=\"text\">\n" +
            "                            <label v-if='getError(\"account_name\")' :class='{show_block:getError(\"account_name\")}' class='error_prompt'>" +
            "                                {{getError('account_name')}}  " +
            "                            </label>" +
            "                        </div>\n" +
            "                        <div class=\"checkout-body-left-payment-con-describe-ipt\">\n" +
            "                             <h3>{{$tran('payment_erc_number')}}*</h3>\n" +
            "                             <input v-model=\"echeckInfo.account_number\" name=\"account_number\" type=\"text\">\n" +
            "                            <label v-if='getError(\"account_number\")' :class='{show_block:getError(\"account_number\")}' class='error_prompt'>" +
            "                                {{getError('account_number')}}  " +
            "                            </label>" +
            "                        </div>\n" +
            "               </div>\n" +
            "               <div class=\"checkout-body-left-payment-con-describe-form\">\n" +
            "                    <div class=\"checkout-body-left-payment-con-describe-ipt\">\n" +
            "                            <h3>{{$tran('payment_erc_type')}}*</h3>\n" +
            "                                <select name=\"account_type\" v-model=\"echeckInfo.account_type\">\n" +
            "                                    <option value=\"1\">Checking</option>\n" +
            "                                    <option value=\"2\">Saving</option>\n" +
            "                                 </select>\n" +
            "                            <label v-if='getError(\"account_type\")' :class='{show_block:getError(\"account_type\")}' class='error_prompt'>" +
            "                                {{getError('account_type')}}  " +
            "                            </label>" +
            "                    </div>\n" +
            "                     <div class=\"checkout-body-left-payment-con-describe-ipt\">\n" +
            "                             <h3>{{$tran('payment_erc_number_confirm')}}*</h3>\n" +
            "                                 <input v-model=\"echeckInfo.account_number_confirm\"\n" +
            "                                         name=\"account_number_confirm\" type=\"text\">\n" +
            "                            <label v-if='getError(\"account_number_confirm\")' :class='{show_block:getError(\"account_number_confirm\")}' class='error_prompt'>" +
            "                                {{getError('account_number_confirm')}}  " +
            "                            </label>" +
            "                      </div>\n" +
            "               </div>\n" +
            "               <div class=\"checkout-body-left-payment-con-describe-form\">\n" +
            "                    <div class=\"checkout-body-left-payment-con-describe-ipt\">\n" +
            "                          <h3>{{$tran('payment_erc_routing_number')}}*</h3>\n" +
            "                          <input v-model=\"echeckInfo.account_route\" name=\"account_route\" type=\"text\">\n" +
            "                            <label v-if='getError(\"account_route\")' :class='{show_block:getError(\"account_route\")}' class='error_prompt'>" +
            "                                {{getError('account_route')}}  " +
            "                            </label>" +
            "                    </div>\n" +
            "                </div>\n" +
            "           </div>"+
            "      </div>"
    },
    'alfaBox': {
        props: ['alfaInfo', 'defaultAlfaInfoId'],
        data: function () {
            return {
                //alfa 弹窗展示
                isShowAlfaEditForm: {'public-popup': true, 'isShowPoup': false},
                currentDelete: 0
            }
        },
        created: function () {
        },
        methods: {
            choiceAlfaItem: function (item) {
                if (this.$isset(item)) {
                    this.$emit('choice-alfa-item', item)
                }
            },
            //展示删除确认提示语
            showDelteTip: function (item) {
                this.currentDelete = item.id
            },
            //关闭错误确认提示语
            closeDeleteTip: function () {
                this.currentDelete = 0;
            },
            /**
             * 1.编辑啊 2.新增
             * @param item
             * @param type
             */
            showCashForm: function (item, type) {
                this.$emit('show-cash-form', item, type);
            },
            closeCashForm: function () {
                this.$emit('close-cash-form', item, type);
            },
            /**
             * 展示新增弹窗
             */
            showCashAddPopup: function () {
                this.$emit('show-cash-add-popup')
            },
            /**
             * 删除
             * @param item
             */
            deleteCashInfo: function (item) {
                this.$emit('delete-cash-info', item);
            }
        },
        computed: {
            /**
             * 当前 item name
             * @param item
             * @returns {string}
             */
            titleName: function () {
                return function (item) {
                    var name = '';
                    if (typeof item != 'undefined' && item) {
                        if (item.type == 1) {
                            name = item.alfa_organization ? item.alfa_organization : ''
                        } else {
                            name = item.card_path_name ? item.card_path_name : ''
                        }
                    }
                    return name;
                }
            }
        },
        template: "<div>" +
            "       <p>{{$tran('payment_yandex_des')}}</p>\n" +
            "       <div v-if='$isset(alfaInfo)'>" +
            "          <div class=\"checkout-body-left-payment-con-describe-choose\">" +
            "               <div  @click='choiceAlfaItem(item)'  v-for='item in alfaInfo' :key='item.id' :class='{active:defaultAlfaInfoId == item.id, cursor:true}'" +
            "                        class=\"checkout-body-left-payment-con-describe-choose-con\">" +
            "                       <div class=\"checkout-body-left-payment-con-describe-choose-con-left\">" +
            "                               <span class=\"icon iconfont\">" +
            "                                  {{defaultAlfaInfoId == item.id ?  '&#xf021;':'&#xf022;'}}" +
            "                               </span>" +
            "                                <div" +
            "                                      class=\"checkout-body-left-payment-con-describe-choose-con-left-information\">" +
            "                                     <p class=\"checkout-body-left-payment-con-describe-choose-con-left-information-name\">" +
            "                                               {{titleName(item)}}" +
            "                                     </p>" +
            "                                  <div v-if='item[\"type\"] == 1'>" +
            "                                     <p class=\"checkout-body-left-payment-con-describe-choose-con-left-information-txt\">" +
            "                                               {{item.alfa_legal_address}}," +
            "                                     </p>" +
            "                                     <p class=\"checkout-body-left-payment-con-describe-choose-con-left-information-txt\">" +
            "                                                {{item.alfa_inn ? item.alfa_inn+', ' : ''}}" +
            "                                                {{item.alfa_kpp ? item.alfa_kpp+', ':''}}" +
            "                                                {{item.alfa_bic ? item.alfa_bic+', ' : ''}}" +
            "                                                {{item.alfa_kpp ? item.alfa_kpp : ''}}</p>" +
            "                                     <p class=\"checkout-body-left-payment-con-describe-choose-con-left-information-txt\">" +
            "                                               {{item.alfa_email ? item.alfa_email : ''}}" +
            "                                               {{item.alfa_phone ? item.alfa_phone  : ''}}" +
            "                                       </p>" +
            "                                   </div>" +
            "                                </div>" +
            "                      </div>" +
            "                       <div class=\"checkout-body-left-payment-con-describe-choose-con-right\">" +
            "                               <a href=\"javascript:;\" @click='showCashForm(item,1)'>{{$tran('payment_alfa_edit')}}</a>" +
            "                               <a href=\"javascript:;\" @click='showDelteTip(item)'>{{$tran('payment_alfa_remove')}}</a>" +
            "                               <div class=\"popup-choose-address-con-right-tips\" v-if='currentDelete == item.id'>\n" +
            "                                     <div class=\"tips-arrow\"></div>\n" +
            "                                          <p class=\"popup-choose-address-con-right-tips-font\">{{$tran('address_ru_delete')}}</p>\n" +
            "                                          <div class=\"popup-choose-address-con-right-tips-btn\">\n" +
            "                                             <a href=\"javascript:;\" @click='closeDeleteTip' class=\"delete-address-cancel\">{{$tran('Cancel')}}</a>\n" +
            "                                             <a href=\"javascript:;\" class=\"delete-address-delete\" @click='deleteCashInfo(item)'>{{$tran('Delete')}}</a>\n" +
            "                                      </div>\n" +
            "                               </div>" +
            "                      </div>" +
            "                </div>\n" +
            "           </div>\n" +
            "         </div>" +
            "    </div>",
    },
    'cashEditForm': {
        methods: {
            closeCashForm: function () {
                this.$emit('close-cash-form');
            },
            validate: function (data) {
                this.validateObject.check(data);
                this.rulesMessage = this.validateObject.rulesMessage;
                return this.validateObject.isValid();
            }
        },
        data: function () {
            return {
                selfData: {
                    'alfa_organization': "",
                    'alfa_legal_address': '',
                    'alfa_inn': '',
                    'alfa_kpp': '',
                    'alfa_bic': '',
                    'alfa_bank_name': '',
                    'alfa_email': '',
                    'alfa_phone': ''
                },
                validateObject: {},
                rulesMessage: {}
            }
        },
        watch: {
            "selfData": {
                handler: function (newVal) {
                    this.validate(newVal);
                },
                deep: true
            }
        },
        computed: {
            /**
             * 获取表单验证错误信息
             * @returns {Function}
             */
            getError: function () {
                return function (name) {
                    var errors = this.rulesMessage[name] ? this.rulesMessage[name] : {};
                    if (errors) {
                        for (var i in errors) {
                            if (errors[i]) {
                                return errors[i];
                            }
                        }
                    }
                }
            }
        },
        props: [
            'currentCashInfo',
            'cashAction', //1编辑 2新增
            'cashValidateRule',
            'uniqueTag' //当前表单标识别
        ],
        created: function () {
            if (this.cashAction == 1) {
                this.selfData = this.$jquery.extend(true, {}, this.currentCashInfo);
            }
            this.validateObject = new this.$Validate(this.selfData, this.cashValidateRule);
        },
        template:
            "<div>" +
            "<form :ref='uniqueTag'>" +
            "  <div class=\"popup-main-ipt\">\n" +
            "        <div class=\"popup-main-ipt-con\">\n" +
            "              <h3 class=\"popup-main-ipt-con-tit\">{{$tran('payment_alfa_organization')}}*</h3>\n" +
            "              <input v-model='selfData.alfa_organization'" +
            "                name='alfa_organization' type=\"text\">\n" +
            "               <label v-if='getError(\"alfa_organization\")' :class='{show_block:getError(\"alfa_organization\")}' class='error_prompt'>" +
            "                       {{getError('alfa_organization')}}  " +
            "                </label>" +
            "        </div>\n" +
            "        <div class=\"popup-main-ipt-con\">\n" +
            "              <h3 class=\"popup-main-ipt-con-tit\">{{$tran('payment_alfa_legal')}}*</h3>\n" +
            "             <input v-model='selfData.alfa_legal_address' name='alfa_legal_address' type=\"text\">\n" +
            "              <label v-if='getError(\"alfa_legal_address\")' :class='{show_block:getError(\"alfa_legal_address\")}' class='error_prompt'>" +
            "                      {{getError('alfa_legal_address')}}  " +
            "              </label>" +
            "         </div>\n" +
            "  </div>\n" +
            "  <div class=\"popup-main-ipt\">\n" +
            "     <div class=\"popup-main-ipt-con\">\n" +
            "        <h3 class=\"popup-main-ipt-con-tit\">{{$tran('payment_alfa_inn')}}*</h3>\n" +
            "        <input v-model='selfData.alfa_inn' name='alfa_inn' minlength='10'" +
            "         maxlength='12' type='number'>\n" +
            "         <label v-if='getError(\"alfa_inn\")' :class='{show_block:getError(\"alfa_inn\")}' class='error_prompt'>" +
            "             {{getError('alfa_inn')}}  " +
            "            </label>" +
            "   </div>\n" +
            "   <div class=\"popup-main-ipt-con\">\n" +
            "                        <h3 class=\"popup-main-ipt-con-tit\">{{$tran('payment_alfa_kpp')}}*</h3>\n" +
            "                        <input  minlength='10' maxlength='12' v-model='selfData.alfa_kpp' name='alfa_kpp' type='number'>\n" +
            "                            <label v-if='getError(\"alfa_kpp\")' :class='{show_block:getError(\"alfa_kpp\")}' class='error_prompt'>" +
            "                                {{getError('alfa_kpp')}}  " +
            "                            </label>" +
            "                    </div>\n" +
            "  </div>\n" +
            "   <div class=\"popup-main-ipt\">\n" +
            "             <div class=\"popup-main-ipt-con\">\n" +
            "                        <h3 class=\"popup-main-ipt-con-tit\">{{$tran('payment_alfa_bic')}}*</h3>\n" +
            "                        <input v-model='selfData.alfa_bic' name='alfa_bic' maxlength='9' type='number'>\n" +
            "                            <label v-if='getError(\"alfa_bic\")' :class='{show_block:getError(\"alfa_bic\")}' class='error_prompt'>" +
            "                                {{getError('alfa_bic')}}  " +
            "                            </label>" +
            "             </div>\n" +
            "             <div class=\"popup-main-ipt-con\">\n" +
            "                        <h3 class=\"popup-main-ipt-con-tit\">{{$tran('payment_alfa_bank')}}*</h3>\n" +
            "                        <input v-model='selfData.alfa_bank_name' name='alfa_bank_name' type=\"text\">\n" +
            "                            <label v-if='getError(\"alfa_bank_name\")' :class='{show_block:getError(\"alfa_bank_name\")}' class='error_prompt'>" +
            "                                {{getError('alfa_bank_name')}}  " +
            "                            </label>" +
            "             </div>\n" +
            " </div>\n" +
            "  <div class=\"popup-main-ipt\">\n" +
            "           <div class=\"popup-main-ipt-con\">\n" +
            "                        <h3 class=\"popup-main-ipt-con-tit\">{{$tran('payment_alfa_mail')}}*</h3>\n" +
            "                        <input v-model='selfData.alfa_email' name='alfa_email'  type=\"text\">\n" +
            "                        <label v-if='getError(\"alfa_email\")' :class='{show_block:getError(\"alfa_email\")}' class='error_prompt'>" +
            "                                {{getError('alfa_email')}}  " +
            "                        </label>" +
            "            </div>\n" +
            "             <div class=\"popup-main-ipt-con\">\n" +
            "                        <h3 class=\"popup-main-ipt-con-tit\">{{$tran('payment_alfa_phone')}}*</h3>\n" +
            "                        <input v-model='selfData.alfa_phone' name='alfa_phone' type=\"text\">\n" +
            "                        <label v-if='getError(\"alfa_phone\")' :class='{show_block:getError(\"alfa_phone\")}' class='error_prompt'>" +
            "                                {{getError('alfa_phone')}}  " +
            "                        </label>" +
            "             </div>\n" +
            "  </div>\n" +
            "</form>" +
            "</div>"

    },
    'cashUploadForm': {
        props: ['uniqueTag', 'cashAction', 'currentCashInfo'],
        created: function () {
            if (this.cashAction == 1) {
                this.selfData = this.$jquery.extend(true, {}, this.currentCashInfo);
            }
            ;
            this.validateObject = new this.$Validate(this.selfData, this.cashValidateRule);
        },
        data: function () {
            return {
                isError: 0,
                fileVal: {},
                selfData: {
                    'card_path_name': '',
                    'card_path_upload': '',
                    'card_path': ''
                },
            }
        },
        methods: {
            upload: function () {
                var val = this.$jquery(this.$refs.uploadFIle).val();
                var name = '';
                this.isError = 0;
                if (val && this.$refs.uploadFIle.files && this.$refs.uploadFIle.files[0]) {
                    var info = this.$refs.uploadFIle.files[0];
                    var size = info['size'];
                    var type = info['type'];
                    var name = info['name'];
                    var ext = type.split('/')[1] ? type.split('/')[1] : '';
                    console.log(ext);
                    if (this.$jquery.inArray(ext, ['jpg', 'jpeg', 'pdf', 'png', 'doc', 'docx', 'xls', 'xlsx',
                        'vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                        'vnd.openxmlformats-officedocument.wordprocessingml.document']) == -1) {
                        this.isError = 1;
                    }
                    this.selfData.card_path_name = info['name'];
                    this.fileVal = info;
                }
            }
        },
        template: "<form :ref='uniqueTag'>" +
            "   <div class=\"checkout-body-left-payment-con-describe-cp-con-upload ru-cp-which\">\n" +
            "        <div class=\"checkout-body-left-payment-con-describe-cp-con-upload-left\">\n" +
            "                            <input ref='uploadFIle' @change='upload' name='paymentUploadFile' type='file'>\n" +
            "          <div class=\"checkout-body-left-payment-con-describe-cp-con-upload-left-txt\">\n" +
            "                                <span class=\"icon iconfont\"></span>\n" +
            "                                <span>{{selfData.card_path_name ? selfData.card_path_name: $tran('alfa_upload_select')}}</span>\n" +
            "                            </div>\n" +
            "                            <label v-if='isError' class='error_prompt show_block'>" +
            "                              {{$tran('alfa_upload_tip')}}" +
            "                           </label>" +
            "          </div>\n" +
            "           <div class=\"checkout-body-left-payment-con-describe-cp-con-upload-right\">\n" +
            "                            <span class=\"icon iconfont tips\"></span>\n" +
            "                            <div class=\"checkout-body-left-payment-con-describe-cp-con-upload-right-tips\">\n" +
            "                                <div class=\"tips-arrow\"></div>\n" +
            "                                <p> {{$tran('alfa_upload_tip')}}</p>\n" +
            "                            </div>\n" +
            "           </div>\n" +
            "       </div>" +
            "  </form> "
    }
};

function news_choose_country_second(oCountryCode,oCurrencyCode,oWebsite){
    var code = siteInfo['language_code'];
    if(code =='dn'){
        code = 'de-en';
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
