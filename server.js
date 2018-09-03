const appConfig = require('./constants/config'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    routes = require('./api/routes/routes'),
    User = require('./api/models/user-model'),
    env = require('./env.json')[process.env.NODE_ENV || 'development'],
    cors = require('cors');

// Starting connecting with mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(env.mongoDbUri);

app.use(bodyParser.urlencoded({ extended: appConfig.urlEncoded }));
app.use(bodyParser.json());

// Allow CORS
app.use(
    (req, res, next) => {
        if (req.method === 'OPTIONS') {
            res.header("Access-Control-Allow-Origin", "*");
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
            next();
        } else {
            cors();
        }
    });

// Registering Application routes
routes(app);

// Server up and running
var server = app.listen(process.env.PORT || appConfig.portNo, () => {});