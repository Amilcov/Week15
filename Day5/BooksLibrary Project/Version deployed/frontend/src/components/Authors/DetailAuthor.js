import { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useAppContext } from "../../context/AppContext";
import './Authors.css';


function DetailAuthor() {

    const { authorId } = useParams();
    const token = localStorage.getItem('BOOKS_LIBRARY_ACCESS_TOKEN');
    const { userTypeContext } = useAppContext();

    const [authorD, setAuthorD] = useState();
    const [errors, setErrors] = useState([]);
    const [authorWithBooks, setAuthorWithBooks] = useState(true);
    

    useEffect(() => {
           
          async function getAuthor() {
           
              try{
                const response = await fetch(`https://am-book-library-server.herokuapp.com/authors/${authorId}`, {
                //const response = await fetch(`/authors/${authorId}`, {  
                   headers: {
                     Authorization: `Bearer ${token}`
                   }
                });

                const data = await response.json();
                const author = data.author;
                setAuthorD(author);
          
              } catch(err) {
                 if (err && err.errors) setErrors(err.errors);
              }
                           
          };
             
         getAuthor();


         async function existsBooksWithThisAuthor() {
              try{
                const response = await fetch(`https://am-book-library-server.herokuapp.com/bookauthors/author/${authorId}`, {
                //const response = await fetch(`/bookauthors/author/${authorId}`, {  
                   headers: {
                     Authorization: `Bearer ${token}`
                   }
                });

                const data = await response.json();
                setAuthorWithBooks(data.authorWithBooks);
          
              } catch(err) {
                 if (err && err.errors) setErrors(err.errors);
              }
                           
          };
             
         if(userTypeContext === 'W') existsBooksWithThisAuthor();


     }, [])


    return(
      <>
        <div id="author-container">
        <h3>Author Detail</h3>
        <div className="errors-container">
            { errors.length > 0 && (
              <ul className='alert alert-danger'>
                {errors.map( (err, idx) => <li key={idx}> {err} </li>)}
              </ul>
            ) }
        </div>
        <div className="ml-2">
          <ul>
            <li key="1" className="bullet"> First Name: {authorD && authorD.firstName}</li>
            <li key="2" className="bullet"> Last Name: {authorD && authorD.lastName}</li>
            <li key="3" className="bullet"> CNP: {authorD && authorD.CNP}</li>
          </ul>
        </div>
        <div>
          <p>{authorD && authorD.about}</p>
        </div>
        <div className="py-4">
           {userTypeContext === 'R' && (<NavLink className="btn btn-primary disabled" to={`/author/edit/${authorId}`} role="button"> Edit </NavLink> )}
           {userTypeContext === 'W' && (<NavLink className="btn btn-primary" to={`/author/edit/${authorId}`} role="button"> Edit </NavLink> )}
           {(userTypeContext === 'R' || userTypeContext == 'W' && authorWithBooks) && (<NavLink className="btn btn-danger ml-2 disabled" to={`/author/delete/${authorId}`} role="button"> Delete </NavLink>)}
           {userTypeContext === 'W' && !authorWithBooks && (<NavLink className="btn btn-danger ml-2" to={`/author/delete/${authorId}`} role="button"> Delete</NavLink>)}
          <NavLink className="btn btn-warning ml-2" to="/authors" role="button"> Return To List </NavLink>
        </div>
        </div>
    
      </>
    ) 

}

export default DetailAuthor;