const router = require('express').Router();
const auth = require('../middleware/auth');

const {register, findMe, findUs, findDoctor, removeMe, updateMe, letMeLogin, logout} = require('../controller/auth');

router.post('/register', register);
router.get('/findMe', auth.userAuthentication, findMe);
router.get('/findUs', findUs);
router.get('/findDoctor', auth.userAuthentication, findDoctor);
router.delete('/removeMe/:id', removeMe);
router.put('/updateMe/:id', auth.userAuthentication, updateMe);
router.post('/letMeLogin', letMeLogin);
router.get('/logout', auth.userAuthentication, logout);

module.exports = router;