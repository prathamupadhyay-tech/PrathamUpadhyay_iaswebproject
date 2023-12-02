import Answer from "@/models/answer";
import Paper from "@/models/paper";
import Topic from "@/models/topic";
import Subtopic from "@/models/subtopic";
import connectDb from "@/middleware/mongoose";
import mongoose from "mongoose";
import topic from "@/models/topic";
import subtopic from "@/models/subtopic";
import topper from "@/models/topper";
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};
const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      let subtopicId = req.body.subTopicId;
      let topicId = req.body.topicId;
      let papId;

      if (req.body.paperId === "") {
        const newSubTopic = new subtopic({ name: req.body.subtopicName });
        await newSubTopic.save();
        subtopicId = newSubTopic._id;
        const newTopic = new topic({
          name: req.body.topicName,
          subTopic: [subtopicId],
        });
        await newTopic.save();
        topicId = newTopic._id;
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
        subtopicId = newSubTopic._id;
        const newTopic = new topic({
          name: req.body.topicName,
          subTopic: [subtopicId],
        });
        await newTopic.save();
        topicId = newTopic._id;

        await Paper.findByIdAndUpdate(papId, {
          $push: { paperTopics: topicId },
        }).exec();
      } else if (
        req.body.paperId &&
        req.body.topicId &&
        req.body.subTopicId === ""
      ) {
        papId = req.body.paperId;
        topicId = req.body.topicId;
        const newSubTopic = new subtopic({ name: req.body.subtopicName });
        await newSubTopic.save();
        subtopicId = newSubTopic._id;

        await topic
          .findByIdAndUpdate(topicId, {
            $push: { subTopic: subtopicId },
          })
          .exec();
      } else {
        papId = req.body.paperId;
      }

      let q = new Answer({
        testCode: req.body.testCode,
        questionNumber: req.body.questionNumber,
        questionText: req.body.questionText,
        answerText: req.body.answerText,
        answerImages: req.body.answerImages,
        writtenBy: req.body.writtenBy,
        paper: papId,
        topic: topicId,
        subTopic: subtopicId,
      });

      await q.save();

      await topper.findByIdAndUpdate(req.body.writtenBy, {
        $push: { Answers: q._id },
      });

      res.status(200).json({ message: "success" });
    } catch (err) {
      console.error("Error in handler:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(400).json({ message: "bad request" });
  }
};
export default connectDb(handler);
