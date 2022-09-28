var cmd = require('../models/asset');
var cmd1 = require('../models/software');
const async = require('async');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    cmd.getAllAsset(function (err, rows) {
        if (err) { res.json(err); }
        else {
            let results = [];
            async.each(rows.success.recordset, (asset, callback) => {
                cmd.getAllAssetSoftwareByCriteria({ AssetNumber: asset.AssetNumber }, (errDet, rowsDet) => {
                    if (errDet) { callback(errDet); }
                    else {
                        asset.Software = rowsDet.success.recordset;
                        results.push(asset);
                        callback();
                    }
                })
            }, function (err) {
                // if any of the file processing produced an error, err would equal that error
                if (err) {
                    res.json(err);
                } else {
                    res.json(results);
                }
            })
        }
    });
});

router.post('/asset_cr/', function (req, res, next) {
    if (req.body) {
        cmd.getAllAssetByCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows.success.recordset); }
        });
    }
});

router.put('/', function (req, res, next) {
    if (req.body) {
        cmd.updateAsset(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else {
                if (req.body.Software.length > 0) {
                    async.series([
                        function (callback) {
                            cmd.deleteAllAssetSoftware(req.body.AssetNumber, (errDel, rowsDel) => {
                                callback();
                            })
                        }, //1
                        function (callback) {
                            async.eachSeries(req.body.Software, (item, callbackEach) => {
                                cmd.insertAssetSoftware(item.SWCode, req.body.AssetNumber, function (errD, rowsD) {
                                    callbackEach();
                                })
                            }, (err) => {
                                callback();
                            })
                        }//2
                    ],
                        // optional callback
                        function (err, results) {
                            // results is now equal to ['one', 'two']
                            res.json(rows);
                        })
                }else{
                    cmd.deleteAllAssetSoftware(req.body.AssetNumber, (errDel, rowsDel) => {
                        if (errDel) { res.json(errDel); }else{
                            res.json(rows);
                        }
                    })
                    
                }
            }
        });
    }
});

router.get('/print/:key', function (req, res, next) {
    cmd.getAllAssetByCriteria({ AssetNumberSAP: req.params.key }, function (err, rows) {
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

router.get('/params', function (req, res, next) {
    cmd.getAllAssetParams(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows.success.recordset); }
    });
});

router.post('/report/:key1/:key2/:key3', function (req, res, next) {
router.get('/report', function (req, res, next) {
    cmd.getReportAsset(function (err, rows) {
        if (err) { res.json(err); }
        else { 
            var record = rows.success.recordset;
            var tempOut = []
            record.forEach(element => {
                var tempFind = (tempOut.filter(f=> f['Asset Number'] == element['Asset Number']))
            if(tempFind.length > 0){
                var index = tempOut.indexOf(tempFind[0])
                tempOut[index]['Software'] = tempOut[index]['Software'] + ", " + element['Software']
            }else{
                tempOut.push(element)
            }
            })
            // record.forEach(element => {
            //     cmd.getAssetSW(element['Asset Number'], function (err2, rows2){
            //         if (err2) { res.json(err2); }
            //         else { 
            //             var names = rows2.success.recordset.map(function(item) {
            //                 return item['Name'];
            //               });
            //             element['Software'] = names.join(", ")
            //             // console.log(element['Software'])
            //          }
            //     })
            // });
            
            // var flags = [], output = [], l = record.length, i;
            // for( i=0; i<l; i++) {
            //     if( flags[record[i]['Asset Number']]) continue;
            //     flags[record[i]['Asset Number']] = true;
            //     output.push(record[i]['Asset Number']);
            // }
            res.json(tempOut); 
        
        }
    });
});


    if (req.body) {
        console.log(req.body)
        cmd.reportSTO(req.params.key1, req.params.key2, req.params.key3, function (err, rows) {
            console.log(rows)
            if (err) { res.json(err); }
            else { res.json(rows.success.recordset); }
        });
    }
});

router.post('/mutation/:key1', function (req, res, next) {
    if (req.body) {
        cmd.reportMutation(req.params.key1, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows.success.recordset); }
        });
    }
});

module.exports = router;