var cmd = require('../models/sto');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    cmd.getAllSTO(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows.success.recordset); }
    });
});

router.post('/sto_cr/', function (req, res, next) {
    if (req.body) {
        cmd.getAllSTOByCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows.success.recordset); }
        });
    }
});

router.post('/', function (req, res, next) {
    if (req.body) {
        cmd.insertSTO(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else {
                res.json(rows.success.recordset);
            }
        });
    } else {
        res.json({ Message: "No body" });
    }
});

router.post('/updatestatus/', function (req, res, next) {
    cmd.updateSTO(req.body,function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

//detail------
router.get('/detail/', function (req, res, next) {
    cmd.getAllSTODetail(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows.success.recordset); }
    });
});

router.post('/detail/stodetail_cr/', function (req, res, next) {
    if (req.body) {
        cmd.getAllSTODetailByCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows.success.recordset); }
        });
    }
});

router.post('/detail/', function (req, res, next) {
    if (req.body) {
        cmd.insertSTODetail(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else {
                res.json(rows.success.recordset);
            }
        });
    } else {
        res.json({ Message: "No body" });
    }
});

//current position------
router.get('/current/', function (req, res, next) {
    cmd.getCurrentPosition(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows.success.recordset); }
    });
});

router.post('/current/current_cr/', function (req, res, next) {
    if (req.body) {
        cmd.getCurrentPositionCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows.success.recordset); }
        });
    }
});

module.exports = router;