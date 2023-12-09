"use client";

import React from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";

const NavBar = ({ logout, user }) => {
  const [hiddenNav, sethiddenNav] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false);

  const handleMenu = () => {
    sethiddenNav(!hiddenNav);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 540) {
        setShowHamburger(true);
      } else {
        setShowHamburger(false);
      }
    };

    // Set the initial state based on the window width
    handleResize();

    // Attach the event listener for window resize
    window.addEventListener("resize", handleResize);

    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      {" "}
      {hiddenNav && (
        <div className={styles.navbarHidden}>
          <div className={styles.navEle}>
            <Link href={"/"}>Home</Link>
          </div>
          <div className={styles.navEle}>
            <Link href={`/Admin/AdminPage`}>Add Questions</Link>
          </div>
          <div className={styles.navEle}>
            <Link href={"/Admin/Toppers"}>Add Topper</Link>
          </div>
          <div className={styles.navEle}>
            <Link href={"/form/AnswerForm"}>Add Answers</Link>
          </div>
          <div className={styles.navEle}>
            <Link href={"/form/pyqs"}>Add Pyqs </Link>
          </div>
          {user.value && (
            <button onClick={logout} className={styles.loginBtn}>
              Logout
            </button>
          )}
          {!user.value && (
            <Link href={`/login/LoginPage`}>
              {" "}
              <button className={styles.loginBtn}>Login</button>
            </Link>
          )}
        </div>
      )}
      <div className={styles.navbarMainContainer}>
        <div className={styles.navbarContainer}>
          <div className={styles.navEleDiv}>
            <div className={styles.logo}>
              <h1>Truly IAS</h1>
            </div>
            {!showHamburger && (
              <>
                <div className={styles.navEle}>
                  <Link href={"/"}>Home</Link>
                </div>
                <div className={styles.navEle}>
                  <Link href={`/Admin/AdminPage`}>Add Questions</Link>
                </div>
                <div className={styles.navEle}>
                  <Link href={"/Admin/Toppers"}>Add Topper</Link>
                </div>
                <div className={styles.navEle}>
                  <Link href={"/form/AnswerForm"}>Add Answers</Link>
                </div>
                <div className={styles.navEle}>
                  <Link href={"/form/pyqs"}>Add Pyqs </Link>
                </div>
                <div className={styles.navEle}>
                  <Link href={"/form/CurrentAffairsForm"}>
                    Add CurrentAffairs{" "}
                  </Link>
                </div>
              </>
            )}
          </div>

          {!showHamburger && (
            <div className={styles.loginBtnDiv}>
              {user.value && (
                <button onClick={logout} className={styles.loginBtn}>
                  Logout
                </button>
              )}
              {!user.value && (
                <Link href={`/login/LoginPage`}>
                  {" "}
                  <button className={styles.loginBtn}>Login</button>
                </Link>
              )}
            </div>
          )}
          {showHamburger && (
            <div onClick={handleMenu} className={styles.hamburger}>
              <div
                className={`${styles.hamburgerLine1} ${
                  hiddenNav ? styles.hamburgerLine1Change : ""
                }`}
              ></div>
              <div
                className={`${styles.hamburgerLine2} ${
                  hiddenNav ? styles.hamburgerLine2Change : ""
                }`}
              ></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;
