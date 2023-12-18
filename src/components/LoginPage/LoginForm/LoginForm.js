import React, { useState } from "react";
import styles from "../LoginPage.module.css";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../models/firebase";

function LoginForm() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const handleChange = (e) => {
    setId(e.target.value);
  };

  const handleChange2 = (e) => {
    setPw(e.target.value); //e.target.value의 value값은 변수명이 아니라 진짜 데이터의 속성값
  };

  const navigate = useNavigate();

  const signIn = (e) => {
    signInWithEmailAndPassword(auth, id, pw)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        navigate("/");
        alert("환영합니다.");
      })
      .catch((error) => {
        alert("로그인 정보가 맞지 않습니다.");
      });
  };
  return (
    <div>
      {" "}
      <div className={styles.login_space}>
        <form className={styles.login_space_inner}>
          <div className={styles.login_id_container}>
            <div className={styles.login_id_name}>ID</div>
            <input
              value={id}
              onChange={handleChange}
              className={styles.login_id_input}
              type="text"
              required
            ></input>
          </div>
          <div className={styles.login_pw_container}>
            <div className={styles.login_pw_name}>Password</div>
            <input
              value={pw}
              onChange={handleChange2}
              className={styles.login_pw_input}
              type="password"
              required
            ></input>
          </div>
          <div className={styles.login_btn_space}>
            <button
              onClick={(e) => {
                e.preventDefault();
                signIn();
              }}
              className={styles.login_submit_btn}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
