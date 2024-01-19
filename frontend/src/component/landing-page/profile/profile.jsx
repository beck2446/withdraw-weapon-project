import { Link } from 'react-router-dom';
import style from './profile.module.css';

export default function Profile() {
  return (
    <Link to="/profile" className={style.link}>
      <button className={style.button}>ประวัติส่วนตัว</button>
    </Link>
  );
}
