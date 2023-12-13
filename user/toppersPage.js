import React from "react";
import styles from "./css/toppersPage.module.css";
import Image from "next/image";
const ToppersPage = ({ toppers }) => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.wrapper}>
        <div className={styles.PageHeadingContainer}>
          <div className={styles.PageHeading}>
            <h1>
              UPSC 2023 TOPPERS <span>RANK WISE</span>
            </h1>
          </div>
        </div>

        <div className={styles.profileView}>
          <div className={styles.profileView1}>
            <div className={styles.profileName}>
              <h1>{toppers.name.toUpperCase()}</h1>
            </div>
            <div className={styles.profileImage}>
              <div className={styles.profileImageDiv1}>
                <div className={styles.profileImageDiv2}>
                  <Image
                    src={`data:image/jpeg;base64,${toppers.ProfileImage}`}
                    fill
                    objectFit="cover"
                    objectPosition="center"
                    className={styles.userProfile}
                  ></Image>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.profileView2}>
            <div className={styles.profileRank}>
              <h1>Rank {toppers.rank}</h1>
              <h3>MARKS OBTAINED</h3>
              <div className={styles.TopperMarks}>
                <div>
                  <p>Essay:</p>
                  <div>
                    <div className={styles.meterContainer}>
                      <div
                        class={styles.meterValue}
                        style={{ width: 75 + "%" }}
                      ></div>
                    </div>
                    <p>{toppers.essayMarks}</p>
                  </div>
                </div>
                <div>
                  <p>Gs1:</p>
                  <div>
                    <div class={styles.meterContainer}>
                      <div
                        class={styles.meterValue}
                        style={{ width: 35 + "%" }}
                      ></div>
                    </div>
                    <p>{toppers.gs1marks}</p>
                  </div>
                </div>
                <div>
                  <p>Gs2:</p>
                  <div>
                    <div class={styles.meterContainer}>
                      <div
                        class={styles.meterValue}
                        style={{ width: 15 + "%" }}
                      ></div>
                    </div>
                    <p>{toppers.gs2marks}</p>
                  </div>
                </div>
                <div>
                  <p>Gs3:</p>
                  <div>
                    <div class={styles.meterContainer}>
                      <div
                        class={styles.meterValue}
                        style={{ width: 67 + "%" }}
                      ></div>
                    </div>
                    <p>{toppers.gs3marks}</p>
                  </div>
                </div>
                <div>
                  <p>Gs4:</p>
                  <div>
                    <div class={styles.meterContainer}>
                      <div
                        class={styles.meterValue}
                        style={{ width: 95 + "%" }}
                      ></div>
                    </div>
                    <p>{toppers.gs4marks}</p>
                  </div>
                </div>
                <div>
                  <p>OPTIONAL (PSIR-1):</p>
                  <div>
                    <div class={styles.meterContainer}>
                      <div
                        class={styles.meterValue}
                        style={{ width: 85 + "%" }}
                      ></div>
                    </div>
                    <p>{toppers.optional1Marks}</p>
                  </div>
                </div>
                <div>
                  <p>OPTIONAL (PSIR-2):</p>
                  <div>
                    <div class={styles.meterContainer}>
                      <div
                        class={styles.meterValue}
                        style={{ width: 55 + "%" }}
                      ></div>
                    </div>
                    <p>{toppers.optional2Marks}</p>
                  </div>
                </div>
                <div>
                  <p>WRITTEN TOTAL:</p>
                  <div>
                    <div class={styles.meterContainer}>
                      <div
                        class={styles.meterValue}
                        style={{ width: 75 + "%" }}
                      ></div>
                    </div>
                    <p>{toppers.writtenMarks}</p>
                  </div>
                </div>
                <div>
                  <p>PERSONALITY TEST :</p>
                  <div>
                    <div class={styles.meterContainer}>
                      <div
                        class={styles.meterValue}
                        style={{ width: 75 + "%" }}
                      ></div>
                    </div>
                    <p>{toppers.interviewMarks}</p>
                  </div>
                </div>
                <div className={styles.finalMarks}>
                  <p>FINAL TOTAL :</p>
                  <div>
                    <div class={styles.meterContainer}>
                      <div
                        class={styles.meterValue}
                        style={{ width: 75 + "%" }}
                      ></div>
                    </div>
                    <p>120</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.RemarkSection}>
          <div className={styles.remarkDiv}>
            <p>
              {toppers.Remarks}
            </p>
          </div>
        </div>
        <div className={styles.toppersAnswersSection}>
          <div className={styles.toppersAnswersDiv}>
            <div className={styles.toppersAnswersHeading}>
              <h1>ESSAY AND COPIES - <span>{toppers.essayMarks}</span> MARKS</h1>

            </div>
            <div>
            <div className={styles.toppersAnswers}>PDF1</div>
            <div className={styles.toppersAnswers}>PDF1</div>
            <div className={styles.toppersAnswers}>PDF1</div>
            <div className={styles.toppersAnswers}>PDF1</div>
            <div className={styles.toppersAnswers}>PDF1</div>
            </div>
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default ToppersPage;
