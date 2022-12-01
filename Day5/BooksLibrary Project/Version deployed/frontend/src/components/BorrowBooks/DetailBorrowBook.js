import { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useAppContext } from "../../context/AppContext";
import './BorrowBooks.css';


function DetailBorrowBook() {
    const { borrowBookId } = useParams();
    const token = localStorage.getItem('BOOKS_LIBRARY_ACCESS_TOKEN');
    const { userTypeContext } = useAppContext();

    const [borrowBookD, setBorrowBookD] = useState();
    const [errors, setErrors] = useState([]);
    

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
                const borrowBook = data.borrowBooks;

                borrowBook[0].all_authors = borrowBook.map(record => record.author_firstname + ' ' + record.author_lastname ). join(', ') ||'';
                setBorrowBookD(borrowBook[0]);

              } catch(err) {
                 if (err && err.errors) setErrors(err.errors);
              }
                           
          };
             
         getBorrowBook();
     }, [])

   
  
    return(
      <>
        <div id="borrowbook-container">
        <h3>Borrow Book Detail</h3>
        <div className="errors-container">
            { errors.length > 0 && (
              <ul className='alert alert-danger'>
                {errors.map( (err, idx) => <li key={idx}> {err} </li>)}
              </ul>
            ) }
        </div>
        <div className="ml-2">
          <ul>
            <li key="1" className="bullet"> Title:  {borrowBookD && borrowBookD.title}</li>
            <li key="3" className="bullet"> Authors: {borrowBookD && borrowBookD.all_authors}</li>
            <li key="4" className="bullet"> Reader: {borrowBookD && borrowBookD.reader_firstname + ' '+ borrowBookD.reader_firstname}</li>
            <li key="5" className="bullet"> Borrow Date: {borrowBookD && borrowBookD.startDate} </li>
            <li key="6" className="bullet"> Return Date: {borrowBookD && borrowBookD.returnDate} </li>
            <li key="7" className="bullet"> End Date: {borrowBookD && borrowBookD.endDate} </li>
          </ul>
        </div>
        <div>
      
        </div>
        <div className="py-4">
           {userTypeContext === 'R' && (<NavLink className="btn btn-primary disabled" to={`/borrowbook/edit/${borrowBookId}`} role="button"> Edit </NavLink> )}
           {userTypeContext === 'W' && (<NavLink className="btn btn-primary" to={`/borrowbook/edit/${borrowBookId}`} role="button"> Edit </NavLink> )}
           {userTypeContext === 'R' && (<NavLink className="btn btn-danger ml-2 disabled" to={`/borrowbook/delete/${borrowBookId}`} role="button"> Delete </NavLink>)}
           {userTypeContext === 'W' && (<NavLink className="btn btn-danger ml-2" to={`/borrowbook/delete/${borrowBookId}`} role="button"> Delete </NavLink>)}
          <NavLink className="btn btn-warning ml-2" to="/borrowbooks" role="button"> Return To List </NavLink>
        </div>
        </div>
    
      </>
    ) 
    

}

export default DetailBorrowBook;