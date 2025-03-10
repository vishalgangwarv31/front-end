import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminMenu from "../../component/admin/AdminMenu";

interface Order {
  id: number;
  userId: number;
  firmId: number;
  dateOfOrder: string | null;
  typeOfOrder: string | null;
  payementExpected: string | null;
  amountCharged: number | null;
  amountPaid: number | null;
  orderStatus: string;
  commentStatusCycle: string[];
  dateOdExpectation: string | null;
  documentProvidedLinks: { filename: string; url: string }[];
  invoiceUploadedLinks: { filename: string; url: string }[];
  fileUploadedLinks: { filename: string; url: string }[];
  nextActionLawyer: string | null;
  nextActionClient: string | null;
  govtAppNumber: number | null;
  dateOfFilling: string | null;
  lawyerRefrenceNumber: number | null;
  inmNumber: string | null;
  orderCompleteDate: string | null;
  createdAt: string;
}

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('adminToken');
        const response = await axios.get(`http://localhost:3000/api/admin/order/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setOrder(response.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || err.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const handleEdit = () => {
    navigate(`/api/admin/update-order/${order?.id}`);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!order) {
    return <div>No order details available</div>;
  }

  return (
    <div>
      <AdminMenu />
      <div className="order-detail-container">
        <h2>Order Details</h2>
        <p>{order.id}</p>
        <p><strong>Date of Order:</strong> {order.dateOfOrder}</p>
        <p><strong>Type of Order:</strong> {order.typeOfOrder}</p>
        <p><strong>Payment Expected:</strong> {order.payementExpected}</p>
        <p><strong>Amount Charged:</strong> {order.amountCharged}</p>
        <p><strong>Amount Paid:</strong> {order.amountPaid}</p>
        <p><strong>Order Status:</strong> {order.orderStatus}</p>
        <p><strong>Comment Status Cycle:</strong> {order.commentStatusCycle.join(', ')}</p>
        <p><strong>Date of Expectation:</strong> {order.dateOdExpectation}</p>
        <p><strong>Next Action Lawyer:</strong> {order.nextActionLawyer}</p>
        <p><strong>Next Action Client:</strong> {order.nextActionClient}</p>
        <p><strong>Government Application Number:</strong> {order.govtAppNumber}</p>
        <p><strong>Date of Filing:</strong> {order.dateOfFilling}</p>
        <p><strong>Lawyer Reference Number:</strong> {order.lawyerRefrenceNumber}</p>
        <p><strong>INM Number:</strong> {order.inmNumber}</p>
        <p><strong>Order Complete Date:</strong> {order.orderCompleteDate}</p>
        <p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
        <h3>Documents Provided</h3>
        <ul>
          {order.documentProvidedLinks.map((doc, index) => (
            <li key={index}>
              <a href={doc.url} target="_blank" rel="noopener noreferrer">{doc.filename}</a>
            </li>
          ))}
        </ul>
        <h3>Invoices Uploaded</h3>
        <ul>
          {order.invoiceUploadedLinks.map((invoice, index) => (
            <li key={index}>
              <a href={invoice.url} target="_blank" rel="noopener noreferrer">{invoice.filename}</a>
            </li>
          ))}
        </ul>
        <h3>Files Uploaded</h3>
        <ul>
          {order.fileUploadedLinks.map((file, index) => (
            <li key={index}>
              <a href={file.url} target="_blank" rel="noopener noreferrer">{file.filename}</a>
            </li>
          ))}
        </ul>
        <button onClick={handleEdit} className="button">Edit Order</button>
      </div>
    </div>
  );
};

export default OrderDetail;
