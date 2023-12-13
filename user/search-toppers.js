import React from "react";
import styles from "./css/search-topper.module.css";
import Image from "next/image";
import { useState } from "react";
import searchIcon from "./icons/search.png";
import UserCard from "./UserCard";
import profileAvatar from "./icons/836.jpg";
import Link from "next/link";
import Navbar from "./Navbar";
const SearchTopper = ({ Toppers }) => {
  const [selectedOption, setSelectedOption] = useState("AllAsc");
  console.log(Toppers);
  const handleSortingOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
  };
  return (
    <div className={styles.MainContainer}>
      <div className={styles.Wrapper}>
        <div className={styles.PageHeadingContainer}>
          <div className={styles.PageHeading}>
            <h1>
              UPSC 2023 TOPPERS <span>RANK WISE</span>
            </h1>
          </div>
        </div>
        <div className={styles.FilterOptionsContainer}>
          <div className={styles.SearchBar}>
            <div className={styles.SearchIconDiv}>
              <Image
                src={searchIcon}
                fill
                objectFit="cover"
                objectPosition="center"
                className={styles.searchIcon}
              ></Image>
            </div>
            <input
              type="text"
              className={styles.Search}
              placeholder="Search-toppers/rank/optional-subjects...."
            />
          </div>
          <div className={styles.FilterDiv}>
            <p>Filter By:</p>
            <select
              name="sortingOption"
              value={selectedOption}
              className={styles.Filter}
              onChange={handleSortingOptionChange}
            >
              <option value="AllAsc">All (Asc Order)</option>
              <option value="AllDsc">All (Des Order)</option>
              <option value="Latest">Latest</option>
              <option value="lasthr">last hours</option>
              <option value="lastday">last days</option>
              <option value="lastmonth">last months</option>
            </select>
          </div>
        </div>

        <div className={styles.TopperGalaryDiv}>
          {Toppers.map((data, index) => {
            return <UserCard data={data} key={index}></UserCard>;
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchTopper;
