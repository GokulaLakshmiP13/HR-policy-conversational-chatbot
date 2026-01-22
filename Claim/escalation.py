def escalate_to_human(state):
    summary = {
        "employee_id": state["employee_id"],
        "issue": "Claim could not be completed automatically",
        "step": state["step"],
        "retries": state["retries"]
    }

    print("🚨 Escalated to HR Agent")
    print(summary)

    return summary
