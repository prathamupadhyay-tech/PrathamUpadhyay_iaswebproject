import React from "react";
import styles from "./TopperCard.module.css";
import Image from "next/image";
const TopperCard = ({ topperData, onClose }) => {
  return (
    <div className={styles.TopperTopContainer}>
      <div className={styles.Cross} onClick={onClose}>
        <div className={styles.Cross1}></div>
        <div className={styles.Cross2}></div>
      </div>
      <div className={styles.TopperCardMainContainer}>
        <div className={styles.TopperDetails}>
          <div
            className={`${styles.TopperDetails1} ${styles.TopperDetailsMain}`}
          >
            <div className={styles.editBtnDiv}>
              <Image
                className={styles.editIcon}
                alt="Description of the image"
                width={20}
                height={20}
                src={"/edit.png"}
              ></Image>
            </div>
            <div className={styles.TopperProfileImgdiv}>
              <Image
                className={styles.TopperProfileImg}
                alt="Description of the image"
                width={120}
                height={120}
                src={"/user.png"}
              ></Image>
            </div>
            <div className={styles.TopperDetailsDivs}>
              <label htmlFor="">Username</label>
              <div className={styles.TopperName}>{topperData.name}</div>
            </div>

            <div className={styles.TopperDetailsDivs}>
              <label htmlFor="">Optional Subject</label>
              <div className={styles.TopperSub}>{topperData.optionalSub}</div>
            </div>
          </div>

          <div className={styles.Topper2Section}>
            <div className={styles.editBtnDiv}>
              <Image
                className={styles.editIcon}
                alt="Description of the image"
                width={20}
                height={20}
                src={"/edit.png"}
              ></Image>
            </div>
            <h1 className={styles.Topper2SectionHead}>General studies marks</h1>
            <div className={styles.TopperGsContainer}>
              <div className={styles.GsMarksDiv}>
                <h2>Gs 1</h2>
                <div>{topperData.gs1marks}</div>
              </div>
              <div className={styles.GsMarksDiv}>
                <h2>Gs 2</h2>
                <div>{topperData.gs2marks}</div>
              </div>
              <div className={styles.GsMarksDiv}>
                <h2>Gs 3</h2>
                <div>{topperData.gs3marks}</div>
              </div>
              <div className={styles.GsMarksDivLast}>
                <h2>Gs 4</h2>
                <div>{topperData.gs4marks}</div>
              </div>
            </div>
          </div>

          <div className={styles.Topper3Section}>
            <div className={styles.editBtnDiv1}>
              <Image
                className={styles.editIcon}
                alt="Description of the image"
                width={20}
                height={20}
                src={"/edit.png"}
              ></Image>
            </div>
            <div className={styles.TopperRemark}>
              <h2>Remarks</h2>
              <p>{topperData.Remarks}</p>
            </div>
          </div>
        </div>
        <div className={styles.Topper4Section}>
          <div className={styles.editBtnDiv1}>
            <Image
              className={styles.editIcon}
              alt="Description of the image"
              width={20}
              height={20}
              src={"/edit.png"}
            ></Image>
          </div>
          <div className={styles.Topper4Head}>
            <h1>Profile Scores</h1>
          </div>
          <div className={styles.scoresDiv}>
            <div className={styles.Scores}>
              <h2>Essay Marks</h2>
              <div>{topperData.essayMarks}</div>
            </div>
            <div className={styles.preliemsGs}>
              <h2>Prelims score gs</h2>
              <div>{topperData.prelimsScoreGs}</div>
            </div>
            <div className={styles.Scores}>
              <h2>Prelims score csat</h2>
              <div>{topperData.prelimsScoreCsat}</div>
            </div>
            <div className={styles.Optional1}>
              <h2>Optional 1 marks</h2>
              <div>{topperData.optional1Marks}</div>
            </div>
            <div className={styles.Scores}>
              <h2>Optional 2 marks</h2>
              <div>{topperData.optional2Marks}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopperCard;
