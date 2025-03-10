import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminMenu from '../../component/admin/AdminMenu';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Firm {
  id: number;
  name: string;
  email: string;
}

const CreateOrder: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [firms, setFirms] = useState<Firm[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedFirmId, setSelectedFirmId] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    dateOfOrder: "",
    typeOfOrder: "",
    payementExpected: "",
    amountCharged: "",
    amountPaid: "",
    orderStatus: "",
    commentStatusCycle: "",
    dateOdExpectation: "",
    nextActionLawyer: "",
    nextActionClient: "",
    govtAppNumber: "",
    dateOfFilling: "",
    lawyerRefrenceNumber: "",
    inmNumber: "",
    orderCompleteDate: "",
    documentProvided: [] as File[],
    invoiceUploaded: [] as File[],
    fileUploaded: [] as File[]
  });

  useEffect(() => {
    const fetchUsersAndFirms = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const [usersResponse, firmsResponse] = await Promise.all([
          axios.get('http://localhost:3000/api/admin/get-all-user', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }),
          axios.get('http://localhost:3000/api/admin/get-all-vendor', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }),
        ]);
        setUsers(usersResponse.data.data);
        setFirms(firmsResponse.data.data);
      } catch (error) {
        console.error('Error fetching users and firms:', error);
      }
    };

    fetchUsersAndFirms();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setFormData(prev => ({
        ...prev,
        [name]: Array.from(files)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedUserId === null || selectedFirmId === null) {
      setMessage('Please select both a user and a firm.');
      return;
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('userId', selectedUserId.toString());
    formDataToSubmit.append('firmId', selectedFirmId.toString());
    Object.keys(formData).forEach(key => {
      if (key === 'documentProvided' || key === 'invoiceUploaded' || key === 'fileUploaded') {
        (formData[key] as File[]).forEach(file => {
          formDataToSubmit.append(key, file);
        });
      } else {
        formDataToSubmit.append(key, formData[key as keyof typeof formData] as string);
      }
    });
    

    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.post('http://localhost:3000/api/admin/create-order', formDataToSubmit, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setMessage('Order created successfully');
        setSelectedUserId(null);
        setSelectedFirmId(null);
        setFormData({
          dateOfOrder: "",
          typeOfOrder: "",
          payementExpected: "",
          amountCharged: "",
          amountPaid: "",
          orderStatus: "",
          commentStatusCycle: "",
          dateOdExpectation: "",
          nextActionLawyer: "",
          nextActionClient: "",
          govtAppNumber: "",
          dateOfFilling: "",
          lawyerRefrenceNumber: "",
          inmNumber: "",
          orderCompleteDate: "",
          documentProvided: [] as File[],
          invoiceUploaded: [] as File[],
          fileUploaded: [] as File[]
        });
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
      <AdminMenu />
  
      <div className='feature-container'>
        <h2 className='feature-heading'>Create Order</h2>
        <form onSubmit={handleSubmit}>
          <div className='feature-item-container-list'>
            <label className='feature-list-label'>User:</label>
            <select name="userId" value={selectedUserId ?? ''} onChange={(e) => setSelectedUserId(Number(e.target.value))} required>
              <option value="" disabled>Select a user</option>
              {users.map(user => (
                <option key={user.email} value={user.id}>{user.email} (ID: {user.name})</option>
              ))}
            </select>
          </div>
          <div className='feature-item-container-list'>
            <label className='feature-list-label'>Firm:</label>
            <select name="firmId" value={selectedFirmId ?? ''} onChange={(e) => setSelectedFirmId(Number(e.target.value))} required>
              <option value="" disabled>Select a firm</option>
              {firms.map(firm => (
                <option key={firm.email} value={firm.id}>{firm.email} (name: {firm.name})</option>
              ))}
            </select>
          </div>
          <div className='feature-item-container-list'>
            <label className='feature-list-label'>Date of Order:</label>
            <input type="text" name="dateOfOrder" onChange={handleInputChange} />
          </div>
          <div className='feature-item-container-list'>
            <label className='feature-list-label'>Type of Order:</label>
            <input type="text" name="typeOfOrder" onChange={handleInputChange} />
          </div>
          <div className='feature-item-container-list'>
            <label className='feature-list-label'>Payment Expected:</label>
            <input type="text" name="payementExpected" onChange={handleInputChange} />
          </div>
          <div className='feature-item-container-list'>
            <label className='feature-list-label'>Amount Charged:</label>
            <input type="number" name="amountCharged" onChange={handleInputChange} />
          </div>
          <div className='feature-item-container-list'>
            <label className='feature-list-label'>Amount Paid:</label>
            <input type="number" name="amountPaid" onChange={handleInputChange} />
          </div>
          <div className='feature-item-container-list'>
            <label className='feature-list-label'>Order Status:</label>
            <input type="text" name="orderStatus" onChange={handleInputChange} />
          </div>
          <div className='feature-item-container-list'>
            <label className='feature-list-label'>Comment Status Cycle:</label>
            <input type="text" name="commentStatusCycle" onChange={handleInputChange} />
          </div>
          <div className='feature-item-container-list'>
            <label className='feature-list-label'>Date of Expectation:</label>
            <input type="text" name="dateOdExpectation" onChange={handleInputChange} />
          </div>
          <div className='feature-item-container-list'>
            <label className='feature-list-label'>Next Action Lawyer:</label>
            <input type="text" name="nextActionLawyer" onChange={handleInputChange} />
          </div>
          <div className='feature-item-container-list'>
            <label className='feature-list-label'>Next Action Client:</label>
            <input type="text" name="nextActionClient" onChange={handleInputChange} />
          </div>
          <div className='feature-item-container-list'>
            <label className='feature-list-label'>Govt App Number:</label>
            <input type="number" name="govtAppNumber" onChange={handleInputChange} />
          </div>
          <div className='feature-item-container-list'>
            <label className='feature-list-label'>Date of Filling:</label>
            <input type="text" name="dateOfFilling" onChange={handleInputChange} />
          </div>
          <div className='feature-item-container-list'>
            <label className='feature-list-label'>Lawyer Reference Number:</label>
            <input type="number" name="lawyerRefrenceNumber" onChange={handleInputChange} />
          </div>
          <div className='feature-item-container-list'>
            <label className='feature-list-label'>INM Number:</label>
            <input type="text" name="inmNumber" onChange={handleInputChange} />
          </div>
          <div className='feature-item-container-list'>
            <label className='feature-list-label'>Order Complete Date:</label>
            <input type="text" name="orderCompleteDate" onChange={handleInputChange} />
          </div>
          <div className='feature-item-container-list'>
            <label className='feature-list-label'>Document Provided:</label>
            <input type="file" name="documentProvided" multiple onChange={handleFileChange} />
          </div>
          <div className='feature-item-container-list'>
            <label className='feature-list-label'>Invoice Uploaded:</label>
            <input type="file" name="invoiceUploaded" multiple onChange={handleFileChange} />
          </div>
          <div className='feature-item-container-list'>
            <label className='feature-list-label'>File Uploaded:</label>
            <input type="file" name="fileUploaded" multiple onChange={handleFileChange} />
          </div>
          <button className='feature-button' type="submit">Create Order</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default CreateOrder;