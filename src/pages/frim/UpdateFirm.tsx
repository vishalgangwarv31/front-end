import axios from "axios";
import React, { useState, ChangeEvent, FormEvent } from "react";
import FirmMenu from "../../component/firm/FirmMenu";
import './update.css'

type Firm = {
    name: string;
    workType: string | null;
    startup: boolean | null;
    agreementFile: File | null;
    ndaFile: File | null;
}

const UpdateFirm: React.FC = () => {
    const [formData, setFormData] = useState<Firm>({
        name: "",
        workType: '',
        startup: false,
        agreementFile: null,
        ndaFile: null
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
        formDataToSend.append('name', formData.name);
        formDataToSend.append('workType', formData.workType || '');
        formDataToSend.append('startup', formData.startup ? 'true' : 'false');
        if (formData.agreementFile) {
            formDataToSend.append('agreementFile', formData.agreementFile);
        }
        if (formData.ndaFile) {
            formDataToSend.append('ndaFile', formData.ndaFile);
        }

        try {
            const token = localStorage.getItem('firmToken');
            await axios.post('http://localhost:3000/api/firm/update-firm', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `bearer ${token}`
                }
            });
            setUpdateStatus("Firm updated successfully!");
        } catch (error) {
            console.error("Error updating firm:", error);
            setUpdateStatus("Error updating firm. Please try again.");
        }
    };

    return (
        <div >
            <FirmMenu />
            <div className="update-firm-container">
            <h2>Update Firm</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-input" />
                </div>
                <div className="form-group">
                    <label>Work Type:</label>
                    <input type="text" name="workType" value={formData.workType || ''} onChange={handleChange} className="form-input" />
                </div>
                <div className="form-group checkbox-group">
                    <label>Startup:</label>
                    <input type="checkbox" name="startup" checked={formData.startup || false} onChange={handleChange} className="form-checkbox" />
                </div>
                <div className="form-group">
                    <label>Agreement File:</label>
                    <input type="file" name="agreementFile" onChange={handleFileChange} className="form-file" />
                </div>
                <div className="form-group">
                    <label>NDA File:</label>
                    <input type="file" name="ndaFile" onChange={handleFileChange} className="form-file" />
                </div>
                <button type="submit" className="form-button">Update Firm</button>
            </form>
            {updateStatus && <p className="update-status">{updateStatus}</p>}
            </div>
            
        </div>
    );
    
}

export default UpdateFirm;
