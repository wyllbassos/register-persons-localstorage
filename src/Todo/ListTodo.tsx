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
      <table>
        <thead>
          <th colSpan={2}>Descrição</th>
        </thead>
        <tbody>
          {todos.map(({ description }, i) => (
          <tr key={i}>
            <td>
              <button onClick={() => handleDeleteTodo(i)}>X</button>
            </td>
            <td>
              {description}
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default ListTodos;
