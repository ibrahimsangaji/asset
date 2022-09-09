const db = require('../connection/connection');

exports.getAllBrand = (done) => {
    let sql = "select Id,RowStatus,BrandCode,Name from Brand";
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};

exports.getAllBrandByCriteria = (Obj, done) => {
    var wh = db.whereCriteriaGenerator(Obj);
    let sql = "select Id,RowStatus,BrandCode,Name from Brand"+wh;
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};

exports.insertBrand = (Obj, done) => {
    let sql = "exec up_insertBrand @Name='"+Obj.Name+"';";
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};

exports.updateBrand = (Obj, done) => {
    let sql = "update Brand set Name ='"+Obj.Name+"' where BrandCode = '"+Obj.BrandCode+"';";
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};