'use strict';
const service = require('../services/contactService')();
const userService = require('../services/userService')();

const ContactsController = function () {

    const list = async function (req, res) {
        try {
            const options = filterOptions(req.query);
            const user = userService.getUserByToken(req.headers['authorization']);
            res.send(await service.all(options, user));
        } catch (err) {
            res.status(400)
                .send({
                    message: "Erro ao consultar lista de contatos!",
                    error: true
                });
        }
    }

    const find = async function (req, res) {
        try {
            res.send(await service.find(req.params.id));
        } catch (err) {
            res.status(400).send({ message: "Contato não encontrado!", error: true });
        }
    }

    const create = async function (req, res) {
        try {
            const user = userService.getUserByToken(req.headers['authorization']);
            res.status(201).send(await service.create(req.body, user))
        } catch (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                err.message = 'Contato já cadastrado!';
            }

            res.status(400)
                .send({
                    message: err.message,
                    error: true
                });
        }
    }

    const update = async function (req, res) {
        try {
            await service.update(req.body, req.params.id);
            res.send({
                message: 'Contato atualizado com sucesso!',
                error: false
            });
        } catch (err) {
            res.status(400)
                .send({
                    message: err.message,
                    error: true
                });
        }
    }

    const remove = async function (req, res) {
        try {
            await service.remove(req.params.id);
            res.status(200)
                .send({
                    message: 'Contato excluído com sucesso!',
                    error: false
                });
        } catch (err) {
            res.status(400)
                .send({
                    message: err.message,
                    error: true
                });
        }
    }

    const filterOptions = function (params) {
        const OPTIONS = { limit: 15, sort: 'asc', order: 'name', search: '', page: 1 };

        Object.keys(params)
            .forEach((value) => {
                if (OPTIONS.hasOwnProperty(value)) {
                    OPTIONS[value] = params[value];
                }
            });

        return OPTIONS;
    }

    return {
        list,
        find,
        create,
        update,
        remove
    }
}

module.exports = ContactsController;