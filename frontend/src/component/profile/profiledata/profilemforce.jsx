import { useEffect, useState } from "react";
import axios from "../../../lib/axios";
import style from './profile.module.css'

export default function Profilemforce() {
  const [mforce, setMforce] = useState("");

  useEffect(() => {
    axios.get('http://localhost:8000/profilemforce')
      .then((response) => {
        setMforce(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <h2 className={style.h2}>{mforce}</h2>;
}