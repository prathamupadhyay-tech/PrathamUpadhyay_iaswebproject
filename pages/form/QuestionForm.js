"use client";
import { useEffect, useRef } from "react";
import React from "react";
import styles from "./QuestionForm.module.css";
import { useRouter } from "next/router";
import { useState } from "react";

const QuestionForm = () => {
  const MAX_IMAGE_SIZE_BYTES = 600 * 1024;
  const router = useRouter();
  const [ImageName, setImageName] = useState("");
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
      if (file.size > MAX_IMAGE_SIZE_BYTES) {
        alert(
          "Image size exceeds the maximum allowed size (600KB). Please choose a smaller image."
        );
      } else {
        // console.log("file ", file);
        setImageName(file.name);
        const base64Image = await convertToBase64(file);
        setFormData((prevData) => ({
          ...prevData,
          Image: base64Image,
        }));
      }
    }
  };

  const handleImagePaste = async (e) => {
    if (e.clipboardData.items.length) {
      for (let i = 0; i < e.clipboardData.items.length; i++) {
        if (e.clipboardData.items[i].type.indexOf("image") !== -1) {
          const fileObject = e.clipboardData.items[i].getAsFile();

          if (fileObject) {
            if (fileObject.size > MAX_IMAGE_SIZE_BYTES) {
              alert(
                "Image size exceeds the maximum allowed size (600KB). Please choose a smaller image."
              );
            } else {
              setImageName(fileObject.name);
              const base64Image = await convertToBase64(fileObject);

              if (base64Image) {
                setFormData((prevData) => ({
                  ...prevData,
                  Image: base64Image,
                }));
              }
            }
          }
        }
      }
    } else {
      alert(
        "No image data was found in your clipboard. Copy an image first or take a screenshot."
      );
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

    try {
      const res = await fetch("/api/AddQuestion", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(question),
      });

      if (res.status === 200) {
        setIsLoading(false);
        router.push("/Admin/AdminPage");
      } else {
        const data = await res.json(); // Parse the response body as JSON
        alert(
          "An error occurred. Please try again. Error message: " + data.message
        );
        setIsLoading(false);
      }
    } catch (error) {
      alert(error);
      setIsLoading(false);
    }
  };

  const handleClear = (e) => {
    e.preventDefault();
    setFormData((prevData) => ({
      ...prevData,
      Image: "",
    }));
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

                <div>
                  {!formData.Image && (
                    <input
                      type="file"
                      name="Image"
                      accept="image/*"
                      placeholder="Image url"
                      onChange={handleImageUpload}
                    />
                  )}

                  {formData.Image && <p>File: {ImageName}</p>}
                  {!formData.Image && (
                    <div
                      onPaste={handleImagePaste}
                      style={{
                        border: "2px dashed #ccc",
                        padding: "20px",
                        textAlign: "center",
                      }}
                    >
                      <p>Or paste an image using Ctrl+V</p>
                    </div>
                  )}
                  {formData.Image && (
                    <button onClick={handleClear} className={styles.clearBtn}>
                      Clear
                    </button>
                  )}
                </div>
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
