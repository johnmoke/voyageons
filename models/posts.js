let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//Create schema for posts
let postSchema = new Schema({
    id: String,
    title: String,
    date: Date,
    description:String,
    text:String,
    country:String,
    imageURL: String
});
// Convert the schema into a class 
let Post = mongoose.model('Post', postSchema);

module.exports = { Post }