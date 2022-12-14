import './ProgramsDetail.css';


function ProgramDetail({program}) {

  console.log(program)
  let picPath= "Assets/Images/" + program.name + ".png";
    return (
        <li className="programs-detail" >
         <img src={picPath} style={{height: 30, width: 30 }}/>
           <span key="program.name"> {program.name} </span>
        </li>
       
    )
    

};

export default ProgramDetail;