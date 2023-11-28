import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Topper.module.css";
import topper from "@/models/topper";
import { useState } from "react";
import mongoose from "mongoose";

const Toppers = ({ toppers }) => {
  const [selectedTopper, setSelectedTopper] = useState(null);

  console.log(toppers);
  return (
    <div>
      <div className={styles.mainTopperContainer}>
        <div className={styles.wrapper}>
          <div className={styles.TopperHeadContainer}>
            <div>
              <h1>Toppers</h1>
            </div>
            <button>
              {" "}
              <Link href={"/form/TopperForm"}>+ Add Topper</Link>
            </button>
          </div>
          <div className={styles.TopperContainer}>
            {toppers &&
              toppers.map((data, index) => {
                console.log(data);
                return (
                  <div key={index} className={styles.TopperDetails}>
                    <div className={styles.optionsIconDiv}>
                      <Image
                        className={styles.optionsIcon}
                        src={"/option.png"}
                        width={25}
                        height={25}
                      ></Image>
                    </div>
                    <div
                      className={`${styles.TopperDetails1} ${styles.TopperDetailsMain}`}
                    >
                      <div className={styles.TopperProfileImgdiv}>
                        <Image
                          className={styles.TopperProfileImg}
                          alt="Description of the image"
                          width={150}
                          height={150}
                          src={"/user.png"}
                        ></Image>
                      </div>
                      <div className={styles.TopperDetailsDivs}>
                        <div className={styles.TopperName}>
                          {data._doc.name}
                        </div>
                      </div>

                      <div className={styles.TopperDetailsDivs1}>
                        <div>
                          <span>Rank: </span> {data._doc.rank}
                        </div>

                        <div>
                          <span>Year: </span>
                          {data._doc.year}
                        </div>
                      </div>
                      <div className={styles.TopperProfileView}>
                        <Link href={`/Topper/${data.slug}`}>
                          <button> View Profile</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>{" "}
          {selectedTopper && (
            <TopperCard
              topperData={selectedTopper}
              onClose={() => setSelectedTopper(null)}
            />
          )}
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

    const slugs = toppers.map((data) => {
      const slug = `${data.name}-${data.rank}-${data.year}`;
      return { ...data, slug };
    });
    console.log(slugs);
    return {
      props: { toppers: JSON.parse(JSON.stringify(slugs)) },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return {
      props: { toppers: [] },
    };
  }
}
export default Toppers;
