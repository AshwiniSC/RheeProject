import jwt from 'jsonwebtoken';
import Config from '../../config/config';

module.exports = (req, res, next) => {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['authorization'];
  // decode token
  if (token) {
   // verifies secret and checks exp
    jwt.verify(token, 'superSecret', function(err, decoded) {      
     if (err) {
       return res.json({ success: false, message: 'Failed to authenticate token.' });    
     } else {
       // if everything is good, save to request for use in other routes
       req.decoded = decoded;    
       next();
     }
    });
  }
  else {
    return res.json({ success: false, message: 'Unauthorized Access' });    
  }
}