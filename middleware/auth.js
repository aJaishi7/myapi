const User = require('../entity/auth');
const jwt = require('jsonwebtoken');

module.exports.userAuthentication = (req, res, next) => {
    if (typeof req.headers.authorization != 'string') {
      return   res.status(400).json({message: 'Token is not a valid type: required string'});
    }
    // console.log(req.headers.authorization);
    const token_bearer = req.headers.authorization.split("Bearer ");
    const token = token_bearer[1];
    // console.log(token);
    const data = jwt.verify(token, 'pk');
    try {
        User.findOne({_id: data.tokenId}).then((data) => {
            req.user = data;
            console.log(req.user);
            next();
        })
    } catch (e) {
        res.status(400).json({success: false, message: "Auth failed"});
    }
}