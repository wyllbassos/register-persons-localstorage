import { useState } from 'react';
import { Person } from '../App';
import { FieldProps } from '../Components/Field';
import Form from '../Components/Form';

interface FormPersonProps extends React.FormHTMLAttributes<HTMLFormElement> {
    handleAddPerson: (person: Person) => void;
}

const personEmpty: Person = { name: '', lastName: '', age: 0 }

function FormPerson({ handleAddPerson }: FormPersonProps) {
  const [personForm, setPersonForm] = useState(personEmpty)

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

    handleAddPerson(personForm)

    setPersonForm(personEmpty)
  }

  return (
    <Form fields={fields} onSubmit={onSubmit} />
  );
}


export default FormPerson;
