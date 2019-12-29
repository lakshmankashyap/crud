var mongoose = require('mongoose');

// define the schema for userwallet
var StudentSchema = new mongoose.Schema({

    "fullname": {
        type: String,
        trim : true
    },
    "email" : {
        type: String,
        trim : true
    },    
    "age" : {
        type: Number,
    },
    "gender" : {
        type: String,
    },
    "motherName": {
        type: String,
        trim : true
    },
    "fatherName": {
        type: String,
        trim : true
    },
    "class" : {
        type : String,
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Student', StudentSchema);