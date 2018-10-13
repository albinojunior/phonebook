require('./database');    //MongoDB Connection

const User = require('./src/models/User');

const createUser = async function () {
    try {
        await User.create({
            name: 'Albino Júnior',
            email: 'albinojuniorv@gmail.com',
            access_code: 'S0FTPL4N_C0D3'
        });
    } catch(err) {
        console.log('Usuário já foi cadastrado!');
    }
}

createUser();