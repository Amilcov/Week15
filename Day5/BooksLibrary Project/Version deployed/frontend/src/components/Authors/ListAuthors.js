import { useAppContext } from "../../context/AppContext";
import { NavLink } from 'react-router-dom';
import { useState , useEffect} from 'react';
import searchIcon from '../../assets/search.png';

 function Authors() {
    const { userToken, userTypeContext} = useAppContext();
    const token = localStorage.getItem('BOOKS_LIBRARY_ACCESS_TOKEN');

    const [authorsD, setAuthorsD] = useState([]);
    const [authorsAllD, setAuthorsAllD] = useState([]);

    const [showSearchAuthor, setShowSearchAuthor] = useState(false);
    const [searchAuthorFirstName, setSearchAuthorFirstName] = useState(''); 
    const [searchAuthorLastName, setSearchAuthorLastName] = useState(''); 
    const [searchAuthorCNP, setSearchAuthorCNP] = useState(''); 

    const [errors, setErrors] = useState([]);
    let authors = [];

    useEffect(() => {
    
          async function getAuthors() {
              try{
                const response = await fetch('https://am-book-library-server.herokuapp.com/authors', {
                //const response = await fetch('/authors', {  
                   headers: {
                     Authorization: `Bearer ${token}`
                   }
                });

                const data = await response.json();

                authors = data.authors;
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
            <img id="searchAuthor" src={searchIcon} alt="Search Author" onClick={() => setShowSearchAuthor(!showSearchAuthor)}/> 
            {showSearchAuthor && (
              <>
                <label className="searchcell_first"> First Name: <input type="text" value={searchAuthorFirstName} onChange={e => setSearchAuthorFirstName(e.target.value)} placeholder="search first name"/> </label>
                <label className="searchcell_second"> Last Name: <input type="text" value={searchAuthorLastName} onChange={e => setSearchAuthorLastName(e.target.value)} placeholder="search last name"/> </label>
                <label className="searchcell_second"> CNP: <input type="text" value={searchAuthorCNP} onChange={e => setSearchAuthorCNP(e.target.value)} placeholder="search CNP"/> </label>
                       
              </>
            )}
                

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
