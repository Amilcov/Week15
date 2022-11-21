import { useAppContext } from "../../context/AppContext";
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

 function Authors() {
    const { userToken } = useAppContext();
    const [authorsD, setAuthorsD] = useState()
    let authors = [];
    let rows;

       const token = localStorage.getItem('BOOKS_LIBRARY_ACCESS_TOKEN');

    async function getAuthors(e) {
        console.log('hello');
    
        try{
          const response = await fetch('/authors', {
           // const response = await fetch('http://localhost:5000/users/token', {
           headers: {
              //Authorization: `Bearer ${userToken}`
              Authorization: `Bearer ${token}`
           }
          
         });

          const data = await response.json();
          authors = data.authors;
          //setAuthorsD(authors);

       

          if(!data.errors) {
        
          } else {
           //if (data && data.errors) setValidateErrors(data.errors);
          }
           setAuthorsD(authors);
        } catch(e) {
          // if (e && e.errors) setValidateErrors(e.errors);
        }
        
       
       //<tr> <td>Aghata</td> </tr><tr> <td>Ion</td> </tr><tr> <td>Jules</td> </tr><tr> <td>Mihai</td> </tr><tr> <td>Robert</td> </tr>
               
    }   
     
    return (
        <>
        <p></p>
        <button onClick={getAuthors}> Load Authors </button>

        <div className="container"> 
          <h2 className="py-2">Authors</h2>
          <div className="py-2">
            <NavLink className="btn btn-success" to="/author/add" role="button">Add Author</NavLink>
            </div><div className="authors-container">
            <table className="table table-striped table-hover">
              <thead className="thead-dark">
               <tr>
                 <th> Last Name </th>
                 <th> First Name </th>
                 <th> CNP </th>
                 <th> About</th>
                 <th> </th>
               </tr> 
              </thead>   
              <tbody>
                 {authorsD &&authorsD.length > 0 && authorsD.map((author) => 
                  <tr>
                    <td> {author.firstName} </td> 
                    <td>{author.lastName} </td> 
                    <td>{author.CNP} </td> 
                    <td>{author.about} </td>
                    <td> <button className="btn btn-primary">Details</button> </td>
                  </tr> )}
         
              </tbody>
           </table>
          </div>
        </div>
        </>
    )
}


export default Authors;
