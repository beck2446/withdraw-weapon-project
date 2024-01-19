import React from 'react'
import style from './button.module.css'
import { useNavigate } from 'react-router-dom'

export default function Button(props) {
  const navigate = useNavigate()
  
  

  const handleConfirmClick = () => {

    props.setSubmit(true)
  }

  return (
    <div className={style.wrapper}>
      <div className={style.button_wrapper}>
        <button onClick={() => navigate('/request')}>
          return
        </button>
      </div>
      <div className={style.button_wrapper}>
        <button onClick={handleConfirmClick}>confirm</button>
      </div>
    </div>
  )
}
