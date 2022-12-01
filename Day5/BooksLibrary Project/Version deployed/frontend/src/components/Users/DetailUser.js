import { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useAppContext } from "../../context/AppContext";
import './Users.css';


function DetailUser() {
    const { userId } = useParams()
    const token = localStorage.getItem('BOOKS_LIBRARY_ACCESS_TOKEN');
    const { userTypeContext } = useAppContext();

    const [userD, setUserD] = useState();
    const [errors, setErrors] = useState([]);
    

    useEffect(() => {
    
          async function getUser() {
              try{
                const response = await fetch(`https://am-book-library-server.herokuapp.com/users/${userId}`, {
                //const response = await fetch(`/users/${userId}`, {
                    
                   headers: {
                     Authorization: `Bearer ${token}`
                   }
                });

                const data = await response.json();
                const user = data.user;
                setUserD(user);
        
              } catch(err) {
                 if (err && err.errors) setErrors(err.errors);
              }
                           
          };
             
         getUser();
     }, [])



    return(
        <>
        <div id="user-container">
        <h3>User Detail</h3>
          <div className="errors-container">
            { errors.length > 0 && (
               <ul className='alert alert-danger'>
                {errors.map( (err, idx) => <li key={idx}> {err} </li>)}
               </ul>
            ) }
          </div>
        <div className="ml-2">
          <ul>
            <li key="1" className="bullet"> First Name: {userD && userD.firstName}</li>
            <li key="2" className="bullet"> Last Name: {userD && userD.lastName}</li>
            <li key="3" className="bullet"> Unsername: {userD && userD.username}</li>
            <li key="4" className="bullet"> Email: {userD && userD.email}</li>
            <li key="5" className="bullet"> Contact: {userD && userD.contact}</li>
            <li key="6" className="bullet"> Type: {userD && userD.type === 'W' ? 'Worker' : 'Reader'}</li>
          </ul>
        </div>
        <div>
          <p></p>
        </div>
        <div className="py-4">
          <NavLink className="btn btn-primary" to={`/user/edit/${userId}`} role="button"> Edit </NavLink>
          {userTypeContext === 'R' && (
          <NavLink className="btn btn-danger ml-2 disabled" to={`/user/delete/${userId}`} role="button"> Delete </NavLink>)}
          {userTypeContext === 'W' && (
          <NavLink className="btn btn-danger ml-2" to={`/user/delete/${userId}`} role="button"> Delete </NavLink>)}
          <NavLink className="btn btn-warning ml-2" to="/users" role="button"> Return To List </NavLink>
        </div>
        </div>
    
        
        </>
    ) 

}

export default DetailUser