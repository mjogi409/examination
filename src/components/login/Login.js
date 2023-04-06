import React, {  useEffect,useState } from 'react'

import HttpClient from '../HttpClient';
import 'bootstrap';


export default function Login() {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [user, setUser] = useState(null)
  useEffect(()=>{
    (async ()=>{
      try{
        const resp = await HttpClient.get("//localhost:5000/@me");
        setUser(resp.data);
        
      }
      catch(error){
        console.log(error);

      }
    })();
  },[]);
  const logInUser= async ()=>{
    try{
      
    const resp = await HttpClient.post("//localhost:5000/login",{email,password})
    console.log(resp.data);
    window.location.href = '/verifyotp';
    }
    catch(error)
    {
    if(error.response.status === 401)
    {
      alert("Invalid Credentials");
    }
    }
  }
  return (
    <> 
    {user!= null? window.location.href = "/StudentDashboard":(
      <div className="container">
  <div className="col-12 d-flex align-items-center justify-content-center">
    <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-650">
      <div className="text-center text-md-center mb-4 mt-md-0">
        <h1 className="mb-0 h3">Sign in to our platform</h1>
      </div>
     
      <div className="card-body">
        <form  className="mt-4">
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-group mb-4">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <span className="fas fa-envelope" />
                </span>
              </div>
              <input
                name="email"
                className="form-control"
                placeholder="example@company.com"
                type="text"
                required=""
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-group mb-4">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <span className="fas fa-unlock-alt" />
                  </span>
                </div>
                <input
                  name="password"
                  type="text"
                  className="form-control"
                  placeholder="Password"
                  aria-label="Password"
                  required
                  value= {password}
                  onChange={(e)=>setPassword(e.target.value)}  
                  />
                 
              </div>
            </div>
          </div>
         
          <div className="form-group">
           
          
            <div id="snapshot" />
            
             </div>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <a href="/forgotpassword" className="font-weight-bold">
                Lost password?
              </a>
            </div>
          </div>
          <button type="button" onClick={()=> logInUser()} className="btn btn-block btn-primary">
            Sign in
          </button>
        
          
        </form>
        <div className="d-block d-sm-flex justify-content-center align-items-center mt-4">
          <span className="font-weight-normal">
            Not registered?
            <a href="/register" className="font-weight-bold">
              Create account
            </a>
          </span>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</div>
   

    )}
      
</> 
  )
 }



