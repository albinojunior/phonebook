'use strict';

const User = require('../models/User');
const authService = require('./authService')();

const UserService = function () {

    const findWhere = async function (conditions) {
        return await User.findOne(conditions);
    }

    const getUserByToken = function (token) {
        let decoded = authService.decodeToken(token);
        return decoded.email;
    }

    return {
        findWhere,
        getUserByToken
    }
}

module.exports = UserService;