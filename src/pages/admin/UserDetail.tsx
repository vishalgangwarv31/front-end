import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

interface Order {
  id: number;
  dateOfOrder: string | null;
  orderStatus: string;
  vendor: string;
}

const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [orders, setOrders] = useState<Order[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const [prevCursors, setPrevCursors] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchOrders = async (userId: number, cursor: number | null = null) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get('http://localhost:3000/api/admin/get-order', {
        params: {
          cursor,
          limit: 10,
          userId
        },
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setOrders(response.data.orders);
      setCursor(response.data.nextCursor);
      if (cursor) {
        setPrevCursors([...prevCursors, cursor]);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await axios.get(`http://localhost:3000/api/admin/get-user/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setUser(response.data.user);
        fetchOrders(response.data.user.id);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || err.message);
        } else {
          setError('An unexpected error occurred');
        }
      }
    };

    fetchUser();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  const handleNext = () => {
    if (user) {
      fetchOrders(user.id, cursor);
    }
  };

  const handlePrevious = () => {
    const newPrevCursors = [...prevCursors];
    const prevCursor = newPrevCursors.pop() || null;
    setPrevCursors(newPrevCursors);
    if (user) {
      fetchOrders(user.id, prevCursor);
    }
  };

  const handleOrderClick = (orderId: number) => {
    navigate(`/api/admin/order/${orderId}`);
  };

  return (
    <div>
      <AdminMenu />
      <div className="get-user-container">
        <h2>Customer info</h2>
        <ul className="get-user-list">
          <li className="get-user-item">
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
        </ul>
      </div>

      <div>
        <h1>Orders</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <ul>
              {orders.map(order => (
                <li key={order.id} onClick={() => handleOrderClick(order.id)}>
                  <div>
                    <p>Date of Order: {order.dateOfOrder}</p>
                    <p>Order Status: {order.orderStatus}</p>
                    <p>Vendor: {order.vendor}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div>
              <button onClick={handlePrevious} disabled={prevCursors.length === 0}>
                Previous
              </button>
              <button onClick={handleNext} disabled={!cursor}>
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
