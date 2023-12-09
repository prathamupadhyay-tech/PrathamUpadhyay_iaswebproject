import pyqs from "@/models/pyqs";
import React from "react";
import styles from "./pyqs.module.css";
import mongoose from "mongoose";
import { useState } from "react";
const formatDateDifference = (date) => {
  const now = new Date();
  const timestamp = new Date(date);

  const timeDifference = now - timestamp;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `added ${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `added ${hours} hr${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `added ${minutes} min${minutes > 1 ? "s" : ""} ago`;
  } else {
    return `added a moment ago`;
  }
};
const PyqsListadmin = ({ questions }) => {
  const [selectedOption, setSelectedOption] = useState("AllAsc");
  const [questionState, setQuestionsState] = useState(questions);

  const handleSortingOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    const now = new Date();
    switch (selectedValue) {
      case "AllAsc":
        setQuestionsState(
          [...questions].sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          )
        );

        console.log("All (Asc Order) selected");
        break;
      case "AllDsc":
        setQuestionsState(
          [...questions].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        );
        console.log("All (Des Order) selected");
        break;
      case "Latest":
        const latestQuestions = [...questions]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .filter(
            (question) =>
              now - new Date(question.createdAt) >= 0 &&
              now - new Date(question.createdAt) < 60 * 60000
          );

        setQuestionsState(latestQuestions);

        break;
      case "lasthr":
        const latestQuestions1 = [...questions]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .filter(
            (question) =>
              now - new Date(question.createdAt) >= 60 * 60000 &&
              now - new Date(question.createdAt) < 24 * 60 * 60000
          );

        setQuestionsState(latestQuestions1);

        break;
      case "lastday":
        const latestQuestions2 = [...questions]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .filter(
            (question) =>
              now - new Date(question.createdAt) >= 24 * 60 * 60000 &&
              now - new Date(question.createdAt) < 30 * 24 * 60 * 60000
          );

        setQuestionsState(latestQuestions2);

        console.log("last day selected");
        break;
      case "lastmonth":
        const latestQuestions3 = [...questions]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .filter(
            (question) =>
              now - new Date(question.createdAt) >= 30 * 24 * 60 * 60000 &&
              now - new Date(question.createdAt) < 12 * 30 * 24 * 60 * 60000
          );

        setQuestionsState(latestQuestions3);
        console.log("last month selected");
        break;
      default:
        // Default code (if needed)
        break;
    }
  };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.wrapper}>
        <div className={styles.sortingDiv}>
          <select
            name="sortingOption"
            value={selectedOption}
            onChange={handleSortingOptionChange}
          >
            <option value="AllAsc">All (Asc Order)</option>
            <option value="AllDsc">All (Des Order)</option>
            <option value="Latest">Latest</option>
            <option value="lasthr">last hours</option>
            <option value="lastday">last days</option>
            <option value="lastmonth">last months</option>
          </select>
        </div>
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
          <div className={styles.timeAgoDiv}>
            <h3>Added time</h3>
          </div>
        </div>
        {questionState.map((data, index) => {
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
              <div className={styles.timeAgoDiv}>
                <p>{formatDateDifference(data.createdAt)}</p>
              </div>
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

    const questions = await pyqs.find();

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
export default PyqsListadmin;
