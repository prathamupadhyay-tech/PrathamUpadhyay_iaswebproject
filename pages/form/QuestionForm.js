"use client";

import React from "react";
import styles from "./QuestionForm.module.css";
import { useRouter } from "next/router";
import { useState } from "react";
const QuestionForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    Title: "",
    QuestionText: "",
    Answer: "",
    slug: "",
    Image: "",
    url: "",
    SubmitTime: "",
    Subject: "",
    topic: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (file) {
      // Convert the selected file to Base64
      const base64Image = await convertToBase64(file);
      setFormData((prevData) => ({
        ...prevData,
        Image: base64Image,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const question = {
      Title: formData.Title,
      QuestionText: formData.QuestionText,
      Answer: formData.Answer,
      slug: formData.slug,
      Image: formData.Image,
      url: formData.url,
      SubmitTime: formData.SubmitTime,
      Subject: formData.Subject,
      topic: formData.topic,
    };

    const res = await fetch("http://localhost:3000/api/AddQuestion", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(question),
    });

    if (res.status === 200) {
      setIsLoading(false);
      router.push("/Admin/AdminPage");
    }
  };

  return (
    <div className={styles.all}>
      <div className={styles.questionFormContainer}>
        <form onSubmit={handleSubmit} className={styles.questionForm} action="">
          <div className={styles.formHeading}>
            <h1>
              Add <span>Question</span>{" "}
            </h1>
          </div>

          <div className={styles.formInsideContainer}>
            <div className={styles.firstHalf}>
              <div className={styles.intputDiv}>
                <div className={styles.labels}>Title</div>
                <input
                  type="text"
                  name="Title"
                  value={formData.Title}
                  placeholder="Title for the Question"
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.intputDiv}>
                <div className={styles.labels}>Question Text</div>
                <textarea
                  type="text"
                  name="QuestionText"
                  value={formData.QuestionText}
                  placeholder="Description"
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.intputDiv}>
                <div className={styles.labels}>Answer</div>
                <textarea
                  type="text"
                  name="Answer"
                  value={formData.Answer}
                  placeholder="Answer"
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.intputDiv}>
                <div className={styles.labels}>Image</div>
                <input
                  type="file"
                  name="Image"
                  accept="image/*"
                  placeholder="Image url"
                  onChange={handleImageUpload}
                />
              </div>
            </div>
            <div className={styles.separator}></div>
            <div className={styles.secondHalf}>
              <div className={styles.intputDiv}>
                <div className={styles.labels}>Slug</div>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  placeholder="Enter a unique slug"
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.intputDiv}>
                <div className={styles.labels}>url</div>
                <input
                  type="text"
                  name="url"
                  value={formData.url}
                  placeholder="Enter any url"
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.intputDiv}>
                <div className={styles.labels}>Submit-time</div>
                <input
                  type="text"
                  name="SubmitTime"
                  value={formData.SubmitTime}
                  placeholder="Enter submit time"
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.intputDiv}>
                <div className={styles.labels}>Subject</div>
                <input
                  type="text"
                  name="Subject"
                  value={formData.Subject}
                  placeholder="Enter subject"
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.intputDiv}>
                <div className={styles.labels}>Topic</div>
                <input
                  type="text"
                  name="topic"
                  value={formData.topic}
                  placeholder="Enter topic"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className={styles.btnHolder}>
            <button
              type="submit"
              disabled={isLoading}
              className={styles.submitQuestionForm}
            >
              {isLoading && <span>Adding...</span>}
              {!isLoading && <span>Add Question </span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
export default QuestionForm;
