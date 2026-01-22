
import { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";
import CommandBar from "../components/CommandBar";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  const handleCommand = async (text) => {
    // 1. Add User Message
    const userMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setIsThinking(true);

    // 2. Simulate Network Delay (800-1200ms)
    const delay = Math.floor(Math.random() * 400) + 800;

    setTimeout(() => {
      // 3. Add Mock AI Response
      // TODO: Replace with real backend call (RAG/LLM)
      const aiMessage = {
        role: "ai",
        content: "I can help you with that request. (Backend integration pending)"
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsThinking(false);
    }, delay);
  };



  return (
    <Layout>
      <div className="flex flex-col h-[calc(100vh-140px)]">

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto mb-6 pr-2 space-y-6 scrollbar-hide">

          {/* Empty State */}
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                  Welcome, I'm your AI HR Assistant
                </h1>
                <p className="text-lg text-gray-500 max-w-md mx-auto">
                  I can help with HR policies, claims, leave requests, and feedback.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl px-4">
                {[
                  "Explain company leave policies",
                  "Check my reimbursement claim status",
                  "Submit feedback to HR",
                  "What benefits am I eligible for?"
                ].map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleCommand(prompt)}
                    className="p-4 bg-white border border-gray-200 rounded-xl text-left 
                               text-gray-600 text-[15px] hover:bg-gray-50 hover:border-gray-300 
                               transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages List */}
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] px-6 py-4 rounded-2xl text-[15px] leading-relaxed shadow-sm
                  ${msg.role === "user"
                    ? "bg-black text-white rounded-br-none"
                    : "bg-white text-gray-800 border border-gray-100 rounded-bl-none"
                  }
                `}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {/* Thinking Indicator */}
          {isThinking && (
            <div className="flex justify-start animate-pulse">
              <div className="bg-white border border-gray-100 px-6 py-4 rounded-2xl rounded-bl-none shadow-sm flex items-center space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="w-full max-w-3xl mx-auto">
          <CommandBar onSubmit={handleCommand} disabled={isThinking} />
          <p className="text-center text-xs text-gray-400 mt-4">
            AI can make mistakes. Please verify important information.
          </p>
        </div>

      </div>
    </Layout>
  );
}
