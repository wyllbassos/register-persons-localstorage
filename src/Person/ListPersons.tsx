import { Person } from '../App';
import './ListPersons.css';

export interface ListPersonsProps {
    persons: Person[];
    handleUpdatePersons: (newPersons: Person[]) => void;
  }

function ListPersons({ persons, handleUpdatePersons }: ListPersonsProps) {
  const handleDeletePerson = (index: number) => {
    const newPersons = [...persons]
    newPersons.splice(index, 1)
    handleUpdatePersons(newPersons)
  }

  return (
    <div className='app-list-container'>
        {persons.map((person, i) => (
        <span key={i}>
            <button onClick={e => handleDeletePerson(i)}>X</button>
            {`${person.name} ${person.lastName} ${person.age}`}
        </span>
        ))}
    </div>
  );
}


export default ListPersons;
