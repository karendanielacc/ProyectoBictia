const config = require('../../config.json');
const General = function () {

    const jwt = require('jsonwebtoken');

    General.defaultDatabase = config.database.default;

    if (typeof General.firebase == 'undefined') {
        const admin = require("firebase-admin");
        const serviceAccount = require("../../private/key.json");
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            GeneralURL: config.database.firebase.url
        });
        //const firestore = admin.firestore();

        General.firebase = admin;
    }

    if (typeof General.sqlite == 'undefined') {
        const sqlite3 = require('sqlite3').verbose();
        General.sqlite = new sqlite3.Database('./db/db.bictia');
    }

    if (typeof General.mongoDB == 'undefined') {
        const mongodbClient = require('mongodb').MongoClient;
        const url = config.database.mongodb.url;
        General.mongoDB = {client:mongodbClient, url:url};
    }


    this.getFirebase = function () {
        return General.firebase;
    };

    this.getSQLite = function () {
        return General.sqlite;

    };

    this.getMongoDB = function () {
        return General.mongoDB;
    };

    this.getDatabaseModel = function(){
        let model='';
        switch (General.defaultDatabase) {
            case 'mongodb':
                console.log("entra a mongo");
                model = require("../models/mongodb_model")(General.mongoDB.client, General.mongoDB.url);
                break;
            case 'firestore':
                console.log("entra a firestore");
                model = require('../models/firestore_model')(General.firebase.firestore());
                break;
            case 'sqlite':
                console.log("entra a sqlite");
                model = require('../models/sqlite_model')(General.sqlite);
                break;
            default:
                console.log("entra a default");
                model = require('../models/sqlite_model')(General.sqlite);
                break;
        }
        return model;
    };

    this.setDefaultDatabase = function(database){
        General.defaultDatabase = database;
    };


    this.validateLogin=function(request){
        let result = {
            auth:false,
            message:'Initial value'
        };

        let token = request.headers['auth-jwt'];

        if(token){
            jwt.verify(token, config.jwt.secreto, function(error, decoded){
                if(error){
                    result.auth=false;
                    if(typeof error == 'TokenExpiredError'){
                        result.message='El token no es válido, expiró en la fecha '+error.expiredAt;
                    }else{
                        result.message='El token no es válido';
                    }
                }else{
                    result.auth = true;
                    result.message = decoded;
                }
            })
        }else{
            result.auth=false;
            result.message = 'No se ha enviado ningún token';
        }

        return result;
    }

    return this;
};
module.exports = General;