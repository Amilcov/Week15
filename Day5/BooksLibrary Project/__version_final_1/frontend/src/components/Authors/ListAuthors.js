import { useAppContext } from "../../context/AppContext";
import { NavLink } from 'react-router-dom';
import { useState , useEffect} from 'react';

 function Authors() {
    const { userToken, userTypeContext} = useAppContext();
    const token = localStorage.getItem('BOOKS_LIBRARY_ACCESS_TOKEN');
    const [authorsD, setAuthorsD] = useState([]);
    const [errors, setErrors] = useState([]);
    let authors = [];

    useEffect(() => {
    
          async function getAuthors() {
              try{
                const response = await fetch('/authors', {
                   headers: {
                     Authorization: `Bearer ${token}`
                   }
                });

                const data = await response.json();

                authors = data.authors;
                setAuthorsD(authors);
              } catch(err) {
                 if (err && err.errors) setErrors(err.errors);
              }
                           
          };
             
         getAuthors();
     }, [])
     
    return (
        <>
        <p></p>
        <div className="container"> 
          <h2 className="py-2">Authors</h2>
          <div className="errors-container">
                { errors.length > 0 && (
                  <ul className='alert alert-danger'>
                    {errors.map( (err, idx) => <li key={idx}> {err} </li>)}
                  </ul>
                ) }
          </div>
          <div className="py-2">
            <NavLink className="btn btn-success" to="/author/add" role="button" hidden={userTypeContext === 'R'} >Add Author</NavLink>
            </div><div className="authors-container">
            <table className="table table-striped table-hover">
              <thead className="thead-dark">
               <tr>
                 <th key="1"> Last Name </th>
                 <th key="2"> First Name </th>
                 <th key="3"> CNP </th>
                 <th key="4"> About</th>
                 <th key="5"> </th>
               </tr> 
              </thead>   
              <tbody>
                 {authorsD &&authorsD.length > 0 && authorsD.map((author) => 
                  <tr>
                    <td key="1"> {author.firstName} </td> 
                    <td key="2">{author.lastName} </td> 
                    <td key="3">{author.CNP} </td> 
                    <td key="4">{author.about} </td>
                    <td> <NavLink className="btn btn-primary" to={`/author/${author.id}`}>Details</NavLink> </td>
                  </tr> )}
         
              </tbody>
           </table>
          </div>
        </div>
        </>
    )
}


export default Authors;
