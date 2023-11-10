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

        {questions.map((item) => {
          return (
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
          );
        })}
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let questions = await question.find();

  return {
    props: { questions: JSON.parse(JSON.stringify(questions)) },
  };
}

export default UserPage;
