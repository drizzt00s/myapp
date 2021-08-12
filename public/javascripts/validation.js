const validation = {

    isStrongPassword:function (pass) {
        //密码中必须包含字母（不区分大小写）、数字，至少8个字符，最多30个字符；
        const pwdRegex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{8,30}');
        if(!pwdRegex.test(pass)) {
            return false;
        }else{
            return true;
        }
    },

    restoreErrNotice(cssName){
        $("." + cssName).hide();
    },

    validateAllEmpty:function (validatedItem) {
        if(!Array.isArray(validatedItem)){
            console.log("not Array");
            return false;
        }
        if(validatedItem.length <= 0){
            console.log("empty Array");
            return false;
        }
        let passed = true;
        for(let i = 0; i < validatedItem.length; i++){
            if(this.isEmpty(validatedItem[i].value)){
                passed = false;
                let htmlName = validatedItem[i].name;
                let className = validatedItem[i].className;
                let errMsg = this.EmptyNotcie(htmlName);
                $("." + className).text(errMsg);
                $("." + className).show();
            }
        }
        return passed;
    },

    
    isEmpty:function (str) {
        return validator.isEmpty(str) ? true : false;
    },
    isEmail:function(str){
        return validator.isEmail(str) ? true : false;
    },
    isCreditCard:function (str) {
        return validator.isCreditCard(str) ? true : false;
    },
    isValidJson:function (str) {
        return validator.isJSON(str) ? true : false;
    },

    EmptyNotcie:function(item){
        if(typeof item !== 'string'){
            console.log("item must be string");
            return false;
        }
        return item + " " + "cannot be empty.";
    },

    notEmailNotice:function(item){
        if(typeof item !== 'string'){
            console.log("item must be string");
            return false;
        }
        return item + " " + "is not a correct email.";
    },

    notCreditCardNotice:function(item){
        if(typeof item !== 'string'){
            console.log("item must be string");
            return false;
        }
        return item + " " + "is not a correct credit card number.";
    }

    // isStrongPassword:function (str) {
    //     //长度至少八位
    //     return validator.isStrongPassword(str,{minLength:8}) ? true : false;
    // }
};