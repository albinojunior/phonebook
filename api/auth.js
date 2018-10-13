'use strict';
const service = require('./src/services/authService')();
const userService = require('./src/services/userService')();

module.exports = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (token) {
        try {
            const decoded = service.decodeToken(token);
            await userService.findWhere({email: decoded.email});
            next();
        } catch (err) {
            res.status(401)
            .send({
                message: err.message,
                error: true
            });
        }
    } else {
        res.status(401).send({
            message: 'unauthenticated',
            error: true
        });
    }
};
