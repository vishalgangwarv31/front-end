import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminMenu from '../../component/admin/AdminMenu';

interface User {
  id: number;
  email: string;
}

interface Firm {
  id: number;
  email: string;
}

const CreateOrder: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [firms, setFirms] = useState<Firm[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedFirmId, setSelectedFirmId] = useState<number | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUsersAndFirms = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const [usersResponse, firmsResponse] = await Promise.all([
          axios.get('http://localhost:3000/api/admin/get-users', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }),
          axios.get('http://localhost:3000/api/admin/get-contractor', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }),
        ]);
        setUsers(usersResponse.data.user);
        setFirms(firmsResponse.data.user);
      } catch (error) {
        console.error('Error fetching users and firms:', error);
      }
    };

    fetchUsersAndFirms();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedUserId === null || selectedFirmId === null) {
      setMessage('Please select both a user and a firm.');
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.post('http://localhost:3000/api/admin/create-order', {
        userId: selectedUserId,
        firmId: selectedFirmId,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setMessage('Order created successfully');
        setSelectedUserId(null);
        setSelectedFirmId(null);
      } else {
        setMessage('Failed to create order');
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
          <h2 className='feature-heading'>Create Order</h2>
          <form onSubmit={handleSubmit}>
            <div className='feature-item-container-list'>
              <label className='feature-list-label'>User:</label>
              <select value={selectedUserId ?? ''} onChange={(e) => setSelectedUserId(Number(e.target.value))} required>
                <option value="" disabled>Select a user</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>{user.email} (ID: {user.id})</option>
                ))}
              </select>
            </div>
            <div className='feature-item-container-list'>
              <label className='feature-list-label'>Firm   : </label>
              <select value={selectedFirmId ?? ''} onChange={(e) => setSelectedFirmId(Number(e.target.value))} required>
                <option value="" disabled>Select a firm</option>
                {firms.map(firm => (
                  <option key={firm.id} value={firm.id}>{firm.email} (ID: {firm.id})</option>
                ))}
              </select>
            </div>
            <button className='feature-button' type="submit">Create Order</button>
          </form>
          {message && <p>{message}</p>}
      </div>

      
    </div>
  );
};

export default CreateOrder;