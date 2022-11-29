import { useAppContext } from "../../context/AppContext";

function Info() {

   const { userToken, currentUserId, firstName, userTypeContext} = useAppContext();
  

   //if (!userToken) return(<p>Visible after  authenticated</p>);
  
    return(
        <>
          <p>Hello from Info</p>
          <h1> User Token este:</h1>
          <p>{userToken}</p>
          <p>{currentUserId}</p>
          <p>{firstName}</p>

          <h2> Current User Id este:</h2>
          <p>{currentUserId}</p>


          <h3> userTypeContext este:</h3>
          <p>{userTypeContext}</p>
        </>
    )
}


export default Info;