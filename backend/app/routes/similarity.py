from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.bug import Bug
from app.services.similarity_service import (
    similarity_score
)


router = APIRouter(
    prefix="/similarity",
    tags=["Similarity"]
)


@router.get("/{bug_id}")
def check_similarity(
    bug_id: int,
    db: Session = Depends(get_db)
):

    bug = db.query(Bug).filter(
        Bug.id == bug_id
    ).first()

    if not bug:
        return {
            "message": "Bug not found"
        }

    results = []

    all_bugs = db.query(Bug).filter(
        Bug.id != bug_id
    ).all()

    current_text = (
        bug.title + " " +
        bug.description
    )

    for other in all_bugs:

        other_text = (
            other.title + " " +
            other.description
        )

        score = similarity_score(
            current_text,
            other_text
        )

        if score >= 0.25:
            results.append({
                "bug_id": other.id,
                "title": other.title,
                "similarity": round(
                    score * 100,
                    2
                )
            })

    return sorted(
        results,
        key=lambda x: x["similarity"],
        reverse=True
    )