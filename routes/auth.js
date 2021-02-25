const router = require('express').Router();
const auth = require('../middleware/auth');

const {register, findMe, findUs, removeMe, updateMe, letMeLogin, logout} = require('../controller/auth');

router.post('/register', register);
router.get('/findMe', auth.userAuthentication, findMe);
router.get('/findUs', findUs);
router.delete('/removeMe/:id', removeMe);
router.put('/updateMe', auth.userAuthentication,updateMe);
router.post('/letMeLogin', letMeLogin);
router.get('/logout',auth.userAuthentication,logout);

module.exports = router;