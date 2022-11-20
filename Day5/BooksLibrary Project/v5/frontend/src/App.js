import { Route, Routes } from "react-router-dom";
import Login from './components/Login/Login.js';
import Signup from './components/Signup/Signup.js';
import Logout from "./components/Logout/Logout.js";
import Readers from "./components/Readers/Readers.js";
import Nav from './components/Nav/Nav.js';
import ListBooks from "./components/ListBooks/ListBooks.js";


const App = () => {
  return (
    <>
    <Nav/>
    <Routes>
      <Route  path= "/login" element = { <Login />} />
      <Route  path= "/signup" element = { <Signup />} />     
      <Route  path= "/logout" element = { <Logout/>} /> 
      <Route  path= "/books" element = { <ListBooks />} />
      <Route  path= "/readers" element = { <Readers />} />
      <Route  path= "/" element = { <Login />} />
     </Routes>

  
    </>
  );
};

export default App;