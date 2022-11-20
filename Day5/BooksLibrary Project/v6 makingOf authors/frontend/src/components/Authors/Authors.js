import { useAppContext } from "../../context/AppContext";
import { NavLink } from 'react-router-dom';


 function Authors() {
    const { userToken } = useAppContext();
    let authors = [];
    let rows;


    async function getAuthors(e) {
        console.log('hello');
    
        try{
          const response = await fetch('/authors', {
           // const response = await fetch('http://localhost:5000/users/token', {
           headers: {
              Authorization: `Bearer ${userToken}`
           }
          
         });

          const data = await response.json();
          authors = data.authors;
          console.log(data);
          console.log('authors', authors);

          authors.map(author => console.log(author.firstName));
          if(!data.errors) {
        
          } else {
           //if (data && data.errors) setValidateErrors(data.errors);
          }

        } catch(e) {
          // if (e && e.errors) setValidateErrors(e.errors);
        }

       let rows1 = authors.map((author, idx) => `<tr> <td>${author.firstName}</td> </tr>`);
       console.log(rows1.join(''));
       rows= rows1.join('');

       //<tr> <td>Aghata</td> </tr><tr> <td>Ion</td> </tr><tr> <td>Jules</td> </tr><tr> <td>Mihai</td> </tr><tr> <td>Robert</td> </tr>
               
        
    }   
   
       
    return (
        <>
    
        <button onClick={getAuthors}> Load Authors </button>

        <div className="container"> 
          <h2 className="py-2">Authors</h2>
          <div className="py-2">
            <NavLink className="btn btn-success" to="/stock/add" role="button">Add Author</NavLink>
            </div><div className="stocks-container">
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
                <tr> <td>Aghata</td> </tr><tr> <td>Ion</td> </tr><tr> <td>Jules</td> </tr><tr> <td>Mihai</td> </tr><tr> <td>Robert</td> </tr>
                {rows}
              </tbody>
           </table>
          </div>
        </div>
             {authors.length > 0 && authors.map((author) => <p> {author.firstName} </p> )}
        <p>lll9</p>
        </>
    )
}


export default Authors;
