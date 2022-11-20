import { createContext, useContext, useState } from 'react';

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);


export default function AppContextProvider(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [userToken, setUserToken] = useState('');
  const [currentUserId, setCurrentUserId] = useState('');
  const [firstName, setFirstName] = useState('');
  
//    const updateUserToken = (value) => {
//      setUserToken(value);
//    }
  //setUserToken('Token neinitializat');
  return (
    

   <AppContext.Provider value={{ userToken, setUserToken, currentUserId, setCurrentUserId, firstName, setFirstName}}>
        {props.children}
   </AppContext.Provider>
  )
}