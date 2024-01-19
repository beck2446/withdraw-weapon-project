import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../lib/axios";
import style from "./login.module.css";
import logo from "../../assets/logo.png";
import pic from "../../assets/weapon.png";

export default function Login() {
  const username = useRef();
  const password = useRef();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    axios
      .post(
        "http://localhost:8000/login",
        {
          username: username.current.value,
          password: password.current.value,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data.role)
          if (response.data.role === "regular") {
            navigate("/homepage");
          } else if (response.data.role === "admin") {
            navigate("/admin");
          } else if(response.data.role === "guard") {
            navigate("/guard");
          }
        }
      })
      .catch((err) => {
        console.log(err);
        setMessage("Invalid username or password");
      });
  }
  return (
    <>
      <div className={style.wrapper}>
        <div className={style.left}>
          <div className={style.nav}>
            <div className={style.logo}>
              <img src={logo} alt="logo" />
            </div>
            <div className={style.armanent}>
              <h1>ARMDNENT DEPOT</h1>
            </div>
          </div>

          <div className={style.form}>
            <div className={style.header}>
              <h1>ลงชื่อเข้าใช้</h1>
            </div>

            <div className={style.body}>
              <form onSubmit={handleSubmit}>
                <div className={style.each_input}>
                  <h3>เลขประจำตัว</h3>
                  <input
                    className={style.login_input}
                    type="text"
                    required
                    ref={username}
                  />
                </div>

                <div className={style.each_input}>
                  <h3>รหัสผ่าน</h3>
                  <input
                    className={style.login_input}
                    type="password"
                    required
                    ref={password}
                  />
                </div>
                <br />
                <button className={style.button}>
                  <h4>เข้าสู่ระบบ</h4>
                </button>
                <div className={style.error}>
                  <h3>{message}</h3>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className={style.right}>
          <img src={pic} alt="" />
          <div className={style.message}>
            <div className={style.head}>
              <h2>ระบบยืม-คืนอาวุธกองทัพ</h2>
            </div>

            <div className={style.info}>
              <p>
                เว็บไซต์ที่จัดทำขึ้นมาเพื่อช่วยเหลือในการทำเรื่องยืม-คืนอาวุธภายในกองทัพของประเทศไทย
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
