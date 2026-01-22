from fastapi import APIRouter
from pydantic import BaseModel
from core.session import get_session, reset_session
from core.policy import handle_policy_question
from core.logger import logger

router = APIRouter()

class ChatRequest(BaseModel):
    session_id: str
    message: str

class ChatResponse(BaseModel):
    session_id: str
    intent: str
    step: str | None
    reply: str
    confidence: float

def detect_intent(message: str) -> str:
    msg = message.lower()
    if "claim" in msg:
        return "CLAIM"
    elif "policy" in msg or "leave" in msg:
        return "POLICY"
    else:
        return "UNKNOWN"

@router.post("/", response_model=ChatResponse)
def chat(req: ChatRequest):
    session = get_session(req.session_id)

    # Log incoming message
    logger.info(f"[INPUT] Session={req.session_id} | Message='{req.message}'")

    # FIRST MESSAGE → INTENT DETECTION
    if session["intent"] is None:
        intent = detect_intent(req.message)
        session["intent"] = intent

        logger.info(
            f"[INTENT DETECTED] Session={req.session_id} | Intent={intent}"
        )

        if intent == "CLAIM":
            session["step"] = "ASK_CLAIM_TYPE"
            logger.info(
                f"[FLOW] Session={req.session_id} | Step={session['step']}"
            )
            return ChatResponse(
                session_id=req.session_id,
                intent="CLAIM",
                step=session["step"],
                reply="Sure. What type of claim do you want to submit?",
                confidence=0.9
            )

        if intent == "POLICY":
            session["step"] = "ANSWER_POLICY"
            logger.info(
                f"[FLOW] Session={req.session_id} | Step={session['step']}"
            )
            return ChatResponse(
                session_id=req.session_id,
                intent="POLICY",
                step=session["step"],
                reply="Sure. Please ask your HR policy question.",
                confidence=0.9
            )

        logger.warning(
            f"[UNKNOWN INTENT] Session={req.session_id}"
        )
        return ChatResponse(
            session_id=req.session_id,
            intent="UNKNOWN",
            step=None,
            reply="I couldn’t understand that. Can you rephrase?",
            confidence=0.4
        )

    # CLAIM FLOW
    if session["intent"] == "CLAIM":

        if session["step"] == "ASK_CLAIM_TYPE":
            session["data"]["claim_type"] = req.message
            session["step"] = "ASK_AMOUNT"

            logger.info(
                f"[CLAIM] Session={req.session_id} | ClaimType={req.message}"
            )

            return ChatResponse(
                session_id=req.session_id,
                intent="CLAIM",
                step=session["step"],
                reply="Got it. Please enter the claim amount.",
                confidence=0.9
            )

        if session["step"] == "ASK_AMOUNT":
            session["data"]["amount"] = req.message

            logger.info(
                f"[CLAIM] Session={req.session_id} | Amount={req.message}"
            )

            response = ChatResponse(
                session_id=req.session_id,
                intent="CLAIM",
                step="DONE",
                reply="Thank you. Your claim details have been collected.",
                confidence=0.95
            )

            logger.info(
                f"[CLAIM COMPLETED] Session={req.session_id}"
            )

            reset_session(req.session_id)
            return response

    # POLICY FLOW
    if session["intent"] == "POLICY" and session["step"] == "ANSWER_POLICY":
        result = handle_policy_question(req.message)

        logger.info(
            f"[POLICY] Session={req.session_id} | Question='{req.message}'"
        )

        response = ChatResponse(
            session_id=req.session_id,
            intent="POLICY",
            step="DONE",
            reply=f"{result['answer']} (Source: {result['source']})",
            confidence=0.9
        )

        logger.info(
            f"[POLICY COMPLETED] Session={req.session_id}"
        )

        reset_session(req.session_id)
        return response

    # FALLBACK
    logger.warning(
        f"[FALLBACK] Session={req.session_id} | Intent={session['intent']} | Step={session['step']}"
    )

    return ChatResponse(
        session_id=req.session_id,
        intent=session["intent"],
        step=session["step"],
        reply="Continuing the conversation.",
        confidence=0.5
    )
