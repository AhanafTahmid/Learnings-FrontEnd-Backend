import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
interface LoginFormData {
    email: string;
    password: string;
}
const HookForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<LoginFormData>();
    const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
        console.log('Form data:', data);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        alert('Login successful!');
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    {...register('email', {
                        required: 'Email is required',

                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Please enter a valid email'
                        }
                    })}
                />
                {errors.email && <span
                    className="error">{errors.email.message}</span>}
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    {...register('password', {
                        required: 'Password is required',
                        minLength: {
                            value: 8,
                            message: 'Password must be at least 8 characters'
                        }
                    })}
                />
                {errors.password && <span
                    className="error">{errors.password.message}</span>}
            </div>
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
        </form>
    );
};

export default HookForm;