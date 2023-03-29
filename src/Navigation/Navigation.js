import { Link } from 'react-router-dom';
import { useAuth } from '../Auth/auth';
import { useState } from 'react';
import './Navigation.css';

const Navigation = () => {
  const [active, setActive] = useState('home');
  const auth=useAuth()
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      
      <div className="container-fluid ">
        <Link to="/" className="navbar-brand">
        SymptoDiag
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/home " className={`nav-link ${active === 'home' ? 'active' : ''}`}>
              <button onClick={() => setActive('home')}>Home</button>
               
              </Link>
            </li>
            {auth.role==="admin" &&
            <li className="nav-item">
              <Link to="/disease" className={`nav-link ${active === 'disease' ? 'active' : ''}`}>
              <button onClick={() => setActive('disease')}>Disease</button>
              </Link>
            </li>
            }
            {auth.role==="admin" &&
            <li className="nav-item">
              <Link to="/mapped" className={`nav-link ${active === 'mapped' ? 'active' : ''}`}>
              <button onClick={() => setActive('mapped')}>Mapped</button>
              </Link>
            </li>
}
{auth.role &&
            <li className="nav-item">
              <Link to="/predict" className={`nav-link ${active === 'predict' ? 'active' : ''}`}>
              <button onClick={() => setActive('predict')}>Search</button>
              </Link>
            </li>
}
            {auth.role==="admin" &&
            <li className="nav-item">
              <Link to="/symptom" className={`nav-link ${active === 'symptom' ? 'active' : ''}`}>
              <button onClick={() => setActive('symptom')}>Symptom</button>
              </Link>
            </li>
}
            {!auth.role && 
            <li className="nav-item">
              <Link to="/login" className={`nav-link ${active === 'login' ? 'active' : ''}`}>
              <button onClick={() => setActive('login')}>Login</button>
              </Link>
            </li>
}
            {auth.role  &&
            <li className="nav-item">
              <Link to="/logout" className={`nav-link ${active === 'logout' ? 'active' : ''}`}>
              <button onClick={() => setActive('logout')}>Logout</button>
              </Link>
            </li>
}
              {!auth.role  &&
            <li className="nav-item">
              <Link to="/signup" className={`nav-link ${active === 'signup' ? 'active' : ''}`}>
              <button  onClick={() => setActive('signup')}>SignUp</button>
              </Link>
            </li>
}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
