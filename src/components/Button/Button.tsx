import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: JSX.Element
  text: string
}

const Button = ({ icon, text, ...props }: ButtonProps) => {
  return (
    <button {...props}>
      {icon && icon}
      <span>{text}</span>
    </button>
  )
}

export default Button
