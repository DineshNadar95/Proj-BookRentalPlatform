const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let myUser = new Schema({
    
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    email: {
        type: String
    },
    phone_number: {
        type: Number
    },
    special_id: {
        type: String
    },
    books_available: {
        type: Array
    },
    rented: {
        type:Array
    },
    profile_pic:{
        type:String
    }
});

module.exports = mongoose.model('myUser', myUser);