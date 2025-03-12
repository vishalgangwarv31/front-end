import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserMenu from "../../component/user/UserMenu";

type User = {
    id: string,
    name: string,
    email: string,
    password: string,
    createdAt: string,
    type: string | null,
    pocPhone: string | null,
    pocName: string | null,
    gstNumber: string | null,
    dpiit: boolean | null,
    dpiitDate: string | null,
    tdsFile: string[] | null,
    gstFile: string[] | null,
    ndaFile: string[] | null,
    dpiitFile: string[] | null,
    agreementFile: string[] | null,
    qunatifoFile: string[] | null,
    panCard: string[] | null,
    udhyanFile: string[] | null,
    otherFile: string[] | null,
    isDeleted: boolean,
}

type VisibilitySetting = {
    fieldName: string,
    isVisible: boolean
}

const GetUser: React.FC = () => {
    const [data, setData] = useState<User | null>(null);
    const [files, setFiles] = useState<{ [key: string]: string[] }>({
        tdsFile: [],
        gstFile: [],
        ndaFile: [],
        dpiitFile: [],
        agreementFile: [],
        qunatifoFile: [],
        panCard: [],
        udhyanFile: [],
        otherFile: []
    });
    const [visibilitySettings, setVisibilitySettings] = useState<VisibilitySetting[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('userToken');
                const userResponse = await axios.get(`http://localhost:3000/api/user/get-user`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setData(userResponse.data.user);
                setFiles(userResponse.data.files);

                const visibilityResponse = await axios.get(`http://localhost:3000/api/admin/user-visibility`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setVisibilitySettings(visibilityResponse.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const handleUpdateClick = () => {
        if (data) {
            navigate(`/api/user/update-user/${data.id}`, { state: { user: data, files: files } });
        }
    };

    const isFieldVisible = (fieldName: string) => {
        const setting = visibilitySettings.find(setting => setting.fieldName === fieldName);
        return setting ? setting.isVisible : true;
    };

    if (loading) {
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
                            {isFieldVisible('name') && <p><strong>Name:</strong> {data.name}</p>}
                            {isFieldVisible('email') && <p><strong>Email:</strong> {data.email}</p>}
                            {isFieldVisible('createdAt') && <p><strong>Created At:</strong> {new Date(data.createdAt).toLocaleString()}</p>}
                            {isFieldVisible('type') && <p><strong>Type:</strong> {data.type}</p>}
                            {isFieldVisible('pocName') && <p><strong>POC Name:</strong> {data.pocName}</p>}
                            {isFieldVisible('pocPhone') && <p><strong>POC Phone:</strong> {data.pocPhone}</p>}
                            {isFieldVisible('gstNumber') && <p><strong>GST Number:</strong> {data.gstNumber}</p>}
                            {isFieldVisible('dpiit') && <p><strong>DPIIT:</strong> {data.dpiit ? "Yes" : "No"}</p>}
                            {isFieldVisible('dpiitDate') && <p><strong>DPIIT Date:</strong> {data.dpiitDate ? new Date(data.dpiitDate).toLocaleDateString() : "N/A"}</p>}
                            {isFieldVisible('agreementFile') && (
                                <>
                                    <p><strong>Agreement Files:</strong></p>
                                    <ul>
                                        {files.agreementFile.map((file, index) => (
                                            <li key={index}><a href={file} download>Download Agreement File {index + 1}</a></li>
                                        ))}
                                    </ul>
                                </>
                            )}
                            {isFieldVisible('ndaFile') && (
                                <>
                                    <p><strong>NDA Files:</strong></p>
                                    <ul>
                                        {files.ndaFile.map((file, index) => (
                                            <li key={index}><a href={file} download>Download NDA File {index + 1}</a></li>
                                        ))}
                                    </ul>
                                </>
                            )}
                            {isFieldVisible('panCard') && (
                                <>
                                    <p><strong>PAN Card Files:</strong></p>
                                    <ul>
                                        {files.panCard.map((file, index) => (
                                            <li key={index}><a href={file} download>Download PAN Card {index + 1}</a></li>
                                        ))}
                                    </ul>
                                </>
                            )}
                            {isFieldVisible('tdsFile') && (
                                <>
                                    <p><strong>TDS Files:</strong></p>
                                    <ul>
                                        {files.tdsFile.map((file, index) => (
                                            <li key={index}><a href={file} download>Download TDS File {index + 1}</a></li>
                                        ))}
                                    </ul>
                                </>
                            )}
                            {isFieldVisible('gstFile') && (
                                <>
                                    <p><strong>GST Files:</strong></p>
                                    <ul>
                                        {files.gstFile.map((file, index) => (
                                            <li key={index}><a href={file} download>Download GST File {index + 1}</a></li>
                                        ))}
                                    </ul>
                                </>
                            )}
                            {isFieldVisible('dpiitFile') && (
                                <>
                                    <p><strong>DPIIT Files:</strong></p>
                                    <ul>
                                        {files.dpiitFile.map((file, index) => (
                                            <li key={index}><a href={file} download>Download DPIIT File {index + 1}</a></li>
                                        ))}
                                    </ul>
                                </>
                            )}
                            {isFieldVisible('qunatifoFile') && (
                                <>
                                    <p><strong>Qunatifo Files:</strong></p>
                                    <ul>
                                        {files.qunatifoFile.map((file, index) => (
                                            <li key={index}><a href={file} download>Download Qunatifo File {index + 1}</a></li>
                                        ))}
                                    </ul>
                                </>
                            )}
                            {isFieldVisible('udhyanFile') && (
                                <>
                                    <p><strong>Udhyan Files:</strong></p>
                                    <ul>
                                        {files.udhyanFile.map((file, index) => (
                                            <li key={index}><a href={file} download>Download Udhyan File {index + 1}</a></li>
                                        ))}
                                    </ul>
                                </>
                            )}
                            {isFieldVisible('otherFile') && (
                                <>
                                    <p><strong>Other Files:</strong></p>
                                    <ul>
                                        {files.otherFile.map((file, index) => (
                                            <li key={index}><a href={file} download>Download Other File {index + 1}</a></li>
                                        ))}
                                    </ul>
                                </>
                            )}
                            <button onClick={handleUpdateClick}>Update User</button>
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
