import React, { useEffect, useState } from "react";
import style from "./table.module.css";
import axios from "../../../lib/axios";

function Table() {
  const [borrowList, setBorrowList] = useState([]);

  useEffect(() => {
    getBorrowList();
  }, []);

  async function getBorrowList() {
    try {
      const response = await axios.get("http://localhost:8000/guard/borrow");
      setBorrowList(response.data);
    } catch (error) {
      console.error("Error fetching borrow list:", error);
    }
  }

  const handleButtonClick = async (id, weapon) => {
    const updatedStatus = borrowList.map((item) => {
      if (item.militaryID === id && item.weaponID === weapon) {
        return { ...item, borrowStatus: !item.borrowStatus ? 1 : 0 };
      }
      return item;
    });

    setBorrowList(updatedStatus);

    try {
      await axios.post("http://localhost:8000/guard/updateborrowdata", {
        key: id,
        weapon: weapon,
        attribute: "อนุมัติ",
        stat: 'borrow'
      });
      console.log("Data updated successfully");
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };


  const handleButtonDisappear = (id, weapon) => {
    const updatedList = borrowList.filter(
      (item) => !(item.militaryID === id && item.weaponID === weapon)
    );
    setBorrowList(updatedList);
  };

  return (
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
        {borrowList.map((val, key) => (
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
                  {val.borrowStatus ? "ส่งมอบ" : "เสร็จสิ้น"}
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;