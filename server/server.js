var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');

var app = express();
app
    .use(express.static('client'))
    .use(bodyParser.json());


app.listen(3000);
console.log('Server listening on port 3000');

function sendResponse(res, data) {
    var statusCode = 200
    var header = {
        'Content-Type': 'application/json'
    };
    res.writeHead(statusCode, header);
    res.end(data);
}

function handleError(err, req, res, next) {
    console.log('handling...');
    console.log(err instanceof Error);
    if (err instanceof Error) {
        var error = {
            code: 500,
            message: err.message
        };
        var header = {
            'Content-Type': 'application/json'
        };
        res.writeHead(500, header);
        res.end(JSON.stringify(error));
    } else {
        throw err;
    }
}
