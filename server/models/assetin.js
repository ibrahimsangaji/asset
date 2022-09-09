const db = require('../connection/connection');

exports.getAllAssetIn = (done) => {
    let sql = "select Id,RowStatus,GRNo,ReffNo,AssetName,TypeCode,BrandCode,Unit,NoPO,NoPR,AssetNumberSAP,PurchasePrice,format(ReceiveDate,'yyyy-MM-dd HH:mm:ss') ReceiveDate,TransactionType,RackCode,Notes,Status,Enable,format(ApproveDate,'yyyy-MM-dd HH:mm:ss') ApproveDate,ApproveBy,format(CreateDate,'yyyy-MM-dd HH:mm:ss') CreateDate,CreateBy,format(UpdateDate,'yyyy-MM-dd HH:mm:ss') UpdateDate,UpdateBy from AssetIn";
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};

exports.getAllAssetInByCriteria = (Obj, done) => {
    var wh = db.whereCriteriaGenerator(Obj);
    let sql = "select Id,RowStatus,GRNo,ReffNo,AssetName,TypeCode,BrandCode,Unit,NoPO,NoPR,AssetNumberSAP,PurchasePrice,format(ReceiveDate,'yyyy-MM-dd HH:mm:ss') ReceiveDate,TransactionType,RackCode,Notes,Status,Enable,format(ApproveDate,'yyyy-MM-dd HH:mm:ss') ApproveDate,ApproveBy,format(CreateDate,'yyyy-MM-dd HH:mm:ss') CreateDate,CreateBy,format(UpdateDate,'yyyy-MM-dd HH:mm:ss') UpdateDate,UpdateBy from AssetIn"+wh;
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};

exports.insertAssetIn = (Obj, done) => {
    let sql = "exec up_insertAssetIn @ReffNo='"+Obj.ReffNo+"',@AssetName='"+Obj.AssetName+"',@TypeCode='"+Obj.TypeCode+"',@BrandCode='"+Obj.BrandCode+"',@Unit='"+Obj.Unit+"',@NoPO='"+Obj.NoPO+"',@NoPR='"+Obj.NoPR+"',@AssetNumberSAP='"+Obj.AssetNumberSAP+"',@PurchasePrice='"+Obj.PurchasePrice+"',@ReceiveDate='"+Obj.ReceiveDate+"',@TransactionType='"+Obj.TransactionType+"',@RackCode='"+Obj.RackCode+"',@Notes='"+Obj.Notes+"',@Status='"+Obj.Status+"',@Enable='"+Obj.Enable+"',@CreatedBy='"+Obj.CreatedBy+"';";
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};

exports.getAllAssetInDetail = (done) => {
    let sql = "select Id,RowStatus,GRNo,AssetNumber from AssetInDetail";
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};

exports.getAllAssetInDetailByCriteria = (Obj, done) => {
    var wh = db.whereCriteriaGenerator(Obj);
    let sql = "select Id,RowStatus,GRNo,AssetNumber from AssetInDetail"+wh;
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};

exports.insertAssetInDetail = (Obj, done) => {
    let sql = "exec up_insertAssetInDetail @GRNo='"+Obj.GRNo+"',@AssetNumber='"+Obj.AssetNumber+"';";
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};

exports.updateAssetInDetail = (Obj, done) => {
    let sql = "update AssetInDetail set GRNo='"+Obj.GRNo+"',AssetNumber='"+Obj.AssetNumber+"' where Id = "+Obj.Id+";";
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};