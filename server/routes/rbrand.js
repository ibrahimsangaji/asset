var cmd = require('../models/brand');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    console.log(req.header)
    console.log(req.body)
    cmd.getAllBrand(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows.success.recordset); }
    });
});

router.post('/brand_cr/', function (req, res, next) {
    if (req.body) {
        cmd.getAllBrandByCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows.success.recordset); }
        });
    }
});

router.post('/', function (req, res, next) {
    if (req.body) {
        cmd.insertBrand(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows.success.recordset); }
        });
    }
});

router.put('/', function (req, res, next) {
    if (req.body) {
        cmd.updateBrand(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});
module.exports = router;