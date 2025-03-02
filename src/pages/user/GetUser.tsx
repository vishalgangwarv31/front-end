import axios from "axios";
import React, { useEffect, useState } from "react";
import UserMenu from "../../component/user/UserMenu";

type User = {
    id: string,
    name: string,
    email: string,
    workType: string | null,
    startup: boolean | null,
    agreementFile: string | null,
    ndaFile: string | null,
    panCard: string | null,
    tdsFile: string | null,
    gstFile: string | null,
    dpiitFile: string | null,
    qunatifoFile: string | null,
    udhyanFile: string | null
}

const GetUser: React.FC = () => {
    const [data, setData] = useState<User | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('userToken');
                const response = await axios.get('http://localhost:3000/api/user/get-user', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setData(response.data.user);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, []);

    if (!data) {
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
            <div className="get-user-container">
                <h2>My Info</h2>
                {data ? (
                    <ul className="get-user-list">
                        <li key={data.id} className="get-user-item">
                            <p><strong>Name:</strong> {data.name}</p>
                            <p><strong>Email:</strong>  {data.email}</p>
                            <p><strong>Work Type:</strong> Work Type: {data.workType}</p>
                            <p><strong>Startup:</strong> Startup: {data.startup ? "Yes" : "No"}</p>
                            <p> <strong>Agreement File:</strong> {data.agreementFile}</p>
                            <p> <strong>NDA File:</strong>  {data.ndaFile}</p>
                            <p><strong>PAN Card:</strong> {data.panCard}</p>
                            <p><strong>TDS File:</strong> {data.tdsFile}</p>
                            <p><strong>GST File:</strong> {data.gstFile}</p>
                            <p><strong>DPIIT File:</strong> {data.dpiitFile}</p>
                            <p><strong>Qunatifo File:</strong> {data.qunatifoFile}</p>
                            <p><strong>Udhyan File:</strong> {data.udhyanFile}</p>
                        </li>
                    </ul>
                ) : (
                    <div className="loading">Loading...</div>
                )}
            </div>
        </div>
    );
}

export default GetUser;
