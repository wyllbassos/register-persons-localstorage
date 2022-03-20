import { Todo } from '../App';
import './ListTodo.css';

import Draggable, { DraggableData, DraggableEvent } from 'react-draggable'; // Both at the same time
import { useRef } from 'react';

type OnEvent = DraggableEvent

export interface CardProps {
    todo: Todo;
    handleClickDelete: () => void;
    onStopDragCard: (pos: DraggableData, todo: Todo) => void;
  }

function Card({ todo, handleClickDelete, onStopDragCard }: CardProps) {
  const nodeRef = useRef(null);

  return (
    <Draggable
      nodeRef={nodeRef}
      axis='y'
      // onDrag={(e, pos) => onEvent(e, 'onDrag', pos)}
      // onStart={(e, pos) => onEvent(e, 'onStart', pos)}
      position={{ x:0, y:0 }}
      onStop={(e, pos) => onStopDragCard(pos, todo)}
      // onMouseDown={e => onEvent(e, 'onMouseDown')}
      // bounds="parent"
    >
      <div className='app-list-card' ref={nodeRef}>
        <div className='app-list-card-button-container'>
          <button onClick={handleClickDelete}>X</button>
        </div>
        <div className='app-list-card-label-container'>
          <label>{todo.description}</label>
        </div>
      </div>
    </Draggable>
  );
}

export default Card;
