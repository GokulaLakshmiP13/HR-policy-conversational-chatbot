from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def health():
    return {
        "status": "UP",
        "service": "HR Policy Conversational Chatbot Backend"
    }
