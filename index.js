const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./db/db.bictia');

let badge_controller = require('./app/controllers/badge')(db);
let usersController = require('./app/controllers/users')(db);
let trainingsController = require('./app/controllers/trainings')(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/users', usersController);
app.use('/trainings', trainingsController);
app.use('/badge', badge_controller);


app.listen(port, function(){
    console.log("Corriendo proyecto BICTIA");
});