import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from '../../lib/axios'

export default function Protected() {
  const navigate = useNavigate()
  const [loading,setLoading] = useState(true)
  const [permission,setPermission] = useState(false)

  useEffect(()=>{
    axios.get('http://localhost:8000/checkauth')
    .then((response)=>{
      if(response.status === 200) {
       
        setPermission(true)
      }
    }).catch(err=>console.log(err))
    .finally(()=>setLoading(false))
  })

  if(loading) return null

  return permission? <Outlet/>:navigate('/')
  
}

