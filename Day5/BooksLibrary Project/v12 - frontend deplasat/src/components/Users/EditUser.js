import { useState, useEffect } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';

function EditUser() {
    const { userId } = useParams();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validateErrors, setValidateErrors] = useState([]);

    const validate = () => {
      const errors = [];
     
      if(!firstName) errors.push('First name must be provided');
      if(!lastName) errors.push('Last name must be provided');
      if(!username) errors.push('Userame must be provided');
      if(!email) errors.push('Email must be provided');
      if(!password) errors.push('Password must be provided');
      return errors;
    };

    const token = localStorage.getItem('BOOKS_LIBRARY_ACCESS_TOKEN');


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
           
                setFirstName(user.firstName);
                setLastName(user.lastName);
                setUsername(user.username);
                setEmail(user.email);
                setPassword(user.password);
          
              } catch(e) {

              }
                           
          };
             
         getUser();
     }, [])

    async function onSubmit(e) {
       e.preventDefault();

       const errors = validate();
       
        if (errors.length) {
           setValidateErrors(errors);
           return;
        };

        try{
          const response = await fetch(`/users/edit/${userId}`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`

            },
            body: JSON.stringify({
                firstName,
                lastName,
                username,
                email, 
                password
            })
         });

          const data = await response.json();

          if(!data.errors) {
        
    
            navigate('/users');
          } else {
           if (data && data.errors) setValidateErrors(data.errors);
          }

        } catch(e) {
           if (e && e.errors) setValidateErrors(e.errors);
        }

    }


    return (

        <div className="container"> 
          <h2 className="py-2">User Edit</h2>
          <div>
            { validateErrors.length > 0 && (
               <ul className='alert alert-danger'>
                {validateErrors.map( (err, idx) => <li key={idx}> {err} </li>)}
               </ul>
            ) }
          </div>

          <div className="login-container">
            <div className="errors-container">
            </div>
            <form className="useradd-form" onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="firstname">First Name: </label>
                    <input className="form-control" id="firstname" type="text" name="firstname" placeholder="First Name" 
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">Last Name: </label>
                    <input className="form-control" id="lastName" type="text" name="lastName" placeholder="Last Name"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="cnp">Username: </label>
                    <input className="form-control" id="username" type="text" name="username" placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="cnp">Email: </label>
                    <input className="form-control" id="email" type="text" name="email" placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input className="form-control" id="password" type="password" name="password" placeholder="Password" 
                    value={password}
                    onChange={e=> setPassword(e.target.value)}
                    />
                </div>

           
                <button className="btn btn-primary mr-2" type="submit">Update User</button>
                <NavLink className="btn btn-warning" to="/users">Cancel</NavLink>
            </form>
          </div>
        </div>
        
    )
}

export default EditUser