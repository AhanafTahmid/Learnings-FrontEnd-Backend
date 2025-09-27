import { forwardRef } from 'react';
import { useForm } from 'react-hook-form';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}
const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, ...props }, ref) => {
        return (
            <div className="input-group">
                <label htmlFor={props.id}>{label}</label>
                <input
                    ref={ref}
                    {...props}
                    className={`input ${error ? 'input-error' : ''}`}
                />
                {error && <span className="error-message">{error}</span>}
            </div>
        );
    }
);

Input.displayName = 'Input';
// Usage with React Hook Form
const CustomForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<{
        name: string;
        email: string;
    }>();

    return (
        <form onSubmit={handleSubmit(data => console.log(data))}>
            <Input
                label="Name"
                id="name"
                {...register('name', { required: 'Name is required' })}
                error={errors.name?.message}
            />
            <Input
                label="Email"
                id="email"
                type="email"
                {...register('email', {
                    required: 'Email is required',
                    pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Invalid email format'
                    }
                })}
                error={errors.email?.message}
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default CustomForm;