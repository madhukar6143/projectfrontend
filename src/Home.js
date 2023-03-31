import React from 'react'

import { useEffect } from 'react';
import { useAuth } from './Auth/auth'
import './Home.css'

function Home() {
    const auth =useAuth();


    return (
<div>
<div className="home">
    
           
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <h1 className="text-center">Disease Prediction</h1>
            <p className="lead text-center">SymptoDiag - Your ultimate symptom-based disease diagnosis tool for accurate and reliable results</p>
            {!auth.role && <div className="text-center">
             Please Login to continue....
            </div>
}
          </div>
        </div>
      </div>
    </div>

        
            
           
    
     </div>

    )
}

export default Home