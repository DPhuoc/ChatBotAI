import "./signuppage.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signuppage = () => {
    const [formData, setFormData] = useState({ username: "", email: "", password: "", confirmPassword: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }
        const response = await fetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const result = await response.json();
        if (response.status === 200) {
            setError(result.message);
        } else if (response.status === 201) {
            navigate("/login");
        } else {
            setError("Signup failed. Try again.");
        }
    };

    return (
        <div className="signup">
            <div className="register-container">
            <h2>SignUp for CelebAI</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input type="text" name="username" placeholder="Username" required onChange={handleChange} />
                    <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
                    <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
                    <input type="password" name="confirmPassword" placeholder="Confirm Password" required onChange={handleChange} />
                    <button type="submit">Register</button>
                </form>
                <p className="login-redirect">
                    Already have an account? <Link to="/login">Log in here</Link>
                </p>
            </div>
        </div>
    );
};

export default Signuppage;
