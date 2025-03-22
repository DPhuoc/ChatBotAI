import Newprompt from "../../components/Newprompt/Newprompt";
import "./chatpage.css";
import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

const Chatpage = () => {
  const endRef = useRef(null);
  const path = useLocation().pathname;
  const chatId = path.split("/").pop();

  const { isPending, error, data } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: () =>
      fetch(`http://localhost:5000/messages/${chatId}`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  console.log(data)

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

          <Newprompt chatID={chatId} />

          <div ref={endRef} />
        </div>
      </div>
    </div>
  );
};

export default Chatpage;
