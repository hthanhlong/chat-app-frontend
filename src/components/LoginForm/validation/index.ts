import * as yup from "yup"

export const loginSchema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required().max(20).min(6),
  })
  .required()
