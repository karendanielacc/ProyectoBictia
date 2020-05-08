const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const sqliteClient = new sqlite3.Database('./db/db.bictia');
const mongodbClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

const databaseConfig = {"sqlite":sqliteClient, "mongodb":mongodbClient, "mongodb_url":url, "default":'mongodb'};

let badge_controller = require('./app/controllers/badge')(databaseConfig);
let usersController = require('./app/controllers/users')(databaseConfig);
let trainingsController = require('./app/controllers/trainings')(databaseConfig);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/users', usersController);
app.use('/trainings', trainingsController);
app.use('/badge', badge_controller);


app.listen(port, function(){
    console.log("Corriendo proyecto BICTIA");
});