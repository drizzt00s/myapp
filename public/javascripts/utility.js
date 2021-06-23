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
                            console.log("data all fetched!!!!!!!!!!!!!!!!!!!");
                            connection.release();
                            global.gpdLists = gpdLists;//product_l1
                            global.subGpdLists = subGpdLists;//product_l2
                            global.lvsubGpdLists3 = d;//product_l3
                            utility.cut_lv3pd_data();
                        });
                    });
                });
            });
    },
    cut_lv3pd_data:function () {

        var pd1 = [];
        var pd2 = [];
        var pd3 = [];
        var pd4 = [];
        var pd5 = [];
        var pd6 = [];
        var pd7 = [];
        var pd8 = [];
        var show_len = 5;
        for(var i = 0; i < global.lvsubGpdLists3.length; i++){
            if(global.lvsubGpdLists3[i].parentsID == 1){
                if(pd1.length < show_len){
                    pd1.push(global.lvsubGpdLists3[i]);
                }
            } else if(global.lvsubGpdLists3[i].parentsID == 2){
                if(pd2.length < show_len){
                    pd2.push(global.lvsubGpdLists3[i]);
                }
            }else if(global.lvsubGpdLists3[i].parentsID == 3){
                if(pd3.length < show_len){
                     pd3.push(global.lvsubGpdLists3[i]);
                }
            }else if(global.lvsubGpdLists3[i].parentsID == 4){
                if(pd4.length < show_len){
                    pd4.push(global.lvsubGpdLists3[i]);
                }
            }else if(global.lvsubGpdLists3[i].parentsID == 5){
                if(pd5.length < show_len){
                    pd5.push(global.lvsubGpdLists3[i]);
                }
            }else if(global.lvsubGpdLists3[i].parentsID == 6){
                if(pd6.length < show_len){
                    pd6.push(global.lvsubGpdLists3[i]);
                }
            }else if(global.lvsubGpdLists3[i].parentsID == 7){
                if(pd7.length < show_len) {
                    pd7.push(global.lvsubGpdLists3[i]);
                }
            }else if(global.lvsubGpdLists3[i].parentsID == 8){
                if(pd8.length < show_len) {
                    pd8.push(global.lvsubGpdLists3[i]);
                }
            }
        }
        var lvsubGpdLists3_abbr = pd1.concat(pd2,pd3,pd4,pd5,pd6,pd7,pd8);
        global.lvsubGpdLists3_abbr = lvsubGpdLists3_abbr;
    }

};
module.exports = utility;

