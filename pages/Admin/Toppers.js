import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Topper.module.css";
import topper from "@/models/topper";
import mongoose from "mongoose";
const Toppers = ({ toppers }) => {
  return (
    <div>
      <div className={styles.mainTopperContainer}>
        <div>
          <button>
            {" "}
            <Link href={"/form/TopperForm"}>+ Add Topper</Link>
          </button>
        </div>
        <div className={styles.TopperContainer}>
          {toppers &&
            toppers.map((data, index) => {
              return (
                <div key={index} className={styles.TopperDetails}>
                  <div
                    className={`${styles.TopperDetails1} ${styles.TopperDetailsMain}`}
                  >
                    <div className={styles.TopperProfileImgdiv}>
                      <Image
                        className={styles.TopperProfileImg}
                        alt="Description of the image"
                        width={200}
                        height={200}
                        src={"/836.jpg"}
                      ></Image>
                    </div>
                    <div className={styles.TopperDetailsDivs}>
                      <div className={styles.TopperName}>{data.name}</div>
                    </div>

                    <div className={styles.TopperDetailsDivs1}>
                      <div>
                        <span>Rank: </span> {data.rank}
                      </div>

                      <div>
                        <span>Year: </span>
                        {data.year}
                      </div>
                    </div>
                    {/* <div className={styles.TopperRemarks}>
                <label htmlFor="">Remark:</label>

                <div>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Eaque possimus minima modi quidem vero reprehenderit quisquam
                  repellat ipsum ut explicabo.
                </div>
              </div> */}
                  </div>
                  {/* <div
              className={`${styles.TopperDetails2} ${styles.TopperDetailsMain}`}
            >
              <div className={styles.TopperDetailsDivs}>
                <label htmlFor="">Gs1 marks:</label>
                <div>200</div>
              </div>
              <div className={styles.TopperDetailsDivs}>
                <label htmlFor="">Gs2 marks:</label>
                <div>200</div>
              </div>
              <div className={styles.TopperDetailsDivs}>
                <label htmlFor="">Gs3 marks:</label>
                <div>200</div>
              </div>
              <div className={styles.TopperDetailsDivs}>
                <label htmlFor="">Gs4 marks:</label>
                <div>200</div>
              </div>
            </div>
            <div
              className={`${styles.TopperDetails3} ${styles.TopperDetailsMain}`}
            >
              <div className={styles.TopperDetailsDivs}>
                <label htmlFor="">Eassy marks:</label>
                <div>200</div>
              </div>

              <div className={styles.TopperDetailsDivs}>
                <label htmlFor="">Prelims Score gs:</label>
                <div>200</div>
              </div>
              <div className={styles.TopperDetailsDivs}>
                <label htmlFor="">Prelims Score csat:</label>
                <div>200</div>
              </div>
            </div>
            <div
              className={`${styles.TopperDetails4} ${styles.TopperDetailsMain}`}
            >
              <div className={styles.TopperDetailsDivs}>
                <label htmlFor="">Optional Subject:</label>
                <div>Economyy</div>
              </div>
              <div className={styles.TopperDetailsDivs}>
                <label htmlFor="">Optional 1 marks:</label>
                <div>200</div>
              </div>
              <div className={styles.TopperDetailsDivs}>
                <label htmlFor="">Optional 2 marks:</label>
                <div>200</div>
              </div>
            </div> */}
                </div>
              );
            })}
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

    let toppers = await topper.find();

    return {
      props: { toppers: JSON.parse(JSON.stringify(toppers)) },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return {
      props: { toppers: [] },
    };
  }
}
export default Toppers;
