import { useState } from "react";
const BasicForm: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [age, setAge] = useState<number>(0);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form data:', { name, email, age });
    };
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                />
            </div>
            <div>
                <label htmlFor="age">Age:</label>
                <input
                    type="number"
                    id="age"
                    value={age}
                    onChange={(e) => setAge(parseInt(e.target.value) || 0)}
                    min="0"
                    max="120"
                />

            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default BasicForm