import { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useAppContext } from "../../context/AppContext";
import './Books.css';


function DetailBook() {
    const { bookId } = useParams();
    const token = localStorage.getItem('BOOKS_LIBRARY_ACCESS_TOKEN');
    const { userTypeContext } = useAppContext();

    const [bookD, setBookD] = useState();
    const [errors, setErrors] = useState([]);
    

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
     }, [])


    return(
      <>
        <div id="book-container">
        <h3>Book Detail</h3>
        <div class="errors-container">
            { errors.length > 0 && (
              <ul className='alert alert-danger'>
                {errors.map( (err, idx) => <li key={idx}> {err} </li>)}
              </ul>
            ) }
        </div>
        <div className="ml-2">
          <ul>
            <li key="1" className="bullet"> Title: {bookD && bookD.title}</li>
            <li key="2" className="bullet"> Subtitle: {bookD && bookD.subtitle}</li>
            <li key="3" className="bullet"> Max Borrow Days: {bookD && bookD.maxBorrowDays}</li>
          </ul>
        </div>
        <div>
 
        </div>
        <div className="py-4">
           {userTypeContext === 'R' && (<NavLink className="btn btn-primary disabled" to={`/book/edit/${bookId}`} role="button"> Edit </NavLink> )}
           {userTypeContext === 'W' && (<NavLink className="btn btn-primary" to={`/book/edit/${bookId}`} role="button"> Edit </NavLink> )}
           {userTypeContext === 'R' && (<NavLink className="btn btn-danger ml-2 disabled" to={`/book/delete/${bookId}`} role="button"> Delete </NavLink>)}
           {userTypeContext === 'W' && (<NavLink className="btn btn-danger ml-2" to={`/book/delete/${bookId}`} role="button"> Delete </NavLink>)}
          <NavLink className="btn btn-warning ml-2" to="/books" role="button"> Return To List </NavLink>
        </div>
        </div>
    
      </>
    ) 

}

export default DetailBook;