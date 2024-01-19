import React ,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import SubmitTable from '../../component/submit-request/submitTable/submitTable'
import TextBox from '../../component/submit-request/textbox/textbox'
import Button from '../../component/submit-request/button/button'
import axios from '../../lib/axios'

export default function SubmitForm() {
  const navigate = useNavigate()
  const [submit,setSubmit] = useState(false)
  const [weapon,setWeapon] = useState([])
  const [reason,setReason] = useState('')

  useEffect(()=>{
    if(submit) {
      axios.post('http://localhost:8000/borrow',{
        weapon : weapon,
        reason : reason
      }).then((response)=>{
        if(response.status === 200) {
          alert('Your request have been recorded')
          
          if(response.data.role === 'regular') navigate('/homepage')
          if(response.data.role === 'admin') navigate('/admin')
          if(response.data.role === 'guard') navigate('/guard')
        }
      }).catch((err)=>{
        console.log(err)
        alert('Failed to send your request, please try again')
        navigate('/homepage')
      })
    }
  },[submit])

  return (
    <>
    <SubmitTable setWeapon={weapon=>setWeapon(weapon)}/>
    <TextBox  setReason={reason=>setReason(reason)}/>
    <Button setSubmit={submit=>setSubmit(submit)}/>
    </>
  )
}
