"use client";
import { useEffect, useRef } from "react";
import React from "react";
import styles from "./QuestionForm.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import styles2 from "./AnswerForm.module.css";

const AnswerForm = () => {
  const router = useRouter();
  const MAX_IMAGE_SIZE_BYTES = 600 * 1024;
  const [users, setUsers] = useState([]);
  const [ImageName, setImageName] = useState([]);
  const [formData, setFormData] = useState({
    testCode: "",
    questionNumber: "",
    questionText: "",
    answerText: "",
    answerImages: [],
    writtenBy: "",
    paper: "",
    topicName: "",
    subtopicName: "",
    paperId: "",
    topicNameId: "",
    subtopicNameId: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [searchResultsPaper, setSearchResultsPaper] = useState([]);
  const [searchResultsTopic, setSearchResultsTopic] = useState([]);
  const [searchResultsSubTopic, setSearchResultsSubTopic] = useState([]);
  const [answers, setAnswers] = useState([]);

  const [showPaperOptions, setShowPaperOptions] = useState(false);
  const [showTopicOptions, setShowTopicOptions] = useState(false);
  const [showSubTopicOptions, setShowSubTopicOptions] = useState(false);

  const [paperFieldDis, setPaperFieldDis] = useState(false);
  const [writtenByFieldDis, setWrittenByFieldDis] = useState(false);
  const [topicFieldDis, setTopicFieldDis] = useState(false);
  const [subTopicFieldDis, setSubTopicFieldDis] = useState(false);

  const paperInputRef = useRef(null);
  const topicInputRef = useRef(null);
  const subTopicInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //   This is getting all the users for adding the writtenBy field
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/getToppers");
        setUsers(response.data.toppers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // fetching the papers
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/getPapers");
        setSearchResultsPaper(response.data.papers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/getAnswers");
        setAnswers(response.data.answers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);
  const handleSelectForTopper = async (result) => {
    setFormData((prevData) => ({
      ...prevData,
      writtenBy: result.name,
    }));
    setWrittenByFieldDis(true);
  };

  const handleSelect = async (fieldName, result) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: result.name,
      [`${fieldName}Id`]: result._id,
    }));

    if (fieldName === "paper") {
      setPaperFieldDis(true);
      try {
        const response = await axios.get(
          `/api/getTopics?paperId=${result._id}`
        );

        setSearchResultsTopic(response.data);
      } catch (error) {
        console.error(`Error fetching topics for the selected paper:`, error);
      }
    } else if (fieldName === "topicName") {
      setTopicFieldDis(true);
      try {
        const response = await axios.get(
          `/api/getSubTopics?topicId=${result._id}`
        );

        setSearchResultsSubTopic(response.data);
      } catch (error) {
        console.error(`Error fetching topics for the selected paper:`, error);
      }
    } else if (fieldName === "subtopicName") {
      setSubTopicFieldDis(true);
    }

    if (fieldName === "paper") setShowPaperOptions(false);
    else if (fieldName === "topicName") setShowTopicOptions(false);
    else if (fieldName === "subtopicName") setShowSubTopicOptions(false);
  };

  const handleClickOutside = (event) => {
    if (
      paperInputRef.current &&
      !paperInputRef.current.contains(event.target)
    ) {
      setShowPaperOptions(false);
    }

    if (
      topicInputRef.current &&
      !topicInputRef.current.contains(event.target)
    ) {
      setShowTopicOptions(false);
    }

    if (
      subTopicInputRef.current &&
      !subTopicInputRef.current.contains(event.target)
    ) {
      setShowSubTopicOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const question = {
      testCode: formData.testCode,
      questionNumber: formData.questionNumber,
      questionText: formData.questionText,
      answerText: formData.answerText,
      answerImages: formData.answerImages,
      writtenBy: formData.writtenBy,
      paper: formData.paper,
      topicName: formData.topicName,
      subtopicName: formData.subtopicName,
      paperId: formData.paperId,
      topicId: formData.topicNameId,
      subTopicId: formData.subtopicNameId,
    };

    try {
      const res = await fetch("/api/AddAnswer", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(question),
      });

      if (res.status === 200) {
        setIsLoading(false);
        router.push("/Admin/AdminPage");
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

  const handleClear = (e) => {
    e.preventDefault();

    setImageName([]);
    setFormData((prevData) => ({
      ...prevData,
      answerImages: [],
    }));
  };

  const clearField = (fieldName) => {
    if (fieldName === "paper") {
      setPaperFieldDis(false);
      setFormData((prevData) => ({
        ...prevData,
        paperId: "",
        paper: "",
      }));
    }
    if (fieldName === "topicName") {
      setTopicFieldDis(false);
      setFormData((prevData) => ({
        ...prevData,
        topicNameId: "",
        topicName: "",
      }));
    }
    if (fieldName === "subtopicName") {
      setSubTopicFieldDis(false);
      setFormData((prevData) => ({
        ...prevData,
        subtopicName: "",
        subtopicNameId: "",
      }));
    }
    if (fieldName === "writtenBy") {
      setWrittenByFieldDis(false);
      setFormData((prevData) => ({
        ...prevData,

        writtenBy: "",
      }));
    }
  };
  const handleImageUpload = async (e) => {
    const files = e.target.files;
    console.log(formData.answerImages);
    if (files.length > 0) {
      const newImages = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (file.size > MAX_IMAGE_SIZE_BYTES) {
          alert(
            `Image ${file.name} size exceeds the maximum allowed size (600KB). Please choose a smaller image.`
          );
        } else {
          const base64Image = await convertToBase64(file);
          setImageName((prevData) => [...prevData, file.name]);
          newImages.push(base64Image);
        }
      }

      setFormData((prevData) => ({
        ...prevData,
        answerImages: [...prevData.answerImages, ...newImages],
      }));
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
              setImageName((prevData) => [...prevData, fileObject.name]);
              const base64Image = await convertToBase64(fileObject);

              if (base64Image) {
                setFormData((prevData) => ({
                  ...prevData,
                  answerImages: [...prevData.answerImages, ...base64Image],
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
  return (
    <div className={styles.all}>
      <div className={styles.questionFormContainer}>
        <form onSubmit={handleSubmit} className={styles.questionForm} action="">
          <div className={styles.formHeading}>
            <h1>
              Add <span>Answers</span>{" "}
            </h1>
          </div>

          <div className={styles.formInsideContainer}>
            <div className={styles.firstHalf}>
              <div className={styles.intputDiv}>
                <div className={styles.labels}>Test Code</div>
                <input
                  type="text"
                  name="testCode"
                  value={formData.testCode}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.intputDiv}>
                <div className={styles.labels}>questionNumber</div>
                <input
                  type="number"
                  name="questionNumber"
                  value={formData.questionNumber}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.intputDiv}>
                <div className={styles.labels}>questionText</div>
                <input
                  type="text"
                  name="questionText"
                  value={formData.questionText}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.intputDiv}>
                <div className={styles.labels}>answerText</div>
                <input
                  type="text"
                  name="answerText"
                  value={formData.answerText}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.intputDiv}>
                <div className={styles.labels}>answerImages</div>
                <div>
                  {
                    <input
                      type="file"
                      name="Image"
                      accept="image/*"
                      multiple
                      placeholder="Image url"
                      onChange={handleImageUpload}
                    />
                  }

                  {ImageName.map((data, index) => {
                    return (
                      <div key={index}>
                        <p>File: {data}</p>
                      </div>
                    );
                  })}
                  {
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
                  }
                  {formData.answerImages && (
                    <button onClick={handleClear} className={styles.clearBtn}>
                      Clear
                    </button>
                  )}
                </div>
              </div>
              <div className={styles.intputDiv}>
                <div className={styles.labels}>writtenBy</div>
                <div className={styles.inputDivInner}>
                  <div className={styles2.inputDiv}>
                    <input
                      type="text"
                      name="writtenBy"
                      disabled={setWrittenByFieldDis}
                      value={formData.writtenBy}
                      onChange={handleInputChange}
                    />
                    {writtenByFieldDis && (
                      <div
                        onClick={() => {
                          clearField("writtenBy");
                        }}
                      >
                        Clear
                      </div>
                    )}
                  </div>

                  {formData.writtenBy && !writtenByFieldDis && (
                    <div className={styles2.optionsContainer}>
                      {users
                        .slice(0, 5)
                        .filter((item) => {
                          return formData.writtenBy.toLowerCase() === ""
                            ? item
                            : item.name
                                .toLowerCase()
                                .includes(formData.writtenBy.toLowerCase());
                        })
                        .map((result) => (
                          <div
                            onClick={() => handleSelectForTopper(result)}
                            key={result._id}
                            className={styles2.option}
                          >
                            {result.name}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.intputDiv}>
                <div className={styles.labels}>paper</div>
                <div className={styles.inputDivInner}>
                  <div className={styles2.inputDiv}>
                    <input
                      ref={paperInputRef}
                      type="text"
                      name="paper"
                      disabled={paperFieldDis}
                      value={formData.paper}
                      onChange={handleInputChange}
                    />
                    {paperFieldDis && (
                      <div
                        onClick={() => {
                          clearField("paper");
                        }}
                      >
                        Clear
                      </div>
                    )}
                  </div>

                  {formData.paper && !paperFieldDis && (
                    <div className={styles2.optionsContainer}>
                      {searchResultsPaper
                        .slice(0, 5)
                        .filter((item) => {
                          return formData.paper.toLowerCase() === ""
                            ? item
                            : item.name
                                .toLowerCase()
                                .includes(formData.paper.toLowerCase());
                        })
                        .map((result) => (
                          <div
                            onClick={() => handleSelect("paper", result)}
                            key={result._id}
                            className={styles2.option}
                          >
                            {result.name}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.separator}></div>
            <div className={styles.secondHalf}>
              <div className={styles.intputDiv}>
                <div className={styles.labels}>topicName</div>

                <div className={styles.inputDivInner}>
                  <div className={styles2.inputDiv}>
                    <input
                      ref={topicInputRef}
                      type="text"
                      name="topicName"
                      disabled={topicFieldDis}
                      value={formData.topicName}
                      onChange={handleInputChange}
                    />{" "}
                    {topicFieldDis && (
                      <div
                        onClick={() => {
                          clearField("topicName");
                        }}
                      >
                        Clear
                      </div>
                    )}
                  </div>
                  {formData.topicName && !topicFieldDis && (
                    <div className={styles2.optionsContainer}>
                      {searchResultsTopic
                        .slice(0, 5)
                        .filter((item) => {
                          return formData.topicName.toLowerCase() === ""
                            ? item
                            : item.name
                                .toLowerCase()
                                .includes(formData.topicName.toLowerCase());
                        })
                        .map((result) => (
                          <div
                            onClick={() => handleSelect("topicName", result)}
                            key={result._id}
                            className={styles2.option}
                          >
                            {result.name}{" "}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.intputDiv}>
                <div className={styles.labels}>subtopicName</div>

                <div className={styles.inputDivInner}>
                  <div className={styles2.inputDiv}>
                    <input
                      ref={subTopicInputRef}
                      type="text"
                      name="subtopicName"
                      disabled={subTopicFieldDis}
                      value={formData.subtopicName}
                      onChange={handleInputChange}
                    />{" "}
                    {subTopicFieldDis && (
                      <div
                        onClick={() => {
                          clearField("subtopicName");
                        }}
                      >
                        Clear
                      </div>
                    )}
                  </div>
                  {formData.subtopicName && !subTopicFieldDis && (
                    <div className={styles2.optionsContainer}>
                      {searchResultsSubTopic
                        .slice(0, 5)
                        .filter((item) => {
                          return formData.subtopicName.toLowerCase() === ""
                            ? item
                            : item.name
                                .toLowerCase()
                                .includes(formData.subtopicName.toLowerCase());
                        })
                        .map((result) => (
                          <div
                            onClick={() => handleSelect("subtopicName", result)}
                            key={result._id}
                            className={styles2.option}
                          >
                            {result.name}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
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
              {!isLoading && <span>Add Answer </span>}
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
export default AnswerForm;
