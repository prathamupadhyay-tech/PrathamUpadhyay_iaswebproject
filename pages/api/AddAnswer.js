import Answer from "@/models/answer";
import Paper from "@/models/paper"; // Import the Paper model
import Topic from "@/models/topic"; // Import the Topic model
import Subtopic from "@/models/subtopic"; // Import the Subtopic model
import connectDb from "@/middleware/mongoose";
import mongoose from "mongoose";
const handler = async (req, res) => {
  if (req.method == "POST") {
    let papId, topicId, subtopicId;

    if (req.body.paperId === "") {
      const newPaper = new Paper({ name: req.body.paper });
      await newPaper.save();
      papId = newPaper._id;
    } else {
      papId = req.body.paperId;
    }

    if (req.body.topicNameId === "") {
      const newTopic = new Topic({ name: req.body.topicName });
      await newTopic.save();
      topicId = newTopic._id;
    } else {
      topicId = req.body.topicNameId;
    }

    if (req.body.subtopicNameId === "") {
      const newSubtopic = new Subtopic({ name: req.body.subtopicName });
      await newSubtopic.save();
      subtopicId = newSubtopic._id;
    } else {
      subtopicId = req.body.subtopicNameId;
    }

    console.log(req.body.testCode);
    let q = new Answer({
      testCode: req.body.testCode,
      questionNumber: req.body.questionNumber,
      questionText: req.body.questionText,
      answerText: req.body.answerText,
      answerImages: req.body.answerImages,
      writtenBy: req.body.writtenBy,
      paper: papId,
      topicName: topicId,
      subtopicName: subtopicId,
    });

    await q.save();
    res.status(200).json({ message: "success" });
  } else {
    res.status(400).json({ message: "bad request" });
  }
};
export default connectDb(handler);
