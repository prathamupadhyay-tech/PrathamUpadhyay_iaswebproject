import React from "react";
import Image from "next/image";
import styles from "./css/UserCard.module.css";
import profileAvatar from "./icons/836.jpg";
import Link from "next/link";
const UserCard = ({ data }) => {
  return (
    <div className={styles.TopperCard}>
      <div className={styles.TopperFirstDiv}>
        <div className={styles.TopperDetailsDiv}>
          <div className={styles.TopperIconOuterDiv}>
            <div className={styles.TopperIconDiv}>
              <Image
                src={`data:image/jpeg;base64,${data._doc.ProfileImage}`}
                fill
                objectFit="cover"
                objectPosition="center"
                className={styles.userProfile}
              ></Image>
            </div>
          </div>
          <div className={styles.TopperName}>
            <p>Rank {data._doc.rank}</p>
            <h3>{data._doc.name}</h3>
          </div>
        </div>
        <div className={styles.TopperMarksDiv}>
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
                <p>{data._doc.essayMarks}</p>
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
                <p>{data._doc.gs1marks}</p>
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
                <p>{data._doc.gs2marks}</p>
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
                <p>{data._doc.gs3marks}</p>
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
                <p>{data._doc.gs4marks}</p>
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
                <p>{data._doc.optional1Marks}</p>
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
                <p>{data._doc.optional2Marks}</p>
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
                <p>{data._doc.writtenMarks}</p>
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
                <p>{data._doc.interviewMarks}</p>
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
      <div className={styles.ShowAnswersBtn}>
        <Link href={`/user/topperpage/${data.slug}`}>
          <button>View Answer Sheet</button>
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
