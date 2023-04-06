import React from 'react'

export default function ForgotPassword() {
    return (
        <div>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <div className="container">
          <div className="col-12 d-flex align-items-center justify-content-center">
            <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-650">
              <div className="text-center text-md-center mb-4 mt-md-0">
                <h2 className="h4">LOST PASSWORD</h2>  
              </div>
              <div className="card-body">
                <form action method="POST" className="mt-4">
                  <div className="form-group">
                    <label htmlFor="exampleInputIcon3">EMAIL</label>
                    <div className="input-group mb-4">
                      <div className="input-group-prepend">
                        <span className="input-group-text"><span className="fas fa-envelope" /></span>
                      </div>
                      <input name="lpemail" className="form-control" id="exampleInputIcon3" placeholder="example@company.com" type="text" aria-label="email adress" required />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-block btn-primary">SEND OTP</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    )
}
