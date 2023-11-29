import Answer from "@/models/answer";
import Paper from "@/models/paper";
import Topic from "@/models/topic";
import Subtopic from "@/models/subtopic";
import connectDb from "@/middleware/mongoose";
import mongoose from "mongoose";
import topic from "@/models/topic";
import subtopic from "@/models/subtopic";
const handler = async (req, res) => {
  if (req.method == "POST") {
    let papId;

    if (req.body.paperId === "") {
      const newSubTopic = new subtopic({ name: req.body.subtopicName });
      await newSubTopic.save();
      let subtopicId = newSubTopic._id;
      const newTopic = new topic({
        name: req.body.topicName,
        subTopic: [subtopicId],
      });
      await newTopic.save();
      let topicId = newTopic._id;
      const newPaper = new Paper({
        name: req.body.paper,
        paperTopics: [topicId],
      });
      await newPaper.save();
      papId = newPaper._id;
    } else if (req.body.paperId && req.body.topicId === "") {
      papId = req.body.paperId;
      const newSubTopic = new subtopic({ name: req.body.subtopicName });
      await newSubTopic.save();
      let subtopicId = newSubTopic._id;
      const newTopic = new topic({
        name: req.body.topicName,
        subTopic: [subtopicId],
      });
      await newTopic.save();
      let topicId = newTopic._id;

      await Paper.findByIdAndUpdate(papId, {
        $push: { paperTopics: topicId },
      }).exec();
    } else if (
      req.body.paperId &&
      req.body.topicId &&
      req.body.subTopicId === ""
    ) {
      papId = req.body.paperId;
      let topicId = req.body.topicId;
      const newSubTopic = new subtopic({ name: req.body.subtopicName });
      await newSubTopic.save();
      let subtopicId = newSubTopic._id;

      await topic
        .findByIdAndUpdate(topicId, {
          $push: { subTopic: subtopicId },
        })
        .exec();
    } else {
      papId = req.body.paperId;
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
    });

    await q.save();
    res.status(200).json({ message: "success" });
  } else {
    res.status(400).json({ message: "bad request" });
  }
};
export default connectDb(handler);
