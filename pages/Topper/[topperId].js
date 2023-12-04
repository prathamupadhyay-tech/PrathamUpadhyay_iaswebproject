import React from "react";
import styles from "./[topperId].module.css";
import Link from "next/link";
import mongoose from "mongoose";
import { useRouter } from "next/router";
import topper from "@/models/topper";
import Image from "next/image";
const TopperCard = ({ toppers }) => {
  const router = useRouter();
  const { topperId } = router.query;

  return (
    <div className={styles.TopperTopContainer}>
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
                fill
                priority
                objectFit="cover"
                objectPosition="center"
                src={`data:image/jpeg;base64,${toppers.ProfileImage}`}
              ></Image>
            </div>
            <div className={styles.TopperDetailsDivs}>
              <label htmlFor="">Username</label>
              <div className={styles.TopperName}>{toppers.name}</div>
            </div>

            <div className={styles.TopperDetailsDivs}>
              <label htmlFor="">Optional Subject</label>
              <div className={styles.TopperSub}>{toppers.optionalSub}</div>
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
                <div>{toppers.gs1marks}</div>
              </div>
              <div className={styles.GsMarksDiv}>
                <h2>Gs 2</h2>
                <div>{toppers.gs2marks}</div>
              </div>
              <div className={styles.GsMarksDiv}>
                <h2>Gs 3</h2>
                <div>{toppers.gs3marks}</div>
              </div>
              <div className={styles.GsMarksDivLast}>
                <h2>Gs 4</h2>
                <div>{toppers.gs4marks}</div>
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
              <p>{toppers.Remarks}</p>
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
              <div>{toppers.essayMarks}</div>
            </div>
            <div className={styles.preliemsGs}>
              <h2>Prelims score gs</h2>
              <div>{toppers.prelimsScoreGs}</div>
            </div>
            <div className={styles.Scores}>
              <h2>Prelims score csat</h2>
              <div>{toppers.prelimsScoreCsat}</div>
            </div>
            <div className={styles.Optional1}>
              <h2>Optional 1 marks</h2>
              <div>{toppers.optional1Marks}</div>
            </div>
            <div className={styles.Scores}>
              <h2>Optional 2 marks</h2>
              <div>{toppers.optional2Marks}</div>
            </div>
          </div>

          <div className={styles.TopperShowAnswersBtn}>
            <Link href={`/Topper/${topperId}/Answer/TopperAnswers`}>
              <div>Answers</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export async function getServerSideProps(context) {
  try {
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGO_URI);
    }
    const { topperId } = context.query;

    const [slugName, rankandyear] = topperId.split("-rank-");

    const [rank, year] = rankandyear.split("-");

    const name = slugName.replace(/-/g, " ");
    const parsedRank = parseInt(rank, 10);
    const parsedYear = parseInt(year, 10);

    const toppers = await topper.findOne({
      name,
      rank: parsedRank,
      year: parsedYear,
    });
    
    return {
      props: { toppers: JSON.parse(JSON.stringify(toppers)) },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return {
      props: { toppers: "" },
    };
  }
}
export default TopperCard;
