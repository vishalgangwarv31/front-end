import { useState } from "react";

const ForgetPass = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const response = await fetch("http://localhost:3000/api/firm/forget-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Reset password link sent to your email.");
            } else {
                setMessage(data.message || "Failed to send reset link.");
            }
        } catch (error) {
            setMessage("Error: Unable to connect to the server.");
        }

        setLoading(false);
    };

    return (
        <div className="forget-pass-container">
            <div className="forget-pass-card">
                <h2 className="forget-pass-title">Forgot Password</h2>
                <p className="forget-pass-subtitle">Enter your email to receive a reset link</p>
                <form onSubmit={handleSubmit} className="forget-pass-form">
                    <div className="form-group2">
                        <label className="form-label2">Email:</label>
                        <input 
                            type="email" 
                            className="form-input2"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="Enter your email" 
                            required 
                        />
                    </div>
                    <button type="submit" className="button" disabled={loading}>
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>
                </form>
                {message && <p className="form-message">{message}</p>}
            </div>
        </div>

    );
};

export default ForgetPass;
