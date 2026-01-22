CLAIM_RULES = {
    "medical": {
        "required_fields": ["amount", "date", "hospital_name"],
        "required_docs": ["bill", "prescription"]
    },
    "travel": {
        "required_fields": ["amount", "from_date", "to_date", "purpose"],
        "required_docs": ["ticket", "invoice"]
    },
    "other": {
        "required_fields": ["amount", "description"],
        "required_docs": ["receipt"]
    }
}
