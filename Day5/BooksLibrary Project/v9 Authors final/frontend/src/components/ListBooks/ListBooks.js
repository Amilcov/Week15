import { useAppContext } from "../../context/AppContext";

function ListBooks() {

   const { userToken, currentUserId, firstName} = useAppContext();
   console.log(userToken);
   if (!userToken) return(<p>Visible after  authenticated</p>);
  
    return(
        <>
          <p>Hello from List Books</p>
          <h1> User Token este:</h1>
          <p>{userToken}</p>
          <p>{currentUserId}</p>
          <p>{firstName}</p>
        </>
    )
}


export default ListBooks;