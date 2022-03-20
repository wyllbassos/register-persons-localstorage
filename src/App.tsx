import { useEffect, useState } from 'react';
import './App.css';
import ListTodos from './Todo/ListTodo';

export interface Todo {
  id: string;
  description: string;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [description, setDescription] = useState("")

  useEffect(() => {
    const todosStr = localStorage.getItem('todos');
    if (todosStr !== null) {
      const todosStorage: Todo[] = JSON.parse(todosStr);
      setTodos(todosStorage);
    } else {
      localStorage.setItem('todos', '[]')
    }
    if (localStorage.getItem('lastId') === null) {
      localStorage.setItem('lastId', '0')
    }
  }, [])

  const handleUpdateTodos = (newTodos: Todo[]) => {
    setTodos(newTodos)
    localStorage.setItem('todos', JSON.stringify(newTodos))
  }

  const handleAddTodo = () => {
    todos.sort( (a, b) => a.id > b.id ? 1 : 0 )
    const idNumber = Number(localStorage.getItem('lastId')) + 1;
    localStorage.setItem('lastId', String(idNumber))
    const id = `id${idNumber}`

    handleUpdateTodos([...todos, { id, description }])
    setDescription("")
    // setFormActive(false)
  }

  return (
    <div className='app-container'>
      <h1>Lista de Tarefas</h1>

      <ListTodos
        todos={todos}
        handleUpdateTodos={handleUpdateTodos}
      />

      <div className='app-form-container'>
        <button
          className='app-button-add-back'
          onClick={handleAddTodo}
        >
          Adicionar
        </button>

        <input value={description} onChange={e => setDescription(e.target.value)} />
      </div>
    </div>
  );
}


export default App;
