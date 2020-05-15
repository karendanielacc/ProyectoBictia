const General = function () {

    General.defaultDatabase = 'sqlite';

    if (typeof General.firebase == 'undefined') {
        const admin = require("firebase-admin");
        const serviceAccount = require("../../private/key.json");
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            GeneralURL: "https://proyecto-bictia.firebaseio.com"
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
        const url = 'mongodb://localhost:27017';
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

    return this;
};
module.exports = General;