const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let myBooks = new Schema({
  
    book_name: {
        type: String
    },
    book_description: {
        type: String
    },
    rental_price: {
        type: Number
    },
    owner_id: {
        type: String
    },
    availablity: {
        type: Boolean
    }
});

module.exports = mongoose.model('myBooks', myBooks);