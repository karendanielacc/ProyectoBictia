module.exports = function (databaseConfig) {
    const express = require('express');
    const router = express.Router();
    const TABLE = 'advances';

    const general = require("../utils/general")();
    general.setDefaultDatabase('firestore');
    let model = general.getDatabaseModel();

    /*let model;

    switch (databaseConfig.default) {
        case 'mongodb':
            model = require('../models/mongodb_model')(databaseConfig.mongodb, databaseConfig.mongodb_url);
            break;
        case 'sqlite':
            model = require('../models/sqlite_model')(databaseConfig.sqlite);
            break;
        case 'firestore':
            model = require('../models/firestore_model')(databaseConfig.firestore);
            break;
        default:
            model = require('../models/sqlite_model')(databaseConfig.sqlite);
            break;
    }*/

    //{{SERVER}}/advances/create_advances
    router.post('/option/initialize', function (request, response) {
        model.initialize(TABLE, request.body)
            .then((message) => {
                response.send(message)
            })
            .catch((error) => {
                // console.error(error);
                response.send(error);
            });
    });

    //{{SERVER}}/advances/delete_advances
    //Limpiar tabla
    router.get('/option/clean', function (request, response) {
        model.clean(TABLE)
            .then((message) => {
                response.send(message)
            })
            .catch((error) => {
                console.error(error);
                response.send(error);
            });
    });

    //{{SERVER}}/advances/insert_advance
    //Crea un logro
    router.post('/insert', function (request, response) {
        model.create(TABLE, request.body)
            .then((object) => {
                response.send(object)
            })
            .catch((error) => {
                // console.error(error);
                response.send(error);
            });
    });

    //{{SERVER}}/advances/edit_advance
    //Edita un logro
    router.put('/:id', function (request, response) {
        let id = request.params.id;
        model.update(TABLE, request.body, id)
            .then((row) => {
                response.send(row);
            })
            .catch((error) => {
                console.error(error);
                response.send(error);
            });

    });

    //{{SERVER}}/advances/list_advances
    //Lista todos los logros
    router.get('/list', function (request, response) {
        model.getAll(TABLE)
            .then((rows) => {
                response.send(rows);
            })
            .catch((error) => {
                // console.error(error);
                response.send(error);
            });
    });

    //{{SERVER}}/advances/set_advance
    //Trae un logro por ID
    router.get('/:id', function (request, response) {
        let id = request.params.id;
        model.getById(TABLE, id)
            .then((row) => {
                response.send(row);
            })
            .catch((error) => {
                console.error(error);
                response.send(error);
            });
    });

    //{{SERVER}}/advances/delete_advance
    //Elimina un logro
    router.delete('/:id', function (request, response) {
        let id = request.params.id;
        model.delete(TABLE, id)
            .then((message) => {
                response.send(message);
            })
            .catch((error) => {
                console.error(error);
                response.send(error);
            });
    });


    return router;
}