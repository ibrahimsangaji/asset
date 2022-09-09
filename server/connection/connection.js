//db.js
const sql = require('mssql');
// const config = {
//     user: 'helpdesk',
//     password: '098765',
//     server: 'acss-clb-ms01', // You can use 'localhost\\instance' to connect to named instance
//     database: 'Helpdesk_IT',
//     options: {
//         encrypt: false // Use this if you're on Windows Azure
//         , instanceName: 'SQLEXPRESS'
//     }
// }
const configIT = {
    user: 'sa',
    //user: 'helpdesk',
    password: 'P@ssw0rd!@#',
    // server: 'asgard',
    server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
    database: 'AssetIT',
    port : 1433,
    // options: {
    //     encrypt: false // Use this if you're on Windows Azure
    //     , instanceName: 'SQLEXPRESS'
    // }
}


exports.execSql = async function (sqlquery, params = {}, swicthConfig = "IT") {
    let pool;
    if (swicthConfig === "IT") {
        pool = new sql.ConnectionPool(configIT);
    }else{
        pool = new sql.ConnectionPool(configGA);
    }
    pool.on('error', err => {
        console.log('sql pool error db.js', err);
    });

    try {
        await pool.connect();
        let result = await pool.request();
        for (let key in params) {
            if (Array.isArray(params[key])) {
                // input(field_name, dataType, value)
                result = await result.input(key, params[key][1], params[key][0]);
            } else {
                // input(field_name, value)
                result = await result.input(key, params[key]);
            };
        };
        result = await result.query(sqlquery);

        return { success: result };
    } catch (err) {
        // stringify err to easily grab just the message
        let e = JSON.stringify(err, ["message", "arguments", "type", "name"]);
        // return { error: JSON.parse(e).message };
        throw { error: JSON.parse(e).message };
    } finally {
        pool.close(); //closing connection after request is finished.
    }
};

exports.whereCriteriaGenerator = function (object) {
    var where = " where ";
    for (var propertyName in object) {
        where += propertyName + " = '" + object[propertyName] + "' and ";
    }
    where = where.substring(0, where.length - 4);
    return where;
}

exports.nullCleanser = function (object) {
    for (var propertyName in object) {
        if (object[propertyName] === null) {
            object[propertyName] = "NULL";
        } else {
            object[propertyName] = "'" + object[propertyName] + "'";
        }
    }
    return object;
}