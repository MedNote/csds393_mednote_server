const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SymmetricKeySchema = new Schema({
    uuid:{
        type: String
    },
    symmetric_key:{
        type: String
    }
});

module.exports = mongoose.model('SymmetricKey', SymmetricKeySchema)