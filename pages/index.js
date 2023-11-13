import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import QuestionForm from "./form/QuestionForm";
import MainPage from "../components/MainPage";
import UserPage from "../user/UserPage";
import mongoose from "mongoose";
import question from "@/models/question";
const inter = Inter({ subsets: ["latin"] });

export default function Home({ questions }) {
  return (
    <>
      <Head>
        <title>IAS Project</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <UserPage questions={questions}></UserPage>
      </div>
    </>
  );
}
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let questions = await question.find();

  return {
    props: { questions: JSON.parse(JSON.stringify(questions)) },
  };
}
