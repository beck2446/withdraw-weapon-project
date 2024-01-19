import React, { useState } from "react";
import style from "./weaponList.module.css";

export default function WeaponList(props) {
  const uniqueWeaponInfo = props.weaponInfo.reduce((accumulator, current) => {
    const isDuplicate = accumulator.some(
      (item) => item.weaponName === current.weaponName
    );
    if (!isDuplicate) {
      accumulator.push(current);
    }
    return accumulator;
  }, []);

  const [counts, setCounts] = useState({});

  const handleIncrement = (name, available) => {
    setCounts((prevState) => ({
      ...prevState,
      [name]: Math.min(available, (prevState[name] || 0) + 1),
    }));
    console.log(counts);
  };

  const handleDecrement = (name) => {
    setCounts((prevState) => ({
      ...prevState,
      [name]: Math.max(0, (prevState[name] || 0) - 1),
    }));
  };

  const handleClick = (val) => {
    const newWishListItem = {
      weaponName: val.weaponName,
      weaponType: val.weaponType,
      armoryName: val.armoryName,
      amount: counts[val.weaponName],
    };

    const newWishList = [...props.wishList, newWishListItem];
    props.setWishList(newWishList);

    const updatedWeaponInfo = props.weaponInfo.filter(
      (item) => item.weaponName !== val.weaponName
    );

    props.setWeaponInfo(updatedWeaponInfo);
  };

  if (props.weaponInfo.length === 0) {
    return null;
  }

  return (
    <>
      <div className={style.wrapper}>
        <div className={style.header}>
          <h1>Available weapons</h1>
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
              <h2>Available</h2>
            </div>
            <div className={style.count}>
              <h2>Amount</h2>
            </div>
            <div></div>
          </div>

          {uniqueWeaponInfo.map((val) => {
            const count = counts[val.weaponName] || 0;
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
                    <p>{val.num_available}</p>
                  </div>
                  <div className={style.count}>
                    <div className={style.amout_wrapper}>
                      <div className={style.del}>
                        <button
                          onClick={() => handleDecrement(val.weaponName)}
                        >
                          <h3>-</h3>
                        </button>
                      </div>
                      <div className={style.amount_display}>
                        <p>{count}</p>
                      </div>
                      <div className={style.add}>
                        <button
                          onClick={() =>
                            handleIncrement(val.weaponName, val.num_available)
                          }
                        >
                          <h3>+</h3>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className={style.button}>
                    <button onClick={() => handleClick(val)}>
                      <h3>add to list</h3>
                    </button>
                  </div>
                </div>
                <hr className={style.hr} />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
