const Question = require('../models/Question')
const Vote = require('../models/Vote')
const { StatusCodes } = require('http-status-codes')
const CustomErrors = require('../errors')

/**
 * this is a GET method function that getting all questions from database
 * @route /api/v1/questions
 * @response array of questions 
 */
const getAllQuestions = async (req, res) => {
    const ip = req.ip;
    const questionsDocuments = await Question.find({}).populate('choices').populate('votes')

    var questions = questionsDocuments.map((model) => { return model.toObject(); })
    const userVotes = await Vote.find({ userIp: ip })
    console.log(userVotes);

    userVotes.forEach(vote => {
        const question = questions.find(question => {
            console.log('question id: ' + question.id + "===" + vote.questionId);
            return question.id.toString() === vote.questionId.toString()
        })

        if (question) {
            question.selectedChoice = {choiceId: vote.choiceId,voteId: vote.id};
            
            console.log('question found');
            console.log(question);

        } else {
            console.log(`question not found`);
        }
    })


    if (!questions) {
        throw new CustomErrors.NotFoundError('there is no questions')
    }
    console.log('all questions');
    console.log(questions);
    res.status(StatusCodes.OK).json({ count: questions.length, questions, userIp: ip });
};

/**
 * this is a GET method function that return one question by specific question id
 * @route /api/v1/questions/:id
 * @response question object with their choices
 */
const getSingleQuestion = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new CustomErrors.BadRequestError('please provide an id');
    }
    //const question = await Question.findOne({ _id: id }).populate('choices').populate('votes');

    const ip = req.ip;
    const questionDocument = await Question.findOne({ _id: id }).populate('choices').populate('votes');

    var question = questionDocument.toObject();
    const userVotes = await Vote.find({ userIp: ip })
    console.log(userVotes);

    userVotes.forEach(vote => {
            console.log('question id: ' + question.id + "===" + vote.questionId);
            if(question.id.toString() === vote.questionId.toString()){
                console.log('question vote found');
                question.selectedChoice = { choiceId: vote.choiceId, voteId: vote.id };
                console.log(question);
            } else {
                console.log(`question vote not found`);
            }
    })


    if (!question) {
        throw new CustomErrors.NotFoundError(`No question with id : ${req.params.id}`);
    }
    res.status(StatusCodes.OK).json({ question });
};

/**
 * this is a POST method function that creates new question
 * @route /api/v1/questions
 * @param {string} userIp the ip of user created
 * @param {string} contentText the question text content
 * @response question object
 */
const createQuestion = async (req, res) => {
    const { contentText } = req.body;
    if (!contentText) {
        throw new CustomErrors.BadRequestError('please provide contentText');
    }

    req.body.userIp = req.ip
    const question = await Question.create(req.body);

    res.status(StatusCodes.CREATED).json({ question });
};

/**
 * this is a DELETE method function that delete question by specific question id
 * @route /api/v1/questions/:id
 * @response message about success
 */
const deleteQuestion = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new CustomErrors.BadRequestError('please provide an id');
    }
    const question = await Question.findOne({ _id: id });
    if (!question) {
        throw new CustomErrors.NotFoundError(`no question with id: ${req.params.id}`);
    }

    await question.remove();

    res.status(StatusCodes.OK).json({ msg: 'Success! question removed.' });
};


module.exports = {
    createQuestion,
    getSingleQuestion,
    getAllQuestions,
    deleteQuestion,
};