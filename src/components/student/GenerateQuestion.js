import React,{useState} from 'react'
import HttpClient from '../HttpClient';
import Sidebar from './Sidebar'
export default function GenerateQuestion() {
  const [itext,setItext] = useState(null);
  const [noq, setNoq] = useState(0);
  const [questions,setQuestion] =useState(null)
  const [answers,setAnswer] = useState(null)
  let renderedData;
  const generateqna = async ()=>{
  const resp = await HttpClient.post("//localhost:5000/test_generate",{itext,noq}) 
  console.log(resp.data["question"]);
  console.log(resp.data["answer"]);
  setQuestion(resp.data["question"])
  setAnswer(resp.data["answer"])
  };
  if(questions != null){
    const combinedData = questions.map((question, answer) => {
      return { question: question, answer: answers[answer] };
    });
    
    renderedData = combinedData.map((data) => {
    return (
      <tr>
        <td>{data.question}</td>
        <td>{data.answer}</td>
      </tr>
    );
  }); 
     
  }
  else{
    renderedData = null;
  }
  
         
  
  return (
    <div className='row' style={{'margin-left': 0}}>

    <Sidebar/>
      {
        answers && questions != null?
          (
            <div >
            <h3 className="h3 text-center">Generated Questions</h3>  
              <div className="table-responsive">
              <table id="example" className="table align-items-center table-flush">
              <thead>
                <tr>
                  <th>Question</th>
                  <th>Answer</th>
                </tr>
                
              </thead>
          <tbody>
          {renderedData != null?(renderedData):null}
          </tbody>
        </table>
        </div>
        </div>
            
          ):
      (
        <div className="row align-items-center d-flex  justify-content-center">
        <div className="col-12 mb-4">
          <div className="card border-light shadow-sm components-section align-items-center d-flex  justify-content-center">
            <div className="card-body align-items-center d-flex justify-content-center">     
              <div className="row mb-4">
                <div className="col-lg-12 col-sm-16">
                  <h3 className="h3 text-center">GENERATE QUESTIONS &amp; ANSWERS</h3>  
                </div>
                
                <div className="card-body">
                  <form method="POST" action="test_generate">
                    <div className="mb-4">
                      <div className="form-group">
                        <label className="h6" htmlFor="exampleFormControlTextarea1">Input Text</label>
                        <textarea name="itext" className="form-control" placeholder="Input Text" rows={6} required defaultValue={""}
                        onChange= {(e)=>setItext(e.target.value)} />
                      </div>    
                      
                      <div className="form-group">
                        <label className="h6" htmlFor="exampleFormControlTextarea1">No of Questions</label>
                        <input type="number" name="noq" className="form-control" placeholder="No. of Questions" min={1} required 
                          onChange= {(e)=>setNoq(e.target.value)}
                        />
                      </div>  
                      <input type="button" className="btn btn-primary" onClick={()=>generateqna()} defaultValue="Generate" />
                    </div></form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
          
      )}
    </div>
  )
}
