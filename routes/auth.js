const router = require('express').Router();

const {register, findMe, findUs, removeMe, updateMe} = require('../controller/auth');
router.post('/register', register);


module.exports = router;