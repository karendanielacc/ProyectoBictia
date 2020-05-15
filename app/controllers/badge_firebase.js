const UserFirebase = function () {
    const express = require('express');
    const router = express.Router();

    const general = require("../utils/general")();

    let admin = general.getFirebase();

    router.get('/list', function (request, response) {
        admin.auth().listUsers()
        .then(function(users){
            response.send(users.toJSON());
        })
        .catch(function(error){
            response.send(error);
        });
    });

    router.get('/:id', function (request, response) {
        let id = request.params.id;
        admin.auth().getUser(id)
        .then(function(users){
            response.send(users.toJSON());
        })
        .catch(function(error){
            response.send(error);
        });
    });

    router.post('/insert', function (request, response) {
    });

    router.put('/:id', function (request, response) {
    });

    router.get('/option/clean', function (request, response) {
    });

    return this;
}
module.exports = UserFirebase;