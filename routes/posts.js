let Post = require('../models/posts').Post;
let uniqid = require('uniqid');
let express = require('express');
// This line will help to redirect the request from one file to the other 
let router = express.Router(); 
let authMiddleware = require('../middleware/auth');

// Client makes a get request to server and the server request the database  (backend)
// Get request that will be made
router.get('/', async (req, resp) => {
    let posts = await Post.find();
     resp.send(posts);
 })

// Create a route for the edit post , this is a get request to the path /posts/:id
router.get('/:id', async (req, resp) => {
    let id = req.params.id;
    let post = await Post.findOne({id: id});
     resp.send(post);
 })

 // Create a route for the post request
 router.post('/', authMiddleware, async (req, resp) => {
     // get info from the body of the post reques
     let reqBody = req.body;
     // The path imgPath will be created when we upload an image
     let  imgPath;
     if(reqBody.imageURL){
         imgPath = reqBody.imageURL;
     } else {
         imgPath = req.file.path.substring(req.file.path.indexOf('/'), req.file.path.length);
     }
     // To create a new post
     let newPost = new Post({
         id: uniqid(),
         title:reqBody.title,
         date: new Date(),
         description: reqBody.description,
         text: reqBody.text,
         country: reqBody.country,
         imageURL: imgPath
     })
     // save the post to the database
     await newPost.save();
     resp.send('Created');
  })
 
 //  Delete post request route
 router.delete('/:id', authMiddleware, async (req, resp) =>{
     // get the id of the post to be deleted
     let id = req.params.id;
     await Post.deleteOne({id: id});
     resp.send('Deleted!');
 })

// to update the post
router.put('/:id', authMiddleware, async (req, resp) => {
    let id = req.params.id;
    await Post.updateOne({id: id}, req.body);
    resp.send('Updated!');
})
 
//  Export the module to other file
module.exports = router;