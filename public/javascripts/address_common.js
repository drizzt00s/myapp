// (change user type) or (choose country), check tax block
function check_tax_block(where=0) {
    var shipping_type = $.trim($('#upadd_tag').val());
    var country_id = parseInt($('#'+country_input_name).val());
    var valid_return = false;
    var element_id = 'upadd_entry_tax_number';
    var tax_number_obj = $('#'+element_id);
    var tax_number_block_obj = $('#tax_number_block');
    var tax_number_block_title = $('#tax_number_block_title');
    var bubble = false;

    // 欧洲国家
    var EU_country = [21,73,81,105,150,124,57,103,195,84,171,14,203,72,132,55,170,97,56,189,190,67,117,123,175,33,53,141];
    var other_eu_country = [98,27,236,242,126,2,140,160,204,5,122,182,245,70,85,87,75,134,137,12,250,243,228,222,244]; //222,244英国马恩岛脱欧

    // 2019-7-19 potato 澳大利亚地址表单title更改
    var postal_item_title = '';
    if (country_id == 13) {
        $('#city_title').html(city_item_au);
        $('#state_title').html(state_item_au);
        postal_item_title = postal_item_au;
        $('#fs_address1').html(fs_address1_origril);
        $('#fs_address2').html(fs_address2_origril);
    } else if (inArr(country_id, EU_country) || inArr(country_id, other_eu_country)) {
        $('#city_title').html(account_edit_city_eu);
        postal_item_title = fs_zip_code_eu;
        $('#fs_address1').html(fs_address_eu);
        $('#fs_address2').html(fs_address2_eu);
        $('#upadd_entry_street_address').rules("add", {
            required: true,
            messages: {
                required: street_error_eu,
            }
        });
    }  else {
        $('#upadd_entry_street_address').rules("add", {
            required: true,
            messages: {
                required: street_error_original,
            }
        });
        $('#fs_address1').html(fs_address1_origril);
        $('#fs_address2').html(fs_address2_origril);
        $('#city_title').html(city_item );
        $('#state_title').html(state_item );
        postal_item_title = postal_item;
    }

    /**
     *
     * 新加坡特别礼物
     */
    if (188 == country_id) {
        // $('.fs_address_2').html(address2_title );
        $("#sg_li_ticket_number_mgb").show();
        $(".sg_sales_service_info_mgb").show();
        /*$("#updateAddressForm").find(".entry_suburb").rules("add", {
            required: true,
            messages: {
                required: address2_required,
            }
        });
        $("#updateAddressForm").find(".entry_suburb").attr("placeholder", address2_placholder);*/
    } else {
        //$('.fs_address_2').html(address2_title + optional);
        $("#sg_li_ticket_number_mgb").hide();
        $(".sg_sales_service_info_mgb").hide();
        /*$("#updateAddressForm").find(".entry_suburb").rules("remove", "required");
        var tmpHolder = $("#updateAddressForm").find(".entry_suburb").attr("data-holder");
        $("#updateAddressForm").find(".entry_suburb").attr("placeholder", tmpHolder);*/
    }

    // company_name_title *
    var company_name_title = $('#company_name_title').attr('data');
    if($('#upadd_company_type').val() == 'BusinessType'){
        $('.fs_company_name').html(company);
    }else{
        $('.fs_company_name').html(company + optional);
    }
    //针对RU隐藏
    if(country_id == 176 && $('#upadd_company_type').val() == "IndividualType"){
        $('.helun_fairy').hide();
    }else{
        $('.helun_fairy').show();
    }
    if (where>0) {
        if (country_id == 176) {
            $('#businessType').html(company_type_business_ru);
            $('#individualType').html(company_type_individual_ru);
        } else {
            $('#businessType').html(company_type_business);
            $('#individualType').html(company_type_individual);
        }
        if (country_id == 176 && $('#upadd_company_type').val() == "BusinessType") {
            $('.company_type_p').text(company_type_business_ru);
        } else if (country_id == 176 && $('#upadd_company_type').val() == "IndividualType") {
            $('.company_type_p').text(company_type_individual_ru);
        } else if (country_id != 176 && $('#upadd_company_type').val() == "BusinessType") {
            $('.company_type_p').text(company_type_business);
        } else if (country_id != 176 && $('#upadd_company_type').val() == "IndividualType") {
            $('.company_type_p').text(company_type_individual);
        }
    }
    var oId = country_id;
    oId = parseInt(oId);
    //气泡提示语(非欧盟国家和新加的特殊国家的提示语格式改为一致 故放至此)
    var pop_str = '<div class="track_orders_wenhao m_track_orders_wenhao m-track-alert">'+
        '    <div class="question_bg_icon question_bg_grayIcon iconfont icon"></div>'+
        '    <div class="new_m_bg1"></div>'+
        '    <div class="new_m_bg_wap">'+
        '        <div class="question_text_01 leftjt">'+
        '            <div class="arrow"></div>'+
        '            <div class="popover-content">'+vax_speed_up_clearance +
        '            </div>'+
        '            <div class="new__mdiv_block">'+
        '                <span class="new_m_icon_Close" onclick="$(this).parents(\'.m-track-alert\').css({\'z-index\':9});">' +fs_close+'</span>'+
        '            </div>'+
        '        </div>'+
        '    </div>'+
        '</div>';
    if (country_code_id) {
        var pop_str = '<div class="bubble-popover-wap">' +
            '<div class="m-bubble-bg"></div>' +
            '<div class="bubble-popover">' +
            '<span class="iconfont icon bubble-icon">&#xf228;</span>' +
            '<div class="m-bubble-container">' +
            '<div class="bubble-frame bubble-middle">' +
            '<div class="m-bubble-Close-container">' +
            '<span class="bubble_popup_close_a m_960_close new_m_icon_Close m-bubble-Close" href="javascript:;"><i class="iconfont icon">&#xf092;</i></span>' +
            '</div>' +
            '<div class="bubble-arrow"></div>' +
            '<div class="bubble-content">' +
            '<p>' +vax_speed_up_clearance +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
    }
    var post_code_err = post_item_title_error;
    if (($.inArray(country_id, other_eu_country) > -1 && $('#upadd_company_type').val() == "IndividualType")){
        //下面的不敢改,只能最外边包一层了 SQ20200418003  by rebirth 2020.04.23
        tax_number_block_obj.hide();
        $("#upadd_entry_tax_number").rules("remove", 'required');
    } else if( $.inArray(oId,other_eu_country)!=-1){
        tax_number_block_obj.find('.error_prompt').html('');
        $("#upadd_entry_tax_number").rules("remove", 'required');
        //非欧盟时，企业税号选填，但是提示客户税号能加速清关 SQ20190912001
        title = fs_vat_number_str;
        title += pop_str;
        bubble = true;
        tax_number_block_title.html(title);
        tax_number_obj.attr('placeholder', '');
        tax_number_obj.val('');
        tax_number_block_obj.show();
    }else {
        if ((country_id == 30 || country_id == 10 || $('#upadd_company_type').val() == 'BusinessType')) {
            // 2019-7-19 potato 错误提示修改
            if (country_id == 13) {
                $('#upadd_entry_city').rules("add", {
                    required: true,
                    messages: {
                        required: city_title_error,
                    }
                });
                post_code_err = post_code_title_error;
            } else {
                $('#upadd_entry_city').rules("add", {
                    required: true,
                    messages: {
                        required: city_item_title_error,
                    }
                });
                post_code_err = post_item_title_error;
            }
            var title = placeholder = '';
            oId_compare = '_' + oId;

            tax_number_obj.val('');
            tax_number_block_obj.find('.error_prompt').html('');
            if ($.inArray(oId, EU_country) > -1) {
                //去掉气泡提示
                tax_number_block_title.html('<em class="alone_Asterisk">*</em>' + fs_vat_number_str);
                tax_number_block_obj.show();
                //当切换的时候给默认值 Isle of Man 时默认值为GB
                if(country_id !=244){
                    var title =  $('#' + country_input_name).next().attr('class').toUpperCase();
                }else{
                    var title = 'GB';
                }
                tax_number_obj.val(title);
                //valid_return = true;
                if ($.inArray(oId, EU_country) > -1) {
                    $('#upadd_entry_tax_number').rules("add", {
                        required: true,
                        messages: {
                            required: tax_required_tip,
                        }
                    });
                }
            } else if (new_add_country[oId_compare]) { // in the new add json
                tax_number_block_obj.show();
                title = new_add_country[oId_compare]['show_str'];
                if (new_add_country[oId_compare]['is_required']) {
                    title += pop_str;
                    bubble = true;
                    $('#upadd_entry_tax_number').rules("add", {
                        required: true,
                        messages: {
                            required: tax_required_tip,
                        }
                    });
                } else {
                    $("#upadd_entry_tax_number").rules("remove", 'required');
                }
                tax_number_block_title.html(title);
                if (new_add_country[oId_compare]['placeholder']) {
                    placeholder += 'eg:' + new_add_country[oId_compare]['placeholder'];
                }
                tax_number_obj.attr('placeholder', placeholder);
            } else {
                tax_number_block_obj.hide();
                $("#upadd_entry_tax_number").rules("remove", 'required');
            }
        } else {
            tax_number_block_obj.hide();
            tax_number_obj.val("");
            $("#upadd_entry_tax_number").rules("remove", 'required');
        }
    }
    if (country_id == 96) {
        //hong kong
        $('#postal_item_title').html(postal_item_title+fs_optional);
        $("#upadd_entry_postcode").rules("remove", "required");
        //$("#singapore_ticket_number").hide();
    } else {
        $('#upadd_entry_postcode').rules("add", {
            required: true,
            messages: {
                required: post_code_err,
            }
        });
        $('#postal_item_title').html(postal_item_title);
    }

    return valid_return;
}

