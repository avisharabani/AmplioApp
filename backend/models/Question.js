const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema(
  {
    userIp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    contentText: {
      type: String,
      required: [true, 'Please provide question text'],
      minlength: [5, 'question can not be less than 5 characters'],
      maxlength: [10000, 'question can not be more than 10000 characters'],
    },
    numOfChoice: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

//set virtual field named "choices" to able to get info from other document
QuestionSchema.virtual('choices', {
  ref: 'Choice',        
  localField: '_id',      
  foreignField: 'questionId', 
  justOne: false,        
});

QuestionSchema.post('remove', async function () {
  await this.model('Choice').deleteMany({ question: this._id });
});

module.exports = mongoose.model('Question', QuestionSchema);




