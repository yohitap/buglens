def calculate_quality_score(bug_data) -> int:
    score = 0

    if bug_data.title and len(bug_data.title.strip()) >= 10:
        score += 20

    if bug_data.description and len(bug_data.description.strip()) >= 30:
        score += 20

    if bug_data.steps_to_reproduce:
        score += 20

    if bug_data.expected_result:
        score += 15

    if bug_data.actual_result:
        score += 15

    if bug_data.environment:
        score += 10

    return min(score, 100)