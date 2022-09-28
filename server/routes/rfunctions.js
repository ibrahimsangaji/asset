var cmd = require('../models/functions');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    cmd.getAllFunctions(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows.success.recordset); }
    });
});

//function verification get all
router.post('/functions_cr/', function (req, res, next) {
    if (req.body) {
        cmd.getAllFunctionsByCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows.success.recordset); }
        });
    }
});

router.post('/', function (req, res, next) {
    if (req.body) {
        cmd.validatFunction(req.body, function (err, rows) {
            if(rows.success.recordset[0].total == 0) {
                cmd.insertFunction(req.body, function (err, rows) {
                    if (err) { res.json(err); }
                    else { res.json(rows.success.recordset); }
                });
            }else{
                res.json("gagal");
            }
        });
    }
});

router.put('/', function (req, res, next) {
    if (req.body) {
        cmd.validatFunction(req.body, function (err, rows) {
            if(rows.success.recordset[0].total == 1) { 
                cmd.updateFunction(req.body, function (err, rows) {
                    if (err) { res.json(err); } 
                    else { res.json(rows); }
                }); 
             } else { res.json(rows) }
        });
    }
});


//update all function code --- ibrahim 13-7-2022
router.put('/update/', function (req, res, next) {
    if (req.body) {
        cmd.validatFunction(req.body, function (err, rows) {
            console.log(rows)
            console.log(err)
            console.log(rows.success.recordset[0].total)
            if(rows.success.recordset[0].total  == 0) {
                cmd.updateFunctionNew(req.body, function (err, rows) {
                    if (err) { res.json(err); console.log('error'); console.log(err) } 
                    else { res.json(rows); }
                });
            } else if(rows.success.recordset[0].total  == 1) { 
                cmd.updateFunctionOld(req.body, function (err, rows) {
                    if (err) { res.json(err); } 
                    else { res.json(rows); }
                }); 
             }
        });
    }
});

module.exports = router;