const HeroesController = function(){
    const express = require('express');
    const router = express.Router();
    
    let heroes =[
        { id: 0, name: 'Spiderman' },
        { id: 1, name: 'Thor' },
        { id: 2, name: 'Iron Man' },
        { id: 3, name: 'Black Widow' },
        { id: 4, name: 'Dr strange' },
        { id: 5, name: 'Hulk' },
        { id: 6, name: 'Capitan America' },
    ]
    
    router.get('/heroes/:id', (request,response)=>{
        let id = request.params.id;
        let respuesta = heroes[id] == undefined ? {error: 'El heroe no existe'} : heroes[id];
        response.send(respuesta);
    });
    
   router.get('/heroes', (request,response)=>{

        response.send(heroes);
    });

    return router;
};
module.exports = HeroesController;