import { useState, useEffect } from 'react';
import './index.css';

import sport2 from './sport2.png'

function LoadImages() {
    const [files, setFiles] = useState([]);
    const [file, setFile] = useState();
    const [picture, setPicture] = useState();
    const [pictureDB, setPictureDB] = useState();


    //-----------------------solutie------------------------//
    
    // async function uploadPhoto_ReactNative(image) {
    //    const imageFile = await imageToBlob(image);
 
    //     const formData = new FormData();
    //     formData.append('imageFile', imageFile);
 
    //     await fetch('http:/localhost:5000/photos/blon', {
    //     method: 'POST',
    //     body: formData,
    //     headers: {
    //         'Content-Type': 'multipart/form-data;charset=utf-8',
    //      },
    //     });


     //}
  
    //------------------------------------------------------//

    useEffect(() => {
        setPicture(sport2);
    }, []);

    const selectedFileHandler = event => {
      console.log('file is: ',event.target.files[0]);
      setFile(...files, event.target.files[0]);
    };

    async function uploadPhoto() {
        //if (!file) return;
        //const picToLoad = './sport2.png';
        const pic = await fetch('./sport2.png');
        const picBlob = pic.blob();

         setPictureDB( picBlob);
         alert('yes');
        console.log('pic', pic);
        console.log('picBlob', picBlob);
        console.log('picBlob Type', picBlob.type);
  

        const response = await fetch('http://localhost:5000/photos/v2', {
      
            method: 'POST',
            body: picBlob,
            headers: {
                "Content-Type": picBlob && picBlob.type,
            }
        });

      
        const data = await response.json();
        console.log('data', JSON.stringify(data));
        console.log('3. picBlob', picBlob);
        const putImage = URL.createObjectURL(picBlob);
        //setPictureDB( putImage);

    

      try { 
        console.log('trimit poza');



        /* var1
         const response = fetch('http://localhost:5000/photos', {
          //const response = fetch('/photos', {
            method: 'POST',
            body: file,
            headers: {
                "Content-Type": file.type,
                "Content-Length": `${file.size}`
            }
           });

      

           console.log('response', response);
            const data = await response.json();
                   console.log('data', data);
         
        */ 

       } catch(err) {


      };


   }

    async function uploadPhoto_Reader() {
        const reader = new FileReader('./sport2.png');
        const picBlob = reader.readAsDataURL(file);
        console.log('reader', picBlob);

        const pic2 = await fetch('./sport2.png');
        const response2 = await pic2.blob();
        console.log('reader', response2);
    };



   async function displayPhoto2() {

     const response = await fetch('http://localhost:5000/photos/v2/30', {
            method: 'GET',
            headers: {
                "Content-Type": "image/png",
            }
        });

      
        const data = await response.json();
        console.log(' D2 data', data);
        console.log(' D2 data', JSON.stringify(data));
        const putImage = URL.createObjectURL(data);
        setPictureDB( putImage);

   }

    async function displayPhoto() {
        try {
            console.log('aducem poza');
            //const response = await fetch('http://localhost:5000/photos/5', {
            const response = await fetch('http://localhost:5000/photos/30');

            console.log('response get image2', response);
            const data = await response.json();

            // console.log('data get image', data.toString('base64'));
            // setPictureDB(data.toString('base64'));

            console.log('data get image', 'data');
             //console.log('data get image', );
            setPictureDB( data);

        } catch(err) {

        }
           
    }


    return (
        <>
         <p>This is load images area</p>
         <input type="file" onChange={selectedFileHandler}/>
         <button onClick={() => uploadPhoto()}>Upload</button>
         <button onClick={() => uploadPhoto_Reader()}>Upload with reader</button>
         

         <button onClick={displayPhoto}>Display</button>
         <button onClick={displayPhoto2}>Display 2</button>
         <img src={sport2} alt="picture saved" />
         <img src={picture} alt="picture dinamic" />
         <img src={pictureDB} alt="picture db" />
         </>
    )
};


export default LoadImages;