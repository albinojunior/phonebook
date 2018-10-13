const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    access_code: {
        type: String,
        required: true
    },
}, {collection: 'users'});

module.exports = mongoose.model('users', userSchema);