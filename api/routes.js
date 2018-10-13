'use strict';

//auth middleware
const auth = require('./auth');

//routes
const authRoutes     = require('./routes/auth');
const contactsRoutes = require('./routes/contacts');

module.exports = function (app) {

    app.use('/auth', authRoutes);
    app.use('/contacts', auth, contactsRoutes);

    app.use('/', (req, res) => {
        res.send('Welcome to API Phonebook');
    });
};
