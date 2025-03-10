import axios from "axios";
import { useEffect, useState } from "react";
import './adminGet.css';
import AdminMenu from "../../component/admin/AdminMenu";
import { useNavigate } from "react-router-dom";

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
  isDeleted: boolean;
}

const GetUser = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [nextCursor, setNextCursor] = useState<number | null>(null);
  const [prevCursors, setPrevCursors] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [nameSearch, setNameSearch] = useState<string>("");
  const [emailSearch, setEmailSearch] = useState<string>("");
  const [includeInactive, setIncludeInactive] = useState<boolean>(false);

  const fetchData = async (cursor: number | null = null, direction: 'next' | 'prev' = 'next', name: string = "", email: string = "", includeInactive: boolean = false) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const response = await axios.get("http://localhost:3000/api/admin/get-users", {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: {
          cursor,
          limit: 2,
          name,
          email,
          includeInactive
        }
      });

      const newUsers = response.data.data;
      setUsers(newUsers);
      setNextCursor(response.data.nextCursor);

      if (direction === 'next' && cursor !== null) {
        setPrevCursors(prev => [...prev, cursor]);
      } else if (direction === 'prev') {
        setPrevCursors(prev => prev.slice(0, -1));
      }

      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || err.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNextPage = () => {
    if (nextCursor) {
      fetchData(nextCursor, 'next', nameSearch, emailSearch, includeInactive);
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (prevCursors.length > 0) {
      const prevCursor = prevCursors[prevCursors.length - 2];
      fetchData(prevCursor, 'prev', nameSearch, emailSearch, includeInactive);
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleNameSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNameSearch(value);
    fetchData(null, 'next', value, emailSearch, includeInactive);
    setCurrentPage(1);
    setPrevCursors([]);
  };

  const handleEmailSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmailSearch(value);
    fetchData(null, 'next', nameSearch, value, includeInactive);
    setCurrentPage(1);
    setPrevCursors([]);
  };

  const handleIncludeInactiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIncludeInactive(checked);
    fetchData(null, 'next', nameSearch, emailSearch, checked);
    setCurrentPage(1);
    setPrevCursors([]);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <AdminMenu />
      <div className="get-user-container">
        <h2>User Information</h2>
        <input
          type="text"
          placeholder="Search by name"
          value={nameSearch}
          onChange={handleNameSearchChange}
          className="search-input"
        />
        <input
          type="text"
          placeholder="Search by email"
          value={emailSearch}
          onChange={handleEmailSearchChange}
          className="search-input"
        />
        <label>
          <input
            type="checkbox"
            checked={includeInactive}
            onChange={handleIncludeInactiveChange}
          />
          Include Inactive Users
        </label>
        <div className="user-card-list">
          {users.map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
        {loading && <div className="loading">Loading...</div>}
        <div className="pagination-buttons">
          <button onClick={handlePreviousPage} disabled={currentPage === 1 || loading}>Previous Page</button>
          <button onClick={handleNextPage} disabled={!nextCursor || loading}>Next Page</button>
        </div>
      </div>
    </div>
  );
};

interface UserCardProps {
  user: {
    id: number;
    name: string;
    email: string;
    pocName?: string;
    pocPhone?: string;
    isDeleted: boolean;
  };
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const navigate = useNavigate();

  const handleUpdateClick = () => {
    navigate(`/api/admin/update-customer/${user.id}`);
  };

  const handleClick = () => {
    navigate(`/api/admin/user/${user.id}`);
  };

  return (
    <div className="user-card">
      <p><strong>Company Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>POC Name:</strong> {user.pocName}</p>
      <p><strong>POC Phone:</strong> {user.pocPhone}</p>
      <p><strong>Status:</strong> {user.isDeleted ? 'Inactive' : 'Active'}</p>
      <button onClick={handleUpdateClick}>Update</button>
      <button onClick={handleClick}>More Info</button>
    </div>
  );
};

export default GetUser;
