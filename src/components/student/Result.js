import React from 'react'
import Sidebar from './Sidebar'

export default function Result() {
  return (

    <div className='row' style={{'margin-left': 0}}><Sidebar/>
    <div>
        <div className="row align-items-center d-flex  justify-content-center">
          <div className="col-12 mb-4">
            <div className="card border-light shadow-sm components-section align-items-center d-flex  justify-content-center">
              <div className="card-body align-items-center d-flex justify-content-center">     
                <div className="row mb-4">
                  <div className="col-lg-12 col-sm-16">
                    <h3 className="h3 text-center">STUDENT RESULTS</h3>  
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                    { 
                    //table code 
                    }
                      <table id="example" className="display nowrap" style={{width: '100%'}}>
                        <thead className="thead-light">
                          <tr>
                            <th className="border-0" scope="col">Exam ID</th>
                            <th className="border-0" scope="col">Subject</th>
                            <th className="border-0" scope="col">Topic</th>
                            <th className="border-0" scope="col">Marks</th>
                          </tr>
                        </thead><tbody><tr>
                            <td>{'{'}{'{'}test['test_id']{'}'}{'}'}</td>
                            <td>{'{'}{'{'}test['subject']{'}'}{'}'}</td> 
                            <td>{'{'}{'{'}test['topic']{'}'}{'}'}</td> 
                            <td>{'{'}{'{'}test['marks']{'}'}{'}'}</td> 
                          </tr></tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {'{'}% endblock %{'}'}
      </div>

    </div>
  )
}
