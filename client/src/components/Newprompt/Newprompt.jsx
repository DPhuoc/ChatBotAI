import "./Newprompt.css";
import { useState, useRef, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Newprompt = ({ chatID, isPremium }) => {
    const [question, setQuestion] = useState("");
    const [listening, setListening] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [micError, setMicError] = useState(null);
    const [language, setLanguage] = useState("vi-VN"); 

    const formRef = useRef(null);
    const inputRef = useRef(null);
    const recognitionRef = useRef(null);
    const queryClient = useQueryClient();

    useEffect(() => {
        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, []);

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

    const toggleListening = async () => {
        if (isSubmitting) return;
        setMicError(null);

        try {
            if (navigator.permissions) {
                const permission = await navigator.permissions.query({ name: 'microphone' });
                if (permission.state === 'denied') {
                    setMicError('Quyền truy cập microphone bị từ chối. Vui lòng bật trong cài đặt trình duyệt.');
                    return;
                }
            }

            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRecognition) {
                setMicError('Trình duyệt của bạn không hỗ trợ nhận diện giọng nói.');
                return;
            }

            if (!recognitionRef.current) {
                recognitionRef.current = new SpeechRecognition();
                recognitionRef.current.lang = language; 
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
                    setMicError('Nhận diện giọng nói thất bại. Vui lòng thử lại.');
                    setListening(false);
                    setIsSubmitting(false);
                };

                recognitionRef.current.onend = () => {
                    setListening(false);
                };
            } else {
                recognitionRef.current.lang = language; 
            }

            if (!listening) {
                try {
                    await recognitionRef.current.start();
                    setListening(true);
                } catch (err) {
                    console.error("Mic start error:", err);
                    setMicError('Không thể bắt đầu microphone. Vui lòng kiểm tra quyền truy cập.');
                }
            } else {
                recognitionRef.current.stop();
            }
        } catch (err) {
            console.error("Mic permission error:", err);
            setMicError('Lỗi truy cập microphone. Vui lòng kiểm tra quyền truy cập.');
        }
    };

    const toggleLanguage = () => {
        setLanguage(prev => prev === "vi-VN" ? "en-US" : "vi-VN");
    };

    return (
        <div className="newprompt">
            <form className="newform" onSubmit={handleSubmit} ref={formRef}>
                <input
                    type="text"
                    name="text"
                    placeholder={language === "vi-VN" ? "Nhập câu hỏi..." : "Ask anything..."}
                    ref={inputRef}
                    disabled={isSubmitting}
                    autoComplete="off"
                    className="input-field"
                />
                
                <div className="button-group">
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="submit-btn"
                    >
                        <img src="/arrow.png" alt="Send" />
                    </button>

                    {isPremium && (
                        <>
                            <button
                                type="button"
                                onClick={toggleListening}
                                disabled={isSubmitting}
                                className={`mic-btn ${listening ? 'listening' : ''}`}
                                title={language === "vi-VN" ? "Nhận diện giọng nói" : "Speech recognition"}
                            >
                                {listening ? (
                                    <div className="pulse-icon">🎤</div>
                                ) : (
                                    "🎤"
                                )}
                                <span className="language-badge">
                                    {language === "vi-VN" ? 'VI' : 'EN'}
                                </span>
                            </button>
                            
                            <button
                                type="button"
                                onClick={toggleLanguage}
                                disabled={isSubmitting || listening}
                                className="language-btn"
                                title={language === "vi-VN" ? "Switch to English" : "Chuyển sang Tiếng Việt"}
                            >
                                {language === "vi-VN" ? 'EN' : 'VI'}
                            </button>
                        </>
                    )}
                </div>
            </form>

            {micError && (
                <div className="mic-error">
                    {micError}
                    <button onClick={() => setMicError(null)}>×</button>
                </div>
            )}
        </div>
    );
};

export default Newprompt;