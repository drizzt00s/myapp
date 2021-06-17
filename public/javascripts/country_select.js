// 国家相关开始
jQuery.expr[':'].Contains = function(a, i, m) {
    return jQuery(a).text().toUpperCase()
            .indexOf(m[3].toUpperCase()) >= 0;
};
jQuery.expr[':'].contains = function(a, i, m) {
    return jQuery(a).text().toUpperCase()
            .indexOf(m[3].toUpperCase()) >= 0;
};

$(function(){
    // 搜索国家
    // 改成on方法委托事件，1.8.2以上的jquery版本已经不支持live委托事件了
    $(document).on('keyup','.ce_form_search_input', function() {
        $('.ce_form_countryList li').hide();
        var oChina = false,
            enter = $(this).val().toUpperCase(),
            enter01 = ' ' + enter,
            enter02 = '-' + enter,
            enter03 = ',' + enter,
            enter04 = ' (' + enter;
        for(var i=0;i<$('.ce_form_countryList li').length;i++){
            var oText = $('.ce_form_countryList li').eq(i).find('a').text().toUpperCase(),
                oTextName = oText.indexOf(enter),
                oTextName01 = oText.indexOf(enter01),
                oTextName02 = oText.indexOf(enter02),
                oTextName03 = oText.indexOf(enter03),
                oTextName04 = oText.indexOf(enter04);
            if (oTextName == 0 || oTextName01 > 0 || oTextName02 > 0 || oTextName03 > 0 || oTextName04 > 0 ) {
                if($('.ce_form_countryList li').eq(i).find('em').attr('class') == 'cn'){
                    oChina = true;
                }
                $('.ce_form_countryList li').eq(i).show();
            }
            // 如果搜索结果中cn，则tw、hk、mo也展示
            if(oChina && $('.ce_form_countryList li').eq(i).find('em').attr('class') == "tw"){
                $('.ce_form_countryList li').eq(i).show();
            };
            if(oChina && $('.ce_form_countryList li').eq(i).find('em').attr('class') == "hk"){
                $('.ce_form_countryList li').eq(i).show();
            };
            if(oChina && $('.ce_form_countryList li').eq(i).find('em').attr('class') == "mo"){
                $('.ce_form_countryList li').eq(i).show();
            };
        }
        if($(this).val() == "") {
            $('.ce_form_countryList li').show();
        }
    });
    // 显示隐藏自定义的下拉列表
    $(document).on('click','.ce_form_choose_country p',function(){
        if($(this).hasClass('show')){
            $(this).siblings('.ce_form_searchCountry').slideUp();
            $(this).removeClass('show');
        }else{
            $(this).siblings('.ce_form_searchCountry').slideDown();
            $(this).addClass('show');
        }
        $('.pro_deliverTo_overAutoBox .shipping_list').hide();
    })

    // 赋值
    $(document).on('click','.ce_form_countryList li',function(ev){
        ev.stopPropagation();
        var _this = $(this);
        var _parent = _this.parents('.ce_form_choose_country');
        var countryList = _parent.find('.ce_form_searchCountry');
        var oCounterList = countryList.html();
        var country_input_name = _parent.find('input[type=hidden]').attr('name');
        countryList.slideUp();
        //一些重要的数据
        var oCountry = _this.find('em').attr('class');
        var oId = _this.find('a').attr('tag');
        var tag_name = _this.find('a').attr('tag_name');
        _parent.find('em').attr('class', oCountry).css('left', '12px');
        _parent.html("<input type='hidden' name='"+country_input_name+"' id='"+country_input_name+"' value='"+oId+"' /><em data-class='country_code' class='"+oCountry+"'></em><p class='country_name'>"+tag_name+"</p>" + "<span class='showMore'></span><div class='ce_form_searchCountry'>" + oCounterList + "</div>");
        //单独的东西，单独写到页面中，上面的代码不需要重写，在页面中只需要添加新增的代码就行。例如：regist.js

        // 赋值后所有list的状态初始化
        $('.ce_form_countryList li').show();
    })
    // 国家搜索默认值
    $('.ce_form_search_input').focus(function(){
        $(this).attr('placeholder','');
    });
    $('.ce_form_search_input').blur(function(){
        $(this).attr('placeholder',country_search_str);
    });
})

// 当点击页面中的其他地方，下拉列表隐藏
$(document).bind("click", function(e) {
    var target = $(e.target);
    if(target.closest(".ce_form_choose_country").length == 0) {
        //do something...
        $('.ce_form_searchCountry').slideUp();
        $('.pro_deliverTo_overAutoBox .shipping_list').show();
        $('.ce_form_choose_country p').removeClass('show');
        if($('.ce_form_search_input').val()==""){
            $('.ce_form_search_input').attr('placeholder',country_search_str)
        }
    };
    if(target.closest('.ce_form_sel').length == 0){
        $('.ce_form_sel_list').hide();
        $('.ce_form_sel_result').removeClass('show');
    }
});
// 国家相关结束
