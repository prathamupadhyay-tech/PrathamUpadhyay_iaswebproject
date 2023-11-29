import React from "react";
import styles from "./TopperAnswers.module.css";
import mongoose from "mongoose";
import answer from "@/models/answer";
import topper from "@/models/topper";
const TopperAnswers = ({ toppers, answers }) => {
  console.log(answers);
  console.log(toppers);
  return (
    <div className={styles.MainAnswersContainer}>
      <div className={styles.AnswersContainerHeading}>
        <h1>Answers By {toppers.name}</h1>
      </div>
      <div className={styles.AnswersDiv}>
        <div className={styles.AnswersHeadingDiv}>
          <div>
            <h2>Test Code</h2>
          </div>

          <div>
            <h2>Question Number</h2>
          </div>
          <div>
            <h2>Written By</h2>
          </div>
          <div>
            <h2>Paper</h2>
          </div>
          <div>
            <h2>Topic Name</h2>
          </div>
          <div>
            <h2>Subtopic Name</h2>
          </div>
          <div>
            <h2>View Answer</h2>
          </div>
        </div>
        {answers.map((data, index) => {
          return (
            <div key={index} className={styles.Answers}>
              <div>{data.testCode}</div>
              <div>{data.questionNumber}</div>
              <div>{data.writtenBy.name}</div>

              <div>{data.paper.name}</div>

              {data.paper.paperTopics.map((topic, topicIndex) => (
                <div key={topicIndex}>
                  <div>{topic.name}</div>

                  {/* Accessing subtopic details */}
                  {topic.subTopic.map((subtopic, subtopicIndex) => (
                    <div key={subtopicIndex}>{subtopic.name}</div>
                  ))}
                </div>
              ))}
              <div className={styles.viewAnswerBtn}>
                <button>View</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export async function getServerSideProps(context) {
  try {
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGO_URI);
    }
    const objectId = context.query.topperId;
    const [name, rank, year] = objectId.split("-");
    console.log(name);
    const toppers = await topper.findOne({ name, rank, year });
    const answers = await answer
      .find({ writtenBy: toppers._id })
      .populate({
        path: "paper",
        populate: {
          path: "paperTopics",
          populate: {
            path: "subTopic",
          },
        },
      })
      .populate("writtenBy");

    return {
      props: {
        answers: JSON.parse(JSON.stringify(answers)),
        toppers: JSON.parse(JSON.stringify(toppers)),
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return {
      props: { answers: [], toppers: "" },
    };
  }
}

export default TopperAnswers;
