
import React from 'react'
import style from './homepage.module.css'
import Profile  from '../../component/landing-page/profile/profile';
import Borrow  from '../../component/landing-page/borrow/borrow';
import Findhistory  from '../../component/landing-page/history/findHistory';

export default function homepage() {
  
  return (
    <div className={style.wrapper}>
      <Profile/>
      <Borrow/>
      <Findhistory  role='regular'/>
    </div>
    
      
    
   
    
      
 
 
);
}