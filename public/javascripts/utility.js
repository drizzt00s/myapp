var mysql = require("mysql");
var db_config = require("../../routes/db/db_config");

var utility = {
    dbPrimaryKkeyAutoIncr:function (connection) {
        //删除某一条记录后如果再新增记录 将主键设置为连续增长 比如 1,2,3...
        let sql = `
            SET @i=0;
  
            UPDATE product_l3 SET id=(@i:=@i+1);
            
            ALTER TABLE product_l3 AUTO_INCREMENT=0
        `;
        connection.query(sql,function(err, data) {
            if (err) {
                throw err;
            }
            let sql = `
                SET @i=0;
                
                UPDATE product_specifications SET id=(@i:=@i+1);
                
                ALTER TABLE product_specifications AUTO_INCREMENT=0
            `;
            connection.query(sql,function(err, data) {
                if (err) {
                    throw err;
                }
                console.log("db auto increase ok.")
            })
        })
    },

    supCatMatch:function(supCatId){
        const superCategory = global.gpdLists;
        let superCategoryName = "";

        for(let i = 0; i < superCategory.length; i++){
            if(superCategory[i].id == supCatId){
                superCategoryName = superCategory[i].des;
            }
        }

        return {
            superCategoryName:{name:superCategoryName,id:supCatId},
            subCategoryName:{name:'',
                id:''
            },
            pdName:{name:'',id:''}
        }
    },

    subCatMatch:function (subCatId){

        let parentID = subCatId;
        let parentsID = '';

        let subCategoryName = '';
        let superCategoryName = '';

        const subCategory = global.subGpdLists;
        const superCategory = global.gpdLists;

        for(let i = 0; i < subCategory.length; i++){
            if(subCategory[i].id == parentID){
                subCategoryName = subCategory[i].des;
                parentsID = subCategory[i].parentID;
                break;
            }
        }

        for(let i = 0; i < superCategory.length; i++){
            if(superCategory[i].id == parentsID){
                superCategoryName = superCategory[i].des;
                break;
            }
        }
        return {
            superCategoryName:{name:superCategoryName,id:parentsID},
            subCategoryName:{name:subCategoryName,
                id:parentID
            },
            pdName:{name:'',id:''}
        }

    },

    pdMatch:function (pid) {
        let pdName = '';
        let parentID = '';
        let parentsID = '';
        let parentID_sub = '';

        let subCategoryName = '';
        let superCategoryName = '';

        const pds = global.lvsubGpdLists3;
        const subCategory = global.subGpdLists;
        const superCategory = global.gpdLists;

        for(let i = 0; i < pds.length; i++){
            if(pds[i].id == pid){
                pdName = pds[i].des;
                parentID = pds[i].parentID;
                parentsID = pds[i].parentsID;
                parentID_sub = pds[i].parentsID; //currently useless
                break;
            }
        }

        for(let i = 0; i < subCategory.length; i++){
            if(subCategory[i].id == parentID){
                subCategoryName = subCategory[i].des;
                break;
            }
        }

        for(let i = 0; i < superCategory.length; i++){
            if(superCategory[i].id == parentsID){
                superCategoryName = superCategory[i].des;
                break;
            }
        }
        return {
            superCategoryName:{name:superCategoryName,id:parentsID},
            subCategoryName:{name:subCategoryName,
                id:parentID
            },
            pdName:{name:pdName,id:''}

        }
    },

    creatUserResetPassLink:function (mail) {
        let restLink = "http://localhost:3000/resetPassword?pw=";

        function generateMixed(n) {
            var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
            var res = "";
            for(var i = 0; i < n ; i ++) {
                var id = Math.ceil(Math.random()*35);
                res += chars[id];
            }
            return res;
        }
        restLink += generateMixed(6);
        restLink += "&m=" + mail;
        return restLink;

    },

    createQuoteNo:function (num){
        var quoteNo = Math.floor((Math.random()+Math.floor(Math.random()*9+1))*Math.pow(10,num-1));
        quoteNo = "qt" + quoteNo;
        return quoteNo;
    },

    createOrderNo:function(num){
        var orderNo = Math.floor((Math.random()+Math.floor(Math.random()*9+1))*Math.pow(10,num-1));
        orderNo = "Yg" + orderNo;
        return orderNo;
    },


    createInvoiceNumber:function(num){
        //生成结账时发票 不知具体逻辑是什么
        //目前先返回一个11位的随机数
        var invoice = Math.floor((Math.random()+Math.floor(Math.random()*9+1))*Math.pow(10,num-1));
        return invoice;
    },

    getServerTime:function(format){
        var date = new Date();
        var format_arr = {
            "Y": date.getFullYear(),
            "m": date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1),
            "d": date.getDate(),
            "H": date.getHours(),
            "i": date.getMinutes(),
            "s": date.getSeconds(),
        };
        for (var key in format_arr) {
            format = format.replace(key, format_arr[key]);
        }
        return format;
    },
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
    get_allPd_spec:function () {
        var pool = global.pool ? global.pool :utility.createConnectionPool(
            db_config.host,
            db_config.username,
            db_config.password,
            db_config.port,
            db_config.database,db_config.pool);
        pool.getConnection(function(err,connection) {
            if (err) {
                throw err;
            }
            connection.query("select * from product_specifications", function (error, result) {
                if(error){
                    throw error;
                }
                global.pdSpec = result;
            });
        })

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
                            // console.log(global.lvsubGpdLists3[ global.lvsubGpdLists3.length - 1])
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

