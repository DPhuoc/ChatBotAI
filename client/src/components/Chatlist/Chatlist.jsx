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

const handleSignOut = async () => {
    try {
        await fetch("/api/auth/logout", {
            method: "POST",
            credentials: "include",
        });
        window.location.href = "/login";
    } catch (error) {
        console.error("Error signing out:", error);
    }
};

const Chatlist = ({ isPremium }) => {
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
                window.location.href = data.payUrl;
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
                            {chat.title || `Chat with ${chat.chatbot_name}`}
                        </Link>
                    ))
                )}
            </div>
            <hr />
            <div className="upgrade">
                <img src="/logo.png" alt="CelebAI Logo" />

                {!isPremium ? (
                    <div onClick={handleUpgradeClick} className="texts" style={{ cursor: 'pointer' }}>
                        <span>Upgrade CelebAI</span>
                    </div>
                ) : (
                    <div className="texts">
                        <span>Chào Mừng VIP</span>
                    </div>
                )}

                <button onClick={handleSignOut}>Sign Out</button>
            </div>
        </div>
    );
};


export default Chatlist;
