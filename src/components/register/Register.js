import React,{ useState} from 'react'
import HttpClient from '../HttpClient';

export default function Register() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const registeruser = async ()=>{
    try {
      await HttpClient.post("//localhost:5000/register", {
        email,
        password,
      });

      window.location.href = "/login";
    } catch (error) {
      if (error.response.status === 401) {
        alert("Invalid credentials");
      }
    }
  }
  return (
    <div>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
  <div className="container">
    <div className="col-12 d-flex align-items-center justify-content-center">
      <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-650">
        <div className="text-center text-md-center mb-4 mt-md-0">
          <h1 className="mb-0 h3">Create an Account</h1>
        </div>
        <div className="card-body">
          <form action="" method="POST" className="mt-4">
            
            <div className="form-group">
              <label htmlFor="email">EMAIL</label>
              <div className="input-group mb-4">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <span className="fas fa-envelope" />
                  </span>
                </div>
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="example@company.com"
                  aria-label="email address"
                  required=""
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </div>
            </div>
            
              
            
            <div className="form-group">
              <label htmlFor="password">PASSWORD</label>
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
                  id="password"
                  style={{ WebkitTextSecurity: "disc" }}
                  placeholder="Password"
                  aria-label="Password"
                  required=""
                  onChange={(e)=>setPassword(e.target.value)}
                />
              </div>
            </div>
            
            <div className="form-group">
           
          
            <div id="snapshot" />
            
            </div>
            <input
              type="button"
              onClick={()=> registeruser()}
              className="btn btn-block btn-primary form-group justify-content-center"
              defaultValue="Register"
            />
          </form>
          <p>
            Already have an account?
            <a href="/login">Click here</a>.
          </p>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</section>

    </div>
  )
}
