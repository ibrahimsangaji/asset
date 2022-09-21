const { Console } = require('console');
const db = require('../connection/connection');

exports.getAllSTO = (done) => {
    let sql = "select Id,RowStatus,STOCode,Month,Year,FunctionCode,Status,format(ApproveDate,'yyyy-MM-dd HH:mm:ss') ApproveDate,ApproveBy,format(CreateDate,'yyyy-MM-dd HH:mm:ss') CreateDate,CreateBy,format(UpdateDate,'yyyy-MM-dd HH:mm:ss') UpdateDate,UpdateBy from StockOpname";
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};

exports.getAllSTOByCriteria = (Obj, done) => {
    var wh = db.whereCriteriaGenerator(Obj);
    let sql = "select Id,RowStatus,STOCode,Month,Year,FunctionCode,Status,format(ApproveDate,'yyyy-MM-dd HH:mm:ss') ApproveDate,ApproveBy,format(CreateDate,'yyyy-MM-dd HH:mm:ss') CreateDate,CreateBy,format(UpdateDate,'yyyy-MM-dd HH:mm:ss') UpdateDate,UpdateBy from StockOpname"+wh;
    console.log(sql)
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};

exports.insertSTO = (Obj, done) => {
    let sql = "exec up_insertStockOpname @Month='"+Obj.Month+"',@Year='"+Obj.Year+"',@FunctionCode='"+Obj.FunctionCode+"',@Status='"+Obj.Status+"',@CreateBy='"+Obj.CreateBy+"';";
    console.log(sql)
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });
};

//bulkSTO--------------
exports.getNumSTO = (done) => {
    let sql = "select 'IT-STO-'+RIGHT('000000000'+cast(ISNULL(MAX(RIGHT(STOCode, 6)),0)+1 as varchar),6)  from StockOpname";
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });
};

exports.insertSTOBulk = (Obj, done) => {
    let sql = "exec up_insertBulkStockOpname @Month='"+Obj.Month+"',@Year='"+Obj.Year+"',@FunctionCode='"+Obj.FunctionCode+"',@Status='"+Obj.Status+"',@CreateBy='"+Obj.CreateBy+"', @Numsto='"+Obj.Numsto+"';";
    console.log(sql)
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });
};
//---------------------


//detail--------------------
exports.getAllSTODetail = (done) => {
    let sql = "select Id,RowStatus,AssetNumber,AssetNumberSAP,STOCode,Notes,Status,format(CreateDate,'yyyy-MM-dd HH:mm:ss') CreateDate,CreateBy,format(UpdateDate,'yyyy-MM-dd HH:mm:ss') UpdateDate,UpdateBy from StockOpnameDetail";
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};

exports.getAllSTODetailByCriteria = (Obj, done) => {
    var wh = db.whereCriteriaGenerator(Obj);
    let sql = "select Id,RowStatus,AssetNumber,AssetNumberSAP,STOCode,Notes,Status,format(CreateDate,'yyyy-MM-dd HH:mm:ss') CreateDate,CreateBy,format(UpdateDate,'yyyy-MM-dd HH:mm:ss') UpdateDate,UpdateBy from StockOpnameDetail"+wh;
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });
};

exports.insertSTODetail = (Obj, done) => {
    let sql = "exec up_insertStockOpnameDetail @AssetNumber='"+Obj.AssetNumber+"',@AssetNumberSAP='"+Obj.AssetNumberSAP+"',@STOCode='"+Obj.STOCode+"',@Notes='"+Obj.Notes+"',@Status='"+Obj.Status+"',@CreateBy='"+Obj.CreateBy+"';";
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};


//--sto current position
exports.getCurrentPosition = (done) => {
    let sql = "select * from uv_lastPositionAsset";
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};

exports.getCurrentPositionCriteria = (Obj, done) => {
    var wh = db.whereCriteriaGenerator(Obj);
    let sql = "select * from uv_lastPositionAsset"+wh;
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};

exports.updateSTO = (Obj, done) => {
    console.log(Obj)
    // let sql = "update StockOpname set RowStatus="+Obj.RowStatus+", Status="+Obj.Status+" where STOCode = '"+Obj.STOCode+"';";
    let sql = "update StockOpname set Status="+Obj.Status+" where STOCode = '"+Obj.STOCode+"';";
    console.log(sql)
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};