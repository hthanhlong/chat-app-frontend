import * as yup from 'yup'

export const loginSchema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required().max(20).min(6),
  })
  .required()

export const signupSchema = yup
  .object({
    nickname: yup.string().required(),
    username: yup.string().required().max(64).min(3),
    email: yup.string().email().required(),
    password: yup.string().required().max(64).min(6),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), undefined], 'Passwords must match')
      .required('Confirm Password is required'),
  })
  .required()
