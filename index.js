const express = require('express');
const app = express();
const config = require('./config.json');
//const config2 = require('./app/utils/config');
//son equivalentes
const port = process.env.PORT ? process.env.PORT : config.app.port ? config.app.port : 3456;
//const port = process.env.PORT || config.app.port || 3456;

//URL Encode support for POST, PUT methods
const bodyParser = require('body-parser');


let badge_controller = require('./app/controllers/badge')();
//let badge_controller = require('./app/controllers/badge_firebase')();
//let usersController = require('./app/controllers/users')();
let challengesController=require('./app/controllers/challenges')();
let usersController = require('./app/controllers/users_firebase')();
let trainingsController = require('./app/controllers/trainings')();
let advancesController = require('./app/controllers/advances')();   // New
let loginController = require('./app/controllers/login')();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/advances', advancesController);  // New
app.use('/users', usersController);
app.use('/trainings', trainingsController);
app.use('/challenges', challengesController);
app.use('/badge', badge_controller);
app.use('/login', loginController);


app.listen(port, function(){
    console.log("Corriendo: "+config.app.nombre);
});