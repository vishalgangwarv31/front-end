import React, { useState } from 'react';
import axios from 'axios';
import AdminMenu from '../../component/admin/AdminMenu';

type FormData = {
    id: string;
    dateOfOrder: string;
    typeOfOrder: string;
    payementExpected: string;
    amountCharged: string;
    amountPaid: string;
    orderStatus: string;
    newCommentStatus: string;
    dateOdExpectation: string;
    nextActionLawyer: string;
    nextActionClient: string;
    govtAppNumber: string;
    dateOfFilling: string;
    lawyerRefrenceNumber: string;
    inmNumber: string;
    orderCompleteDate: string;
};

type Files = {
    documentProvided: File[];
    invoiceUploaded: File[];
    fileUploaded: File[];
};


const UpdateOrder = () => {
    const [formData, setFormData] = useState<FormData>({
        id: '',
        dateOfOrder: '',
        typeOfOrder: '',
        payementExpected: '',
        amountCharged: '',
        amountPaid: '',
        orderStatus: '',
        newCommentStatus: '',
        dateOdExpectation: '',
        nextActionLawyer: '',
        nextActionClient: '',
        govtAppNumber: '',
        dateOfFilling: '',
        lawyerRefrenceNumber: '',
        inmNumber: '',
        orderCompleteDate: ''
    });

    const [files, setFiles] = useState<Files>({
        documentProvided: [],
        invoiceUploaded: [],
        fileUploaded: []
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFiles({
            ...files,
            [e.target.name]: Array.from(e.target.files || [])
        });
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData();
        
        data.append('id', formData.id);
        data.append('dateOfOrder', formData.dateOfOrder);
        data.append('typeOfOrder', formData.typeOfOrder);
        data.append('payementExpected', formData.payementExpected);
        data.append('amountCharged', formData.amountCharged);
        data.append('amountPaid', formData.amountPaid);
        data.append('orderStatus', formData.orderStatus);
        data.append('newCommentStatus', formData.newCommentStatus);
        data.append('dateOdExpectation', formData.dateOdExpectation);
        data.append('nextActionLawyer', formData.nextActionLawyer);
        data.append('nextActionClient', formData.nextActionClient);
        data.append('govtAppNumber', formData.govtAppNumber);
        data.append('dateOfFilling', formData.dateOfFilling);
        data.append('lawyerRefrenceNumber', formData.lawyerRefrenceNumber);
        data.append('inmNumber', formData.inmNumber);
        data.append('orderCompleteDate', formData.orderCompleteDate);

        files.documentProvided.forEach(file => {
            data.append('documentProvided', file);
        });
        files.invoiceUploaded.forEach(file => {
            data.append('invoiceUploaded', file);
        });
        files.fileUploaded.forEach(file => {
            data.append('fileUploaded', file);
        });


        try {
            const token = localStorage.getItem('adminToken');
            const response = await axios.post('http://localhost:3000/api/admin/update-order', data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error("There was an error updating the order!", error);
        }
    };

    return (
        <div>
            <AdminMenu/>
            
            <div className="update-firm-container">
            <h2>Update Order</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Order ID:</label>
                        <input 
                            type="text" 
                            name="id" 
                            value={formData.id} 
                            onChange={handleChange} 
                            placeholder="Order ID" 
                            required 
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>Date of Order:</label>
                        <input 
                            type="text" 
                            name="dateOfOrder" 
                            value={formData.dateOfOrder} 
                            onChange={handleChange} 
                            placeholder="Date of Order" 
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>Type of Order:</label>
                        <input 
                            type="text" 
                            name="typeOfOrder" 
                            value={formData.typeOfOrder} 
                            onChange={handleChange} 
                            placeholder="Type of Order" 
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>Payment Expected:</label>
                        <input 
                            type="text" 
                            name="payementExpected" 
                            value={formData.payementExpected} 
                            onChange={handleChange} 
                            placeholder="Payment Expected" 
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>Amount Charged:</label>
                        <input 
                            type="text" 
                            name="amountCharged" 
                            value={formData.amountCharged} 
                            onChange={handleChange} 
                            placeholder="Amount Charged" 
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>Amount Paid:</label>
                        <input 
                            type="text" 
                            name="amountPaid" 
                            value={formData.amountPaid} 
                            onChange={handleChange} 
                            placeholder="Amount Paid" 
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>Order Status:</label>
                        <input 
                            type="text" 
                            name="orderStatus" 
                            value={formData.orderStatus} 
                            onChange={handleChange} 
                            placeholder="Order Status" 
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>New Comment Status:</label>
                        <input 
                            type="text" 
                            name="newCommentStatus" 
                            value={formData.newCommentStatus} 
                            onChange={handleChange} 
                            placeholder="New Comment Status" 
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>Date of Expectation:</label>
                        <input 
                            type="text" 
                            name="dateOdExpectation" 
                            value={formData.dateOdExpectation} 
                            onChange={handleChange} 
                            placeholder="Date of Expectation" 
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>Next Action Lawyer:</label>
                        <input 
                            type="text" 
                            name="nextActionLawyer" 
                            value={formData.nextActionLawyer} 
                            onChange={handleChange} 
                            placeholder="Next Action Lawyer" 
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>Next Action Client:</label>
                        <input 
                            type="text" 
                            name="nextActionClient" 
                            value={formData.nextActionClient} 
                            onChange={handleChange} 
                            placeholder="Next Action Client" 
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>Govt App Number:</label>
                        <input 
                            type="text" 
                            name="govtAppNumber" 
                            value={formData.govtAppNumber} 
                            onChange={handleChange} 
                            placeholder="Govt App Number" 
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>Date of Filling:</label>
                        <input 
                            type="text" 
                            name="dateOfFilling" 
                            value={formData.dateOfFilling} 
                            onChange={handleChange} 
                            placeholder="Date of Filling" 
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>Lawyer Reference Number:</label>
                        <input 
                            type="text" 
                            name="lawyerRefrenceNumber" 
                            value={formData.lawyerRefrenceNumber} 
                            onChange={handleChange} 
                            placeholder="Lawyer Reference Number" 
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>INM Number:</label>
                        <input 
                            type="text" 
                            name="inmNumber" 
                            value={formData.inmNumber} 
                            onChange={handleChange} 
                            placeholder="INM Number" 
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>Order Complete Date:</label>
                        <input 
                            type="text" 
                            name="orderCompleteDate" 
                            value={formData.orderCompleteDate} 
                            onChange={handleChange} 
                            placeholder="Order Complete Date" 
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>Document Provided:</label>
                        <input 
                            type="file" 
                            name="documentProvided" 
                            multiple 
                            onChange={handleFileChange} 
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>Invoice Uploaded:</label>
                        <input 
                            type="file" 
                            name="invoiceUploaded" 
                            multiple 
                            onChange={handleFileChange} 
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>File Uploaded:</label>
                        <input 
                            type="file" 
                            name="fileUploaded" 
                            multiple 
                            onChange={handleFileChange} 
                            className="form-input"
                        />
                    </div>
                    <button type="submit" className='button'>Update Order</button>
                </form>
            </div>
        </div>
    );    
};

export default UpdateOrder;