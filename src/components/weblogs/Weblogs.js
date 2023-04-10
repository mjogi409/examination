import React,{useEffect, useState} from 'react'
import Sidebar from '../student/Sidebar'
import HttpClient from '../HttpClient'
import DataTable from 'datatables.net-dt'
export default function Weblogs() {
    useEffect(()=>{
        new DataTable("table")
    })
    let renderedData;
    const [ExamId, setExamId] = useState(null)
    const [email,setEmail] = useState(null)
    const [tabswitch,setTabSwitch] = useState(null)
    const submitted = ()=>{
        HttpClient.post("//localhost:5000/viewlogs",{ExamId})
        .then((response)=>{
            setEmail(response.data["uid"]);
            setTabSwitch(response.data["tracker"]);
        })
    }
    if( email && tabswitch !== null){
        const combinedData = email.map((eid,index)=>{
            return { email:eid , tabswitch: tabswitch[index]};
        })
        renderedData = combinedData.map((data)=>{
            return (
                <tr>
                  <td>{data.email}</td>
                  <td>{data.tabswitch}</td>
                </tr>
              );
        })
    }
    
  return (
    <div>
    {email && tabswitch !== null?(
        <div>
        <h3 className="h3 text-center">Weblogs</h3>  
          
      
          <table id="updatetable" className="table">
              <thead>
                  <tr>
                      <th>User Id</th>
                      <th>TABS SWITCHED</th>

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
      <h1 className="mb-0 h3">Weblogs</h1>
    </div>
   

    <div className="card-body">
      
    
        <div className="form-group">
          <label htmlFor="EXAMID">Weblogs</label>
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
           <input type="button" onClick={()=>submitted()} className="btn btn-block btn-primary" defaultValue="Check LOGS"/>
          
        </div>
        
  </div>
  </div>
    </div>
    )}
    </div>
  )
}
