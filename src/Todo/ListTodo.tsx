import { Todo } from '../App';
import './ListTodo.css';

export interface ListTodosProps {
    todos: Todo[];
    handleUpdateTodos: (newTodos: Todo[]) => void;
  }

function ListTodos({ todos, handleUpdateTodos }: ListTodosProps) {
  const handleDeleteTodo = (index: number) => {
    const newTodos = [...todos]
    newTodos.splice(index, 1)
    handleUpdateTodos(newTodos)
  }

  return (
    <div className='app-list-container'>
      {todos.map(({ description }, i) => (
        <div className='app-list-card'>
          <div className='app-list-card-button-container'>
            <button onClick={() => handleDeleteTodo(i)}>X</button>
          </div>
          <div className='app-list-card-label-container'>
            <label>{description}</label>
          </div>
        </div>
      ))}
    </div>
  );
}


export default ListTodos;
