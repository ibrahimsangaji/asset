const db = require('../connection/connection');

exports.getAllType = (done) => {
    let sql = "select Id,RowStatus,TypeCode,Name from Type";
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};

exports.getAllTypeByCriteria = (Obj, done) => {
    var wh = db.whereCriteriaGenerator(Obj);
    let sql = "select Id,RowStatus,TypeCode,Name from Type"+wh;
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};

exports.insertType = (Obj, done) => {
    let sql = "exec up_insertType @Name='"+Obj.Name+"';";
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};

exports.updateType = (Obj, done) => {
    let sql = "update Type set Name ='"+Obj.Name+"' where TypeCode = '"+Obj.TypeCode+"';";
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};