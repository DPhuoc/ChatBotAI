import { Link } from "react-router-dom";
import "./homepage.css";
import { TypeAnimation } from "react-type-animation";
import { useState } from "react";

const Homepage = () => {
    const [typingStatus, setTypingStatus] = useState("human1");
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));

    return (
        <div className="homepage">
            <img src="/orbital.png" alt="" className="orbital" />
            <div className="left">
                <h1>CelebAI</h1>
                <h2>HeHe</h2>

                {token ? <Link to="/dashboard">LETS GO</Link> : <Link to="/login">LETS GO</Link>};

            </div>
            <div className="right">
                <div className="imgContainer">
                    <div className="bgContainer">
                        <div className="bg"></div>
                    </div>
                    <img src="/bot.png" alt="" className="bot" />
                    <div className="chat">
                        <img src={typingStatus === "human1" ? "/human1.jpeg" : typingStatus === "human2" ? "/human2.jpeg" : "bot.png"} alt="" />
                        <TypeAnimation
                            sequence={[
                                "Tung tung tung sahur",
                                2000,
                                () => {
                                    setTypingStatus("bot");
                                },
                                "Skibididopdop",
                                2000,
                                () => {
                                    setTypingStatus("human2");
                                },
                                "Skibididopdopyesyes",
                                2000,
                                () => {
                                    setTypingStatus("bot");
                                },
                                "pickelball",
                                2000,
                                () => {
                                    setTypingStatus("human1");
                                },
                            ]}
                            wrapper="span"
                            repeat={Infinity}
                            cursor={true}
                            omitDeletionAnimation={true}
                        />
                    </div>
                </div>
            </div>
            <div className="terms">
                <img src="/logo.png" alt="" />
                <div className="links">
                    <Link to="/">Terms of Service</Link>
                    <span>|</span>
                    <Link to="/">Privacy Policy</Link>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
