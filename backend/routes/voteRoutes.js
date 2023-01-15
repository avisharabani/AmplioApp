const express = require('express');
const router = express.Router();
const {
    createVote,
    getSingleVote,
    getAllVotes,
    deleteVote,
} = require('../controllers/voteController');

router.route('/').get(getAllVotes)
    .post(createVote,
);
router.route('/:id')
    .get(getSingleVote)
    .delete(deleteVote)

module.exports = router;


