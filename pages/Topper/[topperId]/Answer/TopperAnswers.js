import React from "react";
import styles from "./TopperAnswers.module.css";
import mongoose from "mongoose";
import answer from "@/models/answer";
import topper from "@/models/topper";
import paper from "@/models/paper";
import topic from "@/models/topic";
import subtopic from "@/models/subtopic";
const TopperAnswers = ({ toppers, answers }) => {
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
          {/* <div>
            <h2>Paper</h2>
          </div>
          <div>
            <h2>Topic Name</h2>
          </div>
          <div>
            <h2>Subtopic Name</h2>
          </div> */}
          <div>
            <h2>View Answer</h2>
          </div>
        </div>
        {answers.map((data, index) => {
          return (
            <div key={index} className={styles.Answers}>
              <div>{data.testCode}</div>
              <div>{data.questionNumber}</div>
              <div>{toppers.name}</div>

              {/* <div>{data.paper.name}</div> */}

              {/* {data.topic.map((topic, topicIndex) => (
                <>
                  <div key={topicIndex}>{topic.name}</div>
                </>
              ))}
              {data.subTopic.map((subtopic, subtopicIndex) => (
                <div key={subtopicIndex}>{subtopic.name}</div>
              ))} */}
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
    const [slugName, rankandyear] = objectId.split("-rank-");

    const [rank, year] = rankandyear.split("-");

    const name = slugName.replace(/-/g, " ");
    const parsedRank = parseInt(rank, 10);
    const parsedYear = parseInt(year, 10);

    const toppers = await topper
      .findOne({
        name,
        rank: parsedRank,
        year: parsedYear,
      })
      .populate({
        path: "Answers",
        model: answer,
        // populate: [
        //   {
        //     path: "paper",
        //     model: paper,
        //   },
        //   {
        //     path: "topic", // Use "topic" instead of "Answers.topic"
        //     model: topic,
        //   },
        //   {
        //     path: "subTopic", // Use "subTopic" instead of "Answers.subTopic"
        //     model: subtopic,
        //   },
        // ],
      })

      .exec();

    const answers = toppers ? toppers.Answers : [];

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
