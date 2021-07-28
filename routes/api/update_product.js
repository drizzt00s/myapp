var express = require('express');
var utility = require("../../public/javascripts/utility");
var db_config = require("../db/db_config");




var router = express.Router();

router.post("/", function(req, res, next){
    const appRootpath = process.cwd();
    //application root url
    const img = req.files.newPdImg;
    const imgName = req.files.newPdImg.name;
    //image name
    let imgPath;
    //put image to proper folder

    const pd1 = req.body.pd1;
    let parentsId;

    //new pd belongs to which general category
    switch (pd1){
        case "OPTICAL CONNECTORS":
            parentsId = 1;
            break;
        case "FUSION SPLICERS & ACCESSORIES":
            parentsId = 2;
            break;
        case "BROADBAND DATA OPTICAL EQUIP MENTS":
            parentsId = 3;
            break;
        case "OPTICAL HANDHELD TESTERS":
            parentsId = 4;
            break;
        case "PASSIVE OPTICAL COMPONENTS":
            parentsId = 5;
            break;
        case "CATV OPTICAL EQUIPMENTS":
            parentsId = 6;
            break;
        case "OPTICAL BOXES,CABINETS & PANELS / DISTRIBUTION CLOSURES":
            parentsId = 7;
            break;
        case "FIBER OPTIC INSTRUMENTS & TOOLS":
            parentsId = 8;
            break;
    }



    const pd2 = req.body.pd2;
    // pd sub level
    let parentId;
    //new pd belongs to which sub-general category
    switch (pd2){
        case "Field Assembly Optical Connectors":
            imgPath = "productL3_1_img";
            parentId = 1;
            break;
        case "Simplex Cable Assemblies":
            imgPath = "productL3_2_img";
            parentId = 2;
            break;
        case "Duplex Cable Assemblies":
            imgPath = "productL3_3_img";
            parentId = 3;
            break;
        case "Multi-fiber Cable Assemblies":
            imgPath = "productL3_4_img";
            parentId = 4;
            break;
        case "MDU Drop Cable Assemblies":
            imgPath = "productL3_5_img";
            parentId = 5;
            break;
        case "Ruggedized Cable Assemblies":
            imgPath = "productL3_6_img";
            parentId = 6;
            break;
        case "Fusion splicers":
            imgPath = "productL3_7_img";
            parentId = 7;
            break;
        case "Flber Cleavers":
            imgPath = "productL3_8_img";
            parentId = 8;
            break;
        case "Flber strippers":
            imgPath = "productL3_9_img";
            parentId = 9;
            break;
        case "Cable holders":
            imgPath = "productL3_10_img";
            parentId = 10;
            break;
        case "Electrodes":
            imgPath = "productL3_11_img";
            parentId = 11;
            break;
        case "Thermal Strippers":
            imgPath = "productL3_12_img";
            parentId = 12;
            break;
        case "Machanical Aligners":
            imgPath = "productL3_13_img";
            parentId = 13;
            break;
        case "Heat Shrink Sleeves":
            imgPath = "productL3_14_img";
            parentId = 14;
            break;
        case "Protection Boxes":
            imgPath = "productL3_15_img";
            parentId = 15;
            break;
        case "G/EPON OLTs":
            imgPath = "productL3_16_img";
            parentId = 16;
            break;
        case "OLT Uplink SFP Modules":
            imgPath = "productL3_17_img";
            parentId = 17;
            break;
        case "OLT Downlink PON Modules":
            imgPath = "productL3_18_img";
            parentId = 18;
            break;
        case "G/EPON & xPON ONUs":
            imgPath = "productL3_19_img";
            parentId = 19;
            break;
        case "Media converters":
            imgPath = "productL3_20_img";
            parentId = 20;
            break;
        case "Video converters":
            imgPath = "productL3_21_img";
            parentId = 21;
            break;
        case "OTDRs":
            imgPath = "productL3_22_img";
            parentId = 22;
            break;
        case "FOTDR launch coble boxes":
            imgPath = "productL3_23_img";
            parentId = 23;
            break;
        case "Optical multi meters":
            imgPath = "productL3_24_img";
            parentId = 24;
            break;
        case "Optical power meters":
            imgPath = "productL3_25_img";
            parentId = 25;
            break;
        case "Optical light sourcos":
            imgPath = "productL3_26_img";
            parentId = 26;
            break;
        case "Visual foult locotors":
            imgPath = "productL3_27_img";
            parentId = 27;
            break;
        case "PON power meters":
            imgPath = "productL3_28_img";
            parentId = 28;
            break;
        case "Optical fiber identifiers":
            imgPath = "productL3_29_img";
            parentId = 29;
            break;
        case "End-face Microscope":
            imgPath = "productL3_30_img";
            parentId = 30;
            break;
        case "Optical fiber rangers":
            imgPath = "productL3_31_img";
            parentId = 31;
            break;
        case "Talk sets":
            imgPath = "productL3_32_img";
            parentId = 32;
            break;
        case "Fiber Optic Cable Hunting":
            imgPath = "productL3_33_img";
            parentId = 33;
            break;
        case "Passive Optical Splitters":
            imgPath = "productL3_34_img";
            parentId = 34;
            break;
        case "Wavelength Division Multiplexing":
            imgPath = "productL3_35_img";
            parentId = 35;
            break;
        case "Loopbacks":
            imgPath = "productL3_36_img";
            parentId = 36;
            break;
        case "Hybrid Optical Attenuators":
            imgPath = "productL3_37_img";
            parentId = 37;
            break;
        case "Optical Attenuators":
            imgPath = "productL3_38_img";
            parentId = 38;
            break;
        case "CATV optical transmitter":
            imgPath = "productL3_39_img";
            parentId = 39;
            break;
        case "CATV optical amplfier":
            imgPath = "productL3_40_img";
            parentId = 40;
            break;
        case "Optical recciver nodo":
            imgPath = "productL3_41_img";
            parentId = 41;
            break;
        case "FTTH terminal boxes":
            imgPath = "productL3_42_img";
            parentId = 42;
            break;
        case "Optical distribution boxes":
            imgPath = "productL3_43_img";
            parentId = 43;
            break;
        case "Distributlon Closures":
            imgPath = "productL3_44_img";
            parentId = 44;
            break;
        case "19\' rack mount patch ponels":
            imgPath = "productL3_45_img";
            parentId = 45;
            break;
        case "Optical splice closures":
            imgPath = "productL3_46_img";
            parentId = 46;
            break;
        case "Pedestals & MDU Enclosures":
            imgPath = "productL3_47_img";
            parentId = 47;
            break;
        case "Tool kits":
            imgPath = "productL3_48_img";
            parentId = 48;
            break;
        case "Preparation Tools":
            imgPath = "productL3_49_img";
            parentId = 49;
            break;
        case "Cleaning & Polishing Tools":
            imgPath = "productL3_50_img";
            parentId = 50;
            break;
        case "UTP Network Tools":
            imgPath = "productL3_51_img";
            parentId = 51;
            break;
        case "Coaxial Cable Tools":
            imgPath = "productL3_52_img";
            parentId = 52;
            break;
        case "General/Electrical Tools":
            imgPath = "productL3_53_img";
            parentId = 53;
            break;
    }

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

    let pdSpec = {
        "PartNumber": newPdPtNo,
        "ConnectorType": newPdCtype,
        "FiberType": newPdFiberType,
        "CompatibleCableType": newPdCabType,
        "Wavelength": newPdWavelength,
        "InsertionLoss": newPdInserLoss,
        "ReturnLoss": newPdReturnLoss,
        "BareFiberFasteningStrength": newPdBareFibStr,
        "TensileStrength": newPdTensStr,
        "OperatingTemperature": newPdOpTemp,
        "SuccessRate": newPdSuccRat,
        "Standard": newPdStandard
    };
    pdSpec = JSON.stringify(pdSpec);

    const newPdName = req.body.newPdName;
    const imgUrl = "images/" + imgPath + "/" + imgName;
    const price =  req.body.newPdPrice;
    //imgUrl:value in column url in table product_l3


    const newPdInfo = req.body.newPdInfo;
    const newPdDes = req.body.newPdDes;
    let newPdFeature = [];
    newPdFeature.push(req.body.newPdFeature);
    newPdFeature = JSON.stringify(newPdFeature);



    // for table product_specification




    img.mv(appRootpath + "/public/images/" + imgPath + "/" + imgName, function(err) {
        if (err) {
            console.log(err);
        }
        console.log("image done");
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
                let sql = "INSERT INTO product_l3 (parentsID,parentID,des,url,price)VALUES(?,?,?,?,?)";
                let sqlValue = [parentsId,parentId,newPdName,imgUrl,price];
                connection.query(sql,sqlValue,function(err, data){
                    if(err){
                        throw err;
                    }
                    connection.release();
                    let sql = "INSERT INTO product_specifications (product_infomation,description,features,specifications)VALUES(?,?,?,?)";
                    let sqlValue = [newPdInfo,newPdDes,newPdFeature,pdSpec];
                    connection.query(sql,sqlValue,function(err, data) {
                        if (err) {
                            throw err;
                        }
                        console.log("ok")
                    })

                })
            });

    });




    // var searchContents = req.body.searchContents;
    //
    // var pool = global.pool ? global.pool :utility.createConnectionPool(
    //     db_config.host,
    //     db_config.username,
    //     db_config.password,
    //     db_config.port,
    //     db_config.database,db_config.pool);
    //
    // pool.getConnection(function(err,connection){
    //     if(err){
    //         throw err;
    //     }
    //     connection.query("SELECT * FROM product_l3 WHERE des like " + "'%" + searchContents + "%'",function(err, data){
    //         if(err){
    //             throw err;
    //         }
    //         connection.release();
    //
    //     })
    // });


});

module.exports = router;