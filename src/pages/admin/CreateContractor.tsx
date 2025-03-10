import React, { useState } from 'react';
import axios from 'axios';
import AdminMenu from '../../component/admin/AdminMenu';
import './adminPage.css';

const CreateContractor: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [workType, setWorkType] = useState('');
  const [startup, setStartup] = useState(false);
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<{ [key: string]: FileList | null }>({
    agreementFile: null,
    ndaFile: null,
    other: null
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files: selectedFiles } = e.target;
    setFiles(prevFiles => ({
      ...prevFiles,
      [name]: selectedFiles
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('workType', workType);
    formData.append('startup', startup.toString());

    Object.keys(files).forEach(key => {
      const fileList = files[key];
      if (fileList) {
        Array.from(fileList).forEach(file => {
          formData.append(key, file);
        });
      }
    });

    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.post('http://localhost:3000/api/admin/create-contractor', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setMessage('Contractor created successfully');
        setName('');
        setEmail('');
        setPassword('');
        setWorkType('');
        setStartup(false);
        setFiles({
          agreementFile: null,
          ndaFile: null,
          other: null
        });
      } else {
        setMessage('Failed to create contractor');
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
        <h2 className='feature-heading'>Create Contractor</h2>
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
          <div className='feature-item-container'>
            <label className='feature-label'>Work Type:</label>
            <input className='feature-input' type="text" value={workType} onChange={(e) => setWorkType(e.target.value)} />
          </div>
          <div className='feature-item-container'>
            <label className='feature-label'>Startup:</label>
            <input className='feature-input' type="checkbox" checked={startup} onChange={(e) => setStartup(e.target.checked)} />
          </div>
          <div className='feature-item-container'>
            <label className='feature-label'>Agreement File:</label>
            <input className='feature-input' type="file" name="agreementFile" onChange={handleFileChange} />
          </div>
          <div className='feature-item-container'>
            <label className='feature-label'>NDA File:</label>
            <input className='feature-input' type="file" name="ndaFile" onChange={handleFileChange} />
          </div>
          <div className='feature-item-container'>
            <label className='feature-label'>Other File:</label>
            <input className='feature-input' type="file" name="other" onChange={handleFileChange} />
          </div>
          <button className='feature-button' type="submit">Create Contractor</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default CreateContractor;
