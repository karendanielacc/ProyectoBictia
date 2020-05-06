module.exports= function(db){

    const express = require('express');
    const router = express.Router();
    const TABLE = 'trainings';

    //to create table
    router.get('/initialize',  function(request, response){
        db.serialize(function () {
            db.run('CREATE TABLE IF NOT EXISTS '+TABLE+' (id INT, language TEXT, level TEXT, title TEXT, content TEXT )');        
            response.send('tranings table has been created!');
        });
    });
    
    //to clean table
    router.get('/clean', function(request, response){
        db.serialize(function(){
            db.run('DROP TABLE IF EXISTS '+TABLE);
            response.send('trainings table has been cleaned!');
        });
    });
    
    //to create a new training
    router.post('/', function(request, response){
        db.serialize(function(){
            db.run('INSERT INTO '+TABLE+' values ('
            +request.body.id+',"'
            +request.body.language+'","'
            +request.body.level+'","'
            +request.body.title+'","'
            +request.body.content+'")');        
            response.send('Se ha agregado el entrenamiento: '+request.body.id+', '+request.body.language + ', '+request.body.level+ ', '+request.body.title+', '+request.body.content);
        });
        
    });
    
    //to list trainings
    router.get('/', function (request, response) {
        
        db.serialize(function () {
    
            db.all("SELECT * FROM "+TABLE, function(error, rows){
                if(error){
                    response.send(error);
                }else{
                    response.send(rows);
                }
            });
    
        });
    });

    //to edit a training
    router.put('/', function (request, response) {
        //console.log(request.body);
        db.serialize(function () {            
            db.run("UPDATE "+TABLE+" SET language='"+request.body.language+"',level='"+request.body.level+"',title='"+request.body.title+"',content='"+request.body.content+"' WHERE id="+request.body.id);
            response.send('Se actualizo la tabla '+TABLE +' con la información: ' + request.body.id + ', ' + request.body.language + ', ' + request.body.level + ', ' + request.body.title+', '+request.body.content);
        });

    });

    //to see a traning
    router.get('/:id', function (request, response) {
        let id = request.params.id;        
        db.serialize(function () {

            db.all("SELECT * FROM "+TABLE + " WHERE id="+id, function (error, rows) {
                if (error) {
                    response.send(error);
                } else {
                    response.send(rows[0]);
                }
            })            
        });
    });

    //to delete a training
    router.delete('/:id', function (request, response) {
        let id = request.params.id;        
        db.serialize(function () {

            db.all("DELETE FROM "+TABLE + " WHERE id="+id, function (error, rows) {
                if (error) {
                    response.send(error);
                } else {
                    response.send(rows);
                }
            })            
        });
    });

    return router;
}