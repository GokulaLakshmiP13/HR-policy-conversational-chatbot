from typing import TypedDict, List, Dict, Optional

class ClaimState(TypedDict):
    employee_id: str
    claim_type: str
    data: Dict
    documents: List[str]
    step: str
    retries: int
    ticket_id: Optional[str]
