utility_fte = window.utility_fte || {};
utility_fte.isSignin = function (resolve) {
    //this function is not used
    $.ajax({
        url: "/is_sign_in",
        dataType: "json",
        success: function (d) {
            if(d.code == 0){
                return false;
            }else{
                return true;
            }
        }
    });
};


utility_fte.get_pid = function () {
    var pid = "";
    var url = window.location.href;
    var pid = url.substring((url.indexOf("=") + 1));
    return pid;
};


utility_fte.initHeaderBav = function () {
    $(".navSelect").mouseover(function(e){
        e.stopPropagation();
        var index = $(e.target).attr("navSelect");
        if(index == undefined){
            return;
        }
        if(index == 1){
            $.each($("dl.header_list_more_ul_main_all_con"), function(i, v){
                if($(v).attr("parentID") == 1){
                    $(v).removeClass("myHidden");
                }
            });
        }
    });

    $("li.gpdListLi").mouseover(function(e){
        e.stopPropagation();
        var proID = $(e.target).find("span.gpdListTag").text();
        if(proID == 0){
            return;
        }
        $.each($("dl.header_list_more_ul_main_all_con"), function(i,v){
            if($(v).attr("parentID") == proID){
                $(v).removeClass("myHidden");
            }else{
                $(v).addClass("myHidden");
            }
        });
        // console.log(proID);
    });
};



