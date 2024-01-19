import React from 'react'
import style from './guard.module.css'
import Profile from '../../component/landing-page/profile/profile'
import Borrow from '../../component/landing-page/borrow/borrow'
import Findhistory from '../../component/landing-page/history/findHistory'
import DeliverWeapon from '../../component/landing-page/deliverWeapon/deliverWeapon'
import ReturnWeapon from '../../component/landing-page/returnWeapon/returnWeapon'
import ArmoryCheck from '../../component/landing-page/armoryCheck/armoryCheck'

export default function guard() {
  return (
    <div className={style.wrapper}>
      <Profile />
      <Borrow />
      <Findhistory />
      <ArmoryCheck/>
      <DeliverWeapon />
      <ReturnWeapon />
      
     
    </div>
  )
}