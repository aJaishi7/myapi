const router = require('express').Router();
const auth = require('../middleware/auth');

const {addDisease, findDisease, updateDisease, deleteDisease, findDiseaseByName} = require('../controller/disease');
router
    .post('/addDisease', auth.userAuthentication, addDisease)
    .get('/findDisease', auth.userAuthentication, findDisease)
    .get('/findDiseaseByName', auth.userAuthentication, findDiseaseByName)
    .put('/updateDisease/:id', auth.userAuthentication, updateDisease)
    .delete('/deleteDisease/:id', auth.userAuthentication, deleteDisease)


module.exports = router;