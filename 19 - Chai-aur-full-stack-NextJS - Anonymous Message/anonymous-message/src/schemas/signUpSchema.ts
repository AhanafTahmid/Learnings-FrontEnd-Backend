import {z} from 'zod';
import { Messages } from '../model/User';

export const signUpSchema = z.object({
    username: z.string().min(2, 'Username must be at least 2 characters long').max(100, 'Username must be at most 100 characters long'),
    email: z.string(),
    password: z.string().min(6, {message: 'Password must be at least 6 characters long'})
});
