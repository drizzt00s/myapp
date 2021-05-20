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
utility_fte.get_pid = function () {
    var pid = "";
    var url = window.location.href;
    var pid = url.substring((url.indexOf("=") + 1));
    return pid;
}



