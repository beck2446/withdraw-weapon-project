import style from './deliverWeapon.module.css'
import { Link } from 'react-router-dom'

export default function DeliverWeapon() {
    return (
      <>
      <Link to="deliver-weapon" className={style.link}>
      <button className={style.button}>ยืนยันการส่งมอบอาวุธ</button> 
      </Link>
      </>
    )
  }