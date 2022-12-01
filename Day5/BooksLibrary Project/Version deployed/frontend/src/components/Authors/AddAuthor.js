import { useState} from 'react';
import { NavLink, useNavigate} from 'react-router-dom';

import {useAppContext} from '../../context/AppContext.js';


function AddAuthors() {

    const { userToken, setUserToken, firstNameContext } = useAppContext();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [cnp, setCnp] = useState('');
    const [about, setAbout] = useState('');
    const [validateErrors, setValidateErrors] = useState([]);

    const validate = () => {
      const errors = [];
      if(!firstName) errors.push('First name must be provided');
      if(!lastName) errors.push('Last name must be provided');
      if(!cnp) errors.push('cnp must be provided and be unique');
      return errors;
    };

    const token = localStorage.getItem('BOOKS_LIBRARY_ACCESS_TOKEN');

    async function onSubmit(e) {
       e.preventDefault();

       const errors = validate();
       
        if (errors.length) {
           setValidateErrors(errors);
           return;
        };

        try{
          const response = await fetch('https://am-book-library-server.herokuapp.com/authors', {
           //const response = await fetch('/authors', { 
           // const response = await fetch('http://localhost:5000/authors', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`

            },
            body: JSON.stringify({
                firstName,
                lastName,
                "CNP": cnp,
                about,
            })
         });

          const data = await response.json();

          if(!data.errors) {
            navigate('/authors');
          } else {
           if (data && data.errors) setValidateErrors(data.errors);
          }

        } catch(err) {
           if (err && err.errors) setValidateErrors(e.errors);
        }

    }

    return (

        <div className="container"> 
          <h2 className="py-2">Add Author</h2>
          <div className="errors-container">
            { validateErrors.length > 0 && (
               <ul className='alert alert-danger'>
                {validateErrors.map( (err, idx) => <li key={idx}> {err} </li>)}
               </ul>
            ) }
          </div>

          <div className="login-container">
            <div className="errors-container">
            </div>
            <form className="authoradd-form" onSubmit={onSubmit}>
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
                    <label htmlFor="cnp">CNP: </label>
                    <input className="form-control" id="cnp" type="text" name="cnp" placeholder="CNP"
                    value={cnp}
                    onChange={e => setCnp(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="about">About:</label>
                    <input className="form-control" id="about" type="text" name="about" placeholder="About" 
                    value={about}
                    onChange={e => setAbout(e.target.value)}
                    />
                </div>
           
                <button className="btn btn-primary mr-2" type="submit">Add</button>
                <NavLink className="btn btn-warning" to="/authors">Cancel</NavLink>
            </form>
          </div>
        </div>
        
    )
}

export default AddAuthors