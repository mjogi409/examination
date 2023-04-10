import React,{useState,useEffect} from 'react'
import DataTable from 'datatables.net-dt'
import Sidebar from '../student/Sidebar'
import HttpClient from '../HttpClient'
export default function Results() {
  useEffect(function(){
    
    new DataTable("table")
    
 })
 let renderedData;
 const [ExamId, setExamId] = useState(null)
 const [email,setEmail] = useState(null)
 const [UserEmail,setuseremail] = useState(null)
 const [result,setResults] = useState(null)
    
 const submitted = async()=>{
  await HttpClient.post("//localhost:5000/results",{ExamId})
  .then((response)=>{
        setuseremail(response.data["useremail"])
        setResults(response.data["results"])
        console.log(result)
  })
  
 }
 if(UserEmail !== null){
  const sendmail = async (senderemail,marks,eid)=>{
    await HttpClient.post("//localhost:5000/sendresults",{senderemail,marks,eid})
    .then((response)=>{
      alert("Results has been sent to "+senderemail)
    })
  }
 const combinedData = UserEmail.map((uid,index)=>{
  return { UserEmail:uid , results: result[index]};
})

renderedData = combinedData.map((data)=>{
  return (
      <tr>
        <td>{data.UserEmail}</td>
        <td>{data.results}</td>
        <td><button value={data.UserEmail} onClick={()=>sendmail(data.UserEmail,data.results,ExamId) } className='btn btn-primary'>Send mail</button></td>
      </tr>
    );
})}
  return (
    <div>
    {result && UserEmail !== null?(
      <div>
      <h3 className="h3 text-center">Results</h3>  
          
      
          <table id="updatetable" className="table">
              <thead>
                  <tr>
                      <th>User Id</th>
                      <th>Marks</th>
                      <th>Send Mail
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
<h1 className="mb-0 h3">Results</h1>
</div>


<div className="card-body">


<div className="form-group">
  <label htmlFor="EXAMID">Results</label>
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
   <input type="button" onClick={()=>submitted()}  className="btn btn-block btn-primary" defaultValue="Check Results"/>
  
</div>

</div>
</div>
</div>
)}
    </div>
  )
}
