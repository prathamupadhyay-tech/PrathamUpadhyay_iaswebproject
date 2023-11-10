import { useRouter } from "next/router";
import React from "react";
import styles from "./[slug].module.css";
import mongoose from "mongoose";
import question from "@/models/question";
import Image from "next/image";

const Post = ({ questions }) => {
  console.log(questions);
  const router = useRouter();
  const { slug } = router.query;
  return (
    <div>
      {/* <p className={styles.p}>The sllug is: {questions.Title}</p> */}

      <div className={styles.mainQuestionContainer}>
        <div className={styles.questionLeftContainer}>
          {questions && (
            <div className={styles.questionHeadDiv}>
              <label>Title:</label>
              <h1>{questions.Title}</h1>
            </div>
          )}

          <div className={styles.questionDescDiv}>
            <label>Description:</label>
            <h3>{questions.QuestionText}</h3>
          </div>

          <div className={styles.questionImageDiv}>
            {questions.Image.length !== 0 && (
              <Image
                className={styles.questionImage}
                src={questions.Image}
                alt="asdas"
                width={1200}
                height={550}
                style={{ maxWidth: "100%", height: "auto" }}
              />
            )}
          </div>

          <div className={styles.questionLinkDiv}>
            <label>Links</label>
            <h3>{questions.url}</h3>
          </div>
          <div className={styles.questionSubmitTimeDiv}>
            <label>Submit Time</label>
            <h3>{questions.SubmitTime}</h3>
          </div>
        </div>
        <div className={styles.questionrightContainer}>
          <div className={styles.questionSubmitTimeDiv}>
            <label>Answer</label>
            <h3>{questions.Answer}</h3>
          </div>
          <div className={styles.questionSubjectDiv}>
            <label>Subject</label>
            <h3>{questions.Subject}</h3>
          </div>
          <div className={styles.TopicsDiv}>
            <label>Topics</label>
            <h3>{questions.topic}</h3>
          </div>
        </div>
      </div>
      {/* <div>
        <img src={questions.Image} alt="" />
      </div> */}
    </div>
  );
};
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let questions = await question.findOne({ slug: context.query.slug });

  return {
    props: { questions: JSON.parse(JSON.stringify(questions)) },
  };
}
export default Post;
