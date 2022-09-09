const db = require('../connection/connection');

exports.getAllRack = (done) => {
    let sql = "select Id,RowStatus,RackCode,Name,Line,Enable,format(CreateDate,'yyyy-MM-dd HH:mm:ss') CreateDate,CreateBy,format(UpdateDate,'yyyy-MM-dd HH:mm:ss') UpdateDate,UpdateBy from Rack";
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};

exports.getAllRackByCriteria = (Obj, done) => {
    var wh = db.whereCriteriaGenerator(Obj);
    let sql = "select Id,RowStatus,RackCode,Name,Line,Enable,format(CreateDate,'yyyy-MM-dd HH:mm:ss') CreateDate,CreateBy,format(UpdateDate,'yyyy-MM-dd HH:mm:ss') UpdateDate,UpdateBy from Rack"+wh;
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};

exports.insertRack = (Obj, done) => {
    let sql = "exec up_insertRack @Name='"+Obj.Name+"', @Line='"+Obj.Line+"', @Enable=1, @CreateBy='"+Obj.CreateBy+"';";
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};

exports.updateRack = (Obj, done) => {
    let sql = "update Rack set Name ='"+Obj.Name+"', Line='"+Obj.Line+"' where RackCode = '"+Obj.RackCode+"';";
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};