import axios from "axios";
import React, { useState, ChangeEvent, FormEvent } from "react";
import UserMenu from "../../component/user/UserMenu";

type OrderUpdate = {
    orderId: string;
    nextActionClient: string;
    documentProvided: File[];
};

const UpdateOrder: React.FC = () => {
    const [formData, setFormData] = useState<OrderUpdate>({
        orderId: "",
        nextActionClient: "",
        documentProvided: []
    });

    const [updateStatus, setUpdateStatus] = useState<string | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files) {
            setFormData(prevState => ({
                ...prevState,
                documentProvided: Array.from(files)
            }));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('orderId', formData.orderId);
        formDataToSend.append('nextActionClient', formData.nextActionClient);
        formData.documentProvided.forEach(file => {
            formDataToSend.append('documentProvided', file);
        });

        try {
            const token = localStorage.getItem('userToken');
            await axios.post('http://localhost:3000/api/user/update-order', formDataToSend, {
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
            <UserMenu/>
            <div className="update-firm-container">
                <h2>Update Order</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Order ID:</label>
                        <input type="text" name="orderId" value={formData.orderId} onChange={handleChange} className="form-input" placeholder="Enter order ID" />
                    </div>
                    <div className="form-group">
                        <label>Next Action Client:</label>
                        <textarea name="nextActionClient" value={formData.nextActionClient} onChange={handleChange} className="form-input" placeholder="Enter next action for client" />
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
