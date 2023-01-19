const Choice = require('../models/Choice')
const { StatusCodes } = require('http-status-codes')
const CustomErrors = require('../errors')

/**
 * this is a GET method function that getting all choices from database
 * @route /api/v1/choices
 * @response array of choices 
 */
const getAllChoices = async (req, res) => {
    const choices = await Choice.find({}).populate('votes')

    if (!choices) {
        throw new CustomErrors.NotFoundError('there is no choices')
    }
    res.status(StatusCodes.OK).json({ count: choices.length, choices });
};

/**
 * this is a GET method function that return one choice by specific choice id
 * @route /api/v1/choices/:id
 * @response choices object with their votes
 */
const getSingleChoice = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new CustomErrors.BadRequestError('please provide an id');
    }
    const choice = await Choice.findOne({ _id: id }).populate('votes')
        
    if (!choice) {
        throw new CustomError.NotFoundError(`No choice with id : ${req.params.id}`);
    }
    res.status(StatusCodes.OK).json({ choice });
};

/**
 * this is a POST method function that creates new choice
 * @route /api/v1/choices
 * @param {string} questionId the id of question connected to this choice
 * @param {string} contentText the choice text content
 * @response choice object
 */
const createChoice = async (req, res) => {
    const { questionId, contentText } = req.body;

    if (!questionId || !contentText) {
        throw new CustomErrors.BadRequestError('please provide question id and content text');
    }
    
    const choice = await Choice.create(req.body);

    res.status(StatusCodes.CREATED).json({ choice });

};

const createChoices = async (req, res) => {
    const { choicesCollection } = req.body;
    console.log(choicesCollection);

    if (!choicesCollection) {
        throw new CustomErrors.BadRequestError('please provide choicesCollection of[ {questionId, contentText} ]');
    }
    
    choicesCollection.forEach(element => {
            const { questionId, contentText } = element;
            if (!questionId || !contentText) {
                throw new CustomErrors.BadRequestError('please provide question id and content text');
            }
        })
        
    const choicesDocuments = await Choice.create(choicesCollection);
    var choices = choicesDocuments.map((model) => { return model.toObject(); })

    choices.forEach((choice) => {
        choice.votes = [];
    })

    res.status(StatusCodes.CREATED).json({ choices });

};


/**
 * this is a DELETE method function that delete choice by specific id
 * @route /api/v1/choices/:id
 * @response message about success
 */
const deleteChoice = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new CustomErrors.BadRequestError('please provide an id');
    }
    const choice = await Choice.findOne({ _id: id });
    if (!choice) {
        throw new CustomErrors.NotFoundError(`no choice with id: ${req.params.id}`);
    }

    await choice.remove();

    res.status(StatusCodes.OK).json({ msg: 'Success! choice removed.' });
};


module.exports = {
    createChoice,
    createChoices,
    getSingleChoice,
    getAllChoices,
    deleteChoice,
};