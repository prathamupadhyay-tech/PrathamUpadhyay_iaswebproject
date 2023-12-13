"use client";

import React, { useRef } from "react";
import { useEffect, useState } from "react";
import styles from "./css/Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import profileAvatar from "./icons/836.jpg";
const Navbar = () => {
  const [hiddenNav, sethiddenNav] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false);

  const handleMenu = () => {
    sethiddenNav(!hiddenNav);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setShowHamburger(true);
      } else {
        setShowHamburger(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
   <div className={styles.navBarMainContainer}>
     <div className={styles.navbarWrapper}>
      {showHamburger && hiddenNav && (
        <div className={`${styles.navbarHidden}`}>
          <div className={styles.navEle}>
            <Link href={"/"}>Home</Link>
          </div>
          <div className={styles.navEle}>
            <Link href={""}> Subject Topper</Link>
          </div>
          <div className={styles.navEle}>
            <Link href={""}> Contact </Link>
          </div>
          <div className={styles.navEle}>
            <Link href={""}> About</Link>
          </div>
        </div>
      )}

      <div className={styles.NavbarContainer}>
        <div className={styles.icon}>
          <h1>Truly Ias</h1>
        </div>
        {!showHamburger && (
          <div className={styles.NavbarDiv}>
            <div className={styles.Navbar}>
              <div
                className={`${styles.NavbarElements} ${styles.NavbarElementsSelect}`}
              >
                <Link href={""}> Home</Link>
              </div>
              <div className={styles.NavbarElements}>
                <Link href={""}> Subject Topper</Link>
              </div>
              <div className={styles.NavbarElements}>
                <Link href={""}> Contact </Link>
              </div>
              <div className={styles.NavbarElements}>
                <Link href={""}> About</Link>
              </div>
            </div>
          </div>
        )}
        {!showHamburger && (
          <div className={styles.LoginDiv}>
            <Image
              src={profileAvatar}
              fill
              objectFit="cover"
              objectPosition="center"
              className={styles.loginBtn}
            ></Image>
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
   </div>
  );
};

export default Navbar;
