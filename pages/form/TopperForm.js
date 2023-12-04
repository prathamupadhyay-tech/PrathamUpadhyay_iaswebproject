"use client";
import { useEffect, useRef } from "react";
import React from "react";
import styles from "./QuestionForm.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

const TopperForm = () => {
  const router = useRouter();
  const [ImageName, setImageName] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    rank: "",
    year: "",
    gs1marks: "",
    gs2marks: "",
    gs3marks: "",
    gs4marks: "",
    essayMarks: "",
    prelimsScoreGs: "",
    prelimsScoreCsat: "",
    optionalSub: "",
    optional1Marks: "",
    optional2Marks: "",
    Remarks: "",
    profileImage: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageName(file.name);
      console.log(file);
      // const base64Image = await convertToBase64(file);
      setFormData((prevData) => ({
        ...prevData,
        profileImage: file,
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("file image" + formData.profileImage);

    const formdata = new FormData();
    formdata.append("name", formData.name);
    formdata.append("rank", formData.rank);
    formdata.append("year", formData.year);
    formdata.append("gs1marks", formData.gs1marks);
    formdata.append("gs2marks", formData.gs2marks);
    formdata.append("gs3marks", formData.gs3marks);
    formdata.append("gs4marks", formData.gs4marks);
    formdata.append("essayMarks", formData.essayMarks);
    formdata.append("prelimsScoreGs", formData.prelimsScoreGs);
    formdata.append("prelimsScoreCsat", formData.prelimsScoreCsat);
    formdata.append("optionalSub", formData.optionalSub);
    formdata.append("optional1Marks", formData.optional1Marks);
    formdata.append("optional2Marks", formData.optional2Marks);
    formdata.append("Remarks", formData.Remarks);
    formdata.append("profileImage", formData.profileImage);
    try {
      const res = await fetch("/api/AddTopper", {
        method: "POST",
        body: formdata,
      });

      if (res.status === 200) {
        setIsLoading(false);
        router.push("/Admin/Toppers");
      } else {
        alert("This");
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      alert(error);
      setIsLoading(false);
    }
  };

  const handleImagePaste = async (e) => {
    if (e.clipboardData.items.length) {
      for (let i = 0; i < e.clipboardData.items.length; i++) {
        if (e.clipboardData.items[i].type.indexOf("image") !== -1) {
          const fileObject = e.clipboardData.items[i].getAsFile();

          if (fileObject) {
            setImageName(fileObject.name);
            // const base64Image = await convertToBase64(fileObject);

            if (fileObject) {
              setFormData((prevData) => ({
                ...prevData,
                profileImage: fileObject,
              }));
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
  const handleClear = (e) => {
    e.preventDefault();
    setFormData((prevData) => ({
      ...prevData,
      profileImage: "",
    }));
  };
  return (
    <div className={styles.all}>
      <div className={styles.questionFormContainer}>
        <form onSubmit={handleSubmit} className={styles.questionForm} action="">
          <div className={styles.formHeading}>
            <h1>
              Add <span>Topper</span>{" "}
            </h1>
          </div>

          <div className={styles.formInsideContainer}>
            <div className={styles.firstHalf}>
              <div className={styles.intputDiv}>
                <div className={styles.labels}>Name</div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.intputDiv}>
                <div className={styles.labels}>Rank</div>
                <input
                  type="number"
                  name="rank"
                  value={formData.rank}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.intputDiv}>
                <div className={styles.labels}>Year</div>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.intputDiv}>
                <div className={styles.labels}>Gs 1 Marks</div>
                <input
                  type="number"
                  name="gs1marks"
                  value={formData.gs1marks}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.intputDiv}>
                <div className={styles.labels}>Gs 2 Marks</div>
                <input
                  type="number"
                  name="gs2marks"
                  value={formData.gs2marks}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.intputDiv}>
                <div className={styles.labels}>Gs 3 Marks</div>
                <input
                  type="number"
                  name="gs3marks"
                  value={formData.gs3marks}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.intputDiv}>
                <div className={styles.labels}>Gs 4 Marks</div>
                <input
                  type="number"
                  name="gs4marks"
                  value={formData.gs4marks}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.intputDiv}>
                <div className={styles.labels}>Profile Image</div>

                <div>
                  {!formData.profileImage && (
                    <input
                      type="file"
                      name="profileImage"
                      accept="image/*"
                      placeholder="Image url"
                      onChange={handleImageUpload}
                    />
                  )}

                  {formData.profileImage && <p>File: {ImageName}</p>}
                  {!formData.profileImage && (
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
                  {formData.profileImage && (
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
                <div className={styles.labels}>Essay Marks</div>
                <input
                  type="number"
                  name="essayMarks"
                  value={formData.essayMarks}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.intputDiv}>
                <div className={styles.labels}>Prelims score gs</div>
                <input
                  type="number"
                  name="prelimsScoreGs"
                  value={formData.prelimsScoreGs}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.intputDiv}>
                <div className={styles.labels}>Prelims score csat </div>
                <input
                  type="number"
                  name="prelimsScoreCsat"
                  value={formData.prelimsScoreCsat}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.intputDiv}>
                <div className={styles.labels}>Optional Subject</div>
                <input
                  type="text"
                  name="optionalSub"
                  value={formData.optionalSub}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.intputDiv}>
                <div className={styles.labels}>Optional 1 marks</div>
                <input
                  type="number"
                  name="optional1Marks"
                  value={formData.optional1Marks}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.intputDiv}>
                <div className={styles.labels}>Optional 2 marks</div>
                <input
                  type="number"
                  name="optional2Marks"
                  value={formData.optional2Marks}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.intputDiv}>
                <div className={styles.labels}>Remarks</div>
                <input
                  type="text"
                  name="Remarks"
                  value={formData.Remarks}
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
              {!isLoading && <span>Add Topper </span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
// function convertToBase64(file) {
//   return new Promise((resolve, reject) => {
//     const fileReader = new FileReader();
//     fileReader.readAsDataURL(file);
//     fileReader.onload = () => {
//       resolve(fileReader.result);
//     };
//     fileReader.onerror = (error) => {
//       reject(error);
//     };
//   });
// }
export default TopperForm;
