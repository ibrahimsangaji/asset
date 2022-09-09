const db = require('../connection/connection');

exports.getAllAssetOut = (done) => {
    let sql = "select Id,RowStatus,GINo,AssetNumberSAP,Unit,Enable,Status,ReceiverFunction,PIC,format(ApproveDate,'yyyy-MM-dd HH:mm:ss') ApproveDate,ApproveBy,format(CreateDate,'yyyy-MM-dd HH:mm:ss') CreateDate,CreateBy,format(UpdateDate,'yyyy-MM-dd HH:mm:ss') UpdateDate,UpdateBy from AssetOut";
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};

exports.getAllAssetOutByCriteria = (Obj, done) => {
    var wh = db.whereCriteriaGenerator(Obj);
    let sql = "select Id,RowStatus,GINo,AssetNumberSAP,Unit,Enable,Status,ReceiverFunction,PIC,format(ApproveDate,'yyyy-MM-dd HH:mm:ss') ApproveDate,ApproveBy,format(CreateDate,'yyyy-MM-dd HH:mm:ss') CreateDate,CreateBy,format(UpdateDate,'yyyy-MM-dd HH:mm:ss') UpdateDate,UpdateBy from AssetOut"+wh;
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};




exports.insertAssetOut = (Obj, done) => {
    let sql = "exec up_insertAssetOut @AssetNumberSAP='"+Obj.AssetNumberSAP+"',@Unit='"+Obj.Unit+"',@ReceiverFunction='"+Obj.ReceiverFunction+"',@PIC='"+Obj.PIC+"',@Status='"+Obj.Status+"',@Enable='"+Obj.Enable+"',@CreateBy='"+Obj.CreateBy+"';";
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};

//----detail-----
exports.getAllAssetOutDetail = (done) => {
    let sql = "select Id,RowStatus,GINo,AssetNumber, ReturnPartial from AssetOutDetail";
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};

exports.getAllAssetOutDetailByCriteria = (Obj, done) => {
    var wh = db.whereCriteriaGenerator(Obj);
    let sql = "select Id,RowStatus,GINo,AssetNumber, ReturnPartial from AssetOutDetail"+wh;
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};

exports.insertAssetOutDetail = (Obj, done) => {
    let sql = "exec up_insertAssetOutDetail @GINo='"+Obj.GINo+"',@AssetNumber='"+Obj.AssetNumber+"',@ReturnPartial='"+Obj.ReturnPartial+"';";
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};

exports.updateAssetOutDetail = (Obj, done) => {
    let sql = "update AssetOutDetail set GINo='"+Obj.GINo+"',AssetNumber='"+Obj.AssetNumber+"', ReturnPartial='"+Obj.ReturnPartial+"' where Id = "+Obj.Id+";";
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};

exports.updateAssetOutDetailPartial = (Obj, done) => {
    let sql = "update AssetOutDetail set ReturnPartial='"+Obj.ReturnPartial+"' where GINo = '"+Obj.GINo+"' AND AssetNumber = '"+Obj.AssetNumber+"';";
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};

exports.updateAssetOutStatus = (GINo, Status, done) => {
    let sql ="";
    if(Status == 2)
        sql = "update AssetOut set Status='"+Status+"', ApproveDate=GetDate() where GINo = '"+GINo+"';";
    else
        sql = "update AssetOut set Status='"+Status+"' where GINo = '"+GINo+"';";
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};

exports.getAssetOutDetailReturn = (AssetNo, done) => {
    let sql = "exec up_getAssetOutDetail @AssetNumber='"+AssetNo+"';";
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};

exports.printBastk = (key, done) => {
    let sql = "exec up_printBASTK @GINo='"+key+"';";
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};