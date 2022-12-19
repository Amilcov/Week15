import { createContext, useContext, useState } from "react";

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);



export default function AppContextProvider(props) {

    //test
    let obj1 = {
        "text": "January 30th is the day in 1841 that a fire destroys two-thirds of Mayagüez, Puerto Rico.",
        "year": 1841,
        "number": 30,
        "found": true,
        "type": "date"
    }

    //const [info, setInfo] = useState({...obj1});
    const [info, setInfo] = useState({});



   return(
        <AppContext.Provider value={{info, setInfo}}>
            {props.children}
        </AppContext.Provider>
   )
}