//TODO: Convert in jsx form
import React from 'react'

export default function Profile() {
  return (
    <div><section className="py-5">
    <div className="container">
      <div className="card shadow bg-white text-secondary">
        <div className="card-body">
          <div className="container">
            <div className="row">
              <div className="col-10 offset-1">
                <h1 className="text-center">Get in touch today</h1>
                <br />
                <div className="row  justify-content-center feature-container">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.250853889362!2d70.77984891503426!3d22.306350685320446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959c98c99357d59%3A0xc5009f9692f9e21f!2sAirport%20Main%20Rd%2C%20Rajkot%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1671391813328!5m2!1sen!2sin"
                    width={600}
                    height={450}
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <p />
                <p />
                <div className="row  justify-content-center feature-container">
                  <div className="col-12 col-md-4">
                    <div className="container">
                      <div className="row center-block">
                        <div className="icon-box mb-4">
                          <div className="icon icon-dark mb-4">
                            <span className="fas fa-map-marker-alt" />
                          </div>
                          <h2 className="h5 icon-box-title">Visit us</h2>
                          <span>
                            57/103,
                            <br />
                            Race Course Park,
                            <br />
                            Airport Road,
                            <br />
                            Rajkot - 360001
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="container">
                      <div className="row align-items-center">
                        <div className="icon-box mb-4">
                          <div className="icon icon-dark mb-4">
                            <span className="fas fa-phone-volume" />
                          </div>
                          <h2 className="h5 icon-box-title">Call</h2>
                          <a href="tel:+91 9320907041">91+ 9427306225</a>
                          <div className="text-small text-gray">
                            Mon - Sat, 7am - 11pm
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="container">
                      <div className="row align-items-center">
                        <div className="icon-box mb-4">
                          <div className="icon icon-dark mb-4">
                            <span className="far fa-paper-plane" />
                          </div>
                          <h2 className="h5 icon-box-title">Email</h2>
                          <a href="/">jogimalay.mj@gmail.com</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
    </div>
  )
}
