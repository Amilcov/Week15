import { useAppContext } from "../../context/AppContext";
import { NavLink } from 'react-router-dom';
import { useState , useEffect} from 'react';
import DatePicker from 'react-datepicker';

import searchIcon from '../../assets/search.png';
import './BorrowBooks.css';

 function ListBorrowBooks() {
  
    const token = localStorage.getItem('BOOKS_LIBRARY_ACCESS_TOKEN');
    const { userToken, userTypeContext} = useAppContext();
    const [borrowBooksD, setBorrowBooksD] = useState([]);
    const [borrowBooksAllD, setBorrowBooksAllD] = useState([]);

    const [showSearchBorrowBook, setShowSearchBorrowBook] = useState(false);
    const [searchTitle, setSearchTitle] = useState('');
    const [searchReader, setSearchReader] = useState('');
    const [searchDueDate, setSearchDueDate] = useState();

    const [errors, setErrors] = useState([]);
    let books = [];

   
    useEffect(() => {
    
          async function getBorrowBooks() {
              try{
                const response = await fetch('https://am-book-library-server.herokuapp.com/borrowbooks', {
                // const response = await fetch('/borrowbooks', {  
                   headers: {
                     Authorization: `Bearer ${token}`
                   }
                });

                const data = await response.json();
                const { borrowBooks } = data;
                setBorrowBooksD(borrowBooks);
                setBorrowBooksAllD(borrowBooks);
                console.log('borrowBooks', borrowBooks);
                
              } catch(err) {
                 if (err && err.errors) setErrors(err.errors);
              }
                           
          };
             
         getBorrowBooks();
     }, []);

     useEffect(() => {
      let result = borrowBooksAllD.filter(borrowBook => borrowBook.book.title.toLowerCase().includes(searchTitle.toLowerCase()));
      setBorrowBooksD(result);
     }, [searchTitle]);

     
     
      useEffect(() => {
        let result = borrowBooksAllD.filter(borrowBook => {
          let firstName = !searchReader.length ? true : borrowBook.reader.firstName.toLowerCase().includes(searchReader.toLowerCase());
          let lastName = !searchReader.length ? true : borrowBook.reader.lastName.toLowerCase().includes(searchReader.toLowerCase());
          return (firstName || lastName) && borrowBook;
        });
        setBorrowBooksD(result);
     }, [searchReader]);
         

      useEffect(() => {
         let result = borrowBooksAllD.filter(borrowBook => {
            let dueDate = !searchDueDate.length ? true : borrowBook.endDate == searchDueDate;
            return dueDate && borrowBook;
        });
   
        setBorrowBooksD(result);
      }, [searchDueDate]);


    
     

    return (
        <>
        <p></p>
        <div className="container"> 
          <h2 className="py-2">Borrow Books</h2>

          <div className="errors-container">
                { errors.length > 0 && (
                  <ul className='alert alert-danger'>
                    {errors.map( (err, idx) => <li key={idx}> {err} </li>)}
                  </ul>
                ) }
          </div>
          <div className="py-2">
            <NavLink className="btn btn-success" to="/borrowbook/add" role="button" hidden={userTypeContext === 'R'} >Add Borrow</NavLink>

            <img id="searchBorrowBook" src={searchIcon} alt="Search Borrow Book" onClick={() => setShowSearchBorrowBook(!showSearchBorrowBook)}/>  
            {showSearchBorrowBook && (
              <>
               <label class="searchcell_first"> Title: <input type="text" value={searchTitle} onChange={e => setSearchTitle(e.target.value)} placeholder="search book"/> </label>
               <label class="searchcell_second"> Reader: <input type="text" value={searchReader} onChange={e => setSearchReader(e.target.value)} placeholder="search reader"/> </label>
               <label class="searchcell_second"> Due Date: <input type="date" value={searchDueDate} onChange={e => {alert(searchDueDate) ;setSearchDueDate(e.target.value); } } placeholder="search due date"/> </label>
              </> 
            )}

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
