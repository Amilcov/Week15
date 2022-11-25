import { useState, useEffect} from 'react';
import { useParams, useNavigate, NavLink} from 'react-router-dom';


import {useAppContext} from '../../context/AppContext.js';


function AddBookAuthor() {
    const { bookId } = useParams();
   
    const token = localStorage.getItem('BOOKS_LIBRARY_ACCESS_TOKEN');
    const { userToken, setUserToken, firstNameContext } = useAppContext();
    const navigate = useNavigate();

   
    const [bookD, setBookD] = useState('');
    const [authorsD, setAuthorsD] = useState([]);
    const [authorId, setAuthorId] = useState('');
    const [errors, setErrors] = useState('');


    const [validateErrors, setValidateErrors] = useState([]);

    const validate = () => {
      const errors = [];
     
      if(!bookId) errors.push('Please select an author');
      if(!authorId) errors.push('Book must be selected');
  
      return errors;
    };


     useEffect(() => {
    
          async function getBook() {
         
              try{
                const response = await fetch(`/books/${bookId}`, {
                   headers: {
                     Authorization: `Bearer ${token}`
                   }
                });

                const data = await response.json();
                const book = data.book;
                setBookD(book);
                
              } catch(err) {
                 if (err && err.errors) setErrors(err.errors);
              }
                           
          };

      
          getBook();
          async function getAuthors() {
              try{
                const response = await fetch("/authors", {
                   headers: {
                     Authorization: `Bearer ${token}`
                   }
                });

                const data = await response.json();
                console.log('authors',data);
                
                const authors = data.authors;
                setAuthorsD(authors);
                
              } catch(err) {
                 if (err && err.errors) setErrors(err.errors);
              }
                           
          };

          getAuthors();
             
      
     }, [])

    async function onSubmit(e) {
       e.preventDefault();

       const errors = validate();
       
        if (errors.length) {
           setValidateErrors(errors);
           return;
        };

        try{
          const response = await fetch(`/bookauthors`, {
           // const response = await fetch('http://localhost:5000/authors', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`

            },
            body: JSON.stringify({
               bookId,
               authorId,
            })
         });

          const data = await response.json();

          if(!data.errors) {
            navigate(`/book/${bookId}`);
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
          <div className="errors-container">
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
                    <select className="form-control" id="book" name="book" required >
                       <option value={bookD.id}> {bookD.title}</option>
                    </select>   
                </div>

                <div className="form-group">
                    <label htmlFor="subtitle">Author: </label>
                    <select className="form-control" id="author" name="author" placeholder="Author"
                    value={authorId}
                    onChange={e => setAuthorId(e.target.value)}>
                      <option></option>
                     {authorsD.map(author => <option key={author.id} value={author.id}>{author.firstName + ' ' + author.lastName + ' ' +author.CNP}</option>)}
                    </select>
                </div>
           
                <button className="btn btn-primary mr-2" type="submit">Add</button>
                <NavLink className="btn btn-warning" to={`/book/${bookId}`} >Cancel</NavLink>
            </form>
          </div>
        </div>
        

      </>  
    )
}

export default AddBookAuthor;