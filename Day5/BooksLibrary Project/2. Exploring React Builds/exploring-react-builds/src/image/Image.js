import React from 'react';
import imgCat from './react-builds-cat.png';
import cat from './Image.css';



console.log(imgCat);

function Image() {
    return (
    <div>
      <img src={imgCat} alt="Cat"/>; 
      <div className='cat'></div>
    </div>
    )
};

export  default Image;

