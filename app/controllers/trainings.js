module.exports = function(db){
    const express = require('express');
    const router = express.Router();
    const TABLE = "trainings";
    let model = require('../models/sqlite_model')(db);

    //inicializar la tabla con las llaves y valores de cada clase
    router.post('/initialize', function(request, response){
        model.initialize(TABLE, request.body)
        .then((rows)=>{
            response.send(rows);
        })
        .catch((error)=>{
            response.send(error);
        })
    });

    //limpiar la tabla
    router.get('/option/clean', function(request, response){
        model.clean(TABLE)
        .then((message)=>{
            response.send(message);
        })
        .catch((error)=>{
            response.send(error);
            console.error(error);
        });
        /**/
    });
    
    //crear un nuevo entrenamiento
    router.post('/insert', function(request, response){
        model.create(TABLE, request.body)
        .then((rows)=>{
            response.send(rows);
        })
        .catch((error)=>{
            console.error(error);
            response.send(error);
        });
        
    });
    
    //actualizar información por id
    router.put('/:id', function(request, response){
        let id = request.params.id;
        model.update(TABLE, request.body, id)
        .then((row)=>{
            response.send(row);
        })
        .catch((error)=>{
            console.log(error);
            response.send(error);
        });
        
    });

    //Listar los entrenamientos
    router.get('/list', function(request, response){
        model.getAll(TABLE)
        .then((rows)=>{
            response.send(rows);
        })
        .catch((error)=>{
            response.send(error);
        });
    });

    //Ver un entrenamiento por su id
    router.get('/:id', function(request, response){
        let id = request.params.id;
        model.getById(TABLE, id)
        .then((row)=>{
            response.send(row);
        })
        .catch((error)=>{
            console.error(error);
            response.send(error);
        });
    });

    //Borrar un entrenamiento por su id
    router.delete('/:id', function(request, response){
        let id = request.params.id;
        model.delete(TABLE, id)
        .then((message)=>{
            response.send(message);
        })
        .catch((error)=>{
            response.send(error);
        });
    });


    return router;
}