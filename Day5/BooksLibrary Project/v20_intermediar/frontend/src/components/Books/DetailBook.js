import { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useAppContext } from "../../context/AppContext";
import './Books.css';


function DetailBook() {
    const { bookId } = useParams();
    const token = localStorage.getItem('BOOKS_LIBRARY_ACCESS_TOKEN');
    const { userTypeContext } = useAppContext();

    const [bookD, setBookD] = useState();
    const [authorsD, setAuthorsD] = useState([]);
    const [errors, setErrors] = useState([]);
    

    useEffect(() => {
    
          async function getBook() {
              try{
                const response = await fetch(`/books/${bookId}`, {
                   headers: {
                     Authorization: `Bearer ${token}`
                   }
                });

                console.log(1);
                const data = await response.json();
                 console.log(2, 'data', data);
                const book = data.book;
                console.log('3. Book detail-', book);
                setBookD(book);
                console.log('4. book.Authors detail-', book.Authors);
                setAuthorsD(book.Authors);
          
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
            <br/>
           {userTypeContext === 'W' && (<NavLink className="btn btn-primary" to={`/book/edit/${bookId}`} role="button"> Edit </NavLink> )}
           {userTypeContext === 'R' || (userTypeContext === 'W' && authorsD && authorsD.length > 0) && (<NavLink className="btn btn-danger ml-2 disabled" to={`/book/delete/${bookId}`} role="button"> Delete </NavLink>)}
           {userTypeContext === 'W' && authorsD && !authorsD.length && (<NavLink className="btn btn-danger ml-2" to={`/book/delete/${bookId}`} role="button"> Delete </NavLink>)}
          <NavLink className="btn btn-warning ml-2" to="/books" role="button"> Return To List </NavLink>
        </div>
        </div>

        
        <div className="pt-3 pb-5"> 
           <h3 className="py-2"> Authors </h3>
           <div className="py-3">
               <NavLink className="btn btn-success" to={`/book/${bookId}/author/add`} role="button">Add Author </NavLink>
           </div>

           <table className="table table-striped table-hover">
             <thead className="thead-dark">
               <tr>
                 <th> First Name </th>
                 <th> Last Name </th>
                 <th> CNP </th>
                 <th> About </th>
                 <th></th>
                 <th></th>
              </tr>
             </thead>   
             <tbody>
                {authorsD && authorsD.length > 0 && authorsD.map((author) => 
                  <tr>
                    <td key="1"> {author.firstName} </td> 
                    <td key="2">{author.lastName}</td>
                    <td key="3">{author.CNP} </td> 
                    <td key="4">{author.about}</td>
                    <td className="btn btn-danger"> Delete</td>
                  </tr> )} 
             </tbody> 
      
           </table>
         </div>
    
      </>
    ) 

}
export default DetailBook;

