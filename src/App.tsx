import { useEffect, useState } from 'react';
import './App.css';
import { FieldProps } from './Components/Field';
import Form from './Components/Form';

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

  useEffect(() => {
    const pessoasStr = localStorage.getItem('pessoas');
    if (pessoasStr !== null) {
      const pessoasStorage: Pessoa[] = JSON.parse(pessoasStr);
      setPessoas(pessoasStorage);
    } else {
      localStorage.setItem('pessoas', '[]')
    }
  }, [])

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

    const newPessoas = [
      ...pessoas,
      { 
        nome: pessoaForm.nome,
        sobreNome: pessoaForm.sobreNome,
        idade: pessoaForm.idade
      }
    ]

    handleUpdatePessoa(newPessoas)
    setPessoaForm(pessoaInicial)
  }

  const handleUpdatePessoa = (newPessoas: Pessoa[]) => {
    setPessoas(newPessoas)
    localStorage.setItem('pessoas', JSON.stringify(newPessoas))
  }

  const handleDeleteIten = (index: number) => {
    const newPessoas = [...pessoas]
    newPessoas.splice(index, 1)
    handleUpdatePessoa(newPessoas)
  }

  return (
    <div className='app-container'>
      <Form fields={fields} onSubmit={onSubmit} />

      <div className='app-list-container'>
        {pessoas.map((pessoa, i) => (
          <span key={i}>
            <button onClick={e => handleDeleteIten(i)}>X</button>
            {`${pessoa.nome} ${pessoa.sobreNome} ${pessoa.idade}`}
          </span>
        ))}
      </div>
    </div>
  );
}


export default App;
