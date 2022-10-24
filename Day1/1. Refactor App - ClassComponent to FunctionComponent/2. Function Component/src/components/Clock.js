import React, { useSyncExternalStore } from 'react';
import { useState, useEffect } from 'react';

function Clock() {
 const [time, setTime] = useState(new Date());
  const tick = setInterval(() => setTime(new Date()), 1000);

  useEffect(()=> {
    tick;  // Equivalent of Component Will Mount in Class Component
    return () => clearInterval(tick); //Equivalent of Component Will DisMount in Class Component
  }, []);


  let hours = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();

  hours = (hours < 10) ? `0${hours}` : hours;
  minutes = (minutes < 10) ? `0${minutes}` : minutes;
  seconds = (seconds < 10) ? `0${seconds}` : seconds;

  return (
    <section>
      <h1>Clock</h1>
      <div className='clock'>
        <p>
          <span>
            Time:
          </span>
          <span>
            {hours}:{minutes}:{seconds} PDT
          </span>
        </p>
        <p>Date: {time.toDateString()}</p>
      </div>
    </section>
  );
  }


export default Clock;
