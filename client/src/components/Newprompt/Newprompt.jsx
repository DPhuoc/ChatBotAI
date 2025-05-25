import "./Newprompt.css";
import { useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Newprompt = ({ chatID }) => {
    const [question, setQuestion] = useState("");
    const [listening, setListening] = useState(false);
    const formRef = useRef(null);
    const inputRef = useRef(null);
    const recognitionRef = useRef(null);
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

        setQuestion(text);
        mutation.mutate(newMessage);
    };

    const toggleListening = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Speech recognition not supported in this browser.");
            return;
        }

        if (!recognitionRef.current) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.lang = "en-US";
            recognitionRef.current.interimResults = false;
            recognitionRef.current.maxAlternatives = 1;

            recognitionRef.current.onresult = (event) => {
                const spoken = event.results[0][0].transcript;
                if (!spoken) return;

                setQuestion(spoken); // show text immediately

                const newMessage = {
                    conversation_id: chatID,
                    content: spoken,
                    sender: "User",
                };

                mutation.mutate(newMessage);
            };

            recognitionRef.current.onerror = (event) => {
                console.error("Speech recognition error:", event.error);
            };

            recognitionRef.current.onend = () => {
                setListening(false);
            };
        }

        if (!listening) {
            recognitionRef.current.start();
            setListening(true);
        } else {
            recognitionRef.current.stop();
            setListening(false);
        }
    };

    return (
        <>
            {question && <div className="message user">{question}</div>}
            <form className="newform" onSubmit={handleSubmit} ref={formRef}>
                <input id="file" type="file" multiple={false} hidden />
                <input
                    type="text"
                    name="text"
                    placeholder="Ask anything..."
                    ref={inputRef}
                />
                <button type="submit">
                    <img src="/arrow.png" alt="Send" />
                </button>
                <button type="button" onClick={toggleListening} title="Speak" style={{ marginLeft: 8 }}>
                    🎤
                </button>
            </form>
        </>
    );
};

export default Newprompt;
