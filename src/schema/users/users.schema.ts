import { object, string } from "zod";

export const CreateUserSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    password: string({
      required_error: "Name is required",
    }).min(8, "Password to Short, should be 8 chars minimum"),
    passwordConfirmation: string({
      required_error: "Password Confirmation is required",
    }),
    email: string({
      required_error: "email is required",
    }).email("Not a valid Email"),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "password do not match",
    path: ['passwordConfirmation']
  } ),
});
