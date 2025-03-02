import React, { useState } from 'react';
import axios from 'axios';
import FirmMenu from '../../component/firm/FirmMenu';

type FormData = {
    orderId: string;
    orderStatus: string;
    newCommentStatus: string;
    lawyerReferenceNumber: string;
    nextActionLawyer: string;
    govtAppNumber: string;
    dateOfFilling: string;
    lawyerRefrenceNumber: string;
    inmNumber: string;
};

type Files = {
    invoiceUploaded: File[];
    fileUploaded: File[];
};

const UpdateOrder: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        orderId: '',
        orderStatus: '',
        newCommentStatus: '',
        lawyerReferenceNumber: '',
        nextActionLawyer: '',
        govtAppNumber: '',
        dateOfFilling: '',
        lawyerRefrenceNumber: '',
        inmNumber: ''
    });

    const [files, setFiles] = useState<Files>({
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
        
        data.append('orderId', formData.orderId);
        data.append('orderStatus', formData.orderStatus);
        data.append('newCommentStatus', formData.newCommentStatus);
        data.append('lawyerReferenceNumber', formData.lawyerReferenceNumber);
        data.append('nextActionLawyer', formData.nextActionLawyer);
        data.append('govtAppNumber', formData.govtAppNumber);
        data.append('dateOfFilling', formData.dateOfFilling);
        data.append('lawyerRefrenceNumber', formData.lawyerRefrenceNumber);
        data.append('inmNumber', formData.inmNumber);

        files.invoiceUploaded.forEach(file => {
            data.append('invoiceUploaded', file);
        });
        files.fileUploaded.forEach(file => {
            data.append('fileUploaded', file);
        });

        console.log(data)
        try {
            const token = localStorage.getItem('firmToken');
            const response = await axios.post('http://localhost:3000/api/firm/update-order', data, {
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
    <FirmMenu />
    <div className="update-firm-container">
        <h2>Update Order</h2>
        <form onSubmit={handleSubmit}> 
            <div className="form-group">
                <label>Order ID:</label>
                <input 
                    type="text" 
                    name="orderId" 
                    value={formData.orderId} 
                    onChange={handleChange} 
                    placeholder="Order ID" 
                    required 
                    className="form-input"
                />
            </div>

            {/* Order Status */}
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

            {/* New Comment Status */}
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

            {/* Lawyer Reference Number */}
            <div className="form-group">
                <label>Lawyer Reference Number:</label>
                <input 
                    type="text" 
                    name="lawyerReferenceNumber" 
                    value={formData.lawyerReferenceNumber} 
                    onChange={handleChange} 
                    placeholder="Lawyer Reference Number" 
                    className="form-input"
                />
            </div>

            {/* Next Action Lawyer */}
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

            {/* Govt App Number */}
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

            {/* Date of Filling */}
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

            {/* INM Number */}
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

            {/* File Uploads */}
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

            {/* Submit Button */}
            <button type="submit" className="form-button">Update Order</button>
        </form>
    </div>
</div>

        
    );
};

export default UpdateOrder;
