const router = require('express').Router();

const {register, findMe, findUs, removeMe, updateMe} = require('../controller/auth');


module.exports = router;