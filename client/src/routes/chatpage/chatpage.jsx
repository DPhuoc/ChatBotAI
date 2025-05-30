import Newprompt from "../../components/Newprompt/Newprompt";
import "./chatpage.css";
import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useOutletContext } from "react-router-dom";

const Chatpage = () => {
    const endRef = useRef(null);
    const path = useLocation().pathname;
    const chatId = path.split("/").pop();

    const { isPremium } = useOutletContext();

    const { isPending, error, data } = useQuery({
        queryKey: ["chat", chatId],
        queryFn: () =>
            fetch(`/api/messages/${chatId}`, {
                credentials: "include",
            }).then((res) => res.json()),
        refetchInterval: 1000,
    });

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [data]);

    return (
        <div className="chatpage">
            <div className="wrapper">
                <div className="chat">
                    {isPending && <p>Loading messages...</p>}
                    {error && <p>Error loading messages: {error.message}</p>}

                    {data?.data?.map((message) => (
                        <div
                            key={message.id}
                            className={`message ${message.sender === "User" ? "user" : ""}`}
                        >
                            {message.content}
                        </div>
                    ))}

                    <div ref={endRef} />
                </div>
            </div>

            <div className="newprompt">
                <Newprompt chatID={chatId} isPremium={isPremium}/>
            </div>
        </div>
    );
};

export default Chatpage;
