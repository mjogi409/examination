import React, { useEffect } from 'react'
import HttpClient from '../HttpClient'

export default function Logout() {
    useEffect(()=>{
         HttpClient.post("//localhost:5000/logout");
    },[])
    const logout = ()=>{
        
        window.location.href="/";
    }
  return (
    <div>You have Successfully Logged out
        You can return to your home Page
        <button onClick={()=>logout()} className="btn btn-primary">Go back to home Page</button>
    </div>
  )
}
