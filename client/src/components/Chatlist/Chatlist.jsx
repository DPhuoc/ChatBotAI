import { useNavigate } from "react-router-dom";
import "./Chatlist.css";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const fetchConversations = async () => {
    const response = await fetch("/api/conversations/", {
        credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to fetch conversations");
    const data = await response.json();
    return data.data;
};

const Chatlist = () => {
    const { data: conversations, isLoading } = useQuery({
        queryKey: ["conversations"],
        queryFn: fetchConversations,
    });

    const navigate = useNavigate();

    const handleUpgradeClick = async () => {
        try {
            const res = await fetch("/api/payment/momo", {
                method: "POST",
                credentials: "include",
            });
            const data = await res.json();
            if (data.payUrl) {
                window.location.href = data.payUrl; // Redirect to Momo payment
            }
        } catch (err) {
            console.error("Payment failed", err);
        }
    };

    return (
        <div className="chatlist">
            <span className="title">RECENT CHAT</span>
            <div className="list">
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    conversations.map((chat) => (
                        <Link key={chat.id} to={`/dashboard/chats/${chat.id}`}>
                            {chat.title || `Chat with Bot ${chat.chatbot_id}`}
                        </Link>
                    ))
                )}
            </div>
            <hr />
            <div className="upgrade" onClick={handleUpgradeClick} style={{ cursor: 'pointer' }}>
                <img src="/logo.png" alt="CelebAI Logo" />
                <div className="texts">
                    <span>Upgrade CelebAI</span>
                </div>
            </div>
        </div>
    );
};

export default Chatlist;
