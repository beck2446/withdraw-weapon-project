import { useEffect, useState } from "react";
import axios from "../../../lib/axios";
import style from './profile.module.css'

export default function Profilename() {
  const [name, setName] = useState("");

  useEffect(() => {
    axios.get('http://localhost:8000/profilename')
      .then((response) => {
        setName(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <h2 className={style.h2}>{name}</h2>;
}