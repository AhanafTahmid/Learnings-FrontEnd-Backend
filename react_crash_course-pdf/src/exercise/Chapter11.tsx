import Chapter10 from './Chapter10';
import React, { useState } from 'react';
interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
    priority: 'high' | 'medium' | 'low';
}


const Chapter11: React.FC = () => {
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        subject: '',
        message: '',
        priority: 'medium',
    });

    const validateContactForm = (data: ContactFormData): boolean => {
        if (!data.name || !data.email || !data.subject || !data.message) {
            return false;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(data.email)) {
            return false;
        }
        return true;
    }
    const handlesubmit = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        if (!validateContactForm(formData as any)) {
            console.log("Form is invalid");
            return;
        }

        console.log("Form is valid");
        setFormData(formData);
        console.log("Form Data:", formData);
    }

    return (
        <form onSubmit={handlesubmit}>
            <input type="text" placeholder="Name" value={formData.name} onChange={ (e)=> setFormData({...formData, name: e.target.value})}/><br />
            <input type="email" placeholder="Email" value={formData.email} onChange={ (e)=> setFormData({...formData, email: e.target.value})}/><br />
            <input type="text" placeholder="Subject" value={formData.subject} onChange={ (e)=> setFormData({...formData, subject: e.target.value})}/><br />
            <textarea placeholder="Message" maxLength={500} value={formData.message} onChange={ (e)=> setFormData({...formData, message: e.target.value})}></textarea><br />
            <select value={formData.priority} onChange={ (e)=> setFormData({...formData, priority: e.target.value as 'high' | 'medium' | 'low'})}>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
            </select><br />
            <button >Submit</button>

        </form>
    )
};
export default Chapter11;