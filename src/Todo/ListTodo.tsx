import { Todo } from '../App';
import './ListTodo.css';
import Card from './Card';
import { DraggableData } from 'react-draggable';

export interface ListTodosProps {
  todos: Todo[];
  handleUpdateTodos: (newTodos: Todo[]) => void;
}

function ListTodos({ todos, handleUpdateTodos }: ListTodosProps) {
  const handleDeleteTodo = (todo: Todo) => {
    const newTodos = [...todos]
    const index = todos.findIndex(td => td.id === todo.id)
    newTodos.splice(index, 1)
    handleUpdateTodos(newTodos)
  }

  const onStopDragCard = (pos: DraggableData, todo: Todo) => {
    const { y } = pos

    const qtdMoveIds = Math.floor(Math.abs(y) / 65) // 65pixel 
    console.log(qtdMoveIds, y)

    if (qtdMoveIds === 0) {
      return
    }

    const index = todos.findIndex(td => td.id === todo.id)
    const hasNext = !!todos[index + qtdMoveIds]?.id
    const hasPrev = !!todos[index - qtdMoveIds]?.id

    const newTodos = [...todos]

    for (let i = 0; i < qtdMoveIds; i++) {
      if (y > 0 && hasNext) {
        const nextIndex = index + i + 1
        const todoNext = newTodos[nextIndex]
        newTodos[nextIndex] = newTodos[index + i]
        newTodos[index + i] = todoNext
      } else if (y < 0 && hasPrev) {
        const prevIndex = index - i - 1
        const todoProv = newTodos[prevIndex]
        newTodos[prevIndex] = newTodos[index - i]
        newTodos[index - i] = todoProv
      }
    }

    if (y > 0 && hasNext) {
      newTodos[index + qtdMoveIds] = todo
    } else if (y < 0 && hasPrev) {
      newTodos[index - qtdMoveIds] = todo
    }

    handleUpdateTodos(newTodos)
  };

  return (
    <div className='app-list-container'>
      {todos.map(todo => (
        <Card
          key={todo.id}
          todo={todo}
          handleClickDelete={() => handleDeleteTodo(todo)}
          onStopDragCard={onStopDragCard}
        />
      ))}
    </div>
  );
}


export default ListTodos;
