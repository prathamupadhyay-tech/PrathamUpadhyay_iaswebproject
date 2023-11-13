"use client";
import LoginCred from "@/components/LoginCred";
import React, { useState } from "react";
import styles from "./LoginPage.module.css";
import facebook from "./imgs/facebook.png";
import github from "./imgs/github.png";
import social from "./imgs/social.png";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Cookies from "js-cookie";
const jwt = require("jsonwebtoken");
const LoginPage = () => {
  const router = useRouter();
  const [emailAlert, setEmailAlert] = useState(false);
  const [passAlert, setPassAlert] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setEmailAlert(false);
    setPassAlert(false);
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userData.email) {
      setEmailAlert(true);
    } else if (!userData.password) {
      setPassAlert(true);
    } else if (!userData) {
      setEmailAlert(true);
      setPassAlert(true);
    } else if (userData && LoginCred) {
      if (userData.email === LoginCred.email) {
        if (userData.password === LoginCred.password) {
          var token = jwt.sign(
            { email: userData.email },
            process.env.NEXT_PUBLIC_JWT_SECRET,
            {
              expiresIn: "2d",
            }
          );
          Cookies.set("authToken", token);
          localStorage.setItem("token", token);
          router.push("/Admin/AdminPage");
        } else {
          alert("wrong password");
        }
      } else {
        alert("no email found");
      }
    }
  };
  return (
    <div className={styles.all}>
      <div className={styles.loginMainContainer}>
        <div className={styles.loginContainer}>
          <div className={styles.loginHeading}>
            <h1>Truely</h1>
            <h2>IAS</h2>
          </div>

          <form className={styles.loginForm} action="">
            {/* <div className={styles.optionDiv}>
              <div>
                <input type="radio" id="admin" name="userType" value="admin" />
                <label for="admin">Admin</label>
              </div>

              <div>
                <input type="radio" id="user" name="userType" value="user" />
                <label for="user">User</label>
              </div>
            </div> */}

            <div className={styles.inputDiv}>
              <input
                type="email"
                placeholder="Email (Dummy pratham@gmail.com)"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
              />
              {emailAlert && <p>Email is needed!</p>}
            </div>

            <div className={styles.inputDiv}>
              <input
                type="password"
                placeholder="Password (Dummy hello#12)"
                name="password"
                value={userData.password}
                onChange={handleInputChange}
              />
              {passAlert && <p>Password is needed!</p>}
            </div>
            <div className={styles.loginBtnDiv}>
              <button onClick={handleSubmit} className={styles.loginBtn}>
                Sign in
              </button>
              <div className={styles.subOptions}>
                <a href="">forget password?</a>
                <a href="">Sign up</a>
              </div>
            </div>

            <div className={styles.otherOptions}>
              <p>Or you can login using </p>
              <div className={styles.otherOptionsIconDiv}>
                <Image className={styles.icons} href="" src={facebook}></Image>
                <Image className={styles.icons} href="" src={github}></Image>
                <Image className={styles.icons} href="" src={social}></Image>
              </div>
            </div>
            <div className={styles.policy}>
              <p>
                {" "}
                This site is protected by reCAPTCHA and the Google Privacy
                Policy and Terms of Service apply.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
