import "./Newprompt.css";
import { useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Newprompt = ({ chatID }) => {
    const [question, setQuestion] = useState("");
    const formRef = useRef(null);
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (newMessage) => {
            return fetch(`/api/messages/`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newMessage),
            }).then((res) => res.json());
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["chat"] }).then(() => {
                formRef.current.reset();
                setQuestion("");
            });
        },
        onError: (err) => {
            console.log(err);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const text = e.target.text.value;
        if (!text) return;

        const newMessage = {
            conversation_id: chatID,
            content: text,
            sender: "User",
        };

        console.log(newMessage);

        mutation.mutate(newMessage);
    };

    return (
        <>
            {question && <div className="message user">{question}</div>}
            {/* <div className="endChat" ref={endRef}></div> */}
            <form className="newform" onSubmit={handleSubmit} ref={formRef}>
                <input id="file" type="file" multiple={false} hidden />
                <input type="text" name="text" placeholder="Ask anything..." />
                <button>
                    <img src="/arrow.png" alt="" />
                </button>
            </form>
        </>
    );
};

export default Newprompt;
