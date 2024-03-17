
const route = require("./routes/index");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var express = require('express');
var app = express();
const cors = require('cors');
const PORT = 4000;
const fs = require('fs');
const http = require('http');
require('dotenv').config()


// Cloud setting
const { google }= require('googleapis');
const apikeys = require('./config/apiKey/apiKey.json');
const SCOPE = ['https://www.googleapis.com/auth/drive'];



async function authorize(){
  const jwtClient = new google.auth.JWT(
      apikeys.client_email,
      null,
      apikeys.private_key,
      SCOPE
  );
  await jwtClient.authorize();
  return jwtClient;
}

// Use cors middleware
app.use(cors());

// Database connect
const db = require("./config/database");
db.connect();


// Google cloud connect
const GoogleCloud = require("./config/GoogleCloud");
GoogleCloud.authorize().then((auth) => {
  console.log("➤  Authorize google cloud successfully !");
  // uploadFile(auth)
}).catch("error",console.error());

// Apply server modules
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());  // Sử dụng cookie-parser middleware
app.use(cors());

//Server routes setting 
route(app)


http.createServer(app).listen((process.env.PORT || 8080), () => {
  console.log(
    `
    -----------------------------------------------------------------
    *                                                               *
    *    Server is running ....................................     *
    *                                                               *
    -----------------------------------------------------------------
    `)
} )


// app.listen(process.env.PORT || 5001, function () {
//   console.log(
//   `
//   -----------------------------------------------------------------
//   *                                                               *
//   *      Server is running in localhost with port 4000            *
//   *                                                               *
//   -----------------------------------------------------------------
//   `)
// });