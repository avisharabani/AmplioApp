const mongoose = require('mongoose')

const VoteSchema = new mongoose.Schema({
    userIp: {
        type: String,
        required: true,
    },
    choiceId: {
        type: mongoose.Types.ObjectId,
        ref: 'Choice',
        required: true,
    },

}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
VoteSchema.index({ userIp: "text", choiceId: 1 }, { unique: true });

VoteSchema.statics.calculateRating = async function (choiceId) {
    const result = await this.aggregate([
        { $match: { choiceId: choiceId } },
        {
            $group: {
                _id: null,
                numOfVotes: { $sum: 1 },
            },
        },
    ]);

    try {
        await this.model('Choice').findOneAndUpdate(
            { _id: choiceId },
            {
                numOfVotes: result[0]?.numOfVotes || 0,
            }
        );
    } catch (error) {
        console.log(error);
    }
};
VoteSchema.post('save', async function () {
    await this.constructor.calculateRating(this.choiceId);
});

VoteSchema.post('remove', async function () {
    await this.constructor.calculateRating(this.choiceId);
});

module.exports = mongoose.model('Vote', VoteSchema);