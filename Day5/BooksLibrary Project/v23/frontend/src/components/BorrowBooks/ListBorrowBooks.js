import { useAppContext } from "../../context/AppContext";
import { NavLink } from 'react-router-dom';
import { useState , useEffect} from 'react';

 function ListBorrowBooks() {
  
    const token = localStorage.getItem('BOOKS_LIBRARY_ACCESS_TOKEN');
    const { userToken, userTypeContext} = useAppContext();
    const [borrowBooksD, setBorrowBooksD] = useState([]);
    const [errors, setErrors] = useState([]);
    let books = [];

   
    useEffect(() => {
    
          async function getBorrowBooks() {
              try{
                const response = await fetch('/borrowbooks', {
                   headers: {
                     Authorization: `Bearer ${token}`
                   }
                });

                const data = await response.json();
                console.log(data);
                const { borrowBooks } = data;
                console.log('borrowBooks', borrowBooks);
                setBorrowBooksD(borrowBooks);
                
              } catch(err) {
                 if (err && err.errors) setErrors(err.errors);
              }
                           
          };
             
         getBorrowBooks();
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
            <NavLink className="btn btn-success" to="/borrowbook/add" role="button" hidden={userTypeContext === 'R'} >Add Borrow</NavLink>
            </div><div className="borrowbooks-container">
            <table className="table table-striped table-hover">
              <thead className="thead-dark">
               <tr>
                 <th> Title</th>
                 <th> Reader </th>
                 <th> Borrow Date </th>
                 <th> Return Date </th>
                 <th> Due Date </th>
                 <th> </th>
               </tr> 
              </thead>   
              <tbody>
                 {borrowBooksD && borrowBooksD.length > 0 && borrowBooksD.map((borrowBook) => 
                  <tr key={borrowBook.id}>
                    <td key="1"> {borrowBook.book.title} </td> 
                    <td key="2"> {borrowBook.reader.firstName + ' ' + borrowBook.reader.lastName} </td> 
                    <td key="3"> {borrowBook.startDate} </td> 
                    <td key="4"> {borrowBook.returnDate} </td> 
                    <td key="5"> {borrowBook.endDate} </td> 
                    <td> <NavLink className="btn btn-primary" to={`/borrowbook/${borrowBook.id}`}>Details</NavLink> </td>
                  </tr> )}
         
              </tbody>
           </table>
          </div>
        </div>
        </>
    )
    
}


export default ListBorrowBooks;
