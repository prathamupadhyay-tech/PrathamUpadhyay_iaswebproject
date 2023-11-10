"use client";
import LoginCred from "@/components/LoginCred";
import React, { useState } from "react";
import styles from "./LoginPage.module.css";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
const jwt = require("jsonwebtoken");
const LoginPage = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userData && LoginCred) {
      if (userData.email === LoginCred.email) {
        if (userData.password === LoginCred.password) {
          var token = jwt.sign({ email: userData.email }, "jwtsecret", {
            expiresIn: "2d",
          });
          console.log(token);
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
            <h1>Login</h1>
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
              <div>Email</div>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.inputDiv}>
              <div>Password</div>
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.loginBtnDiv}>
              <button onClick={handleSubmit} className={styles.loginBtn}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
