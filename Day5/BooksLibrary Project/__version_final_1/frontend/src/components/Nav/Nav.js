import { NavLink } from 'react-router-dom';
import {useAppContext} from '../../context/AppContext.js';


function Nav() {
    const { firstNameContext, currentUserId, userTypeContext} = useAppContext();
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
                <NavLink className="nav-link" to="/authors"> Authors </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/users"> Users </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/borrowbooks"> BorrowBooks </NavLink>
              </li>
               <li className="nav-item">
                <NavLink className="nav-link" to="/info"></NavLink>
              </li>
              </ul>
              {currentUserId > 0 && (
                 <span className="navbar-text px-4" id="firstName"> Welcome {firstNameContext}!
                   <NavLink className="btn btn-sm btn-warning ml-2" to= "/logout"> Logout </NavLink>
                </span>
              )}

              {!currentUserId && (
              <span className="navbar-text px-4" id="firstName"> 
                <NavLink className="btn btn-sm btn-dark mr-2" to= "/login"> Login </NavLink>
                <NavLink className="btn btn-sm btn-dark" to="/signup"> Register </NavLink>
            </span>
            )}

           </div>
        </nav>
    ) 

};

export default Nav;