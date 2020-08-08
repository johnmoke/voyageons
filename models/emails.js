let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// create a model for request
let emailSchema = new Schema({
    id: String,
    email: String,
    name: String,
    text: String,
    date: Date
});
// Create a class 
let Email = mongoose.model('Email', emailSchema, 'emails');

module.exports = { Email };