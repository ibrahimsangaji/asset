var cmd = require('../models/assetin');
var cmd1 = require('../models/asset');
var cmd2 = require('../models/assetout');
var express = require('express');
var router = express.Router();
const async = require('async');

router.get('/', function (req, res, next) {
    cmd.getAllAssetIn(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows.success.recordset); }
    });
});

router.post('/assetin_cr/', function (req, res, next) {
    console.log(req.body)
    if (req.body) {
        cmd.getAllAssetInByCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows.success.recordset); }
        });
    }
});

router.post('/', function (req, res, next) {
    if (req.body) {
        cmd.insertAssetIn(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else {
                if (rows.success) {
                    let insertedHeader = rows.success.recordset[0];
                    async.timesSeries(req.body.Unit, function (n, next) {
                        let asset = {
                            AssetNumberSAP: insertedHeader.AssetNumberSAP,
                            AssetName: insertedHeader.AssetName,
                            TypeCode: insertedHeader.TypeCode,
                            BrandCode: insertedHeader.BrandCode,
                            RackCode: insertedHeader.RackCode,
                            Status: insertedHeader.Status,
                            Enable: insertedHeader.Enable,
                            CreateBy: insertedHeader.CreateBy,
                            Spec: req.body.Spec
                        }

                        cmd1.insertAsset(asset, function (errAsset, rowAsset) {
                            if (errAsset) { res.json(errAsset); }
                            else {
                                if (rowAsset.success) {
                                    let insertedAsset = rowAsset.success.recordset[0];
                                    cmd.insertAssetInDetail(
                                        {
                                            AssetNumber: insertedAsset.AssetNumber,
                                            GRNo: insertedHeader.GRNo,
                                        }, function (errDetail, rowDetail) {
                                            let appendProperty = Object.assign(rowDetail.success.recordset[0], { AssetNumberSAP: asset.AssetNumberSAP });
                                            next(errDetail, appendProperty);
                                        })
                                }
                            }
                        })
                    },
                        function (err, assetNumber) {
                            res.json(assetNumber);
                        });
                }

            }
        });
    }
});

router.post('/return', function (req, res, next) {
    if (req.body) {
        cmd.insertAssetIn(req.body, function (err, rows) { //insert assetin new as retur asset
            if (err) { res.json(err); }
            else {
                if (rows.success) {
                    let insertedHeader = rows.success.recordset[0];
                    async.eachSeries(req.body.Detail, function (item, callbacks) {
                        async.parallel([
                            function (callback) { //insertin new assetindetail
                                cmd.insertAssetInDetail(
                                    {
                                        AssetNumber: item.AssetNumber,
                                        GRNo: insertedHeader.GRNo
                                    }, function (errDetail, rowDetail) {
                                        if (errDetail) { res.json(errDetail); callback(errDetail) }
                                        else { callback(rowDetail) }
                                    });
                            },
                            function (callback) { //set free unit
                                cmd1.updateAssetStatus(item.AssetNumber, 1, function (errAsset, rowAsset) {
                                    if (errAsset) { res.json(errAsset); callback(errAsset) }
                                    else { callback(rowAsset); }
                                })
                            },
                            function (callback) { //updateting assetoutdetail to 'return'
                                if (req.body.ReturnPartial == 1) {
                                    cmd2.updateAssetOutDetailPartial({
                                        GINo: insertedHeader.ReffNo,
                                        ReturnPartial: 1,
                                        AssetNumber: item.AssetNumber
                                    }, function (errAssetOut, rowAssetOut) {
                                        if (errAssetOut) { res.json(errAssetOut); callback(errAssetOut) }
                                        else { callback(rowAssetOut); }
                                    })
                                }
                            }
                        ],
                            // end callback parallel
                            function (err, results) {
                                callbacks();
                            });
                    },
                        function (err) {
                            cmd2.updateAssetOutStatus(insertedHeader.ReffNo, req.body.ReturnPartial == 1 ? 5 : 4, function (errAssetOut, rowAssetOut) {
                                if (errAssetOut) { res.json(errAssetOut); }
                                else { res.json(insertedHeader); }
                            })
                        });

                }

            }
        });
    }
});


//detail
router.get('/detail', function (req, res, next) {
    cmd.getAllAssetInDetail(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows.success.recordset); }
    });
});

router.post('/assetindetail_cr/', function (req, res, next) {
    if (req.body) {
        cmd.getAllAssetInDetailByCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows.success.recordset); }
        });
    }
});

router.post('/detail', function (req, res, next) {
    if (req.body) {
        cmd.insertAssetInDetail(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.put('/detail', function (req, res, next) {
    if (req.body) {
        cmd.updateAssetInDetail(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});
module.exports = router;