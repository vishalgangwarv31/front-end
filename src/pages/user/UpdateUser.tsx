import axios from "axios";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useLocation } from "react-router-dom";
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

type VisibilitySetting = {
    fieldName: string;
    isVisible: boolean;
}

const UpdateUser: React.FC = () => {
    const location = useLocation();
    const { user } = location.state || {};
    const [formData, setFormData] = useState<User>({
        id: user?.id || "",
        name: user?.name || "",
        gstNumber: user?.gstNumber || "",
        type: user?.type || "",
        pocPhone: user?.pocPhone || "",
        pocName: user?.pocName || "",
        dpiit: user?.dpiit || false,
        dpiitDate: user?.dpiitDate || "",
        panCard: null,
        tdsFile: null,
        gstFile: null,
        ndaFile: null,
        dpiitFile: null,
        agreementFile: null,
        qunatifoFile: null,
        udhyanFile: null
    });

    const [visibilitySettings, setVisibilitySettings] = useState<VisibilitySetting[]>([]);
    const [updateStatus, setUpdateStatus] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchVisibilitySettings = async () => {
            try {
                const token = localStorage.getItem('userToken');
                const response = await axios.get(`http://localhost:3000/api/admin/user-visibility`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setVisibilitySettings(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching visibility settings:", error);
                setIsLoading(false);
            }
        };

        fetchVisibilitySettings();
    }, []);

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
            await axios.put(`http://localhost:3000/api/user/update-user/${formData.id}`, formDataToSend, {
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

    const isFieldVisible = (fieldName: string) => {
        const setting = visibilitySettings.find(setting => setting.fieldName === fieldName);
        return setting ? setting.isVisible : true;
    };

    if (isLoading) {
        return (
            <div>
                <UserMenu />
                <div className="loading">Loading...</div>
            </div>
        );
    }



    return (
        <div>
            <UserMenu />
            <div className="update-firm-container">
                <h2>Update User</h2>
                <form onSubmit={handleSubmit}>
                    {isFieldVisible('name') && (
                        <div className="form-group">
                            <label>Name:</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-input" placeholder="Enter name" />
                        </div>
                    )}
                    {isFieldVisible('gstNumber') && (
                        <div className="form-group">
                            <label>GST Number:</label>
                            <input type="text" name="gstNumber" value={formData.gstNumber || ''} onChange={handleChange} className="form-input" placeholder="Enter GST number" />
                        </div>
                    )}
                    {isFieldVisible('type') && (
                        <div className="form-group">
                            <label>Type:</label>
                            <input type="text" name="type" value={formData.type || ''} onChange={handleChange} className="form-input" placeholder="Enter type" />
                        </div>
                    )}
                    {isFieldVisible('pocPhone') && (
                        <div className="form-group">
                            <label>POC Phone:</label>
                            <input type="text" name="pocPhone" value={formData.pocPhone || ''} onChange={handleChange} className="form-input" placeholder="Enter POC phone" />
                        </div>
                    )}
                    {isFieldVisible('pocName') && (
                        <div className="form-group">
                            <label>POC Name:</label>
                            <input type="text" name="pocName" value={formData.pocName || ''} onChange={handleChange} className="form-input" placeholder="Enter POC name" />
                        </div>
                    )}
                    {isFieldVisible('dpiit') && (
                        <div className="form-group">
                            <label>DPIIT:</label>
                            <input type="checkbox" name="dpiit" checked={formData.dpiit || false} onChange={handleChange} className="form-checkbox" />
                        </div>
                    )}
                    {isFieldVisible('dpiitDate') && (
                        <div className="form-group">
                            <label>DPIIT Date:</label>
                            <input type="date" name="dpiitDate" value={formData.dpiitDate || ''} onChange={handleChange} className="form-input" />
                        </div>
                    )}
                    {isFieldVisible('panCard') && (
                        <div className="form-group">
                            <label>PAN Card:</label>
                            <input type="file" name="panCard" onChange={handleFileChange} className="form-file" />
                        </div>
                    )}
                    {isFieldVisible('tdsFile') && (
                        <div className="form-group">
                            <label>TDS File:</label>
                            <input type="file" name="tdsFile" onChange={handleFileChange} className="form-file" />
                        </div>
                    )}
                    {isFieldVisible('gstFile') && (
                        <div className="form-group">
                            <label>GST File:</label>
                            <input type="file" name="gstFile" onChange={handleFileChange} className="form-file" />
                        </div>
                    )}
                    {isFieldVisible('ndaFile') && (
                        <div className="form-group">
                            <label>NDA File:</label>
                            <input type="file" name="ndaFile" onChange={handleFileChange} className="form-file" />
                        </div>
                    )}
                    {isFieldVisible('dpiitFile') && (
                        <div className="form-group">
                            <label>DPIIT File:</label>
                            <input type="file" name="dpiitFile" onChange={handleFileChange} className="form-file" />
                        </div>
                    )}
                    {isFieldVisible('agreementFile') && (
                        <div className="form-group">
                            <label>Agreement File:</label>
                            <input type="file" name="agreementFile" onChange={handleFileChange} className="form-file" />
                        </div>
                    )}
                    {isFieldVisible('qunatifoFile') && (
                        <div className="form-group">
                            <label>Qunatifo File:</label>
                            <input type="file" name="qunatifoFile" onChange={handleFileChange} className="form-file" />
                        </div>
                    )}
                    {isFieldVisible('udhyanFile') && (
                        <div className="form-group">
                            <label>Udhyan File:</label>
                            <input type="file" name="udhyanFile" onChange={handleFileChange} className="form-file" />
                        </div>
                    )}
                    <button type="submit" className="form-button">Update User</button>
                </form>
                {updateStatus && <p className="update-status">{updateStatus}</p>}
            </div>
        </div>
    );    
}

export default UpdateUser;
