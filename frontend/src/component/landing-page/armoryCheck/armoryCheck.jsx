import style from './armoryCheck.module.css'
import { Link } from 'react-router-dom'

export default function armoryCheck() {
    return (
      <>
      <Link to="armory" className={style.link}>
      <button className={style.button}>ตรวจสอบคลัง</button>
      </Link> 
      </>
    )
  }