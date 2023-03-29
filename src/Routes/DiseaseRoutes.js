import React, { useState } from 'react'
import { Link,Outlet } from 'react-router-dom';
import './diseaseRoute.css'


function DiseaseRoutes() {
  
    return (
        <>

        
       
<nav className="navbar navbar-expand-lg navbar-dark ">
  <div className="container-fluid">
    <ul className="navbar-nav nav-center">
      <li className="nav-item">
        <Link to="create" className="nav-link">
          <button>Create Disease</button>
        </Link>
      </li>
      <li className="nav-item">
        <Link to="edit" className="nav-link">
          <button>Update</button>
        </Link>
      </li>
    </ul>
  </div>
</nav>

        <Outlet/>
       
        </>

    )
}

export default DiseaseRoutes


