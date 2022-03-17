import React, { InputHTMLAttributes, useState } from 'react';
import './App.css';

interface Field extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

interface FieldProps {
  field: Field;
}

interface FormProps {
  fields: Field[];
}

function App() {
  const [name, setName] = useState('')
  const [sobreNome, setSobreNome] = useState('')
  const [idade, setIdade] = useState(0)

  const fields: Field[] = [
    { label: 'Nome', value: name, onChange: ({ target: { value } }) => setName(value) },
    { label: 'Sobre Nome', value: sobreNome, onChange: ({ target: { value } }) => setSobreNome(value) },
    { label: 'Idade', value: idade, type: 'number', onChange: ({ target: { value } }) => setIdade(Number(value)) }
  ]

  console.log(name)
  console.log(fields)

  return (
    <div
      style={{
        backgroundColor: '#282c34',
        display: 'flex',
        height: '100vh',
        width: '100vw',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'calc(10px + 2vmin)',
        color: 'white',
      }}
    >
      <div style={{
        padding: '16px 32px 32px 32px',
        backgroundColor: 'gray',
        display: 'flex',
        width: '25%',
      }}>
        <Form fields={fields} />
      </div>
    </div>
  );
}

function Form({ fields }: FormProps) {
  return (
    <form style={{
      width: '100%',
    }}>
      {fields.map(field => (
        <Field key={field.label} field={field} />
      ))}
    </form>
  )
}

function Field({ field }: FieldProps) {
  const { label, ...rest } = field
  return (
    <div style={{
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between',
      marginTop: 16,
    }}>
      <label>{label}</label>
      <input
        {...rest}
        style={{
          marginLeft: 16
        }}
      />
    </div>
  )
}

export default App;
