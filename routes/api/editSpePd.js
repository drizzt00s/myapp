var express = require('express');
var utility = require("../../public/javascripts/utility");
var db_config = require("../db/db_config");
const fs = require('fs');

var router = express.Router();

router.post("/", function(req, res, next){
    const appRootpath = process.cwd();
    //application root url
    const hasImage = req.files;
    if(hasImage){
        const img = req.files.newPdImg;
        //编辑产品时有上传图片
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
                    const newPdFeature = req.body.newPdFeature;
                    const newPdPrice = req.body.newPdPrice;
                    //not in spec

                    let specItem = req.body.storeSpcItemName;
                    specItem = JSON.parse(specItem);
                    let spe = {};

                    for(let i = 0; i < specItem.length; i++){
                        spe[specItem[i]] = req.body[specItem[i]];
                    }
                    //表 product_specfication 字段specfications:string

                    //表 product_specfication 字段specfications:
                    // Part Number,Connector Type & Polish,Fiber Type,Compatible Cable Type,
                    //Wavelength,Insertion Loss,Return Loss,,Bare Fiber Fastening Strength,
                    //Tensile Strength,Operating Temperature,Success Rate,Standard

                    let features = [];
                    features.push(newPdFeature);
                    features = JSON.stringify(features);

                    //表 product_specfication 字段features:

                    spe = JSON.stringify(spe);
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

                                var sql = "UPDATE product_specifications SET specifications=" +"'" + spe +"'" + "," +
                                                                            "features=" + "'" + features + "'" + "," +
                                                                            "product_infomation="+ "'" + newPdInfo + "'" + "," +
                                                                            "description="+ "'" + newPdDes + "'" +
                                                                            " WHERE id="+"'" + pid +"'";
                                connection.query(sql,function(err){
                                    if(err){
                                        console.log(err);
                                        res.redirect('/editPdFail');
                                        //产品数据修改失败 转到修改失败页面
                                    }
                                    // res.redirect('/edit_pdinfo?pid=' + pid);
                                    res.redirect('/editPdSuccess?pid=' + pid);
                                    //产品数据修改失败 转到修改成功页面
                                });

                            });
                        })

                    //表product_l3:
                    //des:产品名字, price:价格
                });
            });
        });
    }else{
        //编辑产品时无上传图片
        //new image rename complete
        const pid = req.body.pid;
        const newPdName = req.body.newPdName;
        const newPdInfo = req.body.newPdInfo;
        const newPdDes = req.body.newPdDes;
        const newPdFeature = req.body.newPdFeature;
        const newPdPrice = req.body.newPdPrice;
        //not in spec

        let specItem = req.body.storeSpcItemName;
        specItem = JSON.parse(specItem);
        let spe = {};

        for(let i = 0; i < specItem.length; i++){
            spe[specItem[i]] = req.body[specItem[i]];
        }
        //表 product_specfication 字段specfications:string

        //表 product_specfication 字段specfications:
        // Part Number,Connector Type & Polish,Fiber Type,Compatible Cable Type,
        //Wavelength,Insertion Loss,Return Loss,,Bare Fiber Fastening Strength,
        //Tensile Strength,Operating Temperature,Success Rate,Standard

        let features = [];
        features.push(newPdFeature);
        features = JSON.stringify(features);

        //表 product_specfication 字段features:

        spe = JSON.stringify(spe);
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

                var sql = "UPDATE product_specifications SET specifications=" +"'" + spe +"'" + "," +
                    "features=" + "'" + features + "'" + "," +
                    "product_infomation="+ "'" + newPdInfo + "'" + "," +
                    "description="+ "'" + newPdDes + "'" +
                    " WHERE id="+"'" + pid +"'";
                connection.query(sql,function(err){
                    if(err){
                        console.log(err);
                        res.redirect('/editPdFail');
                        //产品数据修改失败 转到修改失败页面
                    }
                    // res.redirect('/edit_pdinfo?pid=' + pid);
                    res.redirect('/editPdSuccess?pid=' + pid);
                    //产品数据修改失败 转到修改成功页面
                });

            });
        })
        //表product_l3:
        //des:产品名字, price:价格
    }
})

module.exports = router;