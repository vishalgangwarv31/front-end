import axios from "axios";
import { useEffect, useState } from "react";
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

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem('userToken');
            try {
                const response = await axios.get('http://localhost:3000/api/user/orders', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setOrders(response.data.myOrders);
            } catch (error) {
                console.error("There was an error fetching the orders!", error);
            }
        };
        fetchOrders();
    }, []);

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
                            <p><strong>ID:</strong> {order.id}</p>
                            <p><strong>Date of Order:</strong> {order.dateOfOrder}</p>
                            <p><strong>Type of Order:</strong> {order.typeOfOrder}</p>
                            <p><strong>Payment Expected:</strong> {order.payementExpected}</p>
                            <p><strong>Amount Charged:</strong> {order.amountCharged}</p>
                            <p><strong>Amount Paid:</strong> {order.amountPaid}</p>
                            <p><strong>Order Status:</strong> {order.orderStatus}</p>
                            <p><strong>Comment Status Cycle:</strong> {order.commentStatusCycle.join(', ')}</p>
                            <p><strong>Date of Expectation:</strong> {order.dateOdExpectation}</p>
                            <p><strong>Document Provided:</strong> {order.documentProvided.join(', ')}</p>
                            <p><strong>Invoice Uploaded:</strong> {order.invoiceUploaded.join(', ')}</p>
                            <p><strong>File Uploaded:</strong> {order.fileUploaded.join(', ')}</p>
                            <p><strong>Next Action Lawyer:</strong> {order.nextActionLawyer}</p>
                            <p><strong>Next Action Client:</strong> {order.nextActionClient}</p>
                            <p><strong>Govt App Number:</strong> {order.govtAppNumber}</p>
                            <p><strong>Date of Filling:</strong> {order.dateOfFilling}</p>
                            <p><strong>INM Number:</strong> {order.inmNumber}</p>
                            <p><strong>Order Complete Date:</strong> {order.orderCompleteDate}</p>
                            <p><strong>Created At:</strong> {order.createdAt}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserOrder;
