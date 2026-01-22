/**
 * Map NLP-detected intents to frontend actions
 * type:
 *  - "redirect" → go to OrangeHRM
 *  - "chat"     → open AI chat (RAG)
 */

const intentMap = {
  CLAIM_STATUS: {
    type: "redirect",
    target: "CLAIMS"
  },

  APPLY_LEAVE: {
    type: "redirect",
    target: "LEAVE"
  },

  ESCALATION: {
    type: "redirect",
    target: "ESCALATIONS"
  },

  PROFILE: {
    type: "redirect",
    target: "PROFILE"
  },

  HR_POLICY: {
    type: "chat"
  },

  HELP: {
    type: "chat"
  }
};

export default intentMap;
