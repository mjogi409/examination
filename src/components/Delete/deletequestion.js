import React, { useState, useEffect } from 'react'
import Sidebar from '../student/Sidebar'
import DataTable from 'datatables.net-dt'
import HttpClient from '../HttpClient'


export default function DeleteQuestion() {
    useEffect(function(){
    
        new DataTable("table")
        
     })
    let renderedData;
    const [ExamId, setExamId] = useState(null)
    const [QuestionId,setQuestionId] = useState(null)
    const [questions,setQuestions] = useState(null)
    const [answers,setAnswers] = useState(null)
    const [optiona,setOptiona] = useState(null)
    const [optionb,setOptionb] = useState(null)
    const [optionc,setOptionc] = useState(null)
    const [optiond,setOptiond] = useState(null)
    const [marks,setMarks] = useState(null)
    
    const submitted= async()=>{
        await HttpClient.post("//localhost:5000/deletequestion",{ExamId})
        .then((response)=>{setQuestionId(response.data["qid"])
        setQuestions(response.data["q"])
        setAnswers(response.data["ans"])
        setOptiona(response.data["a"])
        setOptionb(response.data["b"])
        setOptionc(response.data["c"])
        setOptiond(response.data["d"])
        setMarks(response.data["marks"]) 
    })}
    
    if(QuestionId !==null)
    {
        const deletequestion = async (qid)=>{
            console.log("QID:"+qid)
              await HttpClient.post("//localhost:5000/deletedquestion",{qid,ExamId})
              .then((response)=>{
                  alert("Deleted Question with QID : "+qid);
                  
              })
          }
        const combinedData = QuestionId.map((qid,index)=>{
            return { QuestionId:qid , questions: questions[index], answers: answers[index], optiona: optiona[index], optionb: optionb[index],optionc: optionc[index], optiond: optiond[index], marks:marks[index] };
        })
        renderedData = combinedData.map((data)=>{
            return (
                <tr>
                  <td>{data.QuestionId}</td>
                  <td>{data.questions}</td>
                  <td>{data.answers}</td>
                  <td>{data.optiona}</td>
                  <td>{data.optionb}</td>
                  <td>{data.optionc}</td>
                  <td>{data.optiond}</td>
                  <td>{data.marks}</td>
                  <td><button value={data.QuestionId} onClick={()=>deletequestion(data.QuestionId) } className='btn btn-danger'>Delete</button></td>
                </tr>
              );
        })
    }
    return (

        <div>
        { 
         QuestionId !== null? (
        <div>
          <h3 className="h3 text-center">Delete Questions</h3>  
          
      
            <table id="updatetable" className="table">
                <thead>
                    <tr>
                        <th>QuestionId</th>
                        <th>Question</th>
                        <th>Answer</th>
                        <th>A</th>
                        <th>B</th>
                        <th>C</th>
                        <th>D</th>
                        <th>Marks</th>
                        <th>Delete
                        </th>
                    </tr>
                
                </thead>
                <tbody>
                    {renderedData !=null?(renderedData):(null)}
                </tbody>
            </table>
            
          </div>
        ):(
            <div className='row' style={{'marginLeft': 0}}>
    
            <Sidebar/>
        <div>
    <div className="text-center text-md-center mb-4 mt-md-0">
      <h1 className="mb-0 h3">Delete Questions</h1>
    </div>
   

    <div className="card-body">
      
    
        <div className="form-group">
          <label htmlFor="EXAMID">Update Exam</label>
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
           <input type="button" onClick={()=>submitted()}  className="btn btn-block btn-primary" defaultValue="Delete"/>
          
        </div>
        
  </div>
  </div>
        </div>
        )}
    </div>
  )
}
