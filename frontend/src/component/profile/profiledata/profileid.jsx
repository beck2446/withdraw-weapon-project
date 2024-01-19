import { useEffect, useState } from "react";
import axios from "../../../lib/axios";
import style from './profile.module.css'

export default function ProfileID() {
  const [id, setId] = useState("");

  useEffect(() => {
    axios.get('http://localhost:8000/profileid')
      .then((response) => {
        setId(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <h2 className={style.h2}>{id}</h2>;
}