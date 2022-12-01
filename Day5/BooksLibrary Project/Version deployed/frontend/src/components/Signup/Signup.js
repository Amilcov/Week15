import { useState} from 'react';
import { NavLink, useNavigate} from 'react-router-dom';
import {useAppContext} from '../../context/AppContext.js';
import './Signup.css'


function Signup() {

    const { userTypeContext, setUserTypeContext, firstNameContext, setFirstNameContext, setUserToken, setCurrentUserId } = useAppContext();
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

    async function onSubmit(e) {
       e.preventDefault();

       const errors = validate();
       
        if (errors.length) {
           setValidateErrors(errors);
           return;
        };

        try{
          const response = await fetch('https://am-book-library-server.herokuapp.com/users/signup', {
          //const response = await fetch('/users/signup', {
           // const response = await fetch('http://localhost:5000/users/signup', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName,
                lastName,
                username,
                email,
                password, 
            })
         });

          const data = await response.json();

          if(!data.errors) {
            setUserToken(data.token);
            setCurrentUserId(data.user.id);
            setFirstNameContext(firstName);
            setUserTypeContext('R');

            localStorage.setItem('BOOKS_LIBRARY_ACCESS_TOKEN', data.token);
            localStorage.setItem('BOOKS_LIBRARY_USERID', data.user.id);
          
            navigate('/books');
          } else {
           if (data && data.errors) setValidateErrors(data.errors);
          }

        } catch(e) {
           if (e && e.errors) setValidateErrors(e.errors);
        }

    }


    return (

        <div className="container"> 
          <h2 className="py-2">Register</h2>
          <div>
            { validateErrors.length > 0 && (
               <ul className='alert alert-danger'>
                {validateErrors.map( (err, idx) => <li key={idx}> {err} </li>)}
               </ul>
            ) }
          </div>

          <div className="signup-container">
            <div className="errors-container">
            </div>
            <form className="signup-form" onSubmit={onSubmit}>
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
                    <label htmlFor="username">Userame: </label>
                    <input className="form-control" id="username" type="text" name="username" placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
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
                <button className="btn btn-primary mr-2" type="submit">Register</button>
                <NavLink className="btn btn-warning" to="/login">Already have an account? Login here.</NavLink>
            </form>
          </div>
        </div>
        
    )
}

export default Signup