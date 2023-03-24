import { Link } from 'react-router-dom';
import { useAuth } from '../Auth/auth';
import './Navigation.css';

const Navigation = () => {
  const auth=useAuth()
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          My App
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
              <Link to="/home" className="nav-link">
                Home
              </Link>
            </li>
            {auth.role==="admin" &&
            <li className="nav-item">
              <Link to="/disease" className="nav-link">
                Disease
              </Link>
            </li>
            }
            {auth.role==="admin" &&
            <li className="nav-item">
              <Link to="/mapped" className="nav-link">
                Mapped
              </Link>
            </li>
}
{auth.role &&
            <li className="nav-item">
              <Link to="/predict" className="nav-link">
                SearchDisease
              </Link>
            </li>
}
            {auth.role==="admin" &&
            <li className="nav-item">
              <Link to="/symptom" className="nav-link">
                Symptom
              </Link>
            </li>
}
            {!auth.role && 
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
}
            {auth.role  &&
            <li className="nav-item">
              <Link to="/logout" className="nav-link">
                Logout
              </Link>
            </li>
}
              {!auth.role  &&
            <li className="nav-item">
              <Link to="/signup" className="nav-link">
                Sign Up
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
