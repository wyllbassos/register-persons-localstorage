import { useState } from 'react';
import './App.css';
import { FieldProps } from './Components/Field';
import Form from './Components/Form';

const containerStyles: React.CSSProperties = {
  backgroundColor: '#282c34',
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  width: '100vw',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 'calc(10px + 2vmin)',
  color: 'white',
}

interface Pessoa {
  name: string;
  sobreNome: string;
  idade: number;
}

function App() {
  const [name, setName] = useState('')
  const [sobreNome, setSobreNome] = useState('')
  const [idade, setIdade] = useState(0)

  const [pessoas, setPessoas] = useState<Pessoa[]>([])

  const fields: FieldProps[] = [
    { key: 'f1', label: 'Nome', marginTop: false, value: name, onChange: ({ target: { value } }) => setName(value) },
    { key: 'f2', label: 'Sobre Nome', marginTop: true, value: sobreNome, onChange: ({ target: { value } }) => setSobreNome(value) },
    { key: 'f3', label: 'Idade', marginTop: true, value: idade, type: 'number', onChange: ({ target: { value } }) => setIdade(Number(value)) }
  ]

  console.log(name)
  console.log(fields)
  console.log(pessoas)

  return (
    <div style={containerStyles}>
      <Form fields={fields} onSubmit={ e => {
        e.preventDefault()
        setPessoas(state => ([
          ...state,
          { name, sobreNome, idade }
        ]))
      }} />
      <ul>
        {pessoas.map((pessoa, i) => (
          <li key={i}>
            {`${pessoa.name} ${pessoa.sobreNome} ${pessoa.idade}`}
          </li>
        ))}
      </ul>
    </div>
  );
}


export default App;
