import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Tùy ý xử lý thêm (gửi yêu cầu xác nhận từ server, v.v.)
        const timeout = setTimeout(() => {
            navigate("/dashboard");
        }, 3000); // chuyển về dashboard sau 3 giây

        return () => clearTimeout(timeout);
    }, [navigate]);

    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            <h2>Thanh toán thành công!</h2>
            <p>Đang chuyển hướng...</p>
        </div>
    );
};

export default PaymentSuccess;
