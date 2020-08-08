let CallbackRequest = require('../models/callback-requests').CallbackRequest;
let uniqid = require('uniqid');
let express = require('express');
// This line will help to redirect the request from one file to the other 
let router = express.Router(); 
let authMiddleware = require('../middleware/auth');

// three routes needed 

router.get('/', authMiddleware, async (req, resp) => {
    // search all callbackrequests in the database
    resp.send(await CallbackRequest.find());
});
router.post('/', async (req, resp) => {
    let reqBody = req.body;
    let newRequest = new CallbackRequest({
       id: uniqid(),
       phoneNumber: reqBody.phoneNumber,
       date: new Date()
    })
    await newRequest.save()
    resp.send('Accepted');
});
router.delete('/:id', authMiddleware ,async (req, resp) => {
    await CallbackRequest.deleteOne({id: req.params.id});
    resp.send('Deleted');
});

module.exports = router;