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
}


