import { useRouter } from "next/navigation";
import React from "react";
import styles from "./[slug].module.css";
import mongoose from "mongoose";
import question from "@/models/question";
import Image from "next/image";
import Link from "next/link";

const Post = ({ questions, prevQuestion, nextQuestion }) => {
  console.log(questions);

  const router = useRouter();
  console.log(router.query);
  // const { slug } = router.query;
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
          <div className={styles.rightConSubDiv}>
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

          <div className={styles.navigationBtns}>
            {prevQuestion && (
              <Link href={`/question/${prevQuestion.slug}`}>
                <button className={styles.prevbutton}>Previous</button>
              </Link>
            )}

            {nextQuestion && (
              <Link href={`/question/${nextQuestion.slug}`}>
                <button className={styles.nextbutton}>Next</button>
              </Link>
            )}
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
  const allQuestions = await question
    .find({}, "_id slug")
    .sort({ createdAt: -1 })
    .lean();
  const currentQuestion = await question.findOne({ slug: context.query.slug });
  const currentQuestionIndex = allQuestions.findIndex(
    (q) => q._id.toString() === currentQuestion._id.toString()
  );
  let prevQuestion = null;
  let nextQuestion = null;

  if (currentQuestionIndex >= 0) {
    const totalQuestions = allQuestions.length;

    if (currentQuestionIndex > 0) {
      prevQuestion = allQuestions[currentQuestionIndex - 1];
    } else {
      // If the current question is the first one, set prevQuestion to the last question.
      prevQuestion = allQuestions[totalQuestions - 1];
    }

    if (currentQuestionIndex < totalQuestions - 1) {
      nextQuestion = allQuestions[currentQuestionIndex + 1];
    } else {
      // If the current question is the last one, set nextQuestion to the first question.
      nextQuestion = allQuestions[0];
    }
  }

  return {
    props: {
      questions: JSON.parse(JSON.stringify(questions)),
      prevQuestion: JSON.parse(JSON.stringify(prevQuestion)),
      nextQuestion: JSON.parse(JSON.stringify(nextQuestion)),
    },
  };
}
export default Post;
