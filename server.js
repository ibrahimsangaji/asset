const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const configsettings = require('./server/config');
const timeout = require('connect-timeout'); //express v4

//t
//Cors

app.use(cors());
app.options('*', cors());
//registering view
app.set('views', 'server/views');
app.set('view engine', 'pug');
// API file for interacting with api route
const api_asset = require('./server/routes/rasset');
const api_assetin = require('./server/routes/rassetin');
const api_assetout = require('./server/routes/rassetout');
const api_brand = require('./server/routes/rbrand');
const api_functions = require('./server/routes/rfunctions');
const api_location = require('./server/routes/rlocation');
const api_rack = require('./server/routes/rrack');
const api_type = require('./server/routes/rtype');
const api_sto = require('./server/routes/rsto');
const api_sw = require('./server/routes/rsoftware');

// Parsers
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));
// API location route

//secure the api with auth
// var auth = function (req, res, next) {
//     let uri = String(req.originalUrl);
//     if (uri.indexOf('api/user/login') >= 0 || uri.indexOf('api/user/register') >= 0){//Want to Login
//         //First check to AD
//         var ActiveDirectory = require('activedirectory');
//         var config = {
//             url: 'ldap://acss-clb-dc01',
//             baseDN: 'dc=acset,dc=co',
//         }
//         var ad = new ActiveDirectory(config);
//         var username = req.body.username+"@acset.co";
//         var password = req.body.password;
    
//         ad.authenticate(username, password, function (err, auth) {
//             if (err) {
//                 return res.status(401).send({ auth: false, message: 'Authentication failed!' });
//             }
//             if (auth) {
//                 next();
//             }
//             else {
//                 return res.status(401).send({ auth: false, message: 'Authentication failed!' });
//             }
//         });
//     }
//     else {
//         var token = req.headers['x-access-token'];
//         if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

//         jwt.verify(token, configsettings.secret, function (err, decoded) {
//             if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
//             next();
//         });
//     }
// }
// app.use(auth);


//our route
app.use('/api/asset', api_asset);
app.use('/api/assetin', api_assetin);
app.use('/api/assetout', api_assetout);
app.use('/api/brand', api_brand);
app.use('/api/functions', api_functions);
app.use('/api/location', api_location);
app.use('/api/rack', api_rack);
app.use('/api/type', api_type);
app.use('/api/sto', api_sto);
app.use('/api/sw', api_sw);

app.use(timeout('150s'));
app.use(haltOnTimedout);
function haltOnTimedout(req, res, next) {
    if (!req.timedout) next()
}

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});


//Set Port
const port = '3002';
app.set('port', port);
http.globalAgent.maxSockets = Infinity;
const server = http.createServer(app);
server.listen(port, () => console.log(`Running on localhost:${port}`));