function check_tax_block_book(where) {
    var shipping_type = $.trim($('#upadd_tag').val());
    var country_id = parseInt($('#'+country_input_name).val());
    var valid_return = false;
    var element_id = 'upadd_entry_tax_number';
    var tax_number_obj = $('#'+element_id);
    var tax_number_block_obj = $('#tax_number_block');
    var tax_number_block_title = $('#tax_number_block_title');
    var bubble = false;

    // 欧洲国家
    var EU_country = [21,73,81,105,150,124,57,103,195,84,171,14,203,72,132,55,170,97,56,189,190,67,117,123,175,33,53,141];
    var other_eu_country = [98,27,236,242,126,2,140,160,204,5,122,182,245,70,85,87,75,134,137,12,250,243,228,222,244];//222,244 英国 马恩岛脱欧

    // 2019-7-19 potato 澳大利亚地址表单title更改
    var postal_item_title = '';
    if (country_id == 13) {
        $('#city_title').html(city_item_au);
        $('#state_title').html(state_item_au);
        postal_item_title = postal_item_au;
        $('#fs_address1').html(fs_address1_origril);
        $('#fs_address2').html(fs_address2_origril+fs_optional);
    } else if (inArr(country_id, EU_country) || inArr(country_id, other_eu_country)) {
        $('#city_title').html(account_edit_city_eu);
        postal_item_title = fs_zip_code_eu;
        $('#fs_address1').html(fs_address_eu);
        $('#fs_address2').html(fs_address2_eu+fs_optional);
        $('#upadd_entry_street_address').rules("add", {
            required: true,
            messages: {
                required: street_error_eu,
            }
        });
    } else {
        $('#upadd_entry_street_address').rules("add", {
            required: true,
            messages: {
                required: street_error_original,
            }
        });
        $('#fs_address1').html(fs_address1_origril);
        $('#fs_address2').html(fs_address2_origril+fs_optional);
        $('#city_title').html(city_item);
        $('#state_title').html(state_item);
        postal_item_title = postal_item;
    }
    /**
     * 添加新加坡的特别关注
     */
    if (country_id == 188) {  //XQ20210531005新加坡address2为非必填
        //Singapore
        /*$("#upadd_entry_suburb").rules("add", {
            required: true,
            messages: {
                required: address2_required,
            }
        });
        $('#fs_address2').html(fs_address2_origril);
        $("#upadd_entry_suburb").attr("placeholder", address2_placeholder);*/
        //$("#singapore_ticket_number").show();
        $('.sg_li_ticket_number_mgb').show();
    } else {
        /*$('#fs_address2').html(fs_address2_origril+fs_optional);
        $("#upadd_entry_suburb").rules("remove", "required");
        $("#upadd_entry_suburb").attr("placeholder", address2_placeholder_original);*/
        //$("#singapore_ticket_number").hide();
        $('.sg_li_ticket_number_mgb').hide();
    }
    // company_name_title *
    var company_name_title = $('#company_name_title').attr('data');
    if($('#upadd_company_type').val() == 'BusinessType'){
        $('.fs_company_name').html(company);
    }else{
        $('.fs_company_name').html(company + optional);
    }
    //针对RU隐藏
    if(country_id == 176 && $('#upadd_company_type').val() == "IndividualType"){
        $('.helun_fairy').hide();
    }else{
        $('.helun_fairy').show();
    }
    if (where>0) {
        if (country_id == 176) {
            $('#businessType').html(company_type_business_ru);
            $('#individualType').html(company_type_individual_ru);
        } else {
            $('#businessType').html(company_type_business);
            $('#individualType').html(company_type_individual);
        }
        if (country_id == 176 && $('#upadd_company_type').val() == "BusinessType") {
            $('.company_type_p').text(company_type_business_ru);
        } else if (country_id == 176 && $('#upadd_company_type').val() == "IndividualType") {
            $('.company_type_p').text(company_type_individual_ru);
        } else if (country_id != 176 && $('#upadd_company_type').val() == "BusinessType") {
            $('.company_type_p').text(company_type_business);
        } else if (country_id != 176 && $('#upadd_company_type').val() == "IndividualType") {
            $('.company_type_p').text(company_type_individual);
        }
    }
    var oId = country_id;
    oId = parseInt(oId);

    var post_code_err = post_item_title_error;
    if( $.inArray(oId,other_eu_country)!=-1){
        tax_number_block_obj.find('.error_prompt').html('');
        $("#upadd_entry_tax_number").rules("remove", 'required');
        //非欧盟时，企业税号选填，但是提示客户税号能加速清关 SQ20190912001

    }else {
        if ((country_id == 30 || country_id == 10 || $('#upadd_company_type').val() == 'BusinessType')) {
            // 2019-7-19 potato 错误提示修改
            if (country_id == 13) {
                $('#upadd_entry_city').rules("add", {
                    required: true,
                    messages: {
                        required: city_title_error,
                    }
                });
                post_code_err = post_code_title_error;
            } else {
                $('#upadd_entry_city').rules("add", {
                    required: true,
                    messages: {
                        required: city_item_title_error,
                    }
                });
                post_code_err = post_item_title_error;
            }
            var title = placeholder = '';
            oId_compare = '_' + oId;

            tax_number_obj.val('');
            tax_number_block_obj.find('.error_prompt').html('');
            if ($.inArray(oId, EU_country) > -1) {
                //去掉气泡提示
                // tax_number_block_title.html('<em class="alone_Asterisk">*</em>' + fs_vat_number_str);
                // tax_number_block_obj.show();
                // //当切换的时候给默认值 Isle of Man 时默认值为GB
                // if(country_id !=244){
                //     var title =  $('#' + country_input_name).next().attr('class').toUpperCase();
                // }else{
                //     var title = 'GB';
                // }
                // tax_number_obj.val(title);
                //valid_return = true;
                if ($.inArray(oId, EU_country) > -1) {
                    $('#upadd_entry_tax_number').rules("add", {
                        required: true,
                        messages: {
                            required: tax_required_tip,
                        }
                    });
                }
            } else if (new_add_country[oId_compare]) { // in the new add json
                // tax_number_block_obj.show();
                // title = new_add_country[oId_compare]['show_str'];
                if (new_add_country[oId_compare]['is_required']) {
                    // title += pop_str;
                    $('#upadd_entry_tax_number').rules("add", {
                        required: true,
                        messages: {
                            required: tax_required_tip,
                        }
                    });
                } else {
                    $("#upadd_entry_tax_number").rules("remove", 'required');
                }
                // tax_number_block_title.html(title);
                if (new_add_country[oId_compare]['placeholder']) {
                    placeholder += 'eg:' + new_add_country[oId_compare]['placeholder'];
                }
                tax_number_obj.attr('placeholder', placeholder);
            } else {
                // tax_number_block_obj.hide();
                $("#upadd_entry_tax_number").rules("remove", 'required');
            }
        } else {
            // tax_number_block_obj.hide();
            // tax_number_obj.val("");
            $("#upadd_entry_tax_number").rules("remove", 'required');
        }
    }
    if (country_id == 96) {
        //hong kong
        $('#postal_item_title').html(postal_item_title+fs_optional);
        $("#upadd_entry_postcode").rules("remove", "required");
        //$("#singapore_ticket_number").hide();
    } else {
        $('#upadd_entry_postcode').rules("add", {
            required: true,
            messages: {
                required: post_code_err,
            }
        });
        $('#postal_item_title').html(postal_item_title);
    }

    /**
     *  税号start
     *
     */
        var not_required_country = new Array();
        var required_country = new Array();
        var all_other_country = new Array();
        var obj = {
            required_country: required_country,
            not_required_country: not_required_country
        };
        for (var i in new_add_country) {
            if (!new_add_country[i].is_required_new) {
                not_required_country.push(parseInt(i.replace("_", "")));
            } else {
                required_country.push(parseInt(i.replace("_", "")));
            }
        }
        all_other_country = not_required_country.concat(required_country);
        var other_country = obj;
        var tax_show_country = EU_country.concat(not_required_country);
        var company_type = $('#upadd_company_type').val();


        //other_eu_country 欧洲非欧盟国家
        //all_other_country智利,巴西,阿根廷,厄瓜多尔,墨西哥,澳大利亚
        //tax_show_country 欧盟国家 + 墨西哥,厄瓜多尔,澳大利亚,智利
        //EU_country 欧盟国家
        var track_show = true;
        var track_tips = '';
        var tax_title = '';
        var is_box_show = true;
        var is_auto_tax = false;
        switch (true) {
            case ($.inArray(country_id, EU_country) != -1)://欧盟
                track_tips = tax_eu;
                if (company_type == 'BusinessType') {
                    tax_title = vat_title;
                } else {
                    is_box_show = false;
                }
                //自动填充税号前缀
                is_auto_tax = true;
                break;
            case ($.inArray(country_id, other_eu_country) != -1)://欧洲非欧盟
                is_box_show = company_type == 'IndividualType' ? false : true;
                track_tips = tax_text_up;
                tax_title = tax_number+fs_optional;
                break;
            case ($.inArray(country_id, all_other_country) != -1)://清关困难的国家
                track_tips = tax_text_up;
                if (country_id == 13) {//澳大利亚展示欧盟提示语
                    track_tips = tax_eu;
                }

                //展示税号提示标题
                var tax_title_str = company_type == "IndividualType" ? new_add_country["_" + country_id]['invalid_str'] : new_add_country["_" + country_id]['show_str'];
                if (tax_title_str != '') {
                    if (country_id == 138) {
                        tax_title = tax_number;
                    } else {
                        tax_title = tax_title_str;
                    }
                } else {
                    tax_title = 'VAT ID';
                }

                //是否显示税号框
                if ($.inArray(country_id, not_required_country) > -1 && company_type == "IndividualType") {
                    is_box_show = false;
                } else {
                    //展示税号框并自动填充税号前缀
                    is_auto_tax = true;
                }
                break;
            default :
                //美国 加拿大 新西兰 俄罗斯不展示税号框
                if (country_id == '223' || country_id == '38' || country_id == '153' || country_id == '176') {
                    is_box_show = false;
                } else {
                    tax_title = tax_number;
                    track_tips = tax_text_up;
                    //新加坡
                    if (country_id == '188') {
                        tax_title = vat_sg_title;
                    }
                    //俄罗斯
                    if (country_id == '176') {
                        tax_title = vat_title;
                    }
                    //印度
                    if (country_id == '99') {
                        if (company_type == "IndividualType") {
                            tax_title = 'PAN';
                        } else {
                            tax_title = 'GSTIN';
                        }
                    }
                }
                break;
        }
        // 必填放标题前面
        if (tax_title.indexOf("*") != -1) {
            tax_title = tax_title.replace('*', '');
            tax_title = '<em class="alone_Asterisk">*</em>' + tax_title;
        }

        var pop_str = '<div class="track_orders_wenhao m_track_orders_wenhao m-track-alert">' +
            '    <div class="question_bg_icon question_bg_grayIcon iconfont icon"></div>' +
            '    <div class="new_m_bg1"></div>' +
            '    <div class="new_m_bg_wap">' +
            '        <div class="question_text_01 leftjt">' +
            '            <div class="arrow"></div>' +
            '            <div class="popover-content">' + track_tips +
            '            </div>' +
            '            <div class="new__mdiv_block">' +
            '                <span class="new_m_icon_Close" onclick="$(this).parents(\'.m-track-alert\').css({\'z-index\':9});">' + fs_close + '</span>' +
            '            </div>' +
            '        </div>' +
            '    </div>' +
            '</div>';
        if (country_code_id) {
            var pop_str = '<div class="bubble-popover-wap">' +
                '<div class="m-bubble-bg"></div>' +
                '<div class="bubble-popover">' +
                '<span class="iconfont icon bubble-icon">&#xf228;</span>' +
                '<div class="m-bubble-container">' +
                '<div class="bubble-frame bubble-middle">' +
                '<div class="m-bubble-Close-container">' +
                '<span class="bubble_popup_close_a m_960_close new_m_icon_Close m-bubble-Close" href="javascript:;"><i class="iconfont icon">&#xf092;</i></span>' +
                '</div>' +
                '<div class="bubble-arrow"></div>' +
                '<div class="bubble-content">' +
                '<p>' + track_tips +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';
        }

        if ($.inArray(country_id, [13, 81,188]) != -1) {
            tax_number_block_title.find(".bubble-popover-wap").hide();
        } else {
            tax_number_block_title.find(".bubble-popover-wap").show();
            tax_title += pop_str;
        }

        if (is_box_show) {
            tax_number_block_obj.show();
            tax_number_block_title.html(tax_title);
            if (track_show) {
                tax_number_block_title.html(tax_title);
                tax_number_block_obj.show();
            } else {
                tax_number_block_obj.hide();
            }
            if (is_auto_tax) {
                auto_padding_vax(country_id, shipping_type);
                var vat_country_id = $('#upadd_entry_tax_number').attr('data-country_id');
                var vat_number = $('#upadd_entry_tax_number').attr('data-vat_number');
                if (country_id == vat_country_id && vat_number) {
                    if ($('#upadd_entry_tax_number').attr('data-vat_number')){
                        $('#upadd_entry_tax_number').val(vat_number);
                    }
                }
                // if (data.vat_number)
            } else {
                $('#upadd_entry_tax_number').val("");
            }
        } else {
            tax_number_block_obj.hide();
        }

    /**
     * 税号 end
     */

    return valid_return;
}

