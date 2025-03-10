import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import AdminMenu from '../../component/admin/AdminMenu';

interface Order {
  id: number;
  user: { name: string };
  firm: { name: string };
  dateOfOrder: string;
  payementExpected: string;
}

const OrderList: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cursor, setCursor] = useState<number | null>(null);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [previousCursors, setPreviousCursors] = useState<number[]>([]);

  const fetchOrders = async (cursor: number | null) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`http://localhost:3000/api/admin/get-order-vendor/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` },
        params: { cursor, limit: 5 }
      });

      setOrders(response.data.orders);
      setCursor(response.data.nextCursor);
      setHasNextPage(response.data.nextCursor !== null);

      if (cursor !== null) {
        setPreviousCursors(prev => [...prev, cursor]);
      }
    } catch (err) {
      setError("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(null);
  }, [id]);

  const handleNextPage = () => {
    if (cursor) {
      fetchOrders(cursor);
    }
  };

  const handlePrevPage = () => {
    const prevCursor = previousCursors[previousCursors.length - 2];
    setPreviousCursors(prev => prev.slice(0, -1));
    fetchOrders(prevCursor || null);
  };

  const handleViewDetails = (orderId: number) => {
    navigate(`/api/admin/order/${orderId}`);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div>
      <AdminMenu/>
      <h2>Order List</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>User Name:</strong> {order.user.name}</p>
            <p><strong>Firm Name:</strong> {order.firm.name}</p>
            <p><strong>Date of Order:</strong> {order.dateOfOrder}</p>
            <p><strong>Payment Expected:</strong> {order.payementExpected}</p>
            <button onClick={() => handleViewDetails(order.id)}>View Details</button>
          </li>
        ))}
      </ul>
      <div className="pagination-controls">
        <button onClick={handlePrevPage} disabled={previousCursors.length === 0}>Previous</button>
        <button onClick={handleNextPage} disabled={!hasNextPage}>Next</button>
      </div>
    </div>
  );
};

export default OrderList;
