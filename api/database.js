'use strict';

const mongoose = require('mongoose');
const Promise  = require('bluebird');

//Loading config
require('dotenv').load();

//Mongo config
let mongoConfig = {
   host:     process.env.MONGODB_HOST,
   port:     process.env.MONGODB_PORT,
   database: process.env.MONGODB_DATABASE
};

mongoose.Promise = Promise;

let options = {
    useMongoClient: true
};

let connection = mongoose.connect(`mongodb://${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.database}`, options)
    .then(() => {
        console.log('Database connection open!');
    })
    .catch(err => {
        console.log(err);
        console.log('Database connection error!');
    });


module.exports = connection;