import * as React from 'react';
import {useState } from 'react';
import axios from 'axios';
import {serverUrl} from '../../../helpers/constants';

interface IFormContainerProps {
}

const FormContainer: React.FunctionComponent<IFormContainerProps> = () => {
    const [fullurl, setfullUrl] = useState<string>('');
    //const [shortenedUrl, setShortenedUrl] = useState<string>('');

    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            //error here??
            //1 hour 12 minutes
            const response = await axios.post(`${serverUrl}/shortenUrl`, { fullurl });
            setfullUrl('');
            alert(`Shortened URL: ${response.data.shortenedUrl}`);
        } catch (error) {
            console.error('Error shortening URL:', error);
        }
        
    };

  return (
    <>
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold">Url Shortener</h1>
            <p className="mt-2">This is a simple URL shortener application.</p>
            <form className="mt-4" onSubmit={onSubmitHandler}>
                <input type="text" placeholder="Enter URL" className="border p-2 w-full"
                value={fullurl} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setfullUrl(e.target.value)}
                />
                <button type="submit" className="bg-blue-500 text-white p-2 mt-2">Shorten URL</button>
            </form>
        </div>
    </>
  );
};

export default FormContainer;
