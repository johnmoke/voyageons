let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// create a model for request
let callbackRequestSchema = new Schema({
    id: String,
    phoneNumber: String,
    date: Date
});
// Create a class 
let CallbackRequest = mongoose.model('CallbackRequest', callbackRequestSchema, 'callback-requests');

module.exports = { CallbackRequest };