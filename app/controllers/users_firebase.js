const config = require('../../config.json');

const UserFirebase = function(databaseconfig){

    const express = require('express');
    const router = express.Router();
    const TABLE = "users";

    const general = require("../utils/general")();
    general.setDefaultDatabase(config.database.default);
    let admin = general.getFirebase();
    let model = general.getDatabaseModel();    
    

    router.get('/',function(request,response){
        admin.auth().listUsers().then(function(usersResult){
            let allUsers = [];
            usersResult.users.forEach(element => {
                allUsers.push(element.toJSON());
            });
            model.getAll(TABLE)
            .then((rows) => {
                response.send({users_auth:allUsers,users_dabase:rows});
            })
            .catch((error) => {
                response.send(error);
            });    
        }).catch(function(error){
            response.send(error);
        });
    });

    router.get('/:id', function (request, response) {
        let id = request.params.id;
        admin.auth().getUser(id).then(function(users){
            model.getById(TABLE, id)
            .then((row) => {
                response.send({user_auth:users.toJSON(),user_database:row});
            })
            .catch((error) => {
                console.error(error);
                response.send(error);
            });
        }).catch(function(error){
            response.send(error);
        });
    });


    router.post('/',function(request,response){
        
        admin.auth().createUser(request.body).then(function(users){
            let id = users.uid;
            model.createid(TABLE, request.body, id)
            .then((rows) => {
                response.send(id);
            })
            .catch((error) => {
                console.error(error);
                response.send(error);
            });
        }).catch(function(error){
            response.send(error);
        });
    });

    router.put('/:id', function (request, response) {
        let id = request.params.id;
        admin.auth().updateUser(id,request.body).then(function(users){
            model.update(TABLE, request.body, id)
            .then((row) => {
                response.send({user_uid:users.uid,user_database:row});
            })
            .catch((error) => {
                console.log(error);
                response.send(error);
            });
            
        }).catch(function(error){
            response.send(error);
        });
    });

    router.delete('/:id', function (request, response) {
        let id = request.params.id;
        admin.auth().deleteUser(id).then(function(users){
            model.delete(TABLE, id)
            .then((message) => {
                response.send(message);
            })
            .catch((error) => {
                response.send(error);
            });
            response.send('Se eliminó');
        }).catch(function(error){
            response.send(error);
        });
    });

    router.get('/token/:id', function (request, response) {
        let id = request.params.id;

        admin.auth().getUser(id).then(function(users){
            let user =users.toJSON();
            let customInformation = {
                user:user,
                date_login: new Date(),
                type:'Admin'
            };
            admin.auth().createCustomToken(id, customInformation).then(function(customToken){
                response.send(customToken);
            }).catch(function(error){
                response.send(error);
            });
            
        }).catch(function(error){
            response.send(error);
        });

    });

    router.get('/option/clean', function (request, response) {
        
    });


    return router;
}
module.exports = UserFirebase;