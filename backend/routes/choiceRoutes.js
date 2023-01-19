const express = require('express');
const router = express.Router();
const {
    createChoice,
    createChoices,
    getSingleChoice,
    getAllChoices,
    deleteChoice,
} = require('../controllers/choiceController');

router.route('/')
    .get(getAllChoices)
    .post(createChoice); 
router.route('/many')
    .post(createChoices); 

router.route('/:id')
    .get(getSingleChoice)
    .delete(deleteChoice)

module.exports = router;


