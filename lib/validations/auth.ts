import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.string().email().min(1),
    username: z
      .string()
      .min(3)
      .max(30)
      .regex(/^[a-zA-Z0-9_]+$/, "Nom d'utilisateur invalide"),
    password: z
      .string()
      .min(8, "Mot de passe trop court")
      .regex(/[A-Z]/, "Doit contenir une majuscule")
      .regex(/[0-9]/, "Doit contenir un chiffre"),
    firstName: z.string().min(1).max(50),
    lastName: z.string().min(1).max(50),
    recaptchaToken: z.string().min(1), 
  })
  .strict();


export const loginSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
  password: z.string().min(6, { message: "Mot de passe trop court" }),
  recaptchaToken: z.string().min(1),
});

export type RegisterInput = z.infer<typeof registerSchema>;
