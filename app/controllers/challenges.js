const config = require('../../config.json');
module.exports = function (databaseConfig) {
    const express = require('express');
    const router = express.Router();
    const TABLE = "challenges";

    const general = require("../utils/general")();
    general.setDefaultDatabase(config.database.default);
    let model = general.getDatabaseModel();

    router.post('/initialize', function (request, response) {
        model.initialize(TABLE, request.body)
            .then((rows) => {
                response.send(rows);
            })
            .catch((error) => {
                response.send(error);
            })
    });

    //{{SERVER}}/badge/delete_badge
    router.get('/option/clean', function (request, response) {
        model.clean(TABLE)
            .then((message) => {
                response.send(message);
            })
            .catch((error) => {
                response.send(error);
                console.error(error);
            });
        /**/
    });

    //{{SERVER}}/badge/insert_badge
    router.post('/insert', function (request, response) {
        model.create(TABLE, request.body)
            .then((rows) => {
                response.send(rows);
            })
            .catch((error) => {
                console.error(error);
                response.send(error);
            });

    });

    //{{SERVER}}/badge/insert_badge
    router.put('/:id', function (request, response) {
        let id = request.params.id;
        model.update(TABLE, request.body, id)
            .then((row) => {
                response.send(row);
            })
            .catch((error) => {
                console.log(error);
                response.send(error);
            });

    });

    //{{SERVER}}/badge/list_badge
    router.get('/list', function (request, response) {
        model.getAll(TABLE)
            .then((rows) => {
                response.send(rows);
            })
            .catch((error) => {
                response.send(error);
            });
    });

    //{{SERVER}}/badge/list_badge
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

    //{{SERVER}}/badge/list_badge
    router.delete('/:id', function (request, response) {
        let id = request.params.id;
        model.delete(TABLE, id)
            .then((message) => {
                response.send(message);
            })
            .catch((error) => {
                response.send(error);
            });
    });


    return router;
}