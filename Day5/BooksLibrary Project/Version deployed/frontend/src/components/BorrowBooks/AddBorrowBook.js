import { useState, useEffect} from 'react';
import { NavLink, useNavigate} from 'react-router-dom';

import {useAppContext} from '../../context/AppContext.js';
import searchIcon from '../../assets/search.png';
import './BorrowBooks.css';


function AddBorrowBook() {

    const token = localStorage.getItem('BOOKS_LIBRARY_ACCESS_TOKEN');
    const userId = localStorage.getItem('BOOKS_LIBRARY_USERID');
    const { userToken, setUserToken, firstNameContext } = useAppContext();
    const navigate = useNavigate();

   
    const [bookId, setBookId] = useState('');
    const [readerId, setReaderId] = useState('');
    const [booksD, setBooksD] = useState([]);
    const [booksAllD, setBooksAllD]= useState([]);
    const [usersD, setUsersD] = useState([]);
    const [usersAllD, setUsersAllD] = useState([]);

 
    let dateTime = new Date().toLocaleString('ro-RO');
    let date = dateTime.substring(0, 10).split('.');
    let start = date.reverse().join('-');
 
    const [startDate, setStartDate] = useState(start);
  
    let future = new Date();
    future.setDate(future.getDate() + 30);
  
    const [returnDate, setReturnDate] = useState();
    const [endDate, setEndDate] = useState();

    const [showSearchBook, setShowSearchBook] = useState(false);
    const [showSearchUser, setShowSearchUser] = useState(false);

    const [searchTitle, setSearchTitle] = useState('');
    const [searchUserFirstName, setSearchUserFirstName] = useState(''); 
    const [searchUserLastName, setSearchUserLastName] = useState(''); 
    const [searchUserEmail, setSearchUserEmail] = useState(''); 

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
                const response = await fetch(`https://am-book-library-server.herokuapp.com/books`, {
                //const response = await fetch(`/books`, {
                
                   headers: {
                     Authorization: `Bearer ${token}`
                   }
                });

                const data = await response.json();
                const books = data.books;
                setBooksAllD(books);
                setBooksD(books);

              } catch(err) {
                 if (err && err.errors) setValidateErrors(err.errors);
              }
                           
          };
          getBooks();
          

          async function getUsers() {
              try{
                const response = await fetch("https://am-book-library-server.herokuapp.com/users", {
                //const response = await fetch("/users", {
                   headers: {
                     Authorization: `Bearer ${token}`
                   }
                });

                const data = await response.json(); 
                const users = data.users.filter(user => user.type === 'R');
                setUsersAllD(users); 
                setUsersD(users);
                
              } catch(err) {
                 if (err && err.errors) setValidateErrors(err.errors);
              }
                           
          };

          getUsers();
             
      
     }, [])

  
     useEffect(() => {
      let result = booksAllD.filter(book => book.title.toLowerCase().includes(searchTitle.toLowerCase()));
      setBooksD(result);
     }, [searchTitle]);


    useEffect(() => {
      let result = usersAllD.filter(user => {
         let firstName = !searchUserFirstName.length ? true : user.firstName.toLowerCase().includes(searchUserFirstName.toLowerCase());
         let lastName = !searchUserLastName.length ? true : user.lastName.toLowerCase().includes(searchUserLastName.toLowerCase());
         let email = !searchUserEmail.length ? true : user.email.toLowerCase().includes(searchUserEmail.toLowerCase());
         return firstName && lastName && email
        }
         );
      setUsersD(result);
      

     }, [
      searchUserFirstName, searchUserLastName, searchUserEmail
    ]);



    async function onSubmit(e) {
       e.preventDefault();

       const errors = validate();
       
        if (errors.length) {
           setValidateErrors(errors);
           return;
        };

        try{

          const response = await fetch(`https://am-book-library-server.herokuapp.com/borrowbooks`, {
          //const response = await fetch(`/borrowbooks`, {
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

    const handleOnChangeBook = (newBookId) => {
      setBookId(newBookId);
      let bookSelected = booksD.find(book => book.id == newBookId);
      let maxBorrowDays = 30;
      if (bookSelected) maxBorrowDays = bookSelected.maxBorrowDays;
      let future = new Date();
      future.setDate(future.getDate() + maxBorrowDays);

      dateTime = future.toLocaleString('ro-RO');
      date = dateTime.substring(0, 10).split('.');
      let end = date.reverse().join('-');
      setEndDate(end);
    };

                    

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
                    <img id="searchBook" src={searchIcon} alt="Search Book" onClick={() => setShowSearchBook(!showSearchBook)}/>  
                    {showSearchBook && (
                    <label class="searchcell_first"> Title: <input type="text" value={searchTitle} onChange={e => setSearchTitle(e.target.value)} placeholder="search book"/> </label>
                    )}
                
                    <select className="form-control" id="book" name="book" placeholder="Book"
                    value={bookId}
                    onChange={e => handleOnChangeBook(e.target.value)}>
                      <option></option>
                      {booksD.map(book => <option key={book.id} value={book.id}>{book.title}</option>)}
                    </select>
                </div>
                  


                <div className="form-group">
                    <label htmlFor="subtitle">User: </label>
                     <img id="searchUser" src={searchIcon} alt="Search User" onClick={() => setShowSearchUser(!showSearchUser)}/> 
                      {showSearchUser && (
                        <>
                         <label className="searchcell_first"> First Name: <input type="text" value={searchUserFirstName} onChange={e => setSearchUserFirstName(e.target.value)} placeholder="search first name"/> </label>
                         <label className="searchcell_second"> Last Name: <input type="text" value={searchUserLastName} onChange={e => setSearchUserLastName(e.target.value)} placeholder="search last name"/> </label>
                        <label className="searchcell_second"> Email: <input type="text" value={searchUserEmail} onChange={e => setSearchUserEmail(e.target.value)} placeholder="search Email"/> </label>
                        </>
                      )}
                
                
                    <select className="form-control" id="user" name="user" placeholder="user"
                    value={readerId}
                    onChange={e => setReaderId(e.target.value)}>
                      <option></option>
                     {usersD.map(user => <option key={user.id} value={user.id}>{user.firstName + '  ' + user.lastName + '     - Email: ' + user.email}</option>)}
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
                      onChange={e => { setReturnDate(e.target.value)}}
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