import { useState } from "react"

function Form() {
    const [inputValue, setInputValue] = useState('')
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    const [key, setkey] = useState('');

    const keypress = (event: any) => {
        if( event.key == 'Escape') console.log("hehehhe", )
    }

    

    const handleSubmit = (event) => {
        event.preventDefault() // Prevent page refresh
        console.log('Form submitted with:', inputValue)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={inputValue}
                onKeyDown={keypress}
                onChange={handleInputChange}
                placeholder="Enter text"
            />
            <button type="submit">Submit</button>
        </form>
    )
}

export default Form;
