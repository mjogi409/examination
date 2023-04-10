import React,{useState,useEffect} from 'react'
import Sidebar from '../student/Sidebar'
import HttpClient from '../HttpClient'
import DataTable from 'datatables.net-dt';

export default function Updatequestion() {


const [ExamId,setExamId] = useState(null)
const [QuestionId,setQuestionId] = useState(null)
const [questions,setQuestions] = useState(null)
const [answers,setAnswers] = useState(null)
const [optiona,setOptiona] = useState(null)
const [optionb,setOptionb] = useState(null)
const [optionc,setOptionc] = useState(null)
const [optiond,setOptiond] = useState(null)
const [marks,setMarks] = useState(null)
const [selectedquestion,setSelectedQuestion] = useState(null)
const [selectedQid,setSelectedQid] = useState(null)
const [selectedAnswer,setSelectedAnswer] = useState(null)
const [selectedoptiona,setSelectedOptiona] = useState(null)
const [selectedoptionb,setSelectedOptionb] = useState(null)
const [selectedoptionc,setSelectedOptionc] = useState(null)
const [selectedoptiond,setSelectedOptiond] = useState(null)
const [selectedmarks,setSelectedmarks] = useState(null)
let renderedData;

const submitted =  ()=>{
    HttpClient.post("//localhost:5000/updatequestion",{ExamId})
   .then((response)=>{setQuestionId(response.data["qid"])
    setQuestions(response.data["q"])
    setAnswers(response.data["ans"])
    setOptiona(response.data["a"])
    setOptionb(response.data["b"])
    setOptionc(response.data["c"])
    setOptiond(response.data["d"])
    setMarks(response.data["marks"])
})
 
   

}
const updatequestions = async (qid)=>{
  await HttpClient.post("//localhost:5000/updatedquestion",{qid,ExamId,selectedquestion,selectedAnswer,selectedoptiona,selectedoptionb,selectedoptionc,selectedoptiond,selectedmarks})
    .then((response)=>{ 
        setSelectedQuestion(response.data["question"])
        setSelectedQid(response.data["qid"])
        setSelectedAnswer(response.data["answer"])
        setSelectedOptiona(response.data["a"])
        setSelectedOptionb(response.data["b"])
        setSelectedOptionc(response.data["c"])
        setSelectedOptiond(response.data["d"])
        setSelectedmarks(response.data["marks"])
        
    })
}   
useEffect(function(){
    
   new DataTable("table")
   
})
if(QuestionId !==null)
{
    const update = async (qid)=>{
      console.log("QID:"+qid)
        await HttpClient.post("//localhost:5000/selectquestion",{qid,ExamId})
        .then((response)=>{
            
            setSelectedQuestion(response.data["question"])
            setSelectedQid(response.data["qid"])
            setSelectedAnswer(response.data["answer"])
            setSelectedOptiona(response.data["a"])
            setSelectedOptionb(response.data["b"])
            setSelectedOptionc(response.data["c"])
            setSelectedOptiond(response.data["d"])
            setSelectedmarks(response.data["marks"])
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
              <td><button value={data.QuestionId} onClick={()=>update(data.QuestionId) } className='btn btn-primary' data-toggle="modal" data-target="#form_modal">Update</button></td>
            </tr>
          );
    })
}
return (
    <div>
    
    
    
    { 
         QuestionId !== null? (
        <div>
          <h3 className="h3 text-center">Update Questions</h3>  
          
      <div class="modal fade" id="form_modal" aria-hidden="true">
      
    <div class="modal-dialog">
      <div class="modal-content">
        
          <div class="modal-header">
            <h3 class="modal-title">Update Question {selectedQid}</h3>
          </div>
          <div class="modal-body">
            <div class="col-md-2"></div>
            <div class="col-md-8">
              <div class="form-group">
                <label>Question</label>
                <textarea class="form-control" required="required" value={selectedquestion}
                  onChange={(e)=> setSelectedQuestion(e.target.value)}
                 name="question"/>
              </div>
              <div class="form-group">
                <label>Answer</label>
                <input type="text" name="answer" class="form-control" value={selectedAnswer} onChange={(e)=>setSelectedAnswer(e.target.value)} required="required" />
              </div>
              <div class="form-group">
                <label>Option a</label>
                <input type="text" name="optiona" value={selectedoptiona} onChange={(e)=>setSelectedOptiona(e.target.value)}class="form-control" required="required"/>
              </div>
              <div class="form-group">
                <label>Option b</label>
                <input type="text" name="optionb" value={selectedoptionb} onChange={(e)=>setSelectedOptionb(e.target.value)}class="form-control" required="required"/>
              </div>
              <div class="form-group">
                <label>Option c</label>
                <input type="text" name="optionc" value={selectedoptionc} onChange={(e)=>setSelectedOptionc(e.target.value)}class="form-control" required="required"/>
              </div>
              <div class="form-group">
                <label>Option d</label>
                <input type="text" name="optiond" value={selectedoptiond} onChange={(e)=>setSelectedOptiond(e.target.value)}class="form-control" required="required"/>
              </div>
              <div class="form-group">
                <label>marks</label>
                <input type="number" name="marks" value={selectedmarks} onChange={(e)=>setSelectedmarks(e.target.value)}class="form-control" required="required"/>
              </div>

            </div>
          </div>
          
          <div class="modal-footer">
            <button name="save" className="btn btn-primary" onClick={()=>updatequestions(selectedQid)} data-dismiss="modal">Save</button>
            <button class="btn btn-danger" type="button" data-dismiss="modal">Close</button>
          </div>
        
      </div>
    </div>
  </div>  
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
                        <th>Update</th>
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
      <h1 className="mb-0 h3">Update Questions</h1>
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
           <input type="button" onClick={()=>submitted()} className="btn btn-block btn-primary" defaultValue="Update"/>
          
        </div>
        
  </div>
  </div>
  </div>)
  }
  </div>
    )
}
