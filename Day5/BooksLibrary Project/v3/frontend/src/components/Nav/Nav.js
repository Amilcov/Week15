import { NavLink } from 'react-router-dom';
import './Nav.css'


function Nav() {

    return (
   
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary mt-0 pt-0">
          <NavLink className="navbar-brand" to="/books">Books Library</NavLink>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/books"> Books </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/readers"> Readers </NavLink>
              </li>
              </ul>
              <span className="navbar-text px-4">
                <NavLink className="btn btn-sm btn-dark mr-2" to="/login"> Login </NavLink>
                <NavLink className="btn btn-sm btn-dark" to="/signup"> Register </NavLink>
            </span>
           </div>
        </nav>
    ) 

};

export default Nav;