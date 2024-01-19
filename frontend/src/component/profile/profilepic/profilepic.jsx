import style from './profilepic.module.css'
import logo from "../../../assets/profilepic.png";

export default function Profilepic() {
    return (
        <div className={style.wrapper}>
            <div className={style.logo}>
                <img src={logo} alt="logo" />
            </div>
        </div>
    )
  }