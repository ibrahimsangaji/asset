var cmd = require('../models/software');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    cmd.getAllSoftware(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows.success.recordset); }
    });
});

router.post('/sw_cr/', function (req, res, next) {
    if (req.body) {
        cmd.getAllSoftwareByCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows.success.recordset); }
        });
    }
});

router.post('/', function (req, res, next) {
    if (req.body) {
        cmd.insertSoftware(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows.success.recordset); }
        });
    }
});

router.put('/', function (req, res, next) {
    if (req.body) {
        cmd.updateSoftware(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});
module.exports = router;