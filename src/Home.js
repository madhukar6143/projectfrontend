import React from 'react'
import { useAuth } from './Auth/auth'

function Home() {
    const auth =useAuth();
    return (
<div>
<div className="home">
    <h1>Welcome to home page {auth.user}</h1>
   {auth.role && <div>your are assiged {auth.role} privilages </div>}
           
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <h1 className="text-center">Disease Prediction</h1>
            <p className="lead text-center">Get personalized disease predictions based on your symptoms and medical history.</p>
            <div className="text-center">
             Please Login to continue....
            </div>
          </div>
        </div>
      </div>
    </div>

        
            
           
    
     </div>

    )
}

export default Home