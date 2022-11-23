import { useAppContext } from "../../context/AppContext";
import { NavLink } from 'react-router-dom';
import { useState , useEffect} from 'react';
import './Users.css';

 function ListUsers() {
    const token = localStorage.getItem('BOOKS_LIBRARY_ACCESS_TOKEN');
    const { userToken, userTypeContext, currentUserId } = useAppContext();
  
    const [usersD, setUsersD] = useState([]);
    const [errors, setErrors] = useState([]);
    let users = [];

    useEffect(() => {
          async function getUsers() {
             let url = userTypeContext === 'R' ? `/users/${currentUserId}`: '/users';
              try{
                const response = await fetch(url, {
                   headers: {
                     Authorization: `Bearer ${token}`
                   }
                });

               
                const data = await response.json();
                if(userTypeContext === 'R') {
                    users = [data.user];
                } else {
                   users = data.users;
                }
                setUsersD(users);

              } catch(err) {
                  if (err && err.errors) setErrors(err.errors);
              }
                           
          };
             
         getUsers();
     }, [])
     
    return (
        <>
        <p></p>
        <div className="container"> 
          <h2 className="py-2">Users</h2>
          <div class="errors-container">
            { errors.length > 0 && (
               <ul className='alert alert-danger'>
                {errors.map( (err, idx) => <li key={idx}> {err} </li>)}
               </ul>
            ) }
          </div>
          <div className="py-2">
            <NavLink className="btn btn-success" to="/user/add" role="button" hidden={userTypeContext === 'R'}>Add User</NavLink>
            </div><div className="users-container">
            <table className="table table-striped table-hover">
              <thead className="thead-dark">
               <tr>
                 <th> Last Name </th>
                 <th> First Name </th>
                 <th> Username </th>
                 <th> Email </th>
                 <th> Contact </th>
                 <th> Type </th>
                 <th> </th>
               </tr> 
              </thead>   
              <tbody>
                 {usersD && usersD.length > 0 && usersD.map((user) => 
                  <tr>
                    <td key="1" className={user.type === 'W' ? 'worker' : 'reader'}> {user.firstName} </td> 
                    <td key="2" className={user.type === 'W' ? 'worker' : 'reader'}>{user.lastName} </td> 
                    <td key="3" className={user.type === 'W' ? 'worker' : 'reader'}>{user.username} </td> 
                    <td key="4" className={user.type === 'W' ? 'worker' : 'reader'}>{user.email} </td>
                    <td key="5" className={user.type === 'W' ? 'worker' : 'reader'}>{user.contact}</td>
                    <td key="6" className={user.type === 'W' ? 'worker' : 'reader'}>{user.type === 'R' ? 'Reader' : 'Worker'} </td>
                    <td> <NavLink className="btn btn-primary" to={`/user/${user.id}`}>Details</NavLink> </td>
                  </tr> )}
         
              </tbody>
           </table>
          </div>
        </div>
        </>
    )
}


export default ListUsers;
