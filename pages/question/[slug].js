import { useRouter } from "next/router";
import React from "react";
import styles from "./[slug].module.css";
import mongoose from "mongoose";
import question from "@/models/question";

const Post = ({ questions }) => {
  console.log(questions);
  const router = useRouter();
  const { slug } = router.query;
  return <p className={styles.p}>The sllug is: {questions.Title}</p>;
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
