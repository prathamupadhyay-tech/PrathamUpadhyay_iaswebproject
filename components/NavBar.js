import React from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";

const NavBar = ({ logout, user }) => {
 
  return (
    <div className={styles.navbarMainContainer}>
      <div className={styles.navbarContainer}>
        <div className={styles.navEleDiv}>
          <div className={styles.logo}>
            <h1>Truely IAS</h1>
          </div>
          <div className={styles.navEle}>
            <Link href={`/`}>Home</Link>
          </div>
          <div className={styles.navEle}>
            <Link href={"/Admin/AdminPage"}>Add Questions</Link>
          </div>
        </div>

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
      </div>
    </div>
  );
};

export default NavBar;
