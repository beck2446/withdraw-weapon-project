import React, { useEffect, useState } from 'react';
import axios from '../../lib/axios';
import style from './checkRequest.module.css';


const Checkrequest = () => {
  const [borrowData, setBorrowData] = useState([]);
  const [militaryData, setMilitaryData] = useState([]);
  const [weaponData, setWeaponData] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [selectedRequestID, setSelectedRequestID] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response1 = await axios.get('http://localhost:8000/admin/borrow');
      const response2 = await axios.get('http://localhost:8000/admin/military');
      const response3 = await axios.get('http://localhost:8000/admin/WEAPON');
  
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
  

  

  const handleButtonClick = (requestID) => {
    setIsButtonClicked(!isButtonClicked);
    setSelectedRequestID(requestID);
  };

  const handleApproveClick = async (requestID) => {
    try {
      // Update the borrowStatus in the SQL database to "APPROVE"
      await axios.put(`http://localhost:8000/admin/borrow/${requestID}`, { borrowStatus: 'อนุมัติ' });
      // Refresh the data
      fetchData();
      window.location.reload();
    } catch (err) {
      console.error('Error approving request', err);
    }
  };
  
  const handleDeclineClick = async (requestID) => {
    try {
      // Update the borrowStatus in the SQL database to "APPROVE"
      await axios.put(`http://localhost:8000/admin/borrow/${requestID}`, { borrowStatus: 'ไม่อนุมัติ' });
        console.log('approve')
      // Refresh the data
      fetchData();
      window.location.reload();
    } catch (err) {
      console.error('Error approving request', err);
    }
  };

  return (
    <>
      <table className={style.dataTable}>
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Military ID</th>
            <th>Military Name</th>
            <th></th>
          </tr>
        </thead>

        <tbody className='RequestList'>
          {combinedData.map((val, key) => {
            if (val.borrowStatus !== 'อนุมัติ' && val.borrowStatus !== 'ไม่อนุมัติ'){
            return (
              <tr key={key}>
                <td className='RequestID'>{val.borrowID}</td>
                <td className='MilitaryID'>{val.militaryID}</td>
                <td className='MilitaryName'>{val.prefix} {val.Fname} {val.Lname}</td>
                <td className='Details'><button onClick={() => handleButtonClick(val.borrowID)}>Details</button></td>
              </tr>
            );
          }else{
            return null
          }
          })}
        </tbody>
        
      </table>
      <table className={style.dataTable}>
        <thead>
          <tr className={isButtonClicked ? '' : style.hide1}>
            <th>Request ID</th>
            <th>Weapon ID</th>
            <th>Weapon Name</th>
            <th>Weapon Type</th>
            <th>Armory ID</th>
            <th>Borrow Date</th>
            <th>Return Date</th>
          </tr>
        </thead>
        <tbody>
          {combinedData.map((val, key) => (
            <tr className={isButtonClicked && val.borrowID === selectedRequestID ? '' : style.hide2} key={key}>
              <td className="RequestI">{val.borrowID}</td>
              <td className="WeaponId">{val.weaponID}</td>
              <td className="WeaponName">{val.weaponName}</td>
              <td className="WeaponType">{val.weaponType}</td>
              <td className="ArmoryID">{val.armoryID}</td>
              <td className="BorrowDate">{val.borrowDate}</td>
              <td className="ReturnDate">{val.returnDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {combinedData.map((val, key) => (
        <div key={key}>
          <div className={isButtonClicked && val.borrowID === selectedRequestID ? '' : style.hide3} key={key}>
            <div className={style.container1}>Reasons of the Request {val.borrowID}</div>
            <div className={style.container2}>{val.borrowReason}</div>
            <div className={style.container3}> 
              <button className={style.button1} onClick={() => handleDeclineClick(val.borrowID)}>DECLINE</button>
              <button className={style.button2} onClick={() => handleApproveClick(val.borrowID)}>APPROVE</button> 
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Checkrequest;