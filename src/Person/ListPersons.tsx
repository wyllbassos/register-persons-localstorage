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
      <table>
        <thead>
          <th>Ações</th>
          <th>Nome</th>
          <th>Sobre Nome</th>
          <th>Idade</th>
        </thead>
        <tbody>
          {persons.map(({ name, lastName, age }, i) => (
            <tr key={i}>
              <td>
                <button onClick={() => handleDeletePerson(i)}>X</button>
              </td>
              <td>
                {name}
              </td>
              <td>
                {lastName}
              </td>
              <td>
                {age}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default ListPersons;
