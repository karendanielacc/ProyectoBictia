const ConsoleController= function(){
    const express = require('express');
    const router = express.Router();
    const r = require('request');

    router.post('/', (request,response)=>{

        var program = request.body;

            r({
                url: 'https://api.jdoodle.com/v1/execute',
                method: "POST",
                json: program
            },
            function (error, response, body) {
                console.log('error:', error);
                console.log('statusCode:', response && response.statusCode);
                console.log('body:', body);
                
            }).pipe(response);
    });

    return router;

};


module.exports = ConsoleController;