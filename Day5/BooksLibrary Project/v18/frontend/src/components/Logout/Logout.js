import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from "../../context/AppContext";


function Logout() {
    const { setCurrentUserId, setUserToken } = useAppContext();
    const navigate = useNavigate();

    setCurrentUserId(0);
    setUserToken('');

    useEffect(() => navigate("/login"),[]);
   
    return(
       <></>
    )
}

export default Logout;