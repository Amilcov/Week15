import { NavLink } from 'react-router-dom';
import './Nav.css'


function Nav() {

    return (
   
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary mt-0 pt-0">
          <a class="navbar-brand" href="/stock">Books Library</a>

          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav mr-auto">
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