import React, { useState } from "react";
import style from "./searchbar.module.css";
import useSuggestBar from "../../../customHooks/useSuggestBar";
import axios from '../../../lib/axios'

export default function Searchbar(props) {
  const [searchString, setSearchString] = useState("");
  const [resultlist] = useSuggestBar(
    searchString,
    "http://localhost:8000/searchRegx"
  );

  const handleClick = (val) => {
    props.setWeapon([val]);
    setSearchString('');
  };

const handleSearch = () =>{
  axios.get(`http://localhost:8000/search${searchString}`)
  .then((response)=>{
    props.setWeapon(response.data);
    setSearchString('');
  })
}

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <h1>Create Request</h1>
        <div className={style.line}>
          <hr />
        </div>
      </div>

      <div className={style.input_wrapper}>
        <div className={style.list_wrapper}>
          <input
            value={searchString}
            type="text"
            onChange={(e) => setSearchString(e.target.value)}
            placeholder="Enter Weapon Name"
            className={style.input}
          />
          {resultlist.map((val) => {
            return (
              <div onClick={() => handleClick(val)} className={style.list}>
                {val.weaponName}
              </div>
            );
          })}
        </div>
        <div className={style.button}>
          <button onClick={handleSearch}>
            <h3>Search</h3>
          </button>
        </div>
      </div>
    </div>
  );
}
