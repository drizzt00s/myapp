var mysql = require("mysql");
var db_config = require("../../routes/db/db_config");

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
        }else if(str === '{}'){
            return {};
        }else if(str === '[]'){
            return [];
        } else{
            var obj = JSON.parse(str);
            return obj;
        }

    },
    isSignin:function (req){
        var userData = req.session.userData;
        if(!userData){
            //用户未登录
            return false;
        }else{
            return true;
        }
    },
    get_nav_data:function(){
        var pool = global.pool ? global.pool :utility.createConnectionPool(
            db_config.host,
            db_config.username,
            db_config.password,
            db_config.port,
            db_config.database,db_config.pool);
            pool.getConnection(function(err,connection){
                if(err){
                    throw err;
                }
                connection.query("select * from product_l1",function(err, gpdLists){
                    if(err){
                        throw err;
                    }
                    connection.query("select * from product_l2",function(err, subGpdLists){
                        if(err){
                            throw err;
                        }
                        connection.query("select * from product_l3",function(err, d){
                            if(err){
                                throw err;
                            }
                            connection.release();
                            global.gpdLists = gpdLists;//product_l1
                            global.subGpdLists = subGpdLists;//product_l2
                            global.lvsubGpdLists3 = d;//product_l3
                        });
                    });
                });
            });
    }

};
module.exports = utility;

