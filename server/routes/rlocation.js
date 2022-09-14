var cmd = require('../models/location');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    // console.log("Sukses")
    cmd.getAllLocation(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows.success.recordset); }
    });
});

router.post('/loc/namecode/', function (req, res, next) {
    // console.log("Sukses")
    cmd.getAllLocationNameCrit(req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows.success.recordset); }
    });
});

router.post('/location_cr/', function (req, res, next) {
    if (req.body) {
        cmd.getAllLocationByCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows.success.recordset); }
        });
    }
});
router.post('/', function (req, res, next) {
    if (req.body) {
        console.log('create')
        console.log(req.body)
        cmd.insertLocation(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows.success.recordset); }
        });
    }
});

router.put('/', function (req, res, next) {
    if (req.body) {
        console.log('update')
        console.log(req.body)
        cmd.updateLocation(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});
module.exports = router;