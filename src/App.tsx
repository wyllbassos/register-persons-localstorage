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

  useEffect(() => {
    const personsStr = localStorage.getItem('persons');
    if (personsStr !== null) {
      const personsStorage: Person[] = JSON.parse(personsStr);
      setPersons(personsStorage);
    } else {
      localStorage.setItem('persons', '[]')
    }
  }, [])

  const handleUpdatePerson = (newPersons: Person[]) => {
    setPersons(newPersons)
    localStorage.setItem('persons', JSON.stringify(newPersons))
  }

  return (
    <div className='app-container'>
      <FormPerson handleAddPerson={person => handleUpdatePerson([...persons, person])} />

      <ListPersons persons={persons} handleUpdatePerson={handleUpdatePerson} />
    </div>
  );
}


export default App;
