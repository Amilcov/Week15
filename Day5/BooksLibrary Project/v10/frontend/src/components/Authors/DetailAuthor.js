import { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import './Authors.css';


function DetailAuthor() {
    const { authorId } = useParams()
    const token = localStorage.getItem('BOOKS_LIBRARY_ACCESS_TOKEN');
    const [authorD, setAuthorD] = useState();
    
    console.log('AuthorId', authorId);


    useEffect(() => {
    
          async function getAuthor() {
              try{
                const response = await fetch(`/authors/${authorId}`, {
                   headers: {
                     Authorization: `Bearer ${token}`
                   }
                });

                const data = await response.json();
                const author = data.author;
                console.log('data', data);
                      console.log('author', author);
          
                setAuthorD(author);
                console.log('author from db is:', author);
              } catch(e) {

              }
                           
          };
             
         getAuthor();
     }, [])



    return(
        <>
        <div id="author-container">
        <h3>Author Detail</h3>
   
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
          <NavLink className="btn btn-primary" to={`/author/edit/${authorId}`} role="button"> Edit </NavLink>
          <NavLink className="btn btn-danger ml-2" to={`/author/delete/${authorId}`} role="button"> Delete </NavLink>
          <NavLink className="btn btn-warning ml-2" to="/authors" role="button"> Return To List </NavLink>
        </div>
        </div>
    
        
        </>
    ) 

}

export default DetailAuthor;