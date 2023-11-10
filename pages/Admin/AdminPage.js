import React, { useEffect } from "react";
import styles from "./AdminPage.module.css";
import mongoose from "mongoose";
import question from "@/models/question";
import Link from "next/link";
import { useRouter } from "next/router";
const AdminPage = ({ questions }) => {
  const router = useRouter();

  return (
    <div className={styles.all}>
      <div className={styles.adminMainContainer}>
        <h1>Admin page</h1>

        {questions.map((item) => {
          return (
            <Link
              key={item._id}
              href={`/question/${item.slug}`}
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

        <div className={styles.adminContainer}>
          <Link href={"/form/QuestionForm"}>
            {" "}
            <button className={styles.addQuestionBtn}>Add question</button>
          </Link>
        </div>
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
