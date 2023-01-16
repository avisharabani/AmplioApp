const Vote = require('../models/Vote')
const Choice = require('../models/Choice')
const { StatusCodes } = require('http-status-codes')
const CustomErrors = require('../errors')

/**
 * this is a GET method function that getting all votes from database
 * @route /api/v1/votes
 * @response array of votes 
 */
const getAllVotes = async (req, res) => {
    const votes = await Vote.find({})

    if (!votes) {
        throw new CustomErrors.NotFoundError('there is no votes')
    }
    res.status(StatusCodes.OK).json({ count: votes.length, votes });
};

/**
 * this is a GET method function that return one vote by specific id
 * @route /api/v1/votes/:id
 * @response votes object
 */
const getSingleVote = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new CustomErrors.BadRequestError('please provide an vote id');
    }
    const vote = await Vote.findOne({ _id: id })

    if (!vote) {
        throw new CustomError.NotFoundError(`No vote with id : ${req.params.id}`);
    }
    res.status(StatusCodes.OK).json({ vote });
};

/**
 * this is a POST method function that creates new vote
 * @route /api/v1/votes
 * @param {string} userIp the ip of user created
 * @param {string} choiceId the choice text content
 * @response vote object
 */
const createVote = async (req, res) => {
    let { userIp, choiceId } = req.body;

    if (!choiceId) {
        throw new CustomErrors.BadRequestError('please provide userIp and choiceId');
    }
    if (!userIp) {
        userIp = req.ip;
        req.body.userIp = userIp;
    }

    const currentChoice = await Choice.findOne({ choiceId: choiceId });
    const oldVote = await Choice.aggregate(
        [{
            $match: {
                questionId: require('mongoose').Types.ObjectId(String(currentChoice.questionId))
            }
        }, {
            $lookup: {
                from: 'votes',
                localField: '_id',
                foreignField: 'choiceId',
                pipeline: [
                    { $match: { userIp: userIp } }
                ],
                as: 'oldVotes'
            }
        }, {
            $unwind: {
                path: '$oldVotes',
                preserveNullAndEmptyArrays: false
            }
        }, {
            $project: {
                contact: 1,
                oldVotes: 1
            }
        }]
    );

    console.log(oldVote.length)

    //if there is another choice by current user ip
    if (oldVote.length > 0) {
        const vote = await Vote.findOne({ _id: oldVote[0].oldVotes._id });
        await vote.remove();
    }

    const vote = await Vote.create(req.body);

    res.status(StatusCodes.CREATED).json({ vote });
};

/**
 * this is a DELETE method function that delete vote by specific id
 * @route /api/v1/votes/:id
 * @response message about success
 */
const deleteVote = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new CustomErrors.BadRequestError('please provide an vote id');
    }
    const vote = await Vote.findOne({ _id: id });
    if (!vote) {
        throw new CustomErrors.NotFoundError(`no vote with id: ${req.params.id}`);
    }

    await vote.remove();

    res.status(StatusCodes.OK).json({ msg: 'Success! vote removed.' });
};


module.exports = {
    createVote,
    getSingleVote,
    getAllVotes,
    deleteVote,
};