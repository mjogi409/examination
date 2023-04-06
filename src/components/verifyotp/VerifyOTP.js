import React,{useState} from 'react'
import HttpClient from '../HttpClient';

export default function VerifyOTP(props) {
  const [otp,setOTP] = useState("");
  const sendotp = async ()=>{
   const resp = await HttpClient.get("//localhost:5000/sendotp")
   console.log(resp.data);
  }
  const verifyotp = async ()=>{
    const resp = await HttpClient.post("//localhost:5000/verifyotp",{otp})
    console.log(resp.data);
    if(resp.data === 200)
    {
      window.location.href ="/StudentDashboard"
    }
    else if(resp.data === "admin")
    {
      window.location.href ="/professor"
    }
  }
  return (
    <div>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
  <div className="container">
    <div className="col-12 d-flex align-items-center justify-content-center">
      <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-650">
        <div className="text-center text-md-center mb-4 mt-md-0">
          <h1 className="mb-0 h3">Verify OTP</h1>
        </div>
        <form action="" method="POST" className="mt-4">
          <div className="form-group">
            <label>OTP</label>
            <div className="input-group mb-4">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <span className="fas fa-key" />
                </span>
              </div>
              <input
                name="fpotp"
                type="text"
                className="form-control"
                placeholder="Enter OTP"
                pattern="\d*"
                maxLength={5}
                value={otp}
                onChange={(e)=>setOTP(e.target.value)}
                required=""
              />
            </div>
          </div>
          <button type="button" onClick={()=>sendotp()} className="btn btn-block btn-primary">
            SEND OTP
          </button>
          <button type="button" onClick={()=>verifyotp()} className="btn btn-block btn-primary">
            VERIFY OTP
          </button>
        </form>
      </div>
    </div>
  </div>
</section>

    </div>
  )
}
