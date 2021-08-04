var express = require('express');
var utility = require("../../public/javascripts/utility");
var db_config = require("../db/db_config");
const fs = require('fs');

var router = express.Router();

router.post("/", function(req, res, next){
    const appRootpath = process.cwd();
    
    //application root url
    const img = req.files.newPdImg;
    const newImgName = req.files.newPdImg.name;
    const serverImgPath = req.body.storeImg;
    let serverImgName = '';
    let index = serverImgPath.lastIndexOf("\/");  
    serverImgName = serverImgPath.substring(index + 1, serverImgPath.length);
    //获取服务器上图片的原始名字
    //将原本的图片替换:并将新图片重命名和原图片名字一样 删除原图片
    
    const parentID = req.body.storeParentId;
    //产品属于哪个次级类

    let imgPath = "productL3_" + parentID + "_img/";

    img.mv(appRootpath + "/public/images/" + imgPath + "/" + newImgName, function(err) {
        if (err) {
            console.log(err);
        }
        //new image move complete

        fs.unlink(appRootpath + "/public/images/" + imgPath + "/" + serverImgName,function(err){
            //old image delete complete
            if(err){
                console.log(err);
            }
            fs.rename(appRootpath + "/public/images/" + imgPath + "/" + newImgName, appRootpath + "/public/images/" + imgPath + "/" + serverImgName, function(err) {
                if ( err ){
                    console.log(err);
                } 
                //new image rename complete
                const pid = req.body.pid;
                const newPdName = req.body.newPdName;
                const newPdInfo = req.body.newPdInfo;
                const newPdDes = req.body.newPdDes;
                const newPdPtNo = req.body.newPdPtNo;
                const newPdCtype = req.body.newPdCtype;
                const newPdFiberType = req.body.newPdFiberType;
                const newPdCabType = req.body.newPdCabType;
                const newPdWavelength = req.body.newPdWavelength;
                const newPdInserLoss = req.body.newPdInserLoss;
                const newPdReturnLoss = req.body.newPdReturnLoss;
                const newPdBareFibStr = req.body.newPdBareFibStr;
                const newPdTensStr = req.body.newPdTensStr;
                const newPdOpTemp = req.body.newPdOpTemp;
                const newPdSuccRat = req.body.newPdSuccRat;
                const newPdStandard = req.body.newPdStandard;
                const newPdPrice = req.body.newPdPrice;

                
                var pool = global.pool ? global.pool :utility.createConnectionPool(
                    db_config.host,
                    db_config.username,
                    db_config.password,
                    db_config.port,
                    db_config.database,db_config.pool);
                    pool.getConnection(function(err,connection){
                        if(err){
                            console.log(err);
                        }
                    // var sql = "UPDATE product_l3 SET des=" + "'" + newPdName + "'" + " WHERE id=" + "'" + pid + "'";
                    var sql = "UPDATE product_l3 SET des=" +"'" + newPdName +"'" + "," + "price=" +"'" + newPdPrice +"'" +"WHERE id="+"'" + pid +"'";
                        connection.query(sql,function(err){
                            if(err){
                                console.log(err);
                            }
                            
                            console.log("ok");
                








                        });
                    })

                //表product_l3:
                //des:产品名字, price:价格



            });
        });
       


        // var pool = global.pool ? global.pool :utility.createConnectionPool(
        //     db_config.host,
        //     db_config.username,
        //     db_config.password,
        //     db_config.port,
        //     db_config.database,db_config.pool);
        //     pool.getConnection(function(err,connection){
        //         if(err){
        //             throw err;
        //         }
        //         let sql = "INSERT INTO product_l3 (parentsID,parentID,des,url,price)VALUES(?,?,?,?,?)";
        //         let sqlValue = [parentsId,parentId,newPdName,imgUrl,price];
        //         connection.query(sql,sqlValue,function(err, data){
        //             if(err){
        //                 throw err;
        //             }
        //             connection.release();
        //             let sql = "INSERT INTO product_specifications (product_infomation,description,features,specifications)VALUES(?,?,?,?)";
        //             let sqlValue = [newPdInfo,newPdDes,newPdFeature,pdSpec];
        //             connection.query(sql,sqlValue,function(err, data) {
        //                 if (err) {
        //                     throw err;
        //                 }
        //                 res.redirect('/updateProduct');
        //             })
        //         })
        //     });

    });


});

module.exports = router;