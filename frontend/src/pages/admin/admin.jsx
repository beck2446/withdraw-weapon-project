import React from "react";
import style from "./admin.module.css";
import Profile from '../../component/landing-page/profile/profile'
import Borrow from '../../component/landing-page/borrow/borrow'
import FindHistory from '../../component/landing-page/history/findHistory'
import CheckRequest from '../../component/landing-page/checkRequest/checkRequest'

export default function admin() {
  return (
    <div className={style.wrapper}>
      <Profile />
      <Borrow />
      <FindHistory role='admin'/>
      <CheckRequest />
    </div>
  );
}
