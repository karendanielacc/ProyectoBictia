const LoginController = function(){
    const express = require('express');
    const router = express.Router();
    var jwt = require('jsonwebtoken');


    router.post('/', function(request, response){
        let user = request.body.user;
        let password = request.body.password;

        if(user == 'admin'&&password=='123456'){
            let datos = {
                user:user,
                date_login: new Date(),
                type:'admin'
              }
              let secreto = 'bictia';
              //                                                           sg
              var token = jwt.sign({exp: Math.floor(Date.now() / 1000) + (60 * 1),datos}, secreto);
              response.send({token:token});

        }else{
            response.send('Datos incorrectos');
        }
    });

    return router;
}

module.exports = LoginController;