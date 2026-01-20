from fastapi import APIRouter

router = APIRouter()

@router.post("/")
def reset_chat(session_id: str):
    from core.session import reset_session
    reset_session(session_id)
    return {"status": "Session reset successful"}
