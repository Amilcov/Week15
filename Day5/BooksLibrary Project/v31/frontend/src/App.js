import { Route, Routes } from "react-router-dom";
import Login from './components/Login/Login.js';
import Signup from './components/Signup/Signup.js';
import Logout from "./components/Logout/Logout.js";

import ListBooks from "./components/Books/ListBooks.js";
import AddBook from "./components/Books/AddBook.js";
import DetailBook from "./components/Books/DetailBook.js";
import EditBook from "./components/Books/EditBook.js";
import DeleteBook from "./components/Books/DeleteBook.js";

import AddBookAuthor from "./components/BookAuthors/AddBookAuthor";

import ListBorrowBooks from "./components/BorrowBooks/ListBorrowBooks.js";
import AddBorrowBook from "./components/BorrowBooks/AddBorrowBook.js";
import DetailBorrowBook from "./components/BorrowBooks/DetailBorrowBook.js";
import EditBorrowBook from "./components/BorrowBooks/EditBorrowBook.js";
import DeleteBorrowBook from "./components/BorrowBooks/DeleteBorrowBook.js";


import ListAuthors from "./components/Authors/ListAuthors.js";
import AddAuthor from "./components/Authors/AddAuthor.js";
import DetailAuthor from "./components/Authors/DetailAuthor.js";
import EditAuthor from "./components/Authors/EditAuthor.js";
import DeleteAuthor from "./components/Authors/DeleteAuthor.js";

import ListUsers from "./components/Users/ListUsers.js";
import AddUser from "./components/Users/AddUser.js";
import DetailUser from "./components/Users/DetailUser.js";
import EditUser from "./components/Users/EditUser.js";
import DeleteUser from "./components/Users/DeleteUser.js";
import Nav from './components/Nav/Nav.js';


import Info from "./components/Info/Info.js";



const App = () => {
  return (
    <>
    <Nav/>
    <Routes>
      <Route  path= "/login" element = { <Login /> } />
      <Route  path= "/signup" element = { <Signup /> } />     
      <Route  path= "/logout" element = { <Logout/> } /> 

      <Route  path= "/books" element = { <ListBooks/> } />
      <Route  path= "/book/add" element = { <AddBook /> } />
      <Route  path= "/book/:bookId" element = { <DetailBook/> } />
      <Route  path= "/book/edit/:bookId" element = { <EditBook /> } />
      <Route  path= "/book/delete/:bookId" element = { <DeleteBook/> } />

      <Route  path= "/book/:bookId/author/add" element = { <AddBookAuthor /> } />

      <Route  path= "/borrowbooks" element = { <ListBorrowBooks /> } />
      <Route  path= "/borrowbook/add" element = { <AddBorrowBook /> } />
      <Route  path= "/borrowbook/:borrowBookId" element = { <DetailBorrowBook /> } />
      <Route  path= "/borrowbook/edit/:borrowBookId" element = { <EditBorrowBook /> } />
      <Route  path= "/borrowbook/delete/:borrowBookId" element = { <DeleteBorrowBook /> } />

   

      <Route  path= "/authors" element = { <ListAuthors /> } />
      <Route  path= "/author/add" element = { <AddAuthor /> } />
      <Route  path= "/author/:authorId" element = { <DetailAuthor/> } />
      <Route  path= "/author/edit/:authorId" element = { <EditAuthor /> } />
      <Route  path= "/author/delete/:authorId" element = { <DeleteAuthor/> } />

      <Route  path= "/users" element = { <ListUsers /> } />
      <Route  path= "/user/add" element = { <AddUser /> } />
      <Route  path= "/user/:userId" element = { <DetailUser /> } />
      <Route  path= "/user/edit/:userId" element = { <EditUser /> } />
      <Route  path= "/user/delete/:userId" element = { <DeleteUser/> } />

      <Route  path= "/" element = { <Login /> } />

      <Route  path= "/info" element = { <Info /> } />

     
     </Routes>

  
    </>
  );
};

export default App;