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
    createConnectionPool:function (host,user,password,port,database,connectionLimit){
        var connectionPool = mysql.createPool({
            host:host,
            user:user,
            password:password,
            port:port,
            database:database,
            connectionLimit:connectionLimit
        });
        return connectionPool;
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
    isSignin:function (req){
        var userData = req.session.userData;
        if(!userData){
            //用户未登录
            return false;
        }else{
            return true;
        }
    }

};
module.exports = utility;

