import { useState} from 'react';
import { NavLink, useNavigate} from 'react-router-dom';

import {useAppContext} from '../../context/AppContext.js';


function AddBook() {

    const token = localStorage.getItem('BOOKS_LIBRARY_ACCESS_TOKEN');
    const { userToken, setUserToken, firstNameContext } = useAppContext();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [maxBorrowDays, setMaxBorrowDays] = useState(30);
  
    const [validateErrors, setValidateErrors] = useState([]);

    const validate = () => {
      const errors = [];
      if(!title) errors.push('Title name must be provided');
      if(!maxBorrowDays) errors.push('Max Borrow Days must be provided');
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
          const response = await fetch('https://am-book-library-server.herokuapp.com/books', {
           // const response = await fetch('/books', {
           // const response = await fetch('http://localhost:5000/authors', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`

            },
            body: JSON.stringify({
                title,
                subtitle,
                maxBorrowDays,
            })
         });

          const data = await response.json();

          if(!data.errors) {
            navigate('/books');
          } else {
           if (data && data.errors) setValidateErrors(data.errors);
          }

        } catch(err) {
           if (err && err.errors) setValidateErrors(e.errors);
        }

    }

    return (
      <>
        <div className="container"> 
          <h2 className="py-2">Add Book</h2>
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
                    <label htmlFor="title">Title: </label>
                    <input className="form-control" id="title" type="text" name="title" placeholder="Title" 
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="subtitle">Subtitle </label>
                    <input className="form-control" id="lastName" type="text" name="subtitle" placeholder="Subtitle"
                    value={subtitle}
                    onChange={e => setSubtitle(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="cnp">Max Borrow Days: </label>
                    <input className="form-control" id="maxBorrowDays" type="text" name="maxBorrowDays" placeholder="Max Borrow Days"
                    value={maxBorrowDays}
                    onChange={e => setMaxBorrowDays(e.target.value)}
                    />
                </div>

           
                <button className="btn btn-primary mr-2" type="submit">Add</button>
                <NavLink className="btn btn-warning" to="/books">Cancel</NavLink>
            </form>
          </div>
        </div>
      </>  
    )
}

export default AddBook