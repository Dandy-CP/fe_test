import { z } from 'zod';

export const SignInSchema = z.object({
  username: z.string().min(1, { message: 'username is required' }),
  password: z.string().min(8, { message: 'Password min 8 Character' }),
});
