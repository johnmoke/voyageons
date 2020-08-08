let auth = require('../controllers/auth');
// let auth = require('./controllers/auth');

function checkAuth(req, resp, next){
    let token = req.cookies['auth_token'];
    if(token && auth.checkToken(token)){
    next(); 
  } else {
      resp.status(400);
      resp.send('Are you lost Bhuti!');
      resp.send('Get back!');
    }

}

module.exports = checkAuth;