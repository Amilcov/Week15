import { useState, useEffect} from 'react';
import { useParams, useNavigate, NavLink} from 'react-router-dom';


import {useAppContext} from '../../context/AppContext.js';
import './BookAuthors.css';
import searchIcon from '../../assets/search.png';


function AddBookAuthor() {
    const { bookId } = useParams();
   

    const token = localStorage.getItem('BOOKS_LIBRARY_ACCESS_TOKEN');
    const { userToken, setUserToken, firstNameContext } = useAppContext();
    const navigate = useNavigate();

   
    const [bookD, setBookD] = useState('');
    const [authorsD, setAuthorsD] = useState([]);
    const [authorsAllD, setAuthorsAllD] = useState([]);
    const [authorId, setAuthorId] = useState('');

    const [showSearchAuthor, setShowSearchAuthor] = useState(false);
    const [searchAuthorFirstName, setSearchAuthorFirstName] = useState(''); 
    const [searchAuthorLastName, setSearchAuthorLastName] = useState(''); 
    const [searchAuthorCNP, setSearchAuthorCNP] = useState(''); 
    

    const [errors, setErrors] = useState('');



    const [validateErrors, setValidateErrors] = useState([]);

    const validate = () => {
      const errors = [];
     
      if(!bookId) errors.push('Please select an author');
      if(!authorId) errors.push('Book must be selected');
  
      return errors;
    };


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
          async function getAuthors() {
              try{
                const response = await fetch("https://am-book-library-server.herokuapp.com/authors", {
                //const response = await fetch("/authors", {  
                   headers: {
                     Authorization: `Bearer ${token}`
                   }
                });

                const data = await response.json();
                
                const authors = data.authors;
                setAuthorsD(authors);
                setAuthorsAllD(authors);
                
              } catch(err) {
                 if (err && err.errors) setErrors(err.errors);
              }
                           
          };

          getAuthors();
             
      
     }, []);

      useEffect(() => {
      let result = authorsAllD.filter(author => {
         let firstName = !searchAuthorFirstName.length ? true : author.firstName.toLowerCase().includes(searchAuthorFirstName.toLowerCase());
         let lastName = !searchAuthorLastName.length ? true : author.lastName.toLowerCase().includes(searchAuthorLastName.toLowerCase());
         let CNP = !searchAuthorCNP.length ? true : author.CNP.toLowerCase().includes(searchAuthorCNP.toLowerCase());
         return firstName && lastName && CNP
        }
         );
      setAuthorsD(result);
      

     }, [searchAuthorFirstName, searchAuthorLastName, searchAuthorCNP]);

    async function onSubmit(e) {
       e.preventDefault();

       const errors = validate();
       
        if (errors.length) {
           setValidateErrors(errors);
           return;
        };

        try{
          const response = await fetch(`https://am-book-library-server.herokuapp.com/bookauthors`, {
           //const response = await fetch(`/bookauthors`, { 
           // const response = await fetch('http://localhost:5000/authors', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`

            },
            body: JSON.stringify({
               bookId,
               authorId,
            })
         });

          const data = await response.json();

          if(!data.errors) {
            navigate(`/book/${bookId}`);
          } else {
           if (data && data.errors) setValidateErrors(data.errors);
          }

        } catch(err) {
           if (err && err.errors) setValidateErrors(e.errors);
        }

    }

  
    return (
      <>
        <div className="container"> 
          <h2 className="py-2">Add Author</h2>
          <div className="errors-container">
            { validateErrors.length > 0 && (
               <ul className='alert alert-danger'>
                {validateErrors.map( (err, idx) => <li key={idx}> {err} </li>)}
               </ul>
            ) }
          </div>

          <div className="bookauthor-container">
            <form className="authoradd-form" onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Book: </label>
                    <select className="form-control" id="book" name="book" required >
                       <option value={bookD.id}> {bookD.title}</option>
                    </select>   
                </div>

                <div className="form-group">
                    <label htmlFor="subtitle">Author: </label>
                    <img id="searchAuthor" src={searchIcon} alt="Search Author" onClick={() => setShowSearchAuthor(!showSearchAuthor)}/> 
                      {showSearchAuthor && (
                        <>
                         <label className="searchcell_first"> First Name: <input type="text" value={searchAuthorFirstName} onChange={e => setSearchAuthorFirstName(e.target.value)} placeholder="search first name"/> </label>
                         <label className="searchcell_second"> Last Name: <input type="text" value={searchAuthorLastName} onChange={e => setSearchAuthorLastName(e.target.value)} placeholder="search last name"/> </label>
                        <label className="searchcell_second"> CNP: <input type="text" value={searchAuthorCNP} onChange={e => setSearchAuthorCNP(e.target.value)} placeholder="search CNP"/> </label>
                       
                        </>
                      )}
                

                    <select className="form-control" id="author" name="author" placeholder="Author"
                    value={authorId}
                    onChange={e => setAuthorId(e.target.value)}>
                      <option></option>
                     {authorsD && authorsD.map(author => <option key={author.id} value={author.id}>{author.firstName + ' ' + author.lastName + ' ' +author.CNP}</option>)}
                    </select>
                </div>
           
                <button className="btn btn-primary mr-2" type="submit">Add</button>
                <NavLink className="btn btn-warning" to={`/book/${bookId}`} >Cancel</NavLink>
            </form>
          </div>
        </div>
        

      </>  
    )
}

export default AddBookAuthor;