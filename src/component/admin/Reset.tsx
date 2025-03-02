import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Reset: React.FC = () => {
    const { id, token } = useParams<{ id: string; token: string }>();
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3000/api/admin/reset-password/${id}/${token}`, { password });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Something wentss wrong');
        }
    };

    return (
        <div className="forget-pass-container">
            <div className="forget-pass-card">
                <h2 className="forget-pass-title">Reset Password</h2>
                <form onSubmit={handleSubmit} className="forget-pass-form">
                    <div className="form-group2">
                        <label htmlFor="password" className="form-label2">New Password:</label>
                        <input
                            className="form-input2"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Enter New Password'
                            required
                        />
                    </div>
                    <button className='button' type="submit">Reset Password</button>
                </form>
                {message && <p>{message}</p>}
            </div>
            
        </div>
    );
};

export default Reset;
