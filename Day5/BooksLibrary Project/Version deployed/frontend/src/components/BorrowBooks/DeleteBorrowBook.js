import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {useAppContext} from '../../context/AppContext.js';

function DeleteBorrowBook() {


  const { borrowBookId } = useParams();
 
  const token = localStorage.getItem('BOOKS_LIBRARY_ACCESS_TOKEN');
  const { firstNameContext } = useAppContext();

  const [borrowBookD, setBorrowBookD] = useState();
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate()


      useEffect(() => {

            async function getBorrowBook() {
           
                try{
                  const response = await fetch(`https://am-book-library-server.herokuapp.com/borrowbooks/${borrowBookId}`, {
                  //const response = await fetch(`/borrowbooks/${borrowBookId}`, {
                    headers: {
                      Authorization: `Bearer ${token}`
                    }
                  });

                  const data = await response.json();
                  const borrowbooks = data.borrowBooks;
                  setBorrowBookD(borrowbooks[0]);
               
               
                } catch(err) {
                    if (err && err.errors) setErrors(err.errors);
                }
                            
            };
              
          getBorrowBook();
      }, [])



  async function handleDelete() {

      try {
          const res = await fetch(`https://am-book-library-server.herokuapp.com/borrowbooks/delete/${borrowBookId}`, {
          //const res = await fetch(`/borrowbooks/delete/${borrowBookId}`, {
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

          navigate('/borrowbooks');


      } catch(err) {
          setErrors(err.errors);
      }
  }

  return (
    <>
    <div className="container"> 
      <h2 className="py-2">Borrow Book Delete</h2>
      <h3 id="bookName">{borrowBookD && borrowBookD.title}</h3>
      <h3 id="redaerName"> {borrowBookD && borrowBookD.reader_firstname + ' '+ borrowBookD.reader_firstname}</h3>
      <div className="errors-container">
          { errors.length > 0 && (
            <ul className='alert alert-danger'>
              {errors.map( (err, idx) => <li key={idx}> {err} </li>)}
            </ul>
          ) }
      </div>
      <div className="py-4">
        <p>Proceed with deleting this borrow book?</p>
      </div>
      <div>
        <button className="delete-button btn btn-danger" type="submit" onClick={handleDelete}>Delete Book</button>
        <NavLink className="btn btn-warning ml-2" to={`/borrowbook/${borrowBookId}`} role="button">Cancel</NavLink>
        </div>
        
      </div>
    </>
  )
}


export default DeleteBorrowBook;