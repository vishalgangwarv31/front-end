import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./adminGet.css"; // Import the CSS file
import AdminMenu from "../../component/admin/AdminMenu";

type Contractor = {
    id: number;
    name: string;
    email: string;
    workType: string;
    startUp: boolean;
    agreementFile: string | null;
    ndaFile: string | null;
    other: string | null;
    isDeleted: boolean;
};

const UpdateContractor = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [contractor, setContractor] = useState<Contractor | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        workType: "",
        startUp: false,
        agreementFile: null,
        ndaFile: null,
        other: null,
        isDeleted: false 
    });

    useEffect(() => {
        const fetchContractor = async () => {
            try {
                const token = localStorage.getItem('adminToken');
                const response = await axios.get(`http://localhost:3000/api/admin/get-contractor/${id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                setContractor(response.data.contractor);
                setFormData({
                    name: response.data.contractor.name,
                    email: response.data.contractor.email,
                    workType: response.data.contractor.workType,
                    startUp: response.data.contractor.startUp,
                    agreementFile: null,
                    ndaFile: null,
                    other: null,
                    isDeleted: response.data.contractor.isDeleted 
                });
            } catch (err) {
                setError("Failed to load data.");
            } finally {
                setLoading(false);
            }
        };

        fetchContractor();
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        setFormData(prev => ({
            ...prev,
            [name]: val
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files) {
            setFormData(prev => ({
                ...prev,
                [name]: files[0]
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formDataToSubmit = new FormData();
        formDataToSubmit.append("name", formData.name);
        formDataToSubmit.append("email", formData.email);
        formDataToSubmit.append("workType", formData.workType);
        formDataToSubmit.append("startUp", formData.startUp ? formData.startUp.toString() : "false");
        formDataToSubmit.append("isDeleted", formData.isDeleted ? 'true' : 'false'); 
        if (formData.agreementFile) formDataToSubmit.append("agreementFile", formData.agreementFile);
        if (formData.ndaFile) formDataToSubmit.append("ndaFile", formData.ndaFile);
        if (formData.other) formDataToSubmit.append("other", formData.other);

        try {
            const token = localStorage.getItem('adminToken');
            await axios.put(`http://localhost:3000/api/admin/update-contractor/${id}`, formDataToSubmit, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate('/api/admin/get-contractor');
        } catch (err) {
            setError("Failed to update contractor.");
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div>
            <AdminMenu />
            <div className="update-contractor-container">
                <h2>Update Contractor</h2>
                {contractor && (
                    <form onSubmit={handleSubmit} className="update-contractor-form">
                        <label>
                            Name:
                            <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                        </label>
                        <label>
                            Email:
                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                        </label>
                        <label>
                            Work Type:
                            <input type="text" name="workType" value={formData.workType} onChange={handleInputChange} />
                        </label>
                        <label>
                            Startup Benefit:
                            <input type="checkbox" name="startUp" checked={formData.startUp} onChange={handleInputChange} />
                        </label>
                        <label>
                            Inactive Status:
                            <input type="checkbox" name="isDeleted" checked={formData.isDeleted} onChange={handleInputChange} /> {!formData.isDeleted ? <p>Active</p> : <p>Inactive</p>}
                        </label>
                        <label>
                            Agreement File:
                            <input type="file" name="agreementFile" onChange={handleFileChange} />
                        </label>
                        <label>
                            NDA File:
                            <input type="file" name="ndaFile" onChange={handleFileChange} />
                        </label>
                        <label>
                            Other File:
                            <input type="file" name="other" onChange={handleFileChange} />
                        </label>
                        <button type="submit">Update Contractor</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default UpdateContractor;
