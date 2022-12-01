import { useState, useEffect } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';


function EditBook() {
    const { bookId } = useParams();
    const token = localStorage.getItem('BOOKS_LIBRARY_ACCESS_TOKEN');
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [maxBorrowDays, setMaxBorrowDays] = useState(30);
    const [validateErrors, setValidateErrors] = useState([]);

    const validate = () => {
      const errors = [];
    
      if(!title) errors.push('Title name must be provided');
      if(!maxBorrowDays) errors.push('Max Borrow Days must be provided');
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
              
                setTitle(book.title);
                setSubtitle(book.subtitle);
                setMaxBorrowDays(book.maxBorrowDays);
              
              } catch(err) {
                  if (err && err.errors) setValidateErrors(err.errors);
              }
                           
          };
             
         getBook();
     }, [])

    async function onSubmit(e) {
       e.preventDefault();

       const errors = validate();
       
        if (errors.length) {
           setValidateErrors(errors);
           return;
        };

        try{
          const response = await fetch(`https://am-book-library-server.herokuapp.com/books/edit/${bookId}`, {
          //const response = await fetch(`/books/edit/${bookId}`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`

            },
            body: JSON.stringify({
                title,
                subtitle,
                maxBorrowDays,
            })
         });

          const data = await response.json();

          if(!data.errors) {
            navigate(`/book/${bookId}`);
          } else {
            if (data && data.errors) setValidateErrors(data.errors);
          }

        } catch(e) {
           if (e && e.errors) setValidateErrors(e.errors);
        }

    }


    return (
      <>
        <div className="container"> 
          <h2 className="py-2">Book Edit</h2>
           <div className="errors-container">
            { validateErrors.length > 0 && (
               <ul className='alert alert-danger'>
                {validateErrors.map( (err, idx) => <li key={idx}> {err} </li>)}
               </ul>
            ) }
          </div>

          <div className="book-container">
            <div className="errors-container">
            </div>
            <form className="bookedit-form" onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="firstname">Title </label>
                    <input className="form-control" id="title" type="text" name="title" placeholder="Title" 
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">Subtitle: </label>
                    <input className="form-control" id="subtitle" type="text" name="subtitle" placeholder="Subtitle"
                    value={subtitle}
                    onChange={e => setSubtitle(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="cnp">Max Borrow Days: </label>
                    <input className="form-control" id="maxBorrowDays" type="text" name="maxBorrowDays" placeholder="Max Borrow Days"
                    value={maxBorrowDays}
                    onChange={e => setMaxBorrowDays(e.target.value)}
                    />
                </div>

                <button className="btn btn-primary mr-2" type="submit">Update Book</button>
                <NavLink className="btn btn-warning" to={`/book/${bookId}`}>Cancel</NavLink>
            </form>
          </div>
        </div>
    </>    
    )
}

export default EditBook