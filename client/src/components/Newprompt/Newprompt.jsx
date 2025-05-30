import "./Newprompt.css";
import { useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Newprompt = ({ chatID, isPremium }) => {
    const [question, setQuestion] = useState("");
    const [listening, setListening] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formRef = useRef(null);
    const inputRef = useRef(null);
    const recognitionRef = useRef(null);
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (newMessage) =>
            fetch("/api/messages/", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newMessage),
            }).then((res) => res.json()),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["chat"] });
            setIsSubmitting(false);
            setQuestion("");
            formRef.current?.reset();
        },
        onError: (err) => {
            console.error("Message send error:", err);
            setIsSubmitting(false);
        },
    });

    const sendMessage = (content) => {
        const newMessage = {
            conversation_id: chatID,
            content,
            sender: "User",
        };
        setQuestion(content);
        setIsSubmitting(true);
        mutation.mutate(newMessage);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const text = e.target.text.value.trim();
        if (!text || isSubmitting) return;

        sendMessage(text);
    };

    const toggleListening = () => {
        if (isSubmitting) return;

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Trình duyệt của bạn không hỗ trợ nhận diện giọng nói.");
            return;
        }

        if (!recognitionRef.current) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.lang = "en-US";
            recognitionRef.current.interimResults = false;
            recognitionRef.current.maxAlternatives = 1;

            recognitionRef.current.onresult = (event) => {
                const spoken = event.results[0][0].transcript;
                if (spoken) {
                    sendMessage(spoken);
                }
            };

            recognitionRef.current.onerror = (event) => {
                console.error("Speech recognition error:", event.error);
                setIsSubmitting(false);
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
        }
    };

    return (
        <>
            <form className="newform" onSubmit={handleSubmit} ref={formRef}>
                <input id="file" type="file" multiple={false} hidden />
                <input
                    type="text"
                    name="text"
                    placeholder="Ask anything..."
                    ref={inputRef}
                    disabled={isSubmitting}
                    autoComplete="off"
                />
                <button type="submit" disabled={isSubmitting}>
                    <img src="/arrow.png" alt="Send" />
                </button>

                {isPremium && (
                    <button
                        type="button"
                        onClick={toggleListening}
                        title="Speak"
                        style={{ marginLeft: 8 }}
                        disabled={isSubmitting}
                    >
                        🎤
                    </button>
                )}
            </form>
        </>
    );
};

export default Newprompt;
