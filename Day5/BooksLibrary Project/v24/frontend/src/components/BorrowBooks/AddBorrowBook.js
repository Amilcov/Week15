import { useState, useEffect} from 'react';
import { NavLink, useNavigate} from 'react-router-dom';

import {useAppContext} from '../../context/AppContext.js';
import './BorrowBooks.css';


function AddBorrowBook() {

    const token = localStorage.getItem('BOOKS_LIBRARY_ACCESS_TOKEN');
    const userId = localStorage.getItem('BOOKS_LIBRARY_USERID');
    const { userToken, setUserToken, firstNameContext } = useAppContext();
    const navigate = useNavigate();

   
    const [bookId, setBookId] = useState('');
    const [readerId, setReaderId] = useState('');
    const [booksD, setBooksD] = useState([]);
    const [usersD, setUsersD] = useState([]);
 
    let dateTime = new Date().toLocaleString('ro-RO');
    let date = dateTime.substring(0, 10).split('.');
    let start = date.reverse().join('-');
 
    const [startDate, setStartDate] = useState(start);
  
    let future = new Date();
    future.setDate(future.getDate() + 30);

    dateTime = future.toLocaleString('ro-RO');
    date = dateTime.substring(0, 10).split('.');
    let end = date.reverse().join('-');
  
    const [returnDate, setReturnDate] = useState();
    
    let [endDate, setEndDate] = useState(end);
    let [a, setA] = useState('');
    const [validateErrors, setValidateErrors] = useState([]);

    const validate = () => {
      const errors = [];
      if(!bookId) errors.push('Title name must be selected');
      if(!readerId) errors.push('User name must be selected');
      if(!startDate) errors.push('Start Date must be provided');
      if(!endDate) errors.push('Due Date must be provided');

      return errors;
    };


     useEffect(() => {
    
          async function getBooks() {
         
              try{
                const response = await fetch(`/books`, {
                   headers: {
                     Authorization: `Bearer ${token}`
                   }
                });

                const data = await response.json();
                const books = data.books;
                setBooksD(books);
                
               
                  console.log(a);
              } catch(err) {
                 if (err && err.errors) setValidateErrors(err.errors);
              }
                           
          };
          getBooks();
          

          async function getUsers() {
              try{
                const response = await fetch("/users", {
                   headers: {
                     Authorization: `Bearer ${token}`
                   }
                });

                const data = await response.json(); 
                const users = data.users.filter(user => user.type === 'R');

                setUsersD(users);
                
              } catch(err) {
                 if (err && err.errors) setValidateErrors(err.errors);
              }
                           
          };

          getUsers();
             
      
     }, [])

    async function onSubmit(e) {
       e.preventDefault();

       const errors = validate();
       
        if (errors.length) {
           setValidateErrors(errors);
           return;
        };

        try{

          const response = await fetch(`/borrowbooks`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`

            },
            body: JSON.stringify({
               userId,
               bookId,
               readerId,
               startDate,
               endDate
            })
         });

          const data = await response.json();
         if(!data.errors) {
            navigate('/borrowbooks');
          } else {
           if (data && data.errors) setValidateErrors(data.errors);
          }
       
          


        } catch(err) {
           if (err && err.errors) setValidateErrors(e.errors);
        }

    }

    /*
    useEffect( () => {

      //let bookSelected = setBooksD.filter(book => book.id === bookIdSelected);
      console.log('1. bookId', bookId);
      if (!bookId) return;
      console.log('2.bookId', bookId);
   
      let bookSelected = booksD(book => book.id === bookId);
   
      console.log(bookSelected);
      let maxBorrowDays = bookSelected || 30;
      let future = new Date();
      future.setDate(future.getDate() + maxBorrowDays);

      dateTime = future.toLocaleString('ro-RO');
      date = dateTime.substring(0, 10).split('.');
      let end = date.reverse().join('-');
       setEndDate(end);

    }, [bookId]);

*/
    

    return (
      <>
        <div className="container"> 
          <h2 className="py-2">Add Borrow</h2>
          <div className="errors-container">
            { validateErrors.length > 0 && (
               <ul className='alert alert-danger'>
                {validateErrors.map( (err, idx) => <li key={idx}> {err} </li>)}
               </ul>
            ) }
          </div>

          <div className="borrow-container">
            <form className="borrowadd-form" onSubmit={onSubmit}>

                <div className="form-group">
                    <label htmlFor="subtitle">Book: </label>
                    <select className="form-control" id="book" name="book" placeholder="Book"
                    value={bookId}
                    onChange={e => setBookId(e.target.value)}>
                      <option></option>
                     {booksD.map(book => <option key={book.id} value={book.id}>{book.title}</option>)}
                    </select>
                </div>


                <div className="form-group">
                    <label htmlFor="subtitle">User: </label>
                    <select className="form-control" id="user" name="user" placeholder="user"
                    value={readerId}
                    onChange={e => setReaderId(e.target.value)}>
                      <option></option>
                     {usersD.map(user => <option key={user.id} value={user.id}>{user.firstName + '  ' + user.lastName}</option>)}
                    </select>
                </div>

                <div className="form"> 
                  <div className="row">
                     <div className="col">
                        <label>Borrow Date:</label>
                     </div>
                     <div className="col">
                       <label>Return Date:</label>
                     </div>

                     <div className="col">
                       <label>Due Date:</label>
                     </div>
                  </div>

                 <div className="row"> 
                   <div className="col">
                    <input className="form-control" id="startDate" type="date" name="startDate" placeholder="Borrow Date"
                      value={startDate}
                      onChange={e => setStartDate(e.target.value)}
                      />
                   </div>

                    <div className="col">
                      <input className="form-control" id="returnDate" type="date" name="returnDate" placeholder="Return Date"
                      value={returnDate}
                      onChange={e => { console.log(e.target.value);setReturnDate(e.target.value)}}
                      />
                    </div>
                    <div className="col"><input className="form-control" id="endDate" type="date" name="endDate" placeholder="End Date"
                      value={endDate}
                      onChange={e => setEndDate(e.target.value)}
                      /></div>
                  </div>
                </div>
                <button className="btn btn-primary mr-2 mt-3" type="submit">Add</button>
                <NavLink className="btn btn-warning mt-3" to="/borrowbooks">Cancel</NavLink>
            </form>
          </div>
        </div>
      </>  
    )
}

export default AddBorrowBook