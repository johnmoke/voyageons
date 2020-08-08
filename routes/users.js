let User = require('../models/users').User;
let express = require('express');
let router = express.Router(); 
let bcrypt = require('bcrypt');
let auth = require('../controllers/auth');

// Create a route for checking weither the user is already in the database Login 
// when the post request is made on the route
router.post('/login', async  (req, resp) => {
    // read the email and the password from the user
    let email = req.body.email;
    let password = req.body.password;
    // search for the user in the database
    let user = await User.find().where({email: email});
    // Ckeck weigther the user is not empty , if it is not empty them the user was found in the database
    if(user.length > 0){
        // Compare the password that is being typed and the one that is in the db
         let comparisonResult = await bcrypt.compare(password, user[0].password);
        // Then the message has to be displayed
        if(comparisonResult){
            let token = auth.generateToken(user[0]);
            resp.cookie('auth_token', token);
            resp.send({
                redirectURL: '/admin'
            });
        } else {
            resp.status(400);
            resp.send('Rejected');
        }
    } else {
        resp.status(400);
        resp.send('rejected');
    }
})

// Create a route for adding user to the database registration point 
router.post('/register', async  (req, resp) => {
    // read the email and the password from the user
    let email = req.body.email;
    let password = req.body.password;
    // check if this email has not been used by someone else
    let user = await User.find().where({email: email});
//    If the email has not been used by someone else, then we add this email to the database
    if(user.length == 0){
        let encryptedPass = await bcrypt.hash(password, 12);
        let newUser = new User({
            email: email,
            password: encryptedPass
        })
        await newUser.save();
        resp.send('Done');
    } else {
        resp.send('Rejected');
    }
})

module.exports = router;