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
  nome: string;
  sobreNome: string;
  idade: number;
}

const pessoaInicial: Pessoa = { nome: '', sobreNome: '', idade: 0 }

function App() {
  const [pessoaForm, setPessoaForm] = useState(pessoaInicial)

  const [pessoas, setPessoas] = useState<Pessoa[]>([])

  const fields: FieldProps[] = [
    {
      marginTop: false,
      value: pessoaForm.nome,
      label: 'Nome',
      onChange: e => onChange(e, 'nome'),
      type: 'text'
    },
    {
      marginTop: true,
      value: pessoaForm.sobreNome,
      label: 'Sobre Nome',
      onChange: e => onChange(e, 'sobreNome'),
      type: 'text'
    },
    {
      marginTop: true,
      value: pessoaForm.idade,
      label: 'Idade',
      onChange: e => onChange(e, 'idade'),
      type: 'number'
    },
  ]

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: 'nome' | 'sobreNome' | 'idade'
  ) => {
    const { target: { value } } = event;
    switch (fieldName) {
      case 'nome':
        setPessoaForm(state => ({...state, nome: value }))
        break;
      case 'sobreNome':
        setPessoaForm(state => ({...state, sobreNome: value }))
        break;
      case 'idade':
        setPessoaForm(state => ({...state, idade: Number(value) }))
        break;
      default:
        break;
    }
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setPessoas(state => ([
      ...state,
      { 
        nome: pessoaForm.nome,
        sobreNome: pessoaForm.sobreNome,
        idade: pessoaForm.idade
      }
    ]))
    setPessoaForm(pessoaInicial)
  }

  console.log(pessoas)

  return (
    <div style={containerStyles}>
      <Form fields={fields} onSubmit={onSubmit} />

      <ul>
        {pessoas.map((pessoa, i) => (
          <li key={i}>
            {`${pessoa.nome} ${pessoa.sobreNome} ${pessoa.idade}`}
          </li>
        ))}
      </ul>
    </div>
  );
}


export default App;
