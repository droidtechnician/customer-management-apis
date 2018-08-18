const appConfig = require('./constants/config'),
        express = require('express'),
        app = express(),
        bodyParser = require('body-parser'),
        mongoose = require('mongoose'),
        routes = require('./api/routes/routes'),
        User = require('./api/models/user-model');

// Starting connecting with mongoDB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://sampleuserone:sampleuser1@ds147265.mlab.com:47265/sample-app-db');

app.use(bodyParser.urlencoded({extended: appConfig.urlEncoded}));
app.use(bodyParser.json());

// Registering Application routes
routes(app);

app.listen(appConfig.portNo, ()=> {
    console.log("App Started");
})