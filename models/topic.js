import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  subTopic: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subtopic",
    },
  ],
});

mongoose.models = {};
export default mongoose.model("Topic", topicSchema);
