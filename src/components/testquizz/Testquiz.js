import React,{useState, useEffect} from 'react'

import axios from 'axios'

export default function Testquiz() {
 const [selectedoption, setSelectedOption] = useState(null)
 const [name, setName]= useState(null)
 const [email, setEmail]= useState(null)
 const [subject, setSubject]= useState(null)
 const [topic, setTopic]= useState(null)
 const [examid, setExamid]= useState(null)
 const [qid,setQid]= useState(1)
 const [q,setQ] = useState(null)
 const [a,setA]= useState(null)
 const [b,setB]= useState(null)
 const [c,setC]= useState(null)
 const [d,setD]= useState(null)
 const [ans,setAns] = useState(null)
 const [marks,setMarks] = useState(null)

 const formdata = new FormData()
  const next = async()=>{
    formdata.append("option",selectedoption)
    formdata.append("qid",qid)
    formdata.append("email",email)
    await axios.post("//localhost:5000/submitquiz",formdata,{
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(response=>console.log(response))
    setQid(parseInt(qid) + 1)
    console.log(qid)
  }
  const prev = ()=>{
    setQid(parseInt(qid) - 1)
  }
 useEffect(()=>{
    const submitted = async()=>{
      formdata.append("qid",qid)
      await axios.post("//localhost:5000/testquiz", formdata, {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }).then((response)=>{
          setA(response.data["data"]["a"])
          setB(response.data["data"]["b"])
          setC(response.data["data"]["c"])
          setD(response.data["data"]["d"])
          setQid(response.data["data"]["qid"])
          setExamid(response.data["data"]["examid"])
          setMarks(response.data["data"]["marks"])
          setQ(response.data["data"]["q"])
          setSubject(response.data["data"]["subject"])
          setTopic(response.data["data"]["topic"])
          setEmail(response.data["data"]["uid"])
        
        } 
      )}
      submitted()
  })
  

  return (
    <div>

      <main>
        <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
          <div className="container">
            <div className="col-12 d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-900">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <div className="card-body">
                    <div className="row">
                      
                      <div className="col"><span><h4 className="display-6">Email:{email} </h4></span></div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-3">
                    <div className="mb-0 h6">
                      SUBJECT: {subject}
                    </div>
                  </div>
                  <div className="form-group col-3">
                    <div className="mb-0 h6">
                      TOPIC: {topic}
                    </div>
                  </div>
                  <div className="form-group col-3">
                    <div className="mb-0 h6">
                      EXAM-ID: {examid}
                    </div>
                  </div>
                  <div className="form-group col-3">
                    <div className="mb-0 h6">
                      TIME LEFT:<div id="time">                                            </div>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="container">
                    <div id="overlay">
                      <div className="row" id="question-list">
                      </div> 
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="mb-0 h4">
                    <div id="queid">Q.{qid}</div><div id="que"> {q}</div><div id="mark">[mark: {marks}] </div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="h6" htmlFor="exampleFormControlTextarea1">Select your Answer</label>
                  <table id="options" className="table">
                    <tbody><tr>
                        <td id="a">
                        <input type="radio" name="option" onChange={(event)=>setSelectedOption(event.target.value)} checked={selectedoption === "a"} className='form-check-input' value="a"/>
                        <label htmlFor='option'> 𝐀.{a}</label>
                        </td>
                      </tr>
                      <tr>
                        <td id="b">
                        <input type="radio" name="option" onChange={(event)=>setSelectedOption(event.target.value)} checked={selectedoption === "b"} className='form-check-input' value="b"/>
                        <label htmlFor='option'> 𝐁.{b}</label>
                        </td>
                      </tr>
                      <tr>
                        <td id="c">
                        <input type="radio" name="option" onChange={(event)=>setSelectedOption(event.target.value)} checked={selectedoption === "c"} className='form-check-input' value="c"  />
                        <label htmlFor='option'> 𝐂.{c} </label> </td>
                      </tr>
                      <tr>
                        <td id="d">
                        <input type="radio" name="option" onChange={(event)=>setSelectedOption(event.target.value)} checked={selectedoption === "d"} className='form-check-input' value="d"/>
                        <label htmlFor='option'>𝐃.{d} </label></td>
                      </tr>
                    </tbody></table>
                </div>
                <div className="row">
                  <div className="form-group col-3">
                    <div className="mb-0 h6">
                      <input type="button" defaultValue="Prev" id="prev" onClick={()=>prev()} className="btn btn-primary btn-rounded" />
                    </div>
                  </div>
                  <div className="form-group col-3">
                    <div className="mb-0 h6">
                      <input type="button" defaultValue="Next" id="next" onClick={()=>next()} className="btn btn-primary btn-rounded" />
                    </div>
                  </div>
                  <div className="form-group col-3">
                    <div className="mb-0 h6">
                      <input type="button" defaultValue="Submit" id="submit" className="btn btn-success btn-rounded" />
                    </div>
                  </div>
                  <div className="form-group col-3">
                    <div className="mb-0 h6">
                      <button className="btn btn-primary btn-rounded" id="bookmark">Bookmark</button>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="btn btn-block btn-primary" id="finish">Finish Test</div>
                </div>
                
                <div className="form-group">
                  <div className="container">
                    <div className="justify-content-center align-items-center">
                      <div id="otEmbedContainer" style={{width: '320px', height: '320px', display: 'none'}}>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="container" id="videocheck" style={{display: 'none'}}>
                      <div className="justify-content-center align-items-center">
                        <video id="stream" width={320} height={320}>
                          <canvas id="capture" width={320} height={320} />
                        </video>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div></section>
      </main>
   
    </div>
  )
}
