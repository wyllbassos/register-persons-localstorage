import { InputHTMLAttributes } from 'react';

export interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  key: string;
  marginTop?: boolean;
}

export const fieldStyles: React.CSSProperties = {
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: 32,
  // marginTop: marginTop ? 16 : 0,
}

export const Field = (props: FieldProps) => {
  const { label, marginTop, ...rest } = props
  return (
    <div style={fieldStyles}>
      <label>{label}</label>
      <input
        {...rest}
      />
    </div>
  )
}
