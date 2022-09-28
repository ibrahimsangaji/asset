const db = require('../connection/connection');

exports.getAllAsset = (done) => {
    let sql = "select Id,RowStatus,AssetNumber,AssetNumberSAP,Name,TypeCode,BrandCode,RackCode,isnull(Spec,'')Spec,Status,Enable,format(CreateDate,'yyyy-MM-dd HH:mm:ss') CreateDate,CreateBy,format(UpdateDate,'yyyy-MM-dd HH:mm:ss') UpdateDate,UpdateBy from Asset";
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};

exports.getAllAssetByCriteria = (Obj, done) => {
    var wh = db.whereCriteriaGenerator(Obj);
    let sql = "select Id,RowStatus,AssetNumber,AssetNumberSAP,Name,TypeCode,BrandCode,RackCode,isnull(Spec,'')Spec,Status,Enable,format(CreateDate,'yyyy-MM-dd HH:mm:ss') CreateDate,CreateBy,format(UpdateDate,'yyyy-MM-dd HH:mm:ss') UpdateDate,UpdateBy from Asset"+wh;
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};

exports.insertAsset = (Obj, done) => {
    let sql = "exec up_insertAsset @AssetNumberSAP='"+Obj.AssetNumberSAP+"',@Name='"+Obj.AssetName+"',@TypeCode='"+Obj.TypeCode+"',@BrandCode='"+Obj.BrandCode+"',@RackCode='"+Obj.RackCode+"',@Spec='"+Obj.Spec+"',@Status='"+Obj.Status+"',@Enable='"+Obj.Enable+"',@CreatedBy='"+Obj.CreatedBy+"';";
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};

exports.updateAsset = (Obj, done) => {
    let sql = "update Asset set Status = '"+Obj.Status+"',BrandCode = '"+Obj.BrandCode+"',TypeCode = '"+Obj.TypeCode+"', RackCode = '"+Obj.RackCode+"', Spec = '"+Obj.Spec+"' where AssetNumber = '"+Obj.AssetNumber+"';";
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};

exports.updateAssetStatus = (assetNumber, status, done) => {
    let sql = "update Asset set Status = "+status+" where AssetNumber = '"+assetNumber+"';";
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};

exports.getAllAssetParams = (done) => {
    let sql = "select Id,EnumName,EnumValue,Info1,Info2,RowStatus,CreateBy,CreateDate,UpdateBy,UpdateDate FROM EnumParam;";
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};

exports.reportSTO = (month,year,code, done) => {
    let sql = "exec up_printReport @month='"+month+"',@year='"+year+"', @code='"+code+"';";
    console.log(sql)
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};

exports.reportMutation = (assetNumber, done) => {
    let sql = "exec up_reportMutation @assetNumber='"+assetNumber+"';";
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};

exports.insertAssetSoftware = (SWCode, assetNumber, done) => {
    let sql = "exec up_insertAssetSoftware  @SWCode='"+SWCode+"', @AssetNumber='"+assetNumber+"';";
    
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });   
};

exports.deleteAllAssetSoftware = (assetNumber, done) => {
    let sql = "delete AssetSoftware where AssetNumber = '"+assetNumber+"';";
    
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });   
};

exports.getAllAssetSoftwareByCriteria = (Obj, done) => {
    var wh = db.whereCriteriaGenerator(Obj);
    let sql = "select Id,RowStatus,SWCode,AssetNumber from AssetSoftware"+wh;
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};

//Asset Report
exports.getReportAsset = (done) => {
    let sql = "select * from uv_assetReport";
    db.execSql(sql).then(res=>{
       
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};

exports.getAssetSW = (Obj, done) => {
    let sql = "select s.Name from Software as s left join AssetSoftware as asw on asw.SWCode = s.SWCode left join Asset as a on a.AssetNumber = asw.AssetNumber where a.AssetNumber = '"+ Obj + "'";
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};



exports.getAllAssetSoftwareByCriteriaWithDesc = (Obj, done) => {
    var wh = db.whereCriteriaGenerator(Obj);
    
    let sql = "select Id,RowStatus,SWCode,(select top 1 s.Name from Software s where s.SWCode = a.SWCode)SoftwareName,AssetNumber from AssetSoftware a"+wh;
   
    db.execSql(sql).then(res=>{
        done(null, res);
    }).catch((err)=> {
        done(err);
        //conn.close();
    });  
};