import React from 'react'
import about1 from './images/about1.svg'
import aboutshape1 from './images/about-shape-1.svg'
import aboutshape2 from './images/about-shape-2.svg'
import about2 from './images/about2.svg'

export default function About(props) {
  return (

    <div>
    
    <section id="about" className="about-area pt-70">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="about-content mt-50 wow fadeInLeftBig" data-wow-duration="1s" data-wow-delay="0.5s">
              <div className="section-title">
                <div className="line" />
                <h3 className="title">{props.title1}</h3>
              </div> 
              <p className="text">{props.description1}</p>
              
            </div>               </div>
          <div className="col-lg-6">
            <div className="about-image text-center mt-50 wow fadeInRightBig" data-wow-duration="1s" data-wow-delay="0.5s">
              <img src={about1} alt="about" />
            </div> 
          </div>
        </div> 
      </div>
      <div className="about-shape-1">
        <img src={aboutshape1} alt="shape" />
      </div>
    </section>
    <section className="about-area pt-70">
      <div className="about-shape-2">
        <img src={aboutshape2} alt="shape" />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 order-lg-last">
            <div className="about-content mt-50 wow fadeInLeftBig" data-wow-duration="1s" data-wow-delay="0.5s">
              <div className="section-title">
                <div className="line" />
                <h3 className="title">{props.title2}</h3>
              </div>
              <p className="text">{props.description2}</p>
            </div> 
          </div>
          <div className="col-lg-6 order-lg-first">
            <div className="about-image text-center mt-50 wow fadeInRightBig" data-wow-duration="1s" data-wow-delay="0.5s">
              <img src={about2} alt="about" />
            </div> 
          </div>
        </div> 
      </div>
    </section>  </div>
  )
}
