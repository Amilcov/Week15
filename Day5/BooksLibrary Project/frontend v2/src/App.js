import { Route, Routes } from "react-router-dom";
import Login from './components/Login/Login.js';
import Signup from './components/Signup/Signup.js';
import Nav from './components/Nav/Nav.js';


const App = () => {
  return (
    <>
    <Nav/>
    <Routes>
      <Route  path= "/login" element = { <Login />} />
      <Route  path= "/signup" element = { <Signup />} />
      <Route  path= "/" element = { <Login />} />
     </Routes>

  
    </>
  );
};

export default App;