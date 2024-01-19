import React from "react";
import style from "./submitTable.module.css";
import { useLocation } from "react-router-dom";

export default function SubmitTable(props) {
  const location = useLocation();
  const weapon = location.state.uniqueWeaponInfo;

  props.setWeapon(weapon)

  return (
    <div className={style.wrapper}>
      <div className={style.table_wrapper}>
        <div className={style.row}>
          <div className={style.type}>
            <h2>Weapon name</h2>
          </div>
          <div className={style.armory}>
            <h2>weapon type</h2>
          </div>
          <div className={style.name}>
            <h2>amount</h2>
          </div>
          <div className={style.available}>
            <h2>armory name</h2>
          </div>
          <div className={style.count}>
            <h2>borrow date</h2>
          </div>
          <div className={style.count}>
            <h2>return date</h2>
          </div>
        </div>

        {weapon.map((val) => {
          return (
            <>
              <div className={style.row}>
                
                <div>
                  <p>{val.weaponName}</p>
                </div>
                <div>
                  <p>{val.weaponType}</p>
                </div>
                <div>
                  <p>{val.amount}</p>
                </div>
                <div>
                  <p>{val.armoryName}</p>
                </div>
                <div>
                  <p>{val.borrowDate}</p>
                </div>
                <div>
                  <p>{val.returnDate}</p>
                </div>
              </div>
              <hr className={style.hr} />
            </>
          );
        })}
      </div>

    </div>
  );
}
