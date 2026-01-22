from ticket_service import create_ticket

def execute_action(action, state):
    if action == "READY_FOR_TICKET":
        ticket_id = create_ticket(state)
        state["ticket_id"] = ticket_id
        state["step"] = "TICKET_CREATED"
        return f"Ticket created with ID: {ticket_id}"

    return "No action executed"
