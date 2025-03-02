import React, { useState } from 'react';
import axios from 'axios';
import AdminMenu from '../../component/admin/AdminMenu';

const CreateUser: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.post('http://localhost:3000/api/admin/create-user', {
        name,
        email,
        password,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setMessage('User created successfully');
        setName('');
        setEmail('');
        setPassword('');
      } else {
        setMessage('Failed to create user');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data?.message || 'An error occurred');
      } else {
        setMessage('An unexpected error occurred');
      }
    }
  };

  return (
    <div className='parent-feature-container'>
      <AdminMenu/>

      <div className='feature-container'>
          <h2 className='feature-heading'>Create User</h2>
          <form onSubmit={handleSubmit}>
            <div className='feature-item-container'>
              <label className='feature-label'>Name:</label>
              <input className='feature-input' type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className='feature-item-container'>
              <label className='feature-label'>Email:</label>
              <input className='feature-input' type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className='feature-item-container'>
              <label className='feature-label'>Password:</label>
              <input className='feature-input' type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button className='feature-button' type="submit">Create User</button>
          </form>
          {message && <p>{message}</p>}
      </div>
     
    </div>
  );
};

export default CreateUser;