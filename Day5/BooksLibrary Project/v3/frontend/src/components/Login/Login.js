import { useState, useEffect } from 'react';
import { NavLink, useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import Signup from '../Signup/Signup.js';
import ListBooks from '../ListBooks/ListBooks.js';
import {useAppContext} from '../../context/AppContext.js';


function Login() {

    const { setUserToken, setCurrentUserId, setFirstName} = useAppContext();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validateErrors, setValidateErrors] = useState([]);

    const validate = () => {
      const errors = [];
      // .... some chekings both on local + server
      return errors;
    };

   async function onSubmit(e) {
      e.preventDefault();

      const errors = validate();
      const response = await fetch('http://localhost:5000/users/token', {
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
      console.log('data.status', data.status);
         console.log('data', data);

      if(!data.status) {
        //setUserToken(token);
        console.log('data', data);
        setUserToken(data.token);
        setCurrentUserId(data.user.id);
        setFirstName(data.user.firstName);
        console.log('data.token', data.token);
        console.log('data.user', data.user);
        console.log('i m in login');
       // <NavLink to="/books"> List Books </NavLink>
         navigate('/books');
      }

    // <ListBooks />

    //  if (errors.length > 0) return setValidateErrors(errors);

    //  const data = {credential, password};

    //  useEffect(() => {
    //     const login = async () => {
    //         const response = await fetch('http:\\localhost:5000',{})
    //     }
    //  }, []);

   // <Signup/ >


   /*
   
   */

   }


    return (

        <div className="container"> 
          <h2 className="py-2">Login</h2>
          <div>
            { validateErrors.length > 0 && (
               <ul>
                {validateErrors.map( (err, idx) => <li key={idx}> {err} </li>)}
               </ul>
            ) }
          </div>

          <div className="login-container">
            <div className="errors-container">
            </div>
            <form className="login-form" onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email or Username:</label>
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
                <NavLink className="btn btn-warning" to="/register">Don't have an account? Register here.</NavLink>
            </form>
          </div>
        </div>
        
    )
}

export default Login