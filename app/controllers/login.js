const config = require('../../config.json');

const LoginController = function(){
    const express = require('express');
    const router = express.Router();
    var jwt = require('jsonwebtoken');

    router.post('/', function(request, response){
        let user = request.body.user;
        let password = request.body.password;

        if(user == config.login.username&&password==config.login.password){
            let datos = {
                user:user,
                date_login: new Date(),
                type:config.login.type
              }

              //                                                           sg
              var token = jwt.sign({exp: Math.floor(Date.now() / 1000) + (60 * config.jwt.expire),datos}, config.jwt.secreto);
              response.send({token:token});

        }else{
            response.send('Datos incorrectos');
        }
    });

    return router;
}

module.exports = LoginController;