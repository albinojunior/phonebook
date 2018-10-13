const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-aggregate-paginate');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: false
    },
    position: {
        type: String,
        required: false
    },
    user_email: {
        type: String,
        required: true
    }
}, { collection: 'contacts' });

contactSchema.index({ user_email: 1, email: 1 }, { unique: true })
contactSchema.index({ user_email: 1, phone: 1 }, { unique: true })
contactSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('contacts', contactSchema);