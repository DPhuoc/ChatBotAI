import "./signinpage.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

const Signinpage = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(formData),
        });

        const result = await response.json();
        setLoading(false);
        if (response.status === 401) {
            setError(result.message);
        } else {
            navigate("/dashboard");
        }
    };

    const handleGoogleLoginSuccess = async (credentialResponse) => {
        const token = credentialResponse.credential;
        setLoading(true);

        try {
            const response = await fetch("/api/auth/google", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ token }),
            });

            const result = await response.json();
            setLoading(false);
            if (response.status === 200) {
                navigate("/dashboard");
            } else {
                setError(result.message || "Google login failed");
            }
        } catch (err) {
            setError("An error occurred during Google login");
        }
    };

    return (
        <div className="signinpage">
            <div className="login-container">
                {error && <p className="error">{error}</p>}
                <h2>Login to CelebAI</h2>
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
                    <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    <div className="google-login-container">
                        <GoogleLogin
                            onSuccess={handleGoogleLoginSuccess}
                            onError={() => setError("Google login failed")}
                            size="medium"
                            width="300"
                        />
                    </div>
                </form>
                <p className="signup-redirect">
                    Don&apos;t have an account? <Link to="/signup">Create one here</Link>
                </p>
            </div>
        </div>
    );
};

export default Signinpage;
