import axios from "axios";
import React, { useState, ChangeEvent, FormEvent } from "react";
import UserMenu from "../../component/user/UserMenu";

type User = {
    id: string;
    name: string;
    gstNumber: string | null;
    type: string | null;
    pocPhone: string | null;
    pocName: string | null;
    dpiit: boolean | null;
    dpiitDate: string | null;
    panCard: File | null;
    tdsFile: File | null;
    gstFile: File | null;
    ndaFile: File | null;
    dpiitFile: File | null;
    agreementFile: File | null;
    qunatifoFile: File | null;
    udhyanFile: File | null;
}

const UpdateUser: React.FC = () => {
    const [formData, setFormData] = useState<User>({
        id: "",
        name: "",
        gstNumber: "",
        type: "",
        pocPhone: "",
        pocName: "",
        dpiit: false,
        dpiitDate: "",
        panCard: null,
        tdsFile: null,
        gstFile: null,
        ndaFile: null,
        dpiitFile: null,
        agreementFile: null,
        qunatifoFile: null,
        udhyanFile: null
    });

    const [updateStatus, setUpdateStatus] = useState<string | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setFormData(prevState => ({
                ...prevState,
                [name]: checked
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files) {
            setFormData(prevState => ({
                ...prevState,
                [name]: files[0]
            }));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('id', formData.id);
        formDataToSend.append('name', formData.name);
        formDataToSend.append('gstNumber', formData.gstNumber || '');
        formDataToSend.append('type', formData.type || '');
        formDataToSend.append('pocPhone', formData.pocPhone || '');
        formDataToSend.append('pocName', formData.pocName || '');
        formDataToSend.append('dpiit', formData.dpiit ? 'true' : 'false');
        formDataToSend.append('dpiitDate', formData.dpiitDate ? new Date(formData.dpiitDate).toISOString() : '');

        if (formData.panCard) {
            formDataToSend.append('panCard', formData.panCard);
        }
        if (formData.tdsFile) {
            formDataToSend.append('tdsFile', formData.tdsFile);
        }
        if (formData.gstFile) {
            formDataToSend.append('gstFile', formData.gstFile);
        }
        if (formData.ndaFile) {
            formDataToSend.append('ndaFile', formData.ndaFile);
        }
        if (formData.dpiitFile) {
            formDataToSend.append('dpiitFile', formData.dpiitFile);
        }
        if (formData.agreementFile) {
            formDataToSend.append('agreementFile', formData.agreementFile);
        }
        if (formData.qunatifoFile) {
            formDataToSend.append('qunatifoFile', formData.qunatifoFile);
        }
        if (formData.udhyanFile) {
            formDataToSend.append('udhyanFile', formData.udhyanFile);
        }

        try {
            const token = localStorage.getItem('userToken');
            await axios.post('http://localhost:3000/api/user/update-user', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            setUpdateStatus("User updated successfully!");
        } catch (error) {
            console.error("Error updating user:", error);
            setUpdateStatus("Error updating user. Please try again.");
        }
    };

    return (
        <div>
            <UserMenu />
            <div className="update-firm-container">
                <h2>Update User</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-input" placeholder="Enter name" />
                    </div>
                    <div className="form-group">
                        <label>GST Number:</label>
                        <input type="text" name="gstNumber" value={formData.gstNumber || ''} onChange={handleChange} className="form-input" placeholder="Enter GST number" />
                    </div>
                    <div className="form-group">
                        <label>Type:</label>
                        <input type="text" name="type" value={formData.type || ''} onChange={handleChange} className="form-input" placeholder="Enter type" />
                    </div>
                    <div className="form-group">
                        <label>POC Phone:</label>
                        <input type="text" name="pocPhone" value={formData.pocPhone || ''} onChange={handleChange} className="form-input" placeholder="Enter POC phone" />
                    </div>
                    <div className="form-group">
                        <label>POC Name:</label>
                        <input type="text" name="pocName" value={formData.pocName || ''} onChange={handleChange} className="form-input" placeholder="Enter POC name" />
                    </div>
                    <div className="form-group checkbox-group">
                        <label>DPIIT:</label>
                        <input type="checkbox" name="dpiit" checked={formData.dpiit || false} onChange={handleChange} className="form-checkbox" />
                    </div>
                    <div className="form-group">
                        <label>DPIIT Date:</label>
                        <input type="text" name="dpiitDate" value={formData.dpiitDate || ''} onChange={handleChange} className="form-input" placeholder="Enter DPIIT date" />
                    </div>
                    <div className="form-group">
                        <label>PAN Card:</label>
                        <input type="file" name="panCard" onChange={handleFileChange} className="form-file" />
                    </div>
                    <div className="form-group">
                        <label>TDS File:</label>
                        <input type="file" name="tdsFile" onChange={handleFileChange} className="form-file" />
                    </div>
                    <div className="form-group">
                        <label>GST File:</label>
                        <input type="file" name="gstFile" onChange={handleFileChange} className="form-file" />
                    </div>
                    <div className="form-group">
                        <label>NDA File:</label>
                        <input type="file" name="ndaFile" onChange={handleFileChange} className="form-file" />
                    </div>
                    <div className="form-group">
                        <label>DPIIT File:</label>
                        <input type="file" name="dpiitFile" onChange={handleFileChange} className="form-file" />
                    </div>
                    <div className="form-group">
                        <label>Agreement File:</label>
                        <input type="file" name="agreementFile" onChange={handleFileChange} className="form-file" />
                    </div>
                    <div className="form-group">
                        <label>Qunatifo File:</label>
                        <input type="file" name="qunatifoFile" onChange={handleFileChange} className="form-file" />
                    </div>
                    <div className="form-group">
                        <label>Udhyan File:</label>
                        <input type="file" name="udhyanFile" onChange={handleFileChange} className="form-file" />
                    </div>
                    <button type="submit" className="form-button">Update User</button>
                </form>
                {updateStatus && <p className="update-status">{updateStatus}</p>}
            </div>
        </div>
    );
}

export default UpdateUser;
