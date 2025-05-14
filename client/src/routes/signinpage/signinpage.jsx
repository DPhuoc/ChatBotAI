import "./signinpage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signinpage = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        console.log(e.target.name)
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    console.log(formData)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(formData),
        });

        const result = await response.json();
        if (response.status === 401) {
            setError(result.message);
        }
        navigate('/dashboard')
    };

    return (
        <div className="signinpage">
            <div className="login-container">
                {error && <p className="error">{error}</p>}
                <h2>Login to CelebAI</h2>
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" placeholder="Email" required onChange={handleChange}/>
                    <input type="password" name="password" placeholder="Password" required onChange={handleChange}/>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Signinpage;
