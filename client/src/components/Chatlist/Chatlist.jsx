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

const Chatlist = () => {
    const { data: conversations, isLoading } = useQuery({
        queryKey: ["conversations"],
        queryFn: fetchConversations,
    });

    return (
        <div className="chatlist">
            <span className="title">RECENT CHAT</span>
            <div className="list">
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    conversations.map((chat) => (
                        <Link key={chat.id} to={`/dashboard/chats/${chat.id}`}>
                            {chat.title || `Chat with ${chat.name}`}
                        </Link>
                    ))
                )}
            </div>
            <hr />
            <div className="upgrade">
                <img src="/logo.png" alt="CelebAI Logo" />
                <div className="texts">
                    <span>Upgrade CelebAI</span>
                </div>
                <button onClick={handleSignOut}>Sign Out</button>
            </div>
        </div>
    );
};

export default Chatlist;
