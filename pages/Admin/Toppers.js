import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Topper.module.css";
import topper from "@/models/topper";
import { useState } from "react";
import mongoose from "mongoose";
import TopperCard from "@/components/TopperCard";
const Toppers = ({ toppers }) => {
  const [selectedTopper, setSelectedTopper] = useState(null);

  const handleTopperClick = (data) => {
    setSelectedTopper(data);
  };
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
                    <div className={styles.viewProfile}>
                      <button onClick={() => handleTopperClick(data)}>
                        {" "}
                        View Profile
                      </button>
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
