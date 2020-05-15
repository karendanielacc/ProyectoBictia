const express = require('express');
const app = express();
const port = 3456;

//URL Encode support for POST, PUT methods
const bodyParser = require('body-parser');



//SQLite support
//const sqlite3 = require('sqlite3').verbose();
//const sqliteClient = new sqlite3.Database('./db/db.bictia');

//Mongo support
//const mongodbClient = require('mongodb').MongoClient;
//const url = 'mongodb://localhost:27017';

//Firebase support
/*const admin = require("firebase-admin");
const serviceAccount = require("./private/key.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://proyecto-bictia.firebaseio.com"
});


const databaseConfig = {
    "sqlite": general.getSQLite(), 
    "mongodb":general.getMongoDB().client, 
    "mongodb_url":getMongoDB().url, 
    "firestore":general.getFirebase().firestore(),
    "default":'firestore'
};*/

let badge_controller = require('./app/controllers/badge')();
let badge_firebase_controller = require('./app/controllers/badge_firebase')();
let usersController = require('./app/controllers/users')();
let trainingsController = require('./app/controllers/trainings')();
let advancesController = require('./app/controllers/advances')();   // New
let loginController = require('./app/controllers/login')();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/advances', advancesController);  // New

app.use('/users', usersController);
app.use('/trainings', trainingsController);
app.use('/badge', badge_controller);
app.use('/login', loginController);


app.listen(port, function(){
    console.log("Corriendo proyecto BICTIA");
});