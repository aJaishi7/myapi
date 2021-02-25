const router = require('express').Router();
const auth = require('../middleware/auth');

const {addDisease, findDisease, updateDisease, deleteDisease, findDiseaseByName} = require('../controller/disease');
router.route('/')
    .post('/addDisease', addDisease)
    .get('/findDisease', findDisease)
    .get('findDiseaseByName', findDiseaseByName)
    .put('updateDisease', updateDisease)
    .delete('deleteDisease', deleteDisease)


module.exports = router;