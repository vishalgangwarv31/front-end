import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./adminGet.css";
import AdminMenu from "../../component/admin/AdminMenu";

type Firm = {
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

const GetContractor = () => {
    const [data, setData] = useState<Firm[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [cursor, setCursor] = useState<number | null>(null);
    const [hasNextPage, setHasNextPage] = useState<boolean>(false);
    const [previousCursors, setPreviousCursors] = useState<number[]>([]);
    const [nameSearch, setNameSearch] = useState<string>("");
    const [emailSearch, setEmailSearch] = useState<string>("");
    const [includeInactive, setIncludeInactive] = useState<boolean>(false); 

    const fetchContractor = async (cursor: number | null, name: string = "", email: string = "", includeInactive: boolean = false) => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await axios.get('http://localhost:3000/api/admin/get-contractor', {
                headers: { 'Authorization': `Bearer ${token}` },
                params: { cursor, limit: 2, name, email, isInactive: includeInactive }
            });

            setData(response.data.firms);
            setCursor(response.data.nextCursor);
            setHasNextPage(response.data.nextCursor !== null);

            if (cursor !== null) {
                setPreviousCursors(prev => [...prev, cursor]);
            }
        } catch (err) {
            setError("Failed to load data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContractor(null, nameSearch, emailSearch, includeInactive);
    }, [includeInactive]);

    const handleNextPage = () => {
        if (cursor) {
            fetchContractor(cursor, nameSearch, emailSearch, includeInactive);
        }
    };

    const handlePrevPage = () => {
        const prevCursor = previousCursors[previousCursors.length - 2];
        setPreviousCursors(prev => prev.slice(0, -1));
        fetchContractor(prevCursor || null, nameSearch, emailSearch, includeInactive);
    };

    const handleNameSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNameSearch(value);
        fetchContractor(null, value, emailSearch, includeInactive);
        setPreviousCursors([]);
    };

    const handleEmailSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmailSearch(value);
        fetchContractor(null, nameSearch, value, includeInactive);
        setPreviousCursors([]);
    };

    const handleIncludeInactiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIncludeInactive(e.target.checked);
    };

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
                <h2>Vendors</h2>
                <input
                    type="text"
                    placeholder="Search by name"
                    value={nameSearch}
                    onChange={handleNameSearchChange}
                    className="search-input"
                />
                <input
                    type="text"
                    placeholder="Search by email"
                    value={emailSearch}
                    onChange={handleEmailSearchChange}
                    className="search-input"
                />
                <label>
                    <input
                        type="checkbox"
                        checked={includeInactive}
                        onChange={handleIncludeInactiveChange}
                    />
                    Include Inactive Vendors
                </label>
                <ul className="get-user-list">
                    {data.map(firm => (
                        <li key={firm.id} className="get-user-item">
                            <p><strong>Name:</strong> {firm.name}</p>
                            <p><strong>Email:</strong> {firm.email}</p>
                            <p><strong>Work Type:</strong> {firm.workType}</p>
                            <p><strong>Startup Benefit:</strong> {firm.startUp ? 'Eligible' : 'Not Eligible'}</p>
                            <p><strong>Agreement File:</strong> {firm.agreementFile ? <a href={firm.agreementFile}>Download</a> : 'Not Available'}</p>
                            <p><strong>NDA File:</strong> {firm.ndaFile ? <a href={firm.ndaFile}>Download</a> : 'Not Available'}</p>
                            <p><strong>Other File:</strong> {firm.other ? <a href={firm.other}>Download</a> : 'Not Available'}</p>
                            <p><strong>Status:</strong> {firm.isDeleted ? 'Inactive' : 'Active'}</p> 
                            <Link to={`/api/admin/update-contractor/${firm.id}`} className="update-button">Update</Link>
                            <Link to={`/api/admin/vendor-order/${firm.id}`} className="order-list-button">Order List</Link>
                        </li>
                    ))}
                </ul>
                <div className="pagination-controls">
                    <button onClick={handlePrevPage} disabled={previousCursors.length === 0}>Previous</button>
                    <button onClick={handleNextPage} disabled={!hasNextPage}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default GetContractor;
