import React, { useEffect, useState } from 'react';
import axios from '../../../lib/axios';
import style from './Table.module.css';

const RequestList = () => {
  const [borrowData, setBorrowData] = useState([]);
  const [militaryData, setMilitaryData] = useState([]);
  const [weaponData, setWeaponData] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterData();
  }, [combinedData]);

  const fetchData = async () => {
    try {
      const response1 = await axios.get('http://localhost:8000/borrow');
      const response2 = await axios.get('http://localhost:8000/military');
      const response3 = await axios.get('http://localhost:8000/WEAPON');

      setBorrowData(response1.data);
      setMilitaryData(response2.data);
      setWeaponData(response3.data);

      const combinedData = combineData(response1.data, response2.data, response3.data);
      setCombinedData(combinedData);
    } catch (err) {
      console.error('Error fetching data', err);
    }
  };

  const combineData = (borrow, military, weapon) => {
    const combinedData = borrow.map((borrowDataRecord) => {
      const matchingMilitaryDataRecord = military.find(
        (militaryDataRecord) => militaryDataRecord.militaryID === borrowDataRecord.militaryID
      );

      const matchingWeaponDataRecord = weapon.find(
        (weaponDataRecord) => weaponDataRecord.weaponID === borrowDataRecord.weaponID
      );

      return {
        ...borrowDataRecord,
        ...matchingMilitaryDataRecord,
        ...matchingWeaponDataRecord,
      };
    });

    return combinedData;
  };

  const filterData = () => {
    setShowTable(true);
  };

  return (
    <div className={style.container}>
      <div className={style.content}>
        {showTable && (
          <table className={style.dataTable}>
            <thead>
              <tr>
                <th>Military ID</th>
                <th>Name</th>
                <th>Weapon Name</th>
                <th>Borrow Date</th>
              </tr>
            </thead>

            <tbody className="RequestList">
              {combinedData.map((val, key) => {
                return (
                  <tr key={key}>
                    <td className="RequestID">{val.militaryID}</td>
                    <td className="MilitaryID">
                      {val.prefix} {val.Fname} {val.Lname}
                    </td>
                    <td className="MilitaryName">{val.weaponName}</td>
                    <td className="BorrowDate">{val.borrowDate}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default RequestList;