function auto_padding_vax(country_id, shipping_type) {
    var code = "";
    for (var i in EU_code) {
        if (i == country_id) {
            code = EU_code[i];
            break;
        }
    }
    var vax_input = $('#upadd_entry_tax_number') ? $('#upadd_entry_tax_number') : "";
    console.log(code);
    if (code) {
        if (code.length >= 4) {
            if (country_id == 195) {
                code = code.substring(0, 2);
            } else {
                code = code.substring(2, 4);
            }

        }
        // console.log(code);
        // debugger
        //add by quest 马恩岛使用英国税号
        code = code == 'IM' ? 'GB' : code;
        console.log(code);
        if (vax_input) {
            console.log(234);
            $(vax_input).val(code);
        }
    } else {
        console.log(123);
        console.log(code);
        $(vax_input).val("");
    }
}

// state show or hide, assignment val
function check_state_block(entry_state) {
    entry_state = typeof entry_state =='undefined'?'':entry_state;
    var entry_country_id = $('#'+country_input_name).val();
    var upadd_entry_state_block = $('#upadd_entry_state_block');
    if( state[entry_country_id] ){
        var states_tr ='<option value="">'+default_select_state_str+'</option>';
        var current_state = state[entry_country_id];
        for(var i=0;i<current_state.length;i++){
            if(entry_country_id == 38 ) { //Canada
                var state_new = current_state[i]['states'] + "(" + current_state[i]['states_code'] + ")";
                var states_code = current_state[i]['states_code'];
            }else{
                var state_new = current_state[i]['states'];
                var states_code = current_state[i]['states'];
            }
            states_tr += "<option value ='"+states_code+"'>"+state_new+"</option>";
        }
        upadd_entry_state_block.find('select').html(states_tr).val(entry_state);
        upadd_entry_state_block.show();
    }else{
        upadd_entry_state_block.find('select').html('');
        upadd_entry_state_block.hide();
    }
    $('#update_tel_prefix_phone').text(country_to_telephone[entry_country_id]); // 国家电话号码的前缀
}

// Belong Code Auto Match City
function BelongCodeAutoMatchCity() {
    var country_id = parseInt($('#'+country_input_name).val());
    var time = new Date().getTime();
    var request_url = "index.php?modules=ajax&handler=ajax_checkout_manage_new&region=checkout";
    request_url + "&time=" + time;
    var post_code = $('#upadd_entry_postcode').val();
    post_code = post_code ? $.trim(post_code.replace(/\D/gi, "")) : "";
    var entry_city = $('#upadd_entry_city');
    var entry_state = $('#upadd_entry_state');
    var entry_suburb = $('#upadd_entry_suburb');
    var city = "";
    var city_subsurb = "";
    var state = "";
    if (!post_code || post_code.length < 3) {
        return false;
    }
    $.ajax({
        url: request_url+"&ajax_request_action=match_country",
        type: "POST",
        data: "&securityToken=" + serect_code + "&zip_code=" + post_code + "&country_id=" + country_id,
        dataType: "json",
        success: function (msg) {
            if (msg.status == 200) {
                var data = msg.data;
                city = data.city ? data.city : "";
                city_subsurb = data.city_subsurb ? data.city_subsurb : "";
                state = data.state ? data.state : "";
                if (city) {
                    entry_city.val(city);
                }
                if (state) {
                    entry_state.val(state);
                }
                // if (city_subsurb) {
                //     entry_suburb.val(city_subsurb);
                // }
            }
        }
    })
}

function inArr(search, array) {
    for (var i in array) {
        if (array[i] == search) {
            return true;
        }
    }
    return false;
}

function AutoMatchState(self){

    var formParents = $(self).parents('.evAddressForm');

    var request_url = "index.php?modules=ajax&handler=ajax_checkout_manage_new&region=checkout";
    var country_id = parseInt(formParents.find('#tagcountry').val());
    var post_code = formParents.find('#upadd_entry_postcode').val();
    post_code = post_code ? $.trim(post_code.replace(/\D/gi, "")) : "";
    var entry_city = formParents.find('#upadd_entry_city');
    var entry_state = formParents.find('#upadd_entry_state');
    var city = "";
    var state = "";
    var postcode = formParents.find('#upadd_entry_postcode');
    if (country_id == 96) {
        postcode.rules("remove", 'required');
        postcode.rules("remove", 'minlength');
    } else {
        postcode.rules("add", 'required');
        postcode.rules("add", {
            minlength: 3
        });
    }
    if (!post_code || post_code.length < 3) {
        return false;
    }
    $.ajax({
        url: request_url + "&ajax_request_action=match_country",
        type: "POST",
        data: "&securityToken=" + serect_code + "&zip_code=" + post_code + "&country_id=" + country_id,
        dataType: "json",
        success: function (msg) {
            if (msg.status == 200) {
                var data = msg.data;
                city = data.city ? data.city : "";
                state = data.state ? data.state : "";
                if (city) {
                    entry_city.val(city);
                }
                if (state) {
                    entry_state.val(state);
                }
            }
        }
    })
}
