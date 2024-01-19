import React, { useEffect } from 'react'
import axios from '../../lib/axios'
import { useNavigate } from 'react-router-dom'

export default function Logout() {
    const navigate = useNavigate()
    useEffect(()=>{
        axios.get('http://localhost:8000/logout')
        .then((response)=>{
            if(response.status === 200) {
                navigate('/')
            }
        })
    })
  return (
    null
  )
}
