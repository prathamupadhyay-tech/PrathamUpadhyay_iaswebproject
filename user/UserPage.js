import React from "react";
import styles from "./UserPage.module.css";
import mongoose from "mongoose";
import question from "@/models/question";
import Link from "next/link";

const UserPage = ({ questions }) => {
  return (
    <div className={styles.all}>
      <div className={styles.questionsMainContainer}>
        <div className={styles.questionHeadDiv}>
          <h1 className={styles.questionHead}>QUESTIONS</h1>
        </div>

        {questions.map((item) => (
          <Link
            href={`/question/${item.slug}`}
            key={item._id}
            className={styles.questionContainer}
          >
            <div className="question-title">
              <h2>{item.Title}</h2>
            </div>

            <div className="question-description">
              <p>{item.QuestionText}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  try {
    if (mongoose.connections[0].readyState !== 1) {
      await mongoose.connect(process.env.MONGO_URI);
    }

    const questions = await question.find();

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

export default UserPage;
