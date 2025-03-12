import axios from "axios";
import React, { useState, useEffect } from "react";
import AdminMenu from "../../component/admin/AdminMenu";

type VisibilitySetting = {
    id: number;
    fieldName: string;
    isVisible: boolean;
}

const UserVisible: React.FC = () => {
    const [visibilitySettings, setVisibilitySettings] = useState<VisibilitySetting[]>([]);
    const [updateStatus, setUpdateStatus] = useState<string | null>(null);

    useEffect(() => {
        const fetchVisibilitySettings = async () => {
            try {
                const token = localStorage.getItem('userToken');
                const response = await axios.get(`http://localhost:3000/api/admin/user-visibility`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                // Filter out the "password" field
                const filteredSettings = response.data.filter((setting: VisibilitySetting) => setting.fieldName !== "password");
                setVisibilitySettings(filteredSettings);
            } catch (error) {
                console.error("Error fetching visibility settings:", error);
            }
        };

        fetchVisibilitySettings();
    }, []);

    const handleCheckboxChange = (id: number) => {
        setVisibilitySettings(prevSettings =>
            prevSettings.map(setting =>
                setting.id === id ? { ...setting, isVisible: !setting.isVisible } : setting
            )
        );
    };

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem('userToken');
            const settings = visibilitySettings.map(({ fieldName, isVisible }) => ({ fieldName, isVisible }));
            await axios.put(`http://localhost:3000/api/admin/user-visibility`, { settings }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setUpdateStatus("Visibility settings updated successfully!");
        } catch (error) {
            console.error("Error updating visibility settings:", error);
            setUpdateStatus("Error updating visibility settings. Please try again.");
        }
    };

    return (
        <div>
            <AdminMenu />
            <div>
                <h2>Manage Field Visibility</h2>
                {visibilitySettings.map(setting => (
                    <div key={setting.id}>
                        <label>
                            <input
                                type="checkbox"
                                checked={setting.isVisible}
                                onChange={() => handleCheckboxChange(setting.id)}
                            />
                            {setting.fieldName}
                        </label>
                    </div>
                ))}
                <button onClick={handleSubmit}>Save Changes</button>
                {updateStatus && <p>{updateStatus}</p>}
            </div>
        </div>
    );
}

export default UserVisible;
