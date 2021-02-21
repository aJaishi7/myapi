const router = require('express').Router();

const {register, findMe, findUs, removeMe, updateMe} = require('../controller/auth');

router.post('/register', register);
router.get('/findMe/:id', findMe);
router.get('/findUs', findUs);
router.delete('/removeMe/:id', removeMe);



module.exports = router;