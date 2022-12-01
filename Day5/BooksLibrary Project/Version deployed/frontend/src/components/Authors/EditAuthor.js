import { useState, useEffect } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';

import {useAppContext} from '../../context/AppContext.js';


function EditAuthor() {
    const { authorId } = useParams();
    const { userToken, setUserToken } = useAppContext();
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


    useEffect(() => {
    
          async function getAuthor() {
              try{
                const response = await fetch(`https://am-book-library-server.herokuapp.com/authors/${authorId}`, {
                //const response = await fetch(`/authors/${authorId}`, {
                   headers: {
                     Authorization: `Bearer ${token}`
                   }
                });

                const data = await response.json();
                  
                const author = data.author;
              
                setFirstName(author.firstName);
                setLastName(author.lastName);
                setCnp(author.CNP);
                setAbout(author.about);

              
              } catch(err) {
                  if (err && err.errors) setValidateErrors(err.errors);
              }
                           
          };
             
         getAuthor();
     }, [])

    async function onSubmit(e) {
       e.preventDefault();

       const errors = validate();
       
        if (errors.length) {
           setValidateErrors(errors);
           return;
        };

        try{
          const response = await fetch(`https://am-book-library-server.herokuapp.com/authors/edit/${authorId}`, {
          //const response = await fetch(`/authors/edit/${authorId}`, {  
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

        } catch(e) {
           if (e && e.errors) setValidateErrors(e.errors);
        }

    }


    return (
      <>
        <div className="container"> 
          <h2 className="py-2">Author Edit</h2>
           <div className="errors-container">
            { validateErrors.length > 0 && (
               <ul className='alert alert-danger'>
                {validateErrors.map( (err, idx) => <li key={idx}> {err} </li>)}
               </ul>
            ) }
          </div>

          <div className="author-container">
            <div className="errors-container">
            </div>
            <form className="authoredit-form" onSubmit={onSubmit}>
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
           
                <button className="btn btn-primary mr-2" type="submit">Update Author</button>
                <NavLink className="btn btn-warning" to="/authors">Cancel</NavLink>
            </form>
          </div>
        </div>
    </>    
    )
}

export default EditAuthor