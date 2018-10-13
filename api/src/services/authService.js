'use strict';

//Loading config
require("dotenv").load();

const jwt       = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

const AuthService = function () {

    const decodeToken = function (token) {
        token = token.replace(/Bearer/, '').trim();
        let decoded = jwt.decode(token, secretKey);

        if (decoded.exp <= Date.now()) {
            throw new Error('Acesso Expirado, faça login novamente');
        }

        return decoded;
    }

    const generateToken = function (user) {
        const date = new Date();
        const token = jwt.sign({ email: user.email, exp: new Date().setHours(date.getHours() + 1) }, secretKey);

        return {
            access_token: token,
            expires_in: new Date().setHours(date.getHours() + 1),
        }
    }

    return {
        decodeToken,
        generateToken
    }
}

module.exports = AuthService;