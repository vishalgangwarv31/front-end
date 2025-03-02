import axios from "axios";
import { useEffect, useState } from "react";
import './adminGet.css'
import AdminMenu from "../../component/admin/AdminMenu";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  type?: string;
  pocPhone?: string;
  pocName?: string;
  gstNumber?: string;
  dpiit?: boolean;
  dpiitDate?: string;
  tdsFile?: string;
  gstFile?: string;
  ndaFile?: string;
  dpiitFile?: string;
  agreementFile?: string;
  qunatifoFile?: string;
  panCard?: string;
  udhyanFile?: string;
}

const GetUser = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await axios.get("http://localhost:3000/api/admin/get-users", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setUsers(response.data.user);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || err.message);
        } else {
          setError('An unexpected error occurred');
        }
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (users.length === 0) {
    return <div className="loading">Loading</div>;
  }

  return (
    <div>
    <AdminMenu/>
    <div className="get-user-container">
     
      <h2>User Information</h2>
      <ul className="get-user-list">
        {users.map(user => (
          <li key={user.id} className="get-user-item">
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Created At:</strong> {new Date(user.createdAt).toLocaleString()}</p>
            <p><strong>Type:</strong> {user.type}</p>
            <p><strong>POC Phone:</strong> {user.pocPhone}</p>
            <p><strong>POC Name:</strong> {user.pocName}</p>
            <p><strong>GST Number:</strong> {user.gstNumber}</p>
            <p><strong>DPIIT:</strong> {user.dpiit ? 'Yes' : 'No'}</p>
            <p><strong>DPIIT Date:</strong> {user.dpiitDate ? new Date(user.dpiitDate).toLocaleString() : 'N/A'}</p>
            <p><strong>TDS File:</strong> {user.tdsFile}</p>
            <p><strong>GST File:</strong> {user.gstFile}</p>
            <p><strong>NDA File:</strong> {user.ndaFile}</p>
            <p><strong>DPIIT File:</strong> {user.dpiitFile}</p>
            <p><strong>Agreement File:</strong> {user.agreementFile}</p>
            <p><strong>Qunatifo File:</strong> {user.qunatifoFile}</p>
            <p><strong>PAN Card:</strong> {user.panCard}</p>
            <p><strong>Udhyan File:</strong> {user.udhyanFile}</p>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );  
};

export default GetUser;
