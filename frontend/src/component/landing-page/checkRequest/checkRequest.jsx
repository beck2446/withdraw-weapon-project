import style from './checkRequest.module.css'
import { Link } from 'react-router-dom'

export default function Checkrequest() {
    return (
      <>
      <Link to="/admin/check-request" className={style.link}>
      <button className={style.button}>ตรวจสอบคำร้องการยืมอาวุธ</button>
      </Link> 
      </>
    )
  }