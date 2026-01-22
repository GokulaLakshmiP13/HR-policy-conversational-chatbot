import { useState, useRef, useEffect } from "react";

export default function ChatUI({ onSend }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi 👋 Ask me anything about HR policies, claims, or leave."
    }
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Call parent handler (RAG / LLM integration)
    if (onSend) {
      onSend(input, addAssistantMessage);
    }
  };

  const addAssistantMessage = (text) => {
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: text }
    ]);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-[80vh] bg-white rounded-2xl shadow-soft">
      
      {/* Header */}
      <div className="border-b px-6 py-4">
        <h2 className="font-semibold text-lg">AI HR Assistant</h2>
        <p className="text-sm text-gray-500">
          Powered by NLP & RAG
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} role={msg.role} text={msg.content} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t px-4 py-3">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Type your question…"
            className="flex-1 border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-black"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="px-5 py-2 bg-black text-white rounded-xl text-sm"
          >
            Send
          </button>
        </div>
      </div>

    </div>
  );
}

/* ------------------ Helper Component ------------------ */

function MessageBubble({ role, text }) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm leading-relaxed
        ${
          isUser
            ? "bg-black text-white rounded-br-sm"
            : "bg-gray-100 text-gray-900 rounded-bl-sm"
        }`}
      >
        {text}
      </div>
    </div>
  );
}
