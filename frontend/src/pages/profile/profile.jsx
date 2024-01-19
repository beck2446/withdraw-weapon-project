import React from 'react'
import style from './profile.module.css'
import Profilepic from '../../component/profile/profilepic/profilepic'
import Profilename from '../../component/profile/profiledata/profilename'
import ProfileID from '../../component/profile/profiledata/profileid'
import Profilemforce from '../../component/profile/profiledata/profilemforce'
import Department from '../../component/profile/profiledata/department'
export default function Profile() {
    return (
      <>
        <h1 className={style.h1}>Personal information</h1> 
        <div className={style.line}></div>
        <Profilepic />
        <Profilename />
        <ProfileID />
        <Profilemforce />
        <Department />
      </>
    )
  }