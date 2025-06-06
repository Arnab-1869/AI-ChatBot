import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [message, setMessage] = useState("");
  const [conversationId, setConversationId] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Generate a unique conversation ID on component mount
    setConversationId(Math.random().toString(36).substring(7));
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = { role: "user", content: message };
    setChatHistory((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post(`${API_URL}/chat/`, {
        message,
        role: "user",
        conversation_id: conversationId,
      });

      const assistantMessage = {
        role: "assistant",
        content: response.data.response,
      };
      setChatHistory((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        role: "assistant",
        content: "Error: Unable to get response from server.",
      };
      setChatHistory((prev) => [...prev, errorMessage]);
    }

    setMessage("");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          width: "100%",
          margin: "0 auto",
          padding: "10px",
          background:
            "linear-gradient(90deg, #039be5 0%, #00b8d4 25%, #26c6da 50%, #4dd0e1 75%, #80deea 100%)",
          borderRadius: "16px",
          boxShadow:
            "0 8px 32px 0 rgba(31, 38, 135, 0.25), 0 1.5px 6px 0 rgba(0,0,0,0.10), 0 0.5px 1.5px 0 rgba(0,0,0,0.08)",
          border: "2.5px solid rgba(3, 155, 229, 0.18)",
          height: "80vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#111",
            fontFamily: "Inter, Roboto, Segoe UI, Arial, sans-serif",
            fontWeight: 900,
            fontSize: "2.5rem",
            letterSpacing: "2px",
            margin: "20px 0 16px 0",
            textShadow: "0 2px 8px rgba(90,124,167,0.15), 0 1px 0 #fff",
            textTransform: "uppercase",
          }}
        >
          AI Assistant
        </h1>
        <div
          ref={chatContainerRef}
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
            background: "linear-gradient(135deg, #f8fafc 0%, #e3f2fd 100%)",
          }}
        >
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              style={{
                marginBottom: "10px",
                padding: "10px",
                borderRadius: "5px",
                background:
                  msg.role === "user"
                    ? "#5a7ca7"
                    : "linear-gradient(90deg, #e3f2fd 0%, #bbdefb 100%)",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                textAlign: msg.role === "user" ? "right" : "left",
                transition: "all 0.3s ease",
                color: "black",
                fontWeight: msg.role === "user" ? 500 : 400,
              }}
            >
              <strong>{msg.role}:</strong> {msg.content}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px" }}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              transition: "border-color 0.3s ease",
              outline: "none",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#4caf50")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          />
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#4caf50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#4caf50")}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;