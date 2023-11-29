import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  testCode: {
    type: String,
    required: true,
  },
  questionNumber: {
    type: Number,
    required: true,
  },
  questionText: {
    type: String,
    required: true,
  },
  answerText: {
    type: String,
    required: true,
  },
  answerImages: [
    {
      type: String,
    },
  ],
  writtenBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Topper",
    required: true,
  },
  paper: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Paper",
    required: true,
  },

});
mongoose.models = {};
export default mongoose.model("Answer", answerSchema);
