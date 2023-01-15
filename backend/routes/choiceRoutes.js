const express = require('express');
const router = express.Router();
const {
    createChoice,
    getSingleChoice,
    getAllChoices,
    deleteChoice,
} = require('../controllers/choiceController');

router.route('/')
    .get(getAllChoices)
    .post(createChoice);

router.route('/:id')
    .get(getSingleChoice)
    .delete(deleteChoice)

module.exports = router;


