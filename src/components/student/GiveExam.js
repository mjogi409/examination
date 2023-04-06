import React, { useState } from 'react'
import Sidebar from './Sidebar'
import HttpClient from '../HttpClient'
import axios from 'axios'

export default function GiveExam() {
  const [ExamId,setExamId] = useState(null)
  const [resp ,setResp ] = useState(null)
  const formdata = new FormData()
  
  const submitted = async()=>{
    formdata.append("exam_id",ExamId)
    await axios.post('//localhost:5000/give_test', formdata, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((response)=>{
        console.log(response.data)
        setResp(response.data) 
        window.location = "/testquiz"
      }
      )
      .catch((error)=> console.log(error.message))

  }
  return (
    <div className='row' style={{'margin-left': 0}}><Sidebar/>
      <div className="text-center text-md-center mb-4 mt-md-0">
        <h1 className="mb-0 h3">Give Exam</h1>
      </div>
     
      <div className="card-body">
        <form action="Exam" method="POST" className="mt-4">
          
      
          <div className="form-group">
            <label htmlFor="EXAMID">EXAM ID</label>
            <div className="input-group mb-4">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <span className="fas fa-envelope" />
                </span>
              </div>
              <input
                name="EXAMID"
                className="form-control"
                placeholder='exam id'
                type="text"
                required=""
                onChange ={(e)=>setExamId(e.target.value)}
              />
            </div>
             <button type="button" onClick={()=>submitted()} className="btn btn-block btn-primary">
            Give Exam
          </button>
          </div>
          
          </form>
    </div>
    </div>
  )
}
