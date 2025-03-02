import axios from "axios";
import { useEffect, useState } from "react";
import "./adminGet.css"; // Import the CSS file
import AdminMenu from "../../component/admin/AdminMenu";

type Contractor = {
    id: number;
    name: string;
    email: string;
    workType: string;
    startUp: boolean;
    agreementFile: string;
    ndaFile: string;
};

const GetContractor = () => {
    const [data, setData] = useState<Contractor[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchContractor = async () => {
            try {
                const token = localStorage.getItem('adminToken');
                const response = await axios.get('http://localhost:3000/api/admin/get-contractor', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                setData(response.data.user);
            } catch (err) {
                setError("Failed to load data.");
            } finally {
                setLoading(false);
            }
        };

        fetchContractor();
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div>
            <AdminMenu/>
            <div className="get-user-container">
                <h2>Contractors</h2>
                <ul className="get-user-list">
                    {data.map(contractor => (
                        <li key={contractor.id} className="get-user-item">
                            <p><strong>ID:</strong> {contractor.id}</p>
                            <p><strong>Name:</strong> {contractor.name}</p>
                            <p><strong>Work Type:</strong> {contractor.workType}</p>
                            <p><strong>Startup Benefit:</strong> {contractor.startUp ? 'Eligible' : 'Not Eligible'}</p>
                            <p><strong>Agreement File:</strong> {contractor.agreementFile}</p>
                            <p><strong>NDA File:</strong> {contractor.ndaFile}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        
    );
};

export default GetContractor;
