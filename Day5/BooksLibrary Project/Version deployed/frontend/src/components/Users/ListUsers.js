import { useAppContext } from "../../context/AppContext";
import { NavLink } from 'react-router-dom';
import { useState , useEffect} from 'react';
import searchIcon from '../../assets/search.png';
import './Users.css';

 function ListUsers() {
    const token = localStorage.getItem('BOOKS_LIBRARY_ACCESS_TOKEN');
    const { userToken, userTypeContext, currentUserId } = useAppContext();
  
    const [usersD, setUsersD] = useState([]);
    const [usersAllD, setUsersAllD] = useState([]);

    const [showSearchUser, setShowSearchUser] = useState(false);

    const [searchUserFirstName, setSearchUserFirstName] = useState(''); 
    const [searchUserLastName, setSearchUserLastName] = useState(''); 
    const [searchUserEmail, setSearchUserEmail] = useState(''); 
    const [searchUserType, setSearchUserType] = useState(''); 

    const [errors, setErrors] = useState([]);
    let users = [];

    useEffect(() => {
          async function getUsers() {
             let url = userTypeContext === 'R' ? `https://am-book-library-server.herokuapp.com/users/${currentUserId}`: 'https://am-book-library-server.herokuapp.com/users';
             //let url = userTypeContext === 'R' ? `/users/${currentUserId}`: '/users';
             
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
                setUsersAllD(users);

              } catch(err) {
                  if (err && err.errors) setErrors(err.errors);
              }
                           
          };
             
         getUsers();
     }, []);


      useEffect(() => {
      let result = usersAllD.filter(user => {
         let firstName = !searchUserFirstName.length ? true : user.firstName.toLowerCase().includes(searchUserFirstName.toLowerCase());
         let lastName = !searchUserLastName.length ? true : user.lastName.toLowerCase().includes(searchUserLastName.toLowerCase());
         let email = !searchUserEmail.length ? true : user.email.toLowerCase().includes(searchUserEmail.toLowerCase());
         let type = !searchUserType === 'A' ? true : user.type === searchUserType;
         return firstName && lastName && email && type
        }
         );
      setUsersD(result);
      

     }, [searchUserFirstName, searchUserLastName, searchUserEmail, searchUserType]);
     
    return (
        <>
        <p></p>
        <div className="container"> 
          <h2 className="py-2">Users</h2>
          <div className="errors-container">
            { errors.length > 0 && (
               <ul className='alert alert-danger'>
                {errors.map( (err, idx) => <li key={idx}> {err} </li>)}
               </ul>
            ) }
          </div>
          <div className="py-2">
            <NavLink className="btn btn-success" to="/user/add" role="button" hidden={userTypeContext === 'R'}>Add User</NavLink>

            <img id="searchUser" src={searchIcon} alt="Search User" onClick={() => setShowSearchUser(!showSearchUser)}/> 
            {showSearchUser && (
               <div>
                  <label className="searchcell_first"> First Name: <input className="search_input" type="text" value={searchUserFirstName} onChange={e => setSearchUserFirstName(e.target.value)} placeholder="search first name"/> </label>
                  <label className="searchcell_second"> Last Name: <input className="search_input" type="text" value={searchUserLastName} onChange={e => setSearchUserLastName(e.target.value)} placeholder="search last name"/> </label>
                  <label className="searchcell_second"> Email: <input className="search_input" size="15"  type="text" value={searchUserEmail} onChange={e => setSearchUserEmail(e.target.value)} placeholder="search Email"/> </label>  
                  <label className="searchcell_second"> Type: 
                     <select value={searchUserType} onChange={e => setSearchUserType(e.target.value)} > 
                       <option value="A">All</option>
                       <option value="R">Reader</option>
                       <option value="W">Worker</option>
                     </select>
                  </label>  
                </div>
              )}


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
