const express = require('express');
const app = express();
const config = require('./config.json');
const cors = require('cors');
//const config2 = require('./app/utils/config');
//son equivalentes
const port = process.env.PORT ? process.env.PORT : config.app.port ? config.app.port : 3456;
//const port = process.env.PORT || config.app.port || 3456;

//URL Encode support for POST, PUT methods
const bodyParser = require('body-parser');

//controlador user con auth
let usersController = require('./app/controllers/users_firebase')();
let loginController = require('./app/controllers/login')();

let badge_controller = require('./app/utils/controller')('badge');
let challengesController=require('./app/utils/controller')('challenge');
let trainingsController = require('./app/utils/controller')('training');
let advancesController = require('./app/utils/controller')('advance'); 
let uploadsController = require('./app/utils/controller')('uploads'); 

//Relación tablas
let badge_user_controller = require('./app/utils/controller')('badge_user');
let challenge_user_controller = require('./app/utils/controller')('challenge_user');
let uploads_user_controller = require('./app/utils/controller')('uploads_user');

let heroController = require('./app/utils/controller')('heroes');
let ConsoleController = require('./app/controllers/console')();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


/*var whitelist = ['http://localhost','https://devlearning-2c9c9.web.app','*'];

var corsOptions = {
    origin: function(origin, callback){
        if(whitelist.indexOf(origin) !== -1){
            callback(null, true)
        }else{
            callback(new Error('Not allowed by CORS'))
        }
    }
};*/

app.use(cors());

app.use('/heroes',heroController);

app.use('/advance', advancesController);  // New
app.use('/users', usersController);
app.use('/training', trainingsController);
app.use('/challenge', challengesController);
app.use('/badge', badge_controller);
app.use('/upload',uploadsController)

app.use('/login', loginController);

app.use('/badge_user', badge_user_controller);
app.use('/challenge_user', challenge_user_controller);
app.use('/upload_user',uploads_user_controller);

app.use('/console',ConsoleController)

app.use('/',(request, response)=>{

    response.send('Bienvenido a la API DevLearning...');
}); 


app.listen(port, function(){
    console.log("Corriendo: "+config.app.nombre);
});