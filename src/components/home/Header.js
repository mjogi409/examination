import React from 'react'

import banner from './images/banner.jpeg'
export default function Header(props) {
  return (
    <div>
        <header>
        <div id="home" className="header-hero bg_cover" style={{backgroundImage: "url('https://www.perfecent.com/wp-content/uploads/2019/11/banner-bg.png')"}}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="header-hero-content text-center">
                                <h3 className="header-sub-title wow fadeInUp" data-wow-duration="1.3s" data-wow-delay="0.2s">Online Exam Proctoring System</h3>
                                <h2 className="header-title wow fadeInUp" data-wow-duration="1.3s" data-wow-delay="0.5s">Deter. Detect. Prevent.</h2>
                                <p className="text wow fadeInUp" data-wow-duration="1.3s" data-wow-delay="0.8s">Online proctoring to advance your learning and testing program. Validate knowledge. Reduce costs. Expand access.</p>
                                <a href="login" className="main-btn wow fadeInUp" data-wow-duration="1.3s" data-wow-delay="1.1s">Login/Register</a>
                            </div>
                        </div>
                    </div> 
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="header-hero-image text-center wow fadeIn" data-wow-duration="1.3s" data-wow-delay="1.4s">
                                <img src={props.img} alt="hero"/>
                            </div>
                        </div>
                    </div>
                </div> 
                <div id="particles-1" className="particles"></div>
            </div> 
        </header>
   
    </div>
  )
}
