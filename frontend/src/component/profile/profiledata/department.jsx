import { useEffect, useState } from "react";
import axios from "../../../lib/axios";
import style from './profile.module.css'

export default function Department() {
  const [d, setD] = useState("");

  useEffect(() => {
    axios.get('http://localhost:8000/department')
      .then((response) => {
        setD(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <h2 className={style.h2}>{d}</h2>;
}