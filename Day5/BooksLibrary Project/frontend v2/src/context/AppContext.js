import { createContext, useContext, useState } from 'react';

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);


export default function AppContextProvider(props) {
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  

//   const updateAnswers = (value) => {
//     let newAnswer = answers;
//     newAnswer[questionNo] = value;
//     setAnswers(newAnswer);
//   }

 
  return (
   // <AppContext.Provider value={{ questionNo, setQuestionNo, answers, updateAnswers }}>
   <AppContext.Provider value={{ credential, password}}>
        {props.children}
   </AppContext.Provider>
  )
}