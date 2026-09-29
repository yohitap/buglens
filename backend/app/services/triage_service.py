def suggest_priority(severity: str, description: str) -> str:
    severity = severity.lower()

    description = description.lower()

    critical_words = [
        "crash",
        "payment",
        "security",
        "data loss",
        "cannot login",
        "authentication"
    ]

    if severity == "critical":
        return "critical"

    for word in critical_words:
        if word in description:
            return "high"

    if severity == "high":
        return "high"

    if severity == "low":
        return "low"

    return "medium"