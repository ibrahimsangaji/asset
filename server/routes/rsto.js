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
            console.log("sini")
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

router.post('/batch', function (req, res, next) {
    console.log(req.body)
    var req2 = req
    if (req.body) {
            cmd.getNumSTO(function (err, rows){
                if (err) { res.json(err); }
                else { 
                    var currNum = rows.success.recordset[0]['']
                    console.log(currNum)
                    var intnum = parseInt(currNum.substring(7, currNum.length))
                    for (let i = 0; i < req2.body.length; i++) {
                        req2.body[i].Numsto = intnum+i
                    }
                    console.log(req2.body)
                    for (let k = 0; k < req2.body.length; k++) {
                        cmd.insertSTOBulk(req2.body[k], function(err1, rows1){
                            if (err1) { res.json(err1); }
                            else { 
                                if (k == req2.body.length-1) {
                                    res.json(rows1.success.recordset)
                                }
                            }
                        })
                        
                    }
                    
                }
            })
        
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