var cmd = require('../models/type');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    cmd.getAllType(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows.success.recordset); }
    });
});

router.post('/type_cr/', function (req, res, next) {
    if (req.body) {
        cmd.getAllTypeByCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows.success.recordset); }
        });
    }
});
router.post('/', function (req, res, next) {
    if (req.body) {
        cmd.insertType(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows.success.recordset); }
        });
    }
});

router.put('/', function (req, res, next) {
    if (req.body) {
        cmd.updateType(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});
module.exports = router;