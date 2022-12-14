import { useState } from 'react';
import ProgramsList from './components/Programs/ProgramsList';

import LoadImages from './components/LoadImages';


import './App.css';

function App() {
  const [openSlideBar, setopenSlideBar] = useState(false);

  return (
    <>
      <main style={openSlideBar ? {marginRight: '300px' } : {}}>
        <ProgramsList />

        <br/> <br/> <br/> <br/> <br/>
        <button> Chat GPT</button>
        <LoadImages />
     </main>
    </>
  )
}

export default App;
