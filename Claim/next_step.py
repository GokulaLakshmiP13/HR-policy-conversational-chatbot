from check_missing import find_missing_fields, find_missing_docs
from ticket_service import create_ticket
from escalation import escalate_to_human

MAX_RETRIES = 2


def decide_next_step(state):
    """
    Decides the next action in the HR claim workflow
    """

    # 1️⃣ Check for missing fields
    missing_fields = find_missing_fields(state)
    if missing_fields:
        state["retries"] += 1

        if state["retries"] > MAX_RETRIES:
            escalate_to_human(state)
            state["step"] = "ESCALATED"
            return "Escalated due to missing fields"

        state["step"] = "ASK_MISSING_FIELDS"
        return f"Ask user for missing fields: {missing_fields}"

    # 2️⃣ Check for missing documents
    missing_docs = find_missing_docs(state)
    if missing_docs:
        state["retries"] += 1

        if state["retries"] > MAX_RETRIES:
            escalate_to_human(state)
            state["step"] = "ESCALATED"
            return "Escalated due to missing documents"

        state["step"] = "ASK_MISSING_DOCS"
        return f"Ask user to upload documents: {missing_docs}"

    # 3️⃣ All data present → create ticket
    ticket_id = create_ticket(state)
    state["ticket_id"] = ticket_id
    state["step"] = "TICKET_CREATED"

    return f"Ticket successfully created with ID: {ticket_id}"
