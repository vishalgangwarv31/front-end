import axios from "axios";
import React, { useEffect, useState } from "react";
import FirmMenu from "../../component/firm/FirmMenu";

type Firm = {
    id: string,
    name: string,
    email: string,
    workType: string | null,
    startup: boolean | null,
    agreementFile: string | null,
    ndaFile: string | null
}

const GetFirm: React.FC = () => {
    const [data, setData] = useState<Firm | null>(null);
    ;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('firmToken')
                const response = await axios.get('http://localhost:3000/api/firm/get-firm' , {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setData(response.data.firm);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, []);

    if(!data) {
        return (
            <div>
                <FirmMenu/> 
                <div className="loading">Loading...</div>
            </div>
        )
    }

    return (
        <div>
            <FirmMenu/> 
            <div className="get-user-container">
                <h2>My Info</h2>
                {data ? (
                    <ul className="get-user-list">
                        <li key={data.id} className="get-user-item">
                            <p>Name: {data.name}</p>
                            <p>Email: {data.email}</p>
                            <p>Work Type: {data.workType}</p>
                            <p>Startup: {data.startup ? "Yes" : "No"}</p>
                            <p>Agreement File: {data.agreementFile}</p>
                            <p>NDA File: {data.ndaFile}</p>
                        </li>
                    </ul>
                ) : (
                    <div className="loading">Loading...</div>
                )}

            </div>
            
        </div>
    );
}

export default GetFirm;