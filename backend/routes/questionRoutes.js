const express = require('express');
const router = express.Router();
const {
    createQuestion,
    getSingleQuestion,
    getAllQuestions,
    deleteQuestion,
} = require('../controllers/questionController');

router.route('/').get(getAllQuestions)
    .post(createQuestion);
router.route('/:id')
    .get(getSingleQuestion)
    .delete(deleteQuestion)

module.exports = router;


