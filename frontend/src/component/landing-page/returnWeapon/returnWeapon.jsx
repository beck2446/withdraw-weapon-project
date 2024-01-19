import style from './returnWeapon.module.css'
import { Link } from 'react-router-dom'
export default function ReturnWeapon() {
    return (
      <>
      <Link to='return-weapon' className={style.link}>
       <button className={style.button}>ยืนยันการส่งคืนอาวุธ</button> 
       </Link>
        </>
    )
  }