const config = require('../../config.json');
module.exports = function (databaseConfig) {

    const express = require('express');
    const router = express.Router();
    const TABLE = "badge_user";

    const general = require("../utils/general")();
    general.setDefaultDatabase(config.database.default);
    let model = general.getDatabaseModel();


    //{{SERVER}}/badge/create_badge
    router.post('/initialize', function (request, response) {
        if (general.validateLogin(request)) {
            model.initialize(TABLE, request.body)
                .then((rows) => {
                    response.send(rows);
                })
                .catch((error) => {
                    response.send(error);
                })
        } else {
            response.send({ error: 'No se ha enviado ningun token' });
        }
    });

    //{{SERVER}}/badge/delete_badge
    router.get('/option/clean', function (request, response) {
        if (general.validateLogin(request)) {
            model.clean(TABLE)
                .then((message) => {
                    response.send(message);
                })
                .catch((error) => {
                    response.send(error);
                    console.error(error);
                });
        } else {
            response.send({ error: 'No se ha enviado ningun token' });
        }
        /**/
    });

    //{{SERVER}}/badge/insert_badge
    router.post('/insert', function (request, response) {
        if (general.validateLogin(request)) {
            model.create(TABLE, request.body)
                .then((rows) => {
                    response.send(rows);
                })
                .catch((error) => {
                    console.error(error);
                    response.send(error);
                });
        } else {
            response.send({ error: 'No se ha enviado ningun token' });
        }
    });

    //{{SERVER}}/badge/insert_badge
    router.put('/:id', function (request, response) {
        if (general.validateLogin(request)) {
            let id = request.params.id;
            model.update(TABLE, request.body, id)
                .then((row) => {
                    response.send(row);
                })
                .catch((error) => {
                    console.log(error);
                    response.send(error);
                });
        } else {
            response.send({ error: 'No se ha enviado ningun token' });
        }

    });

    //{{SERVER}}/badge/list_badge
    router.get('/list', function (request, response) {
        if (general.validateLogin(request)) {
            model.getAll(TABLE)
                .then((rows) => {
                    response.send(rows);
                })
                .catch((error) => {
                    response.send(error);
                });
        } else {
            response.send({ error: 'No se ha enviado ningun token' });
        }

    });

    //{{SERVER}}/badge/list_badge
    router.get('/:id', function (request, response) {
        let id = request.params.id;
        if (general.validateLogin(request)) {
            model.getById(TABLE, id)
                .then((row) => {
                    response.send(row);
                })
                .catch((error) => {
                    console.error(error);
                    response.send(error);
                });
        } else {

        }

    });

    //{{SERVER}}/badge/list_badge
    router.delete('/:id', function (request, response) {
        let id = request.params.id;
        if (general.validateLogin(request)) {
            model.delete(TABLE, id)
                .then((message) => {
                    response.send(message);
                })
                .catch((error) => {
                    response.send(error);
                });
        } else {
            response.send({ error: 'No se ha enviado ningun token' });
        }
    });


    return router;

}