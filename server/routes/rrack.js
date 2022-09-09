var cmd = require('../models/rack');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    cmd.getAllRack(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows.success.recordset); }
    });
});

router.post('/rack_cr/', function (req, res, next) {
    if (req.body) {
        cmd.getAllRackByCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows.success.recordset); }
        });
    }
});
router.post('/', function (req, res, next) {
    if (req.body) {
        cmd.insertRack(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows.success.recordset); }
        });
    }
});

router.put('/', function (req, res, next) {
    if (req.body) {
        cmd.updateRack(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});
module.exports = router;