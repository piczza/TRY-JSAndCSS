import React from "react";
import styles from "../LoginPage.module.css";

function SignUpSection() {
  return (
    <div>
      {" "}
      <div className={styles.signup_container}>
        <div className={styles.signup_container_name}>계정이 없으신가요?</div>
        <button className={styles.signup_btn}>SignUp</button>
      </div>
    </div>
  );
}

export default SignUpSection;
