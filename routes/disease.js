const router = require('express').Router();
const auth = require('../middleware/auth');

const {addDisease, findDisease, updateDisease, deleteDisease, findDiseaseByName} = require('../controller/disease');
router.route('/')
    .post('/addDisease', addDisease)


module.exports = router;