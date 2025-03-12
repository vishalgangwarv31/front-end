import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminMenu from '../../component/admin/AdminMenu';
import { useParams } from 'react-router-dom';

const UpdateUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('');
  const [pocPhone, setPocPhone] = useState('');
  const [pocName, setPocName] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [dpiit, setDpiit] = useState(false);
  const [dpiitDate, setDpiitDate] = useState('');
  const [isDeleted, setIsDeleted] = useState(false);
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
  const [existingFiles, setExistingFiles] = useState<{ [key: string]: string[] }>({
    tdsFile: [],
    gstFile: [],
    ndaFile: [],
    dpiitFile: [],
    agreementFile: [],
    qunatifoFile: [],
    panCard: [],
    udhyanFile: []
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await axios.get(`http://localhost:3000/api/admin/get-user/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          const user = response.data.user;
          console.log(response.data.user)
          setName(user.name);
          setEmail(user.email);
          setType(user.type);
          setPocPhone(user.pocPhone);
          setPocName(user.pocName);
          setGstNumber(user.gstNumber);
          setDpiit(user.dpiit);
          setDpiitDate(user.dpiitDate ? new Date(user.dpiitDate).toISOString().split('T')[0] : '');
          setIsDeleted(user.isDeleted);
          setExistingFiles({
            tdsFile: user.tdsFile || [],
            gstFile: user.gstFile || [],
            ndaFile: user.ndaFile || [],
            dpiitFile: user.dpiitFile || [],
            agreementFile: user.agreementFile || [],
            qunatifoFile: user.qunatifoFile || [],
            panCard: user.panCard || [],
            udhyanFile: user.udhyanFile || []
          });
        } else {
          setMessage('Failed to fetch user details');
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setMessage(error.response?.data?.message || 'An error occurred');
        } else {
          setMessage('An unexpected error occurred');
        }
      }
    };

    fetchUser();
  }, [id]);

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
    if (password) {
      formData.append('password', password);
    }
    formData.append('type', type);
    formData.append('pocPhone', pocPhone);
    formData.append('pocName', pocName);
    formData.append('gstNumber', gstNumber);
    formData.append('dpiit', dpiit ? 'true' : 'false');
    formData.append('isDeleted', isDeleted.toString());
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
      const response = await axios.put(`http://localhost:3000/api/admin/update-user/${id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setMessage('User updated successfully');
      } else {
        setMessage('Failed to update user');
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
          <h2 className='feature-heading'>Update User</h2>
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
              <input className='feature-input' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
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
          <div className='feature-item-container'>
            <label className='feature-label'>Inactive Status:</label>
            <input className='feature-input' type="checkbox" checked={isDeleted} onChange={(e) => setIsDeleted(e.target.checked)} /> {!isDeleted ? <p>Active</p> : <p>Inactive</p>}
          </div>
            {Object.keys(files).map(key => (
              <div className='feature-item-container' key={key}>
                <label className='feature-label'>{key}:</label>
                <input className='feature-input' type="file" name={key} multiple onChange={handleFileChange} />
                {existingFiles[key].length > 0 && (
                  <div className='existing-files'>
                    <p>Existing files:</p>
                    <ul>
                      {existingFiles[key].map((file, index) => (
                        <li key={index}>{file}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
            <button className='feature-button' type="submit">Update User</button>
          </form>
          {message && <p>{message}</p>}
      </div>
    </div>
  );
};  

export default UpdateUser;
