var cmd = require('../models/assetout');
var cmd1 = require('../models/asset');
var express = require('express');
var router = express.Router();
const async = require('async');

router.get('/', function (req, res, next) {
    cmd.getAllAssetOut(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows.success.recordset); }
    });
});

router.post('/approvereject/:key1/:key2', function (req, res, next) {
    if (req.body) {
        cmd.updateAssetOutStatus(req.params.key1, req.params.key2, function (err, rows) {
            if (err) { res.json(err); }
            else {
                if (rows.success) {
                    let statusAsset = req.params.key2 == 2 ? 3 : 1;
                    cmd.getAllAssetOutDetailByCriteria({ GINo: req.params.key1 }, function (errDet, rowsDet) {
                        if (errDet) { res.json(errDet); }
                        else {
                            async.eachSeries(rowsDet.success.recordset, (item, callback) => {
                                cmd1.updateAssetStatus(item.AssetNumber, statusAsset, function (errAsset, rowsAsset) {
                                    if (errAsset) { res.json(errAsset); }
                                    else{
                                        callback();
                                    }
                                })
                            }, (err) => {
                                res.json(rows.success);
                            })
                        }
                    });
                }
            }
        });
    }
});

router.post('/assetout_cr/', function (req, res, next) {
    if (req.body) {
        cmd.getAllAssetOutByCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows.success.recordset); }
        });
    }
});

router.get('/print/:key', function (req, res, next) {
    cmd.getAllAssetOutByCriteria({ GINo: req.params.key }, function (err, rows) {
        if (err) { res.json(err); }
        else {
            let toPrint = [];
            async.eachSeries(rows.success.recordset, (item, callback) => {
                toPrint.push(item);
                callback();
            }, (err) => {
                res.render('index', { toPrint });
            });
        }
    });

});

router.get('/bastk/:key', function (req, res, next) {
    cmd.printBastk(req.params.key, function (err, rows) {
        if (err) { res.json(err); }
        else {
            let toPrint = [];

            async.eachSeries(rows.success.recordset, (item, callback) => {
                cmd1.getAllAssetSoftwareByCriteriaWithDesc({AssetNumber:item.AssetNumber}, (errAssetSW, rowAssetSW)=>{
                    if(errAssetSW){
                        res.json(errAssetSW);
                        callback(errAssetSW);
                    }
                    else{
                        item.AssetSoftware  = rowAssetSW.success.recordset;
                        toPrint.push(item);
                        callback();
                    }
                })
               
                
            }, (err) => {
                res.render('bast', { toPrint });
            });
        }
    });

});

router.post('/', function (req, res, next) {
    if (req.body) {
        cmd.insertAssetOut(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else {
                if (rows.success) {
                    let insertedHeader = rows.success.recordset[0];
                    async.eachSeries(req.body.Detail, (item, callback) => {
                        cmd.insertAssetOutDetail({
                            GINo: insertedHeader.GINo,
                            AssetNumber: item.AssetNumber,
                            ReturnPartial: 0
                        }, function (errDetail, resultDetail) {
                            if (errDetail) { callback(errDetail); res.json(errDetail); }
                            else {
                                cmd1.updateAssetStatus(item.AssetNumber, 2, function (errStatus, resultStatus) {
                                    if (errDetail) { callback(errStatus); res.json(errStatus); }
                                    else {
                                        callback();
                                    }
                                })
                            }
                        });
                    }, (err) => {
                        res.json(insertedHeader);
                    });
                }
            }
        });
    }
});


//detail
router.get('/detail', function (req, res, next) {
    cmd.getAllAssetOutDetail(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows.success.recordset); }
    });
});

router.post('/assetoutdetail_cr/', function (req, res, next) {
    if (req.body) {
        cmd.getAllAssetOutDetailByCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows.success.recordset); }
        });
    }
});

router.post('/detail', function (req, res, next) {
    if (req.body) {
        cmd.insertAssetOutDetail(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.put('/detail', function (req, res, next) {
    if (req.body) {
        cmd.updateAssetOutDetail(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.post('/detailreturn/:key1', function (req, res, next) {
    if (req.body) {
        cmd.getAssetOutDetailReturn(req.params.key1, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows.success.recordset); }
        });
    }
});
module.exports = router;