require('dotenv').config();
const express = require('express');
const path = require('path');
const cors =require('cors')
var bodyParser = require('body-parser')
const pResume = require('./controllers/resume');
const app = express();
app.use(express.json());

console.log("connected")
app.use(cors());
app.options('*',cors());

app.use(bodyParser.urlencoded({extended: false}));

const routes = require("./routes/index")

app.use('/api', routes);

app.get('/',function(req,res){
  res.status(200).send('{"Welcome!":"This is iViewlabs API endpoint."}');
})

app.get('/api',function(req,res){
  res.status(200).send('{"Welcome!":"This is iViewlabs API endpoint."}');
})

app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use('/assets', express.static('assets'))
app.get('/resume/:id/:file',pResume.resume)

module.exports = app;