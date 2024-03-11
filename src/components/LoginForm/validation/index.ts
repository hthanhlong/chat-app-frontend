import * as yup from "yup"

export const loginSchema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required().max(20),
  })
  .required()

// --- to do ---
// export const SignUp = yup
// .object({
//   username: yup.string().required(),
//   PasswordInput: yup.number().positive().integer().required(),
// })
// .required()
