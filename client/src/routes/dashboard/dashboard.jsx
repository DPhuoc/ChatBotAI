import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "./dashboard.css";

const fetchChatbots = async () => {
    const response = await fetch("/api/chatbots/", {
        credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to fetch chatbots");
    const data = await response.json();
    return data.data;
};

const Dashboard = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: chatbots, isLoading } = useQuery({
        queryKey: ["chatbots"],
        queryFn: fetchChatbots,
    });

    const createConversationMutation = useMutation({
        mutationFn: async (chatbotId) => {
            const response = await fetch("/api/conversations/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ chatbot_id: chatbotId }),
            });
            if (!response.ok) throw new Error("Failed to create conversation");
            return response.json();
        },
        onSuccess: (data) => {
            console.log(data)
            const conversationId = data.id;
            queryClient.invalidateQueries(["chatbots"]);
            navigate(`chats/${conversationId}`);
        },
        onError: (error) => {
            console.error("Error creating conversation:", error);
        }
    });

    return (
        <div className="dashboard">
            <div className="texts">
                <div className="logo">
                    <img src="/logo.png" alt="CelebAI Logo" />
                    <h1>CelebAI</h1>
                </div>
                <div className="options">
                    {isLoading ? (
                        <p>Loading chatbots...</p>
                    ) : (
                        chatbots.map((bot) => (
                            <div
                                className="option"
                                key={bot.id}
                                onClick={() => createConversationMutation.mutate(bot.id)}
                                style={{ cursor: "pointer" }}
                            >
                                <img src="/chat.png" alt="Chatbot" />
                                <span>{bot.name}</span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
