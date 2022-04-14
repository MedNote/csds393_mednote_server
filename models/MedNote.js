const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MedNoteSchema = new Schema({
    uuid:{
        type: String
    },
    name:{
        first_name:{
            type: String
        },
        last_name:{
            type: String
        }
    },
    DOB: String,
    allergies: [{
        type: String
    }],
    medications: [{
        type: String
    }],
    immunizations: [{
        immunization:{
            type: String
        },
        date:{ 
            type: Date, 
            default: Date.now 
        }
    }], 
    visit_notes: [{
        note:{
            type: String
        },
        date:{ 
            type: Date, 
            default: Date.now 
        }
    }]
});

module.exports = mongoose.model('MedNote', MedNoteSchema)