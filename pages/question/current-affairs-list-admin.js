import React from "react";
import mongoose from "mongoose";
import styles from "./pyqs.module.css";
import currentAffairs from "@/models/currentAffairs";
const CurrentAffairslistadmin = ({ questions }) => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.wrapper}>
        <div className={styles.headingContainer}>
          <div className={styles.srNoDiv}>
            <h3>sr. no</h3>
          </div>
          <div className={styles.questionTextDiv}>
            <h3>Question text</h3>
          </div>
          <div className={styles.solutionTextDiv}>
            <h3>Solution text</h3>
          </div>
        </div>
        {questions.map((data, index) => {
          return (
            <div key={index} className={styles.questionContainer}>
              <div className={styles.srNoDiv1}>
                <p>{index + 1}.</p>
              </div>
              <div
                className={styles.questionTextDiv}
                dangerouslySetInnerHTML={{ __html: data.question }}
              ></div>
              <div
                className={styles.solutionTextDiv}
                dangerouslySetInnerHTML={{ __html: data.solution }}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  try {
    if (mongoose.connections[0].readyState !== 1) {
      await mongoose.connect(process.env.MONGO_URI);
    }

    const questions = await currentAffairs.find();

    return {
      props: { questions: JSON.parse(JSON.stringify(questions)) },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return {
      props: { questions: [] },
    };
  }
}
export default CurrentAffairslistadmin;
