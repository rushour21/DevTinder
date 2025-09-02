// Chat.jsx
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";


export default function Chat() {
  const { _id } = useParams();
  console.log({ _id });
  const user = useSelector((state) => state.user);
  const userId = user?._id;
  const [messages, setMessages] = useState([
    { from: "them", text: "Hey! How are you?" },
    { from: "me", text: "I’m doing great, thanks!" },
    { from: "them", text: "Let’s start working on the project." },
  ]);
  const [newMsg, setNewMsg] = useState("");

  const sendMessage = () => {
    if (!newMsg.trim()) return;
    setMessages([...messages, { from: "me", text: newMsg }]);
    setNewMsg("");
  };

  useEffect(()=>{
    if (!userId || !_id) return; // wait until user is loaded

    const socket = createSocketConnection();
    socket.emit("joinChat", {userId, targetedId: _id})

    return ()=>{
      socket.disconnect();
    }
  },[userId, _id])

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex flex-col w-full max-w-lg h-[90vh] bg-white border border-gray-200 rounded-lg shadow-sm">
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-200 text-sm font-medium text-gray-700">
          Chat with User {_id}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 text-sm">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.from === "me" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-3 py-2 rounded-md max-w-[75%] leading-relaxed ${
                  msg.from === "me"
                    ? "bg-gray-800 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-3 border-t border-gray-200 flex gap-2">
          <input
            type="text"
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 text-sm bg-gray-800 text-white rounded-md hover:bg-gray-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
