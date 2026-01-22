import apiClient from "./apiClient";

const intentService = {
  /**
   * Send user text to NLP backend to detect intent
   * @param {string} text - user input
   * @returns {Promise<{intent: string, confidence: number}>}
   */
  async detect(text) {
    try {
      const response = await apiClient.post("/intent/detect", {
        text
      });

      return {
        intent: response.intent,
        confidence: response.confidence
      };
    } catch (error) {
      console.error("Intent detection failed", error);

      // Safe fallback
      return {
        intent: "UNKNOWN",
        confidence: 0
      };
    }
  }
};

export default intentService;
