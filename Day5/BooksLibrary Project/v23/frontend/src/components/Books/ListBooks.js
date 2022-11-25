import { useAppContext } from "../../context/AppContext";
import { NavLink } from 'react-router-dom';
import { useState , useEffect} from 'react';

 function ListBooks() {
  
    const token = localStorage.getItem('BOOKS_LIBRARY_ACCESS_TOKEN');
    const { userToken, userTypeContext} = useAppContext();
    const [booksD, setBooksD] = useState([]);
    const [errors, setErrors] = useState([]);
    let books = [];

    useEffect(() => {
    
          async function getBooks() {
           
              try{
                const response = await fetch('/books', {
                   headers: {
                     Authorization: `Bearer ${token}`
                   }
                });

                const data = await response.json();
                books = data.books;
                setBooksD(books);
                
              } catch(err) {
                 if (err && err.errors) setErrors(err.errors);
              }
                           
          };
             
         getBooks();
     }, [])
     
    return (
        <>
        <p></p>
        <div className="container"> 
          <h2 className="py-2">Books</h2>
          <div class="errors-container">
                { errors.length > 0 && (
                  <ul className='alert alert-danger'>
                    {errors.map( (err, idx) => <li key={idx}> {err} </li>)}
                  </ul>
                ) }
          </div>
          <div className="py-2">
            <NavLink className="btn btn-success" to="/book/add" role="button" hidden={userTypeContext === 'R'} >Add Book</NavLink>
            </div><div className="books-container">
            <table className="table table-striped table-hover">
              <thead className="thead-dark">
               <tr>
                 <th> Title</th>
                 <th> Authors </th>
                 <th> Max Borrow Days </th>
                 <th> </th>
               </tr> 
              </thead>   
              <tbody>
                 {booksD && booksD.length > 0 && booksD.map((book) => 
                  <tr>
                    <td key="1"> {book.title} </td> 
                    <td key="3">{book.Authors.map( author => author.firstName + ' ' +author.lastName). join(', ')}</td>
                    <td key="4">{book.maxBorrowDays} </td> 
                    <td> <NavLink className="btn btn-primary" to={`/book/${book.id}`}>Details</NavLink> </td>
                  </tr> )}
         
              </tbody>
           </table>
          </div>
        </div>
        </>
    )
    
}


export default ListBooks;
