var mysql = require("mysql");
var utility = {
    createConnection:function(host,user,password,port,database){
        var connection = mysql.createConnection({
            host:host,
            user:user,
            password:password,
            port:port,
            database:database
        });
        return connection;
    },
    connect:function(connection){
        connection.connect(function(err){
            if(err){
                throw err;
            }
        });
    },
    toCrypto:function(){
        var crypto = require('crypto');
        return crypto.createHash('md5');
    },
    strToObj:function(str){
        if(!str instanceof String){
            throw new Error("parameter is not string");
            // return "";
        }
        var obj = JSON.parse(str);
        return obj;
    },
    objToStr:function(obj){
        if(!obj instanceof Array && !obj instanceof Object){
            throw new Error("parameter is not array or object"); 
            // return null;
        }
        var str = JSON.stringify(obj);
        return str;
    },
    fetch_all_pd:function () {
        
    }
};
module.exports = utility;

