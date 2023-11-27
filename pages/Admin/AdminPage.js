import React from "react";
import styles from "./AdminPage.module.css";
import mongoose from "mongoose";
import question from "@/models/question";
import Link from "next/link";

const AdminPage = ({ questions }) => {
  return (
    <div className={styles.all}>
      <div className={styles.adminMainContainer}>
        <div className={styles.adminTopContainter}>
          <h1>Admin page</h1>
          <div className={styles.adminContainer}>
            <Link href={`/form/QuestionForm`}>
              {" "}
              <button className={styles.addQuestionBtn}>+ Add question</button>
            </Link>
          </div>
        </div>
        <div className={styles.questionHead}>
          <p>Title</p>
          <p>Submit-time</p>
        </div>
        <div className={styles.horizontalLine}></div>
        <div className={styles.questionsContainter}>
          {questions &&
            questions.map((item, index) => {
              const isEven = index % 2 === 0;
              const questionContainerClass = isEven
                ? `${styles.questionContainer} ${styles.even}`
                : styles.questionContainer;
              return (
                <Link
                  key={item._id}
                  href={`/question/${item.slug}`}
                  className={styles.adminQuestions}
                >
                  <div className={questionContainerClass}>
                    <div className="question-title">
                      <h2>{item.Title}</h2>
                    </div>

                    <div className="question-description">
                      <p>{item.SubmitTime}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  try {
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGO_URI);
    }

    let questions = await question.find();

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
export default AdminPage;
