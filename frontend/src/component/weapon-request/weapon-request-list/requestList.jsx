import React, { useEffect, useState } from "react";
import style from "../weapon-list/weaponList.module.css";
import { useNavigate } from 'react-router-dom';

export default function RequestList(props) {
  const navigate = useNavigate()

  const [borrowDates, setBorrowDates] = useState({});

  let uniqueWeaponInfo = props.wishList.reduce((accumulator, current) => {
    const isDuplicate = accumulator.some(
      (item) => item.weaponName === current.weaponName
    );
    if (!isDuplicate) {
      accumulator.push({ ...current, borrowDate: borrowDates[current.weaponName] || "" });
    }
    return accumulator;
  }, []);

  const handleBorrowDate = (val, borrowDate) => {
    const updatedWeaponInfo = uniqueWeaponInfo.map((weapon) => {
      if (weapon.weaponName === val.weaponName) {
        return { ...weapon, borrowDate: borrowDate };
      }
      return weapon;
    });
    uniqueWeaponInfo= updatedWeaponInfo 
    console.log(uniqueWeaponInfo)
  };

  const handleReturnDate = (val, returnDate) => {
    const updatedWeaponInfo = uniqueWeaponInfo.map((weapon) => {
      if (weapon.weaponName === val.weaponName) {
        return { ...weapon, returnDate: returnDate };
      }
      return weapon;
    });
    uniqueWeaponInfo= updatedWeaponInfo 
    console.log(uniqueWeaponInfo)
  };
  

  if (props.wishList.length === 0) {
    return null;
  }

  return (
      
    <div className={style.wrapper}>
      <div className={style.header}>
        <h1>request list</h1>
      </div>

      <div className={style.table_wrapper}>
        <div className={style.row}>
          <div className={style.name}>
            <h2>Weapon name</h2>
          </div>
          <div className={style.type}>
            <h2>Weapon type</h2>
          </div>
          <div className={style.armory}>
            <h2>Armory name</h2>
          </div>
          <div className={style.available}>
            <h2>amount</h2>
          </div>
          <div className={style.count}>
            <h2>borrow date</h2>
          </div>
          <div>
            <h2>return date</h2>
          </div>
        </div>

        {uniqueWeaponInfo.map((val) => {
          return (
            <>
            <div className={style.row}>
              <div className={style.name}>
                <h3>{val.weaponName}</h3>
              </div>
              <div className={style.type}>
                <p>{val.weaponType}</p>
              </div>
              <div className={style.armory}>
                <p>{val.armoryName}</p>
              </div>
              <div className={style.available}>
                <p>{val.amount}</p>
              </div>
              <div className={style.count}>
                <div className={style.amout_wrapper}>
                  <input type="date" className={style.input_date} onChange={(e) => handleBorrowDate(val, e.target.value)}/>
                </div>
              </div>
              <div className={style.button}>
                <input type="date" className={style.input_date} onChange={(e) => handleReturnDate(val, e.target.value)}/>
              </div>
              
            </div>
            <hr className={style.hr} />
            
            
          </>
            
          );
        })}
      </div>
     
      <button className={style.buttonNext} 
      onClick={()=>navigate('/request/submit',{state:{uniqueWeaponInfo : uniqueWeaponInfo}})}>
        Next
      </button>
    
    </div>
  );

  
  
}
