import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserMenu from "../../component/user/UserMenu";

type Order = {
    id: number;
    userId: number;
    firmId: number;
    dateOfOrder?: string;
    typeOfOrder?: string;
    payementExpected?: string;
    amountCharged?: number;
    amountPaid?: number;
    orderStatus: string;
    commentStatusCycle: string[];
    dateOdExpectation?: string;
    documentProvided: string[];
    invoiceUploaded: string[];
    fileUploaded: string[];
    nextActionLawyer?: string;
    nextActionClient?: string;
    govtAppNumber?: number;
    dateOfFilling?: string;
    inmNumber?: string;
    orderCompleteDate?: string;
    createdAt: string;
};

const UserOrder = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [cursor, setCursor] = useState<number | null>(null);
    const [hasNextPage, setHasNextPage] = useState<boolean>(false);
    const [previousCursors, setPreviousCursors] = useState<number[]>([]);
    const navigate = useNavigate();

    const fetchOrders = async (cursor: number | null) => {
        const token = localStorage.getItem('userToken');
        try {
            const response = await axios.get('http://localhost:3000/api/user/orders', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: { cursor, limit: 2 }
            });
            setOrders(response.data.orders);
            setCursor(response.data.nextCursor);
            setHasNextPage(response.data.hasNextPage);

            if (cursor !== null) {
                setPreviousCursors(prev => [...prev, cursor]);
            } else {
                setPreviousCursors([]);
            }
        } catch (error) {
            console.error("There was an error fetching the orders!", error);
        }
    };

    useEffect(() => {
        fetchOrders(null);
    }, []);

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

    const handleUpdateOrder = (order: Order) => {
        navigate(`/api/user/update-order/${order.id}`, { state: { order } });
    };

    if (!orders.length) {
        return (
            <div>
                <UserMenu />
                <div className="loading">Loading</div>
            </div>
        );
    }

    return (
        <div>
            <UserMenu />
            <div className="get-user-container">
                <h2>Orders</h2>
                <div className="order-list">
                    {orders.map(order => (
                        <div key={order.id} className="order-item">
                            <p><strong>Date of Order:</strong> {order.dateOfOrder}</p>
                            <p><strong>Type of Order:</strong> {order.typeOfOrder}</p>
                            <p><strong>Payment Expected:</strong> {order.payementExpected}</p>
                            <p><strong>Amount Charged:</strong> {order.amountCharged}</p>
                            <p><strong>Amount Paid:</strong> {order.amountPaid}</p>
                            <p><strong>Order Status:</strong> {order.orderStatus}</p>
                            <p><strong>Comment Status Cycle:</strong> {order.commentStatusCycle.join(', ')}</p>
                            <p><strong>Date of Expectation:</strong> {order.dateOdExpectation}</p>
                            <p><strong>Document Provided:</strong></p>
                            <ul>
                                {order.documentProvided.map((file, index) => (
                                    <li key={index}><a href={file} download>Download Document {index + 1}</a></li>
                                ))}
                            </ul>
                            <p><strong>Invoice Uploaded:</strong></p>
                            <ul>
                                {order.invoiceUploaded.map((file, index) => (
                                    <li key={index}><a href={file} download>Download Invoice {index + 1}</a></li>
                                ))}
                            </ul>
                            <p><strong>File Uploaded:</strong></p>
                            <ul>
                                {order.fileUploaded.map((file, index) => (
                                    <li key={index}><a href={file} download>Download File {index + 1}</a></li>
                                ))}
                            </ul>
                            <p><strong>Next Action Lawyer:</strong> {order.nextActionLawyer}</p>
                            <p><strong>Next Action Client:</strong> {order.nextActionClient}</p>
                            <p><strong>Govt App Number:</strong> {order.govtAppNumber}</p>
                            <p><strong>Date of Filling:</strong> {order.dateOfFilling}</p>
                            <p><strong>INM Number:</strong> {order.inmNumber}</p>
                            <p><strong>Order Complete Date:</strong> {order.orderCompleteDate}</p>
                            <p><strong>Created At:</strong> {order.createdAt}</p>
                            <button onClick={() => handleUpdateOrder(order)}>Update Order</button>
                        </div>
                    ))}
                </div>
                <div className="pagination-controls">
                    <button onClick={handlePrevPage} disabled={previousCursors.length === 0}>Previous</button>
                    <button onClick={handleNextPage} disabled={!hasNextPage}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default UserOrder;
