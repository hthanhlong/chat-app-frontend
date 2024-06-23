import { ButtonHTMLAttributes } from 'react'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: JSX.Element
  text: string
}

const Button = ({ icon, text, ...props }: IButtonProps) => {
  return (
    <button {...props}>
      {icon && icon}
      <span>{text}</span>
    </button>
  )
}

export default Button
