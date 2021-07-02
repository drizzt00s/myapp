function fixPop(){
    $(".wb-max").remove();
    $(".wb-full").remove();
     $(".wb-min").remove();
     $(".wb-close").css("background-image","url(images/svg/close.svg)");
}

function givePopVal(val){
    $(".wb-body").html("<span class='popContents'>" + val +"</span>");
    
}