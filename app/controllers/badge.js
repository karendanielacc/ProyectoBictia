module.exports = function(db){
    const express = require('express');
    const router = express.Router();
    const TABLE = "badge";

    //{{SERVER}}/badge/create_badge
    router.get('/initialize', function(request, response){
        db.serialize(function(){
            db.run("CREATE TABLE IF NOT EXISTS "+TABLE+" (id_badge TEXT, name_badge TEXT, desc_badge TEXT, image_badge TEXT)");
            response.send("Inicializada");
        });
    });

    //{{SERVER}}/badge/delete_badge
    router.get('/clean', function(request, response){
        db.serialize(function(){
            db.run("DROP TABLE IF EXISTS "+TABLE);
            response.send("Tabla insignias eliminada");
        });
    });
    
    //{{SERVER}}/badge/insert_badge
    router.post('/insert', function(request, response){
        db.serialize(function(){
            db.run("INSERT INTO "+TABLE+" VALUES ('"+
            request.body.id_badge+"', '"+
            request.body.name_badge+"', '"+
            request.body.desc_badge+"', '"+
            request.body.image_badge            
            +"')");
            response.send("Insignia insertada: "+request.body.name_badge);
        });
    });
    
    //{{SERVER}}/badge/insert_badge
    router.put('/update', function(request, response){
        db.serialize(function(){
            db.run("UPDATE "+TABLE+" SET name_badge = '"+request.body.name_badge+"', desc_badge='"+
            request.body.desc_badge+"', image_badge='"+request.body.image_badge+"' WHERE id_badge = '"+
            request.body.id_badge            
            +"'");
            response.send("Insignia editada: "+request.body.name_badge);
        });
    });

    //{{SERVER}}/badge/list_badge
    router.get('/list', function(request, response){
        db.serialize(function(){
            db.all("SELECT * FROM "+TABLE, function(error, rows){
                if(error){
                    response.send(error);
                }else{
                    response.send(rows);
                }
            });
        });
    });

    //{{SERVER}}/badge/list_badge
    router.get('/:id', function(request, response){
        let id = request.params.id;
        db.serialize(function(){
            db.all("SELECT * FROM "+TABLE+" WHERE id_badge = '"+id+"'", function(error, rows){
                if(error){
                    response.send(error);
                }else{
                    response.send(rows);
                }
            });
        });
    });

    //{{SERVER}}/badge/list_badge
    router.delete('/:id', function(request, response){
        let id = request.params.id;
        db.serialize(function(){
            db.all("DELETE FROM "+TABLE+" WHERE id_badge = '"+id+"'", function(error, rows){
                if(error){
                    response.send(error);
                }else{
                    response.send(rows);
                }
            });
        });
    });


    return router;
}