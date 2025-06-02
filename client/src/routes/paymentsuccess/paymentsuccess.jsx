import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./paymentsucess.css"; 

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const [status, setStatus] = useState("loading");

    useEffect(() => {
        const confirmPayment = async () => {
            try {
                const res = await fetch("/api/payment/confirm", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!res.ok) throw new Error("Xác nhận thất bại");

                const data = await res.json();
                console.log("✅ Confirm payment response:", data);

                if (data.is_premium) {
                    setStatus("success");
                    setTimeout(() => {
                        navigate("/dashboard");
                    }, 2000);
                } else {
                    setStatus("fail");
                }
            } catch (error) {
                console.error("❌ Xác nhận thất bại:", error);
                setStatus("fail");
            }
        };

        confirmPayment();
    }, [navigate]);

    if (status === "loading") {
        return (
            <div className="payment-container loading">
                <h2 className="payment-title">⏳ Đang xác nhận thanh toán...</h2>
                <div className="spinner"></div>
            </div>
        );
    }

    if (status === "fail") {
        return (
            <div className="payment-container fail">
                <h2 className="payment-title">❌ Thanh toán thất bại!</h2>
                <p className="payment-message">Vui lòng thử lại hoặc liên hệ hỗ trợ.</p>
                <button className="payment-button" onClick={() => navigate("/dashboard")}>
                    Quay về trang chủ
                </button>
            </div>
        );
    }

    return (
        <div className="payment-container success">
            <h2 className="payment-title">🎉 Thanh toán thành công!</h2>
            <p className="payment-message">Đang xác nhận tài khoản và chuyển hướng...</p>
            <div className="spinner"></div>
        </div>
    );
};

export default PaymentSuccess;