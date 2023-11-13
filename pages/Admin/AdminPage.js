import React  from "react";
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
          <Link href={`${process.env.NEXT_PUBLIC_HOST}/form/QuestionForm`}>
            {" "}
            <button className={styles.addQuestionBtn}>Add question</button>
          </Link>
        </div>
        </div>
       
        {questions.map((item) => {
          return (
            <Link
              key={item._id}
              href={`${process.env.NEXT_PUBLIC_HOST}/question/${item.slug}`}
              className={styles.adminQuestions}
            >
              <div className={styles.questionContainer}>
                <div className="question-title">
                  <h2>{item.Title}</h2>
                </div>

                <div className="question-description">
                  <p>{item.QuestionText}</p>
                </div>
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
export default AdminPage;
