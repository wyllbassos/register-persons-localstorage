import { useEffect, useState } from 'react';
import './App.css';
import { FieldProps } from './Components/Field';
import Form from './Components/Form';
import ListPersons from './Person/ListPersons';

export interface Person {
  name: string;
  lastName: string;
  age: number;
}

const personEmpty: Person = { name: '', lastName: '', age: 0 }

function App() {
  const [personForm, setPersonForm] = useState(personEmpty)

  const [persons, setPersons] = useState<Person[]>([])

  const fields: FieldProps[] = [
    {
      marginTop: false,
      value: personForm.name,
      label: 'Nome',
      onChange: e => handleChangeField(e, 'name'),
      type: 'text'
    },
    {
      marginTop: true,
      value: personForm.lastName,
      label: 'Sobre Nome',
      onChange: e => handleChangeField(e, 'lastName'),
      type: 'text'
    },
    {
      marginTop: true,
      value: personForm.age,
      label: 'Idade',
      onChange: e => handleChangeField(e, 'age'),
      type: 'number'
    },
  ]

  useEffect(() => {
    const personsStr = localStorage.getItem('persons');
    if (personsStr !== null) {
      const personsStorage: Person[] = JSON.parse(personsStr);
      setPersons(personsStorage);
    } else {
      localStorage.setItem('persons', '[]')
    }
  }, [])

  const handleChangeField = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: 'name' | 'lastName' | 'age'
  ) => {
    const { target: { value } } = event;
    switch (fieldName) {
      case 'name':
        setPersonForm(state => ({...state, name: value }))
        break;
      case 'lastName':
        setPersonForm(state => ({...state, lastName: value }))
        break;
      case 'age':
        setPersonForm(state => ({...state, age: Number(value) }))
        break;
      default:
        break;
    }
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const newPersons = [...persons]
    newPersons.push(personForm)

    handleUpdatePerson(newPersons)
    setPersonForm(personEmpty)
  }

  const handleUpdatePerson = (newPersons: Person[]) => {
    setPersons(newPersons)
    localStorage.setItem('persons', JSON.stringify(newPersons))
  }

  return (
    <div className='app-container'>
      <Form fields={fields} onSubmit={onSubmit} />

      <ListPersons persons={persons} handleUpdatePerson={handleUpdatePerson} />
    </div>
  );
}


export default App;
