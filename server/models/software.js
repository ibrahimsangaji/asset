const db = require('../connection/connection');

exports.getAllSoftware = (done) => {
    let sql = "select Id,RowStatus,SWCode, Price,Name, format(CreateDate,'yyyy-MM-dd HH:mm:ss') CreateDate,CreateBy,format(UpdateDate,'yyyy-MM-dd HH:mm:ss') UpdateDate,UpdateBy from Software";
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};

exports.getAllSoftwareByCriteria = (Obj, done) => {
    var wh = db.whereCriteriaGenerator(Obj);
    let sql = "select Id,RowStatus,SWCode, Price,Name, format(CreateDate,'yyyy-MM-dd HH:mm:ss') CreateDate,CreateBy,format(UpdateDate,'yyyy-MM-dd HH:mm:ss') UpdateDate,UpdateBy from Software"+wh;
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};

exports.insertSoftware = (Obj, done) => {
    
    let sql = "exec up_insertSoftware @Name='"+Obj.Name+"',@Price='"+Obj.Price+"',@CreateBy='"+Obj.CreateBy+"';";
    console.log(sql);
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};

exports.updateSoftware = (Obj, done) => {
    let sql = "update Software set Name ='"+Obj.Name+"',Price ='"+Obj.Price+"', UpdateDate=getdate() where SWCode = '"+Obj.SWCode+"';";
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};
