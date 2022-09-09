const db = require('../connection/connection');

exports.getAllFunctions = (done) => {
    let sql = "select Id,RowStatus,FunctionCode,Name,LocationCode,Enable,format(CreateDate,'yyyy-MM-dd HH:mm:ss') CreateDate,CreateBy,format(UpdateDate,'yyyy-MM-dd HH:mm:ss') UpdateDate,UpdateBy from Functions";
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        // conn.close();
    });  
};

exports.getAllFunctionsByCriteria = (Obj, done) => {
    var wh = db.whereCriteriaGenerator(Obj);
    let sql = "select Id,RowStatus,FunctionCode,Name,LocationCode,Enable,format(CreateDate,'yyyy-MM-dd HH:mm:ss') CreateDate,CreateBy,format(UpdateDate,'yyyy-MM-dd HH:mm:ss') UpdateDate,UpdateBy from Functions"+wh;
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        // conn.close();
    });  
};

exports.insertFunction = (Obj, done) => {
    let sql = "exec up_insertFunction @FunctionCode='"+Obj.FunctionCode+"', @Name='"+Obj.Name+"', @LocationCode='"+Obj.LocationCode+"', @Enable=1, @CreateBy='"+Obj.CreateBy+"';";
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        // conn.close();
    });  
};

exports.updateFunctionOld = (Obj, done) => {
    let sql = "update Functions set Name ='"+Obj.Name+"', LocationCode='"+Obj.LocationCode+"', UpdateDate='"+Obj.UpdateDate+"', UpdateBy='"+Obj.UpdateBy+"' where FunctionCode = '"+Obj.FunctionCode+"';";
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        // conn.close();
    });  
};

exports.validatFunction = (Obj, done) => {
    let sql = "SELECT COUNT (*) AS total FROM Functions WHERE FunctionCode = '"+Obj.FunctionCode+"';";
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
    });  
};


//update all function
exports.updateFunctionNew = (Obj, done) => {
    let sql = "SET XACT_ABORT ON  begin transaction; update Functions set Name ='"+Obj.Name+"', LocationCode='"+Obj.LocationCode+"', FunctionCode = '"+Obj.FunctionCode+"' where Id = '"+Obj.Id+"';update AssetOut set ReceiverFunction = '"+Obj.FunctionCode+"' where ReceiverFunction = '"+Obj.OldCode+"';update StockOpname set FunctionCode = '"+Obj.FunctionCode+"', UpdateDate='"+Obj.UpdateDate+"', UpdateBy='"+Obj.UpdateBy+"' where FunctionCode = '"+Obj.OldCode+"';commit;"
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
    });  
};