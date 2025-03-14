import React, { useState } from 'react';
import axios from 'axios';
import AdminMenu from '../../component/admin/AdminMenu';

const CreateUser: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('');
  const [pocPhone, setPocPhone] = useState('');
  const [pocName, setPocName] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [dpiit, setDpiit] = useState(false);
  const [dpiitDate, setDpiitDate] = useState('');
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<{ [key: string]: FileList | null }>({
    tdsFile: null,
    gstFile: null,
    ndaFile: null,
    dpiitFile: null,
    agreementFile: null,
    qunatifoFile: null,
    panCard: null,
    udhyanFile: null
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
    formData.append('type', type);
    formData.append('pocPhone', pocPhone);
    formData.append('pocName', pocName);
    formData.append('gstNumber', gstNumber);
    formData.append('dpiit', dpiit.toString());
    if (dpiit && dpiitDate) {
      const formattedDate = new Date(dpiitDate).toISOString();
      formData.append('dpiitDate', formattedDate);
    }

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
      const response = await axios.post('http://localhost:3000/api/admin/create-user', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setMessage('User created successfully');
        setName('');
        setEmail('');
        setPassword('');
        setType('');
        setPocPhone('');
        setPocName('');
        setGstNumber('');
        setDpiit(false);
        setDpiitDate('');
        setFiles({
          tdsFile: null,
          gstFile: null,
          ndaFile: null,
          dpiitFile: null,
          agreementFile: null,
          qunatifoFile: null,
          panCard: null,
          udhyanFile: null
        });
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
            <div className='feature-item-container'>
              <label className='feature-label'>Type:</label>
              <input className='feature-input' type="text" value={type} onChange={(e) => setType(e.target.value)} />
            </div>
            <div className='feature-item-container'>
              <label className='feature-label'>POC Phone:</label>
              <input className='feature-input' type="text" value={pocPhone} onChange={(e) => setPocPhone(e.target.value)} />
            </div>
            <div className='feature-item-container'>
              <label className='feature-label'>POC Name:</label>
              <input className='feature-input' type="text" value={pocName} onChange={(e) => setPocName(e.target.value)} />
            </div>
            <div className='feature-item-container'>
              <label className='feature-label'>GST Number:</label>
              <input className='feature-input' type="text" value={gstNumber} onChange={(e) => setGstNumber(e.target.value)} />
            </div>
            <div className='feature-item-container'>
              <label className='feature-label'>DPIIT:</label>
              <input className='feature-input' type="checkbox" checked={dpiit} onChange={(e) => setDpiit(e.target.checked)} />
            </div>
            {dpiit && (
              <div className='feature-item-container'>
                <label className='feature-label'>DPIIT Date:</label>
                <input className='feature-input' type="date" value={dpiitDate} onChange={(e) => setDpiitDate(e.target.value)} />
              </div>
            )}
            {Object.keys(files).map(key => (
              <div className='feature-item-container' key={key}>
                <label className='feature-label'>{key}:</label>
                <input className='feature-input' type="file" name={key} multiple onChange={handleFileChange} />
              </div>
            ))}
            <button className='feature-button' type="submit">Create User</button>
          </form>
          {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default CreateUser;
