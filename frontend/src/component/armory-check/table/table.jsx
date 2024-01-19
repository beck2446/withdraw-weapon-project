import React , { useEffect , useState} from 'react';
import axios from '../../../lib/axios'
import style from "./table.module.css"

function Table() {

  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUser();
  }, []);

  function getUser(){
    axios.get('http://localhost:8000/guard/checkArmory').then(function(response){
      console.log(response.data);
      setUsers(response.data);
  });
}

return (
   
    <>
  
    <table className={style.dataTable}>
        <thead>
            <tr>
                <th>armory ID</th>
                <th>weapon ID</th>
                <th>weapon Name</th>
                <th>weapon Type</th>
                <th>status</th>
            </tr>
            
        </thead>
      
        <tbody>
            {users.map((weapon, key) =>
                <tr key={key}>
                    <td>{weapon.armoryID}</td>
                    <td>{weapon.weaponID}</td>
                    <td>{weapon.weaponName}</td>
                    <td>{weapon.weaponType}</td>
                    <td
                className={
                  weapon.status === 1 ? style.statusActive : style.statusInactive
                }
              >
                {weapon.status === 1 ? 'REMAIN' : 'WITHDRAWN'}
              </td>
                </tr>
            )}
          </tbody>
    </table>
    <div className={style.container}></div>
</>

  )
}

export default Table