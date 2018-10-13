'use strict';
const Contact = require('../models/Contact');

const ContactService = function () {

    const all = async function (options, user_email) {
        const sortBy = options.sort === 'asc' ? `+${options.order}` : `-${options.order}`;
        const search = new RegExp(options.search, 'i');
        const aggregate = Contact.aggregate().match({
            $or: [
                { name: search },
                { email: search },
                { phone: search },
                { company: search },
                { position: search }
            ], user_email: user_email
        });
        return await Contact.aggregatePaginate(aggregate, 
            { sortBy, limit: options.limit, page: options.page });
    }

    const find = async function (id) {
        const contact = await Contact.findOne({_id: id});
        if(!contact) throw new Error('Contato não encontrado!');
        return contact;
    }

    const create = async function (data, user_email) {
        const created = await Contact.create({
            name:     data.name,
            email:    data.email,
            phone:    data.phone,
            company:  data.company,
            position: data.position,
            user_email
        });
        if (!created) throw new Error('Erro ao tentar salvar contato!');
        return created;
    }

    const update = async function (data, id) {
        const updated = await Contact.update({_id: id}, data);
        if(updated.nModified == 0) throw new Error('Erro ao tentar atualizar contato!');
        return updated;
    }

    const remove = async function (id) {
        const deleted = await Contact.remove({_id: id});
        if(deleted.result) throw new Error('Erro ao tentar excluir contato!');
        return deleted;
    }

    return {
        all,
        find,
        create,
        update,
        remove
    }
}

module.exports = ContactService;