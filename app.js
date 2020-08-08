let express = require('express');
let app = express();
let mongoose = require('mongoose');
let multer = require('multer');
let cookieParser = require('cookie-parser');
let postsRouter = require('./routes/posts');
let callbackRequestsRouter = require('./routes/callback-requests');
let EmailRouter = require('./routes/emails');
let Post = require('./models/posts').Post;
let usersRouter = require('./routes/users');
let auth = require('./controllers/auth');
// Passons2020
// PassonsNow
//  Specify that we are goingto use ejs
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/travels', { useUnifiedTopology: true , useNewUrlParser: true});
// convert the data that are being sent te the server in json format
app.use(express.json());
let imageStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/images'),
    filename: (req, file, cb) => cb(null, file.originalname),
})
app.use(multer({storage: imageStorage}).single('imageFile'));

// Specify that when the user request the route path which start with /posts, it has to be redirected to the file posts.js
app.use(express.static('public'));
app.use(cookieParser());
// this tells the app the beginning of the route /posts and the end is in the file posts.js 
app.use('/posts', postsRouter);
app.use('/callback-requests', callbackRequestsRouter);
app.use('/emails', EmailRouter);
app.use('/users', usersRouter);

app.get('/sight', async (req, resp) => {
    // we need to read the query parameter id
    let id = req.query.id;
    let post = await Post.findOne({id: id})
    //when a get request is made an html file has to be generated based on the file sight.ejs whic is the template
    resp.render('sight', {
        title: post.title,
        imageURL: post.imageURL,
        date: post.date,
        text: post.text
    })
})
// this variable us to used for every user , let us change this 
// let isLoggedIn = false; 
app.get('/admin', (req, resp) => {
    //  To read the cookie
    let token = req.cookies['auth_token'];
    if(token && auth.checkToken(token)){
        resp.render('admin');
    } else {
        resp.redirect('/login');
    }
 
})

app.get('/login', (req, resp) => {
    resp.render('login');
})
app.listen(3000, () => console.log('Listerning 3000 ...'));

