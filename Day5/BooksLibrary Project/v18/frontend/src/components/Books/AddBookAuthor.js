import { useState} from 'react';
import { useParams, useNavigate, NavLink} from 'react-router-dom';

import {useAppContext} from '../../context/AppContext.js';


function AddBookAuthor() {
    const { bookId } = useParams();
    const token = localStorage.getItem('BOOKS_LIBRARY_ACCESS_TOKEN');
    const { userToken, setUserToken, firstNameContext } = useAppContext();
    const navigate = useNavigate();

   
    const [book, setBook] = useState('');
    const [author, setAuthor] = useState('');
    //const [maxBorrowDays, setMaxBorrowDays] = useState(30);


    const [validateErrors, setValidateErrors] = useState([]);

    const validate = () => {
      const errors = [];
      /*
      if(!title) errors.push('Title name must be provided');
      if(!subtitle) errors.push('Subtitle name must be provided');
      if(!maxBorrowDays) errors.push('Max Borrow Days must be provided');
      */
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
          const response = await fetch('/authors', {
           // const response = await fetch('http://localhost:5000/authors', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`

            },
            body: JSON.stringify({
               // title,
               // subtitle,
               // maxBorrowDays,
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
          <h2 className="py-2">Add Author</h2>
          <div class="errors-container">
            { validateErrors.length > 0 && (
               <ul className='alert alert-danger'>
                {validateErrors.map( (err, idx) => <li key={idx}> {err} </li>)}
               </ul>
            ) }
          </div>

          <div className="bookauthor-container">
            <form className="authoradd-form" onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Book: </label>
                    <select className="form-control" id="book" name="book" placeholder="Book" 
                    value={book}
                    onChange={e => setBook(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="subtitle">Author: </label>
                    <input className="form-control" id="author" name="author" placeholder="Author"
                    value={author}
                    onChange={e => setAuthor(e.target.value)}
                    />
                </div>
           
                <button className="btn btn-primary mr-2" type="submit">Add</button>
                <NavLink className="btn btn-warning" to={`/books/${bookId}`}>Cancel</NavLink>
            </form>
          </div>
        </div>
        

      </>  
    )
}

export default AddBookAuthor;