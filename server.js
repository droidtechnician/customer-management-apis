const appConfig = require('./constants/config'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    routes = require('./api/routes/routes'),
    User = require('./api/models/user-model'),
    env = require('./env.json')[process.env.NODE_ENV || 'development'];

// Starting connecting with mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(env.mongoDbUri);

// Allow CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', '*');
        res.header('Access-Control-Allow-Headers', '*');
        res.header('Origin', '*');
        res.status(200);
        res.send({});
    } else {
        next();
    }
});

app.use(bodyParser.urlencoded({ extended: appConfig.urlEncoded }));
app.use(bodyParser.json());

// Registering Application routes
routes(app);

// Server up and running
var server = app.listen(process.env.PORT || appConfig.portNo, () => {});