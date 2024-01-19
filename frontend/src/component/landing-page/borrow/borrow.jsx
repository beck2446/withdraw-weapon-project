import style from './borrow.module.css'
import { Link } from 'react-router-dom'

export default function Borrow() {
    return (
      <Link to="/request" className={style.link}>
      <button className={style.button}>ยืมอาวุธ</button>
    </Link>
    )
  }