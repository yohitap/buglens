import re


def normalize_text(text: str):
    text = text.lower()

    text = re.sub(
        r"[^a-z0-9\s]",
        "",
        text
    )

    return set(text.split())


def similarity_score(text1: str, text2: str) -> float:
    words1 = normalize_text(text1)
    words2 = normalize_text(text2)

    if not words1 or not words2:
        return 0

    intersection = words1.intersection(words2)
    union = words1.union(words2)

    return len(intersection) / len(union)


def find_similar_bugs(new_bug, existing_bugs):

    results = []

    new_text = (
        new_bug.title + " " +
        new_bug.description
    )

    for bug in existing_bugs:

        old_text = (
            bug.title + " " +
            bug.description
        )

        score = similarity_score(
            new_text,
            old_text
        )

        if score >= 0.35:
            results.append({
                "bug_id": bug.id,
                "title": bug.title,
                "similarity": round(score * 100, 2)
            })

    return sorted(
        results,
        key=lambda x: x["similarity"],
        reverse=True
    )[:5]