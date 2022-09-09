const db = require('../connection/connection');

exports.getAllLocation = (done) => {
    let sql = "select Id,RowStatus,LocationCode,Name,Enable,format(CreateDate,'yyyy-MM-dd HH:mm:ss') CreateDate,CreateBy,format(UpdateDate,'yyyy-MM-dd HH:mm:ss') UpdateDate,UpdateBy,CategoryLocation from Location";
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};
exports.getAllLocationNameCrit = (obj, done) => {
    let sql = "select Id,RowStatus,LocationCode,Name,Enable,format(CreateDate,'yyyy-MM-dd HH:mm:ss') CreateDate,CreateBy,format(UpdateDate,'yyyy-MM-dd HH:mm:ss') UpdateDate,UpdateBy,CategoryLocation from Location where Name ='" + obj.Name + "' and CategoryLocation = '"+ obj.LocCode +"'" ;
    console.log("query -> "+sql)
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};

exports.getAllLocationByCriteria = (Obj, done) => {
    var wh = db.whereCriteriaGenerator(Obj);
    let sql = "select Id,RowStatus,LocationCode,Name,Enable,format(CreateDate,'yyyy-MM-dd HH:mm:ss') CreateDate,CreateBy,format(UpdateDate,'yyyy-MM-dd HH:mm:ss') UpdateDate,UpdateBy from Location"+wh;
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};

exports.insertLocation = (Obj, done) => {
    let sql = "exec up_insertLocation @Name='"+Obj.Name+"', @Enable=1, @CreateBy='"+Obj.CreateBy+"', @CategoryLocation='"+Obj.LocCat+"';";
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};

exports.updateLocation = (Obj, done) => {
    let sql = "update Location set Name ='"+Obj.Name+"', CategoryLocation ='"+Obj.LocCat+"' where LocationCode = '"+Obj.LocationCode+"';";
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};