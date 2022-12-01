import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {useAppContext} from '../../context/AppContext.js';

function DeleteAuthor() {

  const { authorId } = useParams();
  const token = localStorage.getItem('BOOKS_LIBRARY_ACCESS_TOKEN');
  const { firstNameContext } = useAppContext();

  const [authorD, setAuthorD] = useState();
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate()


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
      }, [])



  async function handleDelete() {

      try {
          const res = await fetch(`https://am-book-library-server.herokuapp.com/authors/delete/${authorId}`, {
          //const res = await fetch(`/authors/delete/${authorId}`, {  
              method: "DELETE",
              headers: {
                  "Authorization": `Bearer ${token}`
              }
          });

          if (res.status === 401) {
            navigate('/login');
          };

          if (!res.ok) {
            throw res;
          };

          navigate('/authors');


      } catch(err) {
          setErrors(err.errors);
      }
  }

  return (
    <>
    <div className="container"> 
      <h2 className="py-2">Author Delete</h2>
      <h3 id="authorName">{authorD && authorD.firstName + ' ' + authorD.lastName}</h3>
      <div className="errors-container">
          { errors.length > 0 && (
            <ul className='alert alert-danger'>
              {errors.map( (err, idx) => <li key={idx}> {err} </li>)}
            </ul>
          ) }
      </div>
      <div className="py-4">
        <p>Proceed with deleting this author?</p>
      </div>
      <div>
        <button className="delete-button btn btn-danger" type="submit" onClick={handleDelete}>Delete Author</button>
        <NavLink className="btn btn-warning ml-2" to={`/author/${authorId}`} role="button">Cancel</NavLink>
        </div>
        <p className="d-none" id="authorId">9</p>
      </div>
    </>
  )
}


export default DeleteAuthor;