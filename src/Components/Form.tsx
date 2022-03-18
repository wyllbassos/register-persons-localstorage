import { FieldProps, Field, fieldStyles } from './Field';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  fields: FieldProps[];
}

const containerStyles: React.CSSProperties = {
  padding: '16px',
  backgroundColor: 'gray',
  width: '25%',
  display: 'flex',
  flexDirection: 'column',
}

const buttonContainerStyle: React.CSSProperties = {
  ...fieldStyles,
  justifyContent: 'center',
}

const buttonStyle: React.CSSProperties = {
  justifyContent: 'center',
  width: '50%',
  height: 24
}

function Form({ fields, ...rest }: FormProps) {
  return (
    <form style={containerStyles} {...rest}>
      {fields.map((field, i) => (
        <Field key={i} {...field} />
      ))}
      <div style={buttonContainerStyle}>
        <button style={buttonStyle} type='submit'>Salvar</button>
      </div>
    </form>
  )
}

export default Form;
