import apiClient from "./apiClient";

const ragService = {
  /**
   * Send a question to RAG / LLM backend
   * @param {string} question - user question
   * @returns {Promise<{answer: string, sources?: Array}>}
   */
  async query(question) {
    try {
      // Generate a session ID for the conversation
      const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const response = await apiClient.post("/chat", {
        session_id: sessionId,
        message: question
      });

      return {
        answer: response?.reply ?? "I'm not sure how to answer that.",
        sources: [response?.source || "HR Policy Document"]
      };
    } catch (error) {
      console.error("RAG query failed", error);

      // Safe fallback response
      return {
        answer:
          "Sorry, I couldn't get an answer right now. Please try again later.",
        sources: []
      };
    }
  }
};

export default ragService;
