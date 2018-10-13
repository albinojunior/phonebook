require('./database');    //MongoDB Connection

const User = require('./src/models/User');

const createUser = async function () {
    const find = await User.find({ email: 'albinojuniorv@gmail.com' });
    if (!find) {
        await User.create({
            name: 'Albino Júnior',
            email: 'albinojuniorv@gmail.com',
            access_code: 'S0FTPL4N_C0D3'
        });
    }
}

createUser();