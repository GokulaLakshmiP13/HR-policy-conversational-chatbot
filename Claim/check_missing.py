# check_missing.py

# Required fields for each claim type
CLAIM_RULES = {
    "medical": ["amount", "date", "hospital_name"],
    "travel": ["amount", "date", "destination"],
    "official_vacation": ["start_date", "end_date", "reason"]
}

# Required documents for each claim type
REQUIRED_DOCS = {
    "medical": ["bill", "prescription"],
    "travel": ["ticket", "invoice"],
    "official_vacation": []
}


def find_missing_fields(state):
    """
    Check for missing required data fields
    """
    claim_type = state["claim_type"]
    claim_data = state.get("data", {})

    required_fields = CLAIM_RULES.get(claim_type, [])
    missing = []

    for field in required_fields:
        if field not in claim_data or not claim_data[field]:
            missing.append(field)

    return missing


def find_missing_docs(state):
    """
    Check for missing required documents
    """
    claim_type = state["claim_type"]
    uploaded_docs = state.get("documents", [])

    required_docs = REQUIRED_DOCS.get(claim_type, [])
    missing = []

    for doc in required_docs:
        if doc not in uploaded_docs:
            missing.append(doc)

    return missing
