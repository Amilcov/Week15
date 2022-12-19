import { useEffect, useState } from 'react';
import { useAppContext } from './context/AppContext';
import ProgramsList from './components/Programs/ProgramsList';

import Info from './components/Info';
import LoadImages from './components/LoadImages';


import './App.css';

function App() {
  const [openSlideBar, setopenSlideBar] = useState(false);


  const {info, setInfo} = useAppContext();
  
  //make fecth request
  useEffect(() => {
    async function getInfo() {
         const response = await fetch('http://numbersapi.com/1/30/date?json');
         const data = await response.json();
         setInfo(data);
    };
     getInfo();
  }, []);



  return (
    <>
      <nav>
        <h1>Click FIT</h1>
        <button className="slidebar-button" onClick={() => setopenSlideBar(true)}>
          <i className="fas fa-check" />
             &nbsp; Info
        </button>
      </nav>

      <main style={openSlideBar ? {marginRight: '300px' } : {}}>
        <ProgramsList />
        <br/> <br/> <br/> <br/> <br/>
        <LoadImages />
      </main>

     <div className="sidebar" 
        style={openSlideBar ? { transform: 'translateX(-100%)' }  : {} } >

        <div className="sidebar-header">
          <button className="arrow-button" onClick={() => setopenSlideBar(false)}>
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
         <Info />
      </div>
 
    </>
  )
}

export default App;
