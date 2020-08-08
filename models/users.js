let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//Create schema for posts
let userSchema = new Schema({
    email: String,
    password: String
});
// Create a model based on the schema 
let User = mongoose.model('User', userSchema, 'users');

module.exports = { User }