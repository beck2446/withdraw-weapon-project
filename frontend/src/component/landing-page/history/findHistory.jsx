import style from './findHistory.module.css'
import { Link } from 'react-router-dom'

export default function Findhistory(props) {
    return (
      <Link to='search' className={style.link}>
        <button className={style.button}>สืบค้นประวัติการยืมอาวุธ</button>
        </Link>
      
      
    )
  }