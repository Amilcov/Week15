import { useState, useEffect } from 'react';
import { NavLink, useNavigate} from 'react-router-dom';
import {useAppContext} from '../../context/AppContext.js';
import './Login.css'


function Login() {

    const { userTypeContext, setUserTypeContext, setUserToken, setCurrentUserId, setFirstNameContext} = useAppContext();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validateErrors, setValidateErrors] = useState([]);

    const validate = () => {
      const errors = [];
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
          const response = await fetch('https://am-book-library-server.herokuapp.com/users/login', {
             //const response = await fetch('/users/login', {
           // const response = await fetch('http://localhost:5000/users/token', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              email,
              password
            })
         });

          const data = await response.json();

          if(!data.errors) {
            setUserToken(data.token);
            setCurrentUserId(data.user.id);
            setFirstNameContext(data.user.firstName);
            setUserTypeContext(data.user.type);
    
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
          <h2 className="py-2">Login</h2>
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
            <form className="login-form" onSubmit={onSubmit}>
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
                <button className="btn btn-primary mr-2" type="submit">Login</button>
                <NavLink className="btn btn-warning" to="/signup">Don't have an account? Register here.</NavLink>
            </form>
          </div>
        </div>
        
    )
}

export default Login