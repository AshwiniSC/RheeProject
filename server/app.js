import  express from 'express';
import  path from 'path';
import bodyParser from 'body-parser';
import compression from 'compression';
import logger from 'morgan';
import Config from './config/config';

const app =  new express();


//db models
const db = require('./config/db');
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '100mb'}));

//api js v1
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PATCH, PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(compression())

// This responds a POST request for the homepage
app.post('/', function (req, res) {
  console.log("Got a POST request for the homepage");
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

// This responds a Get request for the api docs
app.get('/docs', function (req, res) {
  console.log("Got a GET request for the api docs");
  res.sendFile(path.join(__dirname, 'public/docs', 'index.html'));
})

var apis = require('./routes/apis');	

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));


//generate the apis docs when server starts every time 
var nrc = require('node-run-cmd');
nrc.run('api-doc-generator --title Test API Docs --input routes/apis.js --output public/docs');

app.use('/', apis);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
