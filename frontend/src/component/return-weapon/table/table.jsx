import React, { useEffect, useState } from "react";
import style from './table.module.css';
import axios from "../../../lib/axios";

function Table() {
  const [returnList, setReturnList] = useState([]);

  useEffect(() => {
    getReturnList();
  }, []);

  function getReturnList() {
    axios.get("http://localhost:8000/guard/return").then((response) => {
      setReturnList(response.data);
    });
  }

  const handleButtonClick = (id, weapon) => {
    const updatedStatus = returnList.map((item) => {
      if (item.militaryID === id && item.weaponID === weapon) {
        return { ...item, returnStatus: !item.returnStatus ? 1 : 0 };
      }
      return item;
    });

    setReturnList(updatedStatus);

    axios
      .post("http://localhost:8000/guard/updatereturndata", { key: id, weapon: weapon, attribute: "ส่งคืน", stat: 'return' })
      .then((response) => {
        console.log("Data updated successfully");
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  return (
    <>
      <table className={style.dataTable}>
        <thead>
          <tr>
            <th>Military ID</th>
            <th>Military Name</th>
            <th>Affiliation</th>
            <th>Weapon Name</th>
            <th>Borrow Date</th>
            <th>Check Box</th>
          </tr>
        </thead>
        <tbody>
          {returnList.map((val, key) => (
            <tr key={key}>
              <td>{val.militaryID}</td>
              <td>
                {val.Fname} {val.Lname}
              </td>
              <td>{val.affiliation}</td>
              <td>{val.weaponName}</td>
              <td>{val.borrowDate}</td>
              <td>
                <div>
                  <button onClick={() => handleButtonClick(val.militaryID, val.weaponID)}>
                    {val.returnStatus ? "ส่งคืน" : "เสร็จสิ้น"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;