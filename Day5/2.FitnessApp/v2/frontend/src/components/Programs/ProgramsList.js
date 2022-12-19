import ProgramsDetail from "./ProgramsDetail";
import populatePrograms  from '../../mockData/programs.json';
import './ProgramsList.css'


// 


function ProgramsList() {

    return (
      <>
        <h3> Programs</h3>
        <ul className="programs-list">
          {populatePrograms.length && populatePrograms.map(program => (
            <div key={program.id}>
              <ProgramsDetail key={program.id} program={program} /> 
            </div>
          ))}
        </ul>
      </>
    )
}


export default ProgramsList;