const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./db/db.bictia');

let badge_controller = require('./app/controllers/badge')(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/badge', badge_controller);


app.listen(3456, function(){
    console.log("Corriendo proyecto BICTIA");
});