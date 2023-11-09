import React from "react";
import styles from "./LoginPage.module.css";
const LoginPage = () => {
  return (
    <div className={styles.all}>
      <div className={styles.loginMainContainer}>
        <div className={styles.loginContainer}>
          <div className={styles.loginHeading}>
            <h1>Login</h1>
          </div>

          <form className={styles.loginForm} action="">
            <div className={styles.inputDiv}>
              <div>Email</div>
              <input type="text" />
            </div>

            <div className={styles.inputDiv}>
              <div>Password</div>
              <input type="password" />
            </div>
            <div className={styles.loginBtnDiv}>
            <button className={styles.loginBtn}>Submit</button>
            </div>
           
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
