import axios from "axios";
import { useEffect, useState } from "react";

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
    lawyerRefrenceNumber?: number;
    inmNumber?: number;
    orderCompleteDate?: string;
    createdAt: string;
};

const GetOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem('adminToken');
            try {
                const response = await axios.get('http://localhost:3000/api/admin/get-order', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log(response.data);
                setOrders(response.data.data);
            } catch (error) {
                console.error("There was an error fetching the orders!", error);
            }
        };
        fetchOrders();
    }, []);

    return (
        <div>
            {orders.map(order => (
                <div key={order.id}>
                    <p>ID: {order.id}</p>
                    <p>User ID: {order.userId}</p>
                    <p>Firm ID: {order.firmId}</p>
                    <p>Date of Order: {order.dateOfOrder}</p>
                    <p>Type of Order: {order.typeOfOrder}</p>
                    <p>Payment Expected: {order.payementExpected}</p>
                    <p>Amount Charged: {order.amountCharged}</p>
                    <p>Amount Paid: {order.amountPaid}</p>
                    <p>Order Status: {order.orderStatus}</p>
                    <p>Comment Status Cycle: {order.commentStatusCycle.join(', ')}</p>
                    <p>Date of Expectation: {order.dateOdExpectation}</p>
                    <p>Document Provided: {order.documentProvided.join(', ')}</p>
                    <p>Invoice Uploaded: {order.invoiceUploaded.join(', ')}</p>
                    <p>File Uploaded: {order.fileUploaded.join(', ')}</p>
                    <p>Next Action Lawyer: {order.nextActionLawyer}</p>
                    <p>Next Action Client: {order.nextActionClient}</p>
                    <p>Govt App Number: {order.govtAppNumber}</p>
                    <p>Date of Filling: {order.dateOfFilling}</p>
                    <p>Lawyer Reference Number: {order.lawyerRefrenceNumber}</p>
                    <p>INM Number: {order.inmNumber}</p>
                    <p>Order Complete Date: {order.orderCompleteDate}</p>
                    <p>Created At: {order.createdAt}</p>
                </div>
            ))}
        </div>
    );
};

export default GetOrders;