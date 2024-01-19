import React from 'react'
import { Link } from "react-router-dom";
import style from "./title.module.css"

function Title() {
  return (
    <>
      <div className={style.Title}>Deliver Weapon</div>
      <div className={style.line}></div>
      </>
  )
}

export default Title