"use client";
import { useEffect, useRef } from "react";
import React from "react";
import styles from "./QuestionForm.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

const TopperForm = () => {
  const router = useRouter();

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
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // if (
    //   formData.name ||
    //   formData.Remarks ||
    //   formData.rank ||
    //   formData.gs1marks ||
    //   formData.gs2marks ||
    //   formData.gs3marks ||
    //   formData.gs4marks ||
    //   formData.essayMarks ||
    //   formData.year ||
    //   formData.optional1Marks ||
    //   formData.optional2Marks ||
    //   formData.optionalSub ||
    //   formData.prelimsScoreGs ||
    //   formData.prelimsScoreCsat
    // ) {
    //   alert("There is a field missing please fill all the details!");
    //   return;
    // }
    const question = {
      name: formData.name,
      rank: formData.rank,
      year: formData.year,
      gs1marks: formData.gs1marks,
      gs2marks: formData.gs2marks,
      gs3marks: formData.gs3marks,
      gs4marks: formData.gs4marks,
      essayMarks: formData.essayMarks,
      prelimsScoreGs: formData.prelimsScoreGs,
      prelimsScoreCsat: formData.prelimsScoreCsat,
      optionalSub: formData.optionalSub,
      optional1Marks: formData.optional1Marks,
      optional2Marks: formData.optional2Marks,
      Remarks: formData.Remarks,
    };

    try {
      const res = await fetch("/api/AddTopper", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(question),
      });

      if (res.status === 200) {
        setIsLoading(false);
        router.push("/Admin/Toppers");
      } else {
        const data = await res.json();
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

export default TopperForm;
