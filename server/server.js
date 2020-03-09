var config = require('./config'),
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    apiRouter = express.Router();
http = require('http');
cors = require('cors');
const path = require('path');
/*Manage size limits for POST/PUT requests*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
/*Manage CORS Access for ALL requests/reponses*/
app.use(function(req, res, next) {
    /* Allow access from any requesting client */
    res.setHeader('Access-Control-Allow-Origin', '*');
    /* Allow access for any of the following Http request types */
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
    /* Set the Http request header */
    res.setHeader('Access-Control-Allow-Headers', 'origin,X-Requested-With,content-type,accept,x-xsrf-token');
    next();
});

app.get('/', (req, res) => {
    try {
        res.send('<h1>Server Running</h1>');
    } catch (err) {
        console.log("error for start file " + err);
        throw err;
    }
    console.log("connected");

});


app.get('/lists', (req, res) => {
    items = []

    rotateImg = 0
    lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddo eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    clicked = 1
    images = [
        'bandit',

    ]
    for (let i = 0; i < 1000; i++) {
        items.push({
            name: i + ' - ' + images[rotateImg],
            imgHeight: Math.floor(Math.random() * 50 + 150),
        })
    }

    try {
        res.json(items)
    } catch (err) {
        console.log("error")
        throw err
    }
    console.log("route working")
})


app.post('/verifyLogin', (req, res) => {
    try {
        console.log(req.body);
        if (req.body.userId === '1234' && req.body.password === '1234') {
            res.send('true');
        } else {
            res.send('false');
        }
    } catch (e) {
        console.log(e);
    }
});

app.listen(config.port, function() {
    console.log("server running @ " + config.port);
})