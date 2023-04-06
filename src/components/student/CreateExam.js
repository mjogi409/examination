import React,{useState} from 'react'
import Sidebar from './Sidebar'
import HttpClient from '../HttpClient';
import axios from "axios";

export default function CreateExam() {
    const [subject,setSubject] = useState(null)
    const [topic, setTopic] = useState(null);
    const [examid, setExamId] = useState(null);
    const [file, setFile] = useState(null);
    const formdata = new FormData();
   
    
    
    
      
    const submitted = async ()=>{
      formdata.append('file',file)
      formdata.append('subject',subject)
      formdata.append('topic',topic)
      formdata.append('examid',examid)
      console.log(formdata.get('file'))
      await axios.post('//localhost:5000/create_exam', formdata, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    }

    
    
  return (
    <div className='row' style={{'margin-left': 0}}><Sidebar/>
      <div className="row align-items-center d-flex  justify-content-center">
        <div className="col-12 mb-4">
          <div className="card border-light shadow-sm components-section align-items-center d-flex  justify-content-center">
            <div className="card-body align-items-center d-flex justify-content-center">     
              <div className="row mb-4">
                <div className="col-lg-12 col-sm-16">
                  <h3 className="h3 text-center">Create Exam</h3>  
                </div>
                
                <div className="card-body">
                  <form method="POST" action="test_generate">
                    <div className="mb-4">
                      <div className="form-group">
                        <label className="h6" htmlFor="exampleFormControlTextarea1">Subject Name</label>
                        <input 
                        type="text" 
                        name="subject" 
                        className="form-control" 
                        placeholder="Subject name" 
                        required="" 
                        onChange= {(e)=>setSubject(e.target.value)}
                        />
                       
                      </div>    
                      
                      <div className="form-group">
                        <label className="h6" htmlFor="exampleFormControlTextarea1">Topic Name</label>
                        <input 
                        type="text" 
                        name="topic" 
                        className="form-control" 
                        placeholder="Topic name" 
                        required="" 
                        onChange= {(e)=>setTopic(e.target.value)}
                        />
                       
                      </div>  
                      <div className="form-group">
                        <label className="h6" htmlFor="exampleFormControlTextarea1">Exam ID</label>
                        <input 
                        type="text" 
                        name="examid" 
                        className="form-control" 
                        placeholder="examid" 
                        required="" 
                        onChange= {(e)=>setExamId(e.target.value)}
                        />
                       
                      </div>  
                      <div className="form-group">

                        <label className="h6" htmlFor="exampleFormControlTextarea1">Question File Upload</label>
                        
                        <input 
                        type="file" 
                        name="file"
                        accept = ".csv" 
                        className="form-control" 
                        placeholder="upload csv" 
                        required="" 
                        onChange= {(e)=>setFile(e.target.files[0])}
                        
                        />
                        <a href="../student/template/testt.csv" class="btn btn-primary m-3" >Download Template</a>
                      </div>  

                      <input type="button" className="btn btn-primary" onClick={()=>submitted()}  defaultValue="Submit" />
                    </div></form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
          
        
            
          
        
     
    </div>
  )
}
