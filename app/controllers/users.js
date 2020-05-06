module.exports = function (db) {
    const express = require('express');
    const router = express.Router();
    const TABLE = 'users';

    //to create table
    router.get('/initialize',  function(request, response){
        db.serialize(function () {
            db.run('CREATE TABLE IF NOT EXISTS ' +TABLE+ ' (id INT, name TEXT, lastname TEXT, email TEXT, password TEXT, level TEXT)');        
            response.send('Users table has been created!');
        });
    });

    //to clean table
    router.get('/clean', function(request, response){
        db.serialize(function(){
            db.run('DROP TABLE IF EXISTS '+TABLE);
            response.send('Users table has been cleaned!');
        });
    });

    //to create a new user
    router.post('/', function(request, response){
        db.serialize(function(){
            db.run('INSERT INTO '+TABLE+' values ('
            +request.body.id+',"'
            +request.body.name+'","'
            +request.body.lastname+'","'
            +request.body.email+'","'
            +request.body.password+'","'
            +request.body.level+'")');        
            response.send('Se ha agregado el usuario: ' +request.body.id + ',' +request.body.name + ', '+request.body.lastname+ ', '+request.body.email+ ', '+request.body.password+', '+request.body.level);
        });
        
    });

    //to list users
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

    //to edit users
    router.put('/', function (request, response) {
        //console.log(request.body);
        db.serialize(function () {            
            db.run("UPDATE users SET name='"+request.body.name+"',lastname='"+request.body.lastname+"',email='"+request.body.email+"',password='"+request.body.password+"',level='"+request.body.level+"' WHERE id="+request.body.id);
            response.send('Se actualizo la tabla '+TABLE +' con la información: ' + request.body.id + ', ' + request.body.name + ', ' + request.body.lastname + ', ' + request.body.email+', '+request.body.password+', '+request.body.level);
        });

    });

    //to see an user
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

    //to delete a user
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