const mongoose = require('mongoose');

const ChoiceSchema = mongoose.Schema(
    {
        questionId: {
            type: mongoose.Types.ObjectId,
            ref: 'Question',
            required: true,
        },
        contentText: {
            type: String,
            required: [true, 'Please provide choice text'],
            minlength: [5, 'choice can not be less than 5 characters'],
            maxlength: [10000, 'choice can not be more than 500 characters'],
        },
        numOfVotes: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

ChoiceSchema.virtual('votes', {
    ref: 'Vote',
    localField: '_id',
    foreignField: 'choiceId',
    justOne: false,
});

ChoiceSchema.index({ questionId: 1, contentText: "text" }, { unique: true });

ChoiceSchema.statics.calculateChoices = async function (questionId) {
    const result = await this.aggregate([
        { $match: { questionId: questionId } },
        {
            $group: {
                _id: null,
                numOfChoice: { $sum: 1 },
            },
        },
    ]);

    try {
        await this.model('Question').findOneAndUpdate(
            { _id: questionId },
            {
                numOfChoice: result[0]?.numOfChoice || 0,
            }
        );
    } catch (error) {
        console.log(error);
    }
};

ChoiceSchema.post('save', async function () {
    await this.constructor.calculateChoices(this.questionId);
});

ChoiceSchema.post('remove', async function () {
    await this.constructor.calculateChoices(this.questionId);
    await this.model('Vote').deleteMany({ choice: this._id });
});


module.exports = mongoose.model('Choice', ChoiceSchema);
