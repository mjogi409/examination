
import './App.css';
import React from 'react';
import './index.css';
import { Routes, Route } from'react-router-dom';
import Login from './components/login/Login';
import Header from './components/home/Header';
import Register from './components/register/Register';
import VerifyOTP from './components/verifyotp/VerifyOTP'
import ForgotPassword from './components/forgotpassword/ForgotPassword';
import Dashboard from './components/student/Dashboard';
import GiveExam from './components/student/GiveExam';
import Result from './components/student/Result';
import professorDashboard from './components/professor/professorDashboard';
import GenerateQuestion from './components/student/GenerateQuestion';
import Home from './components/home/Home';
import Logout from './components/student/Logout';
import CreateExam from './components/student/CreateExam';
import Testquiz from './components/testquiz/testquiz';
import Updatequestion from './components/update/Updatequestion';

function App() {
  
  return(
    <>
    
    
    
    
    <Routes>
      <Route path="/" element={<Home/>} />
    <Route exact path='/login' element={[<Header img="assets/images/lock.gif"/>,<Login/>]}/>
    <Route exact path='/register' element={[<Header img="assets/images/lock.gif"/>,<Register/>]}/>
    <Route exact path='/verifyotp' element={[<Header img="assets/images/lock.gif"/>,<VerifyOTP/>]}/>
    
    <Route exact path='/forgotpassword' element={[[<Header img="assets/images/lock.gif"/>,<ForgotPassword/>]]}/>
    
    <Route path="/GiveExam" element={<GiveExam />} />
    <Route path="/StudentDashboard" element={<Dashboard />} />
    <Route path="/Result" element={<Result/>}/>
    <Route path="/profDashboard" element={<professorDashboard/>}/>
    <Route path="/GenerateQuestion" element={<GenerateQuestion/>}/>
    <Route path="/logout" element={<Logout/>}/>
    <Route path="/UpdateQuestion" element={<Updatequestion/>}/>
    <Route path="/testquiz" element={<Testquiz/>}/>
    <Route path="/CreateExam" element={<CreateExam/>}/>
    </Routes>
    
    
    </>
   
    
  )
 

}

export default App;
