from fastapi import FastAPI
from api.chat import router as chat_router
from api.reset import router as reset_router
from api.health import router as health_router

app = FastAPI(title="HR Policy Conversational Chatbot")

app.include_router(chat_router, prefix="/chat")
app.include_router(reset_router, prefix="/chat/reset")
app.include_router(health_router, prefix="/health")
@app.get("/health")
def health():
    return {"status": "Backend is running"}
