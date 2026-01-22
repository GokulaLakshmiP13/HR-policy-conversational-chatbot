def build_ticket_payload(state):
    return {
        "employee_id": state["employee_id"],
        "claim_type": state["claim_type"],
        "details": state["data"],
        "documents": state["documents"]
    }
