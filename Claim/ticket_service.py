import mysql.connector
from datetime import datetime
import uuid
import json


def create_ticket(state):
    """
    Create a claim ticket and store it in MySQL
    """

    # Generate unique ticket ID
    ticket_id = "TKT-" + str(uuid.uuid4())[:8]

    # Connect to MySQL (XAMPP)
    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",          # XAMPP default
        database="hr_claims",
        port=3306,
        autocommit=True
    )

    cursor = conn.cursor()

    # SQL insert query
    query = """
    INSERT INTO tickets
    (
        ticket_id,
        employee_id,
        claim_type,
        claim_data,
        documents,
        status,
        created_at
    )
    VALUES (%s, %s, %s, %s, %s, %s, %s)
    """

    # Values to insert (claim_data stored as JSON)
    values = (
        ticket_id,
        state["employee_id"],
        state["claim_type"],
        json.dumps(state["data"]),   # ✅ JSON FIX APPLIED
        ",".join(state["documents"]),
        "OPEN",
        datetime.now()
    )

    # Execute insert
    cursor.execute(query, values)

    # Close DB connection
    cursor.close()
    conn.close()

    print("✅ Ticket stored in MySQL successfully")
    print("🎫 Ticket ID:", ticket_id)

    return ticket_id
