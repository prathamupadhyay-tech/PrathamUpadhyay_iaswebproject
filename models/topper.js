import mongoose from "mongoose";

const topperSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rank: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  gs1marks: {
    type: Number,
    required: true,
  },

  gs2marks: {
    type: Number,
    required: true,
  },

  gs3marks: {
    type: Number,
    required: true,
  },

  gs4marks: {
    type: Number,
    required: true,
  },
  essayMarks: {
    type: Number,
    required: true,
  },
  prelimsScoreGs: {
    type: Number,
  },
  prelimsScoreCsat: {
    type: Number,
  },
  optionalSub: {
    type: String,
    required: true,
  },
  optional1Marks: {
    type: Number,
    required: true,
  },
  optional2Marks: {
    type: Number,
    required: true,
  },
  Remarks: {
    type: String,
  },
  interviewMarks: {
    type: String,
    required: true,
  },
  writtenMarks: {
    type: Number,
    required: true,
  },
  Answers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Answer",
    },
  ],
  ProfileImage: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});
mongoose.models = {};
export default mongoose.model("Topper", topperSchema);
