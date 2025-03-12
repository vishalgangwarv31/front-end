import axios from "axios";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useLocation } from "react-router-dom";
import UserMenu from "../../component/user/UserMenu";

type OrderUpdate = {
    orderId: string;
    dateOfOrder?: string;
    typeOfOrder?: string;
    payementExpected?: string;
    amountCharged?: number;
    amountPaid?: number;
    orderStatus: string;
    commentStatusCycle: string[];
    dateOdExpectation?: string;
    documentProvided: File[];
    invoiceUploaded: File[];
    fileUploaded: File[];
    nextActionLawyer?: string;
    nextActionClient: string;
    govtAppNumber?: number;
    dateOfFilling?: string;
    inmNumber?: string;
    orderCompleteDate?: string;
};

const UpdateOrder: React.FC = () => {
    const location = useLocation();
    const { order } = location.state || {};
    const [formData, setFormData] = useState<OrderUpdate>({
        orderId: order?.id || "",
        dateOfOrder: order?.dateOfOrder || "",
        typeOfOrder: order?.typeOfOrder || "",
        payementExpected: order?.payementExpected || "",
        amountCharged: order?.amountCharged || 0,
        amountPaid: order?.amountPaid || 0,
        orderStatus: order?.orderStatus || "",
        commentStatusCycle: order?.commentStatusCycle || [],
        dateOdExpectation: order?.dateOdExpectation || "",
        documentProvided: [],
        invoiceUploaded: [],
        fileUploaded: [],
        nextActionLawyer: order?.nextActionLawyer || "",
        nextActionClient: order?.nextActionClient || "",
        govtAppNumber: order?.govtAppNumber || 0,
        dateOfFilling: order?.dateOfFilling || "",
        inmNumber: order?.inmNumber || "",
        orderCompleteDate: order?.orderCompleteDate || ""
    });

    const [updateStatus, setUpdateStatus] = useState<string | null>(null);

    useEffect(() => {
        if (order) {
            setFormData({
                orderId: order.id,
                dateOfOrder: order.dateOfOrder || "",
                typeOfOrder: order.typeOfOrder || "",
                payementExpected: order.payementExpected || "",
                amountCharged: order.amountCharged || 0,
                amountPaid: order.amountPaid || 0,
                orderStatus: order.orderStatus || "",
                commentStatusCycle: order.commentStatusCycle || [],
                dateOdExpectation: order.dateOdExpectation || "",
                documentProvided: [],
                invoiceUploaded: [],
                fileUploaded: [],
                nextActionLawyer: order.nextActionLawyer || "",
                nextActionClient: order.nextActionClient || "",
                govtAppNumber: order.govtAppNumber || 0,
                dateOfFilling: order.dateOfFilling || "",
                inmNumber: order.inmNumber || "",
                orderCompleteDate: order.orderCompleteDate || ""
            });
        }
    }, [order]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: name === 'commentStatusCycle' ? value.split(',').map(item => item.trim()) : value
        }));
    };
    

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files) {
            setFormData(prevState => ({
                ...prevState,
                [name]: Array.from(files)
            }));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        if (formData.amountCharged === undefined) {
            formData.amountCharged = 0;
        }
        if (formData.amountPaid === undefined) {
            formData.amountPaid = 0;
        }
        if (formData.govtAppNumber === undefined) {
            formData.govtAppNumber = 0;
        }
        formDataToSend.append('orderId', formData.orderId);
        formDataToSend.append('dateOfOrder', formData.dateOfOrder || "");
        formDataToSend.append('typeOfOrder', formData.typeOfOrder || "");
        formDataToSend.append('payementExpected', formData.payementExpected || "");
        formDataToSend.append('amountCharged', formData.amountCharged.toString());
        formDataToSend.append('amountPaid', formData.amountPaid.toString());
        formDataToSend.append('orderStatus', formData.orderStatus);
        formDataToSend.append('commentStatusCycle', [...order.commentStatusCycle, ...formData.commentStatusCycle].join(', '));
        formDataToSend.append('dateOdExpectation', formData.dateOdExpectation || "");
        formData.documentProvided.forEach(file => {
            formDataToSend.append('documentProvided', file);
        });
        formData.invoiceUploaded.forEach(file => {
            formDataToSend.append('invoiceUploaded', file);
        });
        formData.fileUploaded.forEach(file => {
            formDataToSend.append('fileUploaded', file);
        });
        formDataToSend.append('nextActionLawyer', formData.nextActionLawyer || "");
        formDataToSend.append('nextActionClient', formData.nextActionClient);
        formDataToSend.append('govtAppNumber', formData.govtAppNumber.toString());
        formDataToSend.append('dateOfFilling', formData.dateOfFilling || "");
        formDataToSend.append('inmNumber', formData.inmNumber || "");
        formDataToSend.append('orderCompleteDate', formData.orderCompleteDate || "");
    
        try {
            const token = localStorage.getItem('userToken');
            await axios.put(`http://localhost:3000/api/user/update-order/${formData.orderId}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            setUpdateStatus("Order updated successfully!");
        } catch (error) {
            console.error("Error updating order:", error);
            setUpdateStatus("Error updating order. Please try again.");
        }
    };
    
    

    return (
        <div>
            <UserMenu />
            <div className="update-firm-container">
                <h2>Update Order</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Date of Order:</label>
                        <input type="date" name="dateOfOrder" value={formData.dateOfOrder} onChange={handleChange} className="form-input" />
                    </div>
                    <div className="form-group">
                        <label>Type of Order:</label>
                        <input type="text" name="typeOfOrder" value={formData.typeOfOrder} onChange={handleChange} className="form-input" placeholder="Enter type of order" />
                    </div>
                    <div className="form-group">
                        <label>Payment Expected:</label>
                        <input type="text" name="payementExpected" value={formData.payementExpected} onChange={handleChange} className="form-input" placeholder="Enter payment expected" />
                    </div>
                    <div className="form-group">
                        <label>Amount Paid:</label>
                        <input type="number" name="amountPaid" value={formData.amountPaid} onChange={handleChange} className="form-input" placeholder="Enter amount paid" />
                    </div>
                    <div className="form-group">
                        <label>Order Status:</label>
                        <input type="text" name="orderStatus" value={formData.orderStatus} onChange={handleChange} className="form-input" placeholder="Enter order status" />
                    </div>
                    <div className="form-group">
                        <label>Comment Status Cycle:</label>
                        <textarea name="commentStatusCycle" value={formData.commentStatusCycle.join(', ')} onChange={handleChange} className="form-input" placeholder="Enter comment status cycle" />
                    </div>
                    <div className="form-group">
                        <label>Date of Expectation:</label>
                        <input type="date" name="dateOdExpectation" value={formData.dateOdExpectation} onChange={handleChange} className="form-input" />
                    </div>
                    
                    <div className="form-group">
                        <label>Next Action Client:</label>
                        <textarea name="nextActionClient" value={formData.nextActionClient} onChange={handleChange} className="form-input" placeholder="Enter next action for client" />
                    </div>
                    <div className="form-group">
                        <label>Govt App Number:</label>
                        <input type="number" name="govtAppNumber" value={formData.govtAppNumber} onChange={handleChange} className="form-input" placeholder="Enter govt app number" />
                    </div>
                    <div className="form-group">
                        <label>Date of Filling:</label>
                        <input type="date" name="dateOfFilling" value={formData.dateOfFilling} onChange={handleChange} className="form-input" />
                    </div>
                    <div className="form-group">
                        <label>INM Number:</label>
                        <input type="text" name="inmNumber" value={formData.inmNumber} onChange={handleChange} className="form-input" placeholder="Enter INM number" />
                    </div>
                    <div className="form-group">
                        <label>Document Provided:</label>
                        <input type="file" name="documentProvided" onChange={handleFileChange} className="form-file" multiple />
                    </div>
                    <button type="submit" className="form-button">Update Order</button>
                </form>
                {updateStatus && <p className="update-status">{updateStatus}</p>}
            </div>
        </div>
    );
    };

export default UpdateOrder;


