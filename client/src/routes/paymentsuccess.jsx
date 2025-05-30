import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
            <div style={{ textAlign: "center", marginTop: "100px" }}>
                <h2>⏳ Đang xác nhận thanh toán...</h2>
            </div>
        );
    }

    if (status === "fail") {
        return (
            <div style={{ textAlign: "center", marginTop: "100px", color: "red" }}>
                <h2>❌ Thanh toán thất bại!</h2>
                <p>Vui lòng thử lại hoặc liên hệ hỗ trợ.</p>
                <button onClick={() => window.location.reload()}>Thử lại</button> <button onClick={() => navigate("/dashboard")}>Quay về trang chủ</button>
            </div>
        );
    }

    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            <h2>🎉 Thanh toán thành công!</h2>
            <p>Đang xác nhận tài khoản và chuyển hướng...</p>
        </div>
    );
};

export default PaymentSuccess;
