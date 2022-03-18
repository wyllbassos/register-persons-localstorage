import { useState } from 'react';
import { Todo } from '../App';
import { FieldProps } from '../Components/Field';
import Form from '../Components/Form';

interface FormTodoProps extends React.FormHTMLAttributes<HTMLFormElement> {
    handleAddTodo: (todo: Todo) => void;
}

const todoEmpty: Todo = { description: '' }

function FormTodo({ handleAddTodo }: FormTodoProps) {
  const [todoForm, setTodoForm] = useState(todoEmpty)

  const fields: FieldProps[] = [
    {
      marginTop: false,
      value: todoForm.description,
      label: 'Nome',
      onChange: e => handleChangeField(e, 'description'),
      type: 'text'
    },
  ]

  const handleChangeField = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: 'description'
  ) => {
    const { target: { value } } = event;
    switch (fieldName) {
      case 'description':
        setTodoForm(state => ({...state, description: value }))
        break;
      default:
        break;
    }
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    handleAddTodo(todoForm)

    setTodoForm(todoEmpty)
  }

  return (
    <Form fields={fields} onSubmit={onSubmit} />
  );
}


export default FormTodo;
