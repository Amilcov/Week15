import  { useAppContext } from '../../context/AppContext';
import { Calendar } from 'react-calendar';
import './index.css';
import { useState } from 'react';

function Index() {
   const {info} = useAppContext();
    const [ dateCalendar, setDateCalendar ] = useState(new Date);

   console.log('________info is', info);

  let year = 2022;
  //console.log('info text:', info.text);
  //console.log('1. info.text', info.text);
 // console.log("2. info.text.split(' ')", info.text.split(' ')[6]);
  //console.log(info.text.split(' ')[6].length)
  //let year2 = info.text.split(' ')[6];

  //if (info.text && info.text.split(' ') > 5 ) year = info.text.split(' ')[6];
  //console.log('___lllll',parseInt(info.text.split(' ')[6]));
   //if ( info.text !== undefined) year = parseInt(info.text.split(' ')[6]);

 
   //console.log('_____year', year);
   let g1 = new Date(1987, 0, 31);
   console.log(g1);
   //if ( year ) {setDateCalendar(g1)}
 

    return (
        <>
          <h4> Info: </h4>
          <div className="info"> {info && info.text} </div>
          <br/> <br/> <br/> 
     
        </>
    )
};

export default Index;