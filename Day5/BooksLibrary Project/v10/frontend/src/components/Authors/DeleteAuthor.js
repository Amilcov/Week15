import { useParams, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

function DeleteAuthor() {
const { authorId } = useParams();
const token = localStorage.getItem('BOOKS_LIBRARY_ACCESS_TOKEN');
const [authorD, setAuthorD] = useState();
const [errors, setErrors] = useState([]);
console.log('authorId', authorId);

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



async function handleDelete() {
    try {
    
       
        const res = await fetch(`/authors/delete/${authorId}`, {
        
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });


        if (res.status === 401) {
           window.location.href = '/login';
        };

        if (!res.ok) {
           throw res;
        };

        window.location.href = '/authors';


    } catch(err) {
        setErrors(err.errors);
       // handleError(err);
    }
}


    return (
        <>
        <div class="container"> 
          <h2 class="py-2">Author Delete</h2>
          <h3 id="authorName">{authorD && authorD.firstName + ' ' + authorD.lastName}</h3>
          <div class="errors-container"></div>

          <div>
            { errors.length > 0 && (
               <ul className='alert alert-danger'>
                {errors.map( (err, idx) => <li key={idx}> {err} </li>)}
               </ul>
            ) }
          </div>

          <div class="py-4">
            <p>Proceed with deleting this author?</p>
          </div>
          <div>
            <button className="delete-button btn btn-danger" type="submit" onClick={handleDelete}>Delete Author</button>
            <NavLink className="btn btn-warning ml-2" to={`/author/${authorId}`} role="button">Cancel</NavLink>
            </div>
            <p class="d-none" id="authorId">9</p>
           </div>
        </>
    )
}


export default DeleteAuthor;