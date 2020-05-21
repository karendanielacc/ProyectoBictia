const config = require('../../config.json');
const Controller = function (TABLE) {
    const express = require('express');
    const router = express.Router();

    const general = require("./general")();
    general.setDefaultDatabase(config.database.default);
    let model = general.getDatabaseModel();


    //{{SERVER}}/users/ 
    //Lista todos los usuarios
    router.get('/', function (request, response) {
        let validationToken = general.validateLogin(request);
        if (validationToken.auth) {
            model.getAll(TABLE)
                .then((rows) => {
                    response.send(rows);
                }).catch((error) => {
                    console.error(error);
                    response.send(error);
                });
        } else {
            response.send({ error: 'No se ha enviado un token', message: validationToken.message });
        }

    });

    //{{SERVER}}/users/id 
    //Trae un usuario por ID
    router.get('/:id', function (request, response) {
        let id = request.params.id;
        let validationToken = general.validateLogin(request);
        if (validationToken.auth) {
            model.getById(TABLE, id)
                .then((row) => {
                    response.send(row);
                }).catch((error) => {
                    console.error(error);
                    response.send(error);
                });
        } else {
            response.send({ error: 'No se ha enviado un token' });
        }
    });

    //{{SERVER}}/users/
    //Crea un usuario
    router.post('/', function (request, response) {
        let validationToken = general.validateLogin(request);
        if (validationToken.auth) {
            model.create(TABLE, request.body)
                .then((object) => {
                    response.send(object)
                }).catch((error) => {
                    console.error(error);
                    response.send(error);
                });
        } else {
            response.send({ error: 'No se ha enviado un token' });
        }
    });

    //{{SERVER}}/users/:id
    //Edita un usuario
    router.put('/:id', function (request, response) {
        let id = request.params.id;
        let validationToken = general.validateLogin(request);
        if (validationToken.auth) {
            model.update(TABLE, request.body, id)
                .then((row) => {
                    response.send(row);
                }).catch((error) => {
                    console.error(error);
                    response.send(error);
                });
        } else {
            response.send({ error: 'No se ha enviado un token' });
        }

    });


    //{{SERVER}}/users/id
    //Elimina un usuario
    router.delete('/:id', function (request, response) {
        let id = request.params.id;
        let validationToken = general.validateLogin(request);
        if (validationToken.auth) {
            model.delete(TABLE, id)
                .then((message) => {
                    response.send(message);
                }).catch((error) => {
                    console.error(error);
                    response.send(error);
                });
        } else {
            response.send({ error: 'No se ha enviado un token' });
        }
    });


    //{{SERVER}}/users/delete_users
    //Limpiar tabla
    router.get('/option/clean', function (request, response) {
        let validationToken = general.validateLogin(request);
        if (validationToken.auth) {
            model.clean(TABLE)
                .then((message) => {
                    response.send(message)
                }).catch((error) => {
                    console.error(error);
                    response.send(error);
                });
        } else {
            response.send({ error: 'No se ha enviado un token' });
        }
    });

    //{{SERVER}}/users/create_users
    router.post('/option/initialize', function (request, response) {
        let validationToken = general.validateLogin(request);
        if (validationToken.auth) {
            model.initialize(TABLE, request.body)
                .then((message) => {
                    response.send(message)
                }).catch((error) => {
                    console.error(error);
                    response.send(error);
                });
        } else {
            response.send({ error: 'No se ha enviado un token' });
        }
    });


    return router;
};

module.exports = Controller;