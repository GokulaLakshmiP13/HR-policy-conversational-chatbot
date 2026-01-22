import ChatUI from "../components/ChatUI";
import ragService from "../services/ragService";

export default function AIChat() {
  const handleSend = async (text, reply) => {
    try {
      // Call RAG / LLM backend
      const response = await ragService.query(text);

      // Send AI reply back to ChatUI
      reply(response.answer);
    } catch {
      reply("Sorry, something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <ChatUI onSend={handleSend} />
      </div>
    </div>
  );
}
