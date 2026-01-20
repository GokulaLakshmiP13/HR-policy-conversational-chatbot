# core/session.py

sessions = {}

def get_session(session_id: str):
    if session_id not in sessions:
        sessions[session_id] = {
            "intent": None,
            "step": None,
            "data": {}
        }
    return sessions[session_id]
def reset_session(session_id: str):
    if session_id in sessions:
        del sessions[session_id]
