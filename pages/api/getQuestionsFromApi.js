import { JSDOM } from "jsdom";
import data from "@/components/ApiData";
import axios from "axios";
import fs from "fs";
let globalQuestionIndex = 5835;
const getQuestionFromApi = async () => {
  try {
    let existingData = [];
    for (let page = 13; page <= 17; page++) {
      const response = await axios.get(
        `https://iasbaba.com/wp-json/wp/v2/posts?categories=1066&per_page=100&page=${page}`
      );
      const data1 = response.data;

      try {
        const existingDataBuffer = fs.readFileSync("questionsIasBaba.json");
        existingData = JSON.parse(existingDataBuffer.toString());
      } catch (err) {}
      const structureData = data1.map((data) => {
        const link = data.link;
        const dataId = data.id;
        const html = data.content.rendered;

        const dom = new JSDOM(html);
        const document = dom.window.document;
        const questionElements = document.querySelectorAll(
          ".wpProQuiz_question"
        );
        const questions = Array.from(questionElements).map(
          (question, index) => {
            const questionText = question
              .querySelector(".wpProQuiz_question_text")
              .textContent.trim();

            const optionsElements = question.querySelectorAll(
              ".wpProQuiz_questionListItem label"
            );
            const options = Array.from(optionsElements).map((option) => {
              return option.textContent.trim();
            });

            const responseDiv = question.nextElementSibling;
            const solutionElement =
              responseDiv.querySelector(".wpProQuiz_correct");

            const solutionTextmain =
              solutionElement && solutionElement.textContent
                ? solutionElement.textContent.trim()
                : "";

            const correctOptionMatch = /Solution[:\s]?\s?[\(\s](\w)[\)\s]/.exec(
              solutionTextmain
            );

            const correctOption = correctOptionMatch
              ? correctOptionMatch[1]
              : "";

            return {
              id: ++globalQuestionIndex,
              link: link,
              text: questionText,
              options,
              correctOption,
              solutionTextmain,
            };
          }
        );

        return {
          id: dataId,
          link: data.link,
          questions: questions,
        };
      });

      const newData = existingData.concat(structureData);

      const replacer = (key, value) => {
        if (typeof value === "string") {
          return value.replace(/\t+/g, " ").replace(/\s+/g, " ");
        }
        return value;
      };

      fs.writeFileSync(
        "questionsIasBaba.json",
        JSON.stringify(newData, replacer, 2)
      );
    }
    return existingData;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};
export default getQuestionFromApi;
