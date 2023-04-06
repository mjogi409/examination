import React from 'react'
import Header from './Header'
import jmwstots from './images/juicy-monitor-with-small-text-on-the-screen.gif'
import About from './About'
import Profile from './Profile.'
import Footer from './Footer'
export default function Home() {
  return (
    <div>
    <Header img={jmwstots}/>
    <About title1="Our Mission" description1="Making green exam assessment reach last mile across globe"
    title2 = "Our Vision" description2 ="We believe 'Future of world starts in a Classroom'  Our Vision is to invent & invent develop secure and future reasy Ed-tech Solutions featuring simple functionality"
    />
    <About title1 = "Exam Proctoring" description1 ={[ "An all-inclusive remote monitoring solution, including image verification and computer restrictions"
              
              ,<li>Automated Proctoring</li>,
              <li>Live Proctoring</li>,
              <li>Professional review</li>]}
    title2 = "Content Protection" description2 ={[ "OEPS.ai ensures exam integrity by preventing navigation ,use of mobiles devices,screen captures,printing or sharing"
              
    ,<li>Distribution Prevention</li>,
    <li>Copy/Print/Download restrictions</li>]}/>
    <About
    title1="Distribution Prevention"
    description1="OEPS.ai prevents test distribution through a host of adjustable settings to restrict the ability to copy and paste, print, download or make screen captures while automatically clearing caches and disabling extensions during the assessment to keep exam content secure."
    title2="Image Verification"
    description2={["Identification is captured, analyzed and verified, then only allowed to login.",
    <li>Advanced facial detection technology</li>,
    <li>Automated Verification</li>,
    <li>Live Image Verification</li>
    ]}/>
    <About
    title1="Data Analytics"
    description1={["Instant, objective data is immediately available after every assessment, with parameters set by instructors or administrators.",
    <li>Administrative Dashboard</li>,
    <li>Student Management</li>,
    <li>Aggregate Exam Data</li>]}
    title2="Admin Dashboard"
    description2="Create global settings and usage reports that give you actionable information by department, school or institution. Filter activity and reporting by course, test-taker, or exam.

    Manage exam parameters, computer requirements, account information, faculty controls, and Gradebook settings."/>
    <About
    title1="Professional Review"
    description1="Our highly-trained experts are available to analyze exam proctoring for issues of academic dishonesty. We deliver detailed reporting same day, next day or in 3 days based on your needs."
    title2="Actionable Information"
    description2="OEPS.ai data analytics become instantly available after every assessment, and accumulate over time. This information is useful for quickly identifying unusual or suspicious behaviors that may indicate academic dishonesty.

    By flagging test-takers who may need help, OEPS.ai is a valuable tool for boosting retention and improving learning outcomes."
    />
    <Profile/>
    <Footer/>
    </div>
  )
}
