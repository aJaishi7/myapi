const router = require('express').Router();
const {register} = require('../controller/auth');
router.post('/register',register);




module.exports=router;