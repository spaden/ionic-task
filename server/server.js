var config = require('./config'),
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    apiRouter = express.Router();
const path = require('path');
/*Manage size limits for POST/PUT requests*/
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
/*Manage CORS Access for ALL requests/reponses*/
app.use(function(req, res, next)
{
    /* Allow access from any requesting client */
    res.setHeader('Access-Control-Allow-Origin', '*');
    /* Allow access for any of the following Http request types */
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
    /* Set the Http request header */
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    next();
});

app.get('/', (req, res) => {
    try {
        res.sendFile(path.resolve("../ionic-task/src/index.html"));
    }
    catch (err) {
        console.log("error for start file " + err);
        throw err;
    }

});
app.listen(config.port,function () {
    console.log("started");
});


