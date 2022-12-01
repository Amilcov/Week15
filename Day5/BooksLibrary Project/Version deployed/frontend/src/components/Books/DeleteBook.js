import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {useAppContext} from '../../context/AppContext.js';

function DeleteBook() {

  const { bookId } = useParams();
  const token = localStorage.getItem('BOOKS_LIBRARY_ACCESS_TOKEN');
  const { firstNameContext } = useAppContext();

  const [bookD, setBookD] = useState();
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate()


      useEffect(() => {

            async function getBook() {
             
                try{
                  const response = await fetch(`https://am-book-library-server.herokuapp.com/books/${bookId}`, {
                   //const response = await fetch(`/books/${bookId}`, { 
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
      }, [])



  async function handleDelete() {

      try {
          const res = await fetch(`https://am-book-library-server.herokuapp.com/books/delete/${bookId}`, {
          //const res = await fetch(`/books/delete/${bookId}`, { 
              method: "DELETE",
              headers: {
                  "Authorization": `Bearer ${token}`
              }
          });

          if (res.status === 401) {
            navigate('/login');
          };

          if (!res.ok) {
            throw res;
          };

          navigate('/books');


      } catch(err) {
          setErrors(err.errors);
      }
  }

  return (
    <>
    <div className="container"> 
      <h2 className="py-2">Book Delete</h2>
      <h3 id="bookName">{bookD && bookD.title}</h3>
      <div className="errors-container">
          { errors.length > 0 && (
            <ul className='alert alert-danger'>
              {errors.map( (err, idx) => <li key={idx}> {err} </li>)}
            </ul>
          ) }
      </div>
      <div className="py-4">
        <p>Proceed with deleting this book?</p>
      </div>
      <div>
        <button className="delete-button btn btn-danger" type="submit" onClick={handleDelete}>Delete Book</button>
        <NavLink className="btn btn-warning ml-2" to={`/book/${bookId}`} role="button">Cancel</NavLink>
        </div>
        
      </div>
    </>
  )
}


export default DeleteBook;