import React from 'react'

export default function Footer() {
  return (
    <div>
      <footer id="footer" className="footer-area pt-120">
  <div className="container">
    <div
      className="subscribe-area wow fadeIn"
      data-wow-duration="1s"
      data-wow-delay="0.5s"
    >
      <div className="row">
        <div className="col-lg-6">
          <div className="subscribe-content mt-45">
            <h2 className="subscribe-title">
              Subscribe Our Newsletter <span>get reguler updates</span>
            </h2>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="subscribe-form mt-50">
            <form action="#">
              <input type="text" placeholder="Enter eamil" />
              <button className="main-btn">Subscribe</button>
            </form>
          </div>
        </div>
      </div>{" "}
      {/* row */}
    </div>{" "}
    {/* subscribe area */}
    <div className="footer-copyright">
      <div className="row">
        <div className="col-lg-12">
          <div className="copyright d-sm-flex justify-content-between">
            <div className="copyright-content">
              <p className="text">
                Designed and Developed by{" "}
                <a href="https://uideck.com" rel="nofollow">
                  Malay Jogi
                </a>
              </p>
            </div>{" "}
            {/* copyright content */}
          </div>{" "}
          {/* copyright */}
        </div>
      </div>{" "}
      {/* row */}
    </div>{" "}
    {/* footer copyright */}
  </div>{" "}
  {/* container */}
  <div id="particles-2" />
</footer>

    </div>
  )
}
