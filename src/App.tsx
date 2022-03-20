import { useEffect, useState } from 'react';
import './App.css';
import { FieldProps } from './Components/Field';
import Form from './Components/Form';
import FormTodo from './Todo/FormTodo';
import ListTodos from './Todo/ListTodo';

export interface Todo {
  description: string;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [formTodoActive, setFormActive] = useState(false)
  const [description, setDescription] = useState("")

  useEffect(() => {
    const todosStr = localStorage.getItem('todos');
    if (todosStr !== null) {
      const todosStorage: Todo[] = JSON.parse(todosStr);
      setTodos(todosStorage);
    } else {
      localStorage.setItem('todos', '[]')
    }
  }, [])

  const handleUpdateTodos = (newTodos: Todo[]) => {
    setTodos(newTodos)
    localStorage.setItem('todos', JSON.stringify(newTodos))
  }

  const handleAddTodo = () => {

    handleUpdateTodos([...todos, { description }])
    setDescription("")
    // setFormActive(false)
  }

  return (
    <div className='app-container'>
      {formTodoActive && (
        <FormTodo handleAddTodo={handleAddTodo} />
      )}
      <h1>Lista de Tarefas</h1>

      {!formTodoActive && (
        <ListTodos
          todos={todos}
          handleUpdateTodos={handleUpdateTodos}
        />
      )}

      <div className='app-form-container'>
        <button
          className='app-button-add-back'
          onClick={handleAddTodo}
          // onClick={() => setFormActive(!formTodoActive)}
        >
          {formTodoActive ? 'Voltar' : 'Adicionar'}
        </button>

        <input value={description} onChange={e => setDescription(e.target.value)} />
      </div>
    </div>
  );
}


export default App;
