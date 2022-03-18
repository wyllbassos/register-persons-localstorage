import { useEffect, useState } from 'react';
import './App.css';
import { FieldProps } from './Components/Field';
import Form from './Components/Form';
import FormPerson from './Person/FormPerson';
import ListPersons from './Person/ListPersons';

export interface Person {
  name: string;
  lastName: string;
  age: number;
}

function App() {
  const [persons, setPersons] = useState<Person[]>([])
  const [formPersonActive, setFormActive] = useState(false)

  useEffect(() => {
    const personsStr = localStorage.getItem('persons');
    if (personsStr !== null) {
      const personsStorage: Person[] = JSON.parse(personsStr);
      setPersons(personsStorage);
    } else {
      localStorage.setItem('persons', '[]')
    }
  }, [])

  const handleUpdatePersons = (newPersons: Person[]) => {
    setPersons(newPersons)
    localStorage.setItem('persons', JSON.stringify(newPersons))
  }

  const handleAddPerson = (person: Person) => {
    handleUpdatePersons([...persons, person])
    setFormActive(false)
  }

  return (
    <div className='app-container'>
      {formPersonActive && (
        <FormPerson handleAddPerson={handleAddPerson} />
      )}

      {!formPersonActive && (
        <ListPersons
          persons={persons}
          handleUpdatePersons={handleUpdatePersons}
        />
      )}

      <button onClick={() => setFormActive(!formPersonActive)}>
        {formPersonActive ? 'Voltar' : 'Adicionar'}
      </button>
    </div>
  );
}


export default App;
