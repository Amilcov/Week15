import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

function DeleteUser() {
const { userId } = useParams();
const token = localStorage.getItem('BOOKS_LIBRARY_ACCESS_TOKEN');

const navigate = useNavigate();

const [userD, setUserD] = useState();
const [errors, setErrors] = useState([]);


    useEffect(() => {
    
          async function getUser() {
              try{
                const response = await fetch(`/users/${userId}`, {
                   headers: {
                     Authorization: `Bearer ${token}`
                   }
                });

                const data = await response.json();
                const user = data.user;
       
                setUserD(user);
         
              } catch(e) {

              }
                           
          };
             
         getUser();
     }, [])



async function handleDelete() {
    try {
    
       
        const res = await fetch(`/users/delete/${userId}`, {
        
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });


        if (res.status === 401) {
           navigate('/login');
        };

        if (!res.ok) {
           throw res;
        };

        navigate('/users');


    } catch(err) {
        if (err && err.errors) setErrors(err.errors);
    }
}


    return (
      <>
        <div class="container"> 
          <h2 class="py-2">User Delete</h2>
          <h3 id="userName">{userD && userD.firstName + ' ' + userD.lastName}</h3>
          <div class="errors-container">
            { errors.length > 0 && (
               <ul className='alert alert-danger'>
                {errors.map( (err, idx) => <li key={idx}> {err} </li>)}
               </ul>
            ) }
          </div>
          <div class="py-4">
            <p>Proceed with deleting this user?</p>
          </div>
          <div>
            <button className="delete-button btn btn-danger" type="submit" onClick={handleDelete}>Delete User</button>
            <NavLink className="btn btn-warning ml-2" to={`/user/${userId}`} role="button">Cancel</NavLink>
            </div>
            <p class="d-none" id="authorId">9</p>
           </div>
      </>
    )
}


export default DeleteUser;