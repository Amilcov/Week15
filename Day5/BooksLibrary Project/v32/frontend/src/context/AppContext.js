import { createContext, useContext, useState } from 'react';

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);


export default function AppContextProvider(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [userToken, setUserToken] = useState('');
  const [currentUserId, setCurrentUserId] = useState('');
  const [firstNameContext, setFirstNameContext] = useState('');
  const [userTypeContext, setUserTypeContext] = useState('');
  
  
  return (
    
   <AppContext.Provider value={{ userToken, setUserToken, currentUserId, setCurrentUserId, firstNameContext, setFirstNameContext, userTypeContext, setUserTypeContext}}>
        {props.children}
   </AppContext.Provider>
  )
}