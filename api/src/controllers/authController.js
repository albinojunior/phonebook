'use strict';

//services
const service     = require('../services/authService')();
const userService = require('../services/userService')();

const AuthController = function () {

    const authenticate = async function (req, res) {
        try {
            if (req.body.hasOwnProperty('access_code')) {
                const { access_code } = req.body;
                const user = await userService.findWhere({ access_code: access_code });
                if (!user) throw new Error('Código de acesso inválido!');
                res.send(service.generateToken(user));
            } else {
                throw new Error('Código de acesso obrigatório!');
            }
        } catch (err) {
            res.status(400)
            .send({
                message: err.message,
                error: true
            });
        }
    }

    const getUserAuthenticated = async function (req, res) {
        const token = req.headers['authorization'];
        try {
            const decoded = service.decodeToken(token);
            const user = await userService.findWhere({ email: decoded.email });
            res.send(user);
        } catch (err) {
            res.status(401)
            .send({
                message: err.message,
                error: true
            });
        }
    }

    return {
        authenticate,
        getUserAuthenticated
    }
}

module.exports = AuthController